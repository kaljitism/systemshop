import { useContext, useEffect } from "react";
import { Badge, Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Outlet } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";
import { Store } from "./Store.tsx";

function App() {
  const {
    state: { mode, cart, userInfo },
    dispatch,

  } = useContext( Store )

  useEffect( () => {
    document.body.setAttribute( 'data-bs-theme', mode )
  }, [ mode ] )

  const switchModeHandler = () => {
    dispatch( { type: "SWITCH_MODE" } )
  }

  const signoutHandler = () => {
    dispatch( { type: 'USER_SIGNOUT' } )
    localStorage.removeItem( 'userInfo' )
    localStorage.removeItem( 'cartItems' )
    localStorage.removeItem( 'paymentAddress' )
    localStorage.removeItem( 'paymentMethod' )
    window.location.href = '/signin'
  }

  return (
    <div className='d-flex flex-column vh-100'>
      <ToastContainer position="bottom-center" limit={ 2 }/>

      <header>
        <Navbar expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>SystemShop</Navbar.Brand>
            </LinkContainer>
          </Container>
          <Nav>
            <Button variant={ mode } onClick={ switchModeHandler }>
              <i
                className={ mode === 'light' ? 'fa fa-sun' : 'fa fa-moon' }
              ></i>
            </Button>
            { /*Todo: Convert it to an icon*/ }
            <Link to="/cart" className="nav-link">
              Cart
              {
                cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    { cart.cartItems.reduce(
                      ( num, cartItem ) => num + cartItem.quantity, 0 )
                    }
                  </Badge>
                )
              }
            </Link>
            {
              userInfo ? (
                <NavDropdown title={ userInfo.name } id="basic-nav-dropdown">
                  <Link
                    className="dropdown-item"
                    to="#signout"
                    onClick={ signoutHandler }
                  >
                    Sign Out
                  </Link>
                </NavDropdown>
              ) : (
                <Link className="nav-link" to="/signin">SignIN
                </Link>
              )
            }
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


export default App
