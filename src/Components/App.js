import React from 'react'


//import Styles from '../../styles/icon.module.scss'
//import '../../styles/manager.module.scss'

import Home from './home/Home.page'
//import Flight from '/flight/Flight.page'
//import FlightReserve from '/flight_reserve/FlightReseve.page'
import FlightReciept from './flight_receipt/FlightReciept.page'
import TrackOrder from './track_order/TrackOrder.page'

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
    
  switch (decodeURI( pathName)) {
      case "/" : return <Home/>;
      case '/ویلا/intro' : return <BecomeMember/>;
      case "/ویلا" : return <AccommodationPage/>;
      case "/ویلا/تهران" : return <AccommodationList/>;
      case "/reserve/ویلا/تهران/:id" : return <AccommodationReserve/>;
      case "/receipt/ویلا/تهران" : return <AccommodationReceipt/>;
      // //case "/بلیط-هواپیما/اصفهان/مشهد" :this.props.router.push("/Flight");break;
      // case "/بلیط-هواپیما/:source/:destination" : return <Flight/>;
      // case "/بلیط-هواپیما/:source/:destination/info" : return <FlightReserve/>;
      case "/بلیط-هواپیما/receipt" : return <FlightReciept/>;
      case "/بلیط-هواپیما/order" : return <TrackOrder/>;

      // //  case "/[slug]":
    //  //   return <h1>SLUG</h1>; 
    //     case "/ویلا":
    //       return <AccommodationPage/>;           
    //     case  "/ویلا/تهران" :
    //         return <h1>vila tehran</h1>;                 
      // case "/mehdi":
      //   return <Villa/>;   
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


