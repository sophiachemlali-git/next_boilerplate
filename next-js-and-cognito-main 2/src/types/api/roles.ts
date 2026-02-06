export enum RoleType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface Role {
  id: number
  name: RoleType
  description?: string
  createdAt?: string
  updatedAt?: string
}
