'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import TemplateGallery from '@/components/customer/TemplateGallery';
import TemplateFilters from '@/components/customer/TemplateFilters';
import { formatPrice } from '@/lib/utils';

interface Template {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    imageUrl: string;
    modelUrl: string;
    availableMaterials: string[];
    isPopular: boolean;
    isNew: boolean;
    rating: number;
    reviewCount: number;
}

export default function TemplatesPage() {
    const searchParams = useSearchParams();
    const categoryFilter = searchParams.get('category');
    const [templates, setTemplates] = useState<Template[]>([]);
    const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(categoryFilter || 'all');

    useEffect(() => {
        loadTemplates();
    }, []);

    useEffect(() => {
        filterTemplates();
    }, [templates, selectedCategory]);

    const loadTemplates = async () => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockTemplates: Template[] = [
                {
                    id: 'classic-solitaire',
                    name: 'Classic Solitaire Ring',
                    description: 'A timeless design featuring a single brilliant-cut center stone',
                    category: 'ring',
                    basePrice: 299.99,
                    imageUrl: '/images/templates/classic-solitaire.jpg',
                    modelUrl: '/models/classic-ring.glb',
                    availableMaterials: ['gold_yellow', 'gold_white', 'gold_rose', 'platinum'],
                    isPopular: true,
                    isNew: false,
                    rating: 4.9,
                    reviewCount: 156,
                },
                {
                    id: 'halo-engagement',
                    name: 'Halo Engagement Ring',
                    description: 'Stunning center stone surrounded by a halo of accent diamonds',
                    category: 'ring',
                    basePrice: 599.99,
                    imageUrl: '/images/templates/halo-engagement.jpg',
                    modelUrl: '/models/halo-ring.glb',
                    availableMaterials: ['gold_white', 'platinum'],
                    isPopular: true,
                    isNew: true,
                    rating: 4.8,
                    reviewCount: 89,
                },
                {
                    id: 'three-stone',
                    name: 'Three Stone Ring',
                    description: 'Symbolic design featuring three stunning stones',
                    category: 'ring',
                    basePrice: 449.99,
                    imageUrl: '/images/templates/three-stone.jpg',
                    modelUrl: '/models/three-stone-ring.glb',
                    availableMaterials: ['gold_yellow', 'gold_white', 'gold_rose'],
                    isPopular: false,
                    isNew: false,
                    rating: 4.7,
                    reviewCount: 67,
                },
                {
                    id: 'teardrop-pendant',
                    name: 'Teardrop Pendant',
                    description: 'Elegant teardrop-shaped pendant with brilliant-cut stone',
                    category: 'pendant',
                    basePrice: 199.99,
                    imageUrl: '/images/templates/teardrop-pendant.jpg',
                    modelUrl: '/models/teardrop-pendant.glb',
                    availableMaterials: ['gold_white', 'gold_yellow', 'silver'],
                    isPopular: true,
                    isNew: false,
                    rating: 4.8,
                    reviewCount: 124,
                },
                {
                    id: 'heart-locket',
                    name: 'Heart Locket',
                    description: 'Romantic heart-shaped locket perfect for keepsakes',
                    category: 'pendant',
                    basePrice: 149.99,
                    imageUrl: '/images/templates/heart-locket.jpg',
                    modelUrl: '/models/heart-locket.glb',
                    availableMaterials: ['gold_yellow', 'gold_rose', 'silver'],
                    isPopular: false,
                    isNew: true,
                    rating: 4.6,
                    reviewCount: 45,
                },
                {
                    id: 'tennis-bracelet',
                    name: 'Tennis Bracelet',
                    description: 'Classic line bracelet with symmetrical diamonds',
                    category: 'bracelet',
                    basePrice: 799.99,
                    imageUrl: '/images/templates/tennis-bracelet.jpg',
                    modelUrl: '/models/tennis-bracelet.glb',
                    availableMaterials: ['gold_white', 'gold_yellow', 'platinum'],
                    isPopular: true,
                    isNew: false,
                    rating: 4.9,
                    reviewCount: 98,
                },
                {
                    id: 'charm-bracelet',
                    name: 'Charm Bracelet',
                    description: 'Personalizable bracelet with customizable charms',
                    category: 'bracelet',
                    basePrice: 249.99,
                    imageUrl: '/images/templates/charm-bracelet.jpg',
                    modelUrl: '/models/charm-bracelet.glb',
                    availableMaterials: ['gold_yellow', 'gold_rose', 'silver'],
                    isPopular: false,
                    isNew: true,
                    rating: 4.5,
                    reviewCount: 32,
                },
                {
                    id: 'stud-earrings',
                    name: 'Diamond Stud Earrings',
                    description: 'Classic and versatile stud earrings with brilliant-cut diamonds',
                    category: 'earrings',
                    basePrice: 399.99,
                    imageUrl: '/images/templates/stud-earrings.jpg',
                    modelUrl: '/models/stud-earrings.glb',
                    availableMaterials: ['gold_white', 'gold_yellow', 'platinum'],
                    isPopular: true,
                    isNew: false,
                    rating: 4.8,
                    reviewCount: 203,
                },
                {
                    id: 'hoop-earrings',
                    name: 'Hoop Earrings',
                    description: 'Elegant hoop earrings with pave diamond details',
                    category: 'earrings',
                    basePrice: 299.99,
                    imageUrl: '/images/templates/hoop-earrings.jpg',
                    modelUrl: '/models/hoop-earrings.glb',
                    availableMaterials: ['gold_yellow', 'gold_white', 'gold_rose'],
                    isPopular: false,
                    isNew: false,
                    rating: 4.6,
                    reviewCount: 78,
                },
            ];

            setTemplates(mockTemplates);
        } catch (error) {
            console.error('Failed to load templates:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filterTemplates = () => {
        let filtered = templates;

        if (selectedCategory && selectedCategory !== 'all') {
            filtered = filtered.filter(template => template.category === selectedCategory);
        }

        setFilteredTemplates(filtered);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-serif font-bold">
                            Jewelry
                            <span className="block text-gradient-gold mt-2">
                                Templates
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Choose from our curated collection of designer templates and customize them to make them uniquely yours.
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="container mx-auto px-4 py-6">
                <TemplateFilters
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                    totalTemplates={templates.length}
                    filteredCount={filteredTemplates.length}
                />
            </div>

            {/* Template Gallery */}
            <div className="container mx-auto px-4 pb-12">
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <Card key={i} className="overflow-hidden">
                                <div className="aspect-square bg-gray-200 animate-pulse"></div>
                                <CardContent className="p-4 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                                    <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2"></div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <TemplateGallery templates={filteredTemplates} />
                )}

                {/* No Results */}
                {!isLoading && filteredTemplates.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No templates found
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Try adjusting your filters or browse all categories
                        </p>
                        <Button onClick={() => setSelectedCategory('all')}>
                            View All Templates
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}