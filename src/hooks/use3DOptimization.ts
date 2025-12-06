// import { useEffect, useRef, useState, useCallback } from 'react';
// import * as THREE from 'three';

// interface PerformanceMetrics {
//     fps: number;
//     memoryUsage: number;
//     drawCalls: number;
//     geometries: number;
//     textures: number;
// }

// interface OptimizationSettings {
//     pixelRatio: number;
//     shadowMapSize: number;
//     antialias: boolean;
//     maxLights: number;
//     lodLevels: number;
// }

// export const use3DOptimization = () => {
//     const [metrics, setMetrics] = useState<PerformanceMetrics>({
//         fps: 60,
//         memoryUsage: 0,
//         drawCalls: 0,
//         geometries: 0,
//         textures: 0,
//     });

//     const [settings, setSettings] = useState<OptimizationSettings>({
//         pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
//         shadowMapSize: 1024,
//         antialias: true,
//         maxLights: 4,
//         lodLevels: 3,
//     });

//     const [isOptimized, setIsOptimized] = useState(false);
//     const frameCountRef = useRef(0);
//     const lastTimeRef = useRef(performance.now());
//     const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

//     // Performance monitoring
//     const updateMetrics = useCallback(() => {
//         if (!rendererRef.current) return;

//         const info = rendererRef.current.info;
//         const currentTime = performance.now();
//         const deltaTime = currentTime - lastTimeRef.current;

//         if (deltaTime >= 1000) {
//             const fps = Math.round((frameCountRef.current * 1000) / deltaTime);

//             setMetrics({
//                 fps,
//                 memoryUsage: (performance as any).memory?.usedJSHeapSize / 1024 / 1024 || 0,
//                 drawCalls: info.render.calls,
//                 geometries: info.memory.geometries,
//                 textures: info.memory.textures,
//             });

//             frameCountRef.current = 0;
//             lastTimeRef.current = currentTime;
//         }

//         frameCountRef.current++;
//     }, []);

//     // Auto-optimization based on performance
//     const autoOptimize = useCallback(() => {
//         if (metrics.fps < 30 && !isOptimized) {
//             setSettings(prev => ({
//                 ...prev,
//                 pixelRatio: 1,
//                 shadowMapSize: 512,
//                 antialias: false,
//                 maxLights: 2,
//                 lodLevels: 2,
//             }));
//             setIsOptimized(true);
//             console.log('🔧 Applied performance optimizations');
//         } else if (metrics.fps > 50 && isOptimized) {
//             setSettings(prev => ({
//                 ...prev,
//                 pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
//                 shadowMapSize: 1024,
//                 antialias: true,
//                 maxLights: 4,
//                 lodLevels: 3,
//             }));
//             setIsOptimized(false);
//             console.log('✅ Restored high quality settings');
//         }
//     }, [metrics.fps, isOptimized]);

//     // Level of Detail (LOD) system
//     const createLOD = useCallback((geometry: THREE.BufferGeometry, levels: number = 3) => {
//         const lod = new THREE.LOD();

//         for (let i = 0; i < levels; i++) {
//             const distance = i * 10;
//             const complexity = 1 - (i / levels);

//             // Create simplified geometry for distant views
//             const simplifiedGeometry = geometry.clone();
//             if (i > 0) {
//                 // Simplify geometry (in a real implementation, you'd use a simplification library)
//                 const positions = simplifiedGeometry.attributes.position.array as Float32Array;
//                 const step = Math.floor(1 / complexity);

//                 // Simple decimation (not perfect but demonstrates the concept)
//                 const newPositions: number[] = [];
//                 for (let j = 0; j < positions.length; j += 3 * step) {
//                     newPositions.push(positions[j], positions[j + 1], positions[j + 2]);
//                 }

//                 simplifiedGeometry.setAttribute('position',
//                     new THREE.Float32BufferAttribute(newPositions, 3)
//                 );
//             }

//             const material = new THREE.MeshBasicMaterial({
//                 color: 0xffd700,
//                 wireframe: i > 1, // Wireframe for lowest detail
//             });

//             const mesh = new THREE.Mesh(simplifiedGeometry, material);
//             lod.addLevel(mesh, distance);
//         }

//         return lod;
//     }, []);

//     // Texture optimization
//     const optimizeTexture = useCallback((texture: THREE.Texture) => {
//         texture.generateMipmaps = true;
//         texture.minFilter = THREE.LinearMipmapLinearFilter;
//         texture.magFilter = THREE.LinearFilter;
//         texture.wrapS = THREE.RepeatWrapping;
//         texture.wrapT = THREE.RepeatWrapping;
//         texture.format = THREE.RGBFormat;
//         texture.type = THREE.UnsignedByteType;

//         // Compress texture if available
//         if (texture instanceof THREE.Texture) {
//             texture.encoding = THREE.sRGBEncoding;
//         }

//         return texture;
//     }, []);

//     // Material optimization
//     const optimizeMaterial = useCallback((material: THREE.Material) => {
//         if (material instanceof THREE.MeshStandardMaterial) {
//             // Reduce material complexity for performance
//             material.transparent = false;
//             material.alphaTest = 0.01;

//             // Use simpler properties when optimized
//             if (isOptimized) {
//                 material.metalness = Math.min(material.metalness, 0.8);
//                 material.roughness = Math.max(material.roughness, 0.2);
//                 material.envMapIntensity = 0.5;
//             }
//         }

//         return material;
//     }, [isOptimized]);

//     // Geometry optimization
//     const optimizeGeometry = useCallback((geometry: THREE.BufferGeometry) => {
//         geometry.computeVertexNormals();
//         geometry.computeBoundingBox();
//         geometry.computeBoundingSphere();

//         // Merge vertices if possible
//         if (geometry instanceof THREE.BufferGeometry) {
//             geometry = geometry.toNonIndexed();
//         }

//         // Remove unnecessary attributes
//         const attributes = geometry.attributes;
//         const requiredAttributes = ['position', 'normal', 'uv'];

//         Object.keys(attributes).forEach(key => {
//             if (!requiredAttributes.includes(key)) {
//                 geometry.deleteAttribute(key);
//             }
//         });

//         return geometry;
//     }, []);

//     // Light optimization
//     const optimizeLights = useCallback((lights: THREE.Light[]) => {
//         if (lights.length > settings.maxLights) {
//             // Reduce light intensity or disable excess lights
//             lights.slice(settings.maxLights).forEach(light => {
//                 if (light instanceof THREE.PointLight || light instanceof THREE.DirectionalLight) {
//                     light.intensity *= 0.5;
//                 }
//             });
//         }

//         return lights.slice(0, settings.maxLights);
//     }, [settings.maxLights]);

//     // Shadow optimization
//     const getShadowSettings = useCallback(() => ({
//         enabled: !isOptimized,
//         mapSize: settings.shadowMapSize,
//         camera: {
//             left: -10,
//             right: 10,
//             top: 10,
//             bottom: -10,
//             near: 0.1,
//             far: 50,
//         },
//     }), [isOptimized, settings.shadowMapSize]);

//     // Renderer configuration
//     const configureRenderer = useCallback((renderer: THREE.WebGLRenderer) => {
//         rendererRef.current = renderer;

//         renderer.setPixelRatio(settings.pixelRatio);
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         renderer.setClearColor(0x000000, 0);

//         // Shadow settings
//         renderer.shadowMap.enabled = !isOptimized;
//         renderer.shadowMap.type = isOptimized
//             ? THREE.BasicShadowMap
//             : THREE.PCFSoftShadowMap;

//         // Performance settings
//         renderer.powerPreference = 'high-performance';
//         renderer.antialias = settings.antialias;
//         renderer.alpha = false;

//         // Memory optimization
//         renderer.info.autoReset = false;
//         renderer.debug.checkShaderErrors = false;

//         return renderer;
//     }, [settings, isOptimized]);

//     // Monitor performance and auto-optimize
//     useEffect(() => {
//         const interval = setInterval(() => {
//             updateMetrics();
//             autoOptimize();
//         }, 100);

//         return () => clearInterval(interval);
//     }, [updateMetrics, autoOptimize]);

//     // Handle visibility change
//     useEffect(() => {
//         const handleVisibilityChange = () => {
//             if (document.hidden && rendererRef.current) {
//                 rendererRef.current.setAnimationLoop(null);
//             }
//         };

//         document.addEventListener('visibilitychange', handleVisibilityChange);
//         return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
//     }, []);

//     return {
//         metrics,
//         settings,
//         isOptimized,
//         configureRenderer,
//         createLOD,
//         optimizeTexture,
//         optimizeMaterial,
//         optimizeGeometry,
//         optimizeLights,
//         getShadowSettings,
//         updateMetrics,
//     };
// };

// export default use3DOptimization;

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

interface PerformanceMetrics {
    fps: number;
    memoryUsage: number;
    drawCalls: number;
    geometries: number;
    textures: number;
}

interface OptimizationSettings {
    pixelRatio: number;
    shadowMapSize: number;
    antialias: boolean;
    maxLights: number;
    lodLevels: number;
}

export const use3DOptimization = () => {
    const [metrics, setMetrics] = useState<PerformanceMetrics>({
        fps: 60,
        memoryUsage: 0,
        drawCalls: 0,
        geometries: 0,
        textures: 0,
    });

    // SSR-safe defaults
    const [settings, setSettings] = useState<OptimizationSettings>({
        pixelRatio: 1,
        shadowMapSize: 1024,
        antialias: true,
        maxLights: 4,
        lodLevels: 3,
    });

    const [isOptimized, setIsOptimized] = useState(false);

    const frameCountRef = useRef(0);
    const lastTimeRef = useRef(performance.now());
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

    // Set pixel ratio after mount (fixes window undefined)
    useEffect(() => {
        if (typeof window !== "undefined") {
            setSettings(prev => ({
                ...prev,
                pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
            }));
        }
    }, []);

    // Performance monitoring
    const updateMetrics = useCallback(() => {
        if (!rendererRef.current) return;

        const info = rendererRef.current.info;
        const currentTime = performance.now();
        const deltaTime = currentTime - lastTimeRef.current;

        if (deltaTime >= 1000) {
            const fps = Math.round((frameCountRef.current * 1000) / deltaTime);

            setMetrics({
                fps,
                memoryUsage: (performance as any)?.memory?.usedJSHeapSize / 1024 / 1024 || 0,
                drawCalls: info.render.calls,
                geometries: info.memory.geometries,
                textures: info.memory.textures,
            });

            frameCountRef.current = 0;
            lastTimeRef.current = currentTime;
        }

        frameCountRef.current++;
    }, []);

    // Auto optimization logic
    const autoOptimize = useCallback(() => {
        if (metrics.fps < 30 && !isOptimized) {
            setSettings(prev => ({
                ...prev,
                pixelRatio: 1,
                shadowMapSize: 512,
                antialias: false,
                maxLights: 2,
                lodLevels: 2,
            }));
            setIsOptimized(true);
        } else if (metrics.fps > 50 && isOptimized) {
            setSettings(prev => ({
                ...prev,
                pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
                shadowMapSize: 1024,
                antialias: true,
                maxLights: 4,
                lodLevels: 3,
            }));
            setIsOptimized(false);
        }
    }, [metrics.fps, isOptimized]);

    // LOD generator
    const createLOD = useCallback((geometry: THREE.BufferGeometry, levels: number = 3) => {
        const lod = new THREE.LOD();

        for (let i = 0; i < levels; i++) {
            const distance = i * 10;
            const simplifiedGeom = geometry.clone();

            if (i > 0) {
                const positions = simplifiedGeom.attributes.position.array as Float32Array;
                const step = i + 1;

                const newPositions: number[] = [];
                for (let j = 0; j < positions.length; j += 3 * step) {
                    newPositions.push(positions[j], positions[j + 1], positions[j + 2]);
                }

                simplifiedGeom.setAttribute("position", new THREE.Float32BufferAttribute(newPositions, 3));
            }

            const material = new THREE.MeshBasicMaterial({
                color: 0xffd700,
                wireframe: i > 1,
            });

            const mesh = new THREE.Mesh(simplifiedGeom, material);
            lod.addLevel(mesh, distance);
        }

        return lod;
    }, []);

    // Texture optimization (fixed API)
    const optimizeTexture = useCallback((texture: THREE.Texture) => {
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.encoding = THREE.sRGBEncoding;

        return texture;
    }, []);

    // Material optimization
    const optimizeMaterial = useCallback((material: THREE.Material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
            material.transparent = false;
            material.alphaTest = 0.01;

            if (isOptimized) {
                material.metalness = Math.min(material.metalness, 0.8);
                material.roughness = Math.max(material.roughness, 0.2);
                material.envMapIntensity = 0.5;
            }
        }

        return material;
    }, [isOptimized]);

    // Geometry optimization
    const optimizeGeometry = useCallback((geometry: THREE.BufferGeometry) => {
        geometry.computeVertexNormals();
        geometry.computeBoundingBox();
        geometry.computeBoundingSphere();

        const attributes = geometry.attributes;
        const required = ["position", "normal", "uv"];

        Object.keys(attributes).forEach(key => {
            if (!required.includes(key)) {
                geometry.deleteAttribute(key);
            }
        });

        return geometry;
    }, []);

    // Light optimization
    const optimizeLights = useCallback(
        (lights: THREE.Light[]) => {
            if (lights.length > settings.maxLights) {
                lights.slice(settings.maxLights).forEach(light => {
                    light.intensity *= 0.5;
                });
            }
            return lights.slice(0, settings.maxLights);
        },
        [settings.maxLights]
    );

    // Shadow settings
    const getShadowSettings = useCallback(
        () => ({
            enabled: !isOptimized,
            mapSize: settings.shadowMapSize,
            camera: {
                left: -10,
                right: 10,
                top: 10,
                bottom: -10,
                near: 0.1,
                far: 50,
            },
        }),
        [isOptimized, settings.shadowMapSize]
    );

    // Renderer configuration (correct)
    const configureRenderer = useCallback(
        (renderer: THREE.WebGLRenderer) => {
            rendererRef.current = renderer;

            renderer.setPixelRatio(settings.pixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0);

            renderer.shadowMap.enabled = !isOptimized;
            renderer.shadowMap.type = isOptimized
                ? THREE.BasicShadowMap
                : THREE.PCFSoftShadowMap;

            renderer.info.autoReset = false;

            return renderer;
        },
        [settings.pixelRatio, isOptimized]
    );

    // Auto performance loop
    useEffect(() => {
        const interval = setInterval(() => {
            updateMetrics();
            autoOptimize();
        }, 100);

        return () => clearInterval(interval);
    }, [updateMetrics, autoOptimize]);

    // Pause when tab not visible
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && rendererRef.current) {
                rendererRef.current.setAnimationLoop(null);
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    return {
        metrics,
        settings,
        isOptimized,
        configureRenderer,
        createLOD,
        optimizeTexture,
        optimizeMaterial,
        optimizeGeometry,
        optimizeLights,
        getShadowSettings,
        updateMetrics,
    };
};

export default use3DOptimization;
