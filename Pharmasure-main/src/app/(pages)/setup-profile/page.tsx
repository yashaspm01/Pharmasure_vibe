
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useForm, type SubmitHandler, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, UserCheck, X, Search } from 'lucide-react';
import { useUser, useFirestore } from '@/firebase';
import { useRouter } from 'next/navigation';
import { saveUserProfile } from '@/services/user-service';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countries';
import { Checkbox } from '@/components/ui/checkbox';

const knownHealthIssues = [
  "Hypertension", "Diabetes", "Asthma", "Arthritis", "Heart Disease", "Migraine"
];

const profileSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters long.' }),
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
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function SetupProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

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
      bloodGroup: '',
      healthIssues: [],
      customHealthIssues: [],
    },
  });
  
  const { reset } = form;
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'customHealthIssues',
  });

  const filteredCountries = useMemo(() => {
    if (!countrySearch) return countries;
    const search = countrySearch.toLowerCase();
    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(search) ||
        country.dial_code.includes(search) ||
        country.code.toLowerCase().includes(search)
    );
  }, [countrySearch]);

  useEffect(() => {
    if(user) {
      const nameParts = user.displayName?.split(' ') || [];
      reset({ 
        firstName: nameParts[0] || '',
        lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : '',
        username: user.email?.split('@')[0] || user.displayName?.replace(/\s/g, '').toLowerCase() || '',
      });
    }
  }, [user, reset])

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    setIsLoading(true);
    if (!user || !firestore) {
      toast({ variant: 'destructive', title: 'You must be logged in to save your profile.' });
      setIsLoading(false);
      return;
    }
    
    const allHealthIssues = [
        ...(data.healthIssues || []),
        ...(data.customHealthIssues?.map(i => i.value).filter(Boolean) || []),
    ];

    const profileData = {
        ...data,
        email: user.email,
        healthIssues: allHealthIssues,
        profileComplete: true,
    };
    // @ts-ignore
    delete profileData.customHealthIssues;


    try {
      await saveUserProfile(firestore, user.uid, profileData);
      toast({
        title: 'Profile Saved!',
        description: 'Your profile has been successfully updated.',
      });
      router.push('/home');
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast({
        variant: 'destructive',
        title: 'Save Failed',
        description: error.message || 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Complete Your Profile</CardTitle>
          <CardDescription>
            Please fill out the details below to personalize your experience.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
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
                        <Input placeholder="John" {...field} />
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
                        <Input placeholder="Fitzgerald" {...field} value={field.value || ''} />
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
                <FormLabel>Phone Number</FormLabel>
                <div className="space-y-2">
                  {/* Search for Country Code */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search country code (e.g., India, +91)"
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <FormField
                      control={form.control}
                      name="countryCode"
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Code" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-[200px]">
                              {filteredCountries.length > 0 ? (
                                filteredCountries.map((country) => (
                                  <SelectItem key={country.code} value={country.dial_code}>
                                    <span className='flex items-center gap-2'>
                                      {country.flag} {country.dial_code} {country.name}
                                    </span>
                                  </SelectItem>
                                ))
                              ) : (
                                <div className="p-2 text-sm text-muted-foreground text-center">
                                  No countries found
                                </div>
                              )}
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <Button type="submit" className="w-full" disabled={isLoading || isUserLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <UserCheck className="mr-2 h-4 w-4" />
                    Save Profile & Continue
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
