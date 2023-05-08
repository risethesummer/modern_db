import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import ProductDetail, { loader as productLoader } from "./pages/product-detail";
import ProductOrder, { loader as productOrderLoader } from "./pages/product-order";

import ErrorPage from "./pages/error-page";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
    loader: productLoader,
  },
  {
    path: "/product-order/:id",
    element: <ProductOrder />,
    loader: productOrderLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
/* </React.StrictMode> */
);
