'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Brain,
    Cpu,
    Activity,
    BarChart3,
    AlertTriangle,
    DollarSign,
    Settings,
    LogOut,
    Zap,
    Database,
    Globe
} from 'lucide-react';
import { signOut } from 'next-auth/react';

const menuItems = [
    {
        name: 'Dashboard',
        href: '/monitoring/dashboard',
        icon: LayoutDashboard,
        description: 'System overview',
    },
    {
        name: 'AI Models',
        href: '/monitoring/models',
        icon: Brain,
        description: 'Model performance',
    },
    {
        name: 'Compute',
        href: '/monitoring/compute',
        icon: Cpu,
        description: 'CAD health',
    },
    {
        name: 'API',
        href: '/monitoring/api',
        icon: Globe,
        description: 'API metrics',
    },
    {
        name: 'Pipeline',
        href: '/monitoring/pipeline',
        icon: Database,
        description: 'Data pipeline',
    },
    {
        name: 'Alerts',
        href: '/monitoring/alerts',
        icon: AlertTriangle,
        description: 'Incident center',
    },
    {
        name: 'Costs',
        href: '/monitoring/costs',
        icon: DollarSign,
        description: 'Cost analytics',
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside className={`${isCollapsed ? 'w-20' : 'w-64'
            } bg-gray-800 border-r border-gray-700 min-h-screen transition-all duration-300 hidden lg:block`}>
            <div className="p-4">
                {/* Collapse Toggle */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden lg:flex items-center justify-center w-full p-2 rounded-lg hover:bg-gray-700 transition-colors mb-6"
                >
                    <div className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
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

                {/* Status Indicator */}
                {!isCollapsed && (
                    <div className="mt-8 space-y-4">
                        {/* System Status */}
                        <div className="p-4 bg-gray-700 rounded-lg">
                            <div className="flex items-center space-x-3 mb-3">
                                <Zap className="h-4 w-4 text-green-400" />
                                <span className="text-sm font-medium text-white">System Status</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-400">GPU Usage</span>
                                    <span className="text-green-400">68%</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-400">CPU Usage</span>
                                    <span className="text-yellow-400">45%</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-400">Memory</span>
                                    <span className="text-blue-400">2.1GB</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-2">
                            <Link
                                href="/monitoring/alerts"
                                className="block w-full px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-center"
                            >
                                View Alerts
                            </Link>
                            <button className="w-full px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                                Refresh Data
                            </button>
                        </div>

                        {/* Sign Out */}
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="w-full flex items-center justify-center px-3 py-2 text-sm text-red-400 hover:bg-red-900 hover:text-red-300 rounded-lg transition-colors"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                        </button>
                    </div>
                )}
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 z-50">
                <div className="grid grid-cols-4 gap-1 p-2">
                    {menuItems.slice(0, 4).map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex flex-col items-center py-2 px-2 rounded-lg transition-colors ${isActive
                                        ? 'text-blue-400 bg-blue-600'
                                        : 'text-gray-400 hover:text-gray-100 hover:bg-gray-700'
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