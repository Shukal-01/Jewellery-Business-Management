// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import Link from 'next/link';
// import { ArrowRight, Play, Sparkles } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import JewelryViewer from '@/components/3d/JewelryViewer';
// import { getMaterialName } from '@/lib/utils';

// const featuredJewelry = [
//     { id: 1, name: 'Classic Solitaire Ring', url: '/models/classic-ring.glb', category: 'ring' },
//     { id: 2, name: 'Diamond Teardrop Pendant', url: '/models/diamond-pendant.glb', category: 'pendant' },
//     { id: 3, name: 'Modern Link Bracelet', url: '/models/modern-bracelet.glb', category: 'bracelet' },
// ];

// export default function HeroBanner() {
//     const [currentJewelryIndex, setCurrentJewelryIndex] = useState(0);
//     const [isAutoRotating, setIsAutoRotating] = useState(true);
//     const [isLoading, setIsLoading] = useState(true);

//     const currentJewelry = featuredJewelry[currentJewelryIndex];

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentJewelryIndex((prev) => (prev + 1) % featuredJewelry.length);
//         }, 5000);

//         return () => clearInterval(interval);
//     }, []);

//     const handleJewelryChange = (index: number) => {
//         setCurrentJewelryIndex(index);
//         setIsLoading(true);
//     };

//     return (
//         <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-100 via-white to-pink-100">
//             {/* Background Pattern */}
//             <div
//                 className={`absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-50`}
//             />


//             {/* Floating Particles */}
//             <div className="absolute inset-0 overflow-hidden">
//                 {[...Array(20)].map((_, i) => (
//                     <div
//                         key={i}
//                         className="absolute animate-pulse"
//                         style={{
//                             left: `${Math.random() * 100}%`,
//                             top: `${Math.random() * 100}%`,
//                             animationDelay: `${Math.random() * 5}s`,
//                             animationDuration: `${3 + Math.random() * 4}s`,
//                         }}
//                     >
//                         <Sparkles className="h-4 w-4 text-yellow-400 opacity-60" />
//                     </div>
//                 ))}
//             </div>

//             <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="grid lg:grid-cols-2 gap-12 items-center">
//                     {/* Left Content */}
//                     <div className="space-y-8 text-center lg:text-left">
//                         <div className="space-y-4">
//                             <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
//                                 <Sparkles className="h-4 w-4 mr-2" />
//                                 New: AI-Powered Design Assistant
//                             </div>

//                             <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
//                                 Create Your
//                                 <span className="block text-gradient-gold mt-2">
//                                     Dream Jewelry
//                                 </span>
//                             </h1>

//                             <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
//                                 Design stunning custom jewelry with our advanced 3D technology.
//                                 Choose from premium materials, visualize in real-time, and bring your vision to life.
//                             </p>
//                         </div>

//                         <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                             <Link href="/customer/builder">
//                                 <Button size="lg" className="btn-gold group">
//                                     Create Your Own Design
//                                     <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
//                                 </Button>
//                             </Link>

//                             <Button size="lg" variant="outline" className="group">
//                                 <Play className="mr-2 h-4 w-4" />
//                                 Watch Demo
//                             </Button>
//                         </div>

//                         {/* Stats */}
//                         <div className="grid grid-cols-3 gap-6 pt-8">
//                             <div className="text-center">
//                                 <div className="text-3xl font-bold text-gradient-gold">10K+</div>
//                                 <div className="text-sm text-gray-600">Happy Customers</div>
//                             </div>
//                             <div className="text-center">
//                                 <div className="text-3xl font-bold text-gradient-gold">4.9★</div>
//                                 <div className="text-sm text-gray-600">Average Rating</div>
//                             </div>
//                             <div className="text-center">
//                                 <div className="text-3xl font-bold text-gradient-gold">48h</div>
//                                 <div className="text-sm text-gray-600">Avg. Production</div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right 3D Viewer */}
//                     <div className="relative">
//                         <div className="relative h-[500px] w-full">
//                             <JewelryViewer
//                                 modelUrl={currentJewelry.url}
//                                 autoRotate={isAutoRotating}
//                                 showEnvironment={true}
//                                 lighting="studio"
//                                 className="w-full h-full rounded-2xl"
//                             />

//                             {/* Jewelry Info Overlay */}
//                             <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
//                                 <h3 className="font-semibold text-gray-900">{currentJewelry.name}</h3>
//                                 <p className="text-sm text-gray-600 capitalize">{currentJewelry.category}</p>
//                             </div>

//                             {/* Viewer Controls */}
//                             <div className="absolute bottom-4 right-4 flex space-x-2">
//                                 <button
//                                     onClick={() => setIsAutoRotating(!isAutoRotating)}
//                                     className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
//                                 >
//                                     {isAutoRotating ? '⏸️' : '▶️'}
//                                 </button>
//                                 <button
//                                     onClick={() => handleJewelryChange((currentJewelryIndex + 1) % featuredJewelry.length)}
//                                     className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
//                                 >
//                                     →
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Thumbnail Navigation */}
//                         <div className="flex justify-center space-x-2 mt-4">
//                             {featuredJewelry.map((jewelry, index) => (
//                                 <button
//                                     key={jewelry.id}
//                                     onClick={() => handleJewelryChange(index)}
//                                     className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentJewelryIndex
//                                             ? 'w-8 bg-yellow-500'
//                                             : 'bg-gray-300 hover:bg-gray-400'
//                                         }`}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Features Section */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
//                     <div className="text-center space-y-3">
//                         <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
//                             <span className="text-2xl">💎</span>
//                         </div>
//                         <h3 className="text-lg font-semibold">Premium Materials</h3>
//                         <p className="text-gray-600 text-sm">
//                             Choose from gold, platinum, silver, and precious gems
//                         </p>
//                     </div>

//                     <div className="text-center space-y-3">
//                         <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
//                             <span className="text-2xl">🎨</span>
//                         </div>
//                         <h3 className="text-lg font-semibold">3D Customization</h3>
//                         <p className="text-gray-600 text-sm">
//                             Real-time preview of your custom design
//                         </p>
//                     </div>

//                     <div className="text-center space-y-3">
//                         <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
//                             <span className="text-2xl">🚚</span>
//                         </div>
//                         <h3 className="text-lg font-semibold">Fast Delivery</h3>
//                         <p className="text-gray-600 text-sm">
//                             Expert craftsmanship delivered worldwide
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </section >
//     );
// }

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import JewelryViewer from '@/components/3d/JewelryViewer';

const featuredJewelry = [
    { id: 1, name: 'Classic Solitaire Ring', url: '/models/classic-ring.glb', category: 'ring' },
    { id: 2, name: 'Diamond Teardrop Pendant', url: '/models/diamond-pendant.glb', category: 'pendant' },
    { id: 3, name: 'Modern Link Bracelet', url: '/models/modern-bracelet.glb', category: 'bracelet' },
];

interface Particle {
    id: number;
    left: string;
    top: string;
    delay: string;
    duration: string;
}

export default function HeroBanner() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoRotating, setIsAutoRotating] = useState(true);
    const [particles, setParticles] = useState<Particle[]>([]);

    const currentJewelry = featuredJewelry[currentIndex];

    // Auto-rotate models every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % featuredJewelry.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Generate floating particles only on client
    useEffect(() => {
        const generated = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: `${Math.random() * 5}s`,
            duration: `${3 + Math.random() * 4}s`,
        }));
        setParticles(generated);
    }, []);

    const handleChange = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-100 via-white to-pink-100">
            {/* Background Pattern */}
            <div
                className="absolute inset-0 opacity-50 bg-[url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23D4AF37\\' fill-opacity=\\'0.05\\'%3E%3Ccircle cx=\\'30\\' cy=\\'30\\' r=\\'2\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
            />

            {/* Floating Sparkle Particles (client-only) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="absolute animate-pulse"
                        style={{
                            left: p.left,
                            top: p.top,
                            animationDelay: p.delay,
                            animationDuration: p.duration,
                        }}
                    >
                        <Sparkles className="h-4 w-4 text-yellow-400 opacity-60" />
                    </div>
                ))}
            </div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* LEFT SECTION */}
                    <div className="space-y-8 text-center lg:text-left">
                        <div className="space-y-4">
                            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                                <Sparkles className="h-4 w-4 mr-2" />
                                New: AI-Powered Design Assistant
                            </div>

                            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                                Create Your
                                <span className="block text-gradient-gold mt-2">Dream Jewelry</span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
                                Design stunning custom jewelry with our advanced 3D technology.
                                Choose materials, visualize in real-time, and bring your vision to life.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/customer/builder">
                                <Button size="lg" className="btn-gold group">
                                    Create Your Own Design
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>

                            <Button size="lg" variant="outline" className="group">
                                <Play className="mr-2 h-4 w-4" />
                                Watch Demo
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gradient-gold">10K+</div>
                                <div className="text-sm text-gray-600">Happy Customers</div>
                            </div>

                            <div className="text-center">
                                <div className="text-3xl font-bold text-gradient-gold">4.9★</div>
                                <div className="text-sm text-gray-600">Average Rating</div>
                            </div>

                            <div className="text-center">
                                <div className="text-3xl font-bold text-gradient-gold">48h</div>
                                <div className="text-sm text-gray-600">Avg. Production</div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SECTION – 3D VIEWER */}
                    <div className="relative">
                        <div className="relative h-[500px] w-full">
                            <JewelryViewer
                                modelUrl={currentJewelry.url}
                                autoRotate={isAutoRotating}
                                showEnvironment
                                lighting="studio"
                                className="w-full h-full rounded-2xl"
                            />

                            {/* Overlay Info */}
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                                <h3 className="font-semibold text-gray-900">{currentJewelry.name}</h3>
                                <p className="text-sm text-gray-600 capitalize">{currentJewelry.category}</p>
                            </div>

                            {/* Controls */}
                            <div className="absolute bottom-4 right-4 flex space-x-2">
                                <button
                                    onClick={() => setIsAutoRotating(!isAutoRotating)}
                                    className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
                                >
                                    {isAutoRotating ? '⏸️' : '▶️'}
                                </button>

                                <button
                                    onClick={() => setCurrentIndex((currentIndex + 1) % featuredJewelry.length)}
                                    className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
                                >
                                    →
                                </button>
                            </div>
                        </div>

                        {/* Thumbnail Dots */}
                        <div className="flex justify-center space-x-2 mt-4">
                            {featuredJewelry.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleChange(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-yellow-500' : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                    <div className="text-center space-y-3">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                            <span className="text-2xl">💎</span>
                        </div>
                        <h3 className="text-lg font-semibold">Premium Materials</h3>
                        <p className="text-gray-600 text-sm">Gold, platinum, silver & gemstones.</p>
                    </div>

                    <div className="text-center space-y-3">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                            <span className="text-2xl">🎨</span>
                        </div>
                        <h3 className="text-lg font-semibold">3D Customization</h3>
                        <p className="text-gray-600 text-sm">Real-time 3D visualization.</p>
                    </div>

                    <div className="text-center space-y-3">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <span className="text-2xl">🚚</span>
                        </div>
                        <h3 className="text-lg font-semibold">Fast Delivery</h3>
                        <p className="text-gray-600 text-sm">Worldwide shipping in 48h.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
