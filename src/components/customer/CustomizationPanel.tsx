'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Customization {
    material: any;
    size: string;
    gemstone: string;
    setting: string;
    finish: string;
    engraving?: string;
}

interface CustomizationPanelProps {
    customization: Customization;
    onUpdate: (key: keyof Customization, value: any) => void;
}

const gemstoneOptions = [
    { value: 'diamond', label: 'Diamond', color: '#B9F2FF' },
    { value: 'sapphire', label: 'Blue Sapphire', color: '#4169E1' },
    { value: 'emerald', label: 'Emerald', color: '#50C878' },
    { value: 'ruby', label: 'Ruby', color: '#E0115F' },
    { value: 'moissanite', label: 'Moissanite', color: '#F0F8FF' },
];

const settingOptions = [
    { value: 'prong', label: 'Prong Setting', description: 'Classic and secure' },
    { value: 'bezel', label: 'Bezel Setting', description: 'Modern and protective' },
    { value: 'channel', label: 'Channel Setting', description: 'Sleek and smooth' },
    { value: 'pave', label: 'Pavé Setting', description: 'Dazzling and detailed' },
];

const finishOptions = [
    { value: 'polished', label: 'Polished', description: 'High shine finish' },
    { value: 'matte', label: 'Matte', description: 'Smooth, non-reflective' },
    { value: 'brushed', label: 'Brushed', description: 'Textured finish' },
];

export default function CustomizationPanel({ customization, onUpdate }: CustomizationPanelProps) {
    return (
        <div className="space-y-4">
            {/* Gemstone Selection */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Center Stone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                        {gemstoneOptions.map((gemstone) => (
                            <button
                                key={gemstone.value}
                                onClick={() => onUpdate('gemstone', gemstone.value)}
                                className={`p-3 rounded-lg border-2 text-left transition-all ${customization.gemstone === gemstone.value
                                        ? 'border-yellow-500 bg-yellow-50'
                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center space-x-2">
                                    <div
                                        className="w-4 h-4 rounded-full border border-gray-300"
                                        style={{ backgroundColor: gemstone.color }}
                                    />
                                    <div>
                                        <div className="text-sm font-medium">{gemstone.label}</div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Setting Selection */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Setting Style</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {settingOptions.map((setting) => (
                        <button
                            key={setting.value}
                            onClick={() => onUpdate('setting', setting.value)}
                            className={`w-full p-3 rounded-lg border text-left transition-all ${customization.setting === setting.value
                                    ? 'border-yellow-500 bg-yellow-50'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                        >
                            <div className="font-medium text-sm">{setting.label}</div>
                            <div className="text-xs text-gray-600">{setting.description}</div>
                        </button>
                    ))}
                </CardContent>
            </Card>

            {/* Finish Selection */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Surface Finish</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {finishOptions.map((finish) => (
                        <button
                            key={finish.value}
                            onClick={() => onUpdate('finish', finish.value)}
                            className={`w-full p-3 rounded-lg border text-left transition-all ${customization.finish === finish.value
                                    ? 'border-yellow-500 bg-yellow-50'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                        >
                            <div className="font-medium text-sm">{finish.label}</div>
                            <div className="text-xs text-gray-600">{finish.description}</div>
                        </button>
                    ))}
                </CardContent>
            </Card>

            {/* Engraving */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Personalization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Engraving (Optional)
                        </label>
                        <Input
                            placeholder="Enter custom text..."
                            value={customization.engraving || ''}
                            onChange={(e) => onUpdate('engraving', e.target.value)}
                            maxLength={30}
                        />
                        <div className="text-xs text-gray-500 mt-1">
                            {customization.engraving?.length || 0}/30 characters
                        </div>
                    </div>

                    {customization.engraving && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <div className="text-sm text-yellow-800">
                                <strong>✨ Engraving Preview:</strong>
                                <div className="mt-1 font-mono">"{customization.engraving}"</div>
                                <div className="text-xs mt-1">+$30 for custom engraving</div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}