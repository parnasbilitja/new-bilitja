import React, { useEffect, useState } from 'react';
import NavBar from "./../sources/component/NavBar.component";
import Footer from '../sources/component/Footer.component';
import PageTabls from '../sources/component/PageTabs.component';
import PictureBase from '../sources/component/PictureBase';
import Hotels from '../Components/hotel/Hotels';

const hotels = () => {
    const [type, setType] = useState(3)
    return (
        <div>
            <div className="mt-100 bodyVar">
            <PictureBase/>
                <NavBar />
                <PageTabls type={type} setType={setType} />
                <Hotels/>
                <Footer />
            </div>

        </div >
    );
};

export default hotels;