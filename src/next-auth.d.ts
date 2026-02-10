import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string
            tenantId: string
            role: string
        } & DefaultSession["user"]
    }

    interface User {
        id: string
        tenantId: string
        role: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        tenantId: string
        role: string
    }
}
