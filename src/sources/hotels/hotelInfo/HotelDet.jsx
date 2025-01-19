"use client";
// import { startBuilder } from "@/Utils/newTour";
// import styles from "../../../styles/Tours/common/HotelInfo.module.scss";
// import Image from "next/image";
import Modal from "react-modal";
import {useEffect, useState} from "react";
// import MapComponent from "@/components/common/Map";
// import Gallery from "@/components/common/Gallery";
// import { FileDTO } from "@/models/Common";
// import MapComponent from "../../component/Map.component";
import {startBuilder} from "../../../Utils/newTour";
import styles from '../../../../styles/hotel/hotelInfo.module.scss'
import Gallery from "../../common/Gallery";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("../../component/Map.component"), {
  ssr: false
})
// const MapComponent=dynamic()
// import Modal from "@mui/material/Modal";
const HotelInfo = ({ hotel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenImg, setIsOpenImg] = useState(false);


  return (
    <>
      <div className={styles['hotelInfo_container']}>
        <div
            className={styles['hotelInfo']}
        >
          <div
              className={styles['gallery-container']}

              onClick={() => setIsOpenImg(true)}
          >
    
                   <div
                       key={hotel.thumbnail.url }
                       className={styles["img_container"]}
                       onClick={() => setIsOpenImg(true)}
                   >
                     <img src={hotel.thumbnail.url} alt={""} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                   </div>
       
          </div>
          <div
              className={styles["main_img_container"]}
          >
            {/*<img*/}
            {/*  src={hotel?.thumbnail?.url}*/}
            {/*  alt={""}*/}
            {/*  style={{width: '100%', height: '100%',objectFit: 'cover'}}*/}
            {/*/>*/}
            <div className={styles['info']}>
            <div className={styles['map_gallary_container']}>
              <div className={styles['gallaries']}>
              {
                hotel.gallery.map((hotel,index)=>{
                  if (index!==0 &&index <= 4 ) {
                  return(
                    <div
                       key={hotel.url }
                       className={styles["gallary_img_container"]}
                       onClick={() => setIsOpenImg(true)}
                   >
                     <img src={hotel.url} alt={""} />
                   </div>
                  )
                  }else{
                    return(
                      null
                    )
                  }
                })
              }
              </div>
              <div style={{height: '170px'}}>
                <MapComponent coordinates={hotel?.coordinates} locName={hotel?.title}/>
              </div>
            </div>
              <div style={{gap: '5px'}} className={'mt-2'}>
                <div className="d-flex align-items-center gap-x-4 mb-1 mt-1">
                  {startBuilder(parseInt(hotel?.stars))}
                  <p className="text-md font-size-14 font-bold mx-1">{hotel?.titleEn}</p>
                </div>
                <div>
                  <div className="d-flex gap-x-3 align-items-center">
                    <div>

                      <p className="text-sm text-gray-500 font-size-13">{hotel?.title}</p>
                    </div>
                    {/*<div className={styles["board_type"]}>*/}
                    {/* <p className="text-sm text-secondary-color">{hotel?.board_type}</p> */}
                    {/*</div>*/}
                  </div>
                  <div className={styles['address']}>
                    <p className="font-size-12">{hotel?.location}</p>
                    <p className={'isDesktop'}>-</p>
                    <p className="font-size-11 text-nowrap text-gray-500">{hotel?.address}</p>
                    {/*<p*/}
                    {/*    className="text-sm  cursor-pointer"*/}
                    {/*    style={{color: '#e20000', fontSize: "13px"}}*/}
                    {/*    onClick={() => setIsOpen(true)}*/}
                    {/*>*/}
                    {/*  (نمایش بر روی نقشه)*/}
                    {/*</p>*/}
                  </div>
                </div>
              </div>
            </div>

          </div>


        </div>
      </div>

      {hotel?.coordinates &&
          <Modal
              isOpen={isOpen}
              onRequestClose={() => setIsOpen(false)}
              className={"Modal"}
              overlayClassName={"Overlay"}
              contentLabel="Example Modal"
          >
            <div style={{height: '500px'}}>
              <MapComponent coordinates={hotel?.coordinates} locName={hotel?.title}/>
            </div>


            {/*<button onClick={() => setIsOpen(false)}>close</button>*/}
          </Modal>
      }
      {
        <Modal
            isOpen={isOpenImg}
            onRequestClose={() => setIsOpenImg(false)}
            className={"Modal"}
            overlayClassName={"Overlay"}
          contentLabel="Example Modal"
        >

            <Gallery images={hotel?.gallery} />
          {/* <button onClick={() => setIsOpen(false)}>close</button> */}
        </Modal>
      }
    </>
  );
};

export default HotelInfo;
