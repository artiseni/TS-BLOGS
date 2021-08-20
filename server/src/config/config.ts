import { Connection, createConnection } from 'typeorm'
import * as dotnv from 'dotenv'
import { Infouser } from '../entities/Infouser'
import { Infopost } from '../entities/Infopost'
dotnv.config({ path: '../../.env' })

export const db = (): Promise<Connection> => {
    return createConnection({
        type: `postgres`,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        logging: true,
        entities: [Infouser, Infopost],
        synchronize: true
    })
}