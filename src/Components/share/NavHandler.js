import React, { Component, useEffect, useState } from 'react';
import NabvarCustom from '../../sources/component/NabvarCustom';
import NavBar from "../../sources/component/NavBar.component";
// import NavBarMobile from "../../sources/component/NavBarMobile.component"
import NavBarMobileCustom from '../../sources/component/NavBarMobileCustom';
import dynamic from "next/dynamic";
import Router, {useRouter} from "next/router";
import NewNavBar from "../../sources/component/NewNavbar";


const NavBarMobile = dynamic(() =>
        import("../../sources/component/NavBarMobile.component"),
    {
        ssr:false
    }
);

const NavHandler = (props) => {
        const [state,setState] = useState({
          width: 1024,
        });

      useEffect(() => { {
        setState({ ...state,
          width: window.innerWidth });
      }},[])


    const router=useRouter()
    // const [isLoading, setIsLoading] = useState(false);
    // useEffect(() => {
    //     Router.events.on('routeChangeStart', () => setIsLoading(true));
    //     Router.events.on('routeChangeComplete', () => setIsLoading(false));
    //     Router.events.on('routeChangeError', () => setIsLoading(false));
    //
    //     return () => {
    //         Router.events.off('routeChangeStart', () => setIsLoading(true));
    //         Router.events.off('routeChangeComplete', () => setIsLoading(false));
    //         Router.events.off('routeChangeError', () => setIsLoading(false));
    //     };
    // }, [Router]);



        return (
            <div >
                <div>
                {props.type === 'receipt'?
                    <NavBarMobileCustom />
                :
                  <NavBarMobile />
                }
                </div>
                <div>
                {props.type === 'receipt'?
                <NabvarCustom/>
                :

<NewNavBar/>
        

                }
                </div>
            </div>
        );
}

export default NavHandler;
          {/* <NavBar/> */}