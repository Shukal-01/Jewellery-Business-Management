'use client';

import Link from 'next/link';
import { ArrowRight, Gem, Palette, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTASection() {
    return (
        <section className="py-20 bg-gradient-to-r from-yellow-50 via-white to-pink-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold">
                            Start Creating Your
                            <span className="block text-gradient-gold mt-2">
                                Perfect Piece Today
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Join thousands of customers who have designed their dream jewelry with our intuitive 3D platform.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/customer/builder">
                            <Button size="lg" className="btn-gold group text-lg px-8 py-4">
                                Start Designing Now
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                        <Link href="/customer/templates">
                            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                                Browse Templates
                            </Button>
                        </Link>
                    </div>

                    {/* Value Propositions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Gem className="h-6 w-6 text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
                            <p className="text-gray-600">
                                Expert craftsmanship with the finest materials and attention to detail in every piece.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Palette className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Total Customization</h3>
                            <p className="text-gray-600">
                                Design every detail exactly how you want it with our advanced 3D customization tools.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Fast Production</h3>
                            <p className="text-gray-600">
                                Get your custom jewelry quickly without compromising on quality or craftsmanship.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}