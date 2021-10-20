import { Request, Response } from 'express'
import CategoriesRepository from '../repositories/CategoriesRepository'

class CategoryController {

    async index(req: Request, res: Response) {
        try {
            const categories = await CategoriesRepository.findAll({})
            
            return res.json(categories)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
    
    async store(req: Request, res: Response) {
        
        const { name } = req.body

        if (!name)
            return res.status(400).json({ error: 'Name is required' })

        try {

            const category = await CategoriesRepository.create({ name })

            return res.json(category)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
}

export default new CategoryController()
