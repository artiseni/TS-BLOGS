import { Entity, Column, ManyToOne } from 'typeorm'
import { Infouser } from './Infouser'
import { Request, Response } from 'express'
import Model from './Model'


@Entity()
export class Infopost extends Model {

    req: any
    res: any

    constructor(req: Request, res: Response) {
        super()
        this.req = req
        this.res = res
    }

    @Column({ type: 'text' })
    title!: string

    @Column({ type: 'text' })
    content!: string

    @Column()
    infouserId?: number

    @ManyToOne(() => Infouser)
    infouser!: Infouser


    index = async () => {
        const { currentPage, take } = this.req.query
        try {
            const data = await Infopost.findAndCount({
                order: { updatedAt: 'DESC' },
                skip: (currentPage * take) - take,
                take,
                relations: ['infouser']
            })
            if (data) {
                this.res.status(200).json(data)
            }
        } catch (error) {
            console.log(`${error}`)
        }
    }

    myPost = async () => {
        try {
            const { uuid, currentPage, take } = this.req.query
            const data = await Infouser.findOne({ uuid })

            if (data) {
                const { id } = data
                const res = await Infopost.findAndCount({
                    order: { updatedAt: 'DESC' },
                    relations: ['infouser'],
                    skip: (currentPage * take) - take,
                    take,
                    where: { infouserId: id }
                })
                if (res) {
                    this.res.status(200).json(res)
                }
            }

        } catch (error) {
            console.log(`${error}`)
            this.res.status(404).json({ message: "uuid not found!" })
        }
    }


    updatePost = async () => {
        try {
            const { uuid, title, content } = this.req.body
            const post: any = await Infopost.findOne({ uuid })

            post.title = title
            post.content = content
            const update: any = await Infopost.save(post)
            return this.res.status(200).json(post)

        } catch (err) {
            console.log(`${err}`)
            this.res.status(401).json(err)
        }
    }


    addPost = async () => {
        try {
            const { uuid, title, content } = this.req.body
            const user = await Infouser.findOne({ uuid })
            if (user) {
                const { id } = user
                const data = Infopost.create({ title, content, infouserId: id })
                await data.save()
                return this.res.status(200).json(data)
            }

        } catch (error) {
            console.log(`${error}`)
            return this.res.status(401).json(error)
        }
    }

    deletePost = async () => {
        try {
            const { uuid } = this.req.body
            const post = await Infopost.findOne({ uuid })
            if (post) {
                const data = await Infopost.remove(post)
                return this.res.status(200).json(data)
            }

        } catch (error) {
            console.log(`${error}`)
        }
    }

}