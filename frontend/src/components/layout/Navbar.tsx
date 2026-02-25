'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, UserCircle } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleDrawer } from '@/store/cartSlice';

export default function Navbar() {
    const dispatch = useDispatch();
    const { token, email } = useSelector((state: RootState) => state.auth);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full glass bg-background/80 backdrop-blur-xl border-b border-border">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="h-10 w-10 bg-gradient-to-br from-[#1E1B4B] to-[#6D28D9] rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-[0_8px_16px_rgba(109,40,217,0.25)] transition-transform group-hover:scale-105">
                        A
                    </div>
                    <span className="font-extrabold text-2xl tracking-tight hidden sm:block text-[#0F172A] dark:text-white group-hover:text-[#6D28D9] transition-colors">Aura</span>
                </Link>

                {/* Search Bar */}
                <div className="flex-1 max-w-2xl mx-4 hidden md:flex">
                    <div className="relative w-full group">
                        <input
                            type="text"
                            placeholder="Explore our luxury collection..."
                            className="w-full h-12 pl-12 pr-4 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-[#6D28D9] shadow-inner transition-all duration-300"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#6D28D9] transition-colors duration-300" />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <button className="md:hidden p-2 text-foreground hover:bg-accent hover:text-accent-foreground rounded-full transition-colors">
                        <Search className="w-5 h-5" />
                    </button>

                    <Link href={mounted && token ? "/dashboard" : "/login"}>
                        <button className="flex items-center gap-2 p-2 hover:bg-accent rounded-full transition-colors text-foreground">
                            <UserCircle className="w-5 h-5" />
                            <div className="hidden sm:block text-sm text-left leading-tight">
                                <p className="text-xs text-gray-500">Hello, {mounted && token ? email?.split('@')[0] : 'Sign In'}</p>
                                <p className="font-semibold">Account</p>
                            </div>
                        </button>
                    </Link>

                    <button
                        onClick={() => dispatch(toggleDrawer())}
                        className="relative p-2 text-foreground hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all hover:scale-105 duration-200"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        <span className="absolute top-0 right-0 h-5 w-5 bg-gradient-to-r from-[#1E1B4B] to-[#6D28D9] text-white text-[10px] font-bold flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1 shadow-[0_4px_10px_rgba(109,40,217,0.4)] border-2 border-white dark:border-[#0F172A] animate-pulse">
                            0
                        </span>
                    </button>

                    <button className="lg:hidden p-2 text-foreground hover:bg-accent rounded-full transition-colors">
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}
