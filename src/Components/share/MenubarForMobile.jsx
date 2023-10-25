import React, {useEffect, useState} from "react";
import styles from "../../../styles/Menubar.module.scss";
import {useRouter} from "next/router";
const MenubarForMobile = () => {
  const[navigationType,setNavigationType]=useState()

  const router=useRouter()

  useEffect(()=>{
    console.log('from me', router)

    setNavigationType(router.asPath)
  },[router])
  return (
    <>
      <div className={styles["menubarmob"]}>
        <div className={styles["menubarcontainer"]}>
          <div style={{}} className={styles["menubar"]}>
            <div
                className={styles["menubarItem"]}
                onClick={() => {
                  router.push("/ticket");
                }}
            >
              <svg
                  id="Layer_1"
                  version="1.1"
                  viewBox="0 0 100 100"
                  width="25px"
                  height="25px"
                  xmlns="http://www.w3.org/2000/svg"
                  fill={(navigationType?.includes('ticket')||navigationType?.includes('flight'))?'#e20000':'#000000'}
              >
                <path d="M3.71,49.28v11.33c0,0.627,0.294,1.218,0.795,1.596c0.501,0.378,1.15,0.499,1.753,0.327l34.746-9.902l0.641,25.917  l-11.824,8.861c-0.504,0.378-0.801,0.971-0.801,1.601V95c0,0.645,0.311,1.25,0.835,1.626c0.524,0.376,1.198,0.476,1.808,0.268  L50,90.653l18.346,6.24C68.557,96.965,68.774,97,68.99,97c0.412,0,0.82-0.127,1.165-0.374C70.68,96.25,70.99,95.645,70.99,95v-5.99  c0-0.63-0.297-1.223-0.801-1.601l-11.825-8.861l0.632-25.917l34.746,9.902c0.601,0.172,1.251,0.051,1.753-0.327  c0.501-0.378,0.795-0.969,0.795-1.596V49.28c0-0.801-0.478-1.525-1.215-1.839L59.502,32.253L59.97,12.97C59.97,7.472,55.497,3,50,3  c-5.492,0-9.96,4.472-9.959,10.018l0.467,19.235L4.925,47.44C4.188,47.755,3.71,48.479,3.71,49.28z M7.71,50.601l35.615-15.201  c0.753-0.321,1.234-1.069,1.214-1.888l-0.5-20.542C44.04,9.678,46.714,7,50,7c3.292,0,5.97,2.678,5.971,5.921l-0.5,20.59  c-0.021,0.818,0.461,1.566,1.214,1.888L92.29,50.601v7.36l-34.683-9.884c-0.592-0.169-1.234-0.054-1.733,0.313  c-0.498,0.367-0.799,0.943-0.813,1.562l-0.72,29.53c-0.017,0.647,0.282,1.261,0.8,1.649l11.85,8.88v2.198l-16.345-5.561  c-0.419-0.143-0.873-0.143-1.292,0L33.02,92.208V90.01l11.849-8.88c0.518-0.388,0.816-1.003,0.8-1.65l-0.73-29.53  c-0.016-0.619-0.316-1.195-0.814-1.562c-0.498-0.368-1.138-0.482-1.733-0.313L7.71,57.96V50.601z" />
              </svg>
              <p className={(navigationType?.includes('ticket')||navigationType?.includes('flight'))&& styles['active']}>هواپیما</p>
            </div>

            <div
              className={styles["menubarItem"]}
              onClick={() => {
                router.push("/hotels");
              }}
            >
              <svg
                width="25px"
                height="25px"
                id="hotel-hostel-building-resort"
                version="1.1"
                viewBox="0 0 15 15"

              >
                <path d="M5,0v5H0v10h5h1h9V0H5z M5,14H1V6h4V14z M14,14H6V5V1h8V14z"  fill={navigationType?.includes('hotel')?'#e20000':'#000000'}/>
                <rect height="1" width="1" x="8" y="3.5"  fill={navigationType?.includes('hotel')?'#e20000':'#000000'} />
                <rect height="1" width="1" x="11" y="3.5"  fill={navigationType?.includes('hotel')?'#e20000':'#000000'}/>
                <rect height="1" width="1" x="11" y="6.5"  fill={navigationType?.includes('hotel')?'#e20000':'#000000'}/>
                <rect height="1" width="1" x="8" y="6.5" fill={navigationType?.includes('hotel')?'#e20000':'#000000'} />
              </svg>
              <p className={navigationType?.includes('hotel')&& styles['active']}>هتل</p>
            </div>
            <div
                className={styles["menubarItem"]}
                onClick={() => {
                  router.push("/tour");
                }}
            >
              <svg
                  enable-background="new 0 0 32 32"
                  id="Stock_cut"
                  version="1.1"
                  viewBox="0 0 32 32"
                  width="25px"
                  height="25px"

              >
                <desc />
                <g>
                  <path
                      d="M27,12   c0-6.075-4.925-11-11-11S5,5.925,5,12c0,8,11,19,11,19S27,20,27,12z"
                      fill="none"
                      stroke={navigationType?.includes('tour')?'#e20000':'#000000'}
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="2"
                  />
                  <circle
                      cx="16"
                      cy="12"
                      fill="none"
                      r="4"
                      stroke={navigationType?.includes('tour')?'#e20000':'#000000'}
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="2"
                  />
                </g>
              </svg>
              <p className={navigationType?.includes('tour')&& styles['active']}>تور</p>
            </div>


          </div>
        </div>
      </div>
    </>
  );
};

export default MenubarForMobile;
