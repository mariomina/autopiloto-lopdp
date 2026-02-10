
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                const user = await prisma.staffUser.findUnique({
                    where: { email: credentials.email as string },
                })

                if (!user || !user.passwordHash) return null

                const passwordMatch = await bcrypt.compare(
                    credentials.password as string,
                    user.passwordHash
                )

                if (!passwordMatch) return null

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    tenantId: user.tenantId, // Custom field
                    role: user.role,         // Custom field
                }
            },
        }),
    ],
    session: { strategy: "jwt" },
    secret: process.env.AUTH_SECRET,
})
