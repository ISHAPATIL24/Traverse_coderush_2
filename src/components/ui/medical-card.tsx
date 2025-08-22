import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface MedicalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "alert" | "success" | "warning"
}

const variantClasses = {
  default: "shadow-card",
  elevated: "shadow-elevated",
  alert: "border-destructive/20 shadow-medical",
  success: "border-success/20 bg-success/5",
  warning: "border-warning/20 bg-warning/5"
}

export function MedicalCard({ 
  className, 
  variant = "default", 
  children, 
  ...props 
}: MedicalCardProps) {
  return (
    <Card 
      className={cn(
        "transition-all duration-300 hover:shadow-elevated",
        variantClasses[variant],
        className
      )} 
      {...props}
    >
      {children}
    </Card>
  )
}

export { CardContent, CardDescription, CardFooter, CardHeader, CardTitle }