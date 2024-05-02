import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/global.style.scss";
import "../../styles/App.css";
import "../../styles/index.css";
import "../../styles/icon.scss";
import "../../styles/values.scss";
import "../../styles/Calendar.scss";
import Cookies from 'js-cookie'
import React, {useEffect, useRef, useState} from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store } from "../Redux/store";
import TagManager from 'react-gtm-module'


// export const config = { amp: true }

import { PostHogProvider } from 'posthog-js/react'
import {QueryClient, QueryClientProvider} from "react-query";
function MyApp({ Component, pageProps }) {


  const router = useRouter();

  useEffect(() => {
    const firstUrl = Cookies.get('firstUrl');

    if (!firstUrl && router.asPath) {
      Cookies.set('firstUrl1', router.asPath);
    }

  }, [router]);

  const tagManagerArgs = {
    gtmId: 'GTM-WN4X4CF7'
  }

  useEffect(()=>{

    TagManager.initialize(tagManagerArgs)
  },[])




  const [widthMobi, setWidthMobi] = useState(
    typeof window !== "undefined" && getWindowSize()
  );
  function getWindowSize() {
    const { innerWidth } = window;
    return innerWidth;
  }
  useEffect(() => {
    function handleWindowResize() {
      setWidthMobi(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
  }, []);





  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
      // <PostHogProvider client={posthog}>

    <Provider store={store}>
      <title>خریداینترنتی بلیط ارزان هواپیما |بلیطجا| 021842799999</title>
      <link rel="canonical" href="https://hamnavaz.com/" />

      {Component.PageLayout ? (
        <Component.PageLayout>
          {/* <ManagerNav /> */}
          <Component {...pageProps} />

        </Component.PageLayout>
      ) : (
        <>
          {/*<MenubarForMobile />*/}
          <QueryClientProvider client={queryClientRef.current}>
          <Component {...pageProps} />

            <div className='isMobile'>{(router.pathname.includes('reserve') || router.pathname.includes('flights') || router.pathname.includes('hotels') || router.pathname.includes('ticket')) ?
              null :  <a href="tel:02184278" style={{
                  display: 'flex',
                  columnGap: '10px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#e20000',
                  width: 'auto',
                  position: 'fixed',
                  zIndex: '9999',
                  bottom: (router.pathname.includes('hotelselect') || router.pathname.includes('flights')) ? '70px' : '10px',
                  right: '10px',
                  color: "white",
                  padding: '10px',
                  borderRadius: '20px'
                }}>
                  <div style={{
                    width: 'auto',
                    height: 'auto',
                    padding: '4px',
                    backgroundColor: 'white',
                    borderRadius: "20px"
                  }}>

                    <svg fill='#e20000' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                         width="24">
                      <path
                          d="M760-480q0-117-81.5-198.5T480-760v-80q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480h-80Zm-160 0q0-50-35-85t-85-35v-80q83 0 141.5 58.5T680-480h-80Zm198 360q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/>
                    </svg>
                  </div>
                  <div>

                    <p style={{textAlign: 'center', margin: '0', padding: '0', whiteSpace: 'nowrap'}}>رزرو تلفنی تور</p>

                  </div>

                </a>}
            </div>


          </QueryClientProvider>

        </>
      )}
    </Provider>
      // </PostHogProvider>
  );
}

export default MyApp;
