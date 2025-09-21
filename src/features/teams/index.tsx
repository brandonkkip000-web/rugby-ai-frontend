import { useQuery } from '@tanstack/react-query'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { TeamCard } from '@/components/rugby/TeamCard'
import { StatCard } from '@/components/rugby/StatCard'
import { ChartWrapper } from '@/components/rugby/ChartWrapper'
import { EmptyState } from '@/components/rugby/EmptyState'
import { teamsApi } from '@/services/api'
import { Trophy, TrendingUp, Users, Target } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export function Teams() {
  const { data: teams, isLoading } = useQuery({
    queryKey: ['teams'],
    queryFn: teamsApi.getAll
  })

  // Calculate league statistics
  const leagueStats = teams ? {
    totalTeams: teams.length,
    totalPoints: teams.reduce((sum, team) => sum + team.stats.points, 0),
    totalTries: teams.reduce((sum, team) => sum + team.stats.tries, 0),
    avgPossession: teams.reduce((sum, team) => sum + team.stats.possession, 0) / teams.length
  } : null

  // Prepare chart data
  const possessionData = teams?.map(team => ({
    name: team.shortName,
    possession: team.stats.possession,
    territory: team.stats.territory,
    tries: team.stats.tries
  })) || []

  const disciplineData = teams?.map(team => ({
    name: team.shortName,
    value: team.stats.discipline,
    color: team.stats.discipline >= 90 ? '#10b981' : team.stats.discipline >= 80 ? '#f59e0b' : '#ef4444'
  })) || []

  const topNav = [
    {
      title: 'Overview',
      href: '/teams',
      isActive: true,
      disabled: false,
    },
    {
      title: 'League Table',
      href: '/teams/table',
      isActive: false,
      disabled: true,
    },
    {
      title: 'Statistics',
      href: '/teams/stats',
      isActive: false,
      disabled: true,
    },
    {
      title: 'Head-to-Head',
      href: '/teams/head-to-head',
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
              <Trophy className='w-8 h-8 mr-3 text-yellow-600' />
              Kenya Premier Rugby Teams
            </h1>
            <p className='text-muted-foreground'>
              Comprehensive analytics and statistics for all premier league teams
            </p>
          </div>
        </div>

        {/* League Overview Stats */}
        {leagueStats && (
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6'>
            <StatCard
              title="Total Teams"
              value={leagueStats.totalTeams}
              description="Premier League clubs"
              icon={Users}
              variant="default"
            />
            <StatCard
              title="Total Points"
              value={leagueStats.totalPoints}
              description="League-wide points"
              icon={Trophy}
              variant="success"
            />
            <StatCard
              title="Total Tries"
              value={leagueStats.totalTries}
              description="This season"
              icon={Target}
              variant="warning"
            />
            <StatCard
              title="Avg Possession"
              value={`${leagueStats.avgPossession.toFixed(1)}%`}
              description="League average"
              icon={TrendingUp}
              variant="default"
            />
          </div>
        )}

        {/* Charts Section */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
          <ChartWrapper
            title="Possession & Territory"
            description="Team performance metrics"
            isLoading={isLoading}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={possessionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="possession" fill="#3b82f6" name="Possession %" />
                <Bar dataKey="territory" fill="#10b981" name="Territory %" />
              </BarChart>
            </ResponsiveContainer>
          </ChartWrapper>

          <ChartWrapper
            title="Discipline Rating"
            description="Team discipline performance"
            isLoading={isLoading}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={disciplineData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
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

        {/* Teams Grid */}
        <div className='space-y-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold'>Teams</h2>
            <div className='text-sm text-muted-foreground'>
              {teams?.length || 0} teams in the league
            </div>
          </div>
          
          {isLoading ? (
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className='h-64 bg-muted animate-pulse rounded-lg' />
              ))}
            </div>
          ) : teams && teams.length > 0 ? (
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {teams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Trophy}
              title="No Teams Available"
              description="Team data will be available once the backend is connected. Teams will appear here with their statistics and performance metrics."
              actionLabel="Refresh"
              onAction={() => window.location.reload()}
            />
          )}
        </div>

        {/* Quick Stats Table */}
        <div className='mt-8'>
          <ChartWrapper
            title="Team Performance Summary"
            description="Key metrics for all teams"
            isLoading={isLoading}
          >
            {teams && teams.length > 0 ? (
              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='border-b'>
                      <th className='text-left p-2'>Team</th>
                      <th className='text-center p-2'>Points</th>
                      <th className='text-center p-2'>W-L-D</th>
                      <th className='text-center p-2'>Tries</th>
                      <th className='text-center p-2'>Possession</th>
                      <th className='text-center p-2'>Discipline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team) => (
                      <tr key={team.id} className='border-b hover:bg-muted/50'>
                        <td className='p-2'>
                          <div className='flex items-center space-x-2'>
                            <div 
                              className='w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold'
                              style={{ backgroundColor: team.colors[0] }}
                            >
                              {team.shortName.charAt(0)}
                            </div>
                            <span className='font-medium'>{team.shortName}</span>
                          </div>
                        </td>
                        <td className='text-center p-2 font-bold'>{team.stats.points}</td>
                        <td className='text-center p-2'>
                          {team.stats.wins}-{team.stats.losses}-{team.stats.draws}
                        </td>
                        <td className='text-center p-2'>{team.stats.tries}</td>
                        <td className='text-center p-2'>{team.stats.possession}%</td>
                        <td className='text-center p-2'>{team.stats.discipline}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className='text-center py-8 text-muted-foreground'>
                No team data available. Performance metrics will be displayed here once the backend is connected.
              </div>
            )}
          </ChartWrapper>
        </div>
      </Main>
    </>
  )
}
