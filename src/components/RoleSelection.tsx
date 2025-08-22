import { UserCog, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MedicalCard, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/medical-card"

interface RoleSelectionProps {
  onRoleSelect: (role: 'doctor' | 'patient') => void
}

export function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-muted/20 to-accent/10 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            NeuroWatch EEG Platform
          </h1>
          <p className="text-xl text-muted-foreground">
            Advanced EEG monitoring and early schizophrenia detection using AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <MedicalCard 
            variant="elevated" 
            className="cursor-pointer hover:scale-105 transition-transform"
            onClick={() => onRoleSelect('doctor')}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCog className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Medical Professional</CardTitle>
              <CardDescription className="text-base">
                Access comprehensive patient analysis, EEG comparisons, and AI-powered diagnostics
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                className="w-full h-12 text-lg font-medium bg-gradient-to-r from-primary to-primary-muted hover:opacity-90"
                onClick={() => onRoleSelect('doctor')}
              >
                Enter Doctor Dashboard
              </Button>
            </CardContent>
          </MedicalCard>

          <MedicalCard 
            variant="elevated"
            className="cursor-pointer hover:scale-105 transition-transform"
            onClick={() => onRoleSelect('patient')}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-accent-foreground" />
              </div>
              <CardTitle className="text-2xl">Patient & Family</CardTitle>
              <CardDescription className="text-base">
                Upload EEG data, view simplified reports, and track health insights
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                variant="outline"
                className="w-full h-12 text-lg font-medium border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                onClick={() => onRoleSelect('patient')}
              >
                Enter Patient Portal
              </Button>
            </CardContent>
          </MedicalCard>
        </div>

        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>Secure • HIPAA Compliant • AI-Powered Analysis</p>
        </div>
      </div>
    </div>
  )
}