'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, Grid, List } from 'lucide-react';

interface TemplateFiltersProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    totalTemplates: number;
    filteredCount: number;
}

const categories = [
    { id: 'all', name: 'All Templates', count: null, icon: '✨' },
    { id: 'ring', name: 'Rings', count: 156, icon: '💍' },
    { id: 'pendant', name: 'Pendants', count: 89, icon: '📿' },
    { id: 'bracelet', name: 'Bracelets', count: 67, icon: '🔗' },
    { id: 'earrings', name: 'Earrings', count: 124, icon: '👂' },
    { id: 'custom', name: 'Custom', count: null, icon: '🎨' },
];

const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
];

export default function TemplateFilters({
    selectedCategory,
    onCategoryChange,
    totalTemplates,
    filteredCount,
}: TemplateFiltersProps) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState('popular');
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="space-y-4">
            {/* Results Summary */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-sm text-gray-600">
                    Showing <span className="font-semibold text-gray-900">{filteredCount}</span> of{' '}
                    <span className="font-semibold text-gray-900">{totalTemplates}</span> templates
                </div>

                <div className="flex items-center space-x-4">
                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    {/* View Mode */}
                    <div className="flex items-center space-x-1 border border-gray-300 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-yellow-500 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            <Grid className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-yellow-500 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Mobile Filter Toggle */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFilters(!showFilters)}
                        className="sm:hidden"
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </Button>
                </div>
            </div>

            {/* Category Filters */}
            <Card className={`${showFilters ? 'block' : 'hidden sm:block'}`}>
                <CardContent className="p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => onCategoryChange(category.id)}
                                className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${selectedCategory === category.id
                                        ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="text-center space-y-2">
                                    <div className="text-2xl">{category.icon}</div>
                                    <div className="text-sm font-medium">{category.name}</div>
                                    {category.count && (
                                        <div className="text-xs text-gray-500">({category.count})</div>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Advanced Filters */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Price Range */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price Range
                                </label>
                                <div className="flex space-x-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>
                            </div>

                            {/* Material Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Material
                                </label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                                    <option value="">All Materials</option>
                                    <option value="gold">Gold</option>
                                    <option value="platinum">Platinum</option>
                                    <option value="silver">Silver</option>
                                    <option value="rose-gold">Rose Gold</option>
                                </select>
                            </div>

                            {/* Style Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Style
                                </label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                                    <option value="">All Styles</option>
                                    <option value="classic">Classic</option>
                                    <option value="modern">Modern</option>
                                    <option value="vintage">Vintage</option>
                                    <option value="minimalist">Minimalist</option>
                                </select>
                            </div>
                        </div>

                        {/* Filter Actions */}
                        <div className="flex space-x-3 mt-4">
                            <Button variant="outline" size="sm">
                                Apply Filters
                            </Button>
                            <Button variant="ghost" size="sm">
                                Clear All
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}