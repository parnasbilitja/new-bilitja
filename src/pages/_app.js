import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/global.style.scss";
import "../../styles/App.css";
import "../../styles/index.css";
import "../../styles/icon.scss";
import "../../styles/values.scss";
import "../../styles/Calendar.scss";

import { useEffect } from "react";
import { useRouter } from "next/router";

import * as ga from "../../lib/ga";
import { Provider } from "react-redux";
import { store } from "../Redux/store";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
