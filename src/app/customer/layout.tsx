import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import CustomerHeader from '@/components/customer/Header';
import CustomerFooter from '@/components/customer/Footer';

export default async function CustomerLayout({
    children,
}: {
    children: ReactNode;
}) {
    const session = await getServerSession(authOptions);

    // Optional: Require authentication for customer pages
    // if (!session) {
    //   redirect('/auth/signin');
    // }

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50/30 via-white to-pink-50/30">
            <CustomerHeader session={session} />
            <main className="flex-1">
                {children}
            </main>
            <CustomerFooter />
        </div>
    );
}
