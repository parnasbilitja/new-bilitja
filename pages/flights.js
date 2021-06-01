import app from 'next/app';
import Villa from './Pages/manager/villa/Villa.page';
import App from './App';


import React from 'react';
import { Provider } from 'react-redux'
import { store, persistor } from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { useRouter } from 'next/router';
import Flight from './Pages/flight/Flight.page'
function Flights(){
    const myRouter=useRouter();


     return (
      <div className='bodyVar'>
          <Provider store={store}>
         
          <Flight/>
         
        </Provider>
        </div>
);
}
export default Flights