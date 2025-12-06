'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Loader } from '@react-three/drei';
import * as THREE from 'three';
import { ModelLoader, ModelMetadata } from '@/lib/3d/modelLoader';
import { use3DOptimization } from '@/hooks/use3DOptimization';
import PerformanceMonitor from './PerformanceMonitor';

interface Material {
    name: string;
    color: string;
    metalness: number;
    roughness: number;
    transparency: number;
    priceMultiplier: number;
}

interface JewelryViewerProps {
    modelId?: string;
    modelUrl?: string;
    materials?: Material[];
    selectedMaterial?: Material;
    onMaterialChange?: (material: Material) => void;
    autoRotate?: boolean;
    showEnvironment?: boolean;
    lighting?: 'studio' | 'outdoor' | 'showcase';
    className?: string;
}

function Model({ modelId, modelUrl, material }: { modelId?: string; modelUrl?: string; material: Material }) {
    const meshRef = useRef<THREE.Group>(null);
    const [model, setModel] = useState<THREE.Group | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadModel = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const modelLoader = ModelLoader.getInstance();

                let loadedModel: THREE.Group;

                if (modelId) {
                    // Load by ID using ModelLoader
                    loadedModel = await modelLoader.loadModel(modelId);
                } else if (modelUrl) {
                    // Load by URL (fallback for compatibility)
                    loadedModel = await createFallbackModel();
                } else {
                    throw new Error('No modelId or modelUrl provided');
                }

                setModel(loadedModel);
            } catch (err) {
                console.error('Error loading model:', err);
                setError('Failed to load model');
                // Create fallback model
                const fallbackModel = await createFallbackModel();
                setModel(fallbackModel);
            } finally {
                setIsLoading(false);
            }
        };

        loadModel();
    }, [modelId, modelUrl]);

    const createFallbackModel = async (): Promise<THREE.Group> => {
        const group = new THREE.Group();
        const geometry = new THREE.TorusGeometry(0.7, 0.3, 8, 16);
        const meshMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color(material.color),
            metalness: material.metalness,
            roughness: material.roughness,
        });

        const mesh = new THREE.Mesh(geometry, meshMaterial);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        group.add(mesh);

        return group;
    };

    useEffect(() => {
        if (model) {
            // Apply material properties
            model.traverse((child: any) => {
                if (child.isMesh && child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach((mat: { color: { setHex: (arg0: number) => void; }; metalness: number; roughness: number; transparent: boolean; opacity: number; needsUpdate: boolean; }) => {
                            if (mat.color) {
                                mat.color.setHex(parseInt(material.color.replace('#', '0x')));
                            }
                            mat.metalness = material.metalness;
                            mat.roughness = material.roughness;
                            mat.transparent = material.transparency > 0;
                            mat.opacity = 1 - material.transparency;
                            mat.needsUpdate = true;
                        });
                    } else {
                        if (child.material.color) {
                            child.material.color.setHex(parseInt(material.color.replace('#', '0x')));
                        }
                        child.material.metalness = material.metalness;
                        child.material.roughness = material.roughness;
                        child.material.transparent = material.transparency > 0;
                        child.material.opacity = 1 - material.transparency;
                        child.material.needsUpdate = true;
                    }
                }
            });
        }
    }, [model, material]);

    useFrame((state, delta) => {
        if (meshRef.current && !isLoading) {
            // Gentle floating animation
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    if (isLoading) {
        return (
            <mesh>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="#888" wireframe />
            </mesh>
        );
    }

    if (error && !model) {
        return (
            <mesh>
                <boxGeometry args={[0.6, 0.6, 0.2]} />
                <meshStandardMaterial color="#ff4444" />
            </mesh>
        );
    }

    return model ? <primitive ref={meshRef} object={model.clone()} /> : null;
}

const defaultMaterials: Material[] = [
    { name: 'Yellow Gold', color: '#FFD700', metalness: 1.0, roughness: 0.3, transparency: 0, priceMultiplier: 1.0 },
    { name: 'White Gold', color: '#E5E4E2', metalness: 1.0, roughness: 0.2, transparency: 0, priceMultiplier: 1.1 },
    { name: 'Rose Gold', color: '#E0BFB8', metalness: 1.0, roughness: 0.3, transparency: 0, priceMultiplier: 1.05 },
    { name: 'Platinum', color: '#F5F5F5', metalness: 1.0, roughness: 0.15, transparency: 0, priceMultiplier: 1.5 },
    { name: 'Silver', color: '#C0C0C0', metalness: 0.9, roughness: 0.4, transparency: 0, priceMultiplier: 0.6 },
];

export default function JewelryViewer({
    modelId,
    modelUrl,
    materials = defaultMaterials,
    selectedMaterial = materials[0],
    onMaterialChange,
    autoRotate = true,
    showEnvironment = true,
    lighting = 'studio',
    className = '',
}: JewelryViewerProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);

    const {
        configureRenderer,
        optimizeMaterial,
        optimizeGeometry,
        getShadowSettings,
        updateMetrics,
    } = use3DOptimization();

    // const getEnvironmentFile = () => {
    //     switch (lighting) {
    //         case 'studio':
    //             return '/environments/studio.hdr';
    //         case 'outdoor':
    //             return '/environments/outdoor.hdr';
    //         case 'showcase':
    //             return '/environments/showcase.hdr';
    //         default:
    //             return '/environments/studio.hdr';
    //     }
    // };

    const handleModelLoad = (gl: any) => {
        const renderer = gl.gl;
        configureRenderer(renderer);
        setIsLoading(false);
        setError(null);
    };

    const handleModelError = (err: any) => {
        setIsLoading(false);
        setError('Failed to load 3D model. Please try again.');
        console.error('3D Model Error:', err);
    };

    useEffect(() => {
        const interval = setInterval(updateMetrics, 100);
        return () => clearInterval(interval);
    }, [updateMetrics]);

    return (
        <div className={`relative w-full h-full ${className}`}>
            <div className="viewer-container">
                <Canvas
                    shadows
                    camera={{ position: [0, 0, 5], fov: 45 }}
                    className="w-full h-full"
                    onCreated={handleModelLoad}
                    onError={handleModelError}
                    performance={{ min: 0.5 }}
                    gl={{
                        alpha: false,
                        antialias: true,
                        powerPreference: 'high-performance',
                    }}
                >
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />

                    {/* Lighting */}
                    <ambientLight intensity={0.4} />
                    <directionalLight
                        position={[10, 10, 5]}
                        intensity={1}
                        castShadow
                        shadow-mapSize={[1024, 1024]}
                    />
                    <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />

                    {/* Environment for reflections */}
                    {/* {showEnvironment && (
                        <Environment
                            files={getEnvironmentFile()}
                            background={false}
                            environmentIntensity={0.8}
                        />
                    )} */}

                    {/* 3D Model */}
                    <Suspense
                        fallback={
                            <mesh>
                                <sphereGeometry args={[0.5, 32, 32]} />
                                <meshStandardMaterial color="#888" wireframe />
                            </mesh>
                        }
                    >
                        <Model modelId={modelId} modelUrl={modelUrl} material={selectedMaterial} />
                    </Suspense>

                    {/* Controls */}
                    <OrbitControls
                        enablePan={false}
                        enableZoom={true}
                        enableRotate={true}
                        autoRotate={autoRotate}
                        autoRotateSpeed={2}
                        minDistance={2}
                        maxDistance={10}
                        maxPolarAngle={Math.PI / 1.5}
                        minPolarAngle={Math.PI / 4}
                    />

                    {/* Ground plane for shadows */}
                    <mesh receiveShadow position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[10, 10]} />
                        <shadowMaterial transparent opacity={0.3} />
                    </mesh>
                </Canvas>

                {/* Loading State */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="text-center">
                            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                            <p className="text-white font-medium">Loading 3D Model...</p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="text-center text-white p-4">
                            <p className="font-medium mb-2">⚠️ {error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                )}

                {/* Material Selector */}
                {materials.length > 1 && onMaterialChange && (
                    <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                            <div className="flex space-x-2">
                                {materials.map((material) => (
                                    <button
                                        key={material.name}
                                        onClick={() => onMaterialChange(material)}
                                        className={`material-chip px-3 py-2 text-xs font-medium rounded-full border-2 transition-all ${selectedMaterial.name === material.name
                                                ? 'border-yellow-500 bg-yellow-500 text-black'
                                                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                            }`}
                                        style={{
                                            borderColor: selectedMaterial.name === material.name ? material.color : undefined,
                                            backgroundColor: selectedMaterial.name === material.name ? material.color : undefined,
                                        }}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <div
                                                className="w-3 h-3 rounded-full border border-gray-400"
                                                style={{ backgroundColor: material.color }}
                                            />
                                            <span>{material.name}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Controls Hint */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs text-gray-600">
                    <p>🖱️ Drag to rotate</p>
                    <p>🔍 Scroll to zoom</p>
                    <button
                        onClick={() => setShowPerformanceMonitor(!showPerformanceMonitor)}
                        className="mt-1 block w-full text-left hover:text-blue-600"
                    >
                        ⚡ Performance
                    </button>
                </div>

                {/* Performance Monitor */}
                {showPerformanceMonitor && (
                    <PerformanceMonitor
                        showToggle={true}
                        defaultVisible={true}
                        position="top-left"
                    />
                )}
            </div>

            <Loader />
        </div>
    );
}