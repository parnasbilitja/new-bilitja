'use client'

import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef} from "react";
// import styles from '@/styles/common/Gallery.module.scss'
// import { FileDTO } from "@/models/Common";
const Gallery = ({ images }) => {
	const swiperRef = useRef();
	useEffect(() => {

	}, []);
	return (
		<div  style={{width:'100%',height:'100%',position:'relative'}}>
			<div	 style={{display:'flex'	, justifyContent:"space-between" ,width:'100%',position:'absolute' ,top:'50%',zIndex:'50'}}>
				<button className="prevNextbtnSwiper" onClick={() => swiperRef.current?.slidePrev()}>
					<FontAwesomeIcon icon={faAngleRight} style={{fontSize:'16px'}}/>
				</button>
				<button className="prevNextbtnSwiper" onClick={() => swiperRef.current?.slideNext()}>
					<FontAwesomeIcon icon={faAngleLeft} style={{fontSize:'16px'}}/>
				</button>
			</div>

			<Swiper
				style={{width: '100%', height: '100%'}}
				spaceBetween={50}
				slidesPerView={1}
				// modules={[Navigation,Pagination]}

				// pagination={{clickable: false}}
				onBeforeInit={(swiper) => {
					swiperRef.current = swiper;
				}}
			>

				{images?.map((image, index) => (
					<SwiperSlide key={index} style={{width: '100%', height: '100%'}}>
						<img src={image.url} alt={image.alt}  style={{width: '100%', height: '100%',objectFit:'fill'}}
							  />
					</SwiperSlide>
				))}
			</Swiper>
		</div>

	);
};

export default Gallery;
