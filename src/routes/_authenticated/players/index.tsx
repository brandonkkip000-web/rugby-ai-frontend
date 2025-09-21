import { createFileRoute } from '@tanstack/react-router'
import { Players } from '@/features/players'

export const Route = createFileRoute('/_authenticated/players/')({
  component: Players,
})
