'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Brain,
    Cpu,
    Zap,
    Activity,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Clock,
    Eye,
    BarChart3,
    PieChart,
    Wind,
    Database,
    DollarSign,
} from 'lucide-react';

interface SystemMetric {
    name: string;
    value: number;
    unit: string;
    status: 'good' | 'warning' | 'critical';
    icon: React.ElementType;
    description: string;
}

interface AlertData {
    id: string;
    type: 'critical' | 'warning' | 'info';
    category: string;
    title: string;
    message: string;
    timestamp: string;
    resolved: boolean;
}

interface ProcessingStream {
    id: string;
    requestId: string;
    type: string;
    status: 'processing' | 'completed' | 'failed';
    timestamp: string;
    duration: number;
}

export default function MonitoringDashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([]);
    const [alerts, setAlerts] = useState<AlertData[]>([]);
    const [processingStream, setProcessingStream] = useState<ProcessingStream[]>([]);
    const [timeRange, setTimeRange] = useState('today');

    useEffect(() => {
        loadMonitoringData();
        const interval = setInterval(loadMonitoringData, 5000); // Real-time updates
        return () => clearInterval(interval);
    }, [timeRange]);

    const loadMonitoringData = async () => {
        try {
            // Simulate API calls to monitoring systems
            await new Promise(resolve => setTimeout(resolve, 500));

            // Mock system metrics
            const mockMetrics: SystemMetric[] = [
                {
                    name: 'GPU Usage',
                    value: 68,
                    unit: '%',
                    status: 'good',
                    icon: Cpu,
                    description: 'NVIDIA RTX 4090',
                },
                {
                    name: 'AI Latency',
                    value: 2.3,
                    unit: 's',
                    status: 'good',
                    icon: Zap,
                    description: 'Average inference time',
                },
                {
                    name: 'Success Rate',
                    value: 99.2,
                    unit: '%',
                    status: 'good',
                    icon: Brain,
                    description: 'Design validation success',
                },
                {
                    name: 'Memory Usage',
                    value: 2.1,
                    unit: 'GB',
                    status: 'warning',
                    icon: Activity,
                    description: 'System memory consumption',
                },
                {
                    name: 'API Requests/min',
                    value: 1250,
                    unit: 'req/min',
                    status: 'good',
                    icon: Wind,
                    description: 'Current request rate',
                },
                {
                    name: 'Active Connections',
                    value: 234,
                    unit: 'conns',
                    status: 'good',
                    icon: Database,
                    description: 'WebSocket connections',
                },
            ];

            // Mock alerts
            const mockAlerts: AlertData[] = [
                {
                    id: '1',
                    type: 'warning',
                    category: 'performance',
                    title: 'High Memory Usage',
                    message: 'GPU memory usage approaching 80% threshold',
                    timestamp: '2024-01-15T10:30:00Z',
                    resolved: false,
                },
                {
                    id: '2',
                    type: 'info',
                    category: 'system',
                    title: 'Model Update Completed',
                    message: 'Design validation model v2.1.0 deployed successfully',
                    timestamp: '2024-01-15T09:45:00Z',
                    resolved: true,
                },
                {
                    id: '3',
                    type: 'critical',
                    category: 'ai',
                    title: 'Model Validation Failure',
                    message: 'Multiple design validations failing with wall thickness errors',
                    timestamp: '2024-01-15T08:15:00Z',
                    resolved: false,
                },
            ];

            // Mock processing stream
            const mockStream: ProcessingStream[] = [
                {
                    id: '1',
                    requestId: 'req-abc123',
                    type: 'Design Validation',
                    status: 'processing',
                    timestamp: new Date().toISOString(),
                    duration: 0,
                },
                {
                    id: '2',
                    requestId: 'req-def456',
                    type: 'Material Analysis',
                    status: 'completed',
                    timestamp: new Date(Date.now() - 3000).toISOString(),
                    duration: 3.2,
                },
                {
                    id: '3',
                    requestId: 'req-ghi789',
                    type: '3D Rendering',
                    status: 'failed',
                    timestamp: new Date(Date.now() - 5000).toISOString(),
                    duration: 1.1,
                },
            ];

            setSystemMetrics(mockMetrics);
            setAlerts(mockAlerts);
            setProcessingStream(mockStream);
        } catch (error) {
            console.error('Failed to load monitoring data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'good': return 'text-green-400 bg-green-900/20';
            case 'warning': return 'text-yellow-400 bg-yellow-900/20';
            case 'critical': return 'text-red-400 bg-red-900/20';
            default: return 'text-gray-400 bg-gray-900/20';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'good': return <TrendingUp className="h-4 w-4" />;
            case 'warning': return <AlertTriangle className="h-4 w-4" />;
            case 'critical': return <TrendingDown className="h-4 w-4" />;
            default: return <Clock className="h-4 w-4" />;
        }
    };

    const getAlertColor = (type: string) => {
        switch (type) {
            case 'critical': return 'border-red-500 text-red-400 bg-red-900/20';
            case 'warning': return 'border-yellow-500 text-yellow-400 bg-yellow-900/20';
            case 'info': return 'border-blue-500 text-blue-400 bg-blue-900/20';
            default: return 'border-gray-500 text-gray-400 bg-gray-900/20';
        }
    };

    const timeRanges = [
        { value: '1h', label: 'Last Hour' },
        { value: 'today', label: 'Today' },
        { value: '7d', label: 'Last 7 Days' },
        { value: '30d', label: 'Last 30 Days' },
    ];

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <h2 className="text-2xl font-bold text-white mb-6">AI Monitoring Dashboard</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <Card key={i} className="animate-pulse bg-gray-800 border-gray-700">
                                <CardContent className="p-6">
                                    <div className="h-4 bg-gray-700 rounded mb-4"></div>
                                    <div className="h-8 bg-gray-700 rounded"></div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const criticalAlerts = alerts.filter(alert => !alert.resolved && alert.type === 'critical');
    const warningAlerts = alerts.filter(alert => !alert.resolved && alert.type === 'warning');
    const totalActiveAlerts = criticalAlerts.length + warningAlerts.length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">AI Monitoring Dashboard</h2>
                    <p className="text-gray-400">Real-time AI system monitoring and performance metrics</p>
                </div>
                <div className="flex space-x-3">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {timeRanges.map((range) => (
                            <option key={range.value} value={range.value}>
                                {range.label}
                            </option>
                        ))}
                    </select>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Eye className="h-4 w-4 mr-2" />
                        Full Screen
                    </Button>
                </div>
            </div>

            {/* System Health Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {systemMetrics.map((metric, index) => (
                    <Card key={index} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${getStatusColor(metric.status)}`}>
                                    <metric.icon className={`h-6 w-6`} />
                                </div>
                                <div className={`flex items-center text-sm font-medium ${getStatusColor(metric.status)}`}>
                                    {getStatusIcon(metric.status)}
                                    <span className="ml-1">
                                        {metric.status === 'good' ? 'Healthy' :
                                            metric.status === 'warning' ? 'Warning' : 'Critical'}
                                    </span>
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-white">
                                {metric.value}
                                <span className="text-lg text-gray-400 ml-1">{metric.unit}</span>
                            </div>
                            <div className="text-sm text-gray-400">{metric.name}</div>
                            <div className="text-xs text-gray-500 mt-1">{metric.description}</div>

                            {/* Mini Chart/Progress Bar */}
                            <div className="mt-4">
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-500 ${metric.status === 'good' ? 'bg-green-500' :
                                                metric.status === 'warning' ? 'bg-yellow-500' :
                                                    'bg-red-500'
                                            }`}
                                        style={{ width: `${Math.min(metric.value, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Processing Stream */}
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="flex items-center text-white">
                            <Activity className="h-5 w-5 mr-2" />
                            Real-time Processing Stream
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {processingStream.map((item) => (
                                <div
                                    key={item.id}
                                    className={`p-3 rounded-lg border ${item.status === 'completed' ? 'border-green-600 bg-green-900/20' :
                                            item.status === 'failed' ? 'border-red-600 bg-red-900/20' :
                                                'border-blue-600 bg-blue-900/20'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm font-medium text-white">{item.type}</span>
                                            <span className="text-xs text-gray-400">{item.requestId}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {item.status === 'processing' && (
                                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                            )}
                                            {item.status === 'completed' && (
                                                <Eye className="h-4 w-4 text-green-400" />
                                            )}
                                            {item.status === 'failed' && (
                                                <AlertTriangle className="h-4 w-4 text-red-400" />
                                            )}
                                            <span className={`text-xs capitalize ${item.status === 'processing' ? 'text-blue-400' :
                                                    item.status === 'completed' ? 'text-green-400' :
                                                        'text-red-400'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        Duration: {item.duration}s
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Alerts & Incidents */}
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between text-white">
                            <div className="flex items-center">
                                <AlertTriangle className="h-5 w-5 mr-2" />
                                Alerts & Incidents
                            </div>
                            <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">
                                {totalActiveAlerts} Active
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {alerts.map((alert) => (
                                <div
                                    key={alert.id}
                                    className={`p-4 rounded-lg border ${getAlertColor(alert.type)} ${alert.resolved ? 'opacity-50' : ''
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                {alert.type === 'critical' && <AlertTriangle className="h-4 w-4" />}
                                                {alert.type === 'warning' && <AlertTriangle className="h-4 w-4" />}
                                                {alert.type === 'info' && <Eye className="h-4 w-4" />}
                                                <h4 className="text-sm font-medium text-white">{alert.title}</h4>
                                                <span className="text-xs text-gray-400 ml-2">{alert.category}</span>
                                            </div>
                                            <p className="text-sm text-gray-300 mb-2">{alert.message}</p>
                                            <div className="text-xs text-gray-500">
                                                {alert.timestamp}
                                            </div>
                                        </div>
                                        {alert.resolved && (
                                            <Eye className="h-4 w-4 text-green-400 flex-shrink-0" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* GPU Usage Chart */}
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="flex items-center text-white">
                            <Cpu className="h-5 w-5 mr-2" />
                            GPU Usage Trend
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-end space-x-2">
                            {[60, 65, 70, 68, 72, 75, 68, 71, 73, 68, 70, 68].map((usage, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center">
                                    <div
                                        className={`w-full bg-gradient-to-t ${usage > 80 ? 'from-red-500 to-red-400' :
                                                usage > 70 ? 'from-yellow-500 to-yellow-400' :
                                                    'from-blue-500 to-blue-400'
                                            } rounded-t`}
                                        style={{ height: `${(usage / 100) * 100}%` }}
                                    />
                                    <div className="text-xs text-gray-400 mt-2">{index + 1}h</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Request Volume */}
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="flex items-center text-white">
                            <BarChart3 className="h-5 w-5 mr-2" />
                            Request Volume
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { metric: 'API Requests', value: '1,234/min', trend: '+5.2%' },
                                { metric: 'Design Validations', value: '892/hour', trend: '+12.3%' },
                                { metric: '3D Renders', value: '456/hour', trend: '+8.1%' },
                                { metric: 'Cache Hit Rate', value: '94.7%', trend: '+2.1%' },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-medium text-white">{item.metric}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-white">{item.value}</div>
                                        <div className={`text-xs ${item.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                            {item.trend}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 cursor-pointer transition-colors">
                    <CardContent className="p-6 text-center">
                        <Brain className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                        <h3 className="font-medium text-white">Model Details</h3>
                        <p className="text-xs text-gray-400">AI model information</p>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 cursor-pointer transition-colors">
                    <CardContent className="p-6 text-center">
                        <Database className="h-8 w-8 mx-auto mb-2 text-green-400" />
                        <h3 className="font-medium text-white">Pipeline</h3>
                        <p className="text-xs text-gray-400">Data pipeline status</p>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 cursor-pointer transition-colors">
                    <CardContent className="p-6 text-center">
                        <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                        <h3 className="font-medium text-white">API Details</h3>
                        <p className="text-xs text-gray-400">Endpoint metrics</p>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 cursor-pointer transition-colors">
                    <CardContent className="p-6 text-center">
                        <DollarSign className="h-8 w-8 mx-auto mb-2 text-cyan-400" />
                        <h3 className="font-medium text-white">Cost Analysis</h3>
                        <p className="text-xs text-gray-400">Cost breakdown</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}