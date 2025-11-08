import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import AppShell from '@/components/layout/app-shell';
import { ThemeProvider } from '@/components/theme-provider';


const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: 'PharmaSure',
  description: 'Your smart medication management companion.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
        >
            <FirebaseClientProvider>
                <AppShell>{children}</AppShell>
            </FirebaseClientProvider>
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
