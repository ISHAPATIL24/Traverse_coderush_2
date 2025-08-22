import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts'

interface EEGDataPoint {
  time: number
  amplitude: number
  isAbnormal?: boolean
}

interface EEGChartProps {
  data: EEGDataPoint[]
  title: string
  color?: string
  showAbnormalRegions?: boolean
  height?: number
}

export function EEGChart({ 
  data, 
  title, 
  color = "hsl(var(--primary))", 
  showAbnormalRegions = false,
  height = 200 
}: EEGChartProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
      <div className="border rounded-lg bg-card p-2">
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            />
            {showAbnormalRegions && (
              <>
                <ReferenceLine x={15} stroke="hsl(var(--destructive))" strokeWidth={2} strokeOpacity={0.3} />
                <ReferenceLine x={25} stroke="hsl(var(--destructive))" strokeWidth={2} strokeOpacity={0.3} />
              </>
            )}
            <Line 
              type="monotone" 
              dataKey="amplitude" 
              stroke={color}
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 3, fill: color }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// Mock EEG data generators
export function generateNormalEEG(length: number = 50): EEGDataPoint[] {
  return Array.from({ length }, (_, i) => ({
    time: i,
    amplitude: Math.sin(i * 0.3) * 0.5 + Math.sin(i * 0.1) * 0.3 + (Math.random() - 0.5) * 0.2
  }))
}

export function generateAbnormalEEG(length: number = 50): EEGDataPoint[] {
  return Array.from({ length }, (_, i) => {
    const baseAmplitude = Math.sin(i * 0.3) * 0.5 + Math.sin(i * 0.1) * 0.3
    // Add abnormal spikes in certain regions
    const abnormalSpike = (i > 15 && i < 18) || (i > 25 && i < 28) ? Math.random() * 2 : 0
    return {
      time: i,
      amplitude: baseAmplitude + abnormalSpike + (Math.random() - 0.5) * 0.3,
      isAbnormal: abnormalSpike > 0
    }
  })
}