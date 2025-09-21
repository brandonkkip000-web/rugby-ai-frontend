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
import { teamsApi, matchesApi } from '@/services/api'
import { 
  Trophy, 
  TrendingUp, 
  Target, 
  MapPin, 
  Calendar,
  User,
  Activity,
  BarChart3
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function TeamDetail() {
  const { teamId } = useParams({ strict: false })
  
  const { data: team, isLoading: teamLoading } = useQuery({
    queryKey: ['team', teamId],
    queryFn: () => teamsApi.getById(teamId!),
    enabled: !!teamId
  })

  const { data: matches, isLoading: matchesLoading } = useQuery({
    queryKey: ['team-matches', teamId],
    queryFn: () => matchesApi.getByTeam(teamId!),
    enabled: !!teamId
  })

  // Extend team with optional UI fields without changing core types
  type UITeam = NonNullable<typeof team> & {
    location?: string
    founded?: number | string
    coach?: string
    captain?: string
    stats: (NonNullable<typeof team>['stats']) & { penalties?: number; conversions?: number }
  }
  const tTeam = team as unknown as UITeam | null

  // Prepare chart data
  const performanceData = team ? [
    { metric: 'Possession', value: team.stats.possession },
    { metric: 'Territory', value: team.stats.territory },
    { metric: 'Scrum Success', value: team.stats.scrumSuccess },
    { metric: 'Lineout Success', value: team.stats.lineoutSuccess },
    { metric: 'Discipline', value: team.stats.discipline }
  ] : []

  const matchResults = matches?.map(match => ({
    date: match.date,
    opponent: match.homeTeamId === teamId ? 
      (match.awayTeamId === 'kabras-sugar' ? 'Kabras' : 
       match.awayTeamId === 'kcb-rugby' ? 'KCB' :
       match.awayTeamId === 'menengai-oilers' ? 'Oilers' : 'Opponent') :
      (match.homeTeamId === 'kabras-sugar' ? 'Kabras' : 
       match.homeTeamId === 'kcb-rugby' ? 'KCB' :
       match.homeTeamId === 'menengai-oilers' ? 'Oilers' : 'Opponent'),
    score: match.homeTeamId === teamId ? 
      `${match.homeScore}-${match.awayScore}` : 
      `${match.awayScore}-${match.homeScore}`,
    result: match.homeTeamId === teamId ? 
      (match.homeScore > match.awayScore ? 'W' : match.homeScore === match.awayScore ? 'D' : 'L') :
      (match.awayScore > match.homeScore ? 'W' : match.awayScore === match.homeScore ? 'D' : 'L'),
    points: match.homeTeamId === teamId ? 
      (match.homeScore > match.awayScore ? 4 : match.homeScore === match.awayScore ? 2 : 0) :
      (match.awayScore > match.homeScore ? 4 : match.awayScore === match.homeScore ? 2 : 0)
  })) || []

  const topNav = [
    {
      title: 'Overview',
      href: `/teams/${teamId}`,
      isActive: true,
      disabled: false,
    },
    {
      title: 'Players',
      href: `/teams/${teamId}/players`,
      isActive: false,
      disabled: true,
    },
    {
      title: 'Matches',
      href: `/teams/${teamId}/matches`,
      isActive: false,
      disabled: true,
    },
    {
      title: 'Statistics',
      href: `/teams/${teamId}/stats`,
      isActive: false,
      disabled: true,
    },
  ]

  if (teamLoading) {
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

  if (!team) {
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
            <Trophy className='w-16 h-16 mx-auto text-muted-foreground mb-4' />
            <h2 className='text-2xl font-bold mb-2'>Team Not Found</h2>
            <p className='text-muted-foreground'>
              The team you're looking for doesn't exist or has been removed.
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
        {/* Team Header */}
        <div className='mb-6'>
          <div className='flex items-center space-x-4 mb-4'>
            <div 
              className='w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl'
              style={{ backgroundColor: team.colors[0] }}
            >
              {team.shortName.charAt(0)}
            </div>
            <div>
              <h1 className='text-3xl font-bold tracking-tight'>{team.name}</h1>
              <div className='flex items-center space-x-4 text-muted-foreground'>
                <span className='flex items-center'>
                  <MapPin className='w-4 h-4 mr-1' />
                  {tTeam?.location ?? '—'}
                </span>
                <span className='flex items-center'>
                  <Calendar className='w-4 h-4 mr-1' />
                  Founded {tTeam?.founded ?? '—'}
                </span>
              </div>
            </div>
          </div>
          
          <div className='flex items-center space-x-4'>
            <Badge variant="secondary" className='bg-blue-100 text-blue-800'>
              <Trophy className='w-3 h-3 mr-1' />
              {team.stats.points} Points
            </Badge>
            <Badge variant="outline">
              {team.stats.wins}W - {team.stats.losses}L - {team.stats.draws}D
            </Badge>
            <Badge variant="outline">
              {team.stats.tries} Tries
            </Badge>
          </div>
        </div>

        {/* Key Stats */}
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8'>
          <StatCard
            title="League Position"
            value="#—"
            description="Current standing"
            icon={Trophy}
            variant="success"
          />
          <StatCard
            title="Win Rate"
            value={`${Math.round((team.stats.wins / (team.stats.wins + team.stats.losses + team.stats.draws)) * 100)}%`}
            description="This season"
            icon={TrendingUp}
            variant="default"
          />
          <StatCard
            title="Avg Possession"
            value={`${team.stats.possession}%`}
            description="Ball control"
            icon={Activity}
            variant="warning"
          />
          <StatCard
            title="Discipline"
            value={`${team.stats.discipline}%`}
            description="Fair play rating"
            icon={Target}
            variant="default"
          />
        </div>

        {/* Charts Section */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
          <ChartWrapper
            title="Performance Metrics"
            description="Key team statistics"
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
            title="Match Results Trend"
            description="Recent performance"
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={matchResults}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 4]} />
                <Tooltip />
                <Line type="monotone" dataKey="points" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </div>

        {/* Team Information */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <User className='w-5 h-5 mr-2' />
                Team Leadership
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Head Coach</span>
                <span className='font-medium'>{tTeam?.coach ?? '—'}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Captain</span>
                <span className='font-medium'>{tTeam?.captain ?? '—'}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Founded</span>
                <span className='font-medium'>{tTeam?.founded ?? '—'}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <BarChart3 className='w-5 h-5 mr-2' />
                Season Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Total Tries</span>
                <span className='font-medium'>{team.stats.tries}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Penalties</span>
                <span className='font-medium'>{tTeam?.stats.penalties ?? 0}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Conversions</span>
                <span className='font-medium'>{tTeam?.stats.conversions ?? 0}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Scrum Success</span>
                <span className='font-medium'>{team.stats.scrumSuccess}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Activity className='w-5 h-5 mr-2' />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Possession</span>
                <span className='font-medium'>{team.stats.possession}%</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Territory</span>
                <span className='font-medium'>{team.stats.territory}%</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Lineout Success</span>
                <span className='font-medium'>{team.stats.lineoutSuccess}%</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Discipline</span>
                <span className='font-medium'>{team.stats.discipline}%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Heatmap */}
        <div className='mb-8'>
          <HeatmapPlaceholder
            title="Team Performance Heatmap"
            description="Comprehensive performance analysis across key metrics"
            data={[
              { label: 'Possession', value: team.stats.possession, max: 100 },
              { label: 'Territory', value: team.stats.territory, max: 100 },
              { label: 'Scrum Success', value: team.stats.scrumSuccess, max: 100 },
              { label: 'Lineout Success', value: team.stats.lineoutSuccess, max: 100 },
              { label: 'Discipline', value: team.stats.discipline, max: 100 },
              { label: 'Try Scoring', value: team.stats.tries, max: 50 },
              { label: 'Conversion Rate', value: tTeam?.stats.conversions ?? 0, max: 50 },
              { label: 'Penalty Success', value: tTeam?.stats.penalties ?? 0, max: 30 }
            ]}
          />
        </div>

        {/* Recent Matches */}
        <div>
          <ChartWrapper
            title="Recent Matches"
            description="Latest team performance"
          >
            <div className='space-y-4'>
              {matchesLoading ? (
                <div className='space-y-3'>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className='h-16 bg-muted animate-pulse rounded' />
                  ))}
                </div>
              ) : (
                <div className='space-y-3'>
                  {matchResults.slice(0, 5).map((match, index) => (
                    <div key={index} className='flex items-center justify-between p-4 border rounded-lg'>
                      <div className='flex items-center space-x-4'>
                        <div className='text-sm text-muted-foreground'>
                          {new Date(match.date).toLocaleDateString()}
                        </div>
                        <div className='font-medium'>
                          vs {match.opponent}
                        </div>
                        <div className='text-sm'>
                          {match.score}
                        </div>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Badge 
                          variant={match.result === 'W' ? 'default' : match.result === 'D' ? 'secondary' : 'destructive'}
                        >
                          {match.result}
                        </Badge>
                        <span className='text-sm font-medium'>{match.points} pts</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ChartWrapper>
        </div>
      </Main>
    </>
  )
}
