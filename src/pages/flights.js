import React, { useEffect, useState } from 'react'

import { Provider } from 'react-redux'
import { store, persistor } from '../Redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { useRouter } from 'next/router';
import Flight from '../Components/flight/Flight.page'
import FlightReserve from '../Components/flight_reserve/FlightReseve.page'
import FlightReciept from '../Components//flight_receipt/FlightReciept.page'
import TrackOrder from '../Components//track_order/TrackOrder.page'

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
    function mainRouter(pathName) {
      console.log(decodeURI( pathName));
      if(pathName.indexOf('info')>0 ){
        return <FlightReserve />   ;
      } else if(pathName.indexOf('receipt')>0 ){
        return <FlightReciept />   ;
      } else if(pathName.indexOf('order')>0 ){
        return <TrackOrder />   ;
      } else{
        return <Flight/>;
      }

      // switch (decodeURI( pathName)) {
      //      case "/بلیط-هواپیما/:source/:destination" : return <Flight/>;
      //      case "/بلیط-هواپیما/:source/:destination/info" : return <FlightReserve/>;
      //     case "/بلیط-هواپیما/receipt" : return <FlightReciept/>;
      //     case "/بلیط-هواپیما/order" : return <TrackOrder/>;
      //     // <Route exact path="/بلیط-هواپیما/:source/:destination" component={Flight} />
      //     // <Route exact path="/بلیط-هواپیما/:source/:destination/info" component={FlightReserve} />
      //     // <Route exact path="/بلیط-هواپیما/receipt" component={FlightReciept} />
      //     // <Route exact path="/بلیط-هواپیما/order" component={TrackOrder} />

      //   default:
      //     return  <Home></Home>;   
      // }
    }
    
    //window.innerWidth
     return (
      <Provider store={store}>
              

<div className='bodyVar'>
     
 
{ width <= 826 ? <NavBarMobile /> : <NavBar /> }
 <div style={width <= 826 ? { marginTop: 110 } : { marginTop: 90 }} className='font-'>

 { mainRouter(myRouter.asPath)
 }


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
