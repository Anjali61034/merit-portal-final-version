"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface StudentDocument {
  id: string
  type: string
  fileName: string
  extractedData: any
  points: number
  uploadedAt: string
  status: string
}

interface Student {
  id: string
  name: string
  rollNo: string
  course: string
  totalPoints: number
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  student: Student
}

export default function StudentSubmissionModal({ isOpen, onClose, student }: ModalProps) {
  const [documents, setDocuments] = useState<StudentDocument[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      fetchStudentDocuments()
    }
  }, [isOpen])

  const fetchStudentDocuments = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/teacher/student-documents?studentId=${student.id}`)
      const data = await res.json()
      setDocuments(data.documents || [])
    } catch (err) {
      console.error("Error fetching documents:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{student.name}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Roll No: {student.rollNo} | Course: {student.course}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Points Summary */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Merit Points</p>
            <p className="text-3xl font-bold text-blue-600">{student.totalPoints}</p>
          </div>

          {/* Documents */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Submitted Documents</h3>
            {isLoading ? (
              <p className="text-gray-500">Loading submissions...</p>
            ) : documents.length === 0 ? (
              <p className="text-gray-500">No documents submitted yet</p>
            ) : (
              <div className="space-y-4">
                {documents.map((doc) => (
                  <Card key={doc.id}>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{doc.fileName}</h4>
                          <Badge className="mt-1" variant="outline">
                            {doc.type}
                          </Badge>
                        </div>
                        <Badge
                          className={
                            doc.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : doc.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {doc.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 my-3 text-sm">
                        {doc.type === "marksheet" && doc.extractedData.cgpa && (
                          <>
                            <div>
                              <p className="text-gray-600">CGPA</p>
                              <p className="font-semibold">{doc.extractedData.cgpa}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Course Type</p>
                              <p className="font-semibold">{doc.extractedData.courseType}</p>
                            </div>
                          </>
                        )}
                        {doc.type === "certificate" && (
                          <>
                            <div>
                              <p className="text-gray-600">Event Type</p>
                              <p className="font-semibold">{doc.extractedData.eventType}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Position</p>
                              <p className="font-semibold">{doc.extractedData.position}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Level</p>
                              <p className="font-semibold">{doc.extractedData.level}</p>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="border-t pt-3 flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Points: <span className="font-semibold text-blue-600">{doc.points}</span>
                        </span>
                        <span className="text-xs text-gray-500">{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                      </div>

                      {doc.status === "pending" && (
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" className="flex-1" variant="default">
                            Approve
                          </Button>
                          <Button size="sm" className="flex-1 bg-transparent" variant="outline">
                            Review
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button className="flex-1">Export Report</Button>
            <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
