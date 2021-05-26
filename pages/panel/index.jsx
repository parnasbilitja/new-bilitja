import { Provider } from 'react-redux'
import { store, persistor } from '../..//pages/Redux/store';
import { PersistGate } from 'redux-persist/integration/react'

import ManagerNav from '../../pages/Components/manager_nav/ManagerNav.component'
import MessageBox from '../../pages/Components/message_box/MessageBox.component'


export default function ManagePanel() {
    return(
        
        <Provider store={store}>
              
              <PersistGate persistor={persistor}>
              
                <ManagerNav />
                <div className="panel-manager-main-container">
                    <div className="panel-manager-content-container">
                            <MessageBox />
                    </div>
                </div>
            
            </PersistGate>
            </Provider>

        );
  }

  /*
  
            <Route exact={false} path='/panel' component={() => {
            return (
              <>
                <ManagerNav />
                <div className="panel-manager-main-container">
                  <div className="panel-manager-content-container">
                    <Switch>
                      <Route exact path='/panel/villas/search' component={Villa} />
                      <Route exact path='/panel/villas/add' component={AddVila} />
                      <Route exact path='/panel/villas/search/:id' component={UpdateVila} />
                      <Route exact path='/panel/villas/detail/:id' component={VilaDetial} />
                      <Route exact path='/panel/villas/getReservation' component={VilaReservation} />
                      


                      <Route exact path='/panel/city/add' component={AddCity} />
                      <Route exact path='/panel/city/show' component={ShowallCities} />
                      <Route exact path='/panel/city/show/:id' component={UpdateCity} />

                      <Route exact path='/panel/rule/add' component={AddRule} />
                      <Route exact path='/panel/rule/show' component={ShowallRules} />
                      <Route exact path='/panel/rule/show/:id' component={UpdateRule} />


                      <Route exact path='/panel/facility/add' component={AddFacility} />
                      <Route exact path='/panel/facility/show' component={ShowallFacilities} />
                      <Route exact path='/panel/facility/show/:id' component={UpdateFacility} />

                    </Switch>
                    <MessageBox />

                  </div>
                </div>
              </>
            )
          }} />

  */