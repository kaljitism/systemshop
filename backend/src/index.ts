import cors from "cors";
import dotenv from 'dotenv'
import {mongoose} from "@typegoose/typegoose";
import express from "express";
import {productRouter} from "./routers/productRouter";
import {seedRouter} from "./routers/seedRouter";

// Configuring the env files to use MongoDB Database
dotenv.config()

// MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/systemshop'
mongoose.set('strictQuery', true)
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log(`${error} caught`)
  })

// Server
const app = express()

// Enabling CORS(Cross Object Resource Sharing)
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173']
  })
)

// Product Details
app.use('/api/products', productRouter)


app.use('/api/seed', seedRouter)

// Port Number
const PORT = 4000

// Bind and listen to the connection on PORT
app.listen(PORT, () => {
  console.log(`Server started at http:localhost:${PORT}`)
})
