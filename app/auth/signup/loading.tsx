import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function SignupLoading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="h-8 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-4 bg-gray-200 rounded mt-2 animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
