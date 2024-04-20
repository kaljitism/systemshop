import {Button, Card, CardBody} from "react-bootstrap";
import {Link} from "react-router-dom";

import Rating from "./Rating.tsx";
import {Product} from "../types/Product.ts";


function ProductItem({product}: { product: Product }) {
  return <Card>
    <Link to={`/${product.brand}/${product.slug}`}>
      <img
        className="card-img-top"
        src={product.image}
        alt={product.name}
      />
    </Link>
    <CardBody>
      <Link to={`/${product.brand}/${product.slug}`}>
        <Card.Title>{product.name}</Card.Title>
        <Card.Title>{product.price}</Card.Title>
      </Link>
      <Rating rating={product.rating} numReviews={product.numReviews}/>
      {
        product.countInStock == 0 ? (
          <Button variant="light" disabled>
            Out of Stock
          </Button>
        ) : (
          <Button>Add to Cart</Button>
        )
      }
    </CardBody>
  </Card>
}

export default ProductItem