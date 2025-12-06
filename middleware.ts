import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const pathname = req.nextUrl.pathname;

        // Allow access to root, auth pages, and public assets
        if (
            pathname === '/' ||
            pathname.startsWith('/auth/') ||
            pathname.startsWith('/api/auth/') ||
            pathname.startsWith('/_next/') ||
            pathname.startsWith('/models/') ||
            pathname.startsWith('/images/') ||
            pathname.endsWith('.ico') ||
            pathname.endsWith('.png') ||
            pathname.endsWith('.jpg') ||
            pathname.endsWith('.jpeg') ||
            pathname.endsWith('.svg')
        ) {
            return NextResponse.next();
        }

        // Route protection based on roles
        const isVendorRoute = pathname.startsWith('/vendor');
        const isAdminRoute = pathname.startsWith('/admin');
        const isMonitoringRoute = pathname.startsWith('/monitoring');
        const isCustomerRoute = pathname.startsWith('/customer');

        // Vendor routes - require vendor or admin role
        if (isVendorRoute) {
            if (token?.role !== 'vendor' && token?.role !== 'admin') {
                return NextResponse.redirect(new URL('/auth/signin?error=AccessDenied', req.url));
            }
        }

        // Admin routes - require admin role
        if (isAdminRoute) {
            if (token?.role !== 'admin') {
                return NextResponse.redirect(new URL('/auth/signin?error=AccessDenied', req.url));
            }
        }

        // Monitoring routes - require monitoring or admin role
        if (isMonitoringRoute) {
            if (token?.role !== 'monitoring' && token?.role !== 'admin') {
                return NextResponse.redirect(new URL('/auth/signin?error=AccessDenied', req.url));
            }
        }

        // Customer routes - require authenticated user
        if (isCustomerRoute && !token) {
            return NextResponse.redirect(new URL('/auth/signin', req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                // Allow access if user is authenticated (for routes that require authentication)
                return !!token || true; // The middleware will handle more specific checks
            },
        },
    }
);

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder (public assets)
         */
        '/((?!_next/static|_next/image|favicon.ico|models|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};