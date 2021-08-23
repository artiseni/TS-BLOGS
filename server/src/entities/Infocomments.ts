import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { Infouser } from './Infouser'
import { Infopost } from './Infopost'
import { Request, Response } from 'express'
import Model from './Model'


@Entity()
export class Infocomments extends Model {

    req: any
    res: any

    constructor(req: Request, res: Response) {
        super()
        this.req = req
        this.res = res
    }

    @Column()
    username?: string

    @Column({ type: 'text' })
    comments!: string

    @Column()
    infouserId?: number

    @Column()
    infopostId?: number

    @ManyToOne(() => Infopost, infopost => infopost.infocomments, { onDelete: 'CASCADE' })
    infopost!: Infopost[]

    addComment = async () => {
        const { username, user_uuid, post_uuid, comments } = this.req.body

        try {
            console.log(this.req.body)

            const user = await Infouser.findOne({ uuid: user_uuid })
            const post = await Infopost.findOne({ uuid: post_uuid })

            if (user && post) {

                const data = Infocomments.create({ username, comments, infouserId: user.id, infopostId: post.id })
                await data.save()
                return this.res.status(200).json(data)
            }

            // this.res.status(200).json({ message: "Ok!" })

        } catch (error) {
            console.log(`${error}`)
            return this.res.status(401).json(error)
        }
    }

}