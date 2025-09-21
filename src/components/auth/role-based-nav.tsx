import { UserRole, ROLE_PERMISSIONS } from '@/types/auth'
import { useAuthStore } from '@/stores/auth-store'
import { Badge } from '@/components/ui/badge'
import { Shield, Users2, User, Heart } from 'lucide-react'

const roleIcons = {
  admin: Shield,
  coach: Users2,
  player: User,
  fan: Heart
}

const roleColors = {
  admin: 'bg-red-100 text-red-800 border-red-200',
  coach: 'bg-blue-100 text-blue-800 border-blue-200',
  player: 'bg-green-100 text-green-800 border-green-200',
  fan: 'bg-purple-100 text-purple-800 border-purple-200'
}

export function RoleBasedNav() {
  const { user } = useAuthStore()
  
  if (!user) return null

  const Icon = roleIcons[user.role]
  
  return (
    <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg">
      <div className={`p-1.5 rounded-full ${roleColors[user.role]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium capitalize">{user.role}</span>
        <span className="text-xs text-muted-foreground">
          {user.permissions.length} permissions
        </span>
      </div>
      <Badge 
        variant="outline" 
        className={`text-xs ${roleColors[user.role]}`}
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
  const { user } = useAuthStore()
  
  if (!user) return <>{fallback}</>
  
  const hasPermission = user.permissions.includes(permission) || 
                       ROLE_PERMISSIONS[user.role].includes(permission)
  
  return hasPermission ? <>{children}</> : <>{fallback}</>
}
