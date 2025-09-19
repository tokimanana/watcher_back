import { config } from '@config/config'
import { User } from '@core/entities'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    synchronize: true,
    entities: [User],
    subscribers: [],
    migrations: []
})

export const transaction = AppDataSource.createQueryRunner()
