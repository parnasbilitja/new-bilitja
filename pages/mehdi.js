import app from 'next/app';
import Villa from './Pages/manager/villa/Villa.page';
import App from './App';


import React from 'react';
import { Provider } from 'react-redux'
import { store, persistor } from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { withRouter } from 'next/router';

function Mehdi(){
     return (
      <h1>mehdiskjddskjskjd
      
      <Provider store={store}>
              
              <PersistGate persistor={persistor}>
              <Villa></Villa>
              </PersistGate>
          </Provider>
      </h1>
        //   <Provider store={store}>
          
        //     <PersistGate persistor={persistor}>
        //   <App/>
        //     </PersistGate>
        // </Provider>
);
}
export default withRouter(Mehdi)