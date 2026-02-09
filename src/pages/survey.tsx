import React, { useState } from 'react'
import { useRouter } from 'next/router'
import withAuth from '@/features/Auth/withAuth'
import TopNavbar from '@/components/layout/TopNavbar'
import {
  Box, Typography, Button, RadioGroup, FormControlLabel, Radio,
  TextField, LinearProgress, Card, CardContent,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface Question {
  id: number
  question: string
  type: 'radio' | 'text'
  options?: string[]
  placeholder?: string
}

const questions: Question[] = [
  {
    id: 1,
    question: 'What industry does your business operate in?',
    type: 'radio',
    options: [
      'Technology & Software',
      'Healthcare & Life Sciences',
      'Financial Services',
      'Retail & E-Commerce',
      'Manufacturing',
      'Other',
    ],
  },
  {
    id: 2,
    question: 'How many employees does your company have?',
    type: 'radio',
    options: [
      'Just me (Solopreneur)',
      '2 - 10',
      '11 - 50',
      '51 - 200',
      '201+',
    ],
  },
  {
    id: 3,
    question: 'What is the biggest challenge your business faces right now?',
    type: 'text',
    placeholder: 'Describe your main business challenge...',
  },
]

const SurveyPage: React.FC = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const current = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100
  const isAnswered = !!answers[current.id]?.trim()
  const isLastStep = currentStep === questions.length - 1

  const handleNext = () => {
    if (isLastStep) {
      router.push('/dashboard')
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopNavbar />

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#EDEDEE',
          px: 3,
          py: 6,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 600 }}>
          {/* Progress */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ color: '#4A5568', fontWeight: 500 }}>
                Question {currentStep + 1} of {questions.length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#4A5568', fontWeight: 500 }}>
                {Math.round(progress)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: '#D1D5DB',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  backgroundColor: '#5B9A4D',
                },
              }}
            />
          </Box>

          {/* Question Card */}
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: '#1B2A4A',
                  mb: 3,
                  lineHeight: 1.3,
                }}
              >
                {current.question}
              </Typography>

              {current.type === 'radio' && current.options && (
                <RadioGroup
                  value={answers[current.id] || ''}
                  onChange={(e) =>
                    setAnswers((prev) => ({ ...prev, [current.id]: e.target.value }))
                  }
                >
                  {current.options.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={
                        <Radio
                          sx={{
                            color: '#9CA3AF',
                            '&.Mui-checked': { color: '#5B9A4D' },
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ color: '#1B2A4A', fontWeight: 400 }}>
                          {option}
                        </Typography>
                      }
                      sx={{
                        border: '1px solid',
                        borderColor: answers[current.id] === option ? '#5B9A4D' : '#E2E8F0',
                        borderRadius: 2,
                        px: 2,
                        py: 0.5,
                        mb: 1.5,
                        mx: 0,
                        backgroundColor: answers[current.id] === option ? '#F0F9EE' : 'transparent',
                        transition: 'all 0.15s ease',
                        '&:hover': {
                          borderColor: '#5B9A4D',
                          backgroundColor: '#F0F9EE',
                        },
                      }}
                    />
                  ))}
                </RadioGroup>
              )}

              {current.type === 'text' && (
                <TextField
                  multiline
                  rows={5}
                  fullWidth
                  placeholder={current.placeholder}
                  value={answers[current.id] || ''}
                  onChange={(e) =>
                    setAnswers((prev) => ({ ...prev, [current.id]: e.target.value }))
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: '#5B9A4D',
                      },
                    },
                  }}
                />
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              disabled={currentStep === 0}
              onClick={handleBack}
              sx={{
                borderColor: '#1B2A4A',
                color: '#1B2A4A',
                borderRadius: '50px',
                px: 4,
                py: 1.2,
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#1B2A4A',
                  backgroundColor: 'rgba(27, 42, 74, 0.04)',
                },
                '&.Mui-disabled': {
                  borderColor: '#D1D5DB',
                  color: '#D1D5DB',
                },
              }}
            >
              Back
            </Button>

            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              disabled={!isAnswered}
              onClick={handleNext}
              sx={{
                backgroundColor: '#5B9A4D',
                color: '#FFFFFF',
                borderRadius: '50px',
                px: 4,
                py: 1.2,
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 4px 14px rgba(91, 154, 77, 0.35)',
                '&:hover': {
                  backgroundColor: '#4E8A42',
                },
                '&.Mui-disabled': {
                  backgroundColor: '#D1D5DB',
                  color: '#FFFFFF',
                },
              }}
            >
              {isLastStep ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default withAuth(SurveyPage)
