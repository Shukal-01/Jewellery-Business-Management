'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Lightbulb, TrendingUp } from 'lucide-react';

interface Customization {
    material: any;
    size: string;
    gemstone: string;
    setting: string;
    finish: string;
    engraving?: string;
}

interface AISuggestion {
    type: 'material' | 'gemstone' | 'setting' | 'combination';
    title: string;
    description: string;
    reason: string;
    confidence: number;
    impact: 'price' | 'popularity' | 'durability';
    changes: Partial<Customization>;
}

interface AISuggestionsProps {
    customization: Customization;
    onApplySuggestion: (suggestion: Partial<Customization>) => void;
}

export default function AISuggestions({ customization, onApplySuggestion }: AISuggestionsProps) {
    const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        generateSuggestions();
    }, [customization]);

    const generateSuggestions = async () => {
        setIsLoading(true);

        // Simulate AI processing
        await new Promise(resolve => setTimeout(resolve, 1000));

        const aiSuggestions: AISuggestion[] = [
            {
                type: 'material',
                title: 'Try Rose Gold',
                description: 'Rose gold would complement the sapphire beautifully',
                reason: 'The warm pink tones of rose gold create a stunning contrast with blue sapphires',
                confidence: 92,
                impact: 'popularity',
                changes: {
                    material: {
                        name: 'Rose Gold',
                        color: '#E0BFB8',
                        metalness: 1.0,
                        roughness: 0.3,
                        transparency: 0,
                        priceMultiplier: 1.05,
                    },
                },
            },
            {
                type: 'setting',
                title: 'Consider Pavé Setting',
                description: 'Add extra sparkle with a pavé setting',
                reason: 'Small diamonds on the band would enhance the center stone\'s brilliance',
                confidence: 88,
                impact: 'popularity',
                changes: {
                    setting: 'pave',
                },
            },
            {
                type: 'combination',
                title: 'Classic Diamond Combo',
                description: 'Traditional yellow gold with brilliant cut diamond',
                reason: 'This timeless combination has 95% customer satisfaction rate',
                confidence: 95,
                impact: 'durability',
                changes: {
                    material: {
                        name: 'Yellow Gold',
                        color: '#FFD700',
                        metalness: 1.0,
                        roughness: 0.3,
                        transparency: 0,
                        priceMultiplier: 1.0,
                    },
                    gemstone: 'diamond',
                    setting: 'prong',
                    finish: 'polished',
                },
            },
            {
                type: 'gemstone',
                title: 'Moissanite Alternative',
                description: 'Save money with a lab-grown alternative',
                reason: 'Moissanite has more fire and brilliance than diamond at 1/10th the cost',
                confidence: 85,
                impact: 'price',
                changes: {
                    gemstone: 'moissanite',
                },
            },
        ];

        setSuggestions(aiSuggestions);
        setIsLoading(false);
    };

    const getImpactColor = (impact: string) => {
        switch (impact) {
            case 'price':
                return 'text-green-600 bg-green-50';
            case 'popularity':
                return 'text-blue-600 bg-blue-50';
            case 'durability':
                return 'text-purple-600 bg-purple-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    const getImpactIcon = (impact: string) => {
        switch (impact) {
            case 'price':
                return '💰';
            case 'popularity':
                return '🔥';
            case 'durability':
                return '🛡️';
            default:
                return '✨';
        }
    };

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                        <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
                        AI Suggestions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center py-8">
                        <div className="text-center">
                            <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                            <p className="text-sm text-gray-600">Analyzing your design...</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                    <div className="flex items-center">
                        <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                        AI Suggestions
                    </div>
                    <Button variant="ghost" size="sm" onClick={generateSuggestions}>
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Refresh
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">
                    Personalized recommendations based on your current design
                </p>

                <div className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-3 hover:border-yellow-300 transition-colors"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                    <h4 className="font-medium text-sm text-gray-900 mb-1">
                                        {suggestion.title}
                                    </h4>
                                    <p className="text-xs text-gray-600 mb-2">
                                        {suggestion.description}
                                    </p>
                                    <p className="text-xs text-gray-500 italic">
                                        "{suggestion.reason}"
                                    </p>
                                </div>
                                <div className="flex flex-col items-end space-y-1">
                                    <span className="text-xs font-medium text-yellow-600">
                                        {suggestion.confidence}% match
                                    </span>
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full ${getImpactColor(suggestion.impact)}`}
                                    >
                                        {getImpactIcon(suggestion.impact)} {suggestion.impact}
                                    </span>
                                </div>
                            </div>

                            {/* Apply Button */}
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onApplySuggestion(suggestion.changes)}
                                className="w-full text-xs"
                            >
                                Apply Suggestion
                            </Button>
                        </div>
                    ))}
                </div>

                {/* AI Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                    <div className="text-xs text-blue-800">
                        <strong>🤖 AI Powered:</strong> Suggestions are based on design trends, customer preferences, and expert jeweler insights.
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}