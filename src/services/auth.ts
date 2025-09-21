// Lightweight auth service placeholders ready for backend integration
// No mock users are hardcoded; these functions simply provide hooks
// to plug in real API calls later.

export type UserRole = 'admin' | 'coach' | 'player' | 'fan'

export interface Session {
  accessToken: string
  role?: UserRole
}

// Simulate fetching the current session from storage or backend
export async function getCurrentSession(): Promise<Session | null> {
  // TODO: Integrate with real backend session lookup
  return null
}

// Exchange credentials for a token (placeholder)
export async function signIn(_email: string, _password: string): Promise<Session> {
  // TODO: Replace with real API call
  // Return a shape without revealing any user details
  return { accessToken: 'temp-token' }
}

export async function signOut(): Promise<void> {
  // TODO: Invalidate token with backend when available
}

// Optional helper to fetch role from token
export async function fetchUserRole(_token: string): Promise<UserRole | null> {
  // TODO: Call backend to resolve role from token
  return null
}
