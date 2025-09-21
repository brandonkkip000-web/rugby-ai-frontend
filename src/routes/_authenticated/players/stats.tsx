// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/players/stats')({
  component: () => (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-2'>Player Statistics</h2>
      <p className='text-muted-foreground'>Coming soon: player metrics, charts and leaderboards.</p>
    </div>
  ),
})
