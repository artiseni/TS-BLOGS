import axios from 'axios'

export default class Api {

    api: any
    req: any

    constructor(req: any) {
        this.req = req
        this.api = axios.create({
            baseURL: process.env.REACT_APP_BASE_URL,
            headers: {
                "Content-type": "application/json"
            }
        })
    }

    login = async (): Promise<void> => {
        const res: any = await this.api.post('/login', this.req)
        if (res) {
            const { data } = res
            return data
        } else {
            return res
        }
    }

    tokenValidator = async (token: any) => {

        const user: any = await this.api.get('/user', { headers: { "Authorization": `Bearer ${token}` } })
        if (user) {
            const { data } = user
            return data
        } else {
            return user
        }
    }


    register = async (): Promise<void> => {
        const res: any = await this.api.post('/signup', this.req)
        if (res) {
            const { data } = res
            return data
        } else {
            return res
        }
    }

    myBlogs = async (): Promise<void> => {
        const { uuid, currentPage, take } = this.req
        const res: any = await this.api.get('/myblogs', { params: { uuid, currentPage, take } })
        if (res) {
            const { data } = res
            return data
        }
    }

    editPost = async (): Promise<void> => {
        const res: any = await this.api.post('/myblogs/update', this.req)
        if (res) {
            const { data } = res
            return data
        }
    }

    addPost = async (): Promise<void> => {
        const res: any = await this.api.post('/add', this.req)
        if (res) {
            const { data } = res
            return data
        }
    }

    deletePost = async (uuid: any): Promise<void> => {
        const res: any = await this.api.put('/delete', uuid)
        if (res) {
            const { data } = res
            return data
        }
    }

    index = async (): Promise<void> => {
        // console.log(data)
        const res: any = await this.api.get('/index', { params: this.req })
        if (res) {
            const { data } = res
            return data
        }
    }

    addComment = async (): Promise<void> => {
        const res: any = await this.api.post('/user/comment', this.req)
        if (res) {
            const { data } = res
            return data
        } else {
            return res
        }
    }
}

