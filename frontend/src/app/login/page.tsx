'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/store/apiSlice';
import { setCredentials } from '@/store/authSlice';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [login, { isLoading }] = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await login({ email, password }).unwrap();
            dispatch(setCredentials({
                token: result.token,
                userId: result.userId || '',
                email: result.email || email,
                role: result.role || 'User'
            }));
            toast.success('Login successful!');
            router.push('/');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.data?.message || 'Failed to login. Please check your credentials.');
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4 bg-background">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-card border border-border rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.08)] dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden glass">
                    <div className="p-8">
                        <div className="text-center mb-10">
                            <div className="mx-auto h-16 w-16 bg-gradient-to-br from-[#1E1B4B] to-[#6D28D9] rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-[0_8px_16px_rgba(109,40,217,0.25)] mb-6">
                                A
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A] dark:text-white">Welcome Back</h1>
                            <p className="text-gray-500 text-base mt-2">Sign in to your premium account</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground ml-1">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 w-full h-12 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent transition-all sm:text-sm shadow-inner"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1 text-sm">
                                    <label className="font-medium text-foreground">Password</label>
                                    <Link href="/forgot-password" className="text-[#6D28D9] hover:text-[#1E1B4B] dark:hover:text-[#D4AF37] hover:underline font-semibold transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" style={{ zIndex: 1 }}>
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 pr-12 w-full h-12 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent transition-all sm:text-sm shadow-inner"
                                        placeholder="••••••••"
                                        style={{ WebkitTextSecurity: showPassword ? 'none' : undefined } as React.CSSProperties}
                                    />
                                    {/* Eye toggle — always visible */}
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-[#6D28D9] transition-colors focus:outline-none"
                                        style={{ zIndex: 10 }}
                                        tabIndex={-1}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword
                                            ? <EyeOff className="h-5 w-5" />
                                            : <Eye className="h-5 w-5" />
                                        }
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 rounded-xl text-base bg-gradient-to-r from-[#1E1B4B] to-[#6D28D9] text-white hover:opacity-90 shadow-[0_8px_16px_rgba(109,40,217,0.25)] hover:shadow-[0_10px_20px_rgba(109,40,217,0.4)] transition-all flex items-center justify-center space-x-2 border-0 font-bold"
                            >
                                <span>{isLoading ? 'Signing in...' : 'Sign in'}</span>
                                {!isLoading && <ArrowRight className="w-4 h-4" />}
                            </Button>
                        </form>
                    </div>

                    <div className="bg-background border-t border-border p-6 text-center">
                        <p className="text-sm text-gray-500">
                            Don&apos;t have an account?{' '}
                            <Link href="/register" className="font-bold text-[#6D28D9] hover:text-[#1E1B4B] dark:hover:text-[#D4AF37] hover:underline transition-colors">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Global style to kill Edge's native password reveal button */}
            <style>{`
                input[type="password"]::-ms-reveal,
                input[type="password"]::-ms-clear {
                    display: none !important;
                }
            `}</style>
        </div>
    );
}
