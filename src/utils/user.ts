import { ICognitoUserAttributeData } from 'amazon-cognito-identity-js'
import { RoleType } from '@/types/api/roles'

export const getUsernameAndEmail = (
  attributes: ICognitoUserAttributeData[]
): { username: string; email: string | null } => {
  const usernameAttribute = attributes.find(attr => attr.Name === 'username')
  const nameAttribute = attributes.find(attr => attr.Name === 'name')
  const emailAttribute = attributes.find(attr => attr.Name === 'email')

  const username = nameAttribute?.Value || usernameAttribute?.Value || 'Test User'
  const email = emailAttribute ? emailAttribute.Value : null

  return { username, email }
}

export const isAdminRole = (cognitoGroups: RoleType[]) => {
  return cognitoGroups?.includes(RoleType.ADMIN) || false
}

export const getUserInformation = (
  user: any
): { isAdmin: boolean; name: string; email: string; token: string | undefined } => {
  const idToken = user?.idToken
  const userToken = idToken?.jwtToken
  const userData = idToken?.payload
  const isUserAdmin = isAdminRole(userData?.['cognito:groups']) || false

  return {
    name: userData?.name || 'User',
    email: userData?.email || '',
    isAdmin: isUserAdmin,
    token: userToken,
  }
}

export const rolesList: string[] = Object.values(RoleType)
