import { NextResponse } from "next/server"
import { execFile } from "child_process"
import { writeFile } from "fs/promises"
import path from "path"
import os from "os"
import { documentStorage } from "@/lib/storage"

export async function POST(req: Request) {
  const data = await req.formData()
  const file = data.get("file") as File
  const docType = (data.get("docType") as string)?.toLowerCase() || "marksheet"

  // ✅ Extract user info from formData (sent by frontend)
  const userInfo = data.get("userInfo") ? JSON.parse(data.get("userInfo") as string) : null

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  // ✅ Save uploaded file temporarily
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const filePath = path.join(os.tmpdir(), file.name)
  await writeFile(filePath, buffer)

  // ✅ Path to Python script
  const scriptPath = path.join(process.cwd(), "scripts", "ocr_extractor.py")

  return new Promise((resolve) => {
    execFile(
      path.join(process.cwd(), "scripts", "venv", "bin", "python3"),
      [scriptPath, filePath, docType],
      (error, stdout, stderr) => {
        if (error) {
          console.error("Python Error:", error)
          console.error("stderr:", stderr)
          resolve(NextResponse.json({ error: "Python failed to execute" }, { status: 500 }))
          return
        }

        console.log("RAW PYTHON OUTPUT:", stdout)

        try {
          const result = JSON.parse(stdout.trim())
          console.log("PARSED PYTHON RESULT:", result)

          // ✅ Ensure valid points from Python
          const points =
            result && typeof result.points === "number" && result.points >= 0
              ? result.points
              : 0

          // ✅ Save document in memory with student info
          documentStorage.push({
            id: Date.now().toString(),
            type: docType,
            fileName: file.name,
            extractedData: result,
            points,
            uploadedAt: new Date().toISOString(),
            // 👇 Student Info (from localStorage user)
            uploadedBy: userInfo?.email || "unknown",
            studentName: userInfo?.name || "Unknown Student",
            rollNo: userInfo?.rollNo || "-",
            course: userInfo?.course || "-",
            year: userInfo?.year || "-",
          })

          resolve(NextResponse.json({ ...result, points }))
        } catch (err) {
          console.error("JSON Parse Error:", err, stdout)
          resolve(NextResponse.json({ error: "Invalid JSON from Python" }, { status: 500 }))
        }
      }
    )
  })
}
