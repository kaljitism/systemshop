import express, {Request, Response} from "express";
import {Products} from "./data";
import cors from "cors";

// Server
const app = express()

// Enabling CORS(Cross Object Resource Sharing)
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173']
  })
)

// GET Route
app.get('/api/products', (request: Request, response: Response) => {
  response.json(Products)
})

// Port Number
const PORT = 4000

// Bind and listen to the connection on PORT
app.listen(PORT, () => {
  console.log(`Server started at http:localhost:${PORT}`)
})
