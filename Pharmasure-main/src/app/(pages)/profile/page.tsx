
'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm, type SubmitHandler, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, UserCheck, X, Trash2, Moon, Sun, LogOut, Camera, TrendingUp, Target, Activity, FileText, CheckCircle2, Download, Share2 } from 'lucide-react';
import { useUser, useFirestore, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { saveUserProfile } from '@/services/user-service';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countries';
import { Checkbox } from '@/components/ui/checkbox';
import { products, healthStats, disposalHistory, activeMedications, alerts, nextDosage } from '@/lib/data';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from 'firebase/auth';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { generateHealthReport, type HealthReportOutput } from '@/ai/flows/health-report-generation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getDynamicStatus } from '@/lib/utils';

const knownHealthIssues = [
  "Hypertension", "Diabetes", "Asthma", "Arthritis", "Heart Disease", "Migraine"
];

const profileSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters.' }),
  firstName: z.string().min(2, { message: 'First name is required.' }),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  countryCode: z.string().min(1, { message: 'Country code is required.' }),
  phoneNumber: z.string().min(5, { message: 'A valid phone number is required.' }),
  age: z.coerce.number().min(1, { message: 'Age is required.' }).max(120),
  gender: z.enum(['male', 'female', 'prefer-not-to-say'], { required_error: 'Gender is required.' }),
  bloodGroup: z.string().min(2, { message: 'Blood group is required.' }),
  healthIssues: z.array(z.string()).optional(),
  customHealthIssues: z.array(z.object({ value: z.string() })).optional(),
  photoURL: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const expiredProducts = products.filter(p => getDynamicStatus(p) === 'Expired');

const StatCard = ({ title, value, icon: Icon, unit, progress }: { title: string, value: string | number, icon: React.ElementType, unit?: string, progress?: number }) => (
    <Card className="bg-secondary/50">
        <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="w-5 h-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}{unit}</div>
            {progress !== undefined && <Progress value={progress} className='h-2 mt-2' />}
        </CardContent>
    </Card>
);


export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [report, setReport] = useState<HealthReportOutput | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: '',
      firstName: '',
      middleName: '',
      lastName: '',
      countryCode: '',
      phoneNumber: '',
      age: 0,
      gender: undefined,
      bloodGroup: '',
      healthIssues: [],
      customHealthIssues: [],
      photoURL: '',
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: 'customHealthIssues',
  });

  useEffect(() => {
    if (!isUserLoading) {
        if (!user) {
          router.push('/login');
        } else {
            const profile = user;
            const savedHealthIssues = profile.healthIssues || [];
            const known = savedHealthIssues.filter(issue => knownHealthIssues.includes(issue));
            const custom = savedHealthIssues.filter(issue => !knownHealthIssues.includes(issue)).map(value => ({ value }));

            form.reset({
              username: profile.username || '',
              firstName: profile.firstName || '',
              middleName: profile.middleName || '',
              lastName: profile.lastName || '',
              countryCode: profile.countryCode || '',
              phoneNumber: profile.phoneNumber || '',
              age: profile.age || 0,
              gender: profile.gender || undefined,
              bloodGroup: profile.bloodGroup || '',
              healthIssues: known,
              photoURL: profile.photoURL || '',
            });
            replace(custom);
            if (profile.photoURL) {
              setImagePreview(profile.photoURL);
            }
        }
    }
  }, [user, isUserLoading, form, replace, router]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      form.setValue('photoURL', previewUrl);
    }
  };


  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    setIsSaving(true);
    if (!user || !firestore) {
      toast({ variant: 'destructive', title: 'You must be logged in to save your profile.' });
      setIsSaving(false);
      return;
    }

    const allHealthIssues = [
        ...(data.healthIssues || []),
        ...(data.customHealthIssues?.map(i => i.value).filter(Boolean) || []),
    ];

    const profileData = {
        ...data,
        healthIssues: allHealthIssues,
    };
    // @ts-ignore
    delete profileData.customHealthIssues;


    try {
      await saveUserProfile(firestore, user.uid, profileData);
      toast({
        title: 'Profile Updated!',
        description: 'Your profile has been successfully updated.',
      });
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: error.message || 'An unexpected error occurred.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      router.push('/login');
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: 'Logout Failed',
        description: error.message || 'Could not log you out. Please try again.',
      });
    }
  };
  
  const handleGenerateReport = async () => {
    if (!user) {
        toast({variant: 'destructive', title: 'Please log in to generate a report.'})
        return;
    }
    setIsGeneratingReport(true);
    setReport(null);
    setIsReportOpen(true);
    try {
        const reportData = await generateHealthReport({
            userProfile: {
                firstName: user.firstName ?? null,
                lastName: user.lastName ?? null,
                gender: user.gender ?? null,
                age: user.age,
                healthIssues: user.healthIssues
            },
            healthStats: healthStats,
            medications: activeMedications,
            alerts: alerts,
            disposalHistory: disposalHistory,
            nextDosage: nextDosage,
        });
        setReport(reportData);
    } catch (error) {
        console.error("Report generation error:", error);
        toast({variant: 'destructive', title: 'Failed to generate report.'});
        setIsReportOpen(false);
    } finally {
        setIsGeneratingReport(false);
    }
  }


  if (isUserLoading || !user) {
    return (
        <div className='bg-background min-h-screen'>
            <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        </div>
    );
  }


  return (
    <div className='bg-background min-h-screen'>
      <div className="container mx-auto max-w-2xl py-8 px-4 space-y-6">
        <header>
            <h1 className="text-3xl font-bold font-headline">Settings</h1>
            <p className="text-muted-foreground">Manage your profile, preferences, and view health summaries.</p>
        </header>
        
        <Card className="w-full shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl">Health Summary & Statistics</CardTitle>
                <CardDescription>An overview of your medication activity.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                    <StatCard title="Adherence Rate" value={healthStats.adherenceRate} unit="%" icon={Target} progress={healthStats.adherenceRate}/>
                    <StatCard title="Active Meds" value={healthStats.activeMeds} icon={Activity} />
                    <StatCard title="Missed Doses" value={healthStats.missedDoses} icon={X} />
                    <StatCard title="Disposals" value={healthStats.disposals} icon={Trash2} />
                    <StatCard title="Total Meds" value={healthStats.totalMeds} icon={FileText}/>
                    <StatCard title="Health Progress" value={healthStats.improvementScore} unit="%" icon={TrendingUp} progress={healthStats.improvementScore} />
                </div>
                 <Button variant="outline" className="w-full" onClick={handleGenerateReport} disabled={isGeneratingReport}>
                    {isGeneratingReport ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Report...</>
                    ) : (
                        "Generate Full Health Report"
                    )}
                 </Button>
            </CardContent>
        </Card>

        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">User Profile</CardTitle>
            <CardDescription>
              Manage your personal information and health details.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                 <div className='flex flex-col items-center gap-4'>
                    <div className='relative'>
                        <Avatar className='h-24 w-24 border-4 border-primary/20'>
                            <AvatarImage src={imagePreview || undefined} alt={user?.firstName || 'User'} />
                            <AvatarFallback className='text-3xl bg-primary/10 text-primary'>
                                {user?.firstName?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <Button
                            type="button"
                            size="icon"
                            className='absolute bottom-0 right-0 rounded-full'
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Camera className='h-4 w-4'/>
                        </Button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                 </div>

                 <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="your_username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} value={field.value || ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="middleName"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel>Middle Name (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Fitzgerald" {...field} value={field.value || ''}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel>Last Name (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} value={field.value || ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                
                 <FormItem>
                     <FormLabel>Email</FormLabel>
                     <Input type="email" value={user.email || ''} disabled />
                     <FormDescription>You cannot change your email address.</FormDescription>
                 </FormItem>


              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <div className="grid grid-cols-3 gap-2">
                    <FormField
                    control={form.control}
                    name="countryCode"
                    render={({ field }) => (
                        <FormItem>
                            <Select onValueChange={field.onChange} value={field.value || ''}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Code" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {countries.map((country) => (
                                    <SelectItem key={country.code} value={country.dial_code}>
                                        <span className='flex items-center gap-2'>{country.flag} {country.dial_code}</span>
                                    </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormControl>
                                <Input type='tel' placeholder="98765 43210" {...field} value={field.value || ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
              </FormItem>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 30" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || undefined}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your gender" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="bloodGroup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blood Group</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ''}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your blood group" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {bloodGroups.map((group) => (
                              <SelectItem key={group} value={group}>
                                {group}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                <div>
                <FormField
                  control={form.control}
                  name="healthIssues"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Known Health Issues (Optional)</FormLabel>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {knownHealthIssues.map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="healthIssues"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), item])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-2 mt-4">
                  <FormLabel>Other health issues</FormLabel>
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                        <FormField
                            control={form.control}
                            name={`customHealthIssues.${index}.value`}
                            render={({ field }) => (
                                <FormItem className="flex-grow">
                                    <FormControl>
                                        <Input {...field} placeholder="e.g. Pollen Allergy"/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ value: "" })}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Other Issue
                  </Button>
                </div>
              </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <UserCheck className="mr-2 h-4 w-4" />
                      Update Profile
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the app.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="flex items-center gap-2">
                {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span>Dark Mode</span>
              </Label>
              <Switch
                id="dark-mode"
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle>Expired Medications & Disposal</CardTitle>
            <CardDescription>Manage and dispose of expired medications safely.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
                <Label>Expired Medications</Label>
                {expiredProducts.length > 0 ? (
                    expiredProducts.map(product => (
                        <div key={product.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                            <div>
                                <p className="font-semibold">{product.name}</p>
                                <p className="text-sm text-muted-foreground">Expired on: {product.expiry ? new Date(product.expiry).toLocaleDateString() : 'N/A'}</p>
                            </div>
                            <Button variant="destructive" size="sm">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Dispose
                            </Button>
                        </div>
                    ))
                ) : (
                    <p className='text-sm text-muted-foreground text-center py-4'>No expired medications to show.</p>
                )}
            </div>
          </CardContent>
        </Card>

        <Card className="w-full shadow-lg">
            <CardHeader>
                <CardTitle>Disposal History</CardTitle>
                <CardDescription>Your record of safely disposed medications.</CardDescription>
            </CardHeader>
            <CardContent>
                {disposalHistory.length > 0 ? (
                    <div className="space-y-3">
                    {disposalHistory.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                            <div className='flex items-center gap-3'>
                                <CheckCircle2 className='h-5 w-5 text-green-600'/>
                                <div>
                                    <p className="font-semibold">{item.medName}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Disposed on {new Date(item.disposalDate).toLocaleDateString()} via {item.method}
                                    </p>
                                </div>
                            </div>
                            <Badge variant={item.status === 'Verified' ? 'default' : 'secondary'}
                                className={cn(item.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800')}
                            >
                                {item.status}
                            </Badge>
                        </div>
                    ))}
                    </div>
                ) : (
                    <p className='text-sm text-muted-foreground text-center py-4'>No disposal history.</p>
                )}
            </CardContent>
        </Card>

        <Card className="w-full shadow-lg">
            <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your account settings.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="destructive" className="w-full" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </CardContent>
        </Card>
      </div>

       <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Your Health Report</DialogTitle>
              <DialogDescription>
                Generated on {new Date().toLocaleDateString()}. This is a summary of your health data.
              </DialogDescription>
            </DialogHeader>
            {report ? (
              <ScrollArea className='max-h-[60vh]'>
                <div className="space-y-4 pr-4">
                  <section>
                    <h3 className="font-bold text-lg mb-2">Patient Overview</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{report.patientOverview}</p>
                  </section>
                  <section>
                    <h3 className="font-bold text-lg mb-2">Medication Adherence Analysis</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{report.adherenceAnalysis}</p>
                  </section>
                  <section>
                    <h3 className="font-bold text-lg mb-2">Key Health Insights & Alerts</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{report.keyInsightsAndAlerts}</p>
                  </section>
                   <section>
                    <h3 className="font-bold text-lg mb-2">Disposal Activity Summary</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{report.disposalSummary}</p>
                  </section>
                  <section>
                    <h3 className="font-bold text-lg mb-2">Recommendations</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{report.recommendations}</p>
                  </section>
                </div>
              </ScrollArea>
            ) : (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            )}
             <DialogFooter className="pt-4">
                <Button variant="outline" onClick={() => setIsReportOpen(false)}>Close</Button>
                <div className='flex-grow'/>
                <Button><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
                <Button><Share2 className="mr-2 h-4 w-4" /> Share</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </div>
  );
}
