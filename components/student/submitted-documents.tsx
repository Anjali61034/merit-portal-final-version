"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface Document {
  id: string
  type: string
  fileName: string
  extractedData: any
  points: number
  uploadedAt: string
}

export default function SubmittedDocuments({ documents }: { documents: Document[] }) {
  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/student/documents?id=${id}`, { method: "DELETE" })
      window.location.reload() // or better: re-fetch documents from parent
    } catch (err) {
      console.error("Error deleting document:", err)
    }
  }

  if (documents.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        No documents uploaded yet. Start by uploading your marksheet or certificates.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <Card key={doc.id}>
          <CardContent className="pt-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{doc.fileName}</h3>
                  <Badge variant="outline" className="capitalize">
                    {doc.type}
                  </Badge>
                </div>

               <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
  {doc.type === "marksheet" && doc.extractedData.cgpa && (
    <div>
      <p className="text-gray-600">CGPA</p>
      <p className="font-semibold">{doc.extractedData.cgpa}</p>
      <p className="text-gray-600 mt-1">Sgpas</p>
      <ul className="list-disc ml-4">
        {doc.extractedData.sgpas?.map((sgpa: string, idx: number) => (
          <li key={idx}>{sgpa}</li>
        ))}
      </ul>
    </div>
  )}

  {doc.type === "certificate" && doc.extractedData.category && (
    <>
      <div>
        <p className="text-gray-600">Category</p>
        <p className="font-semibold">{doc.extractedData.category}</p>
      </div>
      <div>
        <p className="text-gray-600">Certificate Type</p>
        <p className="font-semibold">{doc.extractedData.cert_type}</p>
      </div>
      <div>
        <p className="text-gray-600">Rank</p>
        <p className="font-semibold">{doc.extractedData.rank || "-"}</p>
      </div>
      <div>
        <p className="text-gray-600">Leadership Role</p>
        <p className="font-semibold">{doc.extractedData.is_lead ? "Yes" : "No"}</p>
      </div>
    </>
  )}
</div>


                <div className="mt-3 pt-3 border-t flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Points: <span className="font-semibold text-blue-600">{doc.points}</span>
                  </span>
                  <span className="text-xs text-gray-500">{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:bg-red-50"
                onClick={() => handleDelete(doc.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
