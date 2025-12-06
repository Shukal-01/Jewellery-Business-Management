import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">J</span>
                            </div>
                            <span className="text-xl font-serif font-bold">Luxury Jewelry</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Creating unique, personalized jewelry with advanced 3D technology and expert craftsmanship.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/customer/builder" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                    Create Design
                                </Link>
                            </li>
                            <li>
                                <Link href="/customer/templates" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                    Templates
                                </Link>
                            </li>
                            <li>
                                <Link href="/customer/about" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/customer/contact" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/customer/faq" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Services</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/customer/services/custom-design" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                    Custom Design
                                </Link>
                            </li>
                            <li>
                                <Link href="/customer/services/3d-preview" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                    3D Preview
                                </Link>
                            </li>
                            <li>
                                <Link href="/customer/services/materials" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                    Premium Materials
                                </Link>
                            </li>
                            <li>
                                <Link href="/customer/services/shipping" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                    Worldwide Shipping
                                </Link>
                            </li>
                            <li>
                                <Link href="/customer/services/warranty" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                    Warranty
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Contact Info</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-yellow-400" />
                                <span className="text-gray-400">hello@luxuryjewelry.com</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-yellow-400" />
                                <span className="text-gray-400">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-yellow-400" />
                                <span className="text-gray-400">
                                    123 Jewelry Lane<br />
                                    New York, NY 10001
                                </span>
                            </li>
                        </ul>
                        <div className="mt-6">
                            <h4 className="text-sm font-semibold mb-2">Newsletter</h4>
                            <div className="flex space-x-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-yellow-400"
                                />
                                <button className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © 2024 Luxury Jewelry. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link href="/privacy" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                                Terms of Service
                            </Link>
                            <Link href="/cookies" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                                Cookie Policy
                            </Link>
                            <Link href="/accessibility" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                                Accessibility
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}