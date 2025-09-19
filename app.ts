import 'reflect-metadata'
import { createApp } from './bootstrap'
import { config } from './src/config/config'

const app = createApp()

const PORT = config.port

app.listen(PORT, () => {
    console.log(`Worker  started and listening on port ${PORT}`)
})
