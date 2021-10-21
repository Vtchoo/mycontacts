import { Request, Response } from 'express'
import ContactsRepository from '../repositories/ContactsRepository'

class ContactController {

    async index(req: Request, res: Response) {

        const { orderBy } = req.query

        const contacts = await ContactsRepository.findAll({ orderBy })
        return res.json({ results: contacts, count: contacts.length })
    }

    async show(req: Request, res: Response) {

        const { id } = req.params

        const contact = await ContactsRepository.findById(id)

        if (!contact)
            return res.status(404).json({ error: 'Contact not found' })
            
        return res.json(contact)
    }
    
    async store(req: Request, res: Response) {
        
        const { name, email, phone, category_id } = req.body

        if (!name)
            return res.status(400).json({ error: 'Name is required' })
            
        const existingContact = await ContactsRepository.findByEmail(email)
                
        if (existingContact)
            return res.status(409).json({ error: 'Contact already exists' })
            
        const contact = await ContactsRepository.create({
            name, email, phone, category_id
        })
    
        return res.json(contact)
    }
    
    async update(req: Request, res: Response) {
        
        const { id } = req.params
        
        const { name, email, phone, category_id } = req.body
        
        const existingContact = await ContactsRepository.findById(id)
        if (!existingContact)
            return res.status(404).json({ error: 'Contact not found' })
        
        if (email && email !== existingContact.email) {

            const existingContactWithNewEmail = await ContactsRepository.findByEmail(email)

            if (existingContactWithNewEmail && existingContactWithNewEmail.id !== existingContact.id)
                return res.status(409).json({ error: 'This email is already taken' })
        }

        if (!name) 
            return res.status(400).json({ error: 'Name is required' })
        
        const newContact = await ContactsRepository.update(id, {
            name, email, phone, category_id
        })

        return res.json(newContact)
    }

    async delete(req: Request, res: Response) {
        
        const { id } = req.params

        const contact = await ContactsRepository.findById(id)
        
        if (!contact)
            return res.status(404).json({ error: 'Contact not found' })
        
        await ContactsRepository.delete(id)

        return res.sendStatus(204)
    }
}

export default new ContactController()