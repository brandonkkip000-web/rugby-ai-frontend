import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { StatCard } from '@/components/rugby/StatCard'
import { ChartWrapper } from '@/components/rugby/ChartWrapper'
import { 
  Brain, 
  Target,
  Zap,
  Lightbulb,
  BarChart3,
  Calendar,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function Insights() {
  type Prediction = {
    id: string
    match: string
    status: 'upcoming' | 'completed'
    prediction: string
    confidence: number
    reasoning: string
  }

  type TacticalSuggestion = {
    team: string
    impact: 'high' | 'medium' | 'low'
    suggestion: string
    reasoning: string
  }

  // Empty AI insights data structure (will be populated by backend)
  const aiInsights: {
    predictions: Prediction[]
    tacticalSuggestions: TacticalSuggestion[]
    performanceTrends: { month: string; tries: number; tackles: number; possession: number }[]
    keyMetrics: {
      totalInsights: 0,
      accuracyRate: 0,
      activePredictions: 0,
      recommendationsGenerated: 0
    }
  } = {
    predictions: [],
    tacticalSuggestions: [],
    performanceTrends: [],
    keyMetrics: {
      totalInsights: 0,
      accuracyRate: 0,
      activePredictions: 0,
      recommendationsGenerated: 0,
    },
  }

  const topNav = [
    {
      title: 'AI Insights',
      href: '/insights',
      isActive: true,
      disabled: false,
    },
    {
      title: 'Predictions',
      href: '/insights/predictions',
      isActive: false,
      disabled: true,
    },
    {
      title: 'Tactical Analysis',
      href: '/insights/tactical',
      isActive: false,
      disabled: true,
    },
    {
      title: 'Performance Trends',
      href: '/insights/trends',
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
              <Brain className='w-8 h-8 mr-3 text-purple-600' />
              AI-Powered Rugby Insights
            </h1>
            <p className='text-muted-foreground'>
              Advanced analytics, predictions, and tactical recommendations powered by AI
            </p>
          </div>
        </div>

        {/* AI Status Alert */}
        <Alert className="mb-6 border-purple-200 bg-purple-50/50">
          <Lightbulb className="h-4 w-4 text-purple-600" />
          <AlertDescription className="text-purple-800">
            <strong>AI Insights Preview:</strong> This section contains placeholder data demonstrating future AI capabilities. 
            Real AI integration will include match predictions, tactical analysis, and performance optimization recommendations.
          </AlertDescription>
        </Alert>

        {/* AI Metrics */}
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8'>
          <StatCard
            title="Total Insights"
            value={aiInsights.keyMetrics.totalInsights}
            description="Generated this month"
            icon={Brain}
            variant="default"
          />
          <StatCard
            title="Accuracy Rate"
            value={`${aiInsights.keyMetrics.accuracyRate}%`}
            description="Prediction accuracy"
            icon={Target}
            variant="success"
          />
          <StatCard
            title="Active Predictions"
            value={aiInsights.keyMetrics.activePredictions}
            description="Live predictions"
            icon={Zap}
            variant="warning"
          />
          <StatCard
            title="Recommendations"
            value={aiInsights.keyMetrics.recommendationsGenerated}
            description="Tactical suggestions"
            icon={Lightbulb}
            variant="default"
          />
        </div>

        {/* AI Predictions */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
          <ChartWrapper
            title="Match Predictions"
            description="AI-powered match outcome predictions"
          >
            <div className='space-y-4'>
              {aiInsights.predictions.map((prediction) => (
                <Card key={prediction.id} className='border-l-4 border-l-blue-500'>
                  <CardContent className='p-4'>
                    <div className='flex items-center justify-between mb-2'>
                      <h4 className='font-semibold'>{prediction.match}</h4>
                      <Badge variant={prediction.status === 'upcoming' ? 'default' : 'secondary'}>
                        {prediction.status}
                      </Badge>
                    </div>
                    <p className='text-sm text-muted-foreground mb-2'>{prediction.prediction}</p>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-2'>
                        <span className='text-sm'>Confidence:</span>
                        <Badge variant="outline">{prediction.confidence}%</Badge>
                      </div>
                      <Clock className='w-4 h-4 text-muted-foreground' />
                    </div>
                    <p className='text-xs text-muted-foreground mt-2 italic'>
                      "{prediction.reasoning}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ChartWrapper>

          <ChartWrapper
            title="Tactical Recommendations"
            description="AI-generated tactical suggestions"
          >
            <div className='space-y-4'>
              {aiInsights.tacticalSuggestions.map((suggestion, index) => (
                <Card key={index} className='border-l-4 border-l-green-500'>
                  <CardContent className='p-4'>
                    <div className='flex items-center justify-between mb-2'>
                      <h4 className='font-semibold'>{suggestion.team}</h4>
                      <Badge 
                        variant={suggestion.impact === 'high' ? 'default' : 'secondary'}
                        className={suggestion.impact === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {suggestion.impact} impact
                      </Badge>
                    </div>
                    <p className='text-sm text-muted-foreground mb-2'>{suggestion.suggestion}</p>
                    <p className='text-xs text-muted-foreground italic'>
                      "{suggestion.reasoning}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ChartWrapper>
        </div>

        {/* Performance Trends */}
        <div className='mb-8'>
          <ChartWrapper
            title="League Performance Trends"
            description="AI-analyzed performance patterns across the season"
          >
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={aiInsights.performanceTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="tries" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Tries" />
                <Area type="monotone" dataKey="tackles" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Tackles" />
                <Area type="monotone" dataKey="possession" stackId="3" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} name="Possession %" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </div>

        {/* Future AI Features */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Card className='border-dashed border-2 border-muted'>
            <CardHeader>
              <CardTitle className='flex items-center text-muted-foreground'>
                <BarChart3 className='w-5 h-5 mr-2' />
                Advanced Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground mb-4'>
                Deep dive into player and team performance with machine learning models.
              </p>
              <div className='space-y-2 text-xs'>
                <div className='flex items-center'>
                  <CheckCircle className='w-3 h-3 text-green-500 mr-2' />
                  <span>Player form analysis</span>
                </div>
                <div className='flex items-center'>
                  <CheckCircle className='w-3 h-3 text-green-500 mr-2' />
                  <span>Injury prediction models</span>
                </div>
                <div className='flex items-center'>
                  <CheckCircle className='w-3 h-3 text-green-500 mr-2' />
                  <span>Performance optimization</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='border-dashed border-2 border-muted'>
            <CardHeader>
              <CardTitle className='flex items-center text-muted-foreground'>
                <Users className='w-5 h-5 mr-2' />
                Recruitment AI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground mb-4'>
                AI-powered player scouting and recruitment recommendations.
              </p>
              <div className='space-y-2 text-xs'>
                <div className='flex items-center'>
                  <CheckCircle className='w-3 h-3 text-green-500 mr-2' />
                  <span>Player potential scoring</span>
                </div>
                <div className='flex items-center'>
                  <CheckCircle className='w-3 h-3 text-green-500 mr-2' />
                  <span>Team fit analysis</span>
                </div>
                <div className='flex items-center'>
                  <CheckCircle className='w-3 h-3 text-green-500 mr-2' />
                  <span>Market value estimation</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='border-dashed border-2 border-muted'>
            <CardHeader>
              <CardTitle className='flex items-center text-muted-foreground'>
                <Calendar className='w-5 h-5 mr-2' />
                Season Planning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground mb-4'>
                Intelligent season planning and fixture optimization.
              </p>
              <div className='space-y-2 text-xs'>
                <div className='flex items-center'>
                  <CheckCircle className='w-3 h-3 text-green-500 mr-2' />
                  <span>Fixture difficulty analysis</span>
                </div>
                <div className='flex items-center'>
                  <CheckCircle className='w-3 h-3 text-green-500 mr-2' />
                  <span>Rest period optimization</span>
                </div>
                <div className='flex items-center'>
                  <CheckCircle className='w-3 h-3 text-green-500 mr-2' />
                  <span>Peak performance timing</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Implementation Roadmap */}
        <div className='mt-8'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Brain className='w-5 h-5 mr-2' />
                AI Implementation Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-center space-x-4 p-4 border rounded-lg bg-green-50'>
                  <CheckCircle className='w-6 h-6 text-green-600' />
                  <div>
                    <h4 className='font-semibold text-green-800'>Phase 1: Data Foundation</h4>
                    <p className='text-sm text-green-700'>Historical match data collection and preprocessing</p>
                  </div>
                </div>
                
                <div className='flex items-center space-x-4 p-4 border rounded-lg bg-yellow-50'>
                  <Clock className='w-6 h-6 text-yellow-600' />
                  <div>
                    <h4 className='font-semibold text-yellow-800'>Phase 2: Basic Predictions</h4>
                    <p className='text-sm text-yellow-700'>Match outcome predictions using historical data</p>
                  </div>
                </div>
                
                <div className='flex items-center space-x-4 p-4 border rounded-lg bg-gray-50'>
                  <AlertTriangle className='w-6 h-6 text-gray-600' />
                  <div>
                    <h4 className='font-semibold text-gray-800'>Phase 3: Advanced Analytics</h4>
                    <p className='text-sm text-gray-700'>Player performance analysis and tactical recommendations</p>
                  </div>
                </div>
                
                <div className='flex items-center space-x-4 p-4 border rounded-lg bg-gray-50'>
                  <AlertTriangle className='w-6 h-6 text-gray-600' />
                  <div>
                    <h4 className='font-semibold text-gray-800'>Phase 4: Real-time Insights</h4>
                    <p className='text-sm text-gray-700'>Live match analysis and in-game recommendations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}
