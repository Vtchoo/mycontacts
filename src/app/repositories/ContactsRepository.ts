import * as db from '../../database'

class ContactsRepository { // implements Repository<Contact>{

    async findAll({ orderBy }: QueryOptions<Contact>) {

        const direction = orderBy?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
        const rows = await db.query(`
            SELECT c.*, cat.name AS category_name
            FROM contacts c
            LEFT JOIN categories cat ON cat.id = c.category_id
            ORDER BY c.name ${direction}
        `)
        return rows
    }
    
    async findById(id: string | number) {
        const [row] = await db.query(`
            SELECT c.*, cat.name AS category_name
            FROM contacts c
            LEFT JOIN categories cat ON cat.id = c.category_id
            WHERE c.id = $1
        `, [id])
        return row
    }
    
    async findByEmail(email: string) {
        const [row] = await db.query(`
            SELECT c.*, cat.name AS category_name
            FROM contacts c
            LEFT JOIN categories cat ON cat.id = c.category_id
            WHERE c.email = $1
        `, [email])
        return row
    }

    async create({
        name, email, phone, category_id
    }: Partial<Contact>) {
        
        const [row] = await db.query(`
            INSERT INTO contacts (name, email, phone, category_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `, [name, email, phone, category_id])

        return row
    }
    
    async update(id: string, {
        name, email, phone, category_id 
    }: Partial<Contact>) {
        
        const [row] = await db.query(`
            UPDATE contacts
            SET name = $1, email = $2, phone = $3, category_id = $4
            WHERE id = $5
            RETURNING *
        `, [name, email, phone, category_id, id])

        return row
    }

    async delete(id: string | number) {
        const deleteOp = await db.query(`
            DELETE FROM contacts
            WHERE id = $1
        `, [id])

        return deleteOp
    }
}

export default new ContactsRepository()
