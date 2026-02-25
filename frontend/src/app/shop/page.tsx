'use client';

import { useState } from 'react';
import ProductCard from '@/components/products/ProductCard';
import { useGetProductsQuery } from '@/store/apiSlice';
import { Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ShopPage() {
    const [searchTerm, setSearchTerm] = useState('');

    // Use debounce in a real app or just use RTK Query fetching depending on requirements
    // For demo: Let's fetch products with no params initially
    const { data: products, isLoading } = useGetProductsQuery({});

    // Render dummy data if API fails to load locally to keep UI presentation intact
    const displayProducts = Array.isArray(products) && products.length > 0 ? products : [
        { id: "1", name: "Sony WH-1000XM5 Wireless Headphones", price: 348.00, originalPrice: 398.00, category: "Electronics", imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop", rating: 4.8 },
        { id: "2", name: "Apple MacBook Pro M3 Max 16-inch", price: 3499.00, category: "Computers", imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop", rating: 4.9 },
        { id: "3", name: "Nike Air Max 270 Premium Edition", price: 150.00, originalPrice: 180.00, category: "Footwear", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop", rating: 4.6 },
        { id: "4", name: "Breville Barista Espresso Machine", price: 699.95, category: "Home & Kitchen", imageUrl: "https://images.unsplash.com/photo-1517246286134-8b6537afddfe?q=80&w=800&auto=format&fit=crop", rating: 4.7 },
        { id: "5", name: "Dyson V15 Detect SV22 Extra Absolute", price: 749.00, category: "Home & Kitchen", imageUrl: "https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=800&auto=format&fit=crop", rating: 4.5 },
        { id: "6", name: "Canon EOS R5 Mirrorless Camera", price: 3899.00, originalPrice: 4000.00, category: "Photography", imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop", rating: 4.9 },
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
                    <p className="text-gray-500 mt-1">Showing {displayProducts.length} results</p>
                </div>

                <div className="flex w-full md:w-auto gap-2">
                    <div className="relative w-full md:w-80 group">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                    </div>
                    <button className="h-10 px-4 flex items-center gap-2 bg-card border border-border rounded-xl hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm whitespace-nowrap">
                        <SlidersHorizontal className="w-4 h-4" />
                        <span className="hidden sm:inline text-sm font-medium">Filters</span>
                    </button>
                </div>
            </div>

            <div className="flex gap-8">
                {/* Sidebar Filters (Hidden on mobile for now, can be a drawer) */}
                <aside className="hidden lg:block w-64 flex-shrink-0 space-y-8">
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">Categories</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            {['All Categories', 'Electronics', 'Computers', 'Photography', 'Footwear', 'Home & Kitchen'].map((cat, i) => (
                                <li key={i}>
                                    <button className={`hover:text-primary transition-colors ${i === 0 ? 'text-primary font-medium' : ''}`}>
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-lg">Price Range</h3>
                        <div className="space-y-4 text-sm">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded text-primary focus:ring-primary" /> Under $50
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded text-primary focus:ring-primary" /> $50 - $100
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded text-primary focus:ring-primary" /> $100 - $500
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded text-primary focus:ring-primary" /> Over $500
                            </label>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="animate-pulse bg-card rounded-2xl h-96 border border-border"></div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {displayProducts.map((product: any) => (
                                <ProductCard key={product.id} {...product} />
                            ))}
                        </motion.div>
                    )}

                    {displayProducts.length === 0 && !isLoading && (
                        <div className="text-center py-20">
                            <h3 className="text-xl font-medium mb-2">No products found</h3>
                            <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
