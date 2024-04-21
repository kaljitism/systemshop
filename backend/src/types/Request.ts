/* eslint-disable @typescript-eslint/no-namespace,
@typescript-eslint/no-unused-vars */
declare namespace Express {
  // noinspection JSUnusedGlobalSymbols
  export interface Request {
    user: {
      _id: string
      name: string
      email: string
      isAdmin: boolean
      token: string
    }
  }
}