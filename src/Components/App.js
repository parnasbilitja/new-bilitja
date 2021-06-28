import React from 'react'


//import Styles from '../../styles/icon.module.scss'
//import '../../styles/manager.module.scss'

import Home from './home/Home.page'

import NavBar from './nav_bar/NavBar.component'
import NavBarMobile from './nav_bar_mobile/NavBarMobile.component'
import Footer from './footer/Footer.component'
import MessageBox from './message_box/MessageBox.component'
import PopUp from './pop_up/PopUp.component'
import Account from './account/Account.component'

import { connect } from 'react-redux'
import { selcetAccountBox } from '../Redux/UI/ui.reselect'
import { accountBoxModify } from '../Redux/UI/ui.action'
import AccommodationPage from './accommodation/Accommodation.page'
import AccommodationList from './accommodation_list/AccommodationList.page'
import AccommodationReserve from './accommodation_reserve/AccommodationReserve.page'
import AccommodationReceipt from './accommodation_receipt/AccommodationReceipt.page'


import Flight from '../Components/flight/Flight.page'
import FlightReserve from '../Components/flight_reserve/FlightReseve.page'
import FlightReciept from '../Components//flight_receipt/FlightReciept.page'
import TrackOrder from '../Components//track_order/TrackOrder.page'


// import ManagerNav from '../Components/manager_nav/ManagerNav.component'
// import Villa from '/manager/villa/Villa.page'
// import AddVila from '/manager/villa/AddVilla.page'
// import AddCity from '/manager/city/AddCity.page'
// import AddRule from '/manager/rule/AddRule.page'
// import AddFacility from '/manager/facility/AddFacility.page'
// import ShowallCities from '/manager/city/ShowAllCities.page'
// import UpdateCity from '/manager/city/UpdateCity.page'
// import ShowallFacilities from '/manager/facility/ShowAllFacilities.page'
// import UpdateFacility from '/manager/facility/UpdateFacility.page'
// import ShowallRules from '/manager/rule/ShowAllRules.page'
// import UpdateRule from '/manager/rule/UpdateRule.page'
// import UpdateVila from '/manager/villa/UpdateVila.page'
// import VilaDetial from '/manager/villa/VilaDetail.page'
// import VilaReservation from '/manager/villa/VilaReservation.page'
import BecomeMember from './become_member/BecomeMember.page'
import {  withRouter } from 'next/router'
import ManagerTopActionBox from './manager_top_action_box/ManagerTopActionBox.component'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    
  }

mainRouter(pathName) {
  console.log(decodeURI( pathName));
   
  
  switch( this.props.mainRoute){
    case "index":
      return  <Home></Home>;   
    case "flights":
          if(pathName.indexOf('info')>0 ){
            return <FlightReserve />   ;
          } else if(pathName.indexOf('receipt')>0 ){
            return <FlightReciept />   ;
          } else if(pathName.indexOf('order')>0 ){
            return <TrackOrder />   ;
          } else{
            return <Flight/>;
          }
     case "villa":
          pathName.indexOf('intro')>0 ? <BecomeMember/> :
          pathName.indexOf('reserve')>0 ? <AccommodationReserve/>:
          pathName.indexOf('receipt')>0 ? <AccommodationReceipt/>:
          pathName.length<7 ? <AccommodationPage/>:
          <AccommodationList /> 


    default:
      return  <Home></Home>;   
  }
   /*
   <Switch>
                  </Switch> */
}  

  componentDidMount() {
    this.updateWindowDimensions();
     window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
     window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }
  render() {
    
    return (

     <div className='bodyVar'>
     

     { this.state.width <= 826 ? <NavBarMobile /> : <NavBar /> }
      <div style={this.state.width <= 826 ? { marginTop: 110 } : { marginTop: 90 }} className='font-'>
          {
          this.mainRouter(this.props.router.asPath)
          //console.log(this.props.router)
       //   this.props.router.push("/flights")
      
          }
          <MessageBox />
          <Footer />
        </div>
        <PopUp opened={this.props.accountBox.state} closePopUp={() => {
          this.props.accountBoxModify({
            state: false
          })
        }}>
              <Account />
        </PopUp>
              </div>
      
    );
  }
}
const mapStatesToProps = (state) => ({
  accountBox: selcetAccountBox(state)
})
const mapDispatchesToProps = (dispatch) => ({
  accountBoxModify: value => dispatch(accountBoxModify(value))
})
export default withRouter( connect(mapStatesToProps, mapDispatchesToProps)(App));


