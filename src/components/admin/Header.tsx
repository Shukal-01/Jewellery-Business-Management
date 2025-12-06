'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, Bell, Settings, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
    session: any;
}

export default function Header({ session }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { data: sessionData } = useSession();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isProfileOpen && !(event.target as Element).closest('.profile-menu')) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isProfileOpen]);

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/dashboard" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">J</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                                <p className="text-xs text-gray-600">Management Dashboard</p>
                            </div>
                        </Link>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center space-x-4">
                        {/* System Status */}
                        <div className="hidden sm:flex items-center space-x-2 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600">All Systems Operational</span>
                        </div>

                        {/* Notifications */}
                        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <Bell className="h-5 w-5 text-gray-600" />
                            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* Settings */}
                        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <Settings className="h-5 w-5 text-gray-600" />
                        </button>

                        {/* User Menu */}
                        <div className="relative profile-menu">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex items-center justify-center">
                                    <Shield className="h-4 w-4 text-white" />
                                </div>
                                <div className="text-left hidden sm:block">
                                    <div className="text-sm font-medium text-gray-900">
                                        {sessionData?.user?.name || 'Admin User'}
                                    </div>
                                    <div className="text-xs text-green-600">Super Admin</div>
                                </div>
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                                    <Link
                                        href="/admin/settings"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        System Settings
                                    </Link>
                                    <Link
                                        href="/admin/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Profile Settings
                                    </Link>
                                    <Link
                                        href="/monitoring/dashboard"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Monitoring Dashboard
                                    </Link>
                                    <hr className="my-1 border-gray-200" />
                                    <button
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="sm:hidden mt-4 pt-4 border-t border-gray-200">
                        <nav className="space-y-1">
                            <Link
                                href="/admin/dashboard"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/admin/orders"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                                Orders
                            </Link>
                            <Link
                                href="/admin/vendors"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                                Vendors
                            </Link>
                            <Link
                                href="/admin/customers"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                                Customers
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}