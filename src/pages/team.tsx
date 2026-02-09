import React, { useState } from 'react'
import withAuth from '@/features/Auth/withAuth'
import TopNavbar from '@/components/layout/TopNavbar'
import { useSelector } from 'react-redux'
import { selectUserInfo } from '@/store/selectors/authSelectors'
import {
  Box, Typography, Button, TextField, Card, CardContent, Avatar,
  IconButton, Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  MenuItem, Select, InputLabel, FormControl, Snackbar, Alert,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import GroupsIcon from '@mui/icons-material/Groups'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'

type Role = 'Admin' | 'Editor' | 'Viewer'

interface TeamMember {
  id: string
  name: string
  email: string
  role: Role
  avatarColor: string
}

const avatarColors = ['#5B9A4D', '#1B2A4A', '#2F90B0', '#D97706', '#9333EA', '#DC2626']

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const TeamPage: React.FC = () => {
  const userInfo = useSelector(selectUserInfo)

  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: userInfo.name || 'You',
      email: userInfo.email || 'you@company.com',
      role: 'Admin',
      avatarColor: avatarColors[0],
    },
  ])

  const [dialogOpen, setDialogOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newRole, setNewRole] = useState<Role>('Viewer')
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  })

  const handleAddMember = () => {
    if (!newName.trim() || !newEmail.trim()) {
      setSnackbar({ open: true, message: 'Name and email are required.', severity: 'error' })
      return
    }

    if (members.some((m) => m.email.toLowerCase() === newEmail.toLowerCase())) {
      setSnackbar({ open: true, message: 'This email has already been added.', severity: 'error' })
      return
    }

    const member: TeamMember = {
      id: Date.now().toString(),
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      avatarColor: avatarColors[members.length % avatarColors.length],
    }

    setMembers((prev) => [...prev, member])
    setNewName('')
    setNewEmail('')
    setNewRole('Viewer')
    setDialogOpen(false)
    setSnackbar({ open: true, message: `${member.name} has been added to the team.`, severity: 'success' })
  }

  const handleRemoveMember = (id: string) => {
    const member = members.find((m) => m.id === id)
    setMembers((prev) => prev.filter((m) => m.id !== id))
    if (member) {
      setSnackbar({ open: true, message: `${member.name} has been removed.`, severity: 'success' })
    }
  }

  const handleRoleChange = (id: string, role: Role) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role } : m))
    )
  }

  const roleColor: Record<Role, string> = {
    Admin: '#1B2A4A',
    Editor: '#5B9A4D',
    Viewer: '#4A5568',
  }

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
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <GroupsIcon sx={{ fontSize: 32, color: '#1B2A4A' }} />
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: '#1B2A4A',
                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                  }}
                >
                  Your Team
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: '#4A5568', lineHeight: 1.6 }}>
                {members.length === 1
                  ? 'Add team members to start collaborating.'
                  : `${members.length} member${members.length > 1 ? 's' : ''} on your team.`}
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<PersonAddAltIcon />}
              onClick={() => setDialogOpen(true)}
              sx={{
                backgroundColor: '#5B9A4D',
                color: '#FFFFFF',
                borderRadius: '50px',
                px: 3,
                py: 1.2,
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 4px 14px rgba(91, 154, 77, 0.35)',
                '&:hover': {
                  backgroundColor: '#4E8A42',
                  boxShadow: '0 6px 20px rgba(91, 154, 77, 0.45)',
                },
              }}
            >
              Add Member
            </Button>
          </Box>

          {/* Members List */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {members.map((member) => (
              <Card
                key={member.id}
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2.5,
                    py: 2.5,
                    px: 3,
                    '&:last-child': { pb: 2.5 },
                  }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: member.avatarColor,
                      width: 48,
                      height: 48,
                      fontWeight: 700,
                      fontSize: '1rem',
                    }}
                  >
                    {getInitials(member.name)}
                  </Avatar>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, color: '#1B2A4A', lineHeight: 1.3 }}
                    >
                      {member.name}
                      {member.id === '1' && (
                        <Chip
                          label="You"
                          size="small"
                          sx={{
                            ml: 1,
                            height: 22,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            backgroundColor: '#F0F9EE',
                            color: '#5B9A4D',
                          }}
                        />
                      )}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: '#4A5568', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {member.email}
                    </Typography>
                  </Box>

                  <FormControl size="small" sx={{ minWidth: 110 }}>
                    <Select
                      value={member.role}
                      onChange={(e) => handleRoleChange(member.id, e.target.value as Role)}
                      disabled={member.id === '1'}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        color: roleColor[member.role],
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#E2E8F0',
                        },
                      }}
                    >
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Editor">Editor</MenuItem>
                      <MenuItem value="Viewer">Viewer</MenuItem>
                    </Select>
                  </FormControl>

                  {member.id !== '1' && (
                    <IconButton
                      onClick={() => handleRemoveMember(member.id)}
                      sx={{ color: '#94A3B8', '&:hover': { color: '#DC2626' } }}
                      aria-label={`Remove ${member.name}`}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Empty state when only the owner exists */}
          {members.length === 1 && (
            <Box
              sx={{
                mt: 4,
                textAlign: 'center',
                py: 6,
                backgroundColor: '#FFFFFF',
                borderRadius: 3,
                border: '1px dashed #CBD5E1',
              }}
            >
              <PersonAddAltIcon sx={{ fontSize: 48, color: '#CBD5E1', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#4A5568', fontWeight: 600, mb: 1 }}>
                No team members yet
              </Typography>
              <Typography variant="body2" sx={{ color: '#94A3B8', mb: 3 }}>
                Invite people to collaborate on solutions together.
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setDialogOpen(true)}
                sx={{
                  borderColor: '#5B9A4D',
                  color: '#5B9A4D',
                  borderRadius: '50px',
                  px: 3,
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: '#4E8A42',
                    backgroundColor: '#F0F9EE',
                  },
                }}
              >
                Add your first member
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* Add Member Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: '#1B2A4A', fontSize: '1.25rem' }}>
          Add Team Member
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: '16px !important' }}>
          <TextField
            label="Full Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            fullWidth
            size="small"
            placeholder="Jane Smith"
          />
          <TextField
            label="Email Address"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            fullWidth
            size="small"
            type="email"
            placeholder="jane@company.com"
          />
          <FormControl fullWidth size="small">
            <InputLabel>Role</InputLabel>
            <Select
              value={newRole}
              label="Role"
              onChange={(e) => setNewRole(e.target.value as Role)}
            >
              <MenuItem value="Admin">Admin - Full access</MenuItem>
              <MenuItem value="Editor">Editor - Can edit</MenuItem>
              <MenuItem value="Viewer">Viewer - Read only</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setDialogOpen(false)}
            sx={{ textTransform: 'none', color: '#4A5568', fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddMember}
            sx={{
              backgroundColor: '#5B9A4D',
              color: '#FFFFFF',
              borderRadius: '50px',
              px: 3,
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': { backgroundColor: '#4E8A42' },
            }}
          >
            Add to Team
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default withAuth(TeamPage)
