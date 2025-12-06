'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, Share2, Heart, Download, Users } from 'lucide-react';

interface SaveSharePanelProps {
    onSave: () => void;
    isSaving: boolean;
    designName: string;
}

export default function SaveSharePanel({ onSave, isSaving, designName }: SaveSharePanelProps) {
    const [shareLink, setShareLink] = useState('');
    const [showShareOptions, setShowShareOptions] = useState(false);
    const [isSharing, setIsSharing] = useState(false);

    const generateShareLink = async () => {
        setIsSharing(true);
        try {
            // Simulate generating share link
            await new Promise(resolve => setTimeout(resolve, 1000));
            const link = `https://luxuryjewelry.com/shared/${Math.random().toString(36).substring(7)}`;
            setShareLink(link);
            setShowShareOptions(true);
        } catch (error) {
            alert('Failed to generate share link');
        } finally {
            setIsSharing(false);
        }
    };

    const copyShareLink = () => {
        navigator.clipboard.writeText(shareLink);
        alert('Link copied to clipboard!');
    };

    const downloadImage = () => {
        // Simulate downloading design image
        alert('Design image downloaded!');
    };

    const addToWishlist = () => {
        // Simulate adding to wishlist
        alert('Added to wishlist!');
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Save & Share</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Save Design */}
                <div className="space-y-3">
                    <Button
                        onClick={onSave}
                        disabled={isSaving || !designName.trim()}
                        className="w-full"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        {isSaving ? 'Saving...' : 'Save Design'}
                    </Button>

                    {designName && (
                        <div className="text-xs text-green-600 bg-green-50 p-2 rounded text-center">
                            ✓ Ready to save "{designName}"
                        </div>
                    )}
                </div>

                {/* Share Options */}
                <div className="space-y-3">
                    <Button
                        variant="outline"
                        onClick={generateShareLink}
                        disabled={isSharing || !designName.trim()}
                        className="w-full"
                    >
                        <Share2 className="h-4 w-4 mr-2" />
                        {isSharing ? 'Generating...' : 'Share Design'}
                    </Button>

                    {showShareOptions && shareLink && (
                        <div className="space-y-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="text-sm text-blue-800 mb-2">
                                <strong>Share Link:</strong>
                            </div>
                            <div className="flex space-x-2">
                                <Input
                                    value={shareLink}
                                    readOnly
                                    className="flex-1 text-xs"
                                />
                                <Button size="sm" onClick={copyShareLink}>
                                    Copy
                                </Button>
                            </div>

                            {/* Social Share Buttons */}
                            <div className="flex space-x-2 mt-3">
                                <Button size="sm" variant="outline" className="flex-1 text-xs">
                                    <Users className="h-3 w-3 mr-1" />
                                    Email
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1 text-xs">
                                    <Users className="h-3 w-3 mr-1" />
                                    Social
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Additional Actions */}
                <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" onClick={downloadImage}>
                        <Download className="h-4 w-4 mr-1" />
                        Save Image
                    </Button>
                    <Button variant="outline" size="sm" onClick={addToWishlist}>
                        <Heart className="h-4 w-4 mr-1" />
                        Wishlist
                    </Button>
                </div>

                {/* Design Info */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="text-xs text-gray-600 space-y-1">
                        <div className="flex justify-between">
                            <span>Status:</span>
                            <span className="font-medium">Draft</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Last saved:</span>
                            <span className="font-medium">Just now</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Privacy:</span>
                            <span className="font-medium">Private</span>
                        </div>
                    </div>
                </div>

                {/* Tips */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="text-xs text-yellow-800">
                        <strong>💡 Pro Tip:</strong> Save your designs frequently. You can access them from your profile anytime.
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}