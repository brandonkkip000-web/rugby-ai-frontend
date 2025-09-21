import { createFileRoute } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { useAuthStore } from '@/stores/auth-store'
import { redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context, location }) => {
    const token = useAuthStore.getState().auth.accessToken
    if (!token) {
      const toUrl = location.href ?? window.location.href
      throw redirect({ to: '/sign-in', search: { redirect: toUrl } })
    }
    return { queryClient: context.queryClient }
  },
  component: AuthenticatedLayout,
})
