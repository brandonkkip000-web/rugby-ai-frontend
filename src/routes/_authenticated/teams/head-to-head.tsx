// @ts-nocheck
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/teams/head-to-head')({
  component: () => (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-2'>Head-to-Head</h2>
      <p className='text-muted-foreground'>Coming soon: team vs team historical comparisons.</p>
    </div>
  ),
})
