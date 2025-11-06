"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, AlertCircle, CheckCircle } from "lucide-react"

interface DocumentUploadFormProps {
  onUploadSuccess: () => void
}

export default function DocumentUploadForm({ onUploadSuccess }: DocumentUploadFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [documentType, setDocumentType] = useState("marksheet")
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isDragging, setIsDragging] = useState(false)

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setError("Please select a file")
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB")
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("docType", documentType)

      // ✅ Add student info (from localStorage)
       const user = JSON.parse(localStorage.getItem("user") || "{}")
       formData.append("userInfo", JSON.stringify(user))

      const res = await fetch("/api/student/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (res.ok) {
        console.log("[v0] Upload successful:", data)
        const points = data.points ?? data.document?.points ?? 0
setSuccess(`Document uploaded successfully! Points: ${points}`)

        setFile(null)
        setDocumentType("marksheet")

        // Call refresh after 1.5 seconds to show success message
        setTimeout(() => {
          onUploadSuccess()
          setSuccess("")
        }, 1500)
      } else {
        setError(data.error || "Upload failed. Please try again.")
      }
    } catch (err) {
      console.error("[v0] Upload error:", err)
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      const droppedFile = droppedFiles[0]

      // Validate file type
      const validMimes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"]
      if (!validMimes.includes(droppedFile.type)) {
        setError("Invalid file type. Please upload PDF, JPG, or PNG")
        return
      }

      setFile(droppedFile)
      setError("")
    }
  }

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <div>
        <Label htmlFor="docType" className="text-sm font-semibold">
          Document Type
        </Label>
        <select
          id="docType"
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="marksheet">Academic Marksheet</option>
          <option value="certificate">Event Certificate</option>
        </select>
      </div>

      <div>
        <Label htmlFor="file" className="text-sm font-semibold">
          Upload Document
        </Label>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition cursor-pointer ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : file
                ? "border-green-500 bg-green-50"
                : "border-gray-300 bg-white hover:border-gray-400"
          }`}
        >
          <input
            id="file"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0]
              if (selectedFile) {
                const validMimes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"]
                if (!validMimes.includes(selectedFile.type)) {
                  setError("Invalid file type. Please upload PDF, JPG, or PNG")
                  return
                }
                setFile(selectedFile)
                setError("")
              }
            }}
            className="hidden"
          />
          <label htmlFor="file" className="cursor-pointer block">
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm font-semibold text-gray-700">
              {file ? file.name : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-gray-500 mt-1">PDF, JPG, or PNG (Max 10MB)</p>
          </label>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={!file || isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
      >
        {isLoading ? "Uploading..." : "Upload Document"}
      </Button>
    </form>
  )
}
