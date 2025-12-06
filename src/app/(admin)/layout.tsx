import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminHeader from '@/components/admin/Header';
import AdminSidebar from '@/components/admin/Sidebar';

export default async function AdminLayout({
    children,
}: {
    children: ReactNode;
}) {
    const session = await getServerSession(authOptions);

    // Check if user is admin
    if (!session || session.user.role !== 'admin') {
        redirect('/auth/signin?error=AccessDenied');
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminHeader session={session} />
            <div className="flex">
                <AdminSidebar />
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}