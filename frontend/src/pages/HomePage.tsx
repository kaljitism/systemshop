import React, {useEffect, useReducer} from 'react';
import {Col, Row} from "react-bootstrap";
import {Product} from "../types/Product.ts";
import axios from "axios";
import {getError} from "../utils.ts";
import {APIError} from "../types/APIError.ts";
import LoadingBox from "../components/LoadingBox.tsx";
import MessageBox from "../components/MessageBox.tsx";
import ProductItem from "../components/ProductItem.tsx";
import {Helmet} from "react-helmet-async";

type State = {
  products: Product[],
  loading: boolean,
  error: string
}

type Action =
  | { type: 'FETCH_REQUEST' }
  | { type: 'FETCH_SUCCESS'; payload: Product[] }
  | { type: 'FETCH_FAIL'; payload: string }

const initialState: State = {
  products: [],
  loading: true,
  error: '',
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return {...state, loading: true}
    case "FETCH_SUCCESS":
      return {...state, products: action.payload, loading: false}
    case "FETCH_FAIL":
      return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}

export default function HomePage() {
  const [{loading, error, products}, dispatch] = useReducer<
    React.Reducer<State, Action>
  >(reducer, initialState)

  useEffect(() => {
    const fetchData = async () => {
      dispatch({type: 'FETCH_REQUEST'})
      try {
        const result = await axios.get('/api/products')
        dispatch({type: 'FETCH_SUCCESS', payload: result.data})
      } catch (exception) {
        dispatch({type: 'FETCH_FAIL', payload: getError(exception as APIError)})
      }
    }
    fetchData().then(
      () => console.log("Data Fetched")
    )
  }, [])


  return (
    loading ? (
      <LoadingBox/>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <Row>
        <Helmet>
          <title>SystemShop</title>
        </Helmet>
        {products.map((product) => (
          <Col key={product.slug} sm={6} md={4} lg={3}>
            <ProductItem product={product}/>
          </Col>
        ))}
      </Row>
    ))
}

