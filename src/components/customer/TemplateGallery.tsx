'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, Heart, Eye, Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

interface TemplateGalleryProps {
    templates: Template[];
}

export default function TemplateGallery({ templates }: TemplateGalleryProps) {
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);

    const toggleFavorite = (templateId: string) => {
        setFavorites(prev =>
            prev.includes(templateId)
                ? prev.filter(id => id !== templateId)
                : [...prev, templateId]
        );
    };

    const getMaterialDisplay = (materials: string[]) => {
        const materialNames: Record<string, string> = {
            gold_yellow: 'Yellow Gold',
            gold_white: 'White Gold',
            gold_rose: 'Rose Gold',
            platinum: 'Platinum',
            silver: 'Silver',
        };

        return materials.slice(0, 2).map(m => materialNames[m] || m).join(', ') +
            (materials.length > 2 ? ` +${materials.length - 2} more` : '');
    };

    return (
        <div className="space-y-8">
            {/* Templates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <Card
                        key={template.id}
                        className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                        onMouseEnter={() => setSelectedTemplate(template.id)}
                        onMouseLeave={() => setSelectedTemplate(null)}
                    >
                        {/* Image Container */}
                        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-yellow-100 to-pink-100">
                            {/* Placeholder for template image */}
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-6xl mb-2">💍</div>
                                    <div className="text-sm text-gray-600 capitalize">{template.category}</div>
                                </div>
                            </div>

                            {/* Badges */}
                            <div className="absolute top-2 left-2 flex flex-col space-y-2">
                                {template.isNew && (
                                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                        New
                                    </span>
                                )}
                                {template.isPopular && (
                                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                        Hot
                                    </span>
                                )}
                            </div>

                            {/* Quick Actions */}
                            <div
                                className={`absolute top-2 right-2 space-y-2 transition-all duration-300 ${selectedTemplate === template.id
                                        ? 'opacity-100 translate-x-0'
                                        : 'opacity-0 translate-x-4'
                                    }`}
                            >
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(template.id);
                                    }}
                                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                                >
                                    <Heart
                                        className={`h-4 w-4 ${favorites.includes(template.id)
                                                ? 'text-red-500 fill-current'
                                                : 'text-gray-700'
                                            }`}
                                    />
                                </button>
                            </div>

                            {/* 3D Preview Button */}
                            <div
                                className={`absolute bottom-2 left-2 transition-all duration-300 ${selectedTemplate === template.id
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-4'
                                    }`}
                            >
                                <Button size="sm" variant="secondary" className="text-xs">
                                    <Eye className="h-3 w-3 mr-1" />
                                    3D Preview
                                </Button>
                            </div>
                        </div>

                        <CardContent className="p-4">
                            {/* Template Info */}
                            <div className="space-y-3">
                                <div>
                                    <h3 className="font-semibold text-lg mb-1 group-hover:text-yellow-600 transition-colors">
                                        {template.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {template.description}
                                    </p>
                                </div>

                                {/* Materials */}
                                <div className="text-xs text-gray-500">
                                    Available: {getMaterialDisplay(template.availableMaterials)}
                                </div>

                                {/* Rating */}
                                <div className="flex items-center space-x-1">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < Math.floor(template.rating)
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        {template.rating} ({template.reviewCount})
                                    </span>
                                </div>

                                {/* Price and Action */}
                                <div className="flex items-center justify-between pt-2">
                                    <div>
                                        <div className="text-xl font-bold text-gray-900">
                                            {formatPrice(template.basePrice)}
                                        </div>
                                        <div className="text-xs text-gray-500">Starting from</div>
                                    </div>
                                    <Link href={`/customer/builder?template=${template.id}`}>
                                        <Button size="sm" className="btn-gold">
                                            Customize
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Load More */}
            <div className="text-center">
                <Button variant="outline" size="lg" className="px-8">
                    Load More Templates
                </Button>
            </div>
        </div>
    );
}