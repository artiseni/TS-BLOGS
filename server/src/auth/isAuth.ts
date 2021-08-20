import { verify } from 'jsonwebtoken'
import { Response } from 'express'
import { config as dotenv } from 'dotenv'
dotenv({ path: '../../.env' })


export const isAuth = (req: any, res: Response, next: any) => {
    const authHeader = <string>req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token === null) return res.status(401)

    verify(token, process.env.ACCESS_TOKEN_SECRET_KEYS as string, (err, result: any) => {
        if (err) {
            console.log(`${err}`)
            req.status = err
        } else {
            req.query.id = result.userId
        }
        next()
    })
}