import db from "../../utils/db";
import { hashToken } from "../../utils/hash";

export const addRefreshTokenToWhiteList = ({ jti, refreshToken, userId }: Record<string, string>) => db.refreshToken.create({
    data: {
        id: jti,
        hashedToken: hashToken(refreshToken),
        userId
    }
})

export const findRefreshTokenById = (id: string) => db.refreshToken.findUnique({ where: { id } })

export const deleteRefreshToken = (id: string) => db.refreshToken.update({
    where: { id }, data: {
        revoked: true
    }
})

export const revokeTokens = (userId: string) => db.refreshToken.updateMany({
    where: { userId }, data: { revoked: true }
})