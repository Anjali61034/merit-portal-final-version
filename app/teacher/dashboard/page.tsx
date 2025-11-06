"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Download } from "lucide-react"

interface Student {
  id: string
  name: string
  rollNo: string
  course: string
  year: string
  totalPoints: number
  documentsCount: number
  documents?: any[]
}

export default function TeacherDashboard() {
  const [user, setUser] = useState<any>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      fetchStudents(parsedUser.id)
    }
  }, [])

  const fetchStudents = async (teacherId: string) => {
    try {
      const res = await fetch(`/api/teacher/students?teacherId=${teacherId}`)
      const data = await res.json()
      setStudents(data.students || [])
      setFilteredStudents(data.students || [])
    } catch (err) {
      console.error("Error fetching students:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    const filtered = students.filter(
      (s) => s.name.toLowerCase().includes(term) || s.rollNo.toLowerCase().includes(term),
    )
    setFilteredStudents(filtered)
  }

  if (!user) return <div>Loading...</div>

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome, Prof. {user.name} | Department: {user.department}
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Student Submissions</CardTitle>
            <CardDescription>Search and review uploaded documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-center">
              <Search className="text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name or roll no..."
                value={searchTerm}
                onChange={handleSearch}
                className="flex-1"
              />
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading students...</p>
        ) : filteredStudents.length === 0 ? (
          <p className="text-center text-gray-500">No submissions found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="border shadow-sm">
                <CardHeader>
                  <CardTitle>{student.name}</CardTitle>
                  <CardDescription>
                    {student.course} — Year {student.year}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p><strong>Roll No:</strong> {student.rollNo}</p>
                  <p><strong>Total Points:</strong> {student.totalPoints}</p>
                  <p><strong>Documents:</strong> {student.documentsCount}</p>

                  {/* 👇 Show uploaded documents if available */}
                  {student.documents?.map((doc) => (
                    <div key={doc.id} className="mt-3 border-t pt-3">
                      <p className="text-sm font-medium">{doc.fileName}</p>
                      <p className="text-xs text-gray-600 mb-2">{doc.type} | {doc.points} pts</p>
                      {doc.fileUrl && (
                        <img
                          src={doc.fileUrl}
                          alt={doc.fileName}
                          className="rounded-lg border shadow w-full max-h-60 object-contain"
                        />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
