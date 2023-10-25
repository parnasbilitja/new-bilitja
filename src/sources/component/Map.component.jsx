import React from 'react';
import {MapContainer, Marker, Popup, TileLayer, Tooltip} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import styles from '../../../styles/Map.module.scss';


const MapComponent = () => {
    return (
        <>
            <MapContainer className={styles['map']} center={[35.718881, 51.435420]} zoom={16} scrollWheelZoom={true }>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[35.718881, 51.435420]}>
                    <Popup>
                        <strong>
                        شرکت خدمات مسافرت هوایی و جهانگردی همنواز آسمان آبی
                        </strong>
                    </Popup>
                </Marker>
            </MapContainer>
        </>
    );
};

export default MapComponent;