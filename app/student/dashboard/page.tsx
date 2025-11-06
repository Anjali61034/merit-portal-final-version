"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, X, Trash2 } from "lucide-react"
import DocumentUploadForm from "@/components/student/document-upload-form"

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null)
  const [documents, setDocuments] = useState<any[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
      fetchDocuments()
    }
  }, [])

  const fetchDocuments = async () => {
    try {
      const res = await fetch("/api/student/documents")
      const data = await res.json()
      setDocuments(data.documents || [])
      setTotalPoints(data.totalPoints || 0)
    } catch (err) {
      console.error("Error fetching documents:", err)
    }
  }

  const handleDelete = async (id: string) => {
  try {
    const res = await fetch(`/api/student/documents?id=${id}`, {
      method: "DELETE",
    })
    if (res.ok) {
      fetchDocuments()
    } else {
      const msg = await res.text()
      console.error("Delete failed:", msg)
    }
  } catch (err) {
    console.error("Error deleting document:", err)
  }
}


  if (!user) return <div>Loading...</div>

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome, {user.name} | Roll No: {user.rollNo} | Course: {user.course}
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-600">Total Points</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold text-blue-600">{totalPoints}</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-600">Documents Uploaded</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold text-indigo-600">{documents.length}</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-600">Status</CardTitle></CardHeader>
            <CardContent><p className="text-lg font-semibold text-green-600">Active</p></CardContent>
          </Card>
        </div>

        {/* Upload */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Upload className="w-5 h-5" /> Upload Documents</CardTitle>
            <CardDescription>Upload marksheets or certificates for evaluation</CardDescription>
          </CardHeader>
          <CardContent><DocumentUploadForm onUploadSuccess={fetchDocuments} /></CardContent>
        </Card>

        {/* Submissions */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5" /> Your Submissions</CardTitle></CardHeader>
          <CardContent>
            {documents.length === 0 ? (
              <p className="text-gray-500">No documents uploaded yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((doc) => (
                  <Card key={doc.id} className="border border-gray-200 shadow-sm p-4">
                    <div className="flex justify-between items-start">
                      <h3
                        onClick={() => doc.fileUrl && setPreviewImage(doc.fileUrl)}
                        className="text-base font-semibold text-blue-700 cursor-pointer hover:underline"
                      >
                        {doc.fileName}
                      </h3>
                      <Trash2
                        className="w-4 h-4 text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => handleDelete(doc.id)}
                      />
                    </div>
                    <p className="text-sm text-gray-600 capitalize">{doc.type}</p>
                    <p className="font-semibold mt-2">Points: {doc.points}</p>

                    {/* OCR Info */}
                    {doc.extractedData && (
                      <div className="mt-2 text-sm text-gray-700 space-y-1">
                        {doc.type === "marksheet" ? (
                          <>
                            <p><strong>CGPA:</strong> {doc.extractedData.cgpa ?? "—"}</p>
                            {doc.extractedData.sgpas?.length > 0 && (
                              <div>
                                <strong>SGPAs:</strong>
                                <ul className="list-disc list-inside ml-3">
                                  {doc.extractedData.sgpas.map((s: string, i: number) => (
                                    <li key={i}>{s}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <p><strong>Category:</strong> {doc.extractedData.category ?? "—"}</p>
                            <p><strong>Rank:</strong> {doc.extractedData.rank ?? "—"}</p>
                            <p><strong>Leadership:</strong> {doc.extractedData.is_lead ? "Yes" : "No"}</p>
                          </>
                        )}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Image Preview Modal */}
        {previewImage && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition"
            >
              <X className="w-5 h-5 text-gray-800" />
            </button>
            <img src={previewImage} alt="Preview" className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg" />
          </div>
        )}
      </div>
    </main>
  )
}
