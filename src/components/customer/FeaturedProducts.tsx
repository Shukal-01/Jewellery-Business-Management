// 'use client';

// import Link from 'next/link';
// import { Star, Heart, Sparkles } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { formatPrice } from '@/lib/utils';

// const categories = [
//     {
//         id: 'rings',
//         name: 'Engagement Rings',
//         description: ' timeless symbols of love and commitment',
//         image: '/images/categories/rings.jpg',
//         count: 156,
//         gradient: 'from-yellow-400 to-pink-400',
//     },
//     {
//         id: 'pendants',
//         name: 'Pendants',
//         description: 'Elegant necklaces for every occasion',
//         image: '/images/categories/pendants.jpg',
//         count: 89,
//         gradient: 'from-blue-400 to-purple-400',
//     },
//     {
//         id: 'bracelets',
//         name: 'Bracelets',
//         description: 'Sophisticated wrist adornments',
//         image: '/images/categories/bracelets.jpg',
//         count: 67,
//         gradient: 'from-green-400 to-blue-400',
//     },
//     {
//         id: 'earrings',
//         name: 'Earrings',
//         description: 'Perfect finishing touches',
//         image: '/images/categories/earrings.jpg',
//         count: 124,
//         gradient: 'from-pink-400 to-red-400',
//     },
//     {
//         id: 'custom',
//         name: 'Custom Design',
//         description: 'Create something completely unique',
//         image: '/images/categories/custom.jpg',
//         count: null,
//         gradient: 'from-purple-400 to-indigo-400',
//     },
// ];

// export default function FeaturedProducts() {
//     return (
//         <section className="py-20 bg-white">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="text-center space-y-4 mb-12">
//                     <h2 className="text-4xl font-serif font-bold">
//                         Explore Our
//                         <span className="block text-gradient-gold mt-2">
//                             Collections
//                         </span>
//                     </h2>
//                     <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//                         From classic designs to modern innovations, find the perfect piece for every style and occasion.
//                     </p>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {categories.map((category) => (
//                         <Link key={category.id} href={`/customer/templates?category=${category.id}`}>
//                             <Card className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
//                                 <div className="relative h-64 overflow-hidden">
//                                     {/* Gradient Background */}
//                                     <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90`}></div>

//                                     {/* Pattern Overlay */}
//                                     <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="10" cy="10" r="2"/%3E%3C/g%3E%3C/svg%3E')]"></div>

//                                 {/* Icon */}
//                                 <div className="absolute inset-0 flex items-center justify-center">
//                                     <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
//                                         <Sparkles className="h-10 w-10 text-white" />
//                                     </div>
//                                 </div>

//                                 {/* Category Label */}
//                                 <div className="absolute top-4 left-4">
//                                     <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
//                                         {category.count ? `${category.count} Designs` : 'Custom'}
//                                     </span>
//                                 </div>

//                                 {/* Hover Effect */}
//                                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                                     <div className="text-white text-center">
//                                         <p className="text-lg font-semibold">Explore Collection</p>
//                                         <p className="text-sm opacity-90">View all designs</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <CardContent className="p-6">
//                                 <h3 className="text-xl font-semibold mb-2 group-hover:text-yellow-600 transition-colors">
//                                     {category.name}
//                                 </h3>
//                                 <p className="text-gray-600 text-sm">
//                                     {category.description}
//                                 </p>
//                             </CardContent>
//                         </Card>
//                     </Link>
//                 ))}
//             </div>

//             {/* View All Button */}
//             <div className="text-center mt-12">
//                 <Link href="/customer/templates">
//                     <Button size="lg" variant="outline" className="px-8">
//                         View All Categories
//                     </Button>
//                 </Link>
//             </div>
//         </div>
//     </section >
//   );
// }

'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
    {
        id: 'rings',
        name: 'Engagement Rings',
        description: ' timeless symbols of love and commitment',
        image: '/images/categories/rings.jpg',
        count: 156,
        gradient: 'from-yellow-400 to-pink-400',
    },
    {
        id: 'pendants',
        name: 'Pendants',
        description: 'Elegant necklaces for every occasion',
        image: '/images/categories/pendants.jpg',
        count: 89,
        gradient: 'from-blue-400 to-purple-400',
    },
    {
        id: 'bracelets',
        name: 'Bracelets',
        description: 'Sophisticated wrist adornments',
        image: '/images/categories/bracelets.jpg',
        count: 67,
        gradient: 'from-green-400 to-blue-400',
    },
    {
        id: 'earrings',
        name: 'Earrings',
        description: 'Perfect finishing touches',
        image: '/images/categories/earrings.jpg',
        count: 124,
        gradient: 'from-pink-400 to-red-400',
    },
    {
        id: 'custom',
        name: 'Custom Design',
        description: 'Create something completely unique',
        image: '/images/categories/custom.jpg',
        count: null,
        gradient: 'from-purple-400 to-indigo-400',
    },
];

export default function FeaturedProducts() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-4xl font-serif font-bold">
                        Explore Our
                        <span className="block text-gradient-gold mt-2">
                            Collections
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        From classic designs to modern innovations, find the perfect piece for every style and occasion.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <Link key={category.id} href={`/customer/templates?category=${category.id}`}>
                            <Card className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="relative h-64 overflow-hidden">

                                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90`} />

                                    <div
                                        className={`absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/g%3E%3C/svg%3E")]`}
                                    ></div>


                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                            <Sparkles className="h-10 w-10 text-white" />
                                        </div>
                                    </div>

                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                                            {category.count ? `${category.count} Designs` : 'Custom'}
                                        </span>
                                    </div>

                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="text-white text-center">
                                            <p className="text-lg font-semibold">Explore Collection</p>
                                            <p className="text-sm opacity-90">View all designs</p>
                                        </div>
                                    </div>
                                </div>

                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-yellow-600 transition-colors">
                                        {category.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {category.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/customer/templates">
                        <Button size="lg" variant="outline" className="px-8">
                            View All Categories
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
