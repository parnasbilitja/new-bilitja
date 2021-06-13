import React, { useEffect, useState } from 'react'

import { Provider } from 'react-redux'
import { store, persistor } from '../Redux/store';
import { useRouter } from 'next/router';
import NavBar from '../Components/nav_bar/NavBar.component'
import NavBarMobile from '../Components/nav_bar_mobile/NavBarMobile.component'
import Footer from '../Components/footer/Footer.component'
import MessageBox from '../Components/message_box/MessageBox.component'
import PopUp from '../Components/pop_up/PopUp.component'
import Account from '../Components/account/Account.component'
import AccommodationPage from '../Components/accommodation/Accommodation.page'
import AccommodationList from '../Components/accommodation_list/AccommodationList.page'
import AccommodationReserve from '../Components/accommodation_reserve/AccommodationReserve.page'
import AccommodationReceipt from '../Components/accommodation_receipt/AccommodationReceipt.page'

import BecomeMember from '../Components/become_member/BecomeMember.page'
export default function Villas(){
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
 
 

 { myRouter.asPath.indexOf('intro')>0 ? <BecomeMember/> :
 myRouter.asPath.indexOf('reserve')>0 ? <AccommodationReserve/>:
 myRouter.asPath.indexOf('receipt')>0 ? <AccommodationReceipt/>:
 decodeURI(myRouter.asPath).length<7 ? <AccommodationPage/>:
 //decodeURI(myRouter.asPath).indexOf('تهران')>0 ? <AccommodationList/>:
 <AccommodationList /> 

 }
 {/* case '/ویلا/intro' : return <BecomeMember/>;
      case "/ویلا" : return <AccommodationPage/>;
      case "/ویلا/تهران" : return <AccommodationList/>;
      case "/reserve/ویلا/تهران/:id" : return <AccommodationReserve/>;
      case "/receipt/ویلا/تهران" : return <AccommodationReceipt/>; */}

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
