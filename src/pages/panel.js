
import React from 'react';
import { Provider } from 'react-redux'
import { store, persistor } from '../Redux/store';
import AddVilla from '../../src/Components/manager/villa/AddVilla.page'
import Villa from '../../src/Components/manager/villa/Villa.page'
import VillaDetial from '../../src/Components/manager/villa/VilaDetail.page'
import { useRouter } from 'next/router';

import ManagerNav from '../Components/manager_nav/ManagerNav.component'
import MessageBox from '../Components/message_box/MessageBox.component'


export default function ManagePanel() {
  const myRouter=useRouter();
  // const [width,setWidth] =useState(0);

  // const handleResize = ()=>{
  //   setWidth(window.innerWidth)
  // }
  // useEffect(()=> {
  //   //setWidth(window.innerWidth);
  //   window.addEventListener('resize',handleResize)
  //   return()=>{
  //     window.removeEventListener('resize', handleResize)
  //   }
  // },[]);

    return(
      
        <Provider store={store}>
              
              
              
                <ManagerNav />
                <div className="panel-manager-main-container">
                    <div className="panel-manager-content-container">
                    { 
                    myRouter.asPath.indexOf('add')>0 ? <AddVilla></AddVilla> :
                  myRouter.asPath.indexOf('search')>0 ? <Villa/>:
                  myRouter.asPath.indexOf('detail')>0 ? <VillaDetial/>:
                  
                  <div/>
                  }
                            <MessageBox />
                    </div>
                </div>
               
                                
            
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