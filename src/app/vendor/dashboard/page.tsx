'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Package,
    TrendingUp,
    AlertTriangle,
    Clock,
    DollarSign,
    Users,
    Eye,
    CheckCircle,
    XCircle,
    Activity
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface KPICard {
    title: string;
    value: string | number;
    change: number;
    icon: React.ElementType;
    color: string;
    bgColor: string;
}

interface OrderItem {
    id: string;
    orderNumber: string;
    customerName: string;
    status: string;
    urgency: 'normal' | 'express' | 'vip';
    deadline: string;
    amount: number;
    image: string;
}

interface EarningsData {
    thisWeek: number;
    thisMonth: number;
    pending: number;
    nextPayout: string;
}

export default function VendorDashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [kpiData, setKpiData] = useState<KPICard[]>([]);
    const [recentOrders, setRecentOrders] = useState<OrderItem[]>([]);
    const [earnings, setEarnings] = useState<EarningsData | null>(null);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        setIsLoading(true);
        try {
            // Simulate API calls
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock KPI data
            const kpiCards: KPICard[] = [
                {
                    title: 'New Orders',
                    value: 12,
                    change: 20,
                    icon: Package,
                    color: 'text-blue-600',
                    bgColor: 'bg-blue-50',
                },
                {
                    title: 'Production Rate',
                    value: '85%',
                    change: 5,
                    icon: Activity,
                    color: 'text-green-600',
                    bgColor: 'bg-green-50',
                },
                {
                    title: 'Avg. Completion',
                    value: '4.2d',
                    change: -0.5,
                    icon: Clock,
                    color: 'text-purple-600',
                    bgColor: 'bg-purple-50',
                },
                {
                    title: 'This Month',
                    value: formatPrice(15420),
                    change: 12,
                    icon: DollarSign,
                    color: 'text-yellow-600',
                    bgColor: 'bg-yellow-50',
                },
            ];

            // Mock recent orders
            const orders: OrderItem[] = [
                {
                    id: '1',
                    orderNumber: 'ORD-2024-001',
                    customerName: 'Sarah Johnson',
                    status: 'pending',
                    urgency: 'vip',
                    deadline: '2024-01-15',
                    amount: 2999.99,
                    image: '💍',
                },
                {
                    id: '2',
                    orderNumber: 'ORD-2024-002',
                    customerName: 'Michael Chen',
                    status: 'in_progress',
                    urgency: 'express',
                    deadline: '2024-01-12',
                    amount: 1899.99,
                    image: '📿',
                },
                {
                    id: '3',
                    orderNumber: 'ORD-2024-003',
                    customerName: 'Emma Rodriguez',
                    status: 'quality_check',
                    urgency: 'normal',
                    deadline: '2024-01-18',
                    amount: 899.99,
                    image: '💎',
                },
                {
                    id: '4',
                    orderNumber: 'ORD-2024-004',
                    customerName: 'David Smith',
                    status: 'ready_to_ship',
                    urgency: 'express',
                    deadline: '2024-01-10',
                    amount: 1499.99,
                    image: '⌚',
                },
                {
                    id: '5',
                    orderNumber: 'ORD-2024-005',
                    customerName: 'Lisa Anderson',
                    status: 'delayed',
                    urgency: 'normal',
                    deadline: '2024-01-08',
                    amount: 3299.99,
                    image: '👑',
                },
            ];

            // Mock earnings data
            const earningsData: EarningsData = {
                thisWeek: 3450,
                thisMonth: 15420,
                pending: 899,
                nextPayout: '2024-01-25',
            };

            setKpiData(kpiCards);
            setRecentOrders(orders);
            setEarnings(earningsData);
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'in_progress': return 'bg-blue-100 text-blue-800';
            case 'quality_check': return 'bg-purple-100 text-purple-800';
            case 'ready_to_ship': return 'bg-green-100 text-green-800';
            case 'shipped': return 'bg-cyan-100 text-cyan-800';
            case 'delivered': return 'bg-emerald-100 text-emerald-800';
            case 'delayed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getUrgencyColor = (urgency: string) => {
        switch (urgency) {
            case 'vip': return 'bg-red-500 text-white';
            case 'express': return 'bg-orange-500 text-white';
            case 'normal': return 'bg-gray-500 text-white';
            default: return 'bg-gray-500 text-white';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="h-4 w-4" />;
            case 'in_progress': return <Activity className="h-4 w-4" />;
            case 'quality_check': return <Eye className="h-4 w-4" />;
            case 'ready_to_ship': return <CheckCircle className="h-4 w-4" />;
            case 'shipped': return <Package className="h-4 w-4" />;
            case 'delivered': return <CheckCircle className="h-4 w-4" />;
            case 'delayed': return <AlertTriangle className="h-4 w-4" />;
            default: return <Clock className="h-4 w-4" />;
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <Card key={i} className="animate-pulse">
                                <CardContent className="p-6">
                                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                                    <div className="h-8 bg-gray-200 rounded"></div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h2>
                    <p className="text-gray-600">Welcome back! Here's your manufacturing overview.</p>
                </div>
                <div className="flex space-x-3">
                    <Link href="/vendor/orders">
                        <Button className="btn-gold">
                            <Package className="h-4 w-4 mr-2" />
                            New Orders
                        </Button>
                    </Link>
                    <Link href="/vendor/earnings">
                        <Button variant="outline">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            View Earnings
                        </Button>
                    </Link>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map((kpi, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                                    <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                                </div>
                                <div className={`text-sm font-medium ${kpi.change > 0 ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {kpi.change > 0 ? '+' : ''}{kpi.change}%
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                            <div className="text-sm text-gray-600">{kpi.title}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle>Recent Orders</CardTitle>
                        <Link href="/vendor/orders">
                            <Button variant="ghost" size="sm">View All</Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentOrders.slice(0, 5).map((order) => (
                                <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">{order.image}</div>
                                        <div>
                                            <div className="font-medium text-gray-900">{order.orderNumber}</div>
                                            <div className="text-sm text-gray-600">{order.customerName}</div>
                                            <div className="text-xs text-gray-500">{formatPrice(order.amount)}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(order.urgency)}`}>
                                            {order.urgency.toUpperCase()}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            <span className="ml-1 capitalize">{order.status.replace('_', ' ')}</span>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Production Timeline */}
                <Card>
                    <CardHeader>
                        <CardTitle>Production Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[
                                { stage: 'Design Review', status: 'completed', date: '2024-01-08' },
                                { stage: 'Material Procurement', status: 'completed', date: '2024-01-09' },
                                { stage: 'Manufacturing', status: 'in_progress', date: '2024-01-10' },
                                { stage: 'Quality Check', status: 'pending', date: '2024-01-15' },
                                { stage: 'Packaging', status: 'pending', date: '2024-01-16' },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className={`w-4 h-4 rounded-full ${item.status === 'completed' ? 'bg-green-500' :
                                        item.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-300'
                                        }`} />
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900">{item.stage}</div>
                                        <div className="text-sm text-gray-600">{item.date}</div>
                                    </div>
                                    {item.status === 'completed' && (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                    )}
                                    {item.status === 'in_progress' && (
                                        <Activity className="h-4 w-4 text-blue-500 animate-pulse" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Earnings Summary */}
            {earnings && (
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle>Earnings Overview</CardTitle>
                        <Link href="/vendor/earnings">
                            <Button variant="ghost" size="sm">Details</Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">{formatPrice(earnings.thisWeek)}</div>
                                <div className="text-sm text-gray-600">This Week</div>
                                <div className="text-xs text-green-600 mt-1">+15% from last week</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">{formatPrice(earnings.thisMonth)}</div>
                                <div className="text-sm text-gray-600">This Month</div>
                                <div className="text-xs text-green-600 mt-1">+22% from last month</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">{formatPrice(earnings.pending)}</div>
                                <div className="text-sm text-gray-600">Pending</div>
                                <div className="text-xs text-gray-500 mt-1">Next payout: {earnings.nextPayout}</div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
                            <Link href="/vendor/earnings">
                                <Button variant="outline" className="flex-1">
                                    <TrendingUp className="h-4 w-4 mr-2" />
                                    View Analytics
                                </Button>
                            </Link>
                            <Link href="/vendor/reports">
                                <Button variant="outline" className="flex-1">
                                    <Eye className="h-4 w-4 mr-2" />
                                    Generate Report
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}