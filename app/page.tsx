import HeaderNav from "@/components/header-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Award, Upload, BarChart3, CheckCircle, ArrowRight, Zap } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeaderNav />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium hover:bg-blue-200 transition">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              IQAC Meritorious Award System
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight text-balance">
              Recognize Excellence, Track Merit
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Streamline the merit evaluation process with automated document extraction, transparent scoring, and fair
              recognition of student achievements.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/auth/signup?role=student">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg group">
                  Get Started as Student
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
                </Button>
              </Link>
              <Link href="/auth/signup?role=teacher">
  <Button size="lg" variant="outline" className="text-lg bg-transparent border-2 hover:bg-gray-50">
    Get Started as Teacher
    <ArrowRight className="ml-2 w-5 h-5" />
  </Button>
</Link>

            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-20">
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-300 transition duration-300">
              <div className="text-3xl font-bold text-blue-600">95%</div>
              <p className="text-gray-600 mt-2">Accuracy in OCR Extraction</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-300 transition duration-300">
              <div className="text-3xl font-bold text-indigo-600">50+</div>
              <p className="text-gray-600 mt-2">Documents Processed</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-300 transition duration-300">
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <p className="text-gray-600 mt-2">Transparent Scoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4 text-balance">Powerful Features</h2>
          <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto">
            Everything you need to manage merit evaluation efficiently and fairly
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-gray-200 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <CardHeader>
                <Upload className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle>Smart Document Upload</CardTitle>
                <CardDescription>Upload marksheets and certificates with automatic validation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Support for PDF, JPG, and PNG formats. Drag-and-drop interface for easy uploads.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <CardHeader>
                <BarChart3 className="w-12 h-12 text-indigo-600 mb-4" />
                <CardTitle>OCR Extraction</CardTitle>
                <CardDescription>Automated data extraction with Python-powered OCR technology</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  CGPA detection from marksheets and event details from certificates with 95% accuracy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <CardHeader>
                <Zap className="w-12 h-12 text-indigo-600 mb-4" />
                <CardTitle>Lightning Fast Processing</CardTitle>
                <CardDescription>Instant extraction and point calculation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Automated data extraction with instant processing and real-time point calculation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <CardHeader>
                <Award className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle>Merit Ranking</CardTitle>
                <CardDescription>Transparent scoring based on IQAC criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Automatic ranking with visual identification of top performers and customizable filters.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <CardHeader>
                <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle>Teacher Dashboard</CardTitle>
                <CardDescription>Manage submissions and generate merit lists</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Review all student submissions, export as PDF/CSV, and manage merit lists seamlessly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Portal Features Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16 text-balance">For Every Role</h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Student Portal */}
            <div className="space-y-6 p-8 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Student Portal</h3>
                <p className="text-gray-600 mb-6">Submit your achievements and track your merit points in real-time</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Easy document upload with drag-and-drop</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">View extracted scores and points</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Track submission status</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Transparent point calculation</span>
                </li>
              </ul>
              <Link href="/auth/signup?role=student">
                <Button className="bg-blue-600 hover:bg-blue-700 mt-6 w-full group">
                  Start as Student
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" />
                </Button>
              </Link>
            </div>

            {/* Teacher Portal */}
            <div className="space-y-6 p-8 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Teacher Portal</h3>
                <p className="text-gray-600 mb-6">Review submissions and generate comprehensive merit lists</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">View all student submissions by department</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Click-to-view student documents</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Generate ranked merit lists with medals</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Export as PDF or CSV reports</span>
                </li>
              </ul>
              <Link href="/auth/login?role=teacher">
                <Button variant="outline" className="mt-6 w-full bg-transparent border-2 hover:bg-gray-50 group">
                  Teacher Login
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto text-center text-white max-w-2xl">
          <h2 className="text-4xl font-bold mb-6 text-balance">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the merit portal and streamline your achievement tracking today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup?role=student">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Sign Up as Student
              </Button>
            </Link>
            <Link href="/auth/login?role=teacher">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 bg-transparent">
                Teacher Access
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Maitreyi College Merit Portal. All rights reserved.</p>
          <p className="mt-2 text-sm">IQAC Meritorious Student Award System</p>
        </div>
      </footer>
    </main>
  )
}
