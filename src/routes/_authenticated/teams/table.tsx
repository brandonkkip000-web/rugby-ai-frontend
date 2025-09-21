// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/teams/table')({
  component: () => (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-2'>League Table</h2>
      <p className='text-muted-foreground'>Coming soon: table standings, form and points.</p>
    </div>
  ),
})
