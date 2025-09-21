export type UserRole = 'admin' | 'coach' | 'player' | 'fan'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  teamId?: string // For coaches and players
  playerId?: string // For players
  permissions: string[]
  exp: number
}

export interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  setAccessToken: (token: string) => void
  logout: () => void
}

// Role-based permissions
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: [
    'view:dashboard',
    'view:teams',
    'view:players',
    'view:comparisons',
    'view:insights',
    'edit:teams',
    'edit:players',
    'edit:matches',
    'delete:teams',
    'delete:players',
    'manage:users',
    'manage:system'
  ],
  coach: [
    'view:dashboard',
    'view:teams',
    'view:players',
    'view:comparisons',
    'view:insights',
    'edit:team:own',
    'edit:players:team',
    'view:team:analytics'
  ],
  player: [
    'view:dashboard',
    'view:teams',
    'view:players',
    'view:own:stats',
    'view:team:basic'
  ],
  fan: [
    'view:dashboard',
    'view:teams',
    'view:players',
    'view:comparisons'
  ]
}

// Role capabilities descriptions
export const ROLE_CAPABILITIES: Record<UserRole, string[]> = {
  admin: [
    'Full system access',
    'Manage all teams and players',
    'Edit match results',
    'Access advanced analytics',
    'User management',
    'System configuration'
  ],
  coach: [
    'Team management',
    'Player performance tracking',
    'Match strategy analysis',
    'Team-specific insights',
    'Player statistics access'
  ],
  player: [
    'Personal statistics',
    'Team information',
    'Performance tracking',
    'Match schedules'
  ],
  fan: [
    'View team standings',
    'Player statistics',
    'Match results',
    'Basic comparisons'
  ]
}
