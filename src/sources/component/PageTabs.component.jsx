import React from "react";
import styles from "../../../styles/Home.module.scss";

import { useRouter } from "next/router";
import Link from "next/link";

const PageTabls = (props) => {
  
  const myRouter = useRouter();
  return (
    <div className={`row justify-content-center mt-3`}>
      <div className={`col-md-10 ${styles["border-bottom"]} ${styles["width-mobile"]} px-0`}>
        <div className={'row justify-content-start me-0 w-100 position-relative'} style={{top:'2px'}}>
            <div className={`${styles["home-tab"]} ${styles["mobile-tab1"]}  col-6 col-md-2 col-xl-1 cursor-pointer ${props.type == 1 ? styles["home-tab-active"] : null}`}
              onClick={() => {
                props.setType(1)
                myRouter.push("/ticket");
              }}
            >
              <div className="pull-right">
                <i className="bilitja font-size-24 icon-plane-departure"></i>
              </div>
              <div className="pull-right">
                <span className="font-size-13"> پرواز </span>
              </div>
            </div>
            <Link href='/hotels'>
            <div className={`${styles["home-tab"]} ${styles["mobile-tab2"]} col-6 col-md-2 col-xl-1 cursor-pointer ${props.type == 3 ? styles["home-tab-active"] : null
                }`}
              onClick={() => {
                props.setType(3)
                // myRouter.push("/tours");
              }}
            >
              <div className="pull-right icon-container">
                <i className="bilitja font-size-20 icon-villa"></i>
              </div>
              <div className="pull-right">
                <span className="font-size-13 ">هتل</span>
              </div>
            </div></Link>
            <div className={`${styles["home-tab"]} ${styles["mobile-tab3"]} col-6 col-md-2 col-xl-1 cursor-pointer ${props.type == 4 ? styles["home-tab-active"] : null
                }`}
              onClick={() => {
                props.setType(4)
                myRouter.push("/villa");
              }}
            >
              <div className="pull-right icon-container">
                <i className="bilitja font-size-20 icon-villa"></i>
              </div>
              <div className="pull-right">
                <span className="font-size-13 ">اقامتگاه</span>
              </div>
            </div>
            <div className={`${styles["home-tab"]} ${styles["mobile-tab4"]} col-6 col-md-2 col-xl-1 cursor-pointer ${props.type == 2 ? styles["home-tab-active"] : null
                }`}
              onClick={() => {
                props.setType(2)
                myRouter.push("/tours");
              }}
            >
              <div className="pull-right icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24.002">
                            <g id="Tag" transform="translate(0 0.001)">
                              <path id="Path_1163" dataName="Path 1163" d="M2.157,17.294a4.467,4.467,0,0,1-1.146-3.6,15.516,15.516,0,0,1,1.3-4.989A32.381,32.381,0,0,1,4.688,4.162a18,18,0,0,1,1.579-2.23,1.566,1.566,0,0,1,.194-.073,6.862,6.862,0,0,1,.84-.194c.718-.128,1.661-.234,2.715-.323,2.1-.176,4.55-.272,6.332-.34a2.763,2.763,0,0,1,2.427,1.412c.864,1.568,2,3.722,2.88,5.618.443.951.814,1.817,1.058,2.505a7.123,7.123,0,0,1,.25.834,1.616,1.616,0,0,1,.037.239,7.066,7.066,0,0,1-.309.809c-.2.455-.471,1.033-.815,1.688a32.015,32.015,0,0,1-2.755,4.368A15.281,15.281,0,0,1,15.443,22.1a4.293,4.293,0,0,1-3.662.742A36.45,36.45,0,0,1,6.8,20.337c-1.034-.593-2.048-1.208-2.887-1.756A13.643,13.643,0,0,1,2.157,17.294Z" fill="none" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}></path>
                              <circle id="Ellipse_63" dataName="Ellipse 63" cx="2.029" cy="2.029" r="2.029" transform="translate(13.398 4.837) rotate(30)" fill="none" stroke="#888888" strokeWidth={1}></circle>
                              <rect id="Rectangle_188" dataName="Rectangle 188" width="10.1" height="1.02" rx="1.01" transform="translate(5.224 12.955) rotate(30)" fill="#888888"></rect>
                            </g>
                          </svg>
              </div>
              <div className="pull-right">
                <span className="font-size-13 "> تور </span>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PageTabls;
