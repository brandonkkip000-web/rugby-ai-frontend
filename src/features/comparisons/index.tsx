import { useState } from 'react'
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
import { EmptyState } from '@/components/rugby/EmptyState'
import { teamsApi, playersApi, analyticsApi } from '@/services/api'
import { 
  BarChart3, 
  Trophy, 
  Users2, 
  Target,
  TrendingUp,
  Activity,
  ArrowRight,
  ArrowLeft
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function Comparisons() {
  const [comparisonType, setComparisonType] = useState<'teams' | 'players'>('teams')
  const [selectedTeam1, setSelectedTeam1] = useState<string>('')
  const [selectedTeam2, setSelectedTeam2] = useState<string>('')
  const [selectedPlayer1, setSelectedPlayer1] = useState<string>('')
  const [selectedPlayer2, setSelectedPlayer2] = useState<string>('')

  const { data: teams } = useQuery({
    queryKey: ['teams'],
    queryFn: teamsApi.getAll
  })

  const { data: players } = useQuery({
    queryKey: ['players'],
    queryFn: playersApi.getAll
  })

  const { data: teamComparison, isLoading: teamComparisonLoading } = useQuery({
    queryKey: ['team-comparison', selectedTeam1, selectedTeam2],
    queryFn: () => analyticsApi.getTeamComparison(selectedTeam1, selectedTeam2),
    enabled: !!selectedTeam1 && !!selectedTeam2
  })

  const { data: playerComparison, isLoading: playerComparisonLoading } = useQuery({
    queryKey: ['player-comparison', selectedPlayer1, selectedPlayer2],
    queryFn: () => analyticsApi.getPlayerComparison(selectedPlayer1, selectedPlayer2),
    enabled: !!selectedPlayer1 && !!selectedPlayer2
  })

  const topNav = [
    {
      title: 'Team vs Team',
      href: '/comparisons?type=teams',
      isActive: comparisonType === 'teams',
      disabled: false,
    },
    {
      title: 'Player vs Player',
      href: '/comparisons?type=players',
      isActive: comparisonType === 'players',
      disabled: false,
    },
    {
      title: 'Advanced Analytics',
      href: '/comparisons/advanced',
      isActive: false,
      disabled: true,
    },
  ]

  // Prepare chart data for team comparison
  const teamComparisonData = teamComparison ? [
    { metric: 'Possession', team1: teamComparison.team1.stats.possession, team2: teamComparison.team2.stats.possession },
    { metric: 'Territory', team1: teamComparison.team1.stats.territory, team2: teamComparison.team2.stats.territory },
    { metric: 'Scrum Success', team1: teamComparison.team1.stats.scrumSuccess, team2: teamComparison.team2.stats.scrumSuccess },
    { metric: 'Lineout Success', team1: teamComparison.team1.stats.lineoutSuccess, team2: teamComparison.team2.stats.lineoutSuccess },
    { metric: 'Discipline', team1: teamComparison.team1.stats.discipline, team2: teamComparison.team2.stats.discipline }
  ] : []

  // Prepare chart data for player comparison
  const playerComparisonData = playerComparison ? [
    { metric: 'Tries', player1: playerComparison.player1.stats.tries, player2: playerComparison.player2.stats.tries },
    { metric: 'Tackles', player1: playerComparison.player1.stats.tackles, player2: playerComparison.player2.stats.tackles },
    { metric: 'Meters Gained', player1: playerComparison.player1.stats.metersGained, player2: playerComparison.player2.stats.metersGained },
    { metric: 'Kicking Meters', player1: playerComparison.player1.stats.kickingMeters, player2: playerComparison.player2.stats.kickingMeters },
    { metric: 'Lineouts Won', player1: playerComparison.player1.stats.lineoutsWon, player2: playerComparison.player2.stats.lineoutsWon }
  ] : []

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
              <BarChart3 className='w-8 h-8 mr-3 text-green-600' />
              Team & Player Comparisons
            </h1>
            <p className='text-muted-foreground'>
              Compare teams and players with detailed analytics and insights
            </p>
          </div>
        </div>

        <Tabs value={comparisonType} onValueChange={(value) => setComparisonType(value as 'teams' | 'players')} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="teams" className="flex items-center">
              <Trophy className="w-4 h-4 mr-2" />
              Team vs Team
            </TabsTrigger>
            <TabsTrigger value="players" className="flex items-center">
              <Users2 className="w-4 h-4 mr-2" />
              Player vs Player
            </TabsTrigger>
          </TabsList>

          <TabsContent value="teams" className="space-y-6">
            {/* Team Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Teams to Compare</CardTitle>
              </CardHeader>
              <CardContent>
                {teams && teams.length > 0 ? (
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <Select value={selectedTeam1} onValueChange={setSelectedTeam1}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select first team" />
                        </SelectTrigger>
                        <SelectContent>
                          {teams.map((team) => (
                            <SelectItem key={team.id} value={team.id}>
                              {team.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                    
                    <div className="flex-1">
                      <Select value={selectedTeam2} onValueChange={setSelectedTeam2}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select second team" />
                        </SelectTrigger>
                        <SelectContent>
                          {teams.map((team) => (
                            <SelectItem key={team.id} value={team.id}>
                              {team.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : (
                  <EmptyState
                    icon={Trophy}
                    title="No Teams Available"
                    description="Team data is required for comparisons. Teams will be available once the backend is connected."
                  />
                )}
              </CardContent>
            </Card>

            {/* Team Comparison Results */}
            {teamComparison && (
              <div className="space-y-6">
                {/* Team Headers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="text-center">
                      <CardTitle className="flex items-center justify-center space-x-2">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: teams?.find(t => t.id === selectedTeam1)?.colors[0] }}
                        >
                          {teams?.find(t => t.id === selectedTeam1)?.shortName.charAt(0)}
                        </div>
                        <span>{teamComparison.team1.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-green-600">{teamComparison.team1.stats.wins}</div>
                          <div className="text-xs text-muted-foreground">Wins</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{teamComparison.team1.stats.tries}</div>
                          <div className="text-xs text-muted-foreground">Tries</div>
                        </div>
                      </div>
                      <div className="text-center">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {teamComparison.team1.stats.points} Points
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="text-center">
                      <CardTitle className="flex items-center justify-center space-x-2">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: teams?.find(t => t.id === selectedTeam2)?.colors[0] }}
                        >
                          {teams?.find(t => t.id === selectedTeam2)?.shortName.charAt(0)}
                        </div>
                        <span>{teamComparison.team2.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-green-600">{teamComparison.team2.stats.wins}</div>
                          <div className="text-xs text-muted-foreground">Wins</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{teamComparison.team2.stats.tries}</div>
                          <div className="text-xs text-muted-foreground">Tries</div>
                        </div>
                      </div>
                      <div className="text-center">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {teamComparison.team2.stats.points} Points
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Comparison Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ChartWrapper
                    title="Performance Comparison"
                    description="Side-by-side metrics comparison"
                  >
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={teamComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="metric" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="team1" fill="#3b82f6" name={teamComparison.team1.name} />
                        <Bar dataKey="team2" fill="#10b981" name={teamComparison.team2.name} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartWrapper>

                  <ChartWrapper
                    title="Key Differences"
                    description="Advantages and disadvantages"
                  >
                    <div className="space-y-4">
                      {Object.entries(teamComparison.comparison).map(([key, value]: [string, any]) => (
                        <div key={key} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <Badge variant={value.difference > 0 ? "default" : "destructive"}>
                              {value.difference > 0 ? '+' : ''}{value.difference.toFixed(1)}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">{teamComparison.team1.name}: </span>
                              <span className="font-medium">{value.team1.toFixed(1)}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">{teamComparison.team2.name}: </span>
                              <span className="font-medium">{value.team2.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ChartWrapper>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="players" className="space-y-6">
            {/* Player Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Players to Compare</CardTitle>
              </CardHeader>
              <CardContent>
                {players && players.length > 0 ? (
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <Select value={selectedPlayer1} onValueChange={setSelectedPlayer1}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select first player" />
                        </SelectTrigger>
                        <SelectContent>
                          {players.map((player) => (
                            <SelectItem key={player.id} value={player.id}>
                              {player.name} ({player.position})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                    
                    <div className="flex-1">
                      <Select value={selectedPlayer2} onValueChange={setSelectedPlayer2}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select second player" />
                        </SelectTrigger>
                        <SelectContent>
                          {players.map((player) => (
                            <SelectItem key={player.id} value={player.id}>
                              {player.name} ({player.position})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : (
                  <EmptyState
                    icon={Users2}
                    title="No Players Available"
                    description="Player data is required for comparisons. Players will be available once the backend is connected."
                  />
                )}
              </CardContent>
            </Card>

            {/* Player Comparison Results */}
            {playerComparison && (
              <div className="space-y-6">
                {/* Player Headers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="text-center">
                      <CardTitle>{playerComparison.player1.name}</CardTitle>
                      <Badge variant="outline">{playerComparison.player1.position}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-green-600">{playerComparison.player1.stats.tries}</div>
                          <div className="text-xs text-muted-foreground">Tries</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{playerComparison.player1.stats.tackles}</div>
                          <div className="text-xs text-muted-foreground">Tackles</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="text-center">
                      <CardTitle>{playerComparison.player2.name}</CardTitle>
                      <Badge variant="outline">{playerComparison.player2.position}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-green-600">{playerComparison.player2.stats.tries}</div>
                          <div className="text-xs text-muted-foreground">Tries</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{playerComparison.player2.stats.tackles}</div>
                          <div className="text-xs text-muted-foreground">Tackles</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Player Comparison Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ChartWrapper
                    title="Performance Comparison"
                    description="Side-by-side metrics comparison"
                  >
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={playerComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="metric" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="player1" fill="#3b82f6" name={playerComparison.player1.name} />
                        <Bar dataKey="player2" fill="#10b981" name={playerComparison.player2.name} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartWrapper>

                  <ChartWrapper
                    title="Key Differences"
                    description="Advantages and disadvantages"
                  >
                    <div className="space-y-4">
                      {Object.entries(playerComparison.comparison).map(([key, value]: [string, any]) => (
                        <div key={key} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <Badge variant={value.difference > 0 ? "default" : "destructive"}>
                              {value.difference > 0 ? '+' : ''}{value.difference}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">{playerComparison.player1.name}: </span>
                              <span className="font-medium">{value.player1}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">{playerComparison.player2.name}: </span>
                              <span className="font-medium">{value.player2}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ChartWrapper>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
