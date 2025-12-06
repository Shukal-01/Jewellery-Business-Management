'use client';

import { useState, useEffect } from 'react';
import { use3DOptimization } from '@/hooks/use3DOptimization';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Activity,
    Zap,
    Cpu,
    HardDrive,
    Settings,
    TrendingUp,
    TrendingDown,
    Gauge
} from 'lucide-react';

interface PerformanceMonitorProps {
    showToggle?: boolean;
    defaultVisible?: boolean;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export default function PerformanceMonitor({
    showToggle = true,
    defaultVisible = false,
    position = 'top-right',
}: PerformanceMonitorProps) {
    const [isVisible, setIsVisible] = useState(defaultVisible);
    const { metrics, settings, isOptimized } = use3DOptimization();

    const getPositionClasses = () => {
        switch (position) {
            case 'top-left':
                return 'top-4 left-4';
            case 'top-right':
                return 'top-4 right-4';
            case 'bottom-left':
                return 'bottom-4 left-4';
            case 'bottom-right':
                return 'bottom-4 right-4';
            default:
                return 'top-4 right-4';
        }
    };

    const getFPSColor = (fps: number) => {
        if (fps >= 50) return 'text-green-500';
        if (fps >= 30) return 'text-yellow-500';
        return 'text-red-500';
    };

    const getMemoryColor = (memory: number) => {
        if (memory <= 100) return 'text-green-500';
        if (memory <= 200) return 'text-yellow-500';
        return 'text-red-500';
    };

    const formatMemory = (bytes: number) => {
        return `${bytes.toFixed(1)} MB`;
    };

    if (!isVisible && showToggle) {
        return (
            <div className={`fixed z-50 ${getPositionClasses()}`}>
                <Button
                    onClick={() => setIsVisible(true)}
                    size="sm"
                    variant="outline"
                    className="bg-white/90 backdrop-blur-sm border-gray-300 hover:bg-white"
                >
                    <Gauge className="w-4 h-4 mr-2" />
                    Performance
                </Button>
            </div>
        );
    }

    return (
        <div className={`fixed z-50 ${getPositionClasses()} space-y-2`}>
            {/* Main Performance Card */}
            <Card className="w-80 bg-white/95 backdrop-blur-sm border-gray-200 shadow-lg">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center">
                            <Activity className="w-5 h-5 mr-2" />
                            3D Performance
                        </CardTitle>
                        {showToggle && (
                            <Button
                                onClick={() => setIsVisible(false)}
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                            >
                                ×
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* FPS Counter */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium">FPS</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className={`text-lg font-bold ${getFPSColor(metrics.fps)}`}>
                                {metrics.fps}
                            </span>
                            {metrics.fps < 30 && <TrendingDown className="w-4 h-4 text-red-500" />}
                            {metrics.fps >= 50 && <TrendingUp className="w-4 h-4 text-green-500" />}
                        </div>
                    </div>

                    {/* Memory Usage */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Cpu className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium">Memory</span>
                        </div>
                        <span className={`text-sm font-bold ${getMemoryColor(metrics.memoryUsage)}`}>
                            {formatMemory(metrics.memoryUsage)}
                        </span>
                    </div>

                    {/* Draw Calls */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Activity className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium">Draw Calls</span>
                        </div>
                        <span className="text-sm font-bold text-gray-700">
                            {metrics.drawCalls}
                        </span>
                    </div>

                    {/* Geometries */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <HardDrive className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium">Geometries</span>
                        </div>
                        <span className="text-sm font-bold text-gray-700">
                            {metrics.geometries}
                        </span>
                    </div>

                    {/* Textures */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded" />
                            <span className="text-sm font-medium">Textures</span>
                        </div>
                        <span className="text-sm font-bold text-gray-700">
                            {metrics.textures}
                        </span>
                    </div>

                    {/* Optimization Status */}
                    <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Settings className="w-4 h-4 text-gray-600" />
                                <span className="text-sm font-medium">Optimization</span>
                            </div>
                            <span className={`text-sm font-bold ${isOptimized ? 'text-yellow-600' : 'text-green-600'
                                }`}>
                                {isOptimized ? 'Optimized' : 'High Quality'}
                            </span>
                        </div>

                        {/* Settings Summary */}
                        <div className="mt-2 space-y-1 text-xs text-gray-500">
                            <div>Pixel Ratio: {settings.pixelRatio}x</div>
                            <div>Shadow Map: {settings.shadowMapSize}px</div>
                            <div>Antialias: {settings.antialias ? 'On' : 'Off'}</div>
                            <div>Max Lights: {settings.maxLights}</div>
                        </div>
                    </div>

                    {/* Performance Tips */}
                    {metrics.fps < 30 && (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-xs text-yellow-800">
                                💡 Performance is low. Try reducing model complexity or closing other tabs.
                            </p>
                        </div>
                    )}

                    {metrics.memoryUsage > 200 && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-xs text-red-800">
                                ⚠️ High memory usage. Consider refreshing the page.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Mini FPS Counter (always visible when main is hidden) */}
            {!isVisible && (
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                    <div className="flex items-center space-x-2">
                        <Zap className="w-3 h-3 text-gray-600" />
                        <span className={`text-sm font-bold ${getFPSColor(metrics.fps)}`}>
                            {metrics.fps} FPS
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}