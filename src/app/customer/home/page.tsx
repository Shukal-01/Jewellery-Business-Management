'use client'
import HeroBanner from '@/components/customer/HeroBanner';
import FeaturedProducts from '@/components/customer/FeaturedProducts';
import TrendingPieces from '@/components/customer/TrendingPieces';
import CustomerStories from '@/components/customer/CustomerStories';
import CTASection from '@/components/customer/CTASection';
import ModelGallery from '@/components/3d/ModelGallery';
import { ModelMetadata } from '@/lib/3d/modelLoader';
import { useRouter } from 'next/navigation';

export default function CustomerHomePage() {
    const router = useRouter();

    const handleModelSelect = (model: ModelMetadata) => {
        // Navigate to builder page with selected model
        router.push(`/builder?modelId=${model.id}`);
    };

    return (
        <div className="space-y-16">
            {/* Hero Section with 3D Preview */}
            <HeroBanner />

            {/* Call to Action */}
            <CTASection />

            {/* Featured Categories */}
            <FeaturedProducts />

            {/* 3D Model Gallery */}
            <section className="py-16 bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-serif font-bold mb-4 text-white">
                            Explore Our 3D Collection
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Interact with our jewelry in stunning 3D. Click any piece to customize it with our advanced design tool.
                        </p>
                    </div>
                    <ModelGallery
                        onModelSelect={handleModelSelect}
                        category="all"
                        className="max-w-7xl mx-auto"
                    />
                </div>
            </section>

            {/* Trending Pieces */}
            <TrendingPieces />

            {/* Customer Stories */}
            <CustomerStories />

            {/* Final CTA */}
            <section className="py-20 bg-gradient-to-r from-yellow-100 via-pink-100 to-yellow-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-serif font-bold mb-4 text-gradient-gold">
                        Ready to Create Something Unique?
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join thousands of customers who have created their perfect piece of jewelry with our 3D design tool.
                    </p>
                    <button className="btn-gold px-8 py-4 text-lg">
                        Start Designing Now
                    </button>
                </div>
            </section>
        </div>
    );
}