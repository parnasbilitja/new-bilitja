
//  http://localhost:3000/Ali/hasan
// pages/blog/[slug].js
import Villa from './Pages/manager/villa/Villa.page'
import AddVila from './Pages/manager/villa/AddVilla.page'


import React from 'react';
import { Provider } from 'react-redux'
import { store, persistor } from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react'

import { useRouter } from 'next/router'
import App from './App'
export default function RoutePagingInHome() {
  const router = useRouter()
  const { slug } = router.query
  return    <Provider store={store}>
              
//           <PersistGate persistor={persistor}>
//         <App/>
//           </PersistGate>
//       </Provider>;
//   switch (slug ){ 
//      case 'ویلا':
//           return    <Provider store={store}>
              
//           <PersistGate persistor={persistor}>
//         <App/>
//           </PersistGate>
//       </Provider>;

//      case 'search':
       
//           return <div><Villa/></div>;
//      case 'add':
//           return <AddVila/>;

//       default:
//           return <h1>default page { slug } </h1>;
//           }

}