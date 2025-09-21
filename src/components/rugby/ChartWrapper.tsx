import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface ChartWrapperProps {
  title: string
  description?: string
  children: React.ReactNode
  isLoading?: boolean
  className?: string
  action?: React.ReactNode
}

export function ChartWrapper({
  title,
  description,
  children,
  isLoading = false,
  className,
  action
}: ChartWrapperProps) {
  if (isLoading) {
    return (
      <Card className={cn('', className)}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {action && <div>{action}</div>}
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-32 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn('', className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {action && <div>{action}</div>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}
