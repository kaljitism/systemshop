import { APIError } from "./types/APIError.ts";
import { CartItem } from "./types/Cart.ts";
import { Product } from "./types/Product.ts";

export const getError = ( error: APIError ) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message
}

export const convertProductToCartItem = ( product: Product ): CartItem => {
  const cartItem: CartItem = {
    _id: product._id,
    name: product.name,
    countInStock: product.countInStock,
    image: product.image,
    price: product.price,
    quantity: 1,
    slug: product.slug
  }
  return cartItem
}

