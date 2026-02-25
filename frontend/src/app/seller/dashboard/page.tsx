'use client';

import { motion } from 'framer-motion';
import {
    Package,
    DollarSign,
    ShoppingCart,
    TrendingUp,
    Plus,
    Edit,
    Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SellerDashboard() {
    const stats = [
        { name: 'Total Sales', value: '$24,563.00', change: '+12.5%', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
        { name: 'Active Products', value: '45', change: '+2', icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { name: 'Pending Orders', value: '12', change: '-3', icon: ShoppingCart, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
        { name: 'Store Views', value: '3,245', change: '+24%', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ];

    const myProducts = [
        { id: '1', name: 'Premium Wireless Headphones', price: '$299.00', stock: 45, status: 'Active' },
        { id: '2', name: 'Ergonomic Desk Chair', price: '$199.99', stock: 12, status: 'Low Stock' },
        { id: '3', name: '4K Ultra HD Monitor', price: '$499.00', stock: 0, status: 'Out of Stock' },
        { id: '4', name: 'Mechanical Gaming Keyboard', price: '$149.50', stock: 89, status: 'Active' },
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Seller Hub</h1>
                    <p className="text-gray-500 mt-1">Manage your store, products, and analyze performance</p>
                </div>
                <div className="flex gap-3">
                    <Button className="rounded-xl shadow-lg shadow-primary/20 space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>Add New Product</span>
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-card glass border border-border rounded-3xl p-6 shadow-sm relative overflow-hidden group"
                    >
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div>
                                <p className="text-gray-500 text-sm font-medium mb-1">{stat.name}</p>
                                <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                            </div>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Products Management */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-border flex justify-between items-center">
                            <h2 className="text-lg font-bold">My Inventory</h2>
                            <button className="text-sm text-primary font-medium hover:underline">View All Products</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-accent/50 text-gray-500 text-sm">
                                        <th className="font-medium p-4 pl-6">Product</th>
                                        <th className="font-medium p-4">Price</th>
                                        <th className="font-medium p-4">Stock</th>
                                        <th className="font-medium p-4">Status</th>
                                        <th className="font-medium p-4 pr-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myProducts.map((product, i) => (
                                        <tr key={i} className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
                                            <td className="p-4 pl-6 font-medium text-foreground">{product.name}</td>
                                            <td className="p-4 text-gray-600 font-semibold">{product.price}</td>
                                            <td className="p-4 text-gray-600">{product.stock} units</td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
                          ${product.status === 'Active' ? 'bg-green-500/10 text-green-600' :
                                                        product.status === 'Low Stock' ? 'bg-orange-500/10 text-orange-600' :
                                                            'bg-red-500/10 text-red-600'}`}
                                                >
                                                    {product.status}
                                                </span>
                                            </td>
                                            <td className="p-4 pr-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-accent rounded-lg">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors hover:bg-red-500/10 rounded-lg">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold mb-6">Recent Activity</h2>
                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:via-border/50 before:to-transparent">
                            {/* Timeline items fake data */}
                            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card text-primary shadow shrink-0 z-10 font-bold text-sm">
                                    $
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border bg-card shadow-sm ml-4 md:ml-0 md:mr-4">
                                    <div className="flex items-center justify-between space-x-2 mb-1">
                                        <div className="font-bold text-sm">New Sale!</div>
                                        <time className="font-caveat text-xs text-gray-500">2 min ago</time>
                                    </div>
                                    <div className="text-xs text-gray-500">Order #1234 containing 1x Headphones.</div>
                                </div>
                            </div>

                            <div className="relative flex items-center justify-between md:justify-normal group is-active mt-6">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card text-blue-500 shadow shrink-0 z-10">
                                    <Package className="w-4 h-4" />
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border bg-card shadow-sm ml-4">
                                    <div className="flex items-center justify-between space-x-2 mb-1">
                                        <div className="font-bold text-sm">Low Stock Alert</div>
                                        <time className="font-caveat text-xs text-gray-500">1 hr ago</time>
                                    </div>
                                    <div className="text-xs text-gray-500">Desk Chair is running low on stock (12 units left).</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
