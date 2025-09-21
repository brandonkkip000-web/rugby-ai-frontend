// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/players/positions')({
  component: () => (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-2'>Players by Position</h2>
      <p className='text-muted-foreground'>Coming soon: distribution and analytics by playing position.</p>
    </div>
  ),
})
