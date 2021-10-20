import { Client } from 'pg'

import dotenv from 'dotenv'

dotenv.config()

const client = new Client({
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT) || 5432,
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB
})

client.connect().then(async value => {
    console.log('Connected to database')
})

async function query(sqlQuery: string, values?: any[]) {
    const result = await client.query(sqlQuery, values)
    const { rows } = result
    return rows
}

export { query }
