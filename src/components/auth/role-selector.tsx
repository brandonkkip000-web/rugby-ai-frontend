import { UserRole, ROLE_CAPABILITIES } from '@/types/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Users2, User, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RoleSelectorProps {
  selectedRole: UserRole | null
  onRoleSelect: (role: UserRole) => void
  className?: string
}

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

export function RoleSelector({ selectedRole, onRoleSelect, className }: RoleSelectorProps) {
  const roles: UserRole[] = ['admin', 'coach', 'player', 'fan']

  return (
    <div className={cn('space-y-4', className)}>
      <div className='text-center space-y-2'>
        <h3 className='text-lg font-semibold'>Select Your Role</h3>
        <p className='text-sm text-muted-foreground'>
          Choose the role that best describes your relationship with Kenya Rugby Analytics
        </p>
      </div>
      
      <div className='grid gap-3'>
        {roles.map((role) => {
          const Icon = roleIcons[role]
          const isSelected = selectedRole === role
          
          return (
            <Card 
              key={role}
              className={cn(
                'cursor-pointer transition-all hover:shadow-md',
                isSelected && 'ring-2 ring-primary'
              )}
              onClick={() => onRoleSelect(role)}
            >
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-3'>
                    <div className={cn(
                      'p-2 rounded-full',
                      roleColors[role]
                    )}>
                      <Icon className='h-4 w-4' />
                    </div>
                    <div>
                      <CardTitle className='text-base capitalize'>{role}</CardTitle>
                      <CardDescription className='text-xs'>
                        {role === 'admin' && 'System Administrator'}
                        {role === 'coach' && 'Team Coach'}
                        {role === 'player' && 'Rugby Player'}
                        {role === 'fan' && 'Rugby Enthusiast'}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge 
                    variant={isSelected ? 'default' : 'outline'}
                    className={cn(
                      'text-xs',
                      isSelected && roleColors[role]
                    )}
                  >
                    {isSelected ? 'Selected' : 'Select'}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className='pt-0'>
                <div className='space-y-2'>
                  <p className='text-xs font-medium text-muted-foreground'>Capabilities:</p>
                  <div className='flex flex-wrap gap-1'>
                    {ROLE_CAPABILITIES[role].slice(0, 3).map((capability, index) => (
                      <Badge key={index} variant="secondary" className='text-xs'>
                        {capability}
                      </Badge>
                    ))}
                    {ROLE_CAPABILITIES[role].length > 3 && (
                      <Badge variant="secondary" className='text-xs'>
                        +{ROLE_CAPABILITIES[role].length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
