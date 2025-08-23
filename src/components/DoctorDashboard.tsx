import { useState } from "react"
import { 
  Activity, 
  AlertTriangle, 
  Brain, 
  CheckCircle, 
  FileText, 
  TrendingUp, 
  Users,
  Download,
  Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MedicalCard, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/medical-card"
import { EEGChart, generateNormalEEG, generateAbnormalEEG } from "@/components/EEGChart"

interface Patient {
  id: string
  name: string
  age: number
  riskScore: number
  lastScan: string
  status: 'normal' | 'warning' | 'alert'
  confidence: number
}

const mockPatients: Patient[] = [
  const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "Aarav Sharma",
    age: 28,
    riskScore: 85,
    lastScan: "2024-01-15",
    status: "alert",
    confidence: 92
  },
  {
    id: "P002",
    name: "Priya Nair",
    age: 34,
    riskScore: 35,
    lastScan: "2024-01-14",
    status: "warning",
    confidence: 78
  },
  {
    id: "P003",
    name: "Rohan Patel",
    age: 42,
    riskScore: 12,
    lastScan: "2024-01-13",
    status: "normal",
    confidence: 94
  }
];
  

export function DoctorDashboard() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(mockPatients[0])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'alert': return 'destructive'
      case 'warning': return 'warning'
      case 'normal': return 'success'
      default: return 'secondary'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'alert': return <AlertTriangle className="h-4 w-4" />
      case 'warning': return <TrendingUp className="h-4 w-4" />
      case 'normal': return <CheckCircle className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-muted/10 to-accent/5">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Doctor Dashboard</h1>
              <p className="text-muted-foreground">EEG Analysis & Patient Management</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-primary/10">
                <Brain className="h-3 w-3 mr-1" />
                AI Analysis Active
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Reports
              </Button>
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
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Patient List */}
          <div className="lg:col-span-1">
            <MedicalCard>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Patients ({mockPatients.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockPatients.map((patient) => (
                  <div 
                    key={patient.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedPatient?.id === patient.id 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{patient.name}</span>
                      <Badge variant={getStatusColor(patient.status)} className="text-xs">
                        {getStatusIcon(patient.status)}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>Age: {patient.age}</div>
                      <div>Risk: {patient.riskScore}%</div>
                      <div>Last scan: {patient.lastScan}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </MedicalCard>
          </div>

          {/* Main Analysis Area */}
          <div className="lg:col-span-3 space-y-6">
            {selectedPatient && (
              <>
                {/* Patient Overview */}
                <div className="grid md:grid-cols-3 gap-4">
                  <MedicalCard variant={selectedPatient.status === 'alert' ? 'alert' : 'default'}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Risk Score</p>
                          <p className="text-2xl font-bold text-destructive">{selectedPatient.riskScore}%</p>
                        </div>
                        <AlertTriangle className="h-8 w-8 text-destructive" />
                      </div>
                    </CardContent>
                  </MedicalCard>

                  <MedicalCard>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">AI Confidence</p>
                          <p className="text-2xl font-bold text-primary">{selectedPatient.confidence}%</p>
                        </div>
                        <Brain className="h-8 w-8 text-primary" />
                      </div>
                    </CardContent>
                  </MedicalCard>

                  <MedicalCard>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Last Analysis</p>
                          <p className="text-lg font-semibold">{selectedPatient.lastScan}</p>
                        </div>
                        <Activity className="h-8 w-8 text-accent" />
                      </div>
                    </CardContent>
                  </MedicalCard>
                </div>

                {/* EEG Comparison */}
                <MedicalCard>
                  <CardHeader>
                    <CardTitle>EEG Wave Comparison</CardTitle>
                    <CardDescription>
                      Normal baseline vs. {selectedPatient.name}'s current EEG patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <EEGChart 
                        data={generateNormalEEG()} 
                        title="Normal Baseline"
                        color="hsl(var(--success))"
                      />
                      <EEGChart 
                        data={generateAbnormalEEG()} 
                        title={`${selectedPatient.name} - Current`}
                        color="hsl(var(--destructive))"
                        showAbnormalRegions={true}
                      />
                    </div>
                  </CardContent>
                </MedicalCard>

                {/* Detailed Analysis */}
                <MedicalCard>
                  <CardHeader>
                    <CardTitle>AI Analysis Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 border rounded-lg bg-destructive/5">
                        <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                        <div>
                          <h4 className="font-medium text-destructive">Abnormal EEG Patterns Detected</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Unusual theta wave activity in frontal regions (15-18s, 25-28s). 
                            Patterns consistent with early schizophrenia markers.
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h5 className="font-medium mb-2">Frequency Analysis</h5>
                          <ul className="space-y-1 text-muted-foreground">
                            <li>Alpha (8-12 Hz): Reduced activity</li>
                            <li>Beta (13-30 Hz): Elevated</li>
                            <li>Theta (4-7 Hz): <span className="text-destructive">Abnormally high</span></li>
                            <li>Delta (0.5-4 Hz): Within normal range</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Recommendations</h5>
                          <ul className="space-y-1 text-muted-foreground">
                            <li>Schedule follow-up EEG in 2 weeks</li>
                            <li>Consider psychiatric consultation</li>
                            <li>Monitor for cognitive symptoms</li>
                            <li>Review family history</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </MedicalCard>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
