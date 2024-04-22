import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox.tsx";
import { useSignInMutation } from "../hooks/userHooks.ts";
import { Store } from "../Store.tsx";
import { APIError } from "../types/APIError.ts";
import { getError } from "../utils.ts";

export default function SignInPage() {
  // Authentication Flow
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams( search ).get( 'redirect' )
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [ email, setEmail ] = useState( '' )
  const [ password, setPassword ] = useState( '' )

  const { state, dispatch } = useContext( Store )
  const { userInfo } = state

  const { mutateAsync: signin, isPending: isPending } = useSignInMutation()

  const submitHandler = async ( event: React.SyntheticEvent ) => {
    event.preventDefault()
    try {
      const data = await signin( {
        email,
        password,
      } )
      dispatch( { type: "USER_SIGNIN", payload: data } )
      localStorage.setItem( 'userInfo', JSON.stringify( data ) )
      navigate( redirect || '/' )
    } catch ( exception ) {
      toast.error( getError( exception as APIError ) )
    }
  }

  useEffect( () => {
      if ( userInfo ) {
        navigate( redirect )
      }
    },
    [ navigate, redirect, userInfo ] )

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3"></h1>
      <Form onSubmit={ submitHandler }>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={ ( event ) => setEmail( event.target.value ) }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={ ( event ) => setPassword( event.target.value ) }
          />
        </Form.Group>
        <div className="mb-3">
          <Button disabled={ isPending } type="submit">
            Sign In
          </Button>
          { isPending && <LoadingBox/> }
        </div>
        <div className="mb-3">
          New Customer?{ '' }
          <Link to={ `/signup?redirect=${ redirect }` }>Create your account</Link>
        </div>
      </Form>
    </Container>
  )
}