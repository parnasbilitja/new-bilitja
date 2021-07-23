import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "../Redux/store";
//import { PersistGate } from 'redux-persist/integration/react'
//import reportWebVitals from './reportWebVitals';
import App from "../../src/sources/App";
export default function Flights() {
  return (
    <Provider store={store}>
      <App mainRoute="villa" />
      {/* <reportWebVitals/> */}
    </Provider>
  );
}
