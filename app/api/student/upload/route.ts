import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"
import os from "os"
import { documentStorage } from "@/lib/storage"

export async function POST(req: Request) {
  try {
    const data = await req.formData()
    const file = data.get("file") as File
    const docType = (data.get("docType") as string)?.toLowerCase() || "marksheet"

    // ✅ Extract user info if sent from frontend
    const userInfo = data.get("userInfo") ? JSON.parse(data.get("userInfo") as string) : null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // ✅ Save uploaded file temporarily
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = path.join(os.tmpdir(), file.name)
    await writeFile(filePath, buffer)

    // ✅ Call your deployed Render OCR service instead of local Python
    const ocrResponse = await fetch("https://web-production-dc110.up.railway.app/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageBase64: buffer.toString("base64"),
        docType,
      }),
    })

    if (!ocrResponse.ok) {
      console.error("OCR service failed:", await ocrResponse.text())
      return NextResponse.json({ error: "OCR service failed" }, { status: 500 })
    }

    const result = await ocrResponse.json()
    console.log("PARSED OCR RESULT (Render):", result)

    // ✅ Ensure valid points
    const points =
      result && typeof result.points === "number" && result.points > 0 ? result.points : 0

    // ✅ Save document in memory (temporary DB)
    documentStorage.push({
  id: Date.now().toString(),
  type: docType,
  fileName: file.name,
  extractedData: result,
  points,
  uploadedAt: new Date().toISOString(),
  fileUrl: `data:image/png;base64,${buffer.toString("base64")}`, // ✅ store previewable image
  ...(userInfo && {
    uploadedBy: userInfo.id,
    studentName: userInfo.name,
    rollNo: userInfo.rollNo,
    course: userInfo.course,
    year: userInfo.year,
  }),
});


    return NextResponse.json({ ...result, points })
  } catch (err) {
    console.error("Upload Error:", err)
    return NextResponse.json({ error: "Server error during upload" }, { status: 500 })
  }
}
