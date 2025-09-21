import { ROLE_PERMISSIONS } from '@/types/auth'
import { useAuthStore } from '@/stores/auth-store'
import { Badge } from '@/components/ui/badge'
import { Shield, Users2, User, Heart } from 'lucide-react'

const roleIcons = {
  admin: Shield,
  coach: Users2,
  player: User,
  fan: Heart
} as const

const roleColors = {
  admin: 'bg-red-100 text-red-800 border-red-200',
  coach: 'bg-blue-100 text-blue-800 border-blue-200',
  player: 'bg-green-100 text-green-800 border-green-200',
  fan: 'bg-purple-100 text-purple-800 border-purple-200'
} as const

export function RoleBasedNav() {
  const user = useAuthStore((s) => s.auth.user)
  
  if (!user) return null

  const currentRole = (Array.isArray(user.role) ? user.role[0] : user.role) as keyof typeof roleIcons
  const Icon = roleIcons[currentRole]
  
  return (
    <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg">
      <div className={`p-1.5 rounded-full ${roleColors[currentRole]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium capitalize">{currentRole}</span>
        <span className="text-xs text-muted-foreground">Role Active</span>
      </div>
      <Badge 
        variant="outline" 
        className={`text-xs ${roleColors[currentRole]}`}
      >
        Active
      </Badge>
    </div>
  )
}

export function RoleBasedAccess({ 
  permission, 
  children, 
  fallback = null 
}: { 
  permission: string
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  const user = useAuthStore((s) => s.auth.user)
  
  if (!user) return <>{fallback}</>
  
  const currentRole = (Array.isArray(user.role) ? user.role[0] : user.role) as keyof typeof ROLE_PERMISSIONS
  const hasPermission = ROLE_PERMISSIONS[currentRole].includes(permission)
  
  return hasPermission ? <>{children}</> : <>{fallback}</>
}
