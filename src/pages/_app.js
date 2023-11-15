import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/global.style.scss";
import "../../styles/App.css";
import "../../styles/index.css";
import "../../styles/icon.scss";
import "../../styles/values.scss";
import "../../styles/Calendar.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import * as ga from "../../lib/ga";
import { Provider } from "react-redux";
import { store } from "../Redux/store";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import MenubarForMobile from "../Components/share/MenubarForMobile";

// import ManagerNav from "./panelnew/compo/ManagerNav.component";

// export const config = { amp: true }

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

  // const [widthMobi, setWidthMobi] = useState(
  //     typeof window !== "undefined" && getWindowSize()
  // );
  // function getWindowSize() {
  //   const { innerWidth } = window;
  //   return innerWidth;
  // }
  // useEffect(() => {
  //   function handleWindowResize() {
  //     setWidthMobi(getWindowSize());
  //   }
  //   window.addEventListener("resize", handleWindowResize);
  // }, []);

  return (
      <Provider store={store} >
        <title>خریداینترنتی بلیط ارزان هواپیما |بلیطجا| 02184278</title>
        <link rel="canonical" href="https://hamnavaz.com/" />

        {Component.PageLayout ? (
            <Component.PageLayout>
              {/* <ManagerNav /> */}
              <Component {...pageProps} />
            </Component.PageLayout>
        ) : (
            <>
              {/*<MenubarForMobile />*/}

              <Component {...pageProps} />
            </>
        )}

      </Provider>
  );
}

export default MyApp;
