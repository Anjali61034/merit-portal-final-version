"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Download } from "lucide-react"
import StudentSubmissionModal from "@/components/teacher/student-submission-modal"
import MeritListModal from "@/components/teacher/merit-list-modal"

interface Student {
  id: string
  name: string
  rollNo: string
  course: string
  year: string
  totalPoints: number
  documentsCount: number
}

export default function TeacherDashboard() {
  const [user, setUser] = useState<any>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showMeritList, setShowMeritList] = useState(false)
  const [filterCourse, setFilterCourse] = useState("all")
  const [filterYear, setFilterYear] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

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
      applyFilters(data.students || [], "", "all", "all")
    } catch (err) {
      console.error("Error fetching students:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = (studentList: Student[], search: string, course: string, year: string) => {
    let filtered = studentList

    if (search) {
      const term = search.toLowerCase()
      filtered = filtered.filter(
        (student) => student.name.toLowerCase().includes(term) || student.rollNo.toLowerCase().includes(term),
      )
    }

    if (course !== "all") {
      filtered = filtered.filter((student) => student.course === course)
    }

    if (year !== "all") {
      filtered = filtered.filter((student) => student.year === year)
    }

    setFilteredStudents(filtered)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    applyFilters(students, term, filterCourse, filterYear)
  }

  const handleCourseFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const course = e.target.value
    setFilterCourse(course)
    applyFilters(students, searchTerm, course, filterYear)
  }

  const handleYearFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value
    setFilterYear(year)
    applyFilters(students, searchTerm, filterCourse, year)
  }

  const handleViewStudent = (student: Student) => {
  console.log("📨 Opening modal for student:", student) // debug
  setSelectedStudent({
    ...student,
    rollNo: student.rollNo || "",
    name: student.name || "",
  })
  setShowModal(true)
}


  const handleGenerateMeritList = () => {
    setShowMeritList(true)
  }

  if (!user) {
    return <div>Loading...</div>
  }

  const uniqueCourses = [...new Set(students.map((s) => s.course))]
  const uniqueYears = [...new Set(students.map((s) => s.year))]

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome, Prof. {user.name} | Department: {user.department}
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Manage Students</CardTitle>
            <CardDescription>View and evaluate student submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search by student name or roll number..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10"
                  />
                </div>
                <Button onClick={handleGenerateMeritList} className="gap-2">
                  <Download className="w-4 h-4" />
                  Merit List
                </Button>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Filter by Course</label>
                  <select
                    value={filterCourse}
                    onChange={handleCourseFilter}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Courses</option>
                    {uniqueCourses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Filter by Year</label>
                  <select
                    value={filterYear}
                    onChange={handleYearFilter}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Years</option>
                    {uniqueYears.sort().map((year) => (
                      <option key={year} value={year}>
                        Year {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Grid */}
        {isLoading ? (
          <p className="text-center text-gray-500 py-8">Loading students...</p>
        ) : filteredStudents.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No students found</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((student) => (
              <Card
                key={student.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleViewStudent(student)}
              >
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-600">Roll No: {student.rollNo}</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Course</span>
                      <span className="font-medium">{student.course}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Year</span>
                      <span className="font-medium">{student.year}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Documents</span>
                      <Badge variant="secondary">{student.documentsCount}</Badge>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Points</span>
                      <span className="text-2xl font-bold text-blue-600">{student.totalPoints}</span>
                    </div>
                  </div>

                  <Button className="w-full mt-4" onClick={() => handleViewStudent(student)}>
                    View Submissions
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Student Submission Modal */}
        {selectedStudent && (
          <StudentSubmissionModal isOpen={showModal} onClose={() => setShowModal(false)} student={selectedStudent} />
        )}

        {/* Merit List Modal */}
        {showMeritList && (
          <MeritListModal isOpen={showMeritList} onClose={() => setShowMeritList(false)} students={filteredStudents} />
        )}
      </div>
    </main>
  )
}