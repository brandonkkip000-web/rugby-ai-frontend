import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trophy, MapPin, User, Users } from 'lucide-react'
import type { Team } from '@/services/api'
import { cn } from '@/lib/utils'
import { useNavigate } from '@tanstack/react-router'

interface TeamCardProps {
  team: Team
  showStats?: boolean
  variant?: 'default' | 'compact'
  className?: string
}

type UITeam = Team & {
  location?: string
  founded?: number | string
  coach?: string
  captain?: string
  stats: Team['stats'] & { penalties?: number; conversions?: number }
}

export function TeamCard({ 
  team, 
  showStats = true, 
  variant = 'default',
  className 
}: TeamCardProps) {
  const navigate = useNavigate()
  const t = team as UITeam

  const handleViewTeam = () => {
    navigate({ to: `/teams/${t.id}` })
  }

  if (variant === 'compact') {
    return (
      <Card 
        className={cn('cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]', className)}
        onClick={handleViewTeam}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: t.colors[0] }}
              >
                {t.shortName.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold">{t.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {t.location ?? '—'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">{t.stats.points}</div>
              <div className="text-xs text-muted-foreground">Points</div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card 
      className={cn('cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]', className)}
      onClick={handleViewTeam}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: t.colors[0] }}
            >
              {t.shortName.charAt(0)}
            </div>
            <div>
              <CardTitle className="text-lg">{t.name}</CardTitle>
              <p className="text-sm text-muted-foreground flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {(t.location ?? '—')} • Founded {t.founded ?? '—'}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Trophy className="w-3 h-3 mr-1" />
            {t.stats.points} pts
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {showStats && (
          <>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{t.stats.wins}</div>
                <div className="text-xs text-muted-foreground">Wins</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{t.stats.losses}</div>
                <div className="text-xs text-muted-foreground">Losses</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{t.stats.tries}</div>
                <div className="text-xs text-muted-foreground">Tries</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center">
                  <User className="w-3 h-3 mr-1" />
                  Coach: {t.coach ?? '—'}
                </span>
                <span className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  Captain: {t.captain ?? '—'}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-green-50 p-2 rounded">
                <div className="font-medium">Possession</div>
                <div className="text-green-600 font-bold">{t.stats.possession}%</div>
              </div>
              <div className="bg-blue-50 p-2 rounded">
                <div className="font-medium">Territory</div>
                <div className="text-blue-600 font-bold">{t.stats.territory}%</div>
              </div>
            </div>
          </>
        )}
        
        <Button variant="outline" size="sm" className="w-full">
          View Team Details
        </Button>
      </CardContent>
    </Card>
  )
}
