'use client';

import { useState, useEffect } from 'react';
import { ModelLoader, ModelMetadata } from '@/lib/3d/modelLoader';
import JewelryViewer from './JewelryViewer';

interface ModelGalleryProps {
    onModelSelect?: (model: ModelMetadata) => void;
    selectedModelId?: string;
    className?: string;
    category?: 'rings' | 'pendants' | 'earrings' | 'bracelets' | 'all';
}

export default function ModelGallery({
    onModelSelect,
    selectedModelId,
    className = '',
    category = 'all',
}: ModelGalleryProps) {
    const [models, setModels] = useState<ModelMetadata[]>([]);
    const [loading, setLoading] = useState(true);
    const [hoveredModel, setHoveredModel] = useState<string | null>(null);

    useEffect(() => {
        const loadModels = async () => {
            try {
                const modelLoader = ModelLoader.getInstance();
                const availableModels = modelLoader.getAvailableModels();

                const filteredModels = category === 'all'
                    ? availableModels
                    : availableModels.filter(model => model.file.includes(category));

                setModels(filteredModels);
            } catch (error) {
                console.error('Failed to load models:', error);
            } finally {
                setLoading(false);
            }
        };

        loadModels();
    }, [category]);

    const handleModelClick = (model: ModelMetadata) => {
        onModelSelect?.(model);
    };

    if (loading) {
        return (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
                {[...Array(8)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                        <div className="bg-gray-800 rounded-lg overflow-hidden">
                            <div className="aspect-square bg-gray-700"></div>
                            <div className="p-4 space-y-2">
                                <div className="h-4 bg-gray-700 rounded"></div>
                                <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
                {[
                    { value: 'all', label: 'All Jewelry' },
                    { value: 'rings', label: 'Rings' },
                    { value: 'pendants', label: 'Pendants' },
                    { value: 'earrings', label: 'Earrings' },
                    { value: 'bracelets', label: 'Bracelets' },
                ].map((cat) => (
                    <button
                        key={cat.value}
                        onClick={() => {
                            // In a real app, this would update the category state
                            window.location.href = `?category=${cat.value}`;
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === cat.value
                                ? 'bg-yellow-500 text-black'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Model Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {models.map((model) => (
                    <div
                        key={model.id}
                        className={`group relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${selectedModelId === model.id
                                ? 'ring-2 ring-yellow-500 ring-offset-2 ring-offset-gray-900'
                                : 'hover:ring-2 hover:ring-gray-600 hover:ring-offset-2 hover:ring-offset-gray-900'
                            }`}
                        onClick={() => handleModelClick(model)}
                        onMouseEnter={() => setHoveredModel(model.id)}
                        onMouseLeave={() => setHoveredModel(null)}
                    >
                        {/* 3D Preview */}
                        <div className="aspect-square relative bg-gradient-to-br from-gray-900 to-gray-800">
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <JewelryViewer
                                    modelId={model.id}
                                    autoRotate={false}
                                    showEnvironment={false}
                                    lighting="studio"
                                    className="w-full h-full"
                                />
                            </div>

                            {/* Static Preview Fallback */}
                            <div className={`absolute inset-0 flex items-center justify-center ${hoveredModel === model.id ? 'opacity-0' : 'opacity-100'
                                } transition-opacity duration-300`}>
                                <div className="text-center">
                                    <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-2xl font-bold">
                                            {model.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {model.id.includes('ring') && '💍'}
                                        {model.id.includes('pendant') && '📿'}
                                        {model.id.includes('earring') && '👂'}
                                        {model.id.includes('bracelet') && '⌚'}
                                    </div>
                                </div>
                            </div>

                            {/* Hover Indicator */}
                            <div className={`absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white transition-opacity duration-300 ${hoveredModel === model.id ? 'opacity-100' : 'opacity-0'
                                }`}>
                                3D View
                            </div>

                            {/* Selection Indicator */}
                            {selectedModelId === model.id && (
                                <div className="absolute top-2 left-2 bg-yellow-500 text-black rounded-full p-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* Model Information */}
                        <div className="p-4 space-y-2">
                            <div>
                                <h3 className="font-medium text-white group-hover:text-yellow-400 transition-colors">
                                    {model.name}
                                </h3>
                                <p className="text-sm text-gray-400 line-clamp-2">
                                    {model.description}
                                </p>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-lg font-bold text-white">
                                    ${model.price.toLocaleString()}
                                </div>

                                {/* Material Preview */}
                                <div className="flex space-x-1">
                                    {model.materials.slice(0, 3).map((material) => (
                                        <div
                                            key={material}
                                            className="w-4 h-4 rounded-full border border-gray-600"
                                            style={{
                                                backgroundColor: material === 'gold' ? '#FFD700' :
                                                    material === 'white-gold' ? '#E5E4E2' :
                                                        material === 'rose-gold' ? '#E0BFB8' :
                                                            material === 'platinum' ? '#F5F5F5' :
                                                                material === 'silver' ? '#C0C0C0' : '#888'
                                            }}
                                            title={material}
                                        />
                                    ))}
                                    {model.materials.length > 3 && (
                                        <div className="w-4 h-4 rounded-full bg-gray-600 border border-gray-600 flex items-center justify-center">
                                            <span className="text-xs text-white">+</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Quick Specs */}
                            <div className="flex items-center space-x-3 text-xs text-gray-500">
                                <span>{model.materials.length} materials</span>
                                <span>•</span>
                                <span>{model.gems.length} gem options</span>
                                {model.vertexCount && (
                                    <>
                                        <span>•</span>
                                        <span>{model.vertexCount.toLocaleString()} vertices</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {models.length === 0 && !loading && (
                <div className="text-center py-12">
                    <div className="text-gray-500 mb-4">
                        <div className="text-6xl mb-4">💍</div>
                        <p className="text-xl font-medium">No models found</p>
                        <p className="text-sm mt-2">
                            Try selecting a different category or check back later for new designs.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}