// Must be first
import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from '@sentry/node'
import { clerkwebhooks } from './controllers/webhooks.js'

// Initialize app
const app = express()

// Connect DB
await connectDB()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('API Working 🚀')
})
app.post('/webhooks',clerkwebhooks)

// Test Sentry error route
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// Sentry Error Handler (must be AFTER routes)
Sentry.setupExpressErrorHandler(app)

// Optional custom error handler
// app.use((err, req, res, next) => {
//   res.status(500).send('Something went wrong!')
// })

// Port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})