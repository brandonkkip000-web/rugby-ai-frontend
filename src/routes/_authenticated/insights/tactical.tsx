// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/insights/tactical')({
  component: () => (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-2'>Tactical Analysis</h2>
      <p className='text-muted-foreground'>Coming soon: AI tactical recommendations and analysis.</p>
    </div>
  ),
})
