import React from 'react'
import { useRouter } from 'next/router'
import withAuth from '@/features/Auth/withAuth'
import TopNavbar from '@/components/layout/TopNavbar'
import {
  Box, Typography, Button, Card, CardContent, Divider, List, ListItem,
  ListItemIcon, ListItemText,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import GroupsIcon from '@mui/icons-material/Groups'
import AssignmentIcon from '@mui/icons-material/Assignment'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import BarChartIcon from '@mui/icons-material/BarChart'

const solutionData: Record<string, {
  title: string
  description: string
  icon: React.ElementType
  tag: string
  features: string[]
  howItWorks: string
}> = {
  'business-strategy': {
    title: 'Business Strategy Planner',
    description:
      'Define your business vision, set measurable goals, and create actionable roadmaps to drive growth and profitability.',
    icon: TrendingUpIcon,
    tag: 'Strategy',
    features: [
      'Vision and mission statement builder',
      'SWOT analysis templates',
      'Goal setting with OKR framework',
      'Quarterly strategy roadmaps',
      'Competitor analysis tools',
    ],
    howItWorks:
      'Start by defining your business vision, then break it down into strategic pillars. Set quarterly goals with measurable outcomes and track your progress over time.',
  },
  'financial-planning': {
    title: 'Financial Planning',
    description:
      'Track income, expenses, and cash flow projections. Build budgets and forecasts to keep your finances on track.',
    icon: AccountBalanceWalletIcon,
    tag: 'Finance',
    features: [
      'Income and expense tracking',
      'Cash flow projections',
      'Budget creation and monitoring',
      'Revenue forecasting',
      'Financial health scorecards',
    ],
    howItWorks:
      'Connect your financial data, set budgets for each category, and monitor real-time cash flow. Get alerts when spending exceeds thresholds.',
  },
  'team-management': {
    title: 'Team Management',
    description:
      'Organize your team structure, assign roles and responsibilities, and streamline communication across departments.',
    icon: GroupsIcon,
    tag: 'People',
    features: [
      'Organizational chart builder',
      'Role and responsibility mapping',
      'Team performance tracking',
      'Onboarding workflows',
      'Skills inventory management',
    ],
    howItWorks:
      'Map out your team structure, define clear roles, and set up workflows for hiring, onboarding, and performance reviews.',
  },
  'project-tracker': {
    title: 'Project Tracker',
    description:
      'Plan, execute, and monitor projects with timelines, milestones, and task assignments all in one place.',
    icon: AssignmentIcon,
    tag: 'Operations',
    features: [
      'Project timeline with Gantt view',
      'Milestone tracking',
      'Task assignment and dependencies',
      'Status reporting',
      'Resource allocation',
    ],
    howItWorks:
      'Create a project, define milestones, and break work into assignable tasks. Track progress in real time and adjust timelines as needed.',
  },
  scheduling: {
    title: 'Smart Scheduling',
    description:
      'Coordinate meetings, deadlines, and events with an intelligent calendar that adapts to your priorities.',
    icon: CalendarMonthIcon,
    tag: 'Productivity',
    features: [
      'Priority-based scheduling',
      'Meeting coordination',
      'Deadline management',
      'Recurring event support',
      'Calendar integrations',
    ],
    howItWorks:
      'Set your priorities and let the smart scheduler organize your week. Block focus time, coordinate meetings, and never miss a deadline.',
  },
  'analytics-dashboard': {
    title: 'Analytics Dashboard',
    description:
      'Visualize key business metrics, track performance trends, and make data-driven decisions with real-time insights.',
    icon: BarChartIcon,
    tag: 'Insights',
    features: [
      'Customizable metric widgets',
      'Trend analysis charts',
      'KPI scorecards',
      'Automated report generation',
      'Data export and sharing',
    ],
    howItWorks:
      'Select the metrics that matter most, configure your dashboard layout, and get real-time visualizations of your business performance.',
  },
}

const SolutionDetailPage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const solution = typeof id === 'string' ? solutionData[id] : null

  if (!solution) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <TopNavbar />
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#EDEDEE',
          }}
        >
          <Typography variant="h5" sx={{ color: '#4A5568' }}>
            Solution not found
          </Typography>
        </Box>
      </Box>
    )
  }

  const Icon = solution.icon

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
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          {/* Back button */}
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push('/solutions')}
            sx={{
              color: '#4A5568',
              fontWeight: 500,
              textTransform: 'none',
              mb: 3,
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
            }}
          >
            All Solutions
          </Button>

          {/* Header card */}
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              mb: 3,
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5, mb: 3 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    backgroundColor: '#F0F9EE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon sx={{ fontSize: 30, color: '#5B9A4D' }} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: '#1B2A4A',
                      fontSize: { xs: '1.5rem', md: '2rem' },
                      mb: 1,
                    }}
                  >
                    {solution.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#4A5568', lineHeight: 1.6 }}>
                    {solution.description}
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  backgroundColor: '#5B9A4D',
                  color: '#FFFFFF',
                  borderRadius: '50px',
                  py: 1.5,
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0 4px 14px rgba(91, 154, 77, 0.35)',
                  '&:hover': {
                    backgroundColor: '#4E8A42',
                    boxShadow: '0 6px 20px rgba(91, 154, 77, 0.45)',
                  },
                }}
              >
                Start using {solution.title}
              </Button>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              mb: 3,
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: '#1B2A4A', mb: 2 }}
              >
                How it works
              </Typography>
              <Typography variant="body1" sx={{ color: '#4A5568', lineHeight: 1.7 }}>
                {solution.howItWorks}
              </Typography>
            </CardContent>
          </Card>

          {/* Features */}
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: '#1B2A4A', mb: 1 }}
              >
                What you get
              </Typography>
              <List disablePadding>
                {solution.features.map((feature, index) => (
                  <React.Fragment key={feature}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleOutlineIcon sx={{ color: '#5B9A4D' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={feature}
                        primaryTypographyProps={{
                          sx: { color: '#1B2A4A', fontWeight: 500 },
                        }}
                      />
                    </ListItem>
                    {index < solution.features.length - 1 && (
                      <Divider sx={{ ml: '36px' }} />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}

export default withAuth(SolutionDetailPage)
