import express from 'express'
import * as dotenv from 'dotenv'
import { db } from './config/config'
import { router } from './router/route'
import cors from 'cors'
dotenv.config()

const origin: string[] = [`${process.env.LOCAL_HOST}`]
const option: cors.CorsOptions = { origin }

const app = express()
app.use(cors(option))
app.use(express.json())


app.use('/', router)


app.listen(process.env.PORT_SERVER, async () => {
    try {
        await db()
        console.log(`Running on port ${process.env.PORT_SERVER}`)
    } catch (error) {
        console.log(`${error}`)
    }
})

