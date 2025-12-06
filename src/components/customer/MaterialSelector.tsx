'use client';

interface Material {
    name: string;
    color: string;
    metalness: number;
    roughness: number;
    transparency: number;
    priceMultiplier: number;
}

interface MaterialSelectorProps {
    materials: Material[];
    selectedMaterial: Material;
    onMaterialChange: (material: Material) => void;
}

export default function MaterialSelector({
    materials,
    selectedMaterial,
    onMaterialChange,
}: MaterialSelectorProps) {
    return (
        <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Choose Material</h3>
            <div className="grid grid-cols-2 gap-3">
                {materials.map((material) => (
                    <button
                        key={material.name}
                        onClick={() => onMaterialChange(material)}
                        className={`material-chip p-3 text-left ${selectedMaterial.name === material.name
                                ? 'border-yellow-500 bg-yellow-50 ring-2 ring-yellow-500'
                                : 'border-gray-300 bg-white hover:border-gray-400'
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            <div
                                className="w-8 h-8 rounded-full border-2 border-gray-300 flex-shrink-0"
                                style={{
                                    backgroundColor: material.color,
                                    boxShadow: selectedMaterial.name === material.name
                                        ? `0 0 10px ${material.color}40`
                                        : 'none',
                                }}
                            />
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900">
                                    {material.name}
                                </div>
                                <div className="text-xs text-gray-600">
                                    {material.priceMultiplier > 1 ? '+' : ''}{((material.priceMultiplier - 1) * 100).toFixed(0)}%
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}