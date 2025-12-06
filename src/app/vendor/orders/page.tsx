'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    AlertTriangle,
    Package,
    Filter,
    Search,
    Download,
    Calendar,
    User,
    MoreVertical,
} from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';

interface Order {
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    status: 'pending' | 'accepted' | 'in_progress' | 'quality_check' | 'ready_to_ship' | 'shipped' | 'delivered' | 'cancelled' | 'delayed';
    priority: 'normal' | 'express' | 'vip';
    deadline: string;
    amount: number;
    items: Array<{
        name: string;
        quantity: number;
        material: string;
        size?: string;
    }>;
    createdAt: string;
    urgent: boolean;
    requiresAttention: boolean;
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockOrders: Order[] = [
                {
                    id: '1',
                    orderNumber: 'ORD-2024-001',
                    customerName: 'Sarah Johnson',
                    customerEmail: 'sarah.j@email.com',
                    status: 'pending',
                    priority: 'vip',
                    deadline: '2024-01-15',
                    amount: 2999.99,
                    items: [
                        { name: 'Custom Solitaire Ring', quantity: 1, material: 'White Gold', size: '7.5' },
                    ],
                    createdAt: '2024-01-05T10:00:00Z',
                    urgent: true,
                    requiresAttention: true,
                },
                {
                    id: '2',
                    orderNumber: 'ORD-2024-002',
                    customerName: 'Michael Chen',
                    customerEmail: 'michael.chen@email.com',
                    status: 'in_progress',
                    priority: 'express',
                    deadline: '2024-01-12',
                    amount: 1899.99,
                    items: [
                        { name: 'Diamond Teardrop Pendant', quantity: 1, material: 'Yellow Gold' },
                    ],
                    createdAt: '2024-01-04T14:30:00Z',
                    urgent: false,
                    requiresAttention: false,
                },
                {
                    id: '3',
                    orderNumber: 'ORD-2024-003',
                    customerName: 'Emma Rodriguez',
                    customerEmail: 'emma.r@email.com',
                    status: 'quality_check',
                    priority: 'normal',
                    deadline: '2024-01-18',
                    amount: 899.99,
                    items: [
                        { name: 'Tennis Bracelet', quantity: 1, material: 'White Gold', size: 'M' },
                    ],
                    createdAt: '2024-01-03T09:15:00Z',
                    urgent: false,
                    requiresAttention: true,
                },
                {
                    id: '4',
                    orderNumber: 'ORD-2024-004',
                    customerName: 'David Smith',
                    customerEmail: 'david.smith@email.com',
                    status: 'ready_to_ship',
                    priority: 'express',
                    deadline: '2024-01-10',
                    amount: 1499.99,
                    items: [
                        { name: 'Stud Earrings', quantity: 2, material: 'Platinum' },
                    ],
                    createdAt: '2024-01-02T16:45:00Z',
                    urgent: false,
                    requiresAttention: false,
                },
                {
                    id: '5',
                    orderNumber: 'ORD-2024-005',
                    customerName: 'Lisa Anderson',
                    customerEmail: 'lisa.a@email.com',
                    status: 'delayed',
                    priority: 'normal',
                    deadline: '2024-01-08',
                    amount: 3299.99,
                    items: [
                        { name: 'Custom Crown Ring', quantity: 1, material: 'Rose Gold', size: '6.5' },
                    ],
                    createdAt: '2024-01-01T11:20:00Z',
                    urgent: true,
                    requiresAttention: true,
                },
                {
                    id: '6',
                    orderNumber: 'ORD-2024-006',
                    customerName: 'James Wilson',
                    customerEmail: 'james.w@email.com',
                    status: 'shipped',
                    priority: 'normal',
                    deadline: '2024-01-20',
                    amount: 799.99,
                    items: [
                        { name: 'Hoop Earrings', quantity: 1, material: 'Yellow Gold' },
                    ],
                    createdAt: '2023-12-30T13:00:00Z',
                    urgent: false,
                    requiresAttention: false,
                },
            ];

            setOrders(mockOrders);
        } catch (error) {
            console.error('Failed to load orders:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'accepted': return 'bg-blue-100 text-blue-800';
            case 'in_progress': return 'bg-purple-100 text-purple-800';
            case 'quality_check': return 'bg-indigo-100 text-indigo-800';
            case 'ready_to_ship': return 'bg-green-100 text-green-800';
            case 'shipped': return 'bg-cyan-100 text-cyan-800';
            case 'delivered': return 'bg-emerald-100 text-emerald-800';
            case 'delayed': return 'bg-red-100 text-red-800';
            case 'cancelled': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'vip': return 'bg-red-500 text-white';
            case 'express': return 'bg-orange-500 text-white';
            case 'normal': return 'bg-gray-500 text-white';
            default: return 'bg-gray-500 text-white';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="h-4 w-4" />;
            case 'accepted': return <CheckCircle className="h-4 w-4" />;
            case 'in_progress': return <Package className="h-4 w-4" />;
            case 'quality_check': return <Eye className="h-4 w-4" />;
            case 'ready_to_ship': return <CheckCircle className="h-4 w-4" />;
            case 'shipped': return <Package className="h-4 w-4" />;
            case 'delivered': return <CheckCircle className="h-4 w-4" />;
            case 'delayed': return <AlertTriangle className="h-4 w-4" />;
            case 'cancelled': return <XCircle className="h-4 w-4" />;
            default: return <Clock className="h-4 w-4" />;
        }
    };

    const toggleOrderSelection = (orderId: string) => {
        setSelectedOrders(prev =>
            prev.includes(orderId)
                ? prev.filter(id => id !== orderId)
                : [...prev, orderId]
        );
    };

    const updateOrderStatus = async (orderId: string, newStatus: string) => {
        // In production, this would call an API
        setOrders(prev =>
            prev.map(order =>
                order.id === orderId ? { ...order, status: newStatus as any } : order
            )
        );
    };

    const exportOrders = () => {
        // In production, this would generate and download CSV/Excel
        alert('Exporting orders...');
    };

    const bulkActions = [
        { label: 'Mark as Accepted', action: 'accept' },
        { label: 'Mark in Progress', action: 'progress' },
        { label: 'Mark as Ready', action: 'ready' },
        { label: 'Update Status', action: 'status' },
    ];

    if (isLoading) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <Card key={i} className="animate-pulse">
                            <CardContent className="p-6">
                                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
                    <p className="text-gray-600">Manage and track customer orders</p>
                </div>
                <div className="flex space-x-3">
                    <Button onClick={exportOrders} variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <Link href="/vendor/dashboard">
                        <Button variant="outline">Back to Dashboard</Button>
                    </Link>
                </div>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Status Filter */}
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="in_progress">In Progress</option>
                            <option value="quality_check">Quality Check</option>
                            <option value="ready_to_ship">Ready to Ship</option>
                            <option value="shipped">Shipped</option>
                            <option value="delayed">Delayed</option>
                        </select>

                        {/* Priority Filter */}
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Priority</option>
                            <option value="normal">Normal</option>
                            <option value="express">Express</option>
                            <option value="vip">VIP</option>
                        </select>

                        {/* Results */}
                        <div className="text-sm text-gray-600 flex items-center justify-center">
                            {filteredOrders.length} orders found
                        </div>
                    </div>

                    {/* Bulk Actions */}
                    {selectedOrders.length > 0 && (
                        <div className="mt-4 flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <span className="text-sm text-blue-800">
                                {selectedOrders.length} orders selected
                            </span>
                            <div className="flex space-x-2">
                                {bulkActions.map((action) => (
                                    <Button key={action.action} size="sm" variant="outline">
                                        {action.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Orders List */}
            <div className="space-y-4">
                {filteredOrders.map((order) => (
                    <Card key={order.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                {/* Left Side - Order Info */}
                                <div className="flex-1">
                                    <div className="flex items-center space-x-4 mb-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedOrders.includes(order.id)}
                                            onChange={() => toggleOrderSelection(order.id)}
                                            className="rounded border-gray-300"
                                        />
                                        <div>
                                            <div className="flex items-center space-x-3">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {order.orderNumber}
                                                </h3>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                                                    {order.priority.toUpperCase()}
                                                </span>
                                                {order.urgent && (
                                                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                                                        URGENT
                                                    </span>
                                                )}</div>
                                            <div className="text-sm text-gray-600">
                                                <span className="flex items-center">
                                                    <User className="h-4 w-4 mr-1" />
                                                    {order.customerName}
                                                </span>
                                                <span className="mx-2">•</span>
                                                <span>{formatDate(order.createdAt)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="space-y-2">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                                                {item.name} • {item.material}
                                                {item.size && ` • Size ${item.size}`}
                                                {item.quantity > 1 && ` • Qty: ${item.quantity}`}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Side - Status & Actions */}
                                <div className="flex items-center space-x-4">
                                    {/* Deadline */}
                                    <div className="text-center">
                                        <div className="text-xs text-gray-500">Deadline</div>
                                        <div className={`text-sm font-medium ${order.urgent ? 'text-red-600' : 'text-gray-900'
                                            }`}>
                                            {formatDate(order.deadline)}
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="text-center">
                                        <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            <span className="ml-1 capitalize">{order.status.replace('_', ' ')}</span>
                                        </div>
                                    </div>

                                    {/* Amount */}
                                    <div className="text-right">
                                        <div className="font-bold text-lg">{formatPrice(order.amount)}</div>
                                        <div className="text-xs text-gray-500">Total</div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex space-x-2">
                                        <Link href={`/vendor/orders/${order.id}`}>
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" size="sm">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Action Bar for Delayed Orders */}
                            {order.status === "delayed" && (
                                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-red-800">
                                            <strong>Delayed Order:</strong> This order requires immediate attention. The deadline was {formatDate(order.deadline)}.
                                        </div>
                                        <Button size="sm" onClick={() => updateOrderStatus(order.id, 'in_progress')}>
                                            Update Status
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}

                {filteredOrders.length === 0 && (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
                            <p className="text-gray-600 mb-4">
                                {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
                                    ? 'Try adjusting your filters'
                                    : 'You have no orders yet'}
                            </p>
                            {(searchTerm || statusFilter !== 'all' || priorityFilter !== 'all') && (
                                <Button onClick={() => {
                                    setSearchTerm('');
                                    setStatusFilter('all');
                                    setPriorityFilter('all');
                                }}>
                                    Clear Filters
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}