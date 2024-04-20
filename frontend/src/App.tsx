import {Component} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Outlet} from "react-router-dom";

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
            <Outlet/>
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
