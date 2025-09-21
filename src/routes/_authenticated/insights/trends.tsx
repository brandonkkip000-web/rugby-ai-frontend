// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/insights/trends')({
  component: () => (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-2'>Performance Trends</h2>
      <p className='text-muted-foreground'>Coming soon: season-long performance trend analysis.</p>
    </div>
  ),
})
