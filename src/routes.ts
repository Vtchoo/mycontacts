import { Router } from 'express'
import CategoryController from './app/controllers/CategoryController'
import ContactController from './app/controllers/ContactController'

const router = Router({ mergeParams: true })

router.get('/status', (req, res) => res.json({ status: 'Online' }))

router.get('/contacts', ContactController.index)

router.post('/contacts', ContactController.store)

router.get('/contacts/:id', ContactController.show)

router.put('/contacts/:id', ContactController.update)

router.delete('/contacts/:id', ContactController.delete)

router.get('/categories', CategoryController.index)

router.post('/categories', CategoryController.store)

export default router
