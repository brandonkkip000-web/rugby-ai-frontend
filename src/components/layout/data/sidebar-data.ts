import {
  LayoutDashboard,
  Monitor,
  HelpCircle,
  Bell,
  Palette,
  Settings,
  Wrench,
  UserCog,
  Trophy,
  Users2,
  BarChart3,
  Brain,
  Activity,
  Target,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Rugby Analyst',
    email: 'analyst@kenyarugby.co.ke',
    avatar: '/avatars/rugby-analyst.jpg',
  },
  teams: [
    {
      name: 'Kenya Rugby Analytics',
      logo: Trophy,
      plan: 'Premier League',
    },
    {
      name: 'Match Center',
      logo: Activity,
      plan: 'Live Updates',
    },
    {
      name: 'Performance Hub',
      logo: Target,
      plan: 'Advanced Analytics',
    },
  ],
  navGroups: [
    {
      title: 'Analytics',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Teams',
          url: '/teams',
          icon: Trophy,
        },
        {
          title: 'Players',
          url: '/players',
          icon: Users2,
        },
        {
          title: 'Comparisons',
          url: '/comparisons',
          icon: BarChart3,
        },
        {
          title: 'Insights',
          url: '/insights',
          icon: Brain,
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: Monitor,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: HelpCircle,
        },
      ],
    },
  ],
}
