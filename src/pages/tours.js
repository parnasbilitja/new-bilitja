import React, { useEffect, useState } from 'react';
import NavHandler from '../Components/share/NavHandler';
import Footer from '../sources/component/Footer.component';

import List from '../sources/tour/List';


const tours = () => {
    return (
        <div className='mt-5 pt-5'>
            <NavHandler />
            <List />
            <Footer />
        </div>
    );
};

export default tours;