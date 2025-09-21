// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/players/top')({
  component: () => (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-2'>Top Performers</h2>
      <p className='text-muted-foreground'>Coming soon: weekly and season top performers.</p>
    </div>
  ),
})
