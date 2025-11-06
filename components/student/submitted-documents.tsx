"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

interface StudentSubmissionModalProps {
  isOpen: boolean
  onClose: () => void
  student: any
}

export default function StudentSubmissionModal({ isOpen, onClose, student }: StudentSubmissionModalProps) {
  const [documents, setDocuments] = useState<any[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  useEffect(() => {
    if (student?.id && isOpen) fetchDocuments()
  }, [student, isOpen])

  const fetchDocuments = async () => {
    try {
      // ✅ Now sends both studentId and rollNo for matching
      const res = await fetch(`/api/teacher/student-documents?studentId=${student.id}&rollNo=${student.rollNo}`)
      const data = await res.json()
      setDocuments(data.documents || [])
    } catch (err) {
      console.error("Error fetching student documents:", err)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-2">{student.name}</h2>
        <p className="text-sm text-gray-600 mb-4">
          Roll No: {student.rollNo} | Course: {student.course}
        </p>

        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-600">Total Merit Points</p>
          <p className="text-4xl font-bold text-blue-600">{student.totalPoints}</p>
        </div>

        <h3 className="text-lg font-semibold mb-2">Submitted Documents</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {documents.length === 0 ? (
            <p className="text-gray-500">No documents submitted yet.</p>
          ) : (
            documents.map((doc) => (
              <div key={doc.id} className="flex justify-between items-center border p-2 rounded">
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => setPreviewImage(doc.fileUrl)}
                >
                  {doc.fileName}
                </span>
                <span className="text-sm text-gray-600 capitalize">{doc.type}</span>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>

      {previewImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition"
          >
            <X className="w-5 h-5 text-gray-800" />
          </button>
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  )
}
