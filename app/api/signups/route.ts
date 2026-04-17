import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Signup from "@/models/Signup"

// ─── POST /api/signups — save a new signup ────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { firstName, email } = await req.json()

    if (!firstName?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "First name and email are required." }, { status: 400 })
    }

    await connectToDatabase()

    const existing = await Signup.findOne({ email: email.toLowerCase() })
    if (existing) {
      return NextResponse.json({ error: "This email is already on the list." }, { status: 409 })
    }

    const signup = await Signup.create({ firstName, email })
    return NextResponse.json({ success: true, id: signup._id }, { status: 201 })

  } catch (err) {
    console.error("[POST /api/signups]", err)
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 })
  }
}

// ─── GET /api/signups — fetch all signups (requires admin password header) ────
export async function GET(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD
  const authHeader = req.headers.get("x-admin-password")

  if (!authHeader || authHeader !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await connectToDatabase()
    const signups = await Signup.find({}).sort({ createdAt: -1 }).lean()

    return NextResponse.json({
      total: signups.length,
      signups: signups.map((s) => ({
        id:        s._id,
        firstName: s.firstName,
        email:     s.email,
        createdAt: s.createdAt,
      })),
    })
  } catch (err) {
    console.error("[GET /api/signups]", err)
    return NextResponse.json({ error: "Server error." }, { status: 500 })
  }
}