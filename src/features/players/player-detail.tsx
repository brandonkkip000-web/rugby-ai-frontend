import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
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
import { playersApi, teamsApi } from '@/services/api'
import { 
  Users2, 
  Target, 
  TrendingUp, 
  Activity,
  Trophy,
  MapPin,
  User,
  Calendar,
  Ruler,
  Weight,
  Flag
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function PlayerDetail() {
  const { playerId } = useParams({ strict: false })
  
  const { data: player, isLoading: playerLoading } = useQuery({
    queryKey: ['player', playerId],
    queryFn: () => playersApi.getById(playerId!),
    enabled: !!playerId
  })

  const { data: team } = useQuery({
    queryKey: ['team', player?.teamId],
    queryFn: () => teamsApi.getById(player?.teamId!),
    enabled: !!player?.teamId
  })

  // Prepare chart data
  const performanceData = player ? [
    { metric: 'Tries', value: player.stats.tries },
    { metric: 'Tackles', value: player.stats.tackles },
    { metric: 'Meters Gained', value: player.stats.metersGained },
    { metric: 'Kicking Meters', value: player.stats.kickingMeters },
    { metric: 'Lineouts Won', value: player.stats.lineoutsWon },
    { metric: 'Scrums Won', value: player.stats.scrumsWon }
  ] : []

  const disciplineData = player ? [
    { name: 'Penalties', value: player.stats.penalties, color: '#ef4444' },
    { name: 'Yellow Cards', value: player.stats.yellowCards, color: '#f59e0b' },
    { name: 'Red Cards', value: player.stats.redCards, color: '#dc2626' }
  ] : []

  const topNav = [
    {
      title: 'Overview',
      href: `/players/${playerId}`,
      isActive: true,
      disabled: false,
    },
    {
      title: 'Statistics',
      href: `/players/${playerId}/stats`,
      isActive: false,
      disabled: true,
    },
    {
      title: 'Match History',
      href: `/players/${playerId}/matches`,
      isActive: false,
      disabled: true,
    },
    {
      title: 'Comparisons',
      href: `/players/${playerId}/compare`,
      isActive: false,
      disabled: true,
    },
  ]

  if (playerLoading) {
    return (
      <>
        <Header>
          <TopNav links={topNav} />
          <div className='ms-auto flex items-center space-x-4'>
            <Search />
            <ThemeSwitch />
            <ConfigDrawer />
            <ProfileDropdown />
          </div>
        </Header>
        <Main>
          <div className='space-y-6'>
            <div className='h-8 bg-muted animate-pulse rounded w-1/3' />
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className='h-32 bg-muted animate-pulse rounded' />
              ))}
            </div>
          </div>
        </Main>
      </>
    )
  }

  if (!player) {
    return (
      <>
        <Header>
          <TopNav links={topNav} />
          <div className='ms-auto flex items-center space-x-4'>
            <Search />
            <ThemeSwitch />
            <ConfigDrawer />
            <ProfileDropdown />
          </div>
        </Header>
        <Main>
          <div className='text-center py-12'>
            <Users2 className='w-16 h-16 mx-auto text-muted-foreground mb-4' />
            <h2 className='text-2xl font-bold mb-2'>Player Not Found</h2>
            <p className='text-muted-foreground'>
              The player you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </Main>
      </>
    )
  }

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
        {/* Player Header */}
        <div className='mb-6'>
          <div className='flex items-center space-x-4 mb-4'>
            <Avatar className='w-20 h-20'>
              <AvatarFallback className='bg-blue-100 text-blue-800 font-bold text-2xl'>
                {player.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className='text-3xl font-bold tracking-tight'>{player.name}</h1>
              <div className='flex items-center space-x-4 text-muted-foreground'>
                <span className='flex items-center'>
                  <Trophy className='w-4 h-4 mr-1' />
                  {player.position}
                </span>
                <span className='flex items-center'>
                  <Calendar className='w-4 h-4 mr-1' />
                  {player.age} years old
                </span>
                <span className='flex items-center'>
                  <Flag className='w-4 h-4 mr-1' />
                  {player.nationality}
                </span>
              </div>
            </div>
          </div>
          
          <div className='flex items-center space-x-4'>
            <Badge variant="secondary" className='bg-blue-100 text-blue-800'>
              <Trophy className='w-3 h-3 mr-1' />
              {team?.name || 'Unknown Team'}
            </Badge>
            <Badge variant="outline">
              {player.stats.tries} Tries
            </Badge>
            <Badge variant="outline">
              {player.stats.tackles} Tackles
            </Badge>
          </div>
        </div>

        {/* Key Stats */}
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8'>
          <StatCard
            title="Total Tries"
            value={player.stats.tries}
            description="This season"
            icon={Target}
            variant="success"
          />
          <StatCard
            title="Total Tackles"
            value={player.stats.tackles}
            description="Defensive actions"
            icon={Activity}
            variant="default"
          />
          <StatCard
            title="Meters Gained"
            value={`${player.stats.metersGained}m`}
            description="Total distance"
            icon={TrendingUp}
            variant="warning"
          />
          <StatCard
            title="Discipline Score"
            value={`${100 - (player.stats.penalties + player.stats.yellowCards * 5 + player.stats.redCards * 10)}`}
            description="Fair play rating"
            icon={Trophy}
            variant="default"
          />
        </div>

        {/* Charts Section */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
          <ChartWrapper
            title="Performance Metrics"
            description="Key player statistics"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </ChartWrapper>

          <ChartWrapper
            title="Discipline Record"
            description="Penalties and cards"
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={disciplineData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => value > 0 ? `${name}: ${value}` : null}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {disciplineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </div>

        {/* Player Information */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <User className='w-5 h-5 mr-2' />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Age</span>
                <span className='font-medium'>{player.age} years</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Height</span>
                <span className='font-medium flex items-center'>
                  <Ruler className='w-3 h-3 mr-1' />
                  {player.height}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Weight</span>
                <span className='font-medium flex items-center'>
                  <Weight className='w-3 h-3 mr-1' />
                  {player.weight}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Nationality</span>
                <span className='font-medium flex items-center'>
                  <Flag className='w-3 h-3 mr-1' />
                  {player.nationality}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Trophy className='w-5 h-5 mr-2' />
                Season Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Tries</span>
                <span className='font-medium'>{player.stats.tries}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Tackles</span>
                <span className='font-medium'>{player.stats.tackles}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Meters Gained</span>
                <span className='font-medium'>{player.stats.metersGained}m</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Kicking Meters</span>
                <span className='font-medium'>{player.stats.kickingMeters}m</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Activity className='w-5 h-5 mr-2' />
                Set Piece Performance
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Lineouts Won</span>
                <span className='font-medium'>{player.stats.lineoutsWon}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Scrums Won</span>
                <span className='font-medium'>{player.stats.scrumsWon}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Penalties</span>
                <span className='font-medium'>{player.stats.penalties}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Yellow Cards</span>
                <span className='font-medium'>{player.stats.yellowCards}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Heatmap */}
        <div className='mb-8'>
          <HeatmapPlaceholder
            title="Player Performance Heatmap"
            description="Comprehensive performance analysis across key metrics"
            data={[
              { label: 'Tries', value: player.stats.tries, max: 20 },
              { label: 'Tackles', value: player.stats.tackles, max: 100 },
              { label: 'Meters Gained', value: player.stats.metersGained, max: 1000 },
              { label: 'Kicking Meters', value: player.stats.kickingMeters, max: 500 },
              { label: 'Lineouts Won', value: player.stats.lineoutsWon, max: 50 },
              { label: 'Scrums Won', value: player.stats.scrumsWon, max: 50 },
              { label: 'Discipline', value: 100 - (player.stats.penalties + player.stats.yellowCards * 5), max: 100 },
              { label: 'Overall Rating', value: Math.round((player.stats.tries * 5 + player.stats.tackles + player.stats.metersGained / 10) / 3), max: 100 }
            ]}
          />
        </div>

        {/* Team Information */}
        {team && (
          <div>
            <ChartWrapper
              title="Team Information"
              description={`${player.name} plays for ${team.name}`}
            >
              <div className='flex items-center space-x-4 p-4 border rounded-lg'>
                <div 
                  className='w-12 h-12 rounded-full flex items-center justify-center text-white font-bold'
                  style={{ backgroundColor: team.colors[0] }}
                >
                  {team.shortName.charAt(0)}
                </div>
                <div className='flex-1'>
                  <h3 className='font-semibold'>{team.name}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {team.location} • Founded {team.founded}
                  </p>
                  <div className='flex items-center space-x-4 mt-2 text-sm'>
                    <span>Coach: {team.coach}</span>
                    <span>Captain: {team.captain}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Team
                </Button>
              </div>
            </ChartWrapper>
          </div>
        )}
      </Main>
    </>
  )
}
