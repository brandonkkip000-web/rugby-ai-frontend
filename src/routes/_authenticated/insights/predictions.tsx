// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/insights/predictions')({
  component: () => (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-2'>Predictions</h2>
      <p className='text-muted-foreground'>Coming soon: AI-powered match outcome predictions.</p>
    </div>
  ),
})
