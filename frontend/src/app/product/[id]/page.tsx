'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { openDrawer } from '@/store/cartSlice';
import { Button } from '@/components/ui/Button';
import { ShoppingCart, Star, ShieldCheck, Truck, RotateCcw, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    // Mock product data 
    const product = {
        id: params.id,
        name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
        price: 348.00,
        originalPrice: 398.00,
        description: "Industry-leading noise cancellation optimized to you. Magnificent Sound, engineered to perfection. Crystal clear hands-free calling. Up to 30-hour battery life with quick charging. The best headphones just got better.",
        category: "Electronics",
        seller: "Sony Official Store",
        stock: 15,
        rating: 4.8,
        reviewsCount: 1245,
        images: [
            "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1200&auto=format&fit=crop"
        ]
    };

    const handleAddToCart = () => {
        // Dispatch Redux RTK mutation here in real scenario
        toast.success(`${quantity}x ${product.name} added to cart`);
        dispatch(openDrawer());
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

                {/* Product Images (Left side) */}
                <div className="lg:col-span-6 flex flex-col gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative h-[400px] sm:h-[500px] w-full bg-card border border-border rounded-3xl overflow-hidden glass shadow-sm cursor-zoom-in"
                    >
                        <Image
                            src={product.images[selectedImage]}
                            alt={product.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500 ease-out"
                        />
                    </motion.div>
                    <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`relative w-24 h-24 rounded-xl border-2 overflow-hidden flex-shrink-0 transition-all ${selectedImage === idx ? 'border-primary ring-2 ring-primary/30 ring-offset-2' : 'border-border hover:border-gray-400'}`}
                            >
                                <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info (Right side) */}
                <div className="lg:col-span-6 flex flex-col py-2">
                    <p className="text-sm text-primary font-semibold uppercase tracking-wider mb-2">{product.category}</p>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight mb-4">
                        {product.name}
                    </h1>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                            ))}
                        </div>
                        <span className="text-primary font-medium hover:underline cursor-pointer">{product.reviewsCount} Ratings</span>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-600">Sold by <span className="text-primary font-medium hover:underline cursor-pointer">{product.seller}</span></span>
                    </div>

                    <div className="mb-6">
                        <div className="flex items-end gap-3 mb-1">
                            <span className="text-4xl font-bold text-foreground">${product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                                <span className="text-lg text-gray-400 line-through mb-1">${product.originalPrice.toFixed(2)}</span>
                            )}
                            {product.originalPrice && (
                                <span className="text-sm font-semibold text-green-500 bg-green-500/10 px-2 py-1 rounded-md mb-2">
                                    Save ${(product.originalPrice - product.price).toFixed(2)}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-500">Inclusive of all taxes</p>
                    </div>

                    <p className="text-base text-gray-600 mb-8 leading-relaxed">
                        {product.description}
                    </p>

                    <hr className="border-border mb-8" />

                    {/* Action Area */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="flex items-center justify-between border border-border rounded-2xl bg-card overflow-hidden h-14 px-2 w-full sm:w-1/3">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-10 h-10 flex items-center justify-center hover:bg-accent rounded-xl transition-colors font-medium text-lg"
                            >-</button>
                            <span className="font-semibold text-lg">{quantity}</span>
                            <button
                                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                className="w-10 h-10 flex items-center justify-center hover:bg-accent rounded-xl transition-colors font-medium text-lg"
                            >+</button>
                        </div>
                        <Button
                            size="lg"
                            onClick={handleAddToCart}
                            className="flex-1 h-14 text-lg rounded-2xl shadow-xl shadow-primary/20"
                        >
                            <ShoppingCart className="mr-2 w-5 h-5" /> Add to Cart
                        </Button>
                        <Button size="icon" variant="outline" className="h-14 w-14 rounded-2xl flex-shrink-0">
                            <Heart className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Guarantees */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-auto pt-6">
                        <div className="flex flex-col items-center justify-center text-center p-4 bg-accent/30 rounded-2xl">
                            <ShieldCheck className="w-6 h-6 text-primary mb-2" />
                            <span className="text-sm font-medium">1 Year Warranty</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center p-4 bg-accent/30 rounded-2xl">
                            <RotateCcw className="w-6 h-6 text-primary mb-2" />
                            <span className="text-sm font-medium">30 Day Return</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center p-4 bg-accent/30 rounded-2xl">
                            <Truck className="w-6 h-6 text-primary mb-2" />
                            <span className="text-sm font-medium">Free Shipping</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
