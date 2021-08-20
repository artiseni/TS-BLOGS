import express, { Request, Response } from 'express'
import { Infouser } from '../entities/Infouser'
import { Infopost } from '../entities/Infopost'
import { isAuth } from '../auth/isAuth'
const router = express.Router()


router
    .route('/add')
    .post(async (req: Request, res: Response) => {
        const post = new Infopost(req, res)
        post.addPost()
    })

router
    .route('/signup')
    .post(async (req: Request, res: Response) => {
        const user = new Infouser(req, res)
        user.register()
    })

router
    .route('/login')
    .post(async (req: Request, res: Response) => {
        const user = new Infouser(req, res)
        user.login()
    })

router
    .route('/user')
    .get(isAuth, (req: any, res: Response) => {
        const user = new Infouser(req, res)
        user.isUser()
    })

router
    .route('/token')
    .post((req: Request, res: Response) => {
        const user = new Infouser(req, res)
        user.token()
    })

router
    .route('/index')
    .get(async (req: Request, res: Response) => {
        try {
            const post = new Infopost(req, res)
            post.index()
        } catch (error) {
            console.log(`${error}`);
        }
    })

router
    .route('/myblogs')
    .get(async (req: Request, res: Response) => {
        try {
            const post = new Infopost(req, res)
            await post.myPost()
        } catch (error) {
            console.log(`${error}`);
        }
    })

router
    .route('/delete')
    .put(async (req: Request, res: Response) => {
        try {
            const post = new Infopost(req, res)
            post.deletePost()
        } catch (error) {
            console.log(`${error}`)
        }
    })

router
    .route('/myblogs/update')
    .post(async (req: Request, res: Response) => {
        try {
            const post = new Infopost(req, res)
            await post.updatePost()
        } catch (error) {
            console.log(`${error}`);
        }
    })


export { router }
