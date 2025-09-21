// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/teams/stats')({
  component: () => (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-2'>Team Statistics</h2>
      <p className='text-muted-foreground'>Coming soon: team analytics, charts and comparisons.</p>
    </div>
  ),
})
