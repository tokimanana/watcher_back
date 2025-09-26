import { config } from '@config/config'
import { User, Course } from '@core/entities'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    synchronize: true,
    entities: [User, Course],
    subscribers: [],
    migrations: []
})

export const ensureDataSource = async (): Promise<DataSource> => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize()
    }
    return AppDataSource
}

export const transaction = async () => {
    await ensureDataSource()
    return AppDataSource.createQueryRunner()
}
