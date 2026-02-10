
import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
            if (isOnDashboard) {
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                // If user is logged in and trying to access /login, redirect to dashboard
                if (nextUrl.pathname === "/login") {
                    return Response.redirect(new URL("/dashboard", nextUrl))
                }
            }
            return true
        },
        async jwt({ token, user, trigger, session }) {
            if (user && user.id) {
                token.id = user.id as string
                token.tenantId = (user as any).tenantId
                token.role = (user as any).role
            }
            // Persist updates
            if (trigger === "update" && session?.user) {
                token.tenantId = session.user.tenantId
                token.role = session.user.role
            }
            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string
                (session.user as any).tenantId = token.tenantId as string
                (session.user as any).role = token.role as string
            }
            return session
        },
    },
    providers: [], // Providers added in auth.ts
} satisfies NextAuthConfig
