import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import React,{useEffect,useState} from 'react'
import { LinearProgress } from '@mui/material'; 
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import JobPage from './pages/JobPage';
import CreateJobPage from './pages/CreateJobPage';
import EmployeePage from './pages/EmployeePage';
import GeneralCity from './pages/GeneralCity';
import TransportCity from './pages/TransportCity';
import MaterialCity from './pages/MaterialCity';
import SingleEmployee from './pages/SingleEmployee';
import SingleSupplier from './pages/SingleSupplier';
import Loading from './pages/Loading';
import SingleTransporter from './pages/SingleTransporter';
import SingleDriver from './pages/SingleDriver';
import SingleCustomer from './pages/SingleCustomer';
import SingleJob from './pages/SingleJob';
import DashboardAppPage from './pages/DashboardAppPage';
import SupplierPage from './pages/SupplierPage';
import ProductAdminPage from './pages/ProductAdminPage';
import Vehicle from './pages/Vehicle';
import Pincodes from './pages/Pincodes';
import PriceAdminPage from './pages/PriceAdminPage';
import DriverPage from './pages/DriverPage';
import TransporterAdminPage from './pages/TransporterPage';
import OrderAdminPage from './pages/OrderAdminPage';
import GeneralInfo from './pages/GeneralInfo';
import MaterialPrimary from './pages/MaterialPrimary';
import TransporterPrimary from './pages/TransporterPrimary';
import TransporterSecondary from './pages/TransporterSecondary';
import MaterialSecondary from './pages/MaterialSecondary';
import Test from './pages/Test';



// ----------------------------------------------------------------------

export default function Router() {
  const [access_token, setAccessToken] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const storedAccessToken = localStorage.getItem('access_token');
        setAccessToken(storedAccessToken);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [access_token]);


  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate loading delay for 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false); // After loading, set loading state to false
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  const routes = useRoutes([
    {
      path: '/dashboard',
      element: loading ? <Loading />: access_token ? <DashboardLayout /> : <LoginPage />,
      children: [
        { element: <Navigate to="/dashboard/job" />, index: true },
        // { path: 'app', element: <DashboardAppPage /> },
        { path: 'app', element: <EmployeePage /> }, 
        { path: 'user', element: <UserPage /> },
        { path: 'job', element: <JobPage /> },
        { path: 'createjob', element: <CreateJobPage /> },
        { path: 'employee', element: <EmployeePage /> },
        { path: 'SingleEmployee/:uid', element: <SingleEmployee /> },
        { path: 'SingleSupplier/:uid', element: <SingleSupplier /> },
        { path: 'SingleTransporter/:uid', element: <SingleTransporter /> },
        { path: 'SingleDriver/:uid', element: <SingleDriver /> },
        { path: 'SingleCustomer/:uid', element: <SingleCustomer /> },
        { path: "SingleJob/:regionId/:cityId/:roleId", element: <SingleJob /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'products_admin', element: <ProductAdminPage /> },
        { path: 'vehicle', element: <Vehicle /> },
        { path: 'pincodes', element: <Pincodes /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'supplier_admin', element: <SupplierPage /> },
        { path: 'driver_admin', element: <DriverPage /> },
        { path: 'transporter_admin', element: <TransporterAdminPage /> },
        { path: 'price_admin', element: <PriceAdminPage /> },
        { path: 'order_admin', element: <OrderAdminPage /> },
        { path: 'GeneralCity', element: <GeneralCity /> },
        { path: 'MaterialCity', element: <MaterialCity /> },
        { path: 'TransportCity', element: <TransportCity /> },
        {path: 'GeneralInfo/:regionId/:cityId',element:<GeneralInfo  />},
        { path: 'MaterialPrimary/:regionId/:cityId', element: <MaterialPrimary /> },
        { path: 'TransporterSecondary', element: <TransporterSecondary /> },
        { path: 'TransporterPrimary/:regionId/:cityId', element: <TransporterPrimary /> },
        { path: 'MaterialSecondary', element: <MaterialSecondary /> },
        { path: 'Test', element: <Test /> },

      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
