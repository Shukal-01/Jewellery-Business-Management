'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import JewelryViewer from '@/components/3d/JewelryViewer';
import MaterialSelector from '@/components/customer/MaterialSelector';
import SizeSelector from '@/components/customer/SizeSelector';
import CustomizationPanel from '@/components/customer/CustomizationPanel';
import PricingCalculator from '@/components/customer/PricingCalculator';
import AISuggestions from '@/components/customer/AISuggestions';
import SaveSharePanel from '@/components/customer/SaveSharePanel';
import { formatPrice } from '@/lib/utils';
import { ModelLoader, ModelMetadata } from '@/lib/3d/modelLoader';

interface Material {
    name: string;
    color: string;
    metalness: number;
    roughness: number;
    transparency: number;
    priceMultiplier: number;
}

interface Customization {
    material: Material;
    size: string;
    gemstone: string;
    setting: string;
    finish: string;
    engraving?: string;
}

export default function BuilderPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const modelId = searchParams?.get('modelId') || undefined;

    const [isSaving, setIsSaving] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [designName, setDesignName] = useState('');
    const [basePrice, setBasePrice] = useState(299.99);
    const [selectedModel, setSelectedModel] = useState<ModelMetadata | null>(null);

    const defaultMaterial: Material = {
        name: 'Yellow Gold',
        color: '#FFD700',
        metalness: 1.0,
        roughness: 0.3,
        transparency: 0,
        priceMultiplier: 1.0,
    };

    const [customization, setCustomization] = useState<Customization>({
        material: defaultMaterial,
        size: '7.5',
        gemstone: 'diamond',
        setting: 'prong',
        finish: 'polished',
    });

    // Load model information when modelId is provided
    useEffect(() => {
        const loadModelInfo = async () => {
            if (modelId) {
                try {
                    const modelLoader = ModelLoader.getInstance();
                    const modelMetadata = modelLoader.getModelMetadata(modelId);
                    if (modelMetadata) {
                        setSelectedModel(modelMetadata);
                        setBasePrice(modelMetadata.price);
                        setDesignName(modelMetadata.name);

                        // Filter materials based on model's available materials
                        const filteredMaterials = materials.filter(mat =>
                            modelMetadata.materials.includes(mat.name.toLowerCase().replace(' ', '-'))
                        );
                        if (filteredMaterials.length > 0) {
                            setCustomization(prev => ({
                                ...prev,
                                material: filteredMaterials[0]
                            }));
                        }
                    }
                } catch (error) {
                    console.error('Failed to load model info:', error);
                }
            }
        };

        loadModelInfo();
    }, [modelId]);

    const materials: Material[] = [
        { name: 'Yellow Gold', color: '#FFD700', metalness: 1.0, roughness: 0.3, transparency: 0, priceMultiplier: 1.0 },
        { name: 'White Gold', color: '#E5E4E2', metalness: 1.0, roughness: 0.2, transparency: 0, priceMultiplier: 1.1 },
        { name: 'Rose Gold', color: '#E0BFB8', metalness: 1.0, roughness: 0.3, transparency: 0, priceMultiplier: 1.05 },
        { name: 'Platinum', color: '#F5F5F5', metalness: 1.0, roughness: 0.15, transparency: 0, priceMultiplier: 1.5 },
        { name: 'Silver', color: '#C0C0C0', metalness: 0.9, roughness: 0.4, transparency: 0, priceMultiplier: 0.6 },
    ];

    const updateCustomization = (key: keyof Customization, value: any) => {
        setCustomization(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleMaterialChange = (material: Material) => {
        updateCustomization('material', material);
    };

    const calculatePrice = () => {
        let price = basePrice;

        // Material multiplier
        price *= customization.material.priceMultiplier;

        // Size multiplier (simplified)
        const sizeMultiplier = 1 + (parseInt(customization.size) - 7) * 0.05;
        price *= Math.max(0.8, Math.min(1.5, sizeMultiplier));

        // Gemstone pricing
        const gemstonePrices: Record<string, number> = {
            diamond: 0,
            sapphire: 150,
            emerald: 200,
            ruby: 180,
            moissanite: -50,
        };
        price += gemstonePrices[customization.gemstone] || 0;

        // Setting pricing
        const settingPrices: Record<string, number> = {
            prong: 0,
            bezel: 50,
            channel: 75,
            pave: 150,
        };
        price += settingPrices[customization.setting] || 0;

        // Engraving
        if (customization.engraving) {
            price += 30;
        }

        return price;
    };

    const handleSaveDesign = async () => {
        if (!designName.trim()) {
            alert('Please enter a name for your design');
            return;
        }

        setIsSaving(true);
        try {
            // Here you would typically save to the backend
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            alert('Design saved successfully!');
        } catch (error) {
            alert('Failed to save design');
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddToCart = () => {
        if (!designName.trim()) {
            alert('Please enter a name for your design');
            return;
        }

        // Here you would typically add to cart
        alert('Added to cart!');
        router.push('/customer/cart');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" onClick={() => router.back()}>
                                ← Back
                            </Button>
                            <h1 className="text-2xl font-serif font-bold">Design Your Jewelry</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <div className="text-sm text-gray-600">Total Price</div>
                                <div className="text-2xl font-bold text-gradient-gold">
                                    {formatPrice(calculatePrice())}
                                </div>
                            </div>
                            <Button
                                onClick={handleAddToCart}
                                className="btn-gold"
                                disabled={!designName.trim()}
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Builder Interface */}
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: 3D Viewer */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Design Name */}
                        <Card>
                            <CardContent className="p-4">
                                <input
                                    type="text"
                                    placeholder="Enter design name..."
                                    value={designName}
                                    onChange={(e) => setDesignName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </CardContent>
                        </Card>

                        {/* 3D Viewer */}
                        <Card>
                            <CardContent className="p-0">
                                <div className="h-[500px]">
                                    {selectedModel && (
                                        <div className="mb-4 p-4 bg-gradient-to-r from-yellow-50 to-pink-50 border border-yellow-200 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium text-gray-900">{selectedModel.name}</h3>
                                                    <p className="text-sm text-gray-600">{selectedModel.description}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xs text-gray-500">Base Price</div>
                                                    <div className="text-lg font-bold text-gray-900">
                                                        ${selectedModel.price.toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <JewelryViewer
                                        modelId={modelId}
                                        materials={materials}
                                        selectedMaterial={customization.material}
                                        onMaterialChange={handleMaterialChange}
                                        autoRotate={true}
                                        showEnvironment={true}
                                        lighting="studio"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Material and Size Controls */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Material</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <MaterialSelector
                                        materials={materials}
                                        selectedMaterial={customization.material}
                                        onMaterialChange={handleMaterialChange}
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Size</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <SizeSelector
                                        selectedSize={customization.size}
                                        onSizeChange={(size: any) => updateCustomization('size', size)}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Right: Customization Panel */}
                    <div className="space-y-4">
                        {/* Customization Options */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Customize</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CustomizationPanel
                                    customization={customization}
                                    onUpdate={updateCustomization}
                                />
                            </CardContent>
                        </Card>

                        {/* AI Suggestions */}
                        <AISuggestions
                            customization={customization}
                            onApplySuggestion={(suggestion: { [s: string]: unknown; } | ArrayLike<unknown>) => {
                                // Apply AI suggestion
                                Object.entries(suggestion).forEach(([key, value]) => {
                                    updateCustomization(key as keyof Customization, value);
                                });
                            }}
                        />

                        {/* Pricing Calculator */}
                        <PricingCalculator
                            basePrice={basePrice}
                            customization={customization}
                        />

                        {/* Save & Share */}
                        <SaveSharePanel
                            onSave={handleSaveDesign}
                            isSaving={isSaving}
                            designName={designName}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}