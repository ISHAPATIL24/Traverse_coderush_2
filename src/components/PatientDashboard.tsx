import { useState } from "react"
import { 
  Upload, 
  FileText, 
  Activity, 
  CheckCircle, 
  AlertCircle,
  Download,
  Brain,
  TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MedicalCard, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/medical-card"
import { EEGChart, generateNormalEEG, generateAbnormalEEG } from "@/components/EEGChart"

interface UploadedFile {
  name: string
  uploadDate: string
  status: 'processing' | 'completed' | 'error'
  riskScore?: number
}

export function PatientDashboard() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      name: "eeg_recording_2024_01_15.csv",
      uploadDate: "2024-01-15",
      status: "completed",
      riskScore: 23
    }
  ])
  const [isDragging, setIsDragging] = useState(false)

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return
    
    Array.from(files).forEach(file => {
      const newFile: UploadedFile = {
        name: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'processing'
      }
      setUploadedFiles(prev => [...prev, newFile])
      
      // Simulate processing
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.name === file.name 
              ? { ...f, status: 'completed', riskScore: Math.floor(Math.random() * 30) + 10 }
              : f
          )
        )
      }, 3000)
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const latestReport = uploadedFiles.find(f => f.status === 'completed')

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary-muted/10">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Patient Portal</h1>
              <p className="text-muted-foreground">Upload EEG data and view your health insights</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-accent/10">
                <Activity className="h-3 w-3 mr-1" />
                Secure Upload
              </Badge>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.location.reload()}
              >
                Switch Role
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            <MedicalCard>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload EEG Data
                </CardTitle>
                <CardDescription>
                  Upload your EEG files in CSV or EDF format for AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragging 
                      ? 'border-primary bg-primary/5' 
                      : 'border-muted-foreground/25 hover:border-primary/50'
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setIsDragging(true)
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Drop your EEG files here</h3>
                  <p className="text-muted-foreground mb-4">
                    Supports CSV and EDF formats up to 50MB
                  </p>
                  <Button
                    onClick={() => {
                      const input = document.createElement('input')
                      input.type = 'file'
                      input.accept = '.csv,.edf'
                      input.multiple = true
                      input.onchange = (e) => handleFileUpload((e.target as HTMLInputElement).files)
                      input.click()
                    }}
                  >
                    Choose Files
                  </Button>
                </div>
              </CardContent>
            </MedicalCard>

            {/* Latest Analysis */}
            {latestReport && (
              <MedicalCard>
                <CardHeader>
                  <CardTitle>Latest Analysis Results</CardTitle>
                  <CardDescription>
                    Analysis from {latestReport.uploadDate}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Overall Assessment</h4>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span className="text-success font-medium">Low Risk</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your EEG patterns show normal brain activity with no significant markers 
                        for schizophrenia risk.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Risk Score</h4>
                      <div className="text-3xl font-bold text-success">{latestReport.riskScore}%</div>
                      <Progress value={latestReport.riskScore} className="h-2" />
                    </div>
                  </div>

                  <EEGChart 
                    data={generateNormalEEG()} 
                    title="Your EEG Pattern"
                    color="hsl(var(--accent))"
                    height={150}
                  />

                  <div className="flex gap-3">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </MedicalCard>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upload History */}
            <MedicalCard>
              <CardHeader>
                <CardTitle className="text-lg">Upload History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate">{file.name}</span>
                      {file.status === 'completed' && <CheckCircle className="h-4 w-4 text-success" />}
                      {file.status === 'processing' && <Activity className="h-4 w-4 text-primary animate-spin" />}
                      {file.status === 'error' && <AlertCircle className="h-4 w-4 text-destructive" />}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {file.uploadDate}
                    </div>
                    {file.status === 'processing' && (
                      <Progress value={60} className="h-1" />
                    )}
                    {file.riskScore && (
                      <div className="text-xs">
                        Risk Score: <span className="font-medium">{file.riskScore}%</span>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </MedicalCard>

            {/* Health Tips */}
            <MedicalCard variant="success">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Brain Health Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="space-y-2">
                  <h4 className="font-medium">Maintain Regular Sleep</h4>
                  <p className="text-muted-foreground">7-9 hours of quality sleep supports healthy brain waves</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Stay Physically Active</h4>
                  <p className="text-muted-foreground">Regular exercise improves overall brain function</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Manage Stress</h4>
                  <p className="text-muted-foreground">Practice meditation or relaxation techniques</p>
                </div>
              </CardContent>
            </MedicalCard>

            {/* Contact Support */}
            <MedicalCard>
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Contact our medical team if you have questions about your results.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </MedicalCard>
          </div>
        </div>
      </div>
    </div>
  )
}