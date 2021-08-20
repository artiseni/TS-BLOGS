import { Entity, Column, OneToMany } from 'typeorm'
import { hash, compare } from 'bcryptjs'
import { Request, Response } from 'express'
import { Infopost } from './Infopost'
import { verify } from 'jsonwebtoken'
import { config } from 'dotenv'
import { createAccessToken, createRefreshToken } from '../auth/token'
import Model from './Model'
config({ path: '../../.env' })


@Entity()
export class Infouser extends Model {

    req: any
    res: any

    constructor(req: Request, res: Response) {
        super()
        this.req = req
        this.res = res
    }

    @Column()
    username!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @OneToMany(() => Infopost, infopost => infopost.infouser)
    infopost!: Infopost[]


    register = async () => {
        try {
            const { username, email, password } = this.req.body
            const hased = await hash(password, 10)

            const existedEmail = await Infouser.findOne({ email })

            if (!existedEmail) {
                const user = Infouser.create({ username, email, password: hased })
                await user.save()
                return this.res.status(200).json(user)
            } else {
                return this.res.status(403).json({ message: "Email already exist!" })
            }

        } catch (error) {
            console.log(`${error}`)
        }
    }

    login = async () => {
        try {
            const { email, password } = this.req.body
            const data = await Infouser.findOne({ email })
            if (!data) {
                return this.res.status(404).json({ message: "Email not found!" })
            } else {
                const valid = await compare(password, data.password)

                if (data && valid) {
                    // console.log(data.id);
                    const token = createAccessToken(data.id)
                    const refresh = createRefreshToken(data.id)
                    return this.res.status(200).json({ token, refresh })
                } else {
                    return this.res.status(403).json({ message: "Wrong password!" })
                }

            }
        } catch (error) {
            console.log(`${error}`)
        }
    }

    isUser = async () => {
        const id = this.req.query
        const { status } = this.req

        if (status) {
            console.log(`${status}`)
            const { message } = status
            this.res.status(401).json({ message })
        } else {
            const data = await Infouser.findOne({ where: id })
            this.res.status(200).json(data)
        }

    }

    token = () => {
        const { token } = this.req.body
        if (token) {
            verify(token, process.env.REFRESH_TOKEN_SECRET_KEYS as string, (err: any, result: any) => {
                if (err) return this.res.staus(403).json({ messgae: "Invalid token" })
                const { userId } = result
                const newToken = createAccessToken(userId)
                this.res.status(200).json({ newToken })
            })
        }
    }

}