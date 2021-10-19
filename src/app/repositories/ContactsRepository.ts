import { v4 as uuid } from 'uuid'

let contacts: Contact[] = [
    {
        id: uuid(),
        name: 'Victor',
        email: 'victorlima.civ@gmail.com',
        phone: '12345678900',
        category_id: uuid()
    }
]


class ContactsRepository { // implements Repository<Contact>{

    async find() {
        return contacts
    }

    async findAll() {
        return contacts
    }

    async findById(id: string | number) {
        return contacts.find(contact => contact.id == id)
    }

    async findByEmail(email: string) {
        return contacts.find(contact => contact.email == email)
    }

    async create(data: Partial<Contact>) {
        const newContact: Contact = {
            id: uuid(),
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            category_id: data.category_id || ''
        }
        
        contacts.push(newContact)
        
        return newContact
    }
    
    async update(id: string, data: Partial<Contact>) {
        
        const newContact: Contact = {
            id,
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            category_id: data.category_id || ''
        }

        contacts = contacts.map(contact => contact.id === id ? newContact : contact)

        return newContact
    }

    async delete(id: string | number) {
        contacts = contacts.filter(contact => contact.id != id)
        return
    }
}

export default new ContactsRepository()
