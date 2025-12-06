'use client';

import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
    {
        id: 1,
        name: 'Sarah Johnson',
        location: 'New York, NY',
        rating: 5,
        comment: 'I designed my engagement ring using their 3D tool and it turned out more beautiful than I ever imagined. The craftsmanship is absolutely perfect!',
        product: 'Custom Engagement Ring',
        image: '/images/testimonials/sarah.jpg',
    },
    {
        id: 2,
        name: 'Michael Chen',
        location: 'San Francisco, CA',
        rating: 5,
        comment: 'The ability to see every detail in 3D before it was made gave me complete confidence in my purchase. Excellent quality and service.',
        product: 'Custom Cufflinks',
        image: '/images/testimonials/michael.jpg',
    },
    {
        id: 3,
        name: 'Emma Rodriguez',
        location: 'Miami, FL',
        rating: 5,
        comment: 'I created a matching necklace and bracelet set for my wedding. The process was so intuitive and the final pieces are stunning!',
        product: 'Wedding Jewelry Set',
        image: '/images/testimonials/emma.jpg',
    },
];

export default function CustomerStories() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-4xl font-serif font-bold">
                        Customer
                        <span className="block text-gradient-gold mt-2">
                            Success Stories
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Hear from customers who have created their perfect pieces with our platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.id} className="relative overflow-hidden">
                            <CardContent className="p-6">
                                {/* Quote Icon */}
                                <div className="absolute top-4 right-4">
                                    <Quote className="h-8 w-8 text-yellow-200" />
                                </div>

                                {/* Customer Info */}
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-full flex items-center justify-center">
                                        <span className="text-white font-semibold text-lg">
                                            {testimonial.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-600">{testimonial.location}</p>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                    ))}
                                </div>

                                {/* Comment */}
                                <p className="text-gray-700 mb-4 italic">
                                    "{testimonial.comment}"
                                </p>

                                {/* Product */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="text-sm font-medium text-gray-600">
                                        {testimonial.product}
                                    </span>
                                    <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                                        View Design →
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div className="space-y-2">
                        <div className="text-3xl font-bold text-gradient-gold">10,000+</div>
                        <div className="text-sm text-gray-600">Happy Customers</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-3xl font-bold text-gradient-gold">15,000+</div>
                        <div className="text-sm text-gray-600">Custom Designs</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-3xl font-bold text-gradient-gold">4.9★</div>
                        <div className="text-sm text-gray-600">Average Rating</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-3xl font-bold text-gradient-gold">25+</div>
                        <div className="text-sm text-gray-600">Countries Served</div>
                    </div>
                </div>
            </div>
        </section>
    );
}