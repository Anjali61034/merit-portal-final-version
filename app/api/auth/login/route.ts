import { type NextRequest, NextResponse } from "next/server"

// Mock user database - replace with real database
const mockUsers = {
  student: [
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
  ],
  teacher: [
    {
      id: "T1",
      email: "teacher@college.com",
      password: "password123",
      name: "Dr. Sharma",
      department: "Physics",
      role: "teacher",
    },
  ],
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json()

    const userList = mockUsers[role as keyof typeof mockUsers] || []
    const user = userList.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

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
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
