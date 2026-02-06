import { apiClient } from '@/api/api-client'
import type { User } from '@/types/api/user'

const getUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>('/users')
  return response.data
}

const getUserById = async (userId: string): Promise<User> => {
  const response = await apiClient.get<User>(`/users/${userId}`)

  return response?.data
}

const UserService = {
  getUsers,
  getUserById,
  // ... continue with other services
}

export default UserService
