import { sign } from 'jsonwebtoken'
import { config as dotenv } from 'dotenv'
dotenv({ path: '../../.env' })


const createAccessToken = (userId: number) => {
    return sign({ userId }, process.env.ACCESS_TOKEN_SECRET_KEYS as string, { expiresIn: '60s' })
}

const createRefreshToken = (userId: number) => {
    return sign({ userId }, process.env.REFRESH_TOKEN_SECRET_KEYS as string, { expiresIn: '7d' })
}

export { createAccessToken, createRefreshToken }
