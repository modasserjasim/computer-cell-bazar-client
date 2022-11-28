import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import Main from "../../layouts/Main";
import Blog from "../../Pages/Blog/Blog";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/AllSellers/AllSellers";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import MyBuyers from "../../Pages/Dashboard/MyBuyers/MyBuyers";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../../Pages/Dashboard/MyProducts/MyProducts";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import ReportedProducts from "../../Pages/Dashboard/ReportedProducts/ReportedProducts";
import WishList from "../../Pages/Dashboard/WishList/WishList";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Home from "../../Pages/Homes/Home/Home";
import Login from "../../Pages/Login/Login";
import CategoryProducts from "../../Pages/Products/CategoryProducts/CategoryProducts";
import Signup from "../../Pages/Signup/Signup";
import AdminRoute from "../AdminRoute/AdminRoute";
import BuyerRoute from "../BuyerRoute/BuyerRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/category/:id',
                element: <PrivateRoute><CategoryProducts></CategoryProducts></PrivateRoute>,
                loader: ({ params }) => fetch(`${process.env.REACT_APP_API_URL}/category/${params.id}`)
            },

        ]
    },
    {
        path: '/dashboard',
        errorElement: <ErrorPage></ErrorPage>,
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/add-product',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: '/dashboard/my-products',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/dashboard/my-buyers',
                element: <SellerRoute><MyBuyers></MyBuyers></SellerRoute>
            },
            {
                path: '/dashboard/all-sellers',
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            {
                path: '/dashboard/all-buyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/reported-products',
                element: <AdminRoute><ReportedProducts></ReportedProducts></AdminRoute>
            },
            {
                path: '/dashboard/my-orders',
                element: <BuyerRoute><MyOrders></MyOrders></BuyerRoute>
            },
            {
                path: '/dashboard/wishlist',
                element: <BuyerRoute><WishList></WishList></BuyerRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <BuyerRoute><Payment></Payment></BuyerRoute>,
                loader: ({ params }) => fetch(`${process.env.REACT_APP_API_URL}/order/${params.id}`)
            },
        ]
    }
])