import { NextResponse } from "next/server"

import { documentStorage } from "@/lib/storage"



export async function GET() {
  const totalPoints = documentStorage.reduce((acc, d) => acc + (d.points || 0), 0)
  return NextResponse.json({ documents: documentStorage, totalPoints })
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

  const index = documentStorage.findIndex((d) => d.id === id)
  if (index === -1) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 })
  }

  documentStorage.splice(index, 1)
  return NextResponse.json({ success: true })
}
