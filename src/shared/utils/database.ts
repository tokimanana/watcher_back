import { DataSource } from 'typeorm'
import { config } from '@config/config'


export async function ensureDatabaseExists(): Promise<void> {
    const adminDataSource = new DataSource({
        type: 'postgres',
        host: config.database.host,
        port: config.database.port,
        username: config.database.username,
        password: config.database.password,
        database: 'postgres'
    })

    try {
        await adminDataSource.initialize()
        // Vérifier l'existence
        const rows = await adminDataSource.query(
            'SELECT 1 FROM pg_database WHERE datname = $1',
            [config.database.database]
        )

        if (rows.length === 0) {
            console.log(`Database "${config.database.database}" not found. Creating...`)
            await adminDataSource.query(`CREATE DATABASE "${config.database.database}"`)
            console.log(`Database "${config.database.database}" created successfully.`)
        } else {
            console.log(`Database "${config.database.database}" already exists.`)
        }
    } catch (error: any) {
        console.error('Failed to ensure database exists:', error?.message)
        throw error
    } finally {
        if (adminDataSource.isInitialized) {
            await adminDataSource.destroy()
        }
    }
}