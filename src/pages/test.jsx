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

// try {
//     const { data, status } = await GetAdvertsList(page_number);
//     if (status === 200) {
//       setState((prevState) => ({ ...prevState, adverts: data.data }));
//     }
//   } catch ({ response }) {
//     if (response) {
//       if (response.status === 400) {
//         ErrorMessage(ProblemError);
//       } else {
//         ErrorMessage(ProblemError);
//       }
//     } else {
//       ErrorMessage(NetworkError);
//     }
//   }

//   export const GetAdvertsList = (page_number) => {
//     return get(`${config.api_v1}/Adverts?PageNumber=${page_number}&PageSize=9`);
//   };
