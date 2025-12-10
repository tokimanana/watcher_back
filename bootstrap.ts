import 'reflect-metadata'
import cors from 'cors'
import express, { Express } from 'express'
import { AppDataSource } from './src/infrastructure/database/sourceProvider'
import { routerExample, routerUser, routerCourse } from './src/presentation/api'
import { errorHandlerMiddleware, notFoundMiddlewareWithError } from './src/presentation/middleware/errorHandler'
import { responseFormatterMiddleware } from './src/presentation/middleware/responseFormatterMiddleware'

export function createApp() {
    const app: Express = express()

    configureDataBase()
    configurationApp(app)
    configureRoute(app)
    return app
}

function configurationApp(app: Express) {
    app.use(
        cors({
            origin: '*'
        })
    )
    app.use(express.urlencoded({ extended: true }))
    app.set('trust proxy', true)
    app.use(express.json())
    app.use(responseFormatterMiddleware)
    // app.use(notFoundMiddlewareWithError);
    app.use(errorHandlerMiddleware)
}

function configureDataBase() {
    AppDataSource.initialize()
        .then(() => {
            console.log('Database connected successfully!')
        })
        .catch((error) => {
            console.error('Database connection failed!')
            if (error.name === 'AggregateError') {
                console.error('AggregateError details:')
                error.errors.forEach((err: any, index: number) => {
                    console.error(`Error ${index + 1}:`, err.message)
                    if (err.code) console.error(`Code: ${err.code}`)
                })
            } else {
                console.error('Error details:', error.message)
                console.error('Error code:', error.code)
            }
            // Don't exit, but the app might not work properly
            console.error('Application will continue but database features may not work')
        })
}

function configureRoute(app: Express) {
    app.use('/api/examples', routerExample)
    app.use('/api/users', routerUser)
    app.use('/api/course', routerCourse)
}
