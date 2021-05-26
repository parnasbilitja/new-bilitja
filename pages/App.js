import React from 'react'

//import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
//import './Assets/Styles/global.style.scss'
import Styles from '../Styles/icon.module.scss'
import '../styles/manager.module.scss'

import Home from './Pages/home/Home.page'
import Flight from './Pages/flight/Flight.page'
import FlightReserve from './Pages/flight_reserve/FlightReseve.page'
import FlightReciept from './Pages/flight_receipt/FlightReciept.page'
import TrackOrder from './Pages/track_order/TrackOrder.page'
import { Route, Switch, withRouter } from "react-router-dom"

import NavBar from './Components/nav_bar/NavBar.component'
import NavBarMobile from './Components/nav_bar_mobile/NavBarMobile.component'
import Footer from './Components/footer/Footer.component'
import MessageBox from './Components/message_box/MessageBox.component'
import PopUp from './Components/pop_up/PopUp.component'
import Account from './Components/account/Account.component'

import { connect } from 'react-redux'
import { selcetAccountBox } from './Redux/UI/ui.reselect'
import { accountBoxModify } from './Redux/UI/ui.action'
import AccommodationPage from './Pages/accommodation/Accommodation.page'
import AccommodationList from './Pages/accommodation_list/AccommodationList.page'
import AccommodationReserve from './Pages/accommodation_reserve/AccommodationReserve.page'
import AccommodationReceipt from './Pages/accommodation_receipt/AccommodationReceipt.page'
import ManagerNav from './Components/manager_nav/ManagerNav.component'
import Villa from './Pages/manager/villa/Villa.page'
import AddVila from './Pages/manager/villa/AddVilla.page'
import AddCity from './Pages/manager/city/AddCity.page'
import AddRule from './Pages/manager/rule/AddRule.page'
import AddFacility from './Pages/manager/facility/AddFacility.page'
import ShowallCities from './Pages/manager/city/ShowAllCities.page'
import UpdateCity from './Pages/manager/city/UpdateCity.page'
import ShowallFacilities from './Pages/manager/facility/ShowAllFacilities.page'
import UpdateFacility from './Pages/manager/facility/UpdateFacility.page'
import ShowallRules from './Pages/manager/rule/ShowAllRules.page'
import UpdateRule from './Pages/manager/rule/UpdateRule.page'
import UpdateVila from './Pages/manager/villa/UpdateVila.page'
import VilaDetial from './Pages/manager/villa/VilaDetail.page'
import VilaReservation from './Pages/manager/villa/VilaReservation.page'
import BecomeMember from './Pages/become_member/BecomeMember.page'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

  }
  componentDidMount() {
    this.updateWindowDimensions();
    // window.addEventListener('resize', this.updateWindowDimensions);

  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }
  render() {
    return (
     <>
     
     
     {
                  this.state.width <= 826 ? <NavBarMobile /> : <NavBar />
                }
                                <div style={this.state.width <= 826 ? { marginTop: 110 } : { marginTop: 90 }}>
                                
                  {/* <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path='/ویلا/intro' component={BecomeMember}/>
                    <Route exact path="/ویلا" component={AccommodationPage} />
                    <Route exact path="/ویلا/تهران" component={AccommodationList} />
                    <Route exact path="/reserve/ویلا/تهران/:id" component={AccommodationReserve} />
                    <Route exact path="/receipt/ویلا/تهران" component={AccommodationReceipt} />
                    <Route exact path="/بلیط-هواپیما/:source/:destination" component={Flight} />
                    <Route exact path="/بلیط-هواپیما/:source/:destination/info" component={FlightReserve} />
                    <Route exact path="/بلیط-هواپیما/receipt" component={FlightReciept} />
                    <Route exact path="/بلیط-هواپیما/order" component={TrackOrder} />
                  </Switch> */}

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
              </>


        /* <Switch>
          <Route exact={false} path='/' component={() => {
            return (
              <>
                {
                  this.state.width <= 826 ? <NavBarMobile /> : <NavBar />
                }
                <div style={this.state.width <= 826 ? { marginTop: 110 } : { marginTop: 90 }}>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path='/ویلا/intro' component={BecomeMember}/>
                    <Route exact path="/ویلا" component={AccommodationPage} />
                    <Route exact path="/ویلا/تهران" component={AccommodationList} />
                    <Route exact path="/reserve/ویلا/تهران/:id" component={AccommodationReserve} />
                    <Route exact path="/receipt/ویلا/تهران" component={AccommodationReceipt} />
                    <Route exact path="/بلیط-هواپیما/:source/:destination" component={Flight} />
                    <Route exact path="/بلیط-هواپیما/:source/:destination/info" component={FlightReserve} />
                    <Route exact path="/بلیط-هواپیما/receipt" component={FlightReciept} />
                    <Route exact path="/بلیط-هواپیما/order" component={TrackOrder} />
                  </Switch>

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
              </>
            )
          }
          
          } />
        </Switch> */
      
    );
  }
}
const mapStatesToProps = (state) => ({
  accountBox: selcetAccountBox(state)
})
const mapDispatchesToProps = (dispatch) => ({
  accountBoxModify: value => dispatch(accountBoxModify(value))
})
export default connect(mapStatesToProps, mapDispatchesToProps)(App);


