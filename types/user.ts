export interface IUser {
    id: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
}

export interface IRefreshTokens {
    accessToken: string,
    refreshToken: string
}