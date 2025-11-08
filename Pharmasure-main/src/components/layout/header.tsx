'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@/firebase';
import { Search, User } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';

export default function Header() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center justify-start">
            <form onSubmit={handleSearch} className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search for medicine..."
                    className="pl-10 w-full !bg-slate-100"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
        </div>

        <div className="flex items-center justify-end space-x-2">
          <Link href="/profile">
            {isUserLoading ? (
                <Skeleton className='h-9 w-9 rounded-full'/>
            ) : (
                <Avatar className="h-9 w-9 border-2 border-primary/50 cursor-pointer">
                {user?.photoURL ? (
                    <AvatarImage src={user.photoURL} alt={user.firstName || ''} />
                ) : null}
                <AvatarFallback className="bg-primary/20 text-primary font-bold">
                    {user?.firstName ? (
                    user.firstName.charAt(0).toUpperCase()
                    ) : (
                    <User className="h-5 w-5" />
                    )}
                </AvatarFallback>
                </Avatar>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
