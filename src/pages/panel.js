
import React from 'react';
import { Provider } from 'react-redux'
import { store, persistor } from '../Redux/store';
import AddVilla from '../../src/Components/manager/villa/AddVilla.page'
import Villa from '../../src/Components/manager/villa/Villa.page'
import VillaDetial from '../../src/Components/manager/villa/VilaDetail.page'
import { useRouter } from 'next/router';

import ManagerNav from '../Components/manager_nav/ManagerNav.component'
import MessageBox from '../Components/message_box/MessageBox.component'
import AddVila from '../Components/manager/villa/AddVilla.page'
import AddCity from '../Components/manager/city/AddCity.page'
import AddRule from '../Components/manager/rule/AddRule.page'
import AddFacility from '../Components/manager/facility/AddFacility.page'
import ShowallCities from '../Components/manager/city/ShowAllCities.page'
import UpdateCity from '../Components/manager/city/UpdateCity.page'
import ShowallFacilities from '../Components/manager/facility/ShowAllFacilities.page'
import UpdateFacility from '../Components/manager/facility/UpdateFacility.page'
import ShowallRules from '../Components/manager/rule/ShowAllRules.page'
import UpdateRule from '../Components/manager/rule/UpdateRule.page'
import UpdateVila from '../Components/manager/villa/UpdateVila.page'
import VilaDetial from '../Components/manager/villa/VilaDetail.page'
import VilaReservation from '../Components/manager/villa/VilaReservation.page'


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
  function mainRouter(pathName) {
    console.log(decodeURI( pathName));
      
    switch (decodeURI( pathName)) {
      case '/panel/villas/add' : return <AddVilla></AddVilla>  ; 
       case '/panel/villas/search' : return <Villa/>  ;
       case '/panel/villas/add' : return <AddVila/>  ;
       case '/panel/villas/search/:id' : return <UpdateVila/>  ;
       case '/panel/villas/detail/:id' : return <VilaDetial/>  ;
       case '/panel/villas/getReservation' : return <VilaReservation/>  ;
      


       case '/panel/city/add' : return <AddCity/>  ;
       case '/panel/city/show' : return <ShowallCities/>  ;
       case '/panel/city/show/:id' : return <UpdateCity/>  ;

       case '/panel/rule/add' : return <AddRule/>  ;
       case '/panel/rule/show' : return <ShowallRules/>  ;
       case '/panel/rule/show/:id' : return <UpdateRule/>  ;


       case '/panel/facility/add' : return <AddFacility/>  ;
       case '/panel/facility/show' : return <ShowallFacilities/>  ;
       case '/panel/facility/show/:id' : return <UpdateFacility/>  ;

      default:
        return  <div/>   
    }
  }  
  
    return(
 
        <Provider store={store}>
             
              
                <ManagerNav />
                <div className="panel-manager-main-container">
                    <div className="panel-manager-content-container">
                    {console.log(myRouter.asPath) }
                    {
                    
                    mainRouter(myRouter.asPath)
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