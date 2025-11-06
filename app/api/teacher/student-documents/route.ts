import { type NextRequest, NextResponse } from "next/server"
import { documentStorage } from "@/lib/storage"

export async function GET(request: NextRequest) {
  try {
    // ✅ Log everything currently stored in memory
    console.log("📦 Current documentStorage:", documentStorage)

    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get("studentId")
    const rollNo = searchParams.get("rollNo")
    const name = searchParams.get("name")

    console.log("🎯 Fetching for:", { studentId, rollNo, name })

    const documents = documentStorage.filter(
      (doc) =>
        doc.uploadedBy === studentId ||
        doc.rollNo === rollNo ||
        doc.studentName?.toLowerCase() === name?.toLowerCase()
    )

    console.log("✅ Matched docs:", documents.length)

    return NextResponse.json({ documents })
  } catch (error) {
    console.error("Teacher document fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}
