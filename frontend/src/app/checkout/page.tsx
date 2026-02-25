'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addOrder } from '@/store/orderSlice';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import { CheckCircle2, ShieldCheck, Truck, CreditCard, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('upi');
    const [upiId, setUpiId] = useState('');

    // Mock
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

    const handlePlaceOrder = () => {
        setIsProcessing(true);
        // Simulate API call to process payment
        setTimeout(() => {
            const newOrder = {
                id: `AUR-${Math.floor(100000 + Math.random() * 900000)}`,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                total,
                status: 'Processing',
                items: cartItems
            };
            dispatch(addOrder(newOrder));
            setIsProcessing(false);
            setStep(3); // Success step
            toast.success('Order placed successfully!');
        }, 2000);
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center max-w-xl flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Truck className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
                <Button onClick={() => router.push('/shop')} size="lg" className="w-full sm:w-auto px-8 rounded-xl shadow-lg shadow-primary/20">
                    Continue Shopping
                </Button>
            </div>
        );
    }

    if (step === 3) {
        return (
            <div className="container mx-auto px-4 py-20 text-center max-w-xl flex flex-col items-center justify-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="text-green-500 mb-6"
                >
                    <CheckCircle2 className="w-24 h-24" />
                </motion.div>
                <h2 className="text-3xl font-extrabold mb-4 tracking-tight">Order Confirmed!</h2>
                <p className="text-gray-500 mb-8 text-lg">Thank you for your purchase. Your order #AUR-{Math.floor(Math.random() * 1000000)} is processing.</p>
                <div className="bg-card border border-border rounded-2xl p-6 w-full text-left mb-8 shadow-sm">
                    <h3 className="font-bold mb-4">Order Details</h3>
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm py-2 border-b border-border last:border-0">
                            <span>{item.quantity}x {item.name}</span>
                            <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-border">
                        <span>Total Paid</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={() => router.push('/orders')} className="rounded-xl px-8 h-12">View Orders</Button>
                    <Button onClick={() => router.push('/')} className="rounded-xl px-8 shadow-lg shadow-primary/20 h-12">Return Home</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-6xl">
            <h1 className="text-3xl font-bold mb-8 tracking-tight">Checkout</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content (Forms) */}
                <div className="flex-1 space-y-6">

                    {/* Step 1: Shipping */}
                    <div className={`border border-border rounded-3xl p-6 bg-card shadow-sm transition-all ${step === 1 ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'opacity-60'}`}>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">1</span>
                            Shipping Address
                        </h2>

                        {step === 1 ? (
                            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium ml-1">First Name</label>
                                        <input required type="text" className="w-full h-11 px-4 mt-1 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none bg-background transition-shadow" defaultValue="John" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium ml-1">Last Name</label>
                                        <input required type="text" className="w-full h-11 px-4 mt-1 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none bg-background transition-shadow" defaultValue="Doe" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium ml-1">Street Address</label>
                                    <input required type="text" className="w-full h-11 px-4 mt-1 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none bg-background transition-shadow" defaultValue="123 Premium Way" />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-2">
                                        <label className="text-sm font-medium ml-1">City</label>
                                        <input required type="text" className="w-full h-11 px-4 mt-1 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none bg-background transition-shadow" defaultValue="San Francisco" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium ml-1">ZIP Code</label>
                                        <input required type="text" className="w-full h-11 px-4 mt-1 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none bg-background transition-shadow" defaultValue="94105" />
                                    </div>
                                </div>
                                <Button type="submit" size="lg" className="w-full mt-4 h-12 rounded-xl text-md shadow-md shadow-primary/20">
                                    Continue to Payment
                                </Button>
                            </form>
                        ) : (
                            <div className="flex justify-between items-center text-sm">
                                <div className="text-gray-600">
                                    <p className="font-medium text-foreground">John Doe</p>
                                    <p>123 Premium Way</p>
                                    <p>San Francisco, CA 94105</p>
                                </div>
                                <button onClick={() => setStep(1)} className="text-primary font-medium hover:underline px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors">Edit</button>
                            </div>
                        )}
                    </div>

                    {/* Step 2: Payment */}
                    <div className={`border border-border rounded-3xl p-6 bg-card shadow-sm transition-all ${step === 2 ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'opacity-60'}`}>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">2</span>
                            Payment Method
                        </h2>

                        {step === 2 && (
                            <div className="space-y-6">
                                {/* Payment Options */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div
                                        onClick={() => setPaymentMethod('upi')}
                                        className={`border rounded-xl p-4 cursor-pointer flex items-center gap-3 transition-colors ${paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'border-border bg-card hover:bg-black/5'}`}
                                    >
                                        <div className={`w-4 h-4 rounded-full border flex-shrink-0 ${paymentMethod === 'upi' ? 'border-4 border-primary bg-white' : 'border-gray-300'}`}></div>
                                        <Smartphone className={`w-6 h-6 ${paymentMethod === 'upi' ? 'text-primary' : 'text-gray-500'}`} />
                                        <span className={`font-semibold tracking-wide ${paymentMethod === 'upi' ? 'text-foreground' : 'text-gray-500'}`}>UPI</span>
                                    </div>

                                    <div
                                        onClick={() => setPaymentMethod('card')}
                                        className={`border rounded-xl p-4 cursor-pointer flex items-center gap-3 transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border bg-card hover:bg-black/5'}`}
                                    >
                                        <div className={`w-4 h-4 rounded-full border flex-shrink-0 ${paymentMethod === 'card' ? 'border-4 border-primary bg-white' : 'border-gray-300'}`}></div>
                                        <CreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-primary' : 'text-gray-500'}`} />
                                        <span className={`font-semibold tracking-wide ${paymentMethod === 'card' ? 'text-foreground' : 'text-gray-500'}`}>Credit / Debit Card</span>
                                    </div>
                                </div>

                                {paymentMethod === 'card' ? (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <div>
                                            <label className="text-sm font-medium ml-1">Card Number</label>
                                            <input type="text" className="w-full h-11 px-4 mt-1 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none bg-background font-mono tracking-widest text-sm" placeholder="•••• •••• •••• ••••" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium ml-1">Expiry Date</label>
                                                <input type="text" className="w-full h-11 px-4 mt-1 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none bg-background font-mono tracking-widest text-sm" placeholder="MM/YY" />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium ml-1">CVC</label>
                                                <input type="password" className="w-full h-11 px-4 mt-1 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none bg-background font-mono tracking-widest text-sm" placeholder="•••" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <div>
                                            <label className="text-sm font-medium ml-1">UPI ID / VPA</label>
                                            <input
                                                type="text"
                                                value={upiId}
                                                onChange={(e) => setUpiId(e.target.value)}
                                                className="w-full h-11 px-4 mt-1 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none bg-background text-sm"
                                                placeholder="username@upi"
                                            />
                                            <p className="text-xs text-gray-500 mt-2 ml-1">A payment request will be sent to this UPI ID.</p>
                                        </div>
                                    </div>
                                )}

                                <Button
                                    onClick={handlePlaceOrder}
                                    disabled={isProcessing}
                                    size="lg"
                                    className="w-full h-14 rounded-xl text-lg shadow-xl shadow-primary/20 space-x-2"
                                >
                                    {isProcessing ? (
                                        <span className="animate-pulse">Processing Payment...</span>
                                    ) : (
                                        <>
                                            <ShieldCheck className="w-5 h-5" />
                                            <span>Pay ${total.toFixed(2)} Securely</span>
                                        </>
                                    )}
                                </Button>
                                <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
                                    <ShieldCheck className="w-3 h-3" /> Payments are processed securely via Stripe.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Summary */}
                <div className="w-full lg:w-96 flex-shrink-0">
                    <div className="sticky top-24 border border-border rounded-3xl p-6 bg-card shadow-sm">
                        <h3 className="text-lg font-bold mb-6">Order Summary</h3>

                        <div className="space-y-4 mb-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-border flex-shrink-0">
                                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-0.5">
                                        <p className="text-sm font-medium line-clamp-2 text-foreground">{item.name}</p>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Qty: {item.quantity}</span>
                                            <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <hr className="border-border mb-4" />

                        <div className="space-y-2 text-sm mb-4">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>Calculated in checkout</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax</span>
                                <span>$0.00</span>
                            </div>
                        </div>

                        <hr className="border-border mb-4" />

                        <div className="flex justify-between items-end mb-6">
                            <span className="text-base font-semibold">Total</span>
                            <div className="text-right">
                                <span className="text-xs text-gray-500 block">USD</span>
                                <span className="text-2xl font-bold text-foreground font-mono">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/20 text-green-600 p-3 rounded-xl text-sm flex items-start gap-2">
                            <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <p>Safe and secure checkout. We respect your privacy.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
