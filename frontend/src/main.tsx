import React from 'react'
import ReactDOM from 'react-dom/client'
import {HelmetProvider} from 'react-helmet-async'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.tsx'
import './index.css'
import HomePage from "./pages/HomePage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index={true} element={<HomePage/>}/>
      <Route path=":brand/:slug" element={<ProductPage/>}/>
    </Route>
  )
)

const queryClient: QueryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
