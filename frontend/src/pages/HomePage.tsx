import {Col, Row} from "react-bootstrap";
import {Helmet} from "react-helmet-async";
import {useGetProductsQuery} from "../hooks/productHooks.ts";

import LoadingBox from "../components/LoadingBox.tsx";
import MessageBox from "../components/MessageBox.tsx";
import ProductItem from "../components/ProductItem.tsx";
import {getError} from "../utils.ts";
import {APIError} from "../types/APIError.ts";

export default function HomePage() {
  const {data, isLoading, error} = useGetProductsQuery()
  return (
    isLoading ? (
      <LoadingBox/>
    ) : error ? (
      <MessageBox variant="danger">{getError(error as unknown as APIError)}</MessageBox>
    ) : (
      <Row>
        <Helmet>
          <title>SystemShop</title>
        </Helmet>
        {data!.map((product) => (
          <Col key={product.slug} sm={6} md={4} lg={3}>
            <ProductItem product={product}/>
          </Col>
        ))}
      </Row>
    ))
}


