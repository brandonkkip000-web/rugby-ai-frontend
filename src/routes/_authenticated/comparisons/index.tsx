import { createFileRoute } from '@tanstack/react-router'
import { Comparisons } from '@/features/comparisons'

export const Route = createFileRoute('/_authenticated/comparisons/')({
  component: Comparisons,
})
