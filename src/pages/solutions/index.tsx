import React from 'react'
import { useRouter } from 'next/router'
import withAuth from '@/features/Auth/withAuth'
import TopNavbar from '@/components/layout/TopNavbar'
import { Box, Typography, Card, CardContent, CardActionArea, Chip } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import GroupsIcon from '@mui/icons-material/Groups'
import AssignmentIcon from '@mui/icons-material/Assignment'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import BarChartIcon from '@mui/icons-material/BarChart'

const solutions = [
  {
    id: 'business-strategy',
    title: 'Business Strategy Planner',
    description:
      'Define your business vision, set measurable goals, and create actionable roadmaps to drive growth and profitability.',
    icon: TrendingUpIcon,
    tag: 'Strategy',
  },
  {
    id: 'financial-planning',
    title: 'Financial Planning',
    description:
      'Track income, expenses, and cash flow projections. Build budgets and forecasts to keep your finances on track.',
    icon: AccountBalanceWalletIcon,
    tag: 'Finance',
  },
  {
    id: 'team-management',
    title: 'Team Management',
    description:
      'Organize your team structure, assign roles and responsibilities, and streamline communication across departments.',
    icon: GroupsIcon,
    tag: 'People',
  },
  {
    id: 'project-tracker',
    title: 'Project Tracker',
    description:
      'Plan, execute, and monitor projects with timelines, milestones, and task assignments all in one place.',
    icon: AssignmentIcon,
    tag: 'Operations',
  },
  {
    id: 'scheduling',
    title: 'Smart Scheduling',
    description:
      'Coordinate meetings, deadlines, and events with an intelligent calendar that adapts to your priorities.',
    icon: CalendarMonthIcon,
    tag: 'Productivity',
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    description:
      'Visualize key business metrics, track performance trends, and make data-driven decisions with real-time insights.',
    icon: BarChartIcon,
    tag: 'Insights',
  },
]

const SolutionsPage: React.FC = () => {
  const router = useRouter()

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopNavbar />

      <Box
        sx={{
          flex: 1,
          backgroundColor: '#EDEDEE',
          px: { xs: 2, md: 6 },
          py: { xs: 4, md: 6 },
        }}
      >
        {/* Header */}
        <Box sx={{ maxWidth: 1100, mx: 'auto', mb: 5 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: '#1B2A4A',
              mb: 1.5,
              fontSize: { xs: '1.75rem', md: '2.5rem' },
            }}
          >
            Solutions
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#4A5568',
              fontSize: { xs: '1rem', md: '1.125rem' },
              maxWidth: 600,
              lineHeight: 1.6,
            }}
          >
            Choose a solution to get started. Each tool is designed to simplify a specific area of your business.
          </Typography>
        </Box>

        {/* Solutions Grid */}
        <Box
          sx={{
            maxWidth: 1100,
            mx: 'auto',
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {solutions.map((solution) => {
            const Icon = solution.icon

            return (
              <Card
                key={solution.id}
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#5B9A4D',
                    boxShadow: '0 4px 20px rgba(91, 154, 77, 0.12)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <CardActionArea
                  onClick={() => router.push(`/solutions/${solution.id}`)}
                  sx={{ height: '100%' }}
                >
                  <CardContent sx={{ p: 3.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          backgroundColor: '#F0F9EE',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon sx={{ fontSize: 26, color: '#5B9A4D' }} />
                      </Box>
                      <Chip
                        label={solution.tag}
                        size="small"
                        sx={{
                          backgroundColor: '#F0F9EE',
                          color: '#5B9A4D',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                        }}
                      />
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: '#1B2A4A', fontSize: '1.1rem' }}
                    >
                      {solution.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: '#4A5568', lineHeight: 1.6 }}
                    >
                      {solution.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default withAuth(SolutionsPage)
