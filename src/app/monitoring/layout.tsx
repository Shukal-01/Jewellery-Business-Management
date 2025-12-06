import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import MonitoringHeader from '@/components/monitoring/Header';
import MonitoringSidebar from '@/components/monitoring/Sidebar';

export default async function MonitoringLayout({
    children,
}: {
    children: ReactNode;
}) {
    const session = await getServerSession(authOptions);

    // Check if user is admin or has monitoring role
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'monitoring')) {
        redirect('/auth/signin?error=AccessDenied');
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <MonitoringHeader session={session} />
            <div className="flex">
                <MonitoringSidebar />
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}