import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import CartDrawer from "@/components/cart/CartDrawer";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Aura - Premium eCommerce Platform",
  description: "A modern, reliable, and premium multi-vendor eCommerce experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased min-h-screen bg-[var(--background)] flex flex-col`}>
        <StoreProvider>
          <Toaster position="bottom-right" />
          <Navbar />
          <CartDrawer />
          <main className="flex-grow pb-20 md:pb-0">
            {children}
          </main>
          <Footer />
          <BottomNav />
        </StoreProvider>
      </body>
    </html>
  );
}
