
import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth")
    const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard")

    if (isApiAuthRoute) return null

    if (isDashboardRoute) {
        if (isLoggedIn) return null
        return Response.redirect(new URL("/login", nextUrl))
    }

    // Redirect to dashboard if logged in and on root or login
    if (isLoggedIn && (nextUrl.pathname === "/" || nextUrl.pathname === "/login")) {
        return Response.redirect(new URL("/dashboard", nextUrl))
    }

    return null
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
