'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/Button';

// Dummy data for visual development
const FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    price: 348.00,
    originalPrice: 398.00,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop",
    rating: 4.8
  },
  {
    id: "2",
    name: "Apple MacBook Pro M3 Max 16-inch",
    price: 3499.00,
    category: "Computers",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
    rating: 4.9
  },
  {
    id: "3",
    name: "Nike Air Max 270 Premium Edition",
    price: 150.00,
    originalPrice: 180.00,
    category: "Footwear",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    rating: 4.6
  },
  {
    id: "4",
    name: "Breville Barista Express Espresso Machine",
    price: 699.95,
    category: "Home & Kitchen",
    imageUrl: "https://images.unsplash.com/photo-1517246286134-8b6537afddfe?q=80&w=800&auto=format&fit=crop",
    rating: 4.7
  }
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">

      {/* Hero Section */}
      <section className="relative w-full h-[600px] sm:h-[750px] flex items-center justify-center overflow-hidden bg-[#0F172A]">
        {/* Animated Orbs/Background elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6D28D9] opacity-30 blur-[120px] mix-blend-screen animate-pulse rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1E1B4B] opacity-40 blur-[100px] mix-blend-screen rounded-full pointer-events-none"></div>

        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent z-10"></div>

        <div className="container mx-auto px-4 relative z-20 text-center flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="px-5 py-2 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 font-semibold tracking-wider text-xs uppercase mb-8 inline-block shadow-lg"
          >
            Spring Collection 2026
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-8 max-w-5xl leading-[1.1] drop-shadow-2xl"
          >
            Discover Premium <br className="hidden sm:block" /><span className="text-transparent bg-clip-text bg-premium-gradient filter drop-shadow hover:scale-105 transition-transform cursor-default inline-block">Marketplace</span> Finds
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg sm:text-2xl text-gray-300 mb-10 max-w-2xl font-light"
          >
            Shop electronics, fashion, and home essentials from verified sellers worldwide with lightning-fast delivery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto mt-4"
          >
            <Button size="lg" className="text-lg px-10 h-14 rounded-button bg-premium-gradient shadow-button-glow hover:scale-105 transition-transform border-none text-white font-semibold">
              Explore Collection <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-10 h-14 rounded-button bg-white/5 border-white/20 text-white hover:bg-white/10 glass hover:scale-105 transition-transform font-semibold">
              Become a Partner
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-16 text-sm font-medium text-gray-300"
          >
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#059669]"></div>Secure Payment</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#059669]"></div>Verified Sellers</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#059669]"></div>Fast Delivery</div>
          </motion.div>
        </div>
      </section>

      {/* Trust Features Bar */}
      <section className="w-full relative z-30 -mt-20 sm:-mt-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 p-6 md:p-10 bg-white/90 dark:bg-card/80 backdrop-blur-3xl rounded-[2rem] border border-white/20 dark:border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]"
          >
            {[
              { icon: Zap, title: "Fast Delivery", desc: "Blazing fast delivery on all premium orders worldwide." },
              { icon: Shield, title: "Secure Payments", desc: "100% encrypted and secure transactions via Stripe." },
              { icon: Globe, title: "Global Sellers", desc: "Access elite products from verified global sellers." }
            ].map((feature, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 flex-1 p-4 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300"
              >
                <div className="p-4 bg-luxury-purple/10 text-luxury-purple rounded-2xl shadow-sm shrink-0">
                  <feature.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="w-full py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-end mb-16 border-b border-border pb-6">
            <div>
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight text-luxury-dark dark:text-white">Featured Luxury</h2>
              <p className="text-muted-foreground text-lg">Curated selections for the discerning eye</p>
            </div>
            <Link href="/shop" className="hidden sm:flex text-luxury-purple font-semibold items-center hover:text-luxury-indigo transition-colors hover:underline decoration-2 underline-offset-4">
              View Collection <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" className="w-full">View All Products</Button>
          </div>
        </div>
      </section>

    </main>
  );
}
