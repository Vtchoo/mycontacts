import { Router } from 'express'
import ContactController from './app/controllers/ContactController'

const router = Router({ mergeParams: true })

router.get('/status', (req, res) => res.json({ status: 'Online' }))

router.get('/contacts', ContactController.index)

router.post('/contacts', ContactController.store)

router.get('/contacts/:id', ContactController.show)

router.put('/contacts/:id', ContactController.update)

router.delete('/contacts/:id', ContactController.delete)

export default router
