import React from 'react';
import styles from '../../../../../styles/newTour/components/subComponent/PopUpMap.module.scss'
import MapComponent from "../../../../sources/component/Map.component";

const MapPopUpComponent = (props) => {
    return (
        <div className={styles['popup-container']} onClick={()=> {

            props.setShowInMap({status:false,coordinates:[]})
        }}>

            <div className={styles['popup']} onClick={(e)=>   e.stopPropagation()}>
                <MapComponent coordinates={props.coordinates}/>
            </div>

        </div>
    );
};

export default MapPopUpComponent;
