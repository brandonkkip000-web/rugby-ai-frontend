import { createFileRoute } from '@tanstack/react-router'
import { PlayerDetail } from '@/features/players/player-detail'

export const Route = createFileRoute('/_authenticated/players/$playerId')({
  component: PlayerDetail,
})
