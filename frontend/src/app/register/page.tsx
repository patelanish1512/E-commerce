'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '@/store/apiSlice';
import { setCredentials } from '@/store/authSlice';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegisterPage() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'User'
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [register, { isLoading }] = useRegisterMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const result = await register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                role: formData.role
            }).unwrap();

            if (result.token) {
                dispatch(setCredentials({
                    token: result.token,
                    userId: result.userId || '',
                    email: formData.email,
                    role: formData.role
                }));
                toast.success('Registration successful! Welcome to Aura.');
                router.push('/');
            } else {
                toast.success('Registration successful! Please login.');
                router.push('/login');
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4 bg-background">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg relative z-10 py-10"
            >
                <div className="bg-card border border-border rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.08)] dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden glass">
                    <div className="p-8">
                        <div className="text-center mb-10">
                            <div className="mx-auto h-16 w-16 bg-gradient-to-br from-[#1E1B4B] to-[#6D28D9] rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-[0_8px_16px_rgba(109,40,217,0.25)] mb-6">
                                A
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A] dark:text-white">Create an account</h1>
                            <p className="text-gray-500 text-base mt-2">Join Aura for a premium shopping experience</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* First & Last Name */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground ml-1">First Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="pl-10 w-full h-12 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent transition-all sm:text-sm shadow-inner"
                                            placeholder="John"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground ml-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="px-4 w-full h-12 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent transition-all sm:text-sm shadow-inner"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground ml-1">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="pl-10 w-full h-12 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent transition-all sm:text-sm shadow-inner"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            {/* Account Type */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground ml-1">Account Type</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full h-12 px-4 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent transition-all sm:text-sm cursor-pointer shadow-inner"
                                >
                                    <option value="User">Standard User (Buyer)</option>
                                    <option value="Seller">Seller Account</option>
                                </select>
                            </div>

                            {/* Password & Confirm Password */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground ml-1">Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" style={{ zIndex: 1 }}>
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="pl-10 pr-10 w-full h-12 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent transition-all sm:text-sm shadow-inner"
                                            placeholder="••••••••"
                                            minLength={6}
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

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground ml-1">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            required
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="px-4 pr-10 w-full h-12 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent transition-all sm:text-sm shadow-inner"
                                            placeholder="••••••••"
                                            minLength={6}
                                        />
                                        {/* Eye toggle — always visible */}
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-[#6D28D9] transition-colors focus:outline-none"
                                            style={{ zIndex: 10 }}
                                            tabIndex={-1}
                                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showConfirmPassword
                                                ? <EyeOff className="h-5 w-5" />
                                                : <Eye className="h-5 w-5" />
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 mt-6 rounded-xl text-base bg-gradient-to-r from-[#1E1B4B] to-[#6D28D9] text-white hover:opacity-90 shadow-[0_8px_16px_rgba(109,40,217,0.25)] hover:shadow-[0_10px_20px_rgba(109,40,217,0.4)] transition-all flex items-center justify-center space-x-2 border-0 font-bold"
                            >
                                <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
                                {!isLoading && <ArrowRight className="w-4 h-4" />}
                            </Button>
                        </form>
                    </div>

                    <div className="bg-background border-t border-border p-6 text-center">
                        <p className="text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link href="/login" className="font-bold text-[#6D28D9] hover:text-[#1E1B4B] dark:hover:text-[#D4AF37] hover:underline transition-colors">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Global style to suppress Edge's native password reveal button */}
            <style>{`
                input[type="password"]::-ms-reveal,
                input[type="password"]::-ms-clear {
                    display: none !important;
                }
            `}</style>
        </div>
    );
}
