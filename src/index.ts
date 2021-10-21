import 'express-async-errors'
import express, { ErrorRequestHandler } from 'express'
import router from './routes'

const server = express()

server.use(express.json())

server.use(router)

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.log('ERROR HANDLER')
    console.log(error)
    return res.sendStatus(500)
}

server.use(errorHandler)

server.listen(3000, () => {
    console.log('Server initialized on port 3000')
})