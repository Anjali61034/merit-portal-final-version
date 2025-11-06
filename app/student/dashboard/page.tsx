"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText } from "lucide-react"
import DocumentUploadForm from "@/components/student/document-upload-form"
import SubmittedDocuments from "@/components/student/submitted-documents"

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null)
  const [documents, setDocuments] = useState([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [showUploadForm, setShowUploadForm] = useState(false)

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

  if (!user) {
    return <div>Loading...</div>
  }

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

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Points</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">{totalPoints}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Documents Uploaded</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-indigo-600">{documents.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-green-600">Active</p>
            </CardContent>
          </Card>
        </div>

        {/* Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Documents
            </CardTitle>
            <CardDescription>Upload marksheets and certificates for merit evaluation</CardDescription>
          </CardHeader>
          <CardContent>
            <DocumentUploadForm onUploadSuccess={fetchDocuments} />
          </CardContent>
        </Card>

        {/* Submitted Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Your Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SubmittedDocuments documents={documents} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
