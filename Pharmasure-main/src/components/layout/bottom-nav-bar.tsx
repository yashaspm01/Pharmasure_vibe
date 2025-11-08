'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Pill, Bell, Settings, QrCode } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export default function BottomNavBar() {
  const pathname = usePathname();
  const homeIsActive = pathname === '/home';
  const myMedsIsActive = pathname.startsWith('/products');
  const reminderIsActive = pathname === '/reminders';
  const settingsIsActive = pathname === '/profile';

  const NavLink = ({ href, label, icon: Icon, isActive }: { href: string; label: string; icon: React.ElementType; isActive: boolean }) => {
    return (
      <Link href={href} className={cn(
        "flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors",
        isActive ? "text-primary" : "text-muted-foreground",
        "hover:text-primary"
      )}>
        <Icon className={cn("h-6 w-6")} />
        <span className={cn("text-xs", isActive ? "font-bold" : "font-medium")}>{label}</span>
      </Link>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-card border-t border-border/50 shadow-[0_-1px_4px_rgba(0,0,0,0.05)] z-50">
      <div className="flex h-full items-center justify-around">
        <NavLink href="/home" label="Home" icon={Home} isActive={homeIsActive} />
        <NavLink href="/products" label="My Meds" icon={Pill} isActive={myMedsIsActive} />
        
        <div className='-mt-10'>
          <Link href="/prescription-upload">
            <Button size="icon" className="w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg border-4 border-background hover:bg-primary/90">
                <QrCode className="h-8 w-8" />
            </Button>
          </Link>
        </div>
        
        <NavLink href="/reminders" label="Reminder" icon={Bell} isActive={reminderIsActive} />
        <NavLink href="/profile" label="Settings" icon={Settings} isActive={settingsIsActive} />
      </div>
    </div>
  );
}
