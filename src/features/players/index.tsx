import { useQuery } from '@tanstack/react-query'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { StatCard } from '@/components/rugby/StatCard'
import { ChartWrapper } from '@/components/rugby/ChartWrapper'
import { HeatmapPlaceholder } from '@/components/rugby/HeatmapPlaceholder'
import { EmptyState } from '@/components/rugby/EmptyState'
import { playersApi } from '@/services/api'
import { 
  Users2, 
  Target, 
  TrendingUp, 
  Activity,
  Trophy,
  MapPin,
  User,
  Calendar
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function Players() {
  const { data: players, isLoading } = useQuery({
    queryKey: ['players'],
    queryFn: playersApi.getAll
  })

  // Calculate player statistics
  const playerStats = players ? {
    totalPlayers: players.length,
    totalTries: players.reduce((sum, player) => sum + player.stats.tries, 0),
    totalTackles: players.reduce((sum, player) => sum + player.stats.tackles, 0),
    totalMeters: players.reduce((sum, player) => sum + player.stats.metersGained, 0),
    avgAge: players.reduce((sum, player) => sum + player.age, 0) / players.length
  } : null

  // Prepare chart data
  const positionData = players?.reduce((acc, player) => {
    const existing = acc.find(item => item.position === player.position)
    if (existing) {
      existing.count += 1
    } else {
      acc.push({ position: player.position, count: 1 })
    }
    return acc
  }, [] as { position: string; count: number }[]) || []

  const performanceData = players?.map(player => ({
    name: player.name.split(' ')[0], // First name only for chart
    tries: player.stats.tries,
    tackles: player.stats.tackles,
    meters: player.stats.metersGained
  })) || []

  const ageData = players?.map(player => ({
    name: player.name.split(' ')[0],
    age: player.age,
    tries: player.stats.tries,
    tackles: player.stats.tackles
  })) || []

  const topNav = [
    {
      title: 'Overview',
      href: '/players',
      isActive: true,
      disabled: false,
    },
    {
      title: 'By Position',
      href: '/players/positions',
      isActive: false,
      disabled: true,
    },
    {
      title: 'Statistics',
      href: '/players/stats',
      isActive: false,
      disabled: true,
    },
    {
      title: 'Top Performers',
      href: '/players/top',
      isActive: false,
      disabled: true,
    },
  ]

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <TopNav links={topNav} />
        <div className='ms-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-6 flex items-center justify-between space-y-2'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight flex items-center'>
              <Users2 className='w-8 h-8 mr-3 text-blue-600' />
              Kenya Premier Rugby Players
            </h1>
            <p className='text-muted-foreground'>
              Player profiles, statistics, and performance analytics
            </p>
          </div>
        </div>

        {/* Player Overview Stats */}
        {playerStats && (
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-6'>
            <StatCard
              title="Total Players"
              value={playerStats.totalPlayers}
              description="Registered players"
              icon={Users2}
              variant="default"
            />
            <StatCard
              title="Total Tries"
              value={playerStats.totalTries}
              description="This season"
              icon={Target}
              variant="success"
            />
            <StatCard
              title="Total Tackles"
              value={playerStats.totalTackles}
              description="Defensive actions"
              icon={Activity}
              variant="warning"
            />
            <StatCard
              title="Meters Gained"
              value={`${(playerStats.totalMeters / 1000).toFixed(1)}K`}
              description="Total distance"
              icon={TrendingUp}
              variant="default"
            />
            <StatCard
              title="Avg Age"
              value={`${playerStats.avgAge.toFixed(1)}`}
              description="Years"
              icon={Calendar}
              variant="default"
            />
          </div>
        )}

        {/* Charts Section */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
          <ChartWrapper
            title="Players by Position"
            description="Distribution across playing positions"
            isLoading={isLoading}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={positionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ position, count }) => `${position}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {positionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartWrapper>

          <ChartWrapper
            title="Performance Metrics"
            description="Tries, tackles, and meters gained"
            isLoading={isLoading}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tries" fill="#3b82f6" name="Tries" />
                <Bar dataKey="tackles" fill="#10b981" name="Tackles" />
                <Bar dataKey="meters" fill="#f59e0b" name="Meters" />
              </BarChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </div>

        {/* Age vs Performance Analysis */}
        <div className='mb-8'>
          <ChartWrapper
            title="Age vs Performance Analysis"
            description="Relationship between player age and performance metrics"
            isLoading={isLoading}
          >
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" name="Age" />
                <YAxis dataKey="tries" name="Tries" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter dataKey="tries" fill="#3b82f6" />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </div>

        {/* Players List */}
        <div className='space-y-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold'>Players</h2>
            <div className='text-sm text-muted-foreground'>
              {players?.length || 0} players registered
            </div>
          </div>
          
          {isLoading ? (
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className='h-48 bg-muted animate-pulse rounded-lg' />
              ))}
            </div>
          ) : players && players.length > 0 ? (
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {players.map((player) => (
                <Card key={player.id} className='cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]'>
                  <CardHeader className='pb-3'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-3'>
                        <Avatar className='w-12 h-12'>
                          <AvatarFallback className='bg-blue-100 text-blue-800 font-bold'>
                            {player.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className='text-lg'>{player.name}</CardTitle>
                          <p className='text-sm text-muted-foreground'>{player.position}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{player.age}y</Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className='space-y-4'>
                    <div className='grid grid-cols-2 gap-4 text-center'>
                      <div>
                        <div className='text-2xl font-bold text-green-600'>{player.stats.tries}</div>
                        <div className='text-xs text-muted-foreground'>Tries</div>
                      </div>
                      <div>
                        <div className='text-2xl font-bold text-blue-600'>{player.stats.tackles}</div>
                        <div className='text-xs text-muted-foreground'>Tackles</div>
                      </div>
                    </div>
                    
                    <div className='space-y-2 text-sm'>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Height</span>
                        <span className='font-medium'>{player.height}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Weight</span>
                        <span className='font-medium'>{player.weight}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Nationality</span>
                        <span className='font-medium'>{player.nationality}</span>
                      </div>
                    </div>
                    
                    <div className='bg-muted/50 p-3 rounded-lg'>
                      <div className='grid grid-cols-2 gap-2 text-xs'>
                        <div>
                          <div className='text-muted-foreground'>Meters Gained</div>
                          <div className='font-bold'>{player.stats.metersGained}m</div>
                        </div>
                        <div>
                          <div className='text-muted-foreground'>Kicking Meters</div>
                          <div className='font-bold'>{player.stats.kickingMeters}m</div>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className='w-full'
                      onClick={() => {
                        // TODO: Navigate to player details page
                        console.log(`View details for player: ${player.name}`)
                      }}
                    >
                      View Player Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Users2}
              title="No Players Available"
              description="Player data will be available once the backend is connected. Players will appear here with their statistics and performance metrics."
              actionLabel="Refresh"
              onAction={() => window.location.reload()}
            />
          )}
        </div>

        {/* Performance Heatmap Placeholder */}
        <div className='mt-8'>
          <HeatmapPlaceholder
            title="Player Performance Heatmap"
            description="Comprehensive performance analysis across key metrics"
            data={players?.map(player => ({
              label: player.name,
              value: Math.round((player.stats.tries + player.stats.tackles + player.stats.metersGained / 10) / 3),
              max: 100
            })) || []}
          />
        </div>
      </Main>
    </>
  )
}
