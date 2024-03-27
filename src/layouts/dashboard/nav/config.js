// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: icon('ic_analytics'),
  // },
  {
    title: 'Company Section :',
    icon: icon('ic_cart'),
    submenu: [
      {
        title: 'Create Jobs',
        path: '/dashboard/createjob',
        icon: icon('ic_user'),
      },
      {
        title: 'Organisation',
        path: '/dashboard/job',
        icon: icon('ic_user'),
      },
      {
        title: 'Applied Candidates',
        path: '/dashboard/employee',
        icon: icon('ic_user'),
      },
      {
        title: 'Add Locations',
        path: '/dashboard/pincodes',
        icon: icon('ic_cart'),
          }
    ]
  },
  // Other Developed Parts Started
  // {
  //   title: 'Survey Section :',
  //   icon: icon('ic_cart'),
  //   submenu: [
  //     {
  //       title: 'GI (General)',
  //       path: '/dashboard/GeneralCity',
  //       icon: icon('ic_user'),
  //     },
  //     {
  //       title: 'MI (Material)',
  //       path: '/dashboard/MaterialCity',
  //       icon: icon('ic_user'),
  //     },
  //     {
  //       title: 'TI (Transport)',
  //       path: '/dashboard/TransportCity',
  //       icon: icon('ic_user'),
  //     },
  //   ]
  // },
  // {
  //   title: 'Orders',
  //   path: '/dashboard/order_admin',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'Materials Section :',
  //   icon: icon('ic_cart'),
  //   submenu: [
  //     {
  //       title: 'Price Update',
  //       path: '/dashboard/price_admin',
  //       icon: icon('ic_user'),
  //     },
  //     {
  //       title: 'Create Product',
  //       path: '/dashboard/products_admin',
  //       icon: icon('ic_cart'),
  //     },
  //     {
  //       title: 'Add Vehicles',
  //       path: '/dashboard/vehicle',
  //       icon: icon('ic_cart'),
  //     },
  //     {
  //       title: 'Add Locations',
  //       path: '/dashboard/pincodes',
  //       icon: icon('ic_cart'),
  //     }
  //   ]
  // },
  // {
  //   title: 'Lists Section :',
  //   icon: icon('ic_cart'),
  //   submenu: [
     
     
  //     {
  //       title: 'User List',
  //       path: '/dashboard/user',
  //       icon: icon('ic_user'),
  //     },
  //     {
  //       title: 'Supplier List',
  //       path: '/dashboard/supplier_admin',
  //       icon: icon('ic_user'),
  //     },
  //     {
  //       title: 'Transporter List',
  //       path: '/dashboard/transporter_admin',
  //       icon: icon('ic_user'),
  //     },
  //     {
  //       title: 'Driver List',
  //       path: '/dashboard/driver_admin',
  //       icon: icon('ic_user'),
  //     },    
  //   ]
  // },
  // Other Developed Parts ended
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },

 
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',  
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
