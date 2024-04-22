import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

  const { mutateAsync: signin, isLoading } = useSignInMutation()

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
}