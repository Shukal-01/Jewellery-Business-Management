'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    Users,
    Store,
    DollarSign,
    Truck,
    FileText,
    Settings,
    BarChart3,
    Shield,
    Megaphone,
    Archive,
    Activity,
    LogOut
} from 'lucide-react';
import { signOut } from 'next-auth/react';

const menuItems = [
    {
        name: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutDashboard,
        description: 'System overview',
    },
    {
        name: 'Orders',
        href: '/admin/orders',
        icon: Package,
        description: 'Order management',
    },
    {
        name: 'Vendors',
        href: '/admin/vendors',
        icon: Store,
        description: 'Vendor management',
    },
    {
        name: 'Customers',
        href: '/admin/customers',
        icon: Users,
        description: 'Customer accounts',
    },
    {
        name: 'Templates',
        href: '/admin/templates',
        icon: Archive,
        description: 'Design templates',
    },
    {
        name: 'Pricing',
        href: '/admin/pricing',
        icon: DollarSign,
        description: 'Pricing engine',
    },
    {
        name: 'Logistics',
        href: '/admin/logistics',
        icon: Truck,
        description: 'Shipping & delivery',
    },
    {
        name: 'Marketing',
        href: '/admin/marketing',
        icon: Megaphone,
        description: 'Marketing tools',
    },
    {
        name: 'Analytics',
        href: '/admin/analytics',
        icon: BarChart3,
        description: 'Business analytics',
    },
    {
        name: 'Monitoring',
        href: '/admin/monitoring',
        icon: Activity,
        description: 'System monitoring',
    },
    {
        name: 'Settings',
        href: '/admin/settings',
        icon: Settings,
        description: 'App settings',
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside className={`${isCollapsed ? 'w-20' : 'w-64'
            } bg-white border-r border-gray-200 min-h-screen transition-all duration-300 hidden lg:block`}>
            <div className="p-4">
                {/* Collapse Toggle */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden lg:flex items-center justify-center w-full p-2 rounded-lg hover:bg-gray-100 transition-colors mb-6"
                >
                    <div className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </button>

                {/* Navigation */}
                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center px-3 py-3 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <Icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'
                                    } flex-shrink-0`} />
                                {!isCollapsed && (
                                    <div className="ml-3 min-w-0 flex-1">
                                        <div className="font-medium truncate">{item.name}</div>
                                        {!isActive && (
                                            <div className="text-xs text-gray-500 truncate">{item.description}</div>
                                        )}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Info */}
                {!isCollapsed && (
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex items-center justify-center">
                                <Shield className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900">System Admin</div>
                                <div className="text-xs text-green-600">Super Administrator</div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-4 grid grid-cols-2 gap-2">
                            <div className="text-center">
                                <div className="text-lg font-bold text-gray-900">4</div>
                                <div className="text-xs text-gray-600">Panels</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-gray-900">24/7</div>
                                <div className="text-xs text-gray-600">Uptime</div>
                            </div>
                        </div>

                        {/* Sign Out */}
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="mt-4 w-full flex items-center justify-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                        </button>
                    </div>
                )}
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
                <div className="grid grid-cols-5 gap-1 p-2">
                    {menuItems.slice(0, 5).map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex flex-col items-center py-2 px-2 rounded-lg transition-colors ${isActive
                                        ? 'text-indigo-600 bg-indigo-50'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-xs mt-1">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
}