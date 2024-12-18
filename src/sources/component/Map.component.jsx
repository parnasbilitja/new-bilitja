import React, {useEffect} from 'react';
import {MapContainer, Marker, Popup, TileLayer, Tooltip} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import styles from '../../../styles/Map.module.scss'


const MapComponent = (props) => {

    return (
        <>
            <MapContainer className={styles['map']} center={props.coordinates} zoom={16} scrollWheelZoom={true }>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={props.coordinates}>
                    <Popup>
                        <strong>

                        سایت بلیطجا
                        </strong>
                    </Popup>
                </Marker>
            </MapContainer>
        </>
    );
};

export default MapComponent;
