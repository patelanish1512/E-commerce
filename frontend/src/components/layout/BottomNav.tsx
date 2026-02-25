'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, UserCircle } from 'lucide-react';

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass bg-background/90 backdrop-blur-xl border-t border-border pb-safe">
            <div className="flex items-center justify-around h-16 px-4">
                <Link
                    href="/"
                    className={`flex flex-col items-center justify-center w-16 h-full transition-all duration-300 ${pathname === '/' ? 'text-luxury-purple' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    <Home className={`w-6 h-6 mb-1 ${pathname === '/' ? 'scale-110' : ''} transition-transform`} />
                    <span className="text-[10px] font-medium tracking-wide">Home</span>
                </Link>

                <Link
                    href="/shop"
                    className={`flex flex-col items-center justify-center w-16 h-full transition-all duration-300 ${pathname === '/shop' ? 'text-luxury-purple' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    <Compass className={`w-6 h-6 mb-1 ${pathname === '/shop' ? 'scale-110' : ''} transition-transform`} />
                    <span className="text-[10px] font-medium tracking-wide">Explore</span>
                </Link>

                <Link
                    href="/dashboard"
                    className={`flex flex-col items-center justify-center w-16 h-full transition-all duration-300 ${pathname.startsWith('/dashboard') ? 'text-luxury-purple' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    <UserCircle className={`w-6 h-6 mb-1 ${pathname.startsWith('/dashboard') ? 'scale-110' : ''} transition-transform`} />
                    <span className="text-[10px] font-medium tracking-wide">Account</span>
                </Link>
            </div>
        </div>
    );
}
