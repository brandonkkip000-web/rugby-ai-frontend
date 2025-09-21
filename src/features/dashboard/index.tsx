import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { toast } from 'sonner'
import { 
  Trophy, 
  TrendingUp, 
  Target, 
  Calendar
} from 'lucide-react'

export function Dashboard() {
  const { data: dashboardStats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: analyticsApi.getDashboardStats,
    // Disable until backend is connected to avoid showing mock data
    enabled: false,
  })


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
                toast.info('Export will be available once the backend is connected')
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
                <div className='text-center py-8 text-muted-foreground'>
                  Performance charts will appear once backend analytics are connected.
                </div>
              </ChartWrapper>

              <ChartWrapper
                title="Team Distribution"
                description="League standings overview"
                className='col-span-1 lg:col-span-3'
                isLoading={isLoading}
              >
                <div className='text-center py-8 text-muted-foreground'>
                  Team distribution will be available after backend integration.
                </div>
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
                <div className='text-center py-8 text-muted-foreground'>
                  Season statistics will be displayed here when data is available.
                </div>
              </ChartWrapper>

              <ChartWrapper
                title="Performance Metrics"
                description="League-wide averages"
              >
                <div className='text-center py-8 text-muted-foreground'>
                  Performance metrics will be shown here once connected to the backend.
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
