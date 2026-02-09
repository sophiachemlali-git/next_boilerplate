import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/EditOutlined'
import CancelIcon from '@mui/icons-material/CloseOutlined'
import PersonIcon from '@mui/icons-material/PersonOutlined'
import ButtonWithLoading from '@/components/ui/ButtonWithLoading'
import Notification from '@/components/ui/Notification'

import { useSelector } from 'react-redux'
import { selectUserInfo } from '@/store/selectors/authSelectors'

const isMockAuth = !!process.env.NEXT_PUBLIC_MOCK_AUTH

const Profile: React.FC = () => {
  const userInfo = useSelector(selectUserInfo)

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Editable fields
  const [name, setName] = useState(userInfo.name || '')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    setName(userInfo.name || '')
  }, [userInfo.name])

  const handleEdit = () => {
    setIsEditing(true)
    setSuccessMessage(null)
    setErrorMessage(null)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setName(userInfo.name || '')
    setPhone('')
    setSuccessMessage(null)
    setErrorMessage(null)
  }

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setSuccessMessage(null)
    setErrorMessage(null)

    try {
      if (isMockAuth) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 600))
      } else {
        // In a real implementation, call Cognito setAttribute or your API
        // e.g. await setAttribute({ Name: 'name', Value: name })
        // e.g. await setAttribute({ Name: 'phone_number', Value: phone })
        const { setAttribute } = await import('@/lib/cognito')
        if (name !== userInfo.name) {
          await setAttribute({ Name: 'name', Value: name })
        }
        if (phone) {
          await setAttribute({ Name: 'phone_number', Value: phone })
        }
      }

      setSuccessMessage('Profile updated successfully.')
      setIsEditing(false)
    } catch (error) {
      setErrorMessage('Failed to update profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography component="h1" variant="h4" color="primary">
          My Profile
        </Typography>
        {!isEditing ? (
          <IconButton onClick={handleEdit} color="secondary" aria-label="Edit profile">
            <EditIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleCancel} color="default" aria-label="Cancel editing">
            <CancelIcon />
          </IconButton>
        )}
      </Box>

      {successMessage && (
        <Box sx={{ mb: 2 }}>
          <Notification severity="success" message={successMessage} />
        </Box>
      )}
      {errorMessage && (
        <Box sx={{ mb: 2 }}>
          <Notification severity="error" message={errorMessage} />
        </Box>
      )}

      <Card variant="outlined">
        <CardContent sx={{ p: 4 }}>
          {/* Avatar + basic info header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              sx={{
                width: 72,
                height: 72,
                bgcolor: 'secondary.main',
                mr: 3,
                fontSize: '2rem',
              }}
            >
              <PersonIcon sx={{ fontSize: '2.5rem' }} />
            </Avatar>
            <Box>
              <Typography variant="h6" color="primary">
                {userInfo.name || 'User'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userInfo.email || ''}
              </Typography>
              {userInfo.isAdmin && (
                <Typography
                  variant="caption"
                  sx={{
                    mt: 0.5,
                    display: 'inline-block',
                    bgcolor: 'secondary.main',
                    color: 'white',
                    px: 1,
                    py: 0.25,
                    borderRadius: 1,
                  }}
                >
                  Admin
                </Typography>
              )}
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {isEditing ? (
            <Box component="form" onSubmit={handleSave} noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    color="primary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    value={userInfo.email || ''}
                    disabled
                    helperText="Email cannot be changed"
                    color="primary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    color="primary"
                  />
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
                <ButtonWithLoading
                  label="Cancel"
                  isLoading={false}
                  variant="outlined"
                  fullWidth={false}
                  buttonProps={{
                    type: 'button',
                    onClick: handleCancel,
                    sx: { mt: 0, mb: 0, minWidth: 120 },
                  }}
                />
                <ButtonWithLoading
                  label="Save Changes"
                  isLoading={loading}
                  disabled={!name.trim()}
                  fullWidth={false}
                  buttonProps={{
                    type: 'submit',
                    sx: { mt: 0, mb: 0, minWidth: 120 },
                  }}
                />
              </Box>
            </Box>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="text.secondary">
                  Full Name
                </Typography>
                <Typography variant="body1" color="primary" sx={{ fontWeight: 500 }}>
                  {userInfo.name || '--'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="text.secondary">
                  Email Address
                </Typography>
                <Typography variant="body1" color="primary" sx={{ fontWeight: 500 }}>
                  {userInfo.email || '--'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="text.secondary">
                  Phone Number
                </Typography>
                <Typography variant="body1" color="primary" sx={{ fontWeight: 500 }}>
                  {phone || 'Not set'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="text.secondary">
                  Role
                </Typography>
                <Typography variant="body1" color="primary" sx={{ fontWeight: 500 }}>
                  {userInfo.isAdmin ? 'Administrator' : 'User'}
                </Typography>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default Profile
