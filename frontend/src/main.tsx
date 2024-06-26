import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.tsx'
import './index.css'
import CartPage from "./pages/CartPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import { StoreProvider } from "./Store.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <App/> }>
      <Route index={ true } element={ <HomePage/> }/>
      <Route path=":brand/:slug" element={ <ProductPage/> }/>
      <Route path='cart' element={ <CartPage/> }/>
    </Route>
  )
)

const queryClient: QueryClient = new QueryClient()

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <QueryClientProvider client={ queryClient }>
          <RouterProvider router={ router }/>
          <ReactQueryDevtools initialIsOpen={ false }/>
        </QueryClientProvider>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>,
)
