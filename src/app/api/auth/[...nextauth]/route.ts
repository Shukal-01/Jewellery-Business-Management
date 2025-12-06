import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import type { NextAuthOptions } from "next-auth";

// export const authOptions: NextAuthOptions = {
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 email: { label: "Email", type: "email" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials) {
//                 if (!credentials?.email || !credentials?.password) return null;

//                 return {
//                     id: "1",
//                     email: credentials.email,
//                     name: "User",
//                     role: "customer",
//                 };
//             },
//         }),
//     ],

//     session: { strategy: "jwt" },

//     pages: {
//         signIn: "/login",
//         error: "/login",
//     },

//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) token.role = user.role;
//             return token;
//         },
//         async session({ session, token }) {
//             if (session.user) session.user.role = token.role as string;
//             return session;
//         },
//     },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
