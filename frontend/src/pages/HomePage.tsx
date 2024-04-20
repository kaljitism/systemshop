import {Component} from 'react';
import {Col, Row} from "react-bootstrap";
import {sampleProducts} from "../data.ts";
import {Product} from "../types/Product.ts";
import {Link} from "react-router-dom";

class HomePage extends Component {
  render() {
    return (
      <Row>
        {sampleProducts.map((product: Product) => (
          <Col key={product.slug} sm={6} md={4} lg={3}>
            <Link to={`/${product.brand}/${product.slug}`}>
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h2>{product.name}</h2>
              <p>${product.price}</p>
            </Link>
          </Col>
        ))}
      </Row>
    );
  }
}

export default HomePage;