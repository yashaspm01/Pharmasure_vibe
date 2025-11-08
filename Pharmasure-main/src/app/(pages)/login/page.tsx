
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PharmaSureLogo } from '@/components/icons';
import { useState, useEffect } from 'react';
import { useAuth, useFirestore } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, type User } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Eye, EyeOff, User as UserIcon, Pill } from 'lucide-react';
import { doc, getDoc, setDoc, type Firestore } from 'firebase/firestore';
import { cn } from '@/lib/utils';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 12.02C34.553 7.784 29.605 5 24 5C12.955 5 4 13.955 4 24s8.955 19 20 19s20-8.955 20-19c0-1.341-.138-2.65-.389-3.917z" />
        <path fill="#FF3D00" d="M6.306 14.691c-1.346 2.536-2.079 5.438-2.079 8.539c0 3.101 0.733 5.999 2.079 8.539l-4.794 3.73C-0.461 32.062-2 28.232-2 24c0-4.232 1.539-8.062 4.098-11.021L6.306 14.691z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-4.794-3.73C30.462 37.5 27.466 39 24 39c-3.466 0-6.462-1.5-8.615-3.885l-4.794 3.73C14.14 42.023 18.834 44 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-0.792 2.237-2.231 4.166-4.087 5.574l4.794 3.73C39.902 33.635 44 27.536 44 20c0-1.341-0.138-2.65-0.389-3.917z" />
    </svg>
);
const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" fill="currentColor" {...props}><path d="M19.3,4.992c-1.2-1.3-2.8-2.2-4.8-2.3c-0.1,0-0.2,0-0.3,0c-0.8,0-1.6,0.2-2.4,0.5c-0.7,0.3-1.4,0.7-2,1.2 c-1.2,0.9-2.2,2.3-2.6,3.9c-0.5,1.7,0,3.3,0.9,4.8c0.5,0.9,1.2,1.6,2,2.1C10.7,19.692,11.3,19.992,12,19.992 c0.1,0,0.2,0,0.3,0c0.7,0,1.4-0.2,2-0.5c0.8-0.3,1.5-0.8,2.1-1.4c0.1-0.1,0.2-0.2,0.3-0.3c-0.8-0.5-1.2-1.4-1.2-2.4 c0-1.5,1.2-2.8,2.8-2.8c0.2,0,0.5,0,0.7,0.1c0-0.1,0-0.2,0-0.2c0-1.5-0.5-2.9-1.5-4.1C19.4,4.992,19.3,4.992,19.3,4.992z M12.4,4.192c0.6-0.2,1.2-0.4,1.8-0.4c0.5,0,1,0.1,1.5,0.2c0.1,0,0.1,0,0.2,0c-0.6,0.8-1,1.8-1,2.8c0,0.3,0,0.5,0.1,0.8 c-0.1,0-0.2,0-0.4,0C13.2,7.592,12.4,5.992,12.4,4.192z"/></svg>
)

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const signupSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
});


const handleRedirect = async (user: User | null, router: ReturnType<typeof useRouter>, firestore: Firestore) => {
    if (!user) return;
    try {
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();

        // Redirect based on role
        if (userData?.role === 'pharmacist') {
            router.push('/pharmacist-dashboard');
        } else if (userData?.profileComplete) {
            router.push('/home');
        } else {
            router.push('/setup-profile');
        }
    } catch (error) {
        console.error("Redirection error:", error);
        // Fallback to setup profile if firestore check fails
        router.push('/setup-profile');
    }
  };


export default function AuthPage() {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedRole, setSelectedRole] = useState<'user' | 'pharmacist'>('user');
  
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  // Load saved role preference from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem('preferred_role') as 'user' | 'pharmacist' | null;
    if (savedRole) {
      setSelectedRole(savedRole);
    }
  }, []);

  // Save role preference to localStorage when it changes
  const handleRoleChange = (role: 'user' | 'pharmacist') => {
    setSelectedRole(role);
    localStorage.setItem('preferred_role', role);
  };

  const handleGoogleSignIn = async () => {
    if (!auth || !firestore) return;
    
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userDocRef = doc(firestore, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        const [firstName, ...lastNameParts] = user.displayName?.split(' ') || ['', ''];
        await setDoc(userDocRef, { 
            email: user.email,
            firstName: firstName,
            lastName: lastNameParts.join(' '),
            profileComplete: false, // Always redirect to profile setup on first login
            role: selectedRole, // Save selected role
         }, { merge: true });
      }

      toast({
        title: 'Signed in successfully!',
        description: 'You have successfully signed in with Google.',
      });
      await handleRedirect(result.user, router, firestore);
    } catch (error: any) {
      if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
        // User cancelled the popup, so we do nothing.
        return;
      }
      console.error('Error signing in with Google:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message || 'Could not sign in with Google.',
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("/images/login-bg.jpg")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          filter: 'brightness(0.4)'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/60 z-1" />
      
      <Card className="mx-auto max-w-sm w-full shadow-2xl rounded-2xl relative z-10 bg-background/90 backdrop-blur-sm border border-border/50">
        <CardHeader className="p-8 text-center">
            <Link href="/" className="inline-block mb-4">
                <PharmaSureLogo className="h-16 w-16 text-primary mx-auto"/>
            </Link>
            
            {/* Role Selector */}
            <div className="flex gap-2 mb-6 p-1 bg-muted rounded-lg">
              <button
                onClick={() => handleRoleChange('user')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md transition-all font-medium text-sm",
                  selectedRole === 'user'
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <UserIcon className="h-4 w-4" />
                User
              </button>
              <button
                onClick={() => handleRoleChange('pharmacist')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md transition-all font-medium text-sm",
                  selectedRole === 'pharmacist'
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Pill className="h-4 w-4" />
                Pharmacist
              </button>
            </div>

            <CardTitle className="text-2xl font-bold font-headline">
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription>
                {authMode === 'login' ? "Sign in to continue to PharmaSure" : "Sign up for a new account"}
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-8 pb-8 pt-0">

          {authMode === 'login' ? 
            <LoginForm setAuthMode={setAuthMode} selectedRole={selectedRole} /> : 
            <SignupForm setAuthMode={setAuthMode} selectedRole={selectedRole} />
          }

          <div className='relative pt-4'>
              <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t'></span>
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                  <span className='bg-card px-2 text-muted-foreground'>Or continue with</span>
              </div>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
              <GoogleIcon className="mr-2 h-5 w-5" /> Google
            </Button>
            <Button variant="outline" className="w-full">
              <AppleIcon className="mr-2 h-5 w-5" /> Apple
            </Button>
          </div>
        </CardContent>
      </Card>
      <p className="text-center text-sm text-muted-foreground mt-8">© PharmaSure {new Date().getFullYear()}. All rights reserved.</p>
    </div>
  );
}

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = ({ setAuthMode, selectedRole }: { setAuthMode: (mode: 'login' | 'signup') => void; selectedRole: 'user' | 'pharmacist'; }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoading(true);
    if (!auth || !firestore) {
      toast({ variant: 'destructive', title: 'Authentication service not available.' });
      setIsLoading(false);
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, data.email, data.password);
      
      // Update user role if it doesn't match the selected role
      const userDocRef = doc(firestore, 'users', result.user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists() && userDoc.data()?.role !== selectedRole) {
        await setDoc(userDocRef, { role: selectedRole }, { merge: true });
      }
      
      toast({ title: 'Login Successful', description: 'Welcome back!' });
      await handleRedirect(result.user, router, firestore);
    } catch (error: any) {
      console.error('Login error:', error);
      let description = "An unexpected error occurred. Please try again.";
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        description = "Invalid email or password. Please check your credentials and try again.";
      }
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: description,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder='name@email.com' 
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                <Link href="#" className="text-sm text-primary hover:underline font-semibold">
                    Forgot Password?
                </Link>
              </div>
              <FormControl>
                 <div className="relative">
                    <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...field} />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                    </Button>
                  </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-4" disabled={isLoading} size="lg">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>

         <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <Button variant="link" className="p-0 h-auto font-semibold" onClick={() => setAuthMode('signup')}>
                Sign up
            </Button>
        </div>
      </form>
    </Form>
  );
};

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupForm = ({ setAuthMode, selectedRole }: { setAuthMode: (mode: 'login' | 'signup') => void; selectedRole: 'user' | 'pharmacist'; }) => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: '', email: '', password: '' },
  });


  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    setIsLoading(true);
    if (!auth || !firestore) {
      toast({ variant: 'destructive', title: 'Authentication service not available.' });
      setIsLoading(false);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      
      const [firstName, ...lastNameParts] = data.fullName.split(' ');
      await updateProfile(userCredential.user, {
        displayName: data.fullName,
      });

      const userDocRef = doc(firestore, 'users', userCredential.user.uid);
      const profileData: any = { 
          email: data.email, 
          fullName: data.fullName,
          firstName: firstName,
          lastName: lastNameParts.join(' '),
          profileComplete: false,
          role: selectedRole, // Save selected role
        };
      await setDoc(userDocRef, profileData, { merge: true });
      
      toast({ title: 'Account Created!', description: 'Please complete your profile.' });
      await handleRedirect(userCredential.user, router, firestore);
    } catch (error: any) {
      console.error('Signup error:', error);
      let description = 'An unexpected error occurred. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        description = 'This email is already in use. Please log in or use a different email.';
      } else if (error.message) {
        description = error.message;
      }
      toast({
        variant: 'destructive',
        title: 'Sign Up Failed',
        description: description,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Max Robinson" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Create a password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-4" disabled={isLoading} size="lg">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign Up
        </Button>
        <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Button variant="link" className="p-0 h-auto font-semibold" onClick={() => setAuthMode('login')}>
                Sign in
            </Button>
        </div>
      </form>
    </Form>
  );
};

    