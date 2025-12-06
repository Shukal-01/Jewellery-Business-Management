'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    material: string;
    size?: string;
}

interface CartDropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
    // This would typically come from a cart state management system
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Cart Panel */}
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                        <ShoppingBag className="h-5 w-5 text-gray-700" />
                        <h2 className="text-lg font-semibold">
                            Shopping Cart ({totalItems})
                        </h2>
                    </div>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-12">
                            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                            <p className="text-gray-600 mb-4">Start designing your perfect piece!</p>
                            <Button onClick={onClose} className="btn-gold">
                                Start Designing
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <Card key={item.id} className="overflow-hidden">
                                    <CardContent className="p-4">
                                        <div className="flex space-x-4">
                                            {/* Product Image */}
                                            <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <span className="text-2xl">💎</span>
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 space-y-2">
                                                <h4 className="font-medium text-gray-900 line-clamp-1">
                                                    {item.name}
                                                </h4>
                                                <div className="text-sm text-gray-600 space-y-1">
                                                    <p>Material: {item.material}</p>
                                                    {item.size && <p>Size: {item.size}</p>}
                                                </div>

                                                {/* Quantity and Price */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
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
                                                    <div className="text-right">
                                                        <div className="font-semibold text-gray-900">
                                                            {formatPrice(item.price * item.quantity)}
                                                        </div>
                                                        <div className="text-xs text-gray-600">
                                                            {formatPrice(item.price)} each
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Remove Button */}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 p-0 h-auto text-sm"
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="border-t border-gray-200 p-4 space-y-4">
                        {/* Subtotal */}
                        <div className="flex justify-between items-center text-lg">
                            <span className="font-medium">Subtotal:</span>
                            <span className="font-bold text-gray-900">
                                {formatPrice(totalAmount)}
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2">
                            <Link href="/customer/cart" onClick={onClose}>
                                <Button className="w-full btn-gold">
                                    View Cart & Checkout
                                </Button>
                            </Link>
                            <Button variant="outline" className="w-full" onClick={onClose}>
                                Continue Shopping
                            </Button>
                        </div>

                        {/* Shipping Info */}
                        <p className="text-xs text-gray-600 text-center">
                            Free shipping on orders over $500
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}