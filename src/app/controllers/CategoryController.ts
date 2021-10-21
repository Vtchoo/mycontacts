import { Request, Response } from 'express'
import CategoriesRepository from '../repositories/CategoriesRepository'

class CategoryController {

    async index(req: Request, res: Response) {
        const categories = await CategoriesRepository.findAll({})
        
        return res.json(categories)
    }
    
    async store(req: Request, res: Response) {
        
        const { name } = req.body

        if (!name)
            return res.status(400).json({ error: 'Name is required' })

        const category = await CategoriesRepository.create({ name })

        return res.json(category)
    }
}

export default new CategoryController()
