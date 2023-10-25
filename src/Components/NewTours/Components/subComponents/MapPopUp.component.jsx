import React from 'react';
import styles from '../../../../../styles/newTour/components/subComponent/PopUpMap.module.scss'
import MapComponent from "../../../../sources/component/Map.component";


const MapPopUpComponent = (props) => {
    return (
        <div className={styles['popup-container']} onClick={()=> {

            props.setShowInMap(false)
        }}>

            <div className={styles['popup']} onClick={(e)=>   e.stopPropagation()}>
                <MapComponent/>
            </div>

        </div>
    );
};

export default MapPopUpComponent;