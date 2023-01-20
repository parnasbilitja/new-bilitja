import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Navigation } from "swiper";
import "swiper/css/navigation";


const Slider = ({ data }) => {
    return (
        <Swiper className="tourImages"
            navigation={true}
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
        >
            {data && data.map((item, index) => (
                <SwiperSlide key={index}>
                    <img src={item} width={'100%'} height={'310px'} style={{ borderRadius: 15, objectFit: 'cover' }} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Slider;