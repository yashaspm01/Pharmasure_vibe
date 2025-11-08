
'use client';
import { usePathname } from 'next/navigation';
import BottomNavBar from '@/components/layout/bottom-nav-bar';
import Chatbot from '@/components/chatbot/Chatbot';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Header from './header';

export default function AppShell({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const noNavAndHeaderPages = ['/login', '/setup-profile', '/', '/language'];
    
    // Pages that are part of the main user flow
    const userPagesWithBottomNav = ['/home', '/products', '/prescription-upload', '/reminders', '/profile'];
    const isUserPageWithBottomNav = userPagesWithBottomNav.some(p => pathname.startsWith(p));
    
    // Default user layout
    const showNav = isClient && isUserPageWithBottomNav;
    const showHeader = isClient && !noNavAndHeaderPages.includes(pathname) && pathname !== '/home';
    const showChatbot = isClient && !noNavAndHeaderPages.includes(pathname);

    return (
        <div className="relative flex min-h-screen flex-col">
            {showHeader && <Header />}
            <main className={cn('flex-1', { 'pb-20': showNav })}>
                {children}
            </main>
            {showNav && <BottomNavBar />}
            {showChatbot && <Chatbot />}
        </div>
    );
}

  