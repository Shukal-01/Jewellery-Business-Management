'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Shield, Truck, RefreshCw } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface CartItem {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    quantity: number;
    image?: string;
    material: string;
    size?: string;
    gemstone: string;
    setting: string;
    finish: string;
    engraving?: string;
    customizationSummary: string;
}

export default function CartPage() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [promoCode, setPromoCode] = useState('');
    const [promoDiscount, setPromoDiscount] = useState(0);
    const [isApplyingPromo, setIsApplyingPromo] = useState(false);

    useEffect(() => {
        loadCartItems();
    }, []);

    const loadCartItems = async () => {
        setIsLoading(true);
        try {
            // Simulate API call - in production, this would fetch from backend
            await new Promise(resolve => setTimeout(resolve, 500));

            const mockCartItems: CartItem[] = [
                {
                    id: 'item-1',
                    name: 'Custom Solitaire Engagement Ring',
                    price: 2999.99,
                    originalPrice: 3299.99,
                    quantity: 1,
                    material: 'White Gold',
                    size: '7.5',
                    gemstone: 'Diamond',
                    setting: 'Prong',
                    finish: 'Polished',
                    engraving: 'Forever & Always',
                    customizationSummary: 'White Gold, Diamond, Prong Setting, Polished Finish, Engraved',
                },
                {
                    id: 'item-2',
                    name: 'Diamond Teardrop Pendant',
                    price: 899.99,
                    originalPrice: 999.99,
                    quantity: 1,
                    material: 'Yellow Gold',
                    gemstone: 'Diamond',
                    setting: 'Bezel',
                    finish: 'Polished',
                    customizationSummary: 'Yellow Gold, Diamond, Bezel Setting, Polished Finish',
                },
            ];

            setCartItems(mockCartItems);
        } catch (error) {
            console.error('Failed to load cart items:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeItem(id);
        } else {
            setCartItems(items =>
                items.map(item =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    const removeItem = (id: string) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    const calculateShipping = () => {
        const subtotal = calculateSubtotal();
        return subtotal >= 500 ? 0 : 19.99; // Free shipping over $500
    };

    const calculateTax = () => {
        return calculateSubtotal() * 0.08; // 8% tax
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateShipping() + calculateTax() - promoDiscount;
    };

    const applyPromoCode = async () => {
        if (!promoCode.trim()) return;

        setIsApplyingPromo(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock promo codes
            const promoCodes: Record<string, { discount: number; type: 'percentage' | 'fixed' }> = {
                'SAVE10': { discount: 10, type: 'percentage' },
                'WELCOME100': { discount: 100, type: 'fixed' },
                'FREESHIP': { discount: 19.99, type: 'fixed' },
            };

            const promo = promoCodes[promoCode.toUpperCase()];
            if (promo) {
                let discount = promo.discount;
                if (promo.type === 'percentage') {
                    discount = calculateSubtotal() * (promo.discount / 100);
                }
                setPromoDiscount(discount);
                alert(`Promo code applied! You saved ${formatPrice(discount)}`);
            } else {
                alert('Invalid promo code');
            }
        } catch (error) {
            alert('Failed to apply promo code');
        } finally {
            setIsApplyingPromo(false);
        }
    };

    const proceedToCheckout = () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty');
            return;
        }
        router.push('/customer/checkout');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your cart...</p>
                </div>
            </div>
        );
    }

    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    const tax = calculateTax();
    const total = calculateTotal();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-serif font-bold">Shopping Cart</h1>
                            <p className="text-gray-600 mt-1">
                                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                            </p>
                        </div>
                        <Link href="/customer/templates">
                            <Button variant="outline">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {cartItems.length === 0 ? (
                    // Empty Cart
                    <div className="text-center py-16">
                        <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                        <p className="text-gray-600 mb-8">Start designing your perfect piece!</p>
                        <div className="space-x-4">
                            <Link href="/customer/builder">
                                <Button className="btn-gold">Start Designing</Button>
                            </Link>
                            <Link href="/customer/templates">
                                <Button variant="outline">Browse Templates</Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    // Cart with Items
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <Card key={item.id} className="overflow-hidden">
                                    <CardContent className="p-6">
                                        <div className="flex space-x-4">
                                            {/* Product Image */}
                                            <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <span className="text-3xl">💍</span>
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 space-y-3">
                                                <div>
                                                    <h3 className="font-semibold text-lg text-gray-900">
                                                        {item.name}
                                                    </h3>
                                                    {item.originalPrice > item.price && (
                                                        <div className="flex items-center space-x-2 mt-1">
                                                            <span className="text-sm text-green-600 font-medium">
                                                                {formatPrice(item.price)}
                                                            </span>
                                                            <span className="text-sm text-gray-400 line-through">
                                                                {formatPrice(item.originalPrice)}
                                                            </span>
                                                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                                                Save {formatPrice(item.originalPrice - item.price)}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Customization Summary */}
                                                <div className="bg-gray-50 rounded-lg p-3">
                                                    <div className="text-sm text-gray-600 space-y-1">
                                                        <div>{item.customizationSummary}</div>
                                                        {item.engraving && (
                                                            <div className="text-xs text-yellow-600">
                                                                Engraved: "{item.engraving}"
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Quantity and Actions */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <span className="w-8 text-center font-medium">
                                                            {item.quantity}
                                                        </span>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                    </div>

                                                    <div className="flex items-center space-x-4">
                                                        <div className="text-right">
                                                            <div className="font-semibold text-lg">
                                                                {formatPrice(item.price * item.quantity)}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                {formatPrice(item.price)} each
                                                            </div>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeItem(item.id)}
                                                            className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 h-auto"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-4">
                            {/* Promo Code */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Promo Code</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex space-x-2">
                                        <Input
                                            placeholder="Enter promo code"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            className="flex-1"
                                        />
                                        <Button
                                            onClick={applyPromoCode}
                                            disabled={isApplyingPromo || !promoCode.trim()}
                                            variant="outline"
                                        >
                                            {isApplyingPromo ? 'Applying...' : 'Apply'}
                                        </Button>
                                    </div>

                                    {promoDiscount > 0 && (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                            <div className="text-sm text-green-800">
                                                <strong>✅ Promo applied!</strong> You saved {formatPrice(promoDiscount)}
                                            </div>
                                        </div>
                                    )}

                                    <div className="text-xs text-gray-500 space-y-1">
                                        <div>• SAVE10 - 10% off your order</div>
                                        <div>• WELCOME100 - $100 off</div>
                                        <div>• FREESHIP - Free shipping</div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Order Summary */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span className="font-medium">{formatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Shipping</span>
                                            <span className="font-medium">
                                                {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tax</span>
                                            <span className="font-medium">{formatPrice(tax)}</span>
                                        </div>
                                        {promoDiscount > 0 && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Promo Discount</span>
                                                <span className="font-medium">-{formatPrice(promoDiscount)}</span>
                                            </div>
                                        )}
                                        <div className="pt-3 border-t border-gray-200">
                                            <div className="flex justify-between text-lg font-bold">
                                                <span>Total</span>
                                                <span className="text-gradient-gold">{formatPrice(total)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Benefits */}
                                    <div className="space-y-2 pt-4 border-t border-gray-200">
                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <Shield className="h-4 w-4 text-green-500" />
                                            <span>Secure payment</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <Truck className="h-4 w-4 text-blue-500" />
                                            <span>{shipping === 0 ? 'Free shipping' : 'Fast delivery'}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <RefreshCw className="h-4 w-4 text-purple-500" />
                                            <span>30-day returns</span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={proceedToCheckout}
                                        className="w-full btn-gold text-lg py-3"
                                    >
                                        Proceed to Checkout
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>

                                    <div className="text-xs text-center text-gray-500">
                                        <Link href="/customer/templates" className="text-yellow-600 hover:text-yellow-700">
                                            Continue Shopping
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}