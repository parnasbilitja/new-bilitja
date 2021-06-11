import React, { useEffect, useState } from 'react'

import { Provider } from 'react-redux'
import { store, persistor } from '../Redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { useRouter } from 'next/router';
import Flight from '../Components/flight/Flight.page'
import FlightReserve from '../Components/flight_reserve/FlightReseve.page'
import NavBar from '../Components/nav_bar/NavBar.component'
import NavBarMobile from '../Components/nav_bar_mobile/NavBarMobile.component'
import Footer from '../Components/footer/Footer.component'
import MessageBox from '../Components/message_box/MessageBox.component'
import PopUp from '../Components/pop_up/PopUp.component'
import Account from '../Components/account/Account.component'

export default function Flights(){
    const myRouter=useRouter();
    const [width,setWidth] =useState(0);

    const handleResize = ()=>{
      setWidth(window.innerWidth)
    }
    useEffect(()=> {
      //setWidth(window.innerWidth);
      window.addEventListener('resize',handleResize)
      return()=>{
        window.removeEventListener('resize', handleResize)
      }
    },[]);

    //window.innerWidth
     return (
      <Provider store={store}>
              

<div className='bodyVar'>
     
 
{ width <= 826 ? <NavBarMobile /> : <NavBar /> }
 <div style={width <= 826 ? { marginTop: 110 } : { marginTop: 90 }} className='font-'>

 { myRouter.asPath.indexOf('info')>0 ? <FlightReserve /> : <Flight /> }

     <MessageBox />
     <Footer />
   </div>
   
   {/* <PopUp opened={this.props.accountBox.state} closePopUp={() => {
     this.props.accountBoxModify({
       state: false
     })
   }}>
         <Account />
   </PopUp> */}
         </div>

         <reportWebVitals/>
    </Provider>

);
}
