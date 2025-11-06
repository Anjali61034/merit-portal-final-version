import { NextResponse } from "next/server"
import { userStorage } from "@/lib/storage"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, name, role, rollNo, course, year, department } = body

    // Check if user already exists
    const existing = userStorage.find((u) => u.email === email)
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const newUser = {
      id: crypto.randomUUID(),
      email,
      password,
      name,
      role,
      ...(role === "student" && { rollNo, course, year }),
      ...(role === "teacher" && { department }),
    }

    userStorage.push(newUser)
    console.log("✅ User registered:", newUser)

    return NextResponse.json({ success: true, user: newUser })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Signup failed" }, { status: 500 })
  }
}
