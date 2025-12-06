import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import VendorHeader from '@/components/vendor/Header';
import VendorSidebar from '@/components/vendor/Sidebar';

export default async function VendorLayout({
    children,
}: {
    children: ReactNode;
}) {
    const session = await getServerSession(authOptions);

    // Check if user is vendor or admin
    if (!session || (session.user.role !== 'vendor' && session.user.role !== 'admin')) {
        redirect('/auth/signin?error=AccessDenied');
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <VendorHeader session={session} />
            <div className="flex">
                <VendorSidebar />
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}