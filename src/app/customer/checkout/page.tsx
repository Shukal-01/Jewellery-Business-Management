'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, Shield, CreditCard, CheckCircle, AlertCircle, Truck, Gift } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface Address {
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    email: string;
}

interface PaymentMethod {
    type: 'card' | 'paypal' | 'apple';
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    cardholderName?: string;
}

export default function CheckoutPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentStep, setCurrentStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    // Form states
    const [shippingAddress, setShippingAddress] = useState<Address>({
        firstName: '',
        lastName: '',
        company: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US',
        phone: '',
        email: '',
    });

    const [billingAddress, setBillingAddress] = useState<Address>({
        ...shippingAddress,
    });

    const [useShippingForBilling, setUseShippingForBilling] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
        type: 'card',
    });

    const [orderSummary] = useState({
        subtotal: 3899.98,
        shipping: 0,
        tax: 311.99,
        discount: 100,
        total: 4111.97,
    });

    const steps = [
        { id: 1, title: 'Contact Information', description: 'Your contact details' },
        { id: 2, title: 'Shipping Address', description: 'Where to send your order' },
        { id: 3, title: 'Payment Method', description: 'Secure payment details' },
        { id: 4, title: 'Review & Confirm', description: 'Review your order' },
    ];

    useEffect(() => {
        // Pre-fill contact info from user session if available
        const prefillData = async () => {
            // In production, fetch user data from session
            setShippingAddress(prev => ({
                ...prev,
                email: 'customer@example.com',
            }));
        };

        prefillData();
    }, []);

    const handleStepSubmit = async () => {
        // Validate current step
        if (currentStep === 1) {
            if (!shippingAddress.email || !shippingAddress.phone) {
                alert('Please fill in contact information');
                return;
            }
        } else if (currentStep === 2) {
            if (!shippingAddress.address1 || !shippingAddress.city || !shippingAddress.zipCode) {
                alert('Please fill in shipping address');
                return;
            }
        } else if (currentStep === 3) {
            if (paymentMethod.type === 'card' && (!paymentMethod.cardNumber || !paymentMethod.cvv)) {
                alert('Please complete payment information');
                return;
            }
        }

        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePlaceOrder = async () => {
        setIsProcessing(true);
        try {
            // Simulate order processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success state
            setOrderComplete(true);
        } catch (error) {
            alert('Failed to place order. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleBillingAddressChange = () => {
        if (useShippingForBilling) {
            setBillingAddress(shippingAddress);
        }
    };

    useEffect(() => {
        handleBillingAddressChange();
    }, [shippingAddress, useShippingForBilling]);

    if (orderComplete) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-md w-full mx-4">
                    <Card className="text-center">
                        <CardContent className="p-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
                            <p className="text-gray-600 mb-6">
                                Thank you for your order. We'll send you a confirmation email shortly.
                            </p>
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <div>Order Number: #ORD-2024-{Math.random().toString(36).substring(7).toUpperCase()}</div>
                                        <div>Estimated Delivery: 2-3 weeks</div>
                                        <div>Payment Method: {paymentMethod.type === 'card' ? 'Credit Card' : paymentMethod.type}</div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Link href="/customer/profile">
                                        <Button className="w-full">View Order History</Button>
                                    </Link>
                                    <Link href="/customer">
                                        <Button variant="outline" className="w-full">Continue Shopping</Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/customer/cart">
                                <Button variant="ghost" size="sm">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Cart
                                </Button>
                            </Link>
                            <h1 className="text-2xl font-serif font-bold">Checkout</h1>
                        </div>
                        <div className="text-sm text-gray-600">
                            Step {currentStep} of {steps.length}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Progress Steps */}
                    <div className="lg:col-span-2">
                        {/* Step Progress */}
                        <div className="flex items-center justify-between mb-8">
                            {steps.map((step, index) => (
                                <div key={step.id} className="flex items-center">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${step.id === currentStep
                                                ? 'bg-yellow-500 text-white'
                                                : step.id < currentStep
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-gray-200 text-gray-600'
                                            }`}
                                    >
                                        {step.id < currentStep ? '✓' : step.id}
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div
                                            className={`w-full h-1 mx-4 ${step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Current Step Content */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    {steps[currentStep - 1].title}
                                    {currentStep === 3 && <Shield className="h-5 w-5 ml-2 text-green-500" />}
                                </CardTitle>
                                <p className="text-gray-600">{steps[currentStep - 1].description}</p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Step 1: Contact Information */}
                                {currentStep === 1 && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email Address *
                                                </label>
                                                <Input
                                                    type="email"
                                                    value={shippingAddress.email}
                                                    onChange={(e) => setShippingAddress(prev => ({ ...prev, email: e.target.value }))}
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Phone Number *
                                                </label>
                                                <Input
                                                    type="tel"
                                                    value={shippingAddress.phone}
                                                    onChange={(e) => setShippingAddress(prev => ({ ...prev, phone: e.target.value }))}
                                                    placeholder="(555) 123-4567"
                                                />
                                            </div>
                                        </div>
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <div className="text-sm text-blue-800">
                                                <strong>Why we need this:</strong> We'll use your email to send order updates and your phone for delivery notifications.
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Shipping Address */}
                                {currentStep === 2 && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    First Name *
                                                </label>
                                                <Input
                                                    value={shippingAddress.firstName}
                                                    onChange={(e) => setShippingAddress(prev => ({ ...prev, firstName: e.target.value }))}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Last Name *
                                                </label>
                                                <Input
                                                    value={shippingAddress.lastName}
                                                    onChange={(e) => setShippingAddress(prev => ({ ...prev, lastName: e.target.value }))}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Company (Optional)
                                            </label>
                                            <Input
                                                value={shippingAddress.company}
                                                onChange={(e) => setShippingAddress(prev => ({ ...prev, company: e.target.value }))}
                                                placeholder="Company name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Street Address *
                                            </label>
                                            <Input
                                                value={shippingAddress.address1}
                                                onChange={(e) => setShippingAddress(prev => ({ ...prev, address1: e.target.value }))}
                                                placeholder="123 Main Street"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Apartment, suite, etc. (Optional)
                                            </label>
                                            <Input
                                                value={shippingAddress.address2}
                                                onChange={(e) => setShippingAddress(prev => ({ ...prev, address2: e.target.value }))}
                                                placeholder="Apt 4B"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    City *
                                                </label>
                                                <Input
                                                    value={shippingAddress.city}
                                                    onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    State *
                                                </label>
                                                <Input
                                                    value={shippingAddress.state}
                                                    onChange={(e) => setShippingAddress(prev => ({ ...prev, state: e.target.value }))}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    ZIP Code *
                                                </label>
                                                <Input
                                                    value={shippingAddress.zipCode}
                                                    onChange={(e) => setShippingAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Country *
                                            </label>
                                            <select
                                                value={shippingAddress.country}
                                                onChange={(e) => setShippingAddress(prev => ({ ...prev, country: e.target.value }))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            >
                                                <option value="US">United States</option>
                                                <option value="CA">Canada</option>
                                                <option value="UK">United Kingdom</option>
                                                <option value="AU">Australia</option>
                                            </select>
                                        </div>

                                        {/* Gift Options */}
                                        <div className="border-t border-gray-200 pt-4">
                                            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                                                <Gift className="h-5 w-5 mr-2 text-yellow-500" />
                                                Gift Options
                                            </h3>
                                            <div className="space-y-2">
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="mr-2" />
                                                    <span className="text-sm">This order is a gift</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="mr-2" />
                                                    <span className="text-sm">Include gift receipt (no price shown)</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Payment Method */}
                                {currentStep === 3 && (
                                    <div className="space-y-6">
                                        {/* Payment Method Selection */}
                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-4">Select Payment Method</h3>
                                            <div className="space-y-3">
                                                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-yellow-300">
                                                    <input
                                                        type="radio"
                                                        name="payment"
                                                        checked={paymentMethod.type === 'card'}
                                                        onChange={() => setPaymentMethod(prev => ({ ...prev, type: 'card' }))}
                                                        className="mr-3"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="font-medium">Credit/Debit Card</div>
                                                        <div className="text-sm text-gray-600">Visa, Mastercard, American Express</div>
                                                    </div>
                                                    <CreditCard className="h-5 w-5 text-gray-400" />
                                                </label>

                                                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-yellow-300">
                                                    <input
                                                        type="radio"
                                                        name="payment"
                                                        checked={paymentMethod.type === 'paypal'}
                                                        onChange={() => setPaymentMethod(prev => ({ ...prev, type: 'paypal' }))}
                                                        className="mr-3"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="font-medium">PayPal</div>
                                                        <div className="text-sm text-gray-600">Fast, secure payment</div>
                                                    </div>
                                                </label>

                                                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-yellow-300">
                                                    <input
                                                        type="radio"
                                                        name="payment"
                                                        checked={paymentMethod.type === 'apple'}
                                                        onChange={() => setPaymentMethod(prev => ({ ...prev, type: 'apple' }))}
                                                        className="mr-3"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="font-medium">Apple Pay</div>
                                                        <div className="text-sm text-gray-600">One-touch payment</div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Card Details */}
                                        {paymentMethod.type === 'card' && (
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Card Number *
                                                    </label>
                                                    <Input
                                                        value={paymentMethod.cardNumber}
                                                        onChange={(e) => setPaymentMethod(prev => ({ ...prev, cardNumber: e.target.value }))}
                                                        placeholder="1234 5678 9012 3456"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Cardholder Name *
                                                    </label>
                                                    <Input
                                                        value={paymentMethod.cardholderName}
                                                        onChange={(e) => setPaymentMethod(prev => ({ ...prev, cardholderName: e.target.value }))}
                                                        placeholder="John Doe"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Expiry Date *
                                                        </label>
                                                        <Input
                                                            value={paymentMethod.expiryDate}
                                                            onChange={(e) => setPaymentMethod(prev => ({ ...prev, expiryDate: e.target.value }))}
                                                            placeholder="MM/YY"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            CVV *
                                                        </label>
                                                        <Input
                                                            value={paymentMethod.cvv}
                                                            onChange={(e) => setPaymentMethod(prev => ({ ...prev, cvv: e.target.value }))}
                                                            placeholder="123"
                                                            maxLength={4}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Security Notice */}
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                            <div className="flex items-start">
                                                <Shield className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                                                <div className="text-sm text-green-800">
                                                    <strong>Secure Payment:</strong> Your payment information is encrypted and secure. We never store your card details.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Review & Confirm */}
                                {currentStep === 4 && (
                                    <div className="space-y-6">
                                        {/* Order Items */}
                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-4">Order Items</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-lg flex items-center justify-center">
                                                        <span className="text-2xl">💍</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-medium">Custom Solitaire Engagement Ring</div>
                                                        <div className="text-sm text-gray-600">White Gold, Diamond, Size 7.5</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-medium">{formatPrice(2999.99)}</div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-lg flex items-center justify-center">
                                                        <span className="text-2xl">📿</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-medium">Diamond Teardrop Pendant</div>
                                                        <div className="text-sm text-gray-600">Yellow Gold, Diamond</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-medium">{formatPrice(899.99)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Shipping Address */}
                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-4">Shipping Address</h3>
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <div className="text-sm text-gray-700">
                                                    <div className="font-medium">
                                                        {shippingAddress.firstName} {shippingAddress.lastName}
                                                    </div>
                                                    {shippingAddress.company && <div>{shippingAddress.company}</div>}
                                                    <div>{shippingAddress.address1}</div>
                                                    {shippingAddress.address2 && <div>{shippingAddress.address2}</div>}
                                                    <div>
                                                        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                                                    </div>
                                                    <div>{shippingAddress.country}</div>
                                                    <div>{shippingAddress.phone}</div>
                                                    <div>{shippingAddress.email}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Payment Method */}
                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-4">Payment Method</h3>
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <div className="text-sm text-gray-700 capitalize">
                                                    {paymentMethod.type === 'card' ? 'Credit/Debit Card' : paymentMethod.type}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Delivery Timeline */}
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <div className="flex items-start">
                                                <Truck className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                                                <div className="text-sm text-blue-800">
                                                    <strong>Estimated Delivery:</strong> 2-3 weeks from order date. You'll receive email updates when your order ships.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex justify-between pt-6 border-t border-gray-200">
                                    {currentStep > 1 && (
                                        <Button
                                            variant="outline"
                                            onClick={() => setCurrentStep(currentStep - 1)}
                                        >
                                            <ArrowLeft className="h-4 w-4 mr-2" />
                                            Previous
                                        </Button>
                                    )}
                                    <div className="ml-auto">
                                        {currentStep < steps.length ? (
                                            <Button onClick={handleStepSubmit} className="btn-gold">
                                                Continue
                                                <ArrowRight className="h-4 w-4 ml-2" />
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={handlePlaceOrder}
                                                disabled={isProcessing}
                                                className="btn-gold"
                                            >
                                                {isProcessing ? 'Processing...' : 'Place Order'}
                                                <ArrowRight className="h-4 w-4 ml-2" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium">{formatPrice(orderSummary.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium">
                                            {orderSummary.shipping === 0 ? 'FREE' : formatPrice(orderSummary.shipping)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tax</span>
                                        <span className="font-medium">{formatPrice(orderSummary.tax)}</span>
                                    </div>
                                    {orderSummary.discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount</span>
                                            <span className="font-medium">-{formatPrice(orderSummary.discount)}</span>
                                        </div>
                                    )}
                                    <div className="pt-3 border-t border-gray-200">
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span className="text-gradient-gold">{formatPrice(orderSummary.total)}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Trust Badges */}
                        <Card>
                            <CardContent className="p-4">
                                <div className="text-center space-y-3">
                                    <div className="text-sm font-medium text-gray-900">Safe & Secure</div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-center text-xs text-gray-600">
                                            <Shield className="h-4 w-4 mr-1" />
                                            SSL Encrypted
                                        </div>
                                        <div className="flex items-center justify-center text-xs text-gray-600">
                                            <Shield className="h-4 w-4 mr-1" />
                                            PCI Compliant
                                        </div>
                                        <div className="flex items-center justify-center text-xs text-gray-600">
                                            <Shield className="h-4 w-4 mr-1" />
                                            Fraud Protection
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}