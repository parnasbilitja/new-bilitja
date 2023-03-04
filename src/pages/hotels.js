import React, { useEffect, useState } from 'react';
import Footer from '../sources/component/Footer.component';
import PictureBase from '../sources/component/PictureBase';
import Hotels from '../Components/hotel/Hotels';

const hotels = () => {
    
    return (
        <div>
            <div className="mt-90 bodyVar">
                <PictureBase/>
                <Hotels/>
                <Footer />
            </div>
        </div >
    );
};

export default hotels;