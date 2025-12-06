import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  // Redirect to appropriate panel based on user role
  if (session?.user) {
    switch (session.user.role) {
      case 'admin':
        redirect('/admin/dashboard');
      case 'vendor':
        redirect('/vendor/dashboard');
      case 'monitoring':
        redirect('/monitoring/dashboard');
      default:
        redirect('/customer/page.tsx');
    }
  }

  // Show landing page for unauthenticated users
  return redirect('/customer/page.tsx');
}