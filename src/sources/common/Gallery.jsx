'use client'

import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {useRef} from "react";
// import styles from '@/styles/common/Gallery.module.scss'
// import { FileDTO } from "@/models/Common";
const Gallery = ({ images }) => {
	const swiperRef = useRef();

	return (
		<div  style={{width:'100%',height:'100%',position:'relative'}}>
			<div	 style={{display:'flex'	, justifyContent:"space-between" ,width:'100%',position:'absolute' ,top:'50%',zIndex:'50'}}>
				<button className="prevNextbtnSwiper" onClick={() => swiperRef.current?.slidePrev()}>
					<FontAwesomeIcon icon={faAngleRight}/>
				</button>
				<button className="prevNextbtnSwiper" onClick={() => swiperRef.current?.slideNext()}>
					<FontAwesomeIcon icon={faAngleLeft}/>
				</button>
			</div>

			<Swiper
				style={{width: '100%', height: '100%'}}
				spaceBetween={50}
				slidesPerView={1}
				// modules={[Navigation,Pagination]}

				pagination={{clickable: false}}
				onBeforeInit={(swiper) => {
					swiperRef.current = swiper;
				}}
			>

				{images.map((image, index) => (
					<SwiperSlide key={index} style={{width: '100%', height: '100%'}}>
						<Image src={image.url} alt={image.alt} width={600} height={600} style={{width: '100%', height: '100%',objectFit:'cover'}}
							  />
					</SwiperSlide>
				))}
			</Swiper>
		</div>

	);
};

export default Gallery;
