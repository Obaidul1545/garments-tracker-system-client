import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import NotFound from '../pages/ErrorPages/NotFound/NotFound';
import Home from '../pages/Home/Home/Home';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Auth/Login/Login';
import Register from '../pages/Auth/Register/Register';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardHome from '../pages/Dashboard/DashboardContent/DashboardContent';
import AboutUs from '../pages/OtherPages/AboutUs';
import Contact from '../pages/OtherPages/Contact';
import AllProducts from '../pages/AllProducts/AllProducts';
import Profile from '../pages/Profile/Profile';
import PrivateRoute from './PrivateRoute';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import BookingOrder from '../pages/BookingOrder/BookingOrder';
import BuyerRoute from './BuyerRoute';
import MyOrders from '../pages/Dashboard/Buyer/MyOrders/MyOrders';
import ManagerRoute from './ManagerRoute';
import AddProduct from '../pages/Dashboard/Manager/AddProduct/AddProduct';
import ManageProducts from '../pages/Dashboard/Manager/ManageProducts/ManageProducts';
import PendingOrders from '../pages/Dashboard/Manager/PendingOrders/PendingOrders';
import ApprovedOrders from '../pages/Dashboard/Manager/ApprovedOrders/ApprovedOrders';
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers/ManageUsers';
import AllOrders from '../pages/Dashboard/Admin/AllOrders/AllOrders';
import AdminRoute from './AdminRoute';
import AllProductsManage from '../pages/Dashboard/Admin/AllProductsManage/AllProductsManage';
import PaymentSuccess from '../pages/Dashboard/Payment/PaymentSuccess';
import PaymentCancelled from '../pages/Dashboard/Payment/PaymentCancelled';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout></RootLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: 'all-products',
        element: <AllProducts></AllProducts>,
      },
      {
        path: 'product-details/:productId',
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
      },
      {
        path: 'booking-order/:productId',
        element: (
          <PrivateRoute>
            <BookingOrder></BookingOrder>
          </PrivateRoute>
        ),
      },
      {
        path: 'about-us',
        element: <AboutUs></AboutUs>,
      },
      {
        path: 'contact',
        element: <Contact></Contact>,
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout></AuthLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: 'login',
        element: <Login></Login>,
      },
      {
        path: 'register',
        element: <Register></Register>,
      },
    ],
  },
  {
    path: 'dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: 'profile',
        element: <Profile></Profile>,
      },
      {
        path: 'payment-success',
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: 'payment-cancelled',
        element: <PaymentCancelled></PaymentCancelled>,
      },

      // buyer only
      {
        path: 'my-orders',
        element: (
          <BuyerRoute>
            <MyOrders></MyOrders>
          </BuyerRoute>
        ),
      },

      // manager only
      {
        path: 'add-product',
        element: (
          <ManagerRoute>
            <AddProduct></AddProduct>
          </ManagerRoute>
        ),
      },
      {
        path: 'manage-products',
        element: (
          <ManagerRoute>
            <ManageProducts></ManageProducts>
          </ManagerRoute>
        ),
      },
      {
        path: 'pending-orders',
        element: (
          <ManagerRoute>
            <PendingOrders></PendingOrders>
          </ManagerRoute>
        ),
      },
      {
        path: 'approved-orders',
        element: (
          <ManagerRoute>
            <ApprovedOrders></ApprovedOrders>
          </ManagerRoute>
        ),
      },

      // admin only
      {
        path: 'manage-users',
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: 'all-products-manage',
        element: (
          <AdminRoute>
            <AllProductsManage></AllProductsManage>
          </AdminRoute>
        ),
      },
      {
        path: 'all-orders',
        element: (
          <AdminRoute>
            <AllOrders></AllOrders>
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
