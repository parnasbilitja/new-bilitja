import React, { useEffect, useState } from 'react';
import styles from "../../../styles/Home.module.scss";
import {flightsData, homeText, flightsDataHotel} from '../../Utils/data';
import FlightsUrl from "./../component/FlightsUrl";
import dynamic from 'next/dynamic';
const OfferdTours = dynamic(()=> import ( '../tour/OfferdTours'));
import TicketDetails from '../component/TicketDetails';
const HomeDetails = ( props) => {
  const [ width, setWidth ] = useState(0)
  useEffect(() => {
    setWidth(window.innerWidth)
  },[]) 
    return (
        <div>

          <div className="justify-content-center">
            <div className="col-md-12 px-0">
                
          <div className={'row justify-content-center'}>
            <div className='col-md-10'>
              {props.type == 'index' &&
            <OfferdTours/>
            }
            <div className="row padding-xs-5-15 justify-content-center">
                <div className="col-lg-4 col-md-5 col-sm-12 padding-5px">
                  <div className={styles["home-value-propsal"]}>
                      <svg fill='#e20000' width='100' height='100' version="1.1" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" ><style type="text/css">

                      </style><g id="Layer_Grid"/><g id="Layer_2"><path d="M10.3,10.3L9.6,11H7c-0.6,0-1,0.4-1,1s0.4,1,1,1h0.6l-1,1H6c-0.6,0-1,0.4-1,1s0.4,1,1,1c0,0.6,0.4,1,1,1s1-0.4,1-1v-0.6   l1-1V15c0,0.6,0.4,1,1,1s1-0.4,1-1v-2.6l0.7-0.7c0.4-0.4,0.4-1,0-1.4S10.7,9.9,10.3,10.3z"/><path d="M20.5,5.2c-0.5-1.6-2.1-2.5-3.7-2.1L5.4,6.3C4.8,6.4,4.4,6.8,4,7.2C2.8,7.6,2,8.7,2,10v7c0,1.7,1.3,3,3,3h14   c1.7,0,3-1.3,3-3v-7c0-0.7-0.2-1.3-0.6-1.8L20.5,5.2z M17.4,5c0.5-0.1,1.1,0.2,1.2,0.7L19,7h-8.6L17.4,5z M20,17c0,0.6-0.4,1-1,1H5   c-0.6,0-1-0.4-1-1v-7c0-0.5,0.3-0.9,0.8-1C4.8,9,4.9,9,5,9h14c0.3,0,0.5,0.1,0.7,0.3C19.9,9.5,20,9.8,20,10V17z"/><path d="M15,13h1c0.6,0,1-0.4,1-1s-0.4-1-1-1h-1c-0.6,0-1,0.4-1,1S14.4,13,15,13z"/><path d="M18,14h-3c-0.6,0-1,0.4-1,1s0.4,1,1,1h3c0.6,0,1-0.4,1-1S18.6,14,18,14z"/></g></svg>
                    <h2 className="font-bold-iransanse font-size-22 font-bold ">
                      <span>خرید بلیط هواپیما &nbsp;</span>
                      <span className="color-primary font-bold-iransanse">
                        با چند کلیک
                      </span>
                    </h2>
                    <p className="color-textpill font-size-15">
                      کافیست در صفحه خرید بلیط هواپیما مبدا، مقصد و روز را وارد
                      کرده و ارزانترین بلیط هواپیما را از میان پروازهای چارتری،
                      سیستمی و لحظه آخری انتخاب کنید.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-5 col-sm-12 padding-5px">
                  <div className={styles["home-value-propsal"]}>
                    <div className='py-3'>

                    <svg  fill='#e20000' width='70' height='70' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M480 448v-384c17.67 0 32-14.33 32-32c0-17.67-14.33-32-32-32H32c-17.67 0-32 14.33-32 32c0 17.67 14.33 32 32 32v384c-17.67 0-32 14.33-32 32c0 17.67 14.33 32 32 32h176v-96h96v96H480c17.67 0 32-14.33 32-32C512 462.3 497.7 448 480 448zM224 108.8c0-6.375 6.375-12.75 12.75-12.75h38.5C281.6 96.01 288 102.4 288 108.8v38.5c0 6.375-6.375 12.75-12.75 12.75h-38.5C230.4 160 224 153.6 224 147.3V108.8zM224 204.8c0-6.375 6.375-12.75 12.75-12.75h38.5C281.6 192 288 198.4 288 204.8v38.5c0 6.375-6.375 12.75-12.75 12.75h-38.5C230.4 256 224 249.6 224 243.3V204.8zM96 108.8c0-6.375 6.375-12.75 12.75-12.75h38.5C153.6 96.02 160 102.4 160 108.8V147.3c0 6.375-6.375 12.75-12.75 12.75h-38.5C102.4 160 96 153.6 96 147.3V108.8zM147.3 256h-38.5C102.4 256 96 249.6 96 243.3V204.8c0-6.375 6.375-12.75 12.75-12.75h38.5C153.6 192 160 198.4 160 204.8V243.3C160 249.6 153.6 256 147.3 256zM160 384c0-53 43-96 96-96s96 43 96 96H160zM416 243.3c0 6.375-6.375 12.75-12.75 12.75h-38.5C358.4 256 352 249.6 352 243.3V204.8c0-6.375 6.375-12.75 12.75-12.75h38.5C409.6 192 416 198.4 416 204.8V243.3zM416 147.3c0 6.375-6.375 12.75-12.75 12.75h-38.5C358.4 160 352 153.6 352 147.3V108.8c0-6.375 6.375-12.75 12.75-12.75h38.5C409.6 96.02 416 102.4 416 108.8V147.3z"/></svg>
                    </div>
                    <h2 className="font-bold-iransanse font-size-22 font-bold">
                      <span className="color-primary font-bold-iransanse">
                        رزرو آنلاین &nbsp;
                      </span>
                      <span>هتل</span>
                    </h2>
                    <p className="color-textpill font-size-15">
                      با عضویت در سامانه بلبطجا شما هم میتوانید هتل
                      خود را در معرض بازدید و رزرو گردشگران و سایر آژانس های
                      گردشگردی قرار دهید.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-5 col-sm-12 padding-5px">
                  <div className={styles["home-value-propsal"]}>
                      <div className='py-2'>

                   <svg fill='#e20000' width='90' height='90' id="Layer_1" version="1.1" viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg" ><path d="M256,54.872c-83.352,0-151.162,67.811-151.162,151.162c0,134.032,136.018,239.518,141.809,243.945l9.354,7.148l9.348-7.148  c5.791-4.428,141.814-109.913,141.814-243.945C407.162,122.682,339.353,54.872,256,54.872z M255.989,417.763  c-29.792-25.637-120.352-111.815-120.352-211.729c0-66.37,53.987-120.363,120.363-120.363c66.364,0,120.363,53.994,120.363,120.363  C376.364,305.734,285.768,392.086,255.989,417.763z"/><path d="M253.665,142.966c-32.376,0-58.635,26.247-58.635,58.635c0,32.376,26.259,58.629,58.635,58.629  c32.382,0,58.634-26.253,58.634-58.629C312.299,169.213,286.047,142.966,253.665,142.966z"/></svg>
                      </div>
                    <h2 className="font-bold-iransanse font-size-22 font-bold">
                      <span className="color-primary font-bold-iransanse">
                        رزرو آنلاین &nbsp;
                      </span>
                      <span>تور داخلی و خارجی</span>
                    </h2>
                    <p className="color-textpill font-size-15">
                      با عضویت در سامانه بلبطجا شما هم میتوانید ویلا یا اقامتگاه
                      خود را در معرض بازدید و رزرو گردشگران و سایر آژانس های
                      گردشگردی قرار دهید.
                    </p>
                  </div>
                </div>  
            </div>
            </div></div>
            </div>
        </div>
        <div className="d-flex justify-content-center rounded">
            <div className="col-11 col-md-10">
              <img src='../../Images/banerBestPriceOfFlight.jpg' alt='بهترین قیمت' className="rounded" width='100%' height='auto'/>
              </div>
        </div>
        {/* <div className={styles["home-become-host"]}>
          <div>
            <h2>ویلا و اقامتگاه خود را در بلیطجا ثبت کنید و میزبان شوید</h2>
            <p>
              عکس بگیرید و اطلاعات خود را در بلیطجا به رایگان به نمایش بگذارید و
              میزبان مسافران بلیطجا باشید
            </p>
            <a href="#" className={styles["btn-secondary-outlined"]}>
              میزبان شوید
            </a>
          </div>
        </div> */}
        <div className="row d-flex justify-content-center">
          <div className={`col-11 col-md-10 ${styles["home-tour-intro"]} mx-4`}>
            <div className="row">
              <div className={'col-8 col-md-10'}>
                <p>دیدن تور های ویژه</p>
                <div className="align-center font-size-10">
                  <p>
                    تور های ویژه گردشگری ، بازدید از موزه ها و مکان های دیدنی کشور
                    ها
                  </p>
                  
                </div>
              </div>
              <div className={`col-4 col-md-2 justify-content-end ${styles["tour-intro-button"]}`} >
              <a
                  href="/tours"
                  className="pull-left font-size-13 btn-fiiled mx-2  py-3 col-lg-2 mb-4 text-center"
                >
                  جستجوی مقاصد
                </a>
            </div>
              </div>
            </div>
        </div>
        <FlightsUrl flightsData={flightsData} flightsDataHotel={flightsDataHotel} />
        {props.type !== 'index' &&
          <TicketDetails /> 
        }
        </div>
    );
};

export default HomeDetails;
