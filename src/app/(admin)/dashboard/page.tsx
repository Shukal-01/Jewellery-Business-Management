'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DollarSign,
    Users,
    Package,
    Store,
    TrendingUp,
    TrendingDown,
    Eye,
    ShoppingCart,
    AlertTriangle,
    Activity,
    BarChart3,
    PieChart,
    ArrowUpRight,
    ArrowDownRight,
    Settings,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface KPIData {
    title: string;
    value: string | number;
    change: number;
    icon: React.ElementType;
    color: string;
    bgColor: string;
    trend: 'up' | 'down';
}

interface ChartData {
    name: string;
    sales: number;
    orders: number;
    customers: number;
}

interface RegionData {
    name: string;
    orders: number;
    revenue: number;
}

export default function AdminDashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [kpiData, setKpiData] = useState<KPIData[]>([]);
    const [salesData, setSalesData] = useState<ChartData[]>([]);
    const [regionData, setRegionData] = useState<RegionData[]>([]);
    const [timeRange, setTimeRange] = useState('7d');

    useEffect(() => {
        loadDashboardData();
    }, [timeRange]);

    const loadDashboardData = async () => {
        setIsLoading(true);
        try {
            // Simulate API calls
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock KPI data
            const kpiCards: KPIData[] = [
                {
                    title: 'Total Revenue',
                    value: formatPrice(284750),
                    change: 12.5,
                    icon: DollarSign,
                    color: 'text-green-600',
                    bgColor: 'bg-green-50',
                    trend: 'up',
                },
                {
                    title: 'Active Users',
                    value: '8,426',
                    change: 8.2,
                    icon: Users,
                    color: 'text-blue-600',
                    bgColor: 'bg-blue-50',
                    trend: 'up',
                },
                {
                    title: 'Total Orders',
                    value: '1,234',
                    change: -2.3,
                    icon: Package,
                    color: 'text-purple-600',
                    bgColor: 'bg-purple-50',
                    trend: 'down',
                },
                {
                    title: 'Active Vendors',
                    value: '156',
                    change: 5.7,
                    icon: Store,
                    color: 'text-yellow-600',
                    bgColor: 'bg-yellow-50',
                    trend: 'up',
                },
            ];

            // Mock sales chart data
            const salesChartData: ChartData[] = [
                { name: 'Mon', sales: 12000, orders: 45, customers: 23 },
                { name: 'Tue', sales: 15000, orders: 58, customers: 31 },
                { name: 'Wed', sales: 18000, orders: 72, customers: 42 },
                { name: 'Thu', sales: 14000, orders: 52, customers: 28 },
                { name: 'Fri', sales: 22000, orders: 89, customers: 51 },
                { name: 'Sat', sales: 25000, orders: 98, customers: 67 },
                { name: 'Sun', sales: 20000, orders: 82, customers: 49 },
            ];

            // Mock region data
            const regionChartData: RegionData[] = [
                { name: 'North America', orders: 456, revenue: 125000 },
                { name: 'Europe', orders: 324, revenue: 95000 },
                { name: 'Asia Pacific', orders: 287, revenue: 78000 },
                { name: 'Latin America', orders: 167, revenue: 42000 },
            ];

            setKpiData(kpiCards);
            setSalesData(salesChartData);
            setRegionData(regionChartData);
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const timeRanges = [
        { value: '24h', label: 'Last 24 Hours' },
        { value: '7d', label: 'Last 7 Days' },
        { value: '30d', label: 'Last 30 Days' },
        { value: '90d', label: 'Last 90 Days' },
        { value: '1y', label: 'Last Year' },
    ];

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
                    <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
                    <p className="text-gray-600">Platform overview and key metrics</p>
                </div>
                <div className="flex space-x-3">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {timeRanges.map((range) => (
                            <option key={range.value} value={range.value}>
                                {range.label}
                            </option>
                        ))}
                    </select>
                    <Button>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Export Report
                    </Button>
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
                                <div className={`flex items-center text-sm font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {kpi.trend === 'up' ? (
                                        <ArrowUpRight className="h-4 w-4 mr-1" />
                                    ) : (
                                        <ArrowDownRight className="h-4 w-4 mr-1" />
                                    )}
                                    {Math.abs(kpi.change)}%
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                            <div className="text-sm text-gray-600">{kpi.title}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center">
                                <TrendingUp className="h-5 w-5 mr-2" />
                                Sales Overview
                            </div>
                            <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-end space-x-2">
                            {salesData.map((data, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center">
                                    <div
                                        className="w-full bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t"
                                        style={{ height: `${(data.sales / 25000) * 100}%` }}
                                    />
                                    <div className="text-xs text-gray-600 mt-2">{data.name}</div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                            <div className="text-center">
                                <div className="font-semibold text-gray-900">Total Sales</div>
                                <div className="text-indigo-600">{formatPrice(126000)}</div>
                            </div>
                            <div className="text-center">
                                <div className="font-semibold text-gray-900">Avg/Day</div>
                                <div className="text-indigo-600">{formatPrice(18000)}</div>
                            </div>
                            <div className="text-center">
                                <div className="font-semibold text-gray-900">Peak Day</div>
                                <div className="text-indigo-600">Saturday</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Orders by Category */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            Orders by Category
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { category: 'Rings', orders: 456, percentage: 37, color: 'bg-blue-500' },
                                { category: 'Pendants', orders: 298, percentage: 24, color: 'bg-green-500' },
                                { category: 'Bracelets', orders: 234, percentage: 19, color: 'bg-purple-500' },
                                { category: 'Earrings', orders: 189, percentage: 15, color: 'bg-yellow-500' },
                                { category: 'Custom', orders: 57, percentage: 5, color: 'bg-red-500' },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                        <span className="text-sm font-medium text-gray-900">{item.category}</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-600">{item.orders} orders</span>
                                        <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Geographic Distribution */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <PieChart className="h-5 w-5 mr-2" />
                        Geographic Distribution
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {regionData.map((region, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                    <div className="text-2xl">🌍</div>
                                </div>
                                <div className="font-semibold text-gray-900">{region.name}</div>
                                <div className="text-sm text-gray-600">{region.orders} orders</div>
                                <div className="text-sm font-medium text-indigo-600">{formatPrice(region.revenue)}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Activity className="h-5 w-5 mr-2" />
                        Recent System Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            {
                                type: 'success',
                                message: 'New vendor application approved',
                                time: '2 minutes ago',
                                icon: <Users className="h-4 w-4" />,
                            },
                            {
                                type: 'info',
                                message: 'System backup completed successfully',
                                time: '1 hour ago',
                                icon: <Package className="h-4 w-4" />,
                            },
                            {
                                type: 'warning',
                                message: 'High order volume detected - scaling up',
                                time: '2 hours ago',
                                icon: <AlertTriangle className="h-4 w-4" />,
                            },
                            {
                                type: 'success',
                                message: 'Daily sales target achieved',
                                time: '3 hours ago',
                                icon: <DollarSign className="h-4 w-4" />,
                            },
                        ].map((activity, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className={`p-2 rounded-full ${activity.type === 'success' ? 'bg-green-100 text-green-600' :
                                        activity.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                                            activity.type === 'error' ? 'bg-red-100 text-red-600' :
                                                'bg-blue-100 text-blue-600'
                                    }`}>
                                    {activity.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-900">{activity.message}</div>
                                    <div className="text-xs text-gray-500">{activity.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                        <Package className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                        <h3 className="font-medium text-gray-900">Orders</h3>
                        <p className="text-sm text-gray-600">Manage all orders</p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                        <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
                        <h3 className="font-medium text-gray-900">Users</h3>
                        <p className="text-sm text-gray-600">User management</p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                        <Store className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                        <h3 className="font-medium text-gray-900">Vendors</h3>
                        <p className="text-sm text-gray-600">Vendor oversight</p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                        <Settings className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                        <h3 className="font-medium text-gray-900">Settings</h3>
                        <p className="text-sm text-gray-600">System configuration</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}