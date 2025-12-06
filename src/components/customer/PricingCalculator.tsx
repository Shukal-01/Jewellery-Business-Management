'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';

interface Customization {
    material: any;
    size: string;
    gemstone: string;
    setting: string;
    finish: string;
    engraving?: string;
}

interface PricingCalculatorProps {
    basePrice: number;
    customization: Customization;
}

export default function PricingCalculator({ basePrice, customization }: PricingCalculatorProps) {
    const calculatePrice = () => {
        let price = basePrice;

        // Material multiplier
        price *= customization.material.priceMultiplier;

        // Size multiplier (simplified calculation)
        const sizeNum = parseFloat(customization.size);
        const sizeMultiplier = 1 + (sizeNum - 7) * 0.05;
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

        // Finish pricing (minimal impact)
        const finishPrices: Record<string, number> = {
            polished: 0,
            matte: 25,
            brushed: 15,
        };
        price += finishPrices[customization.finish] || 0;

        // Engraving
        if (customization.engraving) {
            price += 30;
        }

        return price;
    };

    const total = calculatePrice();
    const breakdown = [
        {
            label: 'Base Design',
            value: basePrice,
            description: 'Classic solitaire ring design',
        },
        {
            label: 'Material Upgrade',
            value: basePrice * (customization.material.priceMultiplier - 1),
            description: `${customization.material.name} (${((customization.material.priceMultiplier - 1) * 100).toFixed(0)}%)`,
        },
        {
            label: 'Size Adjustment',
            value: basePrice * 0.05 * (parseFloat(customization.size) - 7),
            description: `Size ${customization.size}`,
        },
    ];

    // Add gemstone cost if applicable
    const gemstoneCost = {
        diamond: 0,
        sapphire: 150,
        emerald: 200,
        ruby: 180,
        moissanite: -50,
    }[customization.gemstone];

    if (gemstoneCost !== 0) {
        breakdown.push({
            label: 'Gemstone',
            value: gemstoneCost,
            description: customization.gemstone.charAt(0).toUpperCase() + customization.gemstone.slice(1),
        });
    }

    // Add setting cost if applicable
    const settingCost = {
        prong: 0,
        bezel: 50,
        channel: 75,
        pave: 150,
    }[customization.setting];

    if (settingCost !== 0) {
        breakdown.push({
            label: 'Setting Style',
            value: settingCost,
            description: `${customization.setting.charAt(0).toUpperCase() + customization.setting.slice(1)} setting`,
        });
    }

    // Add engraving if applicable
    if (customization.engraving) {
        breakdown.push({
            label: 'Custom Engraving',
            value: 30,
            description: 'Personalized message',
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Price Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Breakdown */}
                <div className="space-y-3">
                    {breakdown.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                            <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900">{item.label}</div>
                                <div className="text-xs text-gray-600">{item.description}</div>
                            </div>
                            <div className="text-sm font-medium">
                                {item.value > 0 ? '+' : ''}{formatPrice(item.value)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Total */}
                <div className="pt-3 border-t-2 border-gray-200">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-lg font-bold text-gray-900">Total Price</div>
                            <div className="text-xs text-gray-600">Includes free shipping</div>
                        </div>
                        <div className="text-2xl font-bold text-gradient-gold">
                            {formatPrice(total)}
                        </div>
                    </div>
                </div>

                {/* Payment Options */}
                <div className="space-y-2 pt-3">
                    <div className="text-xs text-gray-600 mb-2">Payment options:</div>
                    <div className="flex space-x-2">
                        <div className="px-3 py-1 bg-gray-100 rounded text-xs">Credit Card</div>
                        <div className="px-3 py-1 bg-gray-100 rounded text-xs">PayPal</div>
                        <div className="px-3 py-1 bg-gray-100 rounded text-xs">Apple Pay</div>
                    </div>
                </div>

                {/* Savings Alert */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="text-sm text-green-800">
                        <strong>💰 Save 15%:</strong> Complete payment today and save {formatPrice(total * 0.15)}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}