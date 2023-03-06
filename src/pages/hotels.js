import React, { useEffect, useState } from 'react';
import Footer from '../sources/component/Footer.component';
import PictureBase from '../sources/component/PictureBase';
import Hotels from '../Components/hotel/Hotels';
import NavHandler from '../Components/share/NavHandler';

const hotels = () => {
    
    return (
        <div>
            <NavHandler />
            <div className="mt-90 bodyVar">
                <PictureBase/>
                <Hotels/>
                <Footer />
            </div>
        </div >
    );
};

export default hotels;