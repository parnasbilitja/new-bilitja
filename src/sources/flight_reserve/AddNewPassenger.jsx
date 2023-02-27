import React from 'react';
import styles from "../../../styles/FlightReserve.module.scss";

import {
    faMale,
    faFemale,
    faChild,
    faBaby,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AddNewPassenger = (props) => {
    return (
        <div className="row">
            <div className="col-lg-2 col-md- col-4 no-padding">
                <a
                    href="#"
                    className={` ${styles["btn-outlined-private"]}  btn-outlined  font-bold-iransanse`}
                    onClick={(e) => {
                        if (props.validationNumberOfPassengers('ADL')) {
                            props.addNewPassenger("ADL", props.state.priceADL);
                        }
                        e.preventDefault();
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="me-2">بزرگسال</span>
                    <FontAwesomeIcon className="pull-left" icon={faMale} />
                    <FontAwesomeIcon
                        className="pull-left ml-0"
                        icon={faFemale}
                    />
                </a>
            </div>
            <div className="col-lg-2 col-md- col-4 no-padding">
                <div
                    className={` ${styles["btn-outlined-private"]}  btn-outlined  font-bold-iransanse`}
                    onClick={(e) => {
                        if (props.validationNumberOfPassengers('CHD')) {
                            props.addNewPassenger("CHD", props.state.priceCHD);
                        }
                        e.preventDefault();
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="me-2">کودک</span>
                    <FontAwesomeIcon className="pull-left" icon={faChild} />
                </div>
            </div>
            <div className="col-lg-2 col-md- col-4 no-padding">
                <a
                    href="#"
                    className={` ${styles["btn-outlined-private"]}  btn-outlined  font-bold-iransanse`}
                    onClick={(e) => {
                        if (props.validationNumberOfPassengers('INF')) {
                            props.addNewPassenger("INF", props.state.priceINF);
                        }
                        e.preventDefault();
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="me-2">نوزاد</span>
                    <FontAwesomeIcon className="pull-left" icon={faBaby} />
                </a>
            </div>
        </div>
    );
};

export default AddNewPassenger;