import cors from "cors";
import dotenv from 'dotenv'
import {mongoose} from "@typegoose/typegoose";
import express, {Request, Response} from "express";

import {productList} from "./data";

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

// GET Route to get all products
app.get('/api/products', (request: Request, response: Response) => {
  response.json(productList)
})

// GET Route to get a single product Listing
app.get('/api/products/:slug', (request: Request, response: Response) => {
  response.json(productList.find((requestedProduct) => requestedProduct.slug === request.params.slug))
})

// Port Number
const PORT = 4000

// Bind and listen to the connection on PORT
app.listen(PORT, () => {
  console.log(`Server started at http:localhost:${PORT}`)
})
