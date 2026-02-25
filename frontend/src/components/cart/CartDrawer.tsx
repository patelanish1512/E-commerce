'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Trash2, ArrowRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { closeDrawer } from '@/store/cartSlice';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

export default function CartDrawer() {
    const dispatch = useDispatch();
    const { isDrawerOpen } = useSelector((state: RootState) => state.cartUI);

    // Mock items for visual testing since Cart RTK Query isn't wired fully to components yet
    const cartItems = [
        {
            id: "1",
            name: "Sony WH-1000XM5 Wireless Headphones",
            price: 348.00,
            quantity: 1,
            imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=200&auto=format&fit=crop"
        }
    ];

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <AnimatePresence>
            {isDrawerOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => dispatch(closeDrawer())}
                        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-[70] w-full max-w-sm sm:max-w-md bg-card shadow-2xl border-l border-border flex flex-col pt-16" // Offset for mobile, or cover full
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <ShoppingCart className="w-5 h-5 text-primary" />
                                Your Cart
                            </h2>
                            <button
                                onClick={() => dispatch(closeDrawer())}
                                className="p-2 hover:bg-accent rounded-full text-gray-500 hover:text-foreground transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
                                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                                        <ShoppingCart className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <p>Your cart is empty.</p>
                                    <Button variant="outline" onClick={() => dispatch(closeDrawer())}>
                                        Start Shopping
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="flex gap-4 p-3 bg-background rounded-xl border border-border"
                                        >
                                            <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h4 className="font-semibold text-sm line-clamp-2">{item.name}</h4>
                                                    <p className="text-primary font-bold mt-1">${item.price.toFixed(2)}</p>
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center border border-border rounded-md overflow-hidden">
                                                        <button className="px-2 py-0.5 hover:bg-accent text-sm transition-colors">-</button>
                                                        <span className="px-2 text-sm font-medium">{item.quantity}</span>
                                                        <button className="px-2 py-0.5 hover:bg-accent text-sm transition-colors">+</button>
                                                    </div>
                                                    <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer / Checkout */}
                        {cartItems.length > 0 && (
                            <div className="p-4 bg-background border-t border-border">
                                <div className="flex justify-between items-center mb-4 text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="font-bold text-lg">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center mb-6 text-sm text-green-500">
                                    <span>Shipping</span>
                                    <span className="font-semibold">Free</span>
                                </div>
                                <Link href="/checkout" onClick={() => dispatch(closeDrawer())}>
                                    <Button className="w-full text-lg py-6 shadow-lg shadow-primary/25 rounded-xl">
                                        Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                                <p className="text-xs text-center text-gray-400 mt-4 px-4">
                                    Taxes and shipping calculated at checkout. Proceeding implies accepting our Terms & Conditions.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
