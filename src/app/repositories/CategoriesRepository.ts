import * as db from '../../database'

class CategoriesRepository {
    
    async findAll({ orderBy }: QueryOptions<Category>) {

        const rows = await db.query(`SELECT * FROM categories`)

        return rows
    }

    async create({ name }: Partial<Category>) {

        const [row] = await db.query(`
            INSERT INTO categories (name)
            VALUES ($1)
            RETURNING *
        `, [name])

        return row
    }
}

export default new CategoriesRepository()
