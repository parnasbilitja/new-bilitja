import React, { useEffect, useState } from "react";

import styles from "../../../styles/PopupFlightReserve.module.scss";

import {
  faMale,
  faFemale,
  faBaby,
  faChild,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import globals from "../Global";

import PrimarySelectInput from "../component/PrimarySelectInput.component";
import PrimaryButton from "../component/PrimaryButton.component";

import { connect } from "react-redux";
import { addReservationProperties } from "../../Redux/Reserve/reserve.action";
import { messageBoxModify } from "../../Redux/UI/ui.action";
import { withRouter } from "next/router";
import { getweekday } from "../../Utils/SimpleTasks";
import Loader from "../../Utils/Loader";
import Image from "next/image";
const PopupFlightReserve = (props) => {

  const [state, setState] = useState({
    numADL: 1,
    numCHD: 0,
    numINF: 0,
    loading: false,
  });

  useEffect(() => {
    setState({ 
      numADL: 1,
      numCHD: 0,
      numINF: 0,
      loading: false, })
    },[props])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: parseInt(value),
    });
  };

  const submitReserve = () => {
    const {
      flightId,
      classId,
      kndSys,
      iataCodSource,
      iataCodDestinate,
      airlineIataCode,
      className,
      flightDate,
      flightTime,
      flightNo,
      cap,
      pathKind,
      serviceType,
      priceView,
      faranegarId,
    } = props;

    console.log(props);
    const reserveObject = {
      numADL: state.numADL,
      numCHD: state.numCHD,
      numINF: state.numINF,
      flightId: flightId,
      classId: classId,
      kndSys: kndSys,
      iataCodSource: iataCodSource,
      iataCodDestinate: iataCodDestinate,
      airlineCode: airlineIataCode,
      className: className,
      flightDate: flightDate,
      flightTime: flightTime,
      flightNo: flightNo,
      cap: cap,
      pathKind: pathKind,
      serviceType: serviceType,
      priceView: priceView,
      customerId: "1a157116-a01a-4027-ab10-74098ac63815",
      mobileNo: localStorage.getItem("mobile"),
      userId: localStorage.getItem("token"),
      faranegarId: faranegarId
    };

    fetch(`${globals.baseUrlNew}BilitFlightReserve/flightsReserve/reserve`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reserveObject),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message == "OK") {
          props
            .addReservationProperties({
              reqNo: data.reqNo,
              reqPnr: data.reqPnr,
              priceMessage: data.priceMessage,
            })
            .then(() => {
              console.log(props.router);
              props.router.push(
                `${props.router.asPath}/info/${data.reqNo}/${data.reqPnr}`
              );
            });
        } else {
          setState({ ...state, loading: false })
          props.messageBoxModify({
            color: false,
            state: true,
            message: `${data.message}`,
          });
        }
      });
  };
  const validation = (numADL, numCHD, numINF, cap) => {
    if (numADL <= 0) {
      return "باید حداقل یک بزرگسال در بین مسافرین باشد";
    }
    if (numADL + numCHD > cap) {
      return "تعداد افراد بیش از ظرفیت پرواز است";
    }
    if (numADL < numINF) {
      return "تعداد نوزاد نمیتواند بیشتر از تعداد بزرگسال باشد";
    }
    return "OK";
  };
  const numberOfPassengers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const numberOfPassengers_ = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const {
    source,
    destinate,
    flightDay,
    flightDate,
    flightDateTime,
    cap,
    airlineIataCode,
    airline,
  } = props;
  return (
    <div className={styles["pop-up-flight-reserve-box"]}>
      <p className="font-light-iransanse">
        خرید بلیط هواپیما &nbsp;
        <span className="color-secondary font-bold-iransanse">{source}</span>
        &nbsp;به &nbsp;
        <span className="color-secondary font-bold-iransanse">
          {destinate}
        </span>
      </p>
      <p className="font-size-15 font-bold-iransanse">
        {getweekday(flightDay)} &nbsp;{flightDate}
      </p>

      <div className={styles["pop-up-flight-detail-reserve-box"]}>
        <div>
          <div>
            <i className="bilitja icon-clock"></i>
          </div>
          <span className="font-size-12 xs-font-size-13">
            {String(flightDateTime).split("T")[1].slice(0, 5)}
          </span>
        </div>

        <div>
          <div>
            <i className="bilitja icon-seat"></i>
          </div>
          <span className="font-size-12 xs-font-size-13">
            {cap + " صندلی خالی"}
          </span>
        </div>

        <div>
          <div>
            <Image
              width={35}
              height={35}
              src={globals.website + `Airlines/${airlineIataCode}.png?ver=1`}
              alt="بلیطجا - لوگو ایرلاین"
            />
          </div>
          <span className="font-size-15 xs-font-size-14">{airline}</span>
        </div>
      </div>

      <div className={styles["pop-up-flight-passengers-reserve-box"]}>
        <div className="row">
          <div
            style={{ margin: "auto" }}
            className="col-lg-5 col-md-5 col-sm-5 col-6 m-auto"
          >
            <FontAwesomeIcon icon={faMale} />
            <FontAwesomeIcon icon={faFemale} />
            <span className="font-size-14 font-bold-iransanse">
              تعداد بزرگسال
            </span>
            <p className="font-size-11">(12 سال به بالا)</p>
          </div>
          <div className="col-lg-7 col-md-7 col-sm-7 col-6">
            <PrimarySelectInput
              name="numADL"
              style={{ height: "2.5em" }}
              onChange={handleChange}
            >
              {numberOfPassengers_.map((x) =>
                state.numADL == x ? (
                  <option selected>{x}</option>
                ) : (
                  <option>{x}</option>
                )
              )}
            </PrimarySelectInput>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5 col-md-5 col-sm-5 col-6">
            <FontAwesomeIcon icon={faChild} />
            <span className="font-size-14 font-bold-iransanse">
              تعداد کودک
            </span>
            <p className="font-size-11">(2 تا 12 سال)</p>
          </div>
          <div className="col-lg-7 col-md-7 col-sm-7 col-6">
            <PrimarySelectInput
              name="numCHD"
              style={{ height: "2.5em" }}
              onChange={handleChange}
            >
              {numberOfPassengers.map((x) =>
                state.numCHD == x ? (
                  <option selected>{x}</option>
                ) : (
                  <option>{x}</option>
                )
              )}
            </PrimarySelectInput>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5 col-md-5 col-sm-5 col-6">
            <FontAwesomeIcon icon={faBaby} />
            <span className="font-size-14 font-bold-iransanse">
              تعداد نوزاد
            </span>
            <p className="font-size-11">(زیر 2 سال)</p>
          </div>
          <div className="col-lg-7 col-md-7 col-sm-7 col-6">
            <PrimarySelectInput
              name="numINF"
              style={{ height: "2.5em" }}
              onChange={handleChange}
            >
              {numberOfPassengers.map((x) =>
                state.numINF == x ? (
                  <option selected>{x}</option>
                ) : (
                  <option>{x}</option>
                )
              )}
            </PrimarySelectInput>
          </div>
        </div>

        <div
          className={` form-input-border  ${styles["form-input-border-private"]} without-focus`}
        >
          <PrimaryButton
            defaultValue={
              state.loading == false ? "مرحله بعد" : "درحال پردازش .."
            }
            onClick={() => {
              const message = validation(
                state.numADL,
                state.numCHD,
                state.numINF,
                props.cap
              );
              if (message == "OK") {
                setState({ ...state, loading: true });
                submitReserve();
              } else {
                setState({ ...state, loading: false });
                props.messageBoxModify({
                  color: false,
                  state: true,
                  message: message,
                });
              }
            }}
          >{
            state.loading == false ? "مرحله بعد" : "درحال پردازش .."
          }</PrimaryButton>
        </div>
      </div>
    </div>
  );
}
const mapDispatchesToProps = (dispatch) => ({
  addReservationProperties: async (value) =>
    dispatch(addReservationProperties(value)),
  messageBoxModify: (value) => dispatch(messageBoxModify(value)),
});
export default withRouter(
  connect(null, mapDispatchesToProps)(PopupFlightReserve)
);
