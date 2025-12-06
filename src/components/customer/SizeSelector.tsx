'use client';

import { Button } from '@/components/ui/button';

interface SizeSelectorProps {
    selectedSize: string;
    onSizeChange: (size: string) => void;
}

const ringSizes = ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'];

export default function SizeSelector({ selectedSize, onSizeChange }: SizeSelectorProps) {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">Ring Size</h3>
                <Button variant="ghost" size="sm" className="text-xs text-yellow-600 hover:text-yellow-700">
                    Size Guide
                </Button>
            </div>

            <div className="grid grid-cols-4 gap-2">
                {ringSizes.map((size) => (
                    <button
                        key={size}
                        onClick={() => onSizeChange(size)}
                        className={`py-2 px-3 text-sm font-medium rounded-lg border transition-all duration-200 ${selectedSize === size
                                ? 'border-yellow-500 bg-yellow-500 text-black'
                                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                            }`}
                    >
                        {size}
                    </button>
                ))}
            </div>

            {/* Size Preview */}
            <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600 mb-2">Selected Size:</div>
                <div className="text-2xl font-bold text-gray-900">{selectedSize}</div>
                <div className="text-xs text-gray-500 mt-1">
                    Circumference: {(parseFloat(selectedSize) * 0.8128 + 11.63).toFixed(1)}mm
                </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="text-sm text-blue-800">
                    <strong>💡 Tip:</strong> If you're between sizes, we recommend sizing up for comfort.
                </div>
            </div>
        </div>
    );
}