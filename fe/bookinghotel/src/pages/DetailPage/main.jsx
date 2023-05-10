
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import ProductDetail, { loader, loader as productLoader } from './pages/DetailPage/product-detail'
import ProductOrder, { loader as productOrderLoader } from "./pages/product-order";
import ConfirmOrder, { loader as productConfirmLoader} from "./pages/ConfirmOrder/ConfirmOrder";
import ErrorPage from "./pages/error-page";
import "./index.css";
import ScrollToTop from "./pages/ScrollToTop";

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
  
  {
    path: "/product-confirm/:id",
    element: <ConfirmOrder/>,
    loader: productConfirmLoader,
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
/* </React.StrictMode> */
);
