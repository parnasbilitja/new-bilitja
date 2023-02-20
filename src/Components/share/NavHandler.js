import React, { Component, useEffect, useState } from 'react';
import NabvarCustom from '../../sources/component/NabvarCustom';
import NavBar from "../../sources/component/NavBar.component";
import NavBarMobile from "../../sources/component/NavBarMobile.component"
import NavBarMobileCustom from '../../sources/component/NavBarMobileCustom';

const NavHandler = (props) => {
  console.log(props);
        const [state,setState] = useState({
          width: 1024,
        });
      
      useEffect(() => { {
        setState({ ...state,
          width: window.innerWidth });
  console.log(props);

      }},[])
        return (
            <>
                {state.width <= 826 ? 
                <>
                {props.type === 'receipt'?
                    <NavBarMobileCustom /> 
                :
                  <NavBarMobile /> 
                }
                </>
                : 
                <>
                {props.type === 'receipt'?
                <NabvarCustom/>
                :
                  <NavBar /> 
                }
                </>
                }
            </>
        );
}

export default NavHandler;