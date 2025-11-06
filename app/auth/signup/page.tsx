"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || "student"

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    rollNo: "",
    course: "",
    year: "",
    department: "", // ✅ added department
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)

    try {
      // ✅ Save user info to localStorage for login
      const userData = {
        email: formData.email,
        name: formData.name,
        password: formData.password, // ✅ needed for login
        role: role,
        ...(role === "student" && {
          rollNo: formData.rollNo,
          course: formData.course,
          year: formData.year,
        }),
        ...(role === "teacher" && {
          department: formData.department,
        }),
      }

      localStorage.setItem("user", JSON.stringify(userData))
      setSuccess("Signup successful! Redirecting...")

      setTimeout(() => {
        if (role === "student") {
          router.push("/student/dashboard")
        } else {
          router.push("/teacher/dashboard")
        }
      }, 1000)
    } catch (err) {
      setError("Signup failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition">
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>{role === "student" ? "Student" : "Teacher"} Sign Up</CardTitle>
            <CardDescription>Create your account to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              {/* ✅ Department field for teachers only */}
              {role === "teacher" && (
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    name="department"
                    type="text"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    placeholder="Enter your department"
                  />
                </div>
              )}

              {role === "student" && (
                <>
                  <div>
                    <Label htmlFor="rollNo">Roll No</Label>
                    <Input
                      id="rollNo"
                      name="rollNo"
                      type="text"
                      value={formData.rollNo}
                      onChange={handleChange}
                      required
                      placeholder="2021001"
                    />
                  </div>

                  <div>
                    <Label htmlFor="course">Course</Label>
                    <select
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                    >
                      <option value="">Select Course</option>
                      <option value="B.Sc. Physics">B.Sc. Physics</option>
                      <option value="B.Sc. Chemistry">B.Sc. Chemistry</option>
                      <option value="B.Sc. Biology">B.Sc. Biology</option>
                      <option value="B.A. English">B.A. English</option>
                      <option value="B.A. Hindi">B.A. Hindi</option>
                      <option value="B.Com">B.Com</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="year">Year</Label>
                    <select
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                    >
                      <option value="">Select Year</option>
                      <option value="1">First Year</option>
                      <option value="2">Second Year</option>
                      <option value="3">Third Year</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="At least 6 characters"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                />
              </div>

              {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
              {success && <p className="text-green-600 text-sm bg-green-50 p-3 rounded-lg">{success}</p>}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href={`/auth/login?role=${role}`} className="text-blue-600 hover:text-blue-700 font-semibold">
                  Login here
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
