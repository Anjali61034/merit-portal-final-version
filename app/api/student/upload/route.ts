import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"
import os from "os"
import { documentStorage } from "@/lib/storage"

export async function POST(req: Request) {
  try {
    // 🔥 1. WAKE UP RENDER (VERY IMPORTANT)
    await fetch(process.env.OCR_API_URL!.replace("/ocr", ""), {
      cache: "no-store",
    })
    const data = await req.formData()
    const file = data.get("file") as File
    const docType = (data.get("docType") as string)?.toLowerCase() || "marksheet"

    const userInfo = data.get("userInfo")
      ? JSON.parse(data.get("userInfo") as string)
      : null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // ---------- Save file locally ----------
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = path.join(os.tmpdir(), file.name)
    await writeFile(filePath, buffer)

    // ---------- SEND TO FASTAPI (SOURCE OF TRUTH) ----------
    const ocrForm = new FormData()
    ocrForm.append("file", new Blob([buffer]), file.name)
    ocrForm.append("doc_type", docType)
    ocrForm.append("stream", "Sciences")

    const ocrRes = await fetch(process.env.OCR_API_URL!, {
      method: "POST",
      body: ocrForm,
    })

    if (!ocrRes.ok) {
      throw new Error("OCR service failed")
    }

    const ocrData = await ocrRes.json()

    // ✅ TAKE VALUES DIRECTLY FROM PYTHON
    const extractedData = ocrData
    const points = ocrData.points || 0

    // ---------- FILE PREVIEW (PDF + IMAGE) ----------
    const isPdf = file.type === "application/pdf"
    const fileUrl = isPdf
      ? `data:application/pdf;base64,${buffer.toString("base64")}`
      : `data:image/png;base64,${buffer.toString("base64")}`

    // ---------- STORE ----------
    documentStorage.push({
      id: Date.now().toString(),
      type: docType,
      fileName: file.name,
      extractedData,
      points,
      uploadedAt: new Date().toISOString(),
      fileUrl,
      ...(userInfo && {
        uploadedBy: userInfo.id,
        studentName: userInfo.name,
        rollNo: userInfo.rollNo,
        course: userInfo.course,
        year: userInfo.year,
      }),
    })

    return NextResponse.json({ extractedData, points })

  } catch (err) {
    console.error("Upload Error:", err)
    return NextResponse.json({ error: "Server error during upload" }, { status: 500 })
  }
}
