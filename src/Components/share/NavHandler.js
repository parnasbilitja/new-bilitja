import React, { Component, useEffect, useState } from 'react';
import NabvarCustom from '../../sources/component/NabvarCustom';
import NavBar from "../../sources/component/NavBar.component";
// import NavBarMobile from "../../sources/component/NavBarMobile.component"
import NavBarMobileCustom from '../../sources/component/NavBarMobileCustom';
import dynamic from "next/dynamic";

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
        return (
            <div>
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
                  <NavBar /> 
                }
                </div>
            </div>
        );
}

export default NavHandler;