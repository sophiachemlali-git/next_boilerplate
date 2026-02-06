import React from 'react'
import { useQuery } from 'react-query'
import { User } from '@/types/api/user'
import { List, ListItem, ListItemText, Typography } from '@mui/material'

import Loading from '@/components/ui/Loading'
import UserService from '@/api/User'

const UsersList: React.FC = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[]>('users-query', UserService.getUsers, {
    enabled: true,
    staleTime: 1000 * 60 * 60 * 24,
  })

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return (
      <>
        <Typography color="error">Error fetching users</Typography>
      </>
    )
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Users List
      </Typography>
      {users && users.length > 0 ? (
        <List>
          {users.map(user => (
            <ListItem key={user.id}>
              <ListItemText primary={`${user.firstName} ${user.lastName}`} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No users found</Typography>
      )}
    </div>
  )
}

export default UsersList
