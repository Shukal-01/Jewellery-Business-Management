// import { NextAuthOptions } from 'next-auth';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import GoogleProvider from 'next-auth/providers/google';
// import EmailProvider from 'next-auth/providers/email';
// import { prisma } from '@/lib/db';

// export const authOptions: NextAuthOptions = {
//     adapter: PrismaAdapter(prisma),
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID!,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//         }),
//         EmailProvider({
//             server: {
//                 host: process.env.EMAIL_SERVER_HOST,
//                 port: process.env.EMAIL_SERVER_PORT,
//                 auth: {
//                     user: process.env.EMAIL_SERVER_USER,
//                     pass: process.env.EMAIL_SERVER_PASSWORD,
//                 },
//             },
//             from: process.env.EMAIL_FROM,
//         }),
//     ],
//     callbacks: {
//         jwt: async ({ token, user }) => {
//             if (user) {
//                 token.role = user.role;
//                 token.vendorId = user.vendorId;
//             }
//             return token;
//         },
//         session: async ({ session, token }) => {
//             if (session?.user) {
//                 session.user.id = token.sub!;
//                 session.user.role = token.role as string;
//                 session.user.vendorId = token.vendorId as string;
//             }
//             return session;
//         },
//     },
//     pages: {
//         signIn: '/auth/signin',
//         signOut: '/auth/signout',
//         // signUp: '/auth/signup',
//         verifyRequest: '/auth/verify-request',
//         newUser: '/auth/onboarding',
//     },
//     session: {
//         strategy: 'jwt',
//         maxAge: 30 * 24 * 60 * 60, // 30 days
//     },
//     secret: process.env.NEXTAUTH_SECRET,
// };

import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Mock database - replace with real Prisma later
const mockUsers = [
    {
        id: '1',
        email: 'admin@test.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin'
    },
    {
        id: '2',
        email: 'customer@test.com',
        password: 'customer123',
        name: 'Customer User',
        role: 'customer'
    }
];

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // Mock authentication - replace with real database check
                const user = mockUsers.find(
                    u => u.email === credentials.email && u.password === credentials.password
                );

                if (user) {
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role
                    };
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: '/login',
        error: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role as string;
            }
            return session;
        },
    },
};