import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import {
  HomeLayout,
  Landing,
  Error,
  Products,
  SingleProduct,
  Cart,
  About,
  // Register,
  // Login,
  Checkout,
  Orders,
} from './pages';
import {loader as singlePageLoader} from './pages/SingleProduct';
import Login from './components/Login';
import Register from './components/Register';
import { ErrorElement } from './components';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { loader as productsLoader } from './pages/Products';
import { loader as landingLoader } from './pages/Landing';
import {action as registerAction} from './components/Register';
import {action as loginAction} from './components/Login';
import { store } from './app/store';
import {loader as checkoutLoader} from './pages/Checkout';
import {action as checkoutAction} from './components/CheckoutForm'
import {loader as orderLoader} from './pages/Orders';

const queryClient = new QueryClient({
  defaultOptions: {
    queries:{
      staleTime:1000*60*5,

    },
  },
});
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        errorElement:<ErrorElement/>,
        loader:landingLoader(queryClient),
        element: <Landing />,
      },
      {
        path: 'products',
        errorElement:<ErrorElement/>,
        loader:productsLoader(queryClient),
        element: <Products />,
      },
      {
        path: 'products/:id',
        errorElement: <ErrorElement/>,
        loader: singlePageLoader(queryClient),
        element: <SingleProduct />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      { path: 'about', element: <About /> },
      {
        path: 'checkout',
        errorElement:<ErrorElement/>,
        action: checkoutAction(store, queryClient),
        loader:checkoutLoader(store),
        element: <Checkout />,
      },
      {
        path: 'orders',
        loader:orderLoader(store, queryClient),
        element: <Orders />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action:loginAction(store),
  },
  {
    path: '/register',
    element: <Register />,
    action:registerAction,
    errorElement: <Error />,
  },
]);


const App = () => {
  return (
   <QueryClientProvider client={queryClient} >

<RouterProvider router={router} />
<ReactQueryDevtools initialIsOpen= {false}/>

   </QueryClientProvider>
  );


};
export default App;