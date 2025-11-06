import { type NextRequest, NextResponse } from "next/server"
import { documentStorage } from "@/lib/storage"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get("studentId")

    const documents = documentStorage.filter((doc) => doc.uploadedBy === studentId)

    return NextResponse.json({ documents })
  } catch (error) {
    console.error("Teacher document fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}
