import { useContext } from "react";
import { Button, Card, CardBody } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Store } from "../Store.tsx";
import { CartItem } from "../types/Cart.ts";
import { Product } from "../types/Product.ts";
import { convertProductToCartItem } from "../utils.ts";

import Rating from "./Rating.tsx";


function ProductItem( { product }: { product: Product } ) {
  const { state, dispatch } = useContext( Store )
  const {
    cart: { cartItems }
  } = state

  const addToCartHandler = async ( item: CartItem ) => {
    const existItem = cartItems.find( ( cartItem ) => cartItem._id === product._id )
    const quantity = existItem ? existItem.quantity + 1 : 1
    if ( product.countInStock < quantity ) {
      alert( 'Sorry. Product is out of stock' )
      return
    }
    dispatch( {
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    } )
  }

  return <Card>
    <Link to={ `/${ product.brand }/${ product.slug }` }>
      <img
        className="card-img-top"
        src={ product.image }
        alt={ product.name }
      />
    </Link>
    <CardBody>
      <Link to={ `/${ product.brand }/${ product.slug }` }>
        <Card.Title>{ product.name }</Card.Title>
        <Card.Title>{ product.price }</Card.Title>
      </Link>
      <Rating rating={ product.rating } numReviews={ product.numReviews }/>
      {
        product.countInStock == 0 ? (
          <Button variant="light" disabled>
            Out of Stock
          </Button>
        ) : (
          <Button onClick={ () => addToCartHandler( convertProductToCartItem( product ) ) }>
            Add to Cart
          </Button>
        )
      }
    </CardBody>
  </Card>
}

export default ProductItem