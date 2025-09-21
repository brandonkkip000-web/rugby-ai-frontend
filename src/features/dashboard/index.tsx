import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { StatCard } from '@/components/rugby/StatCard'
import { ChartWrapper } from '@/components/rugby/ChartWrapper'
import { analyticsApi } from '@/services/api'
import { 
  Trophy, 
  TrendingUp, 
  Target, 
  Calendar
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
  PieChart,
  Pie,
  Cell
} from 'recharts'

export function Dashboard() {
  const { data: dashboardStats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: analyticsApi.getDashboardStats
  })

  // Prepare chart data for league performance
  const leaguePerformanceData = [
    { month: 'Jan', matches: 8, tries: 45, points: 180 },
    { month: 'Feb', matches: 12, tries: 67, points: 268 },
    { month: 'Mar', matches: 10, tries: 58, points: 232 },
    { month: 'Apr', matches: 14, tries: 89, points: 356 }
  ]

  const teamDistributionData = [
    { name: 'Top 4', value: 4, color: '#10b981' },
    { name: 'Mid Table', value: 4, color: '#f59e0b' },
    { name: 'Relegation Zone', value: 4, color: '#ef4444' }
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
              Kenya Rugby Analytics Dashboard
            </h1>
            <p className='text-muted-foreground'>
              Comprehensive overview of Kenya Premier Rugby League performance and statistics
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <Button 
              variant="outline" 
              onClick={() => {
                // TODO: Implement export functionality
                // Export report functionality will be implemented with backend
              }}
            >
              <Calendar className='w-4 h-4 mr-2' />
              Export Report
            </Button>
          </div>
        </div>

        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-6'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics'>Analytics</TabsTrigger>
              <TabsTrigger value='insights' disabled>
                AI Insights
              </TabsTrigger>
              <TabsTrigger value='reports' disabled>
                Reports
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='overview' className='space-y-6'>
            {/* Key Metrics */}
            {isLoading ? (
              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className='h-32 bg-muted animate-pulse rounded' />
                ))}
              </div>
            ) : (
              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                <StatCard
                  title="Total Matches"
                  value={dashboardStats?.totalMatches || 0}
                  description="This season"
                  icon={Calendar}
                  variant="default"
                />
                <StatCard
                  title="Total Tries"
                  value={dashboardStats?.totalTries || 0}
                  description="League-wide"
                  icon={Target}
                  variant="success"
                />
                <StatCard
                  title="Total Points"
                  value={dashboardStats?.totalPoints || 0}
                  description="Scored this season"
                  icon={Trophy}
                  variant="warning"
                />
                <StatCard
                  title="Top Scorer"
                  value={dashboardStats?.topScoringTeam?.tries || 0}
                  description={`${dashboardStats?.topScoringTeam?.name || 'N/A'}`}
                  icon={TrendingUp}
                  variant="default"
                />
              </div>
            )}

            {/* Charts Section */}
            <div className='grid grid-cols-1 lg:grid-cols-7 gap-6'>
              <ChartWrapper
                title="League Performance Trends"
                description="Monthly performance metrics"
                className='col-span-1 lg:col-span-4'
                isLoading={isLoading}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={leaguePerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="matches" stroke="#3b82f6" strokeWidth={2} name="Matches" />
                    <Line type="monotone" dataKey="tries" stroke="#10b981" strokeWidth={2} name="Tries" />
                    <Line type="monotone" dataKey="points" stroke="#f59e0b" strokeWidth={2} name="Points" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartWrapper>

              <ChartWrapper
                title="Team Distribution"
                description="League standings overview"
                className='col-span-1 lg:col-span-3'
                isLoading={isLoading}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={teamDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {teamDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartWrapper>
            </div>

            {/* Recent Matches and Upcoming Fixtures */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <ChartWrapper
                title="Recent Matches"
                description="Latest match results"
                isLoading={isLoading}
              >
                <div className='text-center py-8 text-muted-foreground'>
                  No recent matches available. Match results will appear here once the backend is connected.
                </div>
              </ChartWrapper>

              <ChartWrapper
                title="Upcoming Matches"
                description="Next fixtures"
                isLoading={isLoading}
              >
                <div className='text-center py-8 text-muted-foreground'>
                  No upcoming matches available. Fixtures will appear here once the backend is connected.
                </div>
              </ChartWrapper>
            </div>
          </TabsContent>

          <TabsContent value='analytics' className='space-y-6'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <ChartWrapper
                title="Season Statistics"
                description="Key performance indicators"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { metric: 'Matches Played', value: 44 },
                    { metric: 'Total Tries', value: 259 },
                    { metric: 'Total Points', value: 1036 },
                    { metric: 'Avg Possession', value: 51 },
                    { metric: 'Avg Territory', value: 49 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartWrapper>

              <ChartWrapper
                title="Performance Metrics"
                description="League-wide averages"
              >
                <div className='space-y-4'>
                  <div className='flex items-center justify-between p-3 border rounded-lg'>
                    <span className='font-medium'>Average Match Duration</span>
                    <Badge variant="outline">80 minutes</Badge>
                  </div>
                  <div className='flex items-center justify-between p-3 border rounded-lg'>
                    <span className='font-medium'>Tries per Match</span>
                    <Badge variant="outline">5.9</Badge>
                  </div>
                  <div className='flex items-center justify-between p-3 border rounded-lg'>
                    <span className='font-medium'>Conversion Rate</span>
                    <Badge variant="outline">78.5%</Badge>
                  </div>
                  <div className='flex items-center justify-between p-3 border rounded-lg'>
                    <span className='font-medium'>Penalty Success</span>
                    <Badge variant="outline">82.3%</Badge>
                  </div>
                </div>
              </ChartWrapper>
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
    disabled: true,
  },
]
