import { useContext } from "react";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox.tsx";
import MessageBox from "../components/MessageBox.tsx";
import Rating from "../components/Rating.tsx";
import { useGetProductDetailsBySlugQuery } from "../hooks/productHooks.ts";
import { Store } from "../Store.tsx";
import { APIError } from "../types/APIError.ts";
import { CartItem } from "../types/Cart.ts";
import { convertProductToCartItem, getError } from "../utils.ts";

function ProductPage() {
  const { state, dispatch } = useContext( Store )

  const params = useParams()
  const { slug } = params
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery( slug! )

  const { cart: { cartItems } } = state

  const navigate = useNavigate()

  const addToCartHandler = async ( item: CartItem ) => {
    const existItem = cartItems.find(
      ( cartItem ) => cartItem._id === product!._id
    )
    const quantity = existItem ? existItem.quantity + 1 : 1
    if ( product!.countInStock < quantity ) {
      toast.warn( "Sorry, the product is out of stock" )
      return
    }
    dispatch( {
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    } )
    toast.success( 'Product added to the cart' )
    navigate( '/cart' )
  }

  return (
    isLoading
      ? ( <LoadingBox/> )
      :
      error ? ( <MessageBox variant="danger">{ getError( error as unknown as APIError ) }</MessageBox> ) : !product ? (
          <MessageBox variant="danger">Product Not Found</MessageBox>
        ) :
        ( <div>
          <Row>
            <Col md={ 6 }>
              <img className="large" src={ product.image } alt={ product.name }></img>
            </Col>
            <Col md={ 3 }>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Helmet>
                    <title>{ product.name }</title>
                  </Helmet>
                  <h1>{ product.name }</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={ product.rating }
                    numReviews={ product.numReviews }
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${ product.price }</ListGroup.Item>
                <ListGroup.Item>Description: <p>{ product.description }</p></ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={ 3 }>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>${ product.price }</Col>
                      </Row>
                      <Row>
                        {/*Todo: Fix it, not working*/ }
                        <Col>Status:</Col>
                        <Col>{ product.countInStock > 0 ? (
                          <Badge bg="success">In-Stock</Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        ) }</Col>
                      </Row>
                    </ListGroup.Item>
                    { product.countInStock > 0 && (
                      <ListGroup.Item>
                        <div className={ "d-grid" }>
                          <Button
                            variant="primary"
                            onClick={ () => addToCartHandler( convertProductToCartItem( product ) ) }
                          >Add to Cart
                          </Button>
                        </div>
                      </ListGroup.Item>
                    ) }
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div> )
  );
}

export default ProductPage;