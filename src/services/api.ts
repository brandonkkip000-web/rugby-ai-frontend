// Type definitions for rugby data
export interface Team {
  id: string
  name: string
  shortName: string
  colors: string[]
  stats: {
    points: number
    wins: number
    losses: number
    draws: number
    tries: number
    possession: number
    territory: number
    scrumSuccess: number
    lineoutSuccess: number
    discipline: number
  }
}

export interface Player {
  id: string
  name: string
  position: string
  teamId: string
  age: number
  height: string
  weight: string
  nationality: string
  stats: {
    tries: number
    tackles: number
    metersGained: number
    kickingMeters: number
    lineoutsWon: number
    scrumsWon: number
    penalties: number
    yellowCards: number
    redCards: number
  }
}

export interface Match {
  id: string
  homeTeamId: string
  awayTeamId: string
  homeScore: number
  awayScore: number
  date: string
  status: 'completed' | 'upcoming' | 'live'
  stats: {
    home: {
      tries: number
      conversions: number
      penalties: number
      possession: number
      territory: number
    }
    away: {
      tries: number
      conversions: number
      penalties: number
      possession: number
      territory: number
    }
  }
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Teams API
export const teamsApi = {
  getAll: async (): Promise<Team[]> => {
    await delay(300)
    return [] // Empty array - will be populated by backend
  },

  getById: async (id: string): Promise<Team | null> => {
    await delay(200)
    return null // Will be populated by backend
  },

  getStats: async (id: string): Promise<Team['stats'] | null> => {
    await delay(250)
    return null // Will be populated by backend
  }
}

// Players API
export const playersApi = {
  getAll: async (): Promise<Player[]> => {
    await delay(300)
    return [] // Empty array - will be populated by backend
  },

  getById: async (id: string): Promise<Player | null> => {
    await delay(200)
    return null // Will be populated by backend
  },

  getByTeam: async (teamId: string): Promise<Player[]> => {
    await delay(250)
    return [] // Empty array - will be populated by backend
  },

  getStats: async (id: string): Promise<Player['stats'] | null> => {
    await delay(200)
    return null // Will be populated by backend
  }
}

// Matches API
export const matchesApi = {
  getAll: async (): Promise<Match[]> => {
    await delay(300)
    return [] // Empty array - will be populated by backend
  },

  getRecent: async (limit: number = 5): Promise<Match[]> => {
    await delay(200)
    return [] // Empty array - will be populated by backend
  },

  getUpcoming: async (limit: number = 5): Promise<Match[]> => {
    await delay(200)
    return [] // Empty array - will be populated by backend
  },

  getById: async (id: string): Promise<Match | null> => {
    await delay(200)
    return null // Will be populated by backend
  },

  getByTeam: async (teamId: string): Promise<Match[]> => {
    await delay(250)
    return [] // Empty array - will be populated by backend
  }
}

// Analytics API
export const analyticsApi = {
  getTeamComparison: async (teamId1: string, teamId2: string) => {
    await delay(400)
    throw new Error('Backend not implemented - team comparison data will be available when backend is ready')
  },

  getPlayerComparison: async (playerId1: string, playerId2: string) => {
    await delay(400)
    throw new Error('Backend not implemented - player comparison data will be available when backend is ready')
  },

  getDashboardStats: async () => {
    await delay(500)
    
    return {
      totalMatches: 0,
      totalTries: 0,
      totalPoints: 0,
      topScoringTeam: {
        id: '',
        name: 'No data available',
        tries: 0
      },
      recentMatches: [],
      upcomingMatches: []
    }
  }
}

// Future API endpoints for AI insights (commented for future implementation)
/*
export const insightsApi = {
  getPredictions: async (teamId1: string, teamId2: string) => {
    // TODO: Implement AI-powered match predictions
    throw new Error('AI insights not yet implemented')
  },

  getTacticalSuggestions: async (teamId: string) => {
    // TODO: Implement tactical analysis based on historical data
    throw new Error('AI insights not yet implemented')
  },

  getPlayerRecommendations: async (teamId: string, position: string) => {
    // TODO: Implement player recommendation system
    throw new Error('AI insights not yet implemented')
  }
}
*/

// WebSocket simulation for live updates (commented for future implementation)
/*
export const liveUpdatesApi = {
  subscribeToMatch: (matchId: string, callback: (data: any) => void) => {
    // TODO: Implement WebSocket connection for live match updates
    console.log(`Subscribing to live updates for match ${matchId}`)
  },

  unsubscribeFromMatch: (matchId: string) => {
    // TODO: Implement WebSocket disconnection
    console.log(`Unsubscribing from live updates for match ${matchId}`)
  }
}
*/

// Utility functions for formatting
export const formatMatchDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const getMatchStatusColor = (status: Match['status']): string => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'live':
      return 'bg-red-100 text-red-800'
    case 'upcoming':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}