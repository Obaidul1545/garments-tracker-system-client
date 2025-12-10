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

      // buyer only
      {
        path: 'my-orders',
        element: (
          <BuyerRoute>
            <MyOrders></MyOrders>
          </BuyerRoute>
        ),
      },

      {},
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
