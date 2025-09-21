import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
    label?: string
  }
  variant?: 'default' | 'success' | 'warning' | 'danger'
  className?: string
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = 'default',
  className
}: StatCardProps) {
  const variantStyles = {
    default: 'border-border',
    success: 'border-green-200 bg-green-50/50',
    warning: 'border-yellow-200 bg-yellow-50/50',
    danger: 'border-red-200 bg-red-50/50'
  }

  return (
    <Card className={cn('transition-all hover:shadow-md', variantStyles[variant], className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <Icon className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <Badge 
              variant={trend.isPositive ? 'default' : 'destructive'}
              className="text-xs"
            >
              {trend.isPositive ? '+' : ''}{trend.value}%
            </Badge>
            {trend.label && (
              <span className="text-xs text-muted-foreground ml-2">
                {trend.label}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
