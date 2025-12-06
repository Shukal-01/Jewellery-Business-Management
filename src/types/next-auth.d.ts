import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            vendorId?: string;
        };
    }

    interface User {
        role: string;
        vendorId?: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        role: string;
        vendorId?: string;
    }
}

// import 'next-auth';

// declare module 'next-auth' {
//     interface User {
//         role?: string;
//     }

//     interface Session {
//         user: {
//             id?: string;
//             role?: string;
//             email?: string | null;
//             name?: string | null;
//             image?: string | null;
//         };
//     }
// }

// declare module 'next-auth/jwt' {
//     interface JWT {
//         role?: string;
//     }
// }