'use client';

import Link from 'next/link';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';

const trendingItems = [
    {
        id: 1,
        name: 'Eternity Diamond Ring',
        price: 2999,
        rating: 4.9,
        reviews: 47,
        image: '/images/products/eternity-ring.jpg',
        trending: true,
    },
    {
        id: 2,
        name: 'Vintage Inspired Locket',
        price: 899,
        rating: 4.8,
        reviews: 23,
        image: '/images/products/vintage-locket.jpg',
        trending: true,
    },
    {
        id: 3,
        name: 'Minimalist Gold Bar Necklace',
        price: 499,
        rating: 4.7,
        reviews: 89,
        image: '/images/products/minimalist-necklace.jpg',
        trending: true,
    },
    {
        id: 4,
        name: 'Art Deco Emerald Ring',
        price: 1899,
        rating: 4.9,
        reviews: 31,
        image: '/images/products/art-deco-ring.jpg',
        trending: true,
    },
];

export default function TrendingPieces() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-12">
                    <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        🔥 Trending Now
                    </div>
                    <h2 className="text-4xl font-serif font-bold">
                        Popular
                        <span className="block text-gradient-gold mt-2">
                            Designs This Week
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        See what other customers are loving and get inspired by our most popular designs.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trendingItems.map((item) => (
                        <Card key={item.id} className="group hover:shadow-xl transition-all duration-300">
                            <div className="relative overflow-hidden">
                                <div className="aspect-square bg-gradient-to-br from-yellow-100 to-pink-100 flex items-center justify-center">
                                    <div className="text-6xl">💎</div>
                                </div>

                                {/* Trending Badge */}
                                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                    Hot
                                </div>

                                {/* Quick Actions */}
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
                                        <Heart className="h-4 w-4 text-gray-700" />
                                    </button>
                                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
                                        <ShoppingCart className="h-4 w-4 text-gray-700" />
                                    </button>
                                </div>
                            </div>

                            <CardContent className="p-4">
                                <h3 className="font-semibold text-lg mb-2 group-hover:text-yellow-600 transition-colors">
                                    {item.name}
                                </h3>

                                <div className="flex items-center space-x-1 mb-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < Math.floor(item.rating)
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        {item.rating} ({item.reviews})
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-gray-900">
                                        {formatPrice(item.price)}
                                    </span>
                                    <Link href={`/customer/builder?template=${item.id}`}>
                                        <Button size="sm" className="btn-gold">
                                            Customize
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/customer/templates">
                        <Button size="lg" variant="outline" className="px-8">
                            View All Trending
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}