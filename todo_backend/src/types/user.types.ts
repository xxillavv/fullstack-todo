export interface IUsers {
  username: string,
  email: string,
  hashPassword: string,
}

export interface IUserDB {
  username: string,
  email: string,
  hashPassword: string,
  refreshToken: string
}

export interface IUserFront {
  username: string,
  email: string,
  hashPassword: string,
  authToken: string
}