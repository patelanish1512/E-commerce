'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    imageUrl: string;
    category: string;
    rating?: number;
}

export default function ProductCard({ id, name, price, originalPrice, imageUrl, category, rating = 4.5 }: ProductCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="group relative flex flex-col bg-card rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_40px_rgba(30,27,75,0.08)] transition-all duration-300 border border-border"
        >
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {originalPrice && originalPrice > price && (
                    <span className="bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20 text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
                        Sale
                    </span>
                )}
            </div>

            {/* Wishlist Button */}
            <button className="absolute top-4 right-4 z-10 p-2.5 bg-white/60 backdrop-blur-md rounded-full text-gray-500 hover:text-[#DC2626] hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 translate-y-2 group-hover:translate-y-0">
                <Heart className="w-5 h-5" />
            </button>

            {/* Image Container */}
            <Link href={`/product/${id}`} className="relative h-64 w-full bg-gray-100 overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
            </Link>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-[10px] text-[#6D28D9] font-bold tracking-widest uppercase mb-2">{category}</p>
                <Link href={`/product/${id}`} className="hover:text-[#6D28D9] transition-colors">
                    <h3 className="font-semibold text-lg line-clamp-2 text-foreground leading-snug mb-3 hover:underline decoration-2 underline-offset-4 decoration-[#6D28D9]/30">
                        {name}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-[#D4AF37]' : 'text-gray-200 dark:text-gray-700'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({rating})</span>
                </div>

                <div className="mt-auto flex items-end justify-between relative">
                    <div>
                        {originalPrice && originalPrice > price && (
                            <span className="text-sm text-muted-foreground line-through block mb-0.5">${originalPrice.toFixed(2)}</span>
                        )}
                        <span className="text-2xl font-black text-foreground">${price.toFixed(2)}</span>
                    </div>
                    <Button size="icon" className="rounded-full bg-[#1E1B4B] text-white hover:bg-[#6D28D9] shadow-[0_8px_16px_rgba(109,40,217,0.25)] h-12 w-12 flex items-center justify-center hover:scale-110 transition-all duration-300" aria-label="Add to cart">
                        <ShoppingCart className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
