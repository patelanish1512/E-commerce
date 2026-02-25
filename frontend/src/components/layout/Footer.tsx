'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#0F172A] text-white py-16 mt-auto border-t border-white/5 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6D28D9] opacity-10 blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                <div>
                    <div className="flex items-center gap-2 mb-6 group">
                        <div className="h-10 w-10 bg-premium-gradient rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-button-glow transition-transform group-hover:scale-105">
                            A
                        </div>
                        <span className="font-bold text-2xl tracking-tight">Aura</span>
                    </div>
                    <p className="text-sm text-gray-400">
                        A premium multi-vendor eCommerce experience crafted with modern technologies. Buy globally, sell locally.
                    </p>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-6 tracking-wide">Make Money with Us</h3>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><Link href="/seller" className="hover:text-[#D4AF37] hover:translate-x-1 inline-block transition-all">Sell on Aura</Link></li>
                        <li><Link href="/seller/protect" className="hover:text-[#D4AF37] hover:translate-x-1 inline-block transition-all">Protect Your Brand</Link></li>
                        <li><Link href="/seller/global" className="hover:text-[#D4AF37] hover:translate-x-1 inline-block transition-all">Global Selling Portfolio</Link></li>
                        <li><Link href="/affiliates" className="hover:text-[#D4AF37] hover:translate-x-1 inline-block transition-all">Become an Affiliate</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-6 tracking-wide">Let Us Help You</h3>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><Link href="/account" className="hover:text-[#6D28D9] hover:translate-x-1 inline-block transition-all">Your Account</Link></li>
                        <li><Link href="/orders" className="hover:text-[#6D28D9] hover:translate-x-1 inline-block transition-all">Your Orders</Link></li>
                        <li><Link href="/shipping" className="hover:text-[#6D28D9] hover:translate-x-1 inline-block transition-all">Shipping Rates & Policies</Link></li>
                        <li><Link href="/returns" className="hover:text-[#6D28D9] hover:translate-x-1 inline-block transition-all">Returns & Replacements</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-6 tracking-wide">Stay Connected</h3>
                    <p className="text-sm text-gray-400 mb-6 leading-relaxed">Join our inner circle for exclusive luxury releases and curated investor updates.</p>
                    <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Email Address" className="px-4 py-3 w-full rounded-input border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#6D28D9] text-white text-sm transition-all shadow-inner" />
                        <button type="submit" className="bg-premium-gradient text-white px-6 py-3 rounded-button font-semibold shadow-button-glow hover:scale-105 transition-all w-full sm:w-auto mt-2 sm:mt-0 whitespace-nowrap">Subscribe</button>
                    </form>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Aura E-Commerce. All rights reserved.
            </div>
        </footer>
    );
}
