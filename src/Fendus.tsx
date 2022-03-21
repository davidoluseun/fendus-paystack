import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import VerifyEmail from "./components/auth/VerifyEmail";
import SendEmailVerificationLink from "./components/auth/SendEmailVerificationLink";
import PasswordRecovery from "./components/auth/PasswordRecovery";
import PasswordReset from "./components/auth/PasswordReset";
import Contact from "./components/contact/Contact";
import ScrollToTop from "./components/common/ScrollToTop";
import Product from "./components/products/Product";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import Orders from "./components/orders/Orders";
import Order from "./components/orders/Order";
import Profile from "./components/profile/Profile";
import Wishlist from "./components/wishlist/Wishlist";
import ProductCategory from "./components/products/ProductCategory";
import RequireAuth from "./components/common/RequireAuth";
import RequireAdmin from "./components/common/RequireAdmin";
import LiveChat from "./components/common/LiveChat";
import NotFound from "./components/common/NotFound";
import Dashboard from "./components/admin/Dashboard";
import Products from "./components/admin/Products";
import AddProductForm from "./components/admin/AddProductForm";
import EditProductForm from "./components/admin/EditProductForm";
import AdminOrders from "./components/admin/Orders";
import AdminOrder from "./components/admin/Order";

const Fendus = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/verify" element={<SendEmailVerificationLink />} />
        <Route path="/password/recovery" element={<PasswordRecovery />} />
        <Route path="/password/recovery" element={<PasswordRecovery />} />
        <Route path="/password/reset/:token" element={<PasswordReset />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:category/:id" element={<Product />} />
        <Route path="/products/:category" element={<ProductCategory />} />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />
        <Route
          path="/wishlist"
          element={
            <RequireAuth>
              <Wishlist />
            </RequireAuth>
          }
        />
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <RequireAuth>
              <Order />
            </RequireAuth>
          }
        />
        <Route
          path="/orders"
          element={
            <RequireAuth>
              <Orders />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <RequireAdmin>
              <Dashboard />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/products/:id"
          element={
            <RequireAdmin>
              <EditProductForm />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/products/new"
          element={
            <RequireAdmin>
              <AddProductForm />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/products"
          element={
            <RequireAdmin>
              <Products />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/orders/:id"
          element={
            <RequireAdmin>
              <AdminOrder />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <RequireAdmin>
              <AdminOrders />
            </RequireAdmin>
          }
        />

        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ScrollToTop />
      <LiveChat />
      <ToastContainer position="bottom-left" hideProgressBar={true} />
    </>
  );
};

export default Fendus;
