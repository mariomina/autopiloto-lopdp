import { auth } from "@/auth"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const session = await auth()
    if (session) return NextResponse.json(session)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
}
