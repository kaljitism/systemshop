import express, {Request, Response} from "express";
import {productList} from "./data";
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
