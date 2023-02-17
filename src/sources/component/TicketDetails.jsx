import React, { useEffect, useState } from 'react';
import styles from "../../../styles/Home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { homeText } from "../../Utils/data";
const TicketDetails = () => {
    const [width, setWidth] = useState();
    useEffect(() => {
        setWidth(window.innerWidth)
    },[])
    return (
        <div className="row justify-content-center padding-xs-5-25">
          <div
            className={`col-lg-10 col-md-10 col-sm-10 col-12 ${styles["home-flight-content"]}`}
          >
          <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <div className="d-flex mt-2 flex-column col-xl-5 col-lg-5 col-sm-9 col-12">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={faPlane} className='text-danger ms-2' />
                                    <div className="text">
                                    {' '}
                                        <h5 className="font-bold mb-0">خرید بلیط هواپیما</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
            </div>
            <div className="bottom d-flex align-items-center mt-3 mb-3">
                <div className="border-right"></div>
                <div className="border-left"></div>
            </div>
              {homeText}
          </div>
          </div>
    );
};

export default TicketDetails;