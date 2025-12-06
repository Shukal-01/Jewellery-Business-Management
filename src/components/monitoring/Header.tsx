'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, Bell, Settings, User, Activity } from 'lucide-react';
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
        <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-4">
                        <Link href="/monitoring/dashboard" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">AI</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">AI Monitoring Dashboard</h1>
                                <p className="text-xs text-gray-400">Real-time System Intelligence</p>
                            </div>
                        </Link>
                    </div>

                    {/* System Status */}
                    <div className="hidden sm:flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-green-400">All Systems Operational</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Activity className="h-4 w-4 text-blue-400" />
                            <span className="text-gray-400">Last scan: 2s ago</span>
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Notifications */}
                        <button className="relative p-2 rounded-lg hover:bg-gray-700 transition-colors">
                            <Bell className="h-5 w-5 text-gray-400" />
                            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                        </button>

                        {/* Settings */}
                        <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
                            <Settings className="h-5 w-5 text-gray-400" />
                        </button>

                        {/* User Menu */}
                        <div className="relative profile-menu">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                    <Activity className="h-4 w-4 text-white" />
                                </div>
                                <div className="text-left hidden sm:block">
                                    <div className="text-sm font-medium text-white">
                                        {sessionData?.user?.name || 'AI Operator'}
                                    </div>
                                    <div className="text-xs text-blue-400">Monitoring Team</div>
                                </div>
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1 z-50">
                                    <Link
                                        href="/admin/dashboard"
                                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                        Admin Panel
                                    </Link>
                                    <Link
                                        href="/monitoring/settings"
                                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                        Settings
                                    </Link>
                                    <hr className="my-1 border-gray-700" />
                                    <button
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900 hover:text-red-300"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="sm:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="sm:hidden mt-4 pt-4 border-t border-gray-700">
                        <nav className="space-y-1">
                            <Link
                                href="/monitoring/dashboard"
                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/monitoring/models"
                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg"
                            >
                                AI Models
                            </Link>
                            <Link
                                href="/monitoring/compute"
                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg"
                            >
                                Compute Health
                            </Link>
                            <Link
                                href="/monitoring/api"
                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg"
                            >
                                API Performance
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}