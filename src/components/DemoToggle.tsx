import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface DemoToggleProps {
  isDemoMode: boolean
  onToggle: (enabled: boolean) => void
}

export function DemoToggle({ isDemoMode, onToggle }: DemoToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="demo-mode"
        checked={isDemoMode}
        onCheckedChange={onToggle}
      />
      <Label htmlFor="demo-mode" className="text-sm">
        Demo Mode
      </Label>
      {isDemoMode && (
        <Badge variant="warning" className="text-xs">
          Sample Data
        </Badge>
      )}
    </div>
  )
}