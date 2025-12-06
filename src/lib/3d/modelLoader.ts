import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export interface ModelMetadata {
    id: string;
    name: string;
    file: string;
    price: number;
    materials: string[];
    gems: string[];
    description: string;
    boundingBox?: THREE.Box3;
    geometryCount?: number;
    vertexCount?: number;
}

export class ModelLoader {
    private static instance: ModelLoader;
    private gltfLoader: GLTFLoader;
    private dracoLoader: DRACOLoader;
    private cache: Map<string, THREE.Group> = new Map();
    private metadataCache: Map<string, ModelMetadata> = new Map();
    private loadingPromises: Map<string, Promise<THREE.Group>> = new Map();

    private constructor() {
        this.gltfLoader = new GLTFLoader();
        this.dracoLoader = new DRACOLoader();

        // For production, you'd host DRACO decoder
        this.dracoLoader.setDecoderPath('/models/draco/');
        this.gltfLoader.setDRACOLoader(this.dracoLoader);

        // Load model metadata
        this.loadMetadata();
    }

    public static getInstance(): ModelLoader {
        if (!ModelLoader.instance) {
            ModelLoader.instance = new ModelLoader();
        }
        return ModelLoader.instance;
    }

    private async loadMetadata() {
        try {
            const response = await fetch('/models/jewelry/index.json');
            const data = await response.json();

            // Flatten all jewelry items into a single array
            const allModels = [
                ...data.rings,
                ...data.pendants,
                ...data.earrings,
                ...data.bracelets
            ];

            allModels.forEach(model => {
                this.metadataCache.set(model.id, model);
            });
        } catch (error) {
            console.error('Failed to load model metadata:', error);
        }
    }

    public getAvailableModels(): ModelMetadata[] {
        return Array.from(this.metadataCache.values());
    }

    public getModelMetadata(id: string): ModelMetadata | undefined {
        return this.metadataCache.get(id);
    }

    public async loadModel(modelId: string): Promise<THREE.Group> {
        // Return from cache if already loaded
        if (this.cache.has(modelId)) {
            return this.cache.get(modelId)!.clone();
        }

        // Return existing promise if currently loading
        if (this.loadingPromises.has(modelId)) {
            const model = await this.loadingPromises.get(modelId)!;
            return model.clone();
        }

        const metadata = this.metadataCache.get(modelId);
        if (!metadata) {
            throw new Error(`Model metadata not found for ID: ${modelId}`);
        }

        // Create loading promise
        const loadingPromise = new Promise<THREE.Group>((resolve, reject) => {
            const modelPath = `/models/jewelry/${metadata.file}`;

            this.gltfLoader.load(
                modelPath,
                (gltf) => {
                    const model = gltf.scene;

                    // Optimize model
                    this.optimizeModel(model);

                    // Calculate metadata
                    const boundingBox = new THREE.Box3().setFromObject(model);
                    const geometryCount = this.countGeometries(model);
                    const vertexCount = this.countVertices(model);

                    // Update metadata with calculated values
                    metadata.boundingBox = boundingBox;
                    metadata.geometryCount = geometryCount;
                    metadata.vertexCount = vertexCount;

                    // Center the model
                    this.centerModel(model);

                    // Store in cache
                    this.cache.set(modelId, model);

                    resolve(model.clone());
                },
                (progress) => {
                    // Handle loading progress
                    const percent = (progress.loaded / progress.total) * 100;
                    console.log(`Loading ${modelId}: ${percent.toFixed(2)}%`);
                },
                (error) => {
                    console.error(`Failed to load model ${modelId}:`, error);

                    // Create fallback geometry if model fails to load
                    const fallbackModel = this.createFallbackModel(metadata);
                    this.cache.set(modelId, fallbackModel);

                    resolve(fallbackModel.clone());
                }
            );
        });

        this.loadingPromises.set(modelId, loadingPromise);

        try {
            const model = await loadingPromise;
            this.loadingPromises.delete(modelId);
            return model;
        } catch (error) {
            this.loadingPromises.delete(modelId);
            throw error;
        }
    }

    private optimizeModel(model: THREE.Group): void {
        model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                // Enable shadows
                child.castShadow = true;
                child.receiveShadow = true;

                // Optimize materials
                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(mat => this.optimizeMaterial(mat));
                    } else {
                        this.optimizeMaterial(child.material);
                    }
                }

                // Optimize geometry
                if (child.geometry) {
                    child.geometry.computeVertexNormals();

                    // Merge vertices if possible
                    if (child.geometry instanceof THREE.BufferGeometry) {
                        child.geometry = child.geometry.toNonIndexed();
                    }
                }
            }
        });
    }

    private optimizeMaterial(material: THREE.Material): void {
        if (material instanceof THREE.MeshStandardMaterial) {
            // Enable roughness and metalness maps if available
            material.roughness = Math.min(material.roughness, 0.8);
            material.metalness = Math.max(material.metalness, 0.1);

            // Optimize for performance
            material.needsUpdate = true;
        }
    }

    private centerModel(model: THREE.Group): void {
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());

        model.position.sub(center);

        // Optional: Scale model to consistent size
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = 2; // Target size units

        if (maxDim > targetSize) {
            const scale = targetSize / maxDim;
            model.scale.setScalar(scale);
        }
    }

    private countGeometries(model: THREE.Object3D): number {
        let count = 0;
        model.traverse((child) => {
            if (child instanceof THREE.Mesh && child.geometry) {
                count++;
            }
        });
        return count;
    }

    private countVertices(model: THREE.Object3D): number {
        let count = 0;
        model.traverse((child) => {
            if (child instanceof THREE.Mesh && child.geometry) {
                const geometry = child.geometry;
                if (geometry instanceof THREE.BufferGeometry) {
                    const position = geometry.getAttribute('position');
                    if (position) {
                        count += position.count;
                    }
                }
            }
        });
        return count;
    }

    private createFallbackModel(metadata: ModelMetadata): THREE.Group {
        const group = new THREE.Group();

        // Create a simple placeholder geometry based on jewelry type
        let geometry: THREE.BufferGeometry;
        let scale = 1;

        if (metadata.id.includes('ring')) {
            geometry = new THREE.TorusGeometry(0.7, 0.3, 8, 16);
            scale = 0.5;
        } else if (metadata.id.includes('pendant')) {
            geometry = new THREE.SphereGeometry(0.5, 16, 16);
            scale = 0.4;
        } else if (metadata.id.includes('earring')) {
            geometry = new THREE.ConeGeometry(0.3, 0.6, 8);
            scale = 0.3;
        } else if (metadata.id.includes('bracelet')) {
            geometry = new THREE.TorusGeometry(1.0, 0.1, 8, 32);
            scale = 0.4;
        } else {
            geometry = new THREE.BoxGeometry(0.6, 0.6, 0.2);
            scale = 0.4;
        }

        const material = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 0.8,
            roughness: 0.2,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.setScalar(scale);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        group.add(mesh);

        // Update metadata
        const boundingBox = new THREE.Box3().setFromObject(group);
        metadata.boundingBox = boundingBox;
        metadata.geometryCount = 1;
        metadata.vertexCount = geometry.attributes.position.count;

        return group;
    }

    public preloadModels(modelIds: string[]): Promise<THREE.Group[]> {
        const promises = modelIds.map(id => this.loadModel(id));
        return Promise.all(promises);
    }

    public clearCache(): void {
        this.cache.forEach(model => {
            model.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.geometry.dispose();
                    if (Array.isArray(child.material)) {
                        child.material.forEach(mat => mat.dispose());
                    } else {
                        child.material.dispose();
                    }
                }
            });
        });

        this.cache.clear();
        this.metadataCache.clear();
    }

    public getCacheSize(): number {
        return this.cache.size;
    }

    public getMemoryUsage(): string {
        let totalVertices = 0;
        let totalGeometries = 0;

        this.cache.forEach(model => {
            model.traverse((child) => {
                if (child instanceof THREE.Mesh && child.geometry) {
                    totalGeometries++;
                    const geometry = child.geometry;
                    if (geometry instanceof THREE.BufferGeometry) {
                        const position = geometry.getAttribute('position');
                        if (position) {
                            totalVertices += position.count;
                        }
                    }
                }
            });
        });

        return `${totalGeometries} geometries, ${totalVertices.toLocaleString()} vertices`;
    }
}