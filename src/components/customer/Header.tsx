'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/lib/themes/useTheme';
import CartDropdown from './CartDropdown';

interface HeaderProps {
    session: any;
}

export default function Header({ session }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { data: sessionData, status } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigation = [
        { name: 'Create', href: '/customer/builder' },
        { name: 'Templates', href: '/customer/templates' },
        { name: 'About', href: '/customer/about' },
        { name: 'Contact', href: '/customer/contact' },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                        ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200'
                        : 'bg-white/80 backdrop-blur-sm border-b border-transparent'
                    }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link href="/customer" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">J</span>
                            </div>
                            <span className="text-xl font-serif font-bold text-gradient-gold">
                                Luxury Jewelry
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-700 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                aria-label="Toggle theme"
                            >
                                {theme === 'gold' ? '💎' : theme === 'diamond' ? '🌹' : '✨'}
                            </button>

                            {/* Search */}
                            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <Search className="h-5 w-5 text-gray-600" />
                            </button>

                            {/* Cart */}
                            <button
                                onClick={() => setIsCartOpen(!isCartOpen)}
                                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <ShoppingCart className="h-5 w-5 text-gray-600" />
                                <span className="absolute -top-1 -right-1 h-4 w-4 bg-yellow-500 text-white text-xs rounded-full flex items-center justify-center">
                                    0
                                </span>
                            </button>

                            {/* User Menu */}
                            {sessionData ? (
                                <div className="flex items-center space-x-3">
                                    <Link href="/customer/profile" className="flex items-center space-x-2 text-sm">
                                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full flex items-center justify-center">
                                            <User className="h-4 w-4 text-white" />
                                        </div>
                                        <span className="text-gray-700">{sessionData.user?.name}</span>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                    >
                                        Sign Out
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <Link href="/auth/signin">
                                        <Button variant="ghost" size="sm">
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href="/auth/signup">
                                        <Button variant="default" size="sm" className="btn-gold">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                {isMenuOpen ? (
                                    <X className="h-6 w-6 text-gray-600" />
                                ) : (
                                    <Menu className="h-6 w-6 text-gray-600" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-yellow-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="px-2 space-y-3">
                                {sessionData ? (
                                    <>
                                        <div className="flex items-center space-x-3 px-3">
                                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full flex items-center justify-center">
                                                <User className="h-4 w-4 text-white" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">
                                                {sessionData.user?.name}
                                            </span>
                                        </div>
                                        <Link
                                            href="/customer/profile"
                                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-yellow-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                        >
                                            My Profile
                                        </Link>
                                        <button
                                            onClick={() => signOut({ callbackUrl: '/' })}
                                            className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-yellow-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                        >
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/auth/signin"
                                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-yellow-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href="/auth/signup"
                                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-yellow-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Cart Dropdown */}
            <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}