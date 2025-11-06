import { type NextRequest, NextResponse } from "next/server"

// ✅ Ensure a shared in-memory user store (works across routes in dev & prod)
if (!(global as any).userStorage) {
  ;(global as any).userStorage = [
    // Optional default users
    {
      id: "1",
      email: "student@college.com",
      password: "password123",
      name: "Aman Kumar",
      rollNo: "2021001",
      course: "B.Sc. Physics",
      year: "3",
      role: "student",
    },
    {
      id: "T1",
      email: "teacher@college.com",
      password: "password123",
      name: "Dr. Sharma",
      department: "Physics",
      role: "teacher",
    },
  ]
}


export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json()

    // ✅ Find user in shared storage
    const userList = userStorage.filter((u) => u.role === role)
    const user = userList.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // ✅ Successful login response
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        ...(role === "student" && {
          rollNo: user.rollNo,
          course: user.course,
          year: user.year,
        }),
        ...(role === "teacher" && {
          department: user.department,
        }),
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
