import { type NextRequest, NextResponse } from "next/server"
import { documentStorage } from "@/lib/storage"

// ✅ Fetch all students dynamically based on uploaded documents
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const teacherId = searchParams.get("teacherId")

    // Group all documents by student ID
    const studentMap: Record<string, any> = {}

    for (const doc of documentStorage) {
      const sid = doc.uploadedBy || "unknown"

      if (!studentMap[sid]) {
        studentMap[sid] = {
          id: sid,
          name: doc.studentName || "Unknown",
          rollNo: doc.rollNo || "-",
          course: doc.course || "-",
          year: doc.year || "-",
          totalPoints: 0,
          documentsCount: 0,
        }
      }

      studentMap[sid].totalPoints += doc.points || 0
      studentMap[sid].documentsCount += 1
    }

    const students = Object.values(studentMap)

    return NextResponse.json({ students })
  } catch (error) {
    console.error("Teacher fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 })
  }
}
