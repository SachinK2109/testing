import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Shop,
  Login,
  Register,
  About,
  Contact,
  ProductDetail,
  Cart,
  Profile,
} from "../pages";
import { Dashboard } from "../components";
import Orders from "../pages/orders/Orders";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminAuthRoute from "./AdminAuthRoute";
import CheckoutSuccess from "../pages/checkout/CheckoutSuccess";
import Admin from "../pages/admin/Admin";
import EditProduct from "../pages/admin/edit-product/EditProduct";
import AdminProducts from "../pages/admin/products-management/AdminProducts";
import AdminOrders from "../pages/admin/orders-management/AdminOrders";
import AdminLogin from "../pages/auth/login/AdminLogin";
import AdminRegister from "../pages/auth/register/AdminRegister";
import OrderDetail from "../pages/orders/order-detail/OrderDetail";

const homeRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "/shop", element: <Shop /> },
  { path: "/product/:id", element: <ProductDetail /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/login", element: <Login />, auth: AuthRoute },
  { path: "/register", element: <Register />, auth: AuthRoute },
  { path: "/cart", element: <Cart />, auth: ProtectedRoute },
  { path: "/profile", element: <Profile />, auth: ProtectedRoute },
  { path: "/orders", element: <Orders />, auth: ProtectedRoute },
  {
    path: "/order-details/:id",
    element: <OrderDetail />,
    auth: ProtectedRoute,
  },
  {
    path: "/checkout/success/:success_token",
    element: <CheckoutSuccess />,
    auth: ProtectedRoute,
  },
];

// Adjust the adminRoutes for nested routing
const adminRoutes = [
  {
    path: "",
    element: <AdminProducts />,
    auth: AdminProtectedRoute,
    index: true,
  },
  { path: "login", element: <AdminLogin />, auth: AdminAuthRoute },
  { path: "register", element: <AdminRegister />, auth: AdminAuthRoute },
  { path: "orders", element: <AdminOrders />, auth: AdminProtectedRoute },
  { path: "add", element: <EditProduct />, auth: AdminProtectedRoute },
  { path: "edit/:id", element: <EditProduct />, auth: AdminProtectedRoute },
];

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          {/* Map through homeRoutes for main routes */}
          {homeRoutes.map(({ path, element, auth }, index) => {
            const RouteElement = auth
              ? React.createElement(auth, {}, element)
              : element;
            return <Route key={index} path={path} element={RouteElement} />;
          })}

          {/* Nested Routes for Admin */}
          <Route path="admin" element={<Admin />}>
            {adminRoutes.map(({ path, element, auth, index }) => {
              const RouteElement = auth
                ? React.createElement(auth, {}, element)
                : element;
              return (
                <Route
                  key={path}
                  path={path}
                  element={RouteElement}
                  index={index}
                />
              );
            })}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
