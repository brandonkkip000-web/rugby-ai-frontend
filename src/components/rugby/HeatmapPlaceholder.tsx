import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity, Target, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeatmapPlaceholderProps {
  title: string
  description?: string
  data?: {
    label: string
    value: number
    max: number
  }[]
  className?: string
}

export function HeatmapPlaceholder({ 
  title, 
  description,
  data = [],
  className 
}: HeatmapPlaceholderProps) {
  // Do not generate any mock data. If no data is provided, we will render
  // a neutral placeholder state informing the user data will appear later.

  const getIntensityColor = (value: number, max: number) => {
    const percentage = (value / max) * 100
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 60) return 'bg-yellow-500'
    if (percentage >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getIntensityText = (value: number, max: number) => {
    const percentage = (value / max) * 100
    if (percentage >= 80) return 'Excellent'
    if (percentage >= 60) return 'Good'
    if (percentage >= 40) return 'Average'
    return 'Needs Improvement'
  }

  return (
    <Card className={cn('', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              {title}
            </CardTitle>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
          <Badge variant="outline" className="text-xs">
            <Target className="w-3 h-3 mr-1" />
            Performance Heatmap
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {data.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Performance heatmap will appear here once data is available.
            </div>
          ) : (
            <>
          {/* Legend */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Performance Level</span>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Excellent</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span>Good</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span>Average</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Poor</span>
              </div>
            </div>
          </div>

          {/* Heatmap Grid */}
          <div className="grid grid-cols-2 gap-4">
            {data.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.value}/{item.max}
                  </span>
                </div>
                
                <div className="relative">
                  <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        'h-full transition-all duration-500 flex items-center justify-end pr-2',
                        getIntensityColor(item.value, item.max)
                      )}
                      style={{ width: `${(item.value / item.max) * 100}%` }}
                    >
                      <span className="text-white text-xs font-medium">
                        {Math.round((item.value / item.max) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      'text-xs',
                      item.value / item.max >= 0.8 ? 'bg-green-100 text-green-800' :
                      item.value / item.max >= 0.6 ? 'bg-yellow-100 text-yellow-800' :
                      item.value / item.max >= 0.4 ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    )}
                  >
                    {getIntensityText(item.value, item.max)}
                  </Badge>
                  
                  {item.value / item.max >= 0.8 && (
                    <Zap className="w-3 h-3 text-yellow-500" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-green-600">
                  {data.filter(item => item.value / item.max >= 0.8).length}
                </div>
                <div className="text-xs text-muted-foreground">Excellent</div>
              </div>
              <div>
                <div className="text-lg font-bold text-yellow-600">
                  {data.filter(item => item.value / item.max >= 0.6 && item.value / item.max < 0.8).length}
                </div>
                <div className="text-xs text-muted-foreground">Good</div>
              </div>
              <div>
                <div className="text-lg font-bold text-orange-600">
                  {data.filter(item => item.value / item.max < 0.6).length}
                </div>
                <div className="text-xs text-muted-foreground">Needs Work</div>
              </div>
            </div>
          </div>
          </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
