
export const USER_ROLES = ['Tester','Admin','Test Manager','Viewer'] as const

export type UserRole = typeof USER_ROLES[number]