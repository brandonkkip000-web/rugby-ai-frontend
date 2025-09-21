import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { Loader2, LogIn, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { IconFacebook, IconGithub } from '@/assets/brand-icons'
import { useAuthStore } from '@/stores/auth-store'
import { sleep, cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { RoleSelector } from '@/components/auth/role-selector'
import { UserRole } from '@/types/auth'

const formSchema = z.object({
  email: z.email({
    error: (iss) => (iss.input === '' ? 'Please enter your email' : undefined),
  }),
  password: z
    .string()
    .min(1, 'Please enter your password')
    .min(7, 'Password must be at least 7 characters long'),
  role: z.enum(['admin', 'coach', 'player', 'fan'], {
    required_error: 'Please select a role',
  }),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string
}

export function UserAuthForm({
  className,
  redirectTo,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [showRoleSelector, setShowRoleSelector] = useState(false)
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      role: undefined,
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (!selectedRole) {
      setShowRoleSelector(true)
      return
    }

    setIsLoading(true)

    // Mock successful authentication with role-based user
    const mockUser = {
      id: 'ACC001',
      email: data.email,
      name: data.email.split('@')[0],
      role: selectedRole,
      permissions: [], // Will be populated by backend based on role
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
    }

    toast.promise(sleep(2000), {
      loading: 'Signing in...',
      success: () => {
        setIsLoading(false)

        // Set user and access token
        auth.setUser(mockUser)
        auth.setAccessToken('mock-access-token')

        // Redirect to the stored location or default to dashboard
        const targetPath = redirectTo || '/'
        navigate({ to: targetPath, replace: true })

        return `Welcome back, ${data.email}! (${selectedRole})`
      },
      error: 'Error',
    })
  }

  if (showRoleSelector) {
    return (
      <div className={cn('space-y-6', className)}>
        <RoleSelector
          selectedRole={selectedRole}
          onRoleSelect={(role) => {
            setSelectedRole(role)
            form.setValue('role', role)
            setShowRoleSelector(false)
          }}
        />
        <Button
          variant="outline"
          onClick={() => setShowRoleSelector(false)}
          className="w-full"
        >
          Back to Login
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='name@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
              <Link
                to='/forgot-password'
                className='text-muted-foreground absolute end-0 -top-0.5 text-sm font-medium hover:opacity-75'
              >
                Forgot password?
              </Link>
            </FormItem>
          )}
        />
        
        {selectedRole && (
          <div className='p-3 bg-muted rounded-lg'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium'>Selected Role:</span>
              <span className='text-sm capitalize bg-primary text-primary-foreground px-2 py-1 rounded'>
                {selectedRole}
              </span>
            </div>
          </div>
        )}
        
        <Button 
          className='mt-2' 
          disabled={isLoading}
          type={selectedRole ? 'submit' : 'button'}
          onClick={selectedRole ? undefined : () => setShowRoleSelector(true)}
        >
          {isLoading ? (
            <Loader2 className='animate-spin' />
          ) : selectedRole ? (
            <>
              <LogIn className='mr-2' />
              Sign in
            </>
          ) : (
            <>
              <ArrowRight className='mr-2' />
              Select Role & Continue
            </>
          )}
        </Button>

        <div className='relative my-2'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background text-muted-foreground px-2'>
              Or continue with
            </span>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <Button 
            variant='outline' 
            type='button' 
            disabled={isLoading}
            onClick={() => {
              // TODO: Implement GitHub OAuth
              console.log('GitHub login clicked - OAuth will be implemented with backend')
            }}
          >
            <IconGithub className='h-4 w-4' /> GitHub
          </Button>
          <Button 
            variant='outline' 
            type='button' 
            disabled={isLoading}
            onClick={() => {
              // TODO: Implement Facebook OAuth
              console.log('Facebook login clicked - OAuth will be implemented with backend')
            }}
          >
            <IconFacebook className='h-4 w-4' /> Facebook
          </Button>
        </div>
      </form>
    </Form>
  )
}
