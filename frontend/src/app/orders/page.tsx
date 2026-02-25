'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Package, Truck, CheckCircle2, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
export default function OrdersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const reduxOrders = useSelector((state: RootState) => state.orders.orders);

    const filteredOrders = reduxOrders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Delivered':
                return <CheckCircle2 className="w-4 h-4 text-green-500" />;
            case 'Processing':
                return <Package className="w-4 h-4 text-blue-500" />;
            case 'Shipped':
                return <Truck className="w-4 h-4 text-orange-500" />;
            default:
                return <Package className="w-4 h-4 text-gray-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-500/10 text-green-600 border-green-500/20';
            case 'Processing':
                return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
            case 'Shipped':
                return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
            default:
                return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header Section */}
            <div className="bg-card border-b border-border pt-12 pb-8">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-6">
                        Order History
                    </h1>

                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full sm:max-w-md">
                            <input
                                type="text"
                                placeholder="Search by Order ID or Product Name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-11 pl-11 pr-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none transition-all shadow-sm"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                        <Button variant="outline" className="w-full sm:w-auto shrink-0 gap-2 h-11 rounded-xl">
                            <Filter className="w-4 h-4" /> Filter Orders
                        </Button>
                    </div>
                </div>
            </div>

            {/* Orders List */}
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {filteredOrders.length === 0 ? (
                    <div className="text-center py-20 bg-card border border-border rounded-3xl shadow-sm">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-bold mb-2">No orders found</h2>
                        <p className="text-gray-500 mb-6">We couldn't find any orders matching your search.</p>
                        <Button onClick={() => setSearchTerm('')} variant="outline" className="rounded-xl">Clear Search</Button>
                    </div>
                ) : (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {filteredOrders.map((order) => (
                            <div key={order.id} className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                {/* Order Header */}
                                <div className="bg-black/5 dark:bg-white/5 border-b border-border p-4 sm:p-6 flex flex-wrap gap-4 justify-between items-center">
                                    <div className="flex gap-8 flex-wrap">
                                        <div>
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Order Placed</p>
                                            <p className="font-medium text-foreground">{order.date}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total</p>
                                            <p className="font-medium text-foreground">${order.total.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Order ID</p>
                                            <p className="font-medium text-foreground font-mono">{order.id}</p>
                                        </div>
                                    </div>
                                    <div className={`px-4 py-1.5 rounded-full border flex items-center gap-2 text-sm font-semibold shadow-sm ${getStatusColor(order.status)}`}>
                                        {getStatusIcon(order.status)}
                                        {order.status}
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-4 sm:p-6">
                                    <div className="space-y-6">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                                                <div className="w-24 h-24 sm:w-28 sm:h-28 relative rounded-2xl overflow-hidden border border-border flex-shrink-0 bg-white">
                                                    <Image
                                                        src={item.imageUrl}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <Link href="#" className="font-bold text-lg text-foreground hover:text-primary transition-colors line-clamp-2 mb-1">
                                                        {item.name}
                                                    </Link>
                                                    <p className="text-gray-500 mb-2">Qty: {item.quantity}</p>
                                                    <div className="flex gap-3">
                                                        <Button variant="outline" size="sm" className="rounded-lg text-xs h-8">View Item</Button>
                                                        <Button variant="outline" size="sm" className="rounded-lg text-xs h-8">Buy it again</Button>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-border flex justify-end gap-3">
                                        <Button variant="outline" className="rounded-xl">Track Package</Button>
                                        <Button className="rounded-xl shadow-md shadow-primary/20">View Invoice</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
