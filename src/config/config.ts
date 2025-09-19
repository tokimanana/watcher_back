import dotenv from 'dotenv'

dotenv.config()

const nodeEnv = process.env['NODE_ENV'] || 'development'

export const config = {
    port: Number(process.env['PORT']) || 3000,
    nodeEnv,
    corsOrigin: process.env['CORS_ORIGIN'] || '*',
    LOG_LEVEL: process.env['LOG_LEVEL']?.toUpperCase() || 'INFO',

    database: {
        host: process.env['DB_HOST'] || 'localhost',
        port: Number(process.env['DB_PORT']) || 5432,
        username: process.env['DB_USERNAME'] || 'postgres',
        password: process.env['DB_PASSWORD'] || '',
        database: process.env['DB_NAME'] || 'projectmanagement_db',
        synchronize: process.env['DB_SYNCHRONIZE'] === 'true' || nodeEnv === 'development',
        logging: process.env['DB_LOGGING'] === 'true' || nodeEnv === 'development'
    },

    jwt: {
        secret: process.env['JWT_SECRET'] || '36998a2f2128329588f8ea1f3e3f37f47a12d63504cf5b6d5238ee3aab44b9d6',
        expiresIn: process.env['JWT_EXPIRES_IN'] || '1d'
    },

    isDevelopment: nodeEnv === 'development',
    isProduction: nodeEnv === 'production',
    isTest: nodeEnv === 'test',

    validate: () => {
        const requiredEnvVars = ['DB_HOST', 'DB_USERNAME', 'DB_PASSWORD', 'DB_NAME']

        if (nodeEnv === 'production') {
            requiredEnvVars.push('JWT_SECRET')
        }

        const missing = requiredEnvVars.filter((key) => !process.env[key])

        if (missing.length > 0) {
            throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
        }
    }
}
