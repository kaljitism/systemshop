import {Product} from "./types/Product.ts";
import {sampleProducts} from "./data.ts";
import {Component} from "react";
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <div className='d-flex flex-column vh-100'>
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand>SystemShop</Navbar.Brand>
            </Container>
            <Nav>
              <a href="/cart" className="nav-link">Cart</a>
              <a href="/signin" className="nav-link">Sign In</a>
            </Nav>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Row>
              {sampleProducts.map((product: Product) => (
                <Col key={product.slug} sm={6} md={4} lg={3}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <h2>{product.name}</h2>
                  <p>${product.price}</p>
                </Col>
              ))}
            </Row>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    )
  }
}

export default App
