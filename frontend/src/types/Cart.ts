// CartItem Type
export type CartItem = {
  image: string
  slug: string
  quantity: number
  countInStock: number
  price: number
  _id: string
  name: string
}

// ShippingAddress Type
export type ShippingAddress = {
  fullName: string
  address: string
  city: string
  country: string
  postalCode: string
}

// Cart Type
export type Cart = {
  cartItems: CartItem[]
  shippingAddress: ShippingAddress
  paymentMethod: string
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
}