import React from 'react';
import {useSwiper} from "swiper/react";

const SwiperButton = () => {
    const swiper=useSwiper()
    return (
        <div>
            <button onClick={()=>swiper.slideNext()} style={{width:'100px',height:'100px'}}>nex</button>
            <button onClick={()=>swiper.slidePrev()} style={{width:'100px',height:'100px'}}>prev</button>
        </div>
    );
};

export default SwiperButton;