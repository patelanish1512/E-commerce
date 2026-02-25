'use client';

import { motion } from 'framer-motion';
import {
    Users,
    ShoppingBag,
    DollarSign,
    TrendingUp,
    Activity,
    CheckCircle,
    Clock,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminDashboard() {
    const stats = [
        { name: 'Total Revenue', value: '$124,563.00', change: '+12.5%', icon: DollarSign },
        { name: 'Active Users', value: '45,231', change: '+5.2%', icon: Users },
        { name: 'Total Orders', value: '1,245', change: '+18.1%', icon: ShoppingBag },
        { name: 'Conversion Rate', value: '3.24%', change: '+2.4%', icon: TrendingUp },
    ];

    const recentOrders = [
        { id: '#ORD-001', customer: 'Alex Johnson', date: '2023-10-24', total: '$1,299.00', status: 'Completed' },
        { id: '#ORD-002', customer: 'Sarah Miller', date: '2023-10-24', total: '$349.00', status: 'Processing' },
        { id: '#ORD-003', customer: 'Michael Brown', date: '2023-10-23', total: '$89.99', status: 'Pending' },
        { id: '#ORD-004', customer: 'Emily Davis', date: '2023-10-23', total: '$2,450.00', status: 'Completed' },
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-gray-500 mt-1">Platform overview and management</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl bg-card">Export Report</Button>
                    <Button className="rounded-xl shadow-lg shadow-primary/20">System Settings</Button>
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
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div>
                                <p className="text-gray-500 text-sm font-medium mb-1">{stat.name}</p>
                                <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 relative z-10">
                            <span className="text-sm font-semibold text-green-500 bg-green-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" /> {stat.change}
                            </span>
                            <span className="text-xs text-gray-500">vs last month</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Recent Orders Table */}
                    <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-border flex justify-between items-center">
                            <h2 className="text-lg font-bold">Recent Orders</h2>
                            <button className="text-sm text-primary font-medium hover:underline">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-accent/50 text-gray-500 text-sm">
                                        <th className="font-medium p-4 pl-6">Order ID</th>
                                        <th className="font-medium p-4">Customer</th>
                                        <th className="font-medium p-4">Date</th>
                                        <th className="font-medium p-4">Amount</th>
                                        <th className="font-medium p-4 pr-6">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map((order, i) => (
                                        <tr key={i} className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
                                            <td className="p-4 pl-6 font-medium">{order.id}</td>
                                            <td className="p-4 text-gray-600">{order.customer}</td>
                                            <td className="p-4 text-gray-500 text-sm">{order.date}</td>
                                            <td className="p-4 font-semibold">{order.total}</td>
                                            <td className="p-4 pr-6">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
                          ${order.status === 'Completed' ? 'bg-green-500/10 text-green-600' :
                                                        order.status === 'Processing' ? 'bg-blue-500/10 text-blue-600' :
                                                            'bg-yellow-500/10 text-yellow-600'}`}
                                                >
                                                    {order.status === 'Completed' && <CheckCircle className="w-3 h-3" />}
                                                    {order.status === 'Processing' && <Activity className="w-3 h-3" />}
                                                    {order.status === 'Pending' && <Clock className="w-3 h-3" />}
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar Area */}
                <div className="space-y-8">

                    {/* System Health */}
                    <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold mb-6">System Health</h2>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-600 font-medium">Server Status</span>
                                    <span className="text-green-500 font-bold">Online</span>
                                </div>
                                <div className="w-full bg-accent rounded-full h-2 overflow-hidden">
                                    <div className="bg-green-500 h-full rounded-full w-[98%]"></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-600 font-medium">Database Load</span>
                                    <span className="text-blue-500 font-bold">42%</span>
                                </div>
                                <div className="w-full bg-accent rounded-full h-2 overflow-hidden">
                                    <div className="bg-blue-500 h-full rounded-full w-[42%]"></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-600 font-medium">API Response Time</span>
                                    <span className="text-yellow-500 font-bold">124ms</span>
                                </div>
                                <div className="w-full bg-accent rounded-full h-2 overflow-hidden">
                                    <div className="bg-yellow-500 h-full rounded-full w-[15%]"></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-semibold text-yellow-700">Cache requires attention</h4>
                                <p className="text-xs text-yellow-600/80 mt-1">Redis cache hit rate has dropped below 80% in the last hour.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
