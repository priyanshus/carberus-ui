export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
  role: string
}


export interface Users {
  users: User[]
}
