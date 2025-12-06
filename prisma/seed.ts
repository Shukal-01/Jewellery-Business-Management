import { PrismaClient, Category, Material, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // Create sample users
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@jewelry.com' },
        update: {},
        create: {
            email: 'admin@jewelry.com',
            name: 'System Admin',
            role: UserRole.admin,
        },
    });

    const customerUser = await prisma.user.upsert({
        where: { email: 'customer@example.com' },
        update: {},
        create: {
            email: 'customer@example.com',
            name: 'John Doe',
            role: UserRole.customer,
        },
    });

    const vendorUser = await prisma.user.upsert({
        where: { email: 'vendor@workshop.com' },
        update: {},
        create: {
            email: 'vendor@workshop.com',
            name: 'Master Jeweler',
            role: UserRole.vendor,
        },
    });

    // Create vendor profile
    const vendor = await prisma.vendor.upsert({
        where: { userId: vendorUser.id },
        update: {},
        create: {
            userId: vendorUser.id,
            businessName: 'Luxury Jewelry Workshop',
            location: {
                city: 'New York',
                country: 'USA',
                coordinates: { lat: 40.7128, lng: -74.0060 }
            },
            specialties: ['rings', 'pendants', 'bracelets'],
            capacity: 15,
            rating: 4.8,
            isVerified: true,
            description: 'Expert craftsmen specializing in custom jewelry design and manufacturing.',
        },
    });

    // Create design templates
    const classicRing = await prisma.designTemplate.upsert({
        where: { id: 'classic-ring' },
        update: {},
        create: {
            id: 'classic-ring',
            name: 'Classic Solitaire Ring',
            description: 'A timeless solitaire ring design perfect for engagement or special occasions.',
            category: Category.ring,
            baseModelUrl: '/models/classic-ring.glb',
            previewImageUrl: '/images/classic-ring-preview.jpg',
            basePrice: 299.99,
            availableMaterials: [
                Material.gold_yellow,
                Material.gold_white,
                Material.platinum,
                Material.silver
            ],
            sizeRange: {
                min: 4,
                max: 12,
                step: 0.5
            },
            customizations: {
                gemstone: ['diamond', 'sapphire', 'emerald', 'ruby'],
                setting: ['prong', 'bezel', 'channel'],
                finish: ['polished', 'matte', 'brushed']
            },
            complexity: 1.2,
        },
    });

    const modernBracelet = await prisma.designTemplate.upsert({
        where: { id: 'modern-bracelet' },
        update: {},
        create: {
            id: 'modern-bracelet',
            name: 'Modern Link Bracelet',
            description: 'Contemporary link bracelet with customizable engraving options.',
            category: Category.bracelet,
            baseModelUrl: '/models/modern-bracelet.glb',
            previewImageUrl: '/images/modern-bracelet-preview.jpg',
            basePrice: 199.99,
            availableMaterials: [
                Material.gold_yellow,
                Material.gold_rose,
                Material.steel_stainless
            ],
            sizeRange: {
                min: 6,
                max: 9,
                step: 0.5
            },
            customizations: {
                links: ['3', '5', '7', '9'],
                engraving: true,
                clasp: ['toggle', 'lobster', 'magnetic']
            },
            complexity: 1.5,
        },
    });

    const diamondPendant = await prisma.designTemplate.upsert({
        where: { id: 'diamond-pendant' },
        update: {},
        create: {
            id: 'diamond-pendant',
            name: 'Diamond Teardrop Pendant',
            description: 'Elegant teardrop-shaped pendant with brilliant cut diamonds.',
            category: Category.pendant,
            baseModelUrl: '/models/diamond-pendant.glb',
            previewImageUrl: '/images/diamond-pendant-preview.jpg',
            basePrice: 399.99,
            availableMaterials: [
                Material.gold_white,
                Material.gold_yellow,
                Material.platinum
            ],
            customizations: {
                diamondSize: ['0.5ct', '1.0ct', '1.5ct', '2.0ct'],
                chainLength: ['16"', '18"', '20"', '24"'],
                setting: ['pave', 'channel', 'bezel']
            },
            complexity: 2.0,
        },
    });

    // Create sample designs
    await prisma.design.upsert({
        where: { id: 'sample-design-1' },
        update: {},
        create: {
            id: 'sample-design-1',
            userId: customerUser.id,
            templateId: classicRing.id,
            name: 'My Custom Engagement Ring',
            description: 'Classic solitaire with sapphire center stone and white gold band.',
            customizations: {
                material: Material.gold_white,
                size: '7.5',
                gemstone: 'sapphire',
                setting: 'prong',
                finish: 'polished',
                engraving: 'Forever & Always'
            },
            status: 'draft',
            version: 3,
        },
    });

    // Create sample orders
    const sampleOrder = await prisma.order.upsert({
        where: { orderNumber: 'ORD-2024-001' },
        update: {},
        create: {
            orderNumber: 'ORD-2024-001',
            userId: customerUser.id,
            vendorId: vendor.id,
            totalAmount: 499.99,
            currency: 'USD',
            status: 'accepted',
            priority: 'normal',
            shippingAddress: {
                name: 'John Doe',
                street: '123 Main Street',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'USA',
                phone: '+1-555-0123'
            },
            estimatedDelivery: new Date('2024-02-14'),
            notes: 'Please include gift wrapping.',
            paymentStatus: 'paid',
            paymentMethod: 'credit_card',
        },
    });

    // Create order items
    await prisma.orderItem.upsert({
        where: { id: 'order-item-1' },
        update: {},
        create: {
            id: 'order-item-1',
            orderId: sampleOrder.id,
            designId: 'sample-design-1',
            templateId: classicRing.id,
            material: Material.gold_white,
            size: '7.5',
            unitPrice: 499.99,
            quantity: 1,
            customizations: {
                gemstone: 'sapphire',
                setting: 'prong',
                finish: 'polished',
                engraving: 'Forever & Always'
            },
            productionTime: 48,
            weight: 6.5,
            dimensions: {
                width: 2.5,
                height: 8.0,
                depth: 2.0
            }
        },
    });

    // Create sample reviews
    await prisma.review.upsert({
        where: { orderId: sampleOrder.id },
        update: {},
        create: {
            orderId: sampleOrder.id,
            userId: customerUser.id,
            rating: 5,
            title: 'Absolutely Perfect!',
            content: 'The ring is more beautiful than I ever imagined. The craftsmanship is exceptional and the customer service was outstanding. Highly recommend!',
            images: [
                '/images/reviews/ring-photo-1.jpg',
                '/images/reviews/ring-photo-2.jpg'
            ],
            isVerified: true,
            helpful: 12,
        },
    });

    // Create app settings
    await prisma.appSettings.upsert({
        where: { key: 'pricing-multipliers' },
        update: {},
        create: {
            key: 'pricing-multipliers',
            category: 'pricing',
            description: 'Material price multipliers for cost calculation',
            value: {
                materials: {
                    gold_yellow: 1.0,
                    gold_white: 1.1,
                    gold_rose: 1.05,
                    platinum: 1.5,
                    silver: 0.6,
                    brass: 0.4,
                    copper: 0.45,
                    steel_stainless: 0.35
                },
                sizeMultipliers: {
                    '4': 0.8,
                    '5': 0.85,
                    '6': 0.9,
                    '7': 0.95,
                    '8': 1.0,
                    '9': 1.1,
                    '10': 1.2,
                    '11': 1.3,
                    '12': 1.4
                }
            },
            isPublic: false,
        },
    });

    await prisma.appSettings.upsert({
        where: { key: 'shipping-rates' },
        update: {},
        create: {
            key: 'shipping-rates',
            category: 'shipping',
            description: 'Shipping rates by region and speed',
            value: {
                standard: {
                    'US': 15.99,
                    'EU': 25.99,
                    'ASIA': 35.99
                },
                express: {
                    'US': 35.99,
                    'EU': 55.99,
                    'ASIA': 75.99
                },
                overnight: {
                    'US': 65.99,
                    'EU': 95.99,
                    'ASIA': 125.99
                }
            },
            isPublic: true,
        },
    });

    await prisma.appSettings.upsert({
        where: { key: 'production-times' },
        update: {},
        create: {
            key: 'production-times',
            category: 'general',
            description: 'Production time estimates in hours',
            value: {
                ring: 48,
                pendant: 36,
                bracelet: 72,
                necklace: 60,
                earrings: 24,
                brooch: 18,
                cufflinks: 12,
                custom: 120
            },
            isPublic: true,
        },
    });

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });