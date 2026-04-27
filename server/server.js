// Must be first
import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import { clerkwebhooks } from './controllers/webhooks.js'

// Initialize app
const app = express()
let dbConnected = false

async function ensureDbConnection() {
  if (!dbConnected) {
    await connectDB()
    dbConnected = true
  }
}

// Connect DB before handling any request
app.use(async (req, res, next) => {
  try {
    await ensureDbConnection()
    next()
  } catch (error) {
    next(error)
  }
})

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

// Optional custom error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ success: false, message: err.message || 'Server error' })
})

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

export default app