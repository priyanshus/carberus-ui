export interface User {
  id: string
  email: string
  createdAt: string
  roles: string[]
}


export interface Users {
  users: User[]
}
