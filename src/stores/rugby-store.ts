import { create } from 'zustand'
import type { Team, Player, Match } from '@/services/api'

interface RugbyState {
  // Teams
  teams: Team[]
  selectedTeam: Team | null
  teamsLoading: boolean
  
  // Players
  players: Player[]
  selectedPlayer: Player | null
  playersLoading: boolean
  
  // Matches
  recentMatches: Match[]
  upcomingMatches: Match[]
  selectedMatch: Match | null
  matchesLoading: boolean
  
  // Comparisons
  comparisonData: {
    teams: Team[] | null
    players: Player[] | null
  }
  
  // UI State
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  
  // Actions
  setTeams: (teams: Team[]) => void
  setSelectedTeam: (team: Team | null) => void
  setTeamsLoading: (loading: boolean) => void
  
  setPlayers: (players: Player[]) => void
  setSelectedPlayer: (player: Player | null) => void
  setPlayersLoading: (loading: boolean) => void
  
  setRecentMatches: (matches: Match[]) => void
  setUpcomingMatches: (matches: Match[]) => void
  setSelectedMatch: (match: Match | null) => void
  setMatchesLoading: (loading: boolean) => void
  
  setComparisonTeams: (teams: Team[]) => void
  setComparisonPlayers: (players: Player[]) => void
  clearComparison: () => void
  
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: 'light' | 'dark') => void
  
  // Computed getters
  getTeamById: (id: string) => Team | undefined
  getPlayerById: (id: string) => Player | undefined
  getMatchById: (id: string) => Match | undefined
  getPlayersByTeam: (teamId: string) => Player[]
  getMatchesByTeam: (teamId: string) => Match[]
}

export const useRugbyStore = create<RugbyState>((set, get) => ({
  // Initial state
  teams: [],
  selectedTeam: null,
  teamsLoading: false,
  
  players: [],
  selectedPlayer: null,
  playersLoading: false,
  
  recentMatches: [],
  upcomingMatches: [],
  selectedMatch: null,
  matchesLoading: false,
  
  comparisonData: {
    teams: null,
    players: null
  },
  
  sidebarOpen: true,
  theme: 'light',
  
  // Actions
  setTeams: (teams) => set({ teams }),
  setSelectedTeam: (team) => set({ selectedTeam: team }),
  setTeamsLoading: (loading) => set({ teamsLoading: loading }),
  
  setPlayers: (players) => set({ players }),
  setSelectedPlayer: (player) => set({ selectedPlayer: player }),
  setPlayersLoading: (loading) => set({ playersLoading: loading }),
  
  setRecentMatches: (matches) => set({ recentMatches: matches }),
  setUpcomingMatches: (matches) => set({ upcomingMatches: matches }),
  setSelectedMatch: (match) => set({ selectedMatch: match }),
  setMatchesLoading: (loading) => set({ matchesLoading: loading }),
  
  setComparisonTeams: (teams) => set(state => ({
    comparisonData: { ...state.comparisonData, teams }
  })),
  setComparisonPlayers: (players) => set(state => ({
    comparisonData: { ...state.comparisonData, players }
  })),
  clearComparison: () => set({
    comparisonData: { teams: null, players: null }
  }),
  
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setTheme: (theme) => set({ theme }),
  
  // Computed getters
  getTeamById: (id) => {
    const { teams } = get()
    return teams.find(team => team.id === id)
  },
  
  getPlayerById: (id) => {
    const { players } = get()
    return players.find(player => player.id === id)
  },
  
  getMatchById: (id) => {
    const { recentMatches, upcomingMatches } = get()
    return [...recentMatches, ...upcomingMatches].find(match => match.id === id)
  },
  
  getPlayersByTeam: (teamId) => {
    const { players } = get()
    return players.filter(player => player.teamId === teamId)
  },
  
  getMatchesByTeam: (teamId) => {
    const { recentMatches, upcomingMatches } = get()
    return [...recentMatches, ...upcomingMatches].filter(
      match => match.homeTeamId === teamId || match.awayTeamId === teamId
    )
  }
}))

// Selectors for specific data
export const useTeams = () => useRugbyStore(state => ({
  teams: state.teams,
  selectedTeam: state.selectedTeam,
  loading: state.teamsLoading,
  setTeams: state.setTeams,
  setSelectedTeam: state.setSelectedTeam,
  setLoading: state.setTeamsLoading,
  getTeamById: state.getTeamById
}))

export const usePlayers = () => useRugbyStore(state => ({
  players: state.players,
  selectedPlayer: state.selectedPlayer,
  loading: state.playersLoading,
  setPlayers: state.setPlayers,
  setSelectedPlayer: state.setSelectedPlayer,
  setLoading: state.setPlayersLoading,
  getPlayerById: state.getPlayerById,
  getPlayersByTeam: state.getPlayersByTeam
}))

export const useMatches = () => useRugbyStore(state => ({
  recentMatches: state.recentMatches,
  upcomingMatches: state.upcomingMatches,
  selectedMatch: state.selectedMatch,
  loading: state.matchesLoading,
  setRecentMatches: state.setRecentMatches,
  setUpcomingMatches: state.setUpcomingMatches,
  setSelectedMatch: state.setSelectedMatch,
  setLoading: state.setMatchesLoading,
  getMatchById: state.getMatchById,
  getMatchesByTeam: state.getMatchesByTeam
}))

export const useComparison = () => useRugbyStore(state => ({
  comparisonData: state.comparisonData,
  setComparisonTeams: state.setComparisonTeams,
  setComparisonPlayers: state.setComparisonPlayers,
  clearComparison: state.clearComparison
}))

export const useUI = () => useRugbyStore(state => ({
  sidebarOpen: state.sidebarOpen,
  theme: state.theme,
  setSidebarOpen: state.setSidebarOpen,
  setTheme: state.setTheme
}))
