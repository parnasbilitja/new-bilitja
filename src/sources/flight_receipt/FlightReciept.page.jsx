import React, { useEffect, useState } from "react";
import styles from "../../../styles/FlightReciept.module.scss";
import stylesflight from "../../../styles/FlightSearchBox.module.scss";
import FlightReserveDesktopHeader from "../flight_reserve/FlightReserveDesktopHeader.component";
import FlightReserveMobileHeder from "../flight_reserve/FlightReserveMobileHeader.component";
import {
  faUser,
  faEdit,
  faInfo,
  faInfoCircle,
  faDollarSign,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { moneyFormat } from "../../Utils/SimpleTasks";
import globals from "../Global";
import { connect } from "react-redux";
import { selectProperties } from "../../Redux/Reserve/reserve.reselect";
import { messageBoxModify } from "../../Redux/UI/ui.action";
import PopUpWide from "../component/PopUpWide.component";
import FlightPassengerEditForm from "./FlightPassengerEditForm.component";
import { addReservationProperties } from "../../Redux/Reserve/reserve.action";
import router, { withRouter } from "next/router";
import Scrolltoprefresh from "../component/Scrolltoprefresh";

const FlightReciept = (props) => {
  console.log(props);
  const [state, setState] = useState({
    birthDayAll_: [],
    familyAll_: [],
    meliCodeAll_: [],
    pasNoAll_: [],
    meliatAll_: [],
    pasEndDateAll_: [],
    nameAll_: [],
    sexAll_: [],
    ticketCodeAll_: [],
    open: false,
    isUpdated: false,
    current: {
      name: "",
      family: "",
      meliat: "",
      pasEndDateAll: '',
      meliCode: "",
      sex: "",
      birthday: "",
      index: 0,
    },
  });

  useEffect(() => {
    props.addReservationProperties({
      reqNo: props.router.asPath.split("/")[3],
      reqPnr: props.router.asPath.split("/")[4],
      priceMessage: "",
    });
    fetch(
      `${globals.baseUrlNew
      }BilitFlightReserve/flightsReserve/ravisReserveProperty/${props.router.asPath.split("/")[3]
      }-${props.router.asPath.split("/")[4]
      }/1a157116-a01a-4027-ab10-74098ac63815`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "0") {
          const birthDayAll = String(
            data.flightReservePropertyModel.birthDayAll
          ).split(",");
          const familyAll = String(
            data.flightReservePropertyModel.familyAll
          ).split(",");
          const meliCodeAll = String(
            data.flightReservePropertyModel.meliCodeAll
          ).split(",");
          const pasEndDateAll = String(
            data.flightReservePropertyModel.pasEndDateAll
          ).split(",");
          const meliatAll = String(
            data.flightReservePropertyModel.meliatAll
          ).split(",");
          const nameAll = String(data.flightReservePropertyModel.nameAll).split(
            ","
          );
          const sexAll = String(data.flightReservePropertyModel.sexAll).split(
            ","
          );
          const ticketCodeAll = String(
            data.flightReservePropertyModel.ticketCodeAll
          ).split(",");
          const pasNoAll = String(
            data.flightReservePropertyModel.pasNoAll
          ).split(",");

          const pathKind = data.flightReservePropertyModel.pathKind;
          const feeGet = data.flightReservePropertyModel.feeGet;
          setState(
            {
              ...state,
              ...data.flightReservePropertyModel,
              birthDayAll_: birthDayAll,
              familyAll_: familyAll,
              meliCodeAll_: meliCodeAll,
              pasEndDateAll_: pasEndDateAll,
              pasNoAll_: pasNoAll,
              meliatAll_: meliatAll,
              nameAll_: nameAll,
              sexAll_: sexAll,
              pathKind: pathKind,
              ticketCodeAll_: ticketCodeAll,
              feeGet: feeGet,
            },
            console.log(state),
            getAllPrice()
          );
        }
      });

    // }
  }, [])

  const compeleteReservation = () => {
    const reservePassengerObject = {
      reqNo: props.reserveProperties.reqNo,
      reqPnr: props.reserveProperties.reqPnr,
      nameFamily: state.nameAll_[0] + " " + state.familyAll_[0],
      nameFamilyEn: state.nameAll_[0] + " " + state.familyAll_[0],
      nameEnAll: state.nameAll_.join(","),
      familyEnAll: state.familyAll_.join(","),
      nameAll: state.nameAll_.join(","),
      familyAll: state.familyAll_.join(","),
      meliCodeAll: state.meliCodeAll_.join(","),
      ticketCodeAll: state.ticketCodeAll_.join(","),
      sexAll: state.sexAll_.join(","),
      birthDayAll: state.birthDayAll_.join(","),
      meliatAll: state.meliatAll_.join(","),
      telNo: "66955766",
      mobileNo: state.mobileNo,
      numADL: state.numADL,
      numCHD: state.numCHD,
      numINF: state.numINF,
      customerId: "1a157116-a01a-4027-ab10-74098ac63815",
    };
    fetch(
      `${globals.baseUrlNew}BilitFlightReserve/flightsReserve/ravisReserveSave`,
      {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservePassengerObject),
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message == "0") {
          alert("success");
          // } else {
          //   props.messageBoxModify({
          //     color:false,
          //     state: true,
          //     message: "لطفا اطلاعات را کامل وارد کنید",
          //   });
        }
      });

  };
  const getBanks = () => {
    fetch(
      `${globals.baseUrlNew}OnlinePay/api/onlinePay/pricing/getBanks/${props.reserveProperties.reqNo}/${props.reserveProperties.reqPnr}?customerId=1a157116-a01a-4027-ab10-74098ac63815`
    )
      .then((res) => res.json())
      .then((data) => {
        fetch(
          `${globals.baseUrlNew}OnlinePay/api/onlinePay/pricing/saveEbank`,
          {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
              reqNo: props.reserveProperties.reqNo,
              reqPnr: props.reserveProperties.reqPnr,
              bankId: data.bankId,
              kndRequest: 1,
              customerId: "1a157116-a01a-4027-ab10-74098ac63815",
              callBackUrl: "https://bilitja.com/callbackbank",
              userId: localStorage.getItem("token"),
            }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            var form = document.createElement("form");
            form.setAttribute("method", "POST");
            form.setAttribute("action", data.address);
            form.setAttribute("target", "_self");
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("name", "token");
            hiddenField.setAttribute("value", data.authority);
            form.appendChild(hiddenField);
            var hiddenField2 = document.createElement("input");
            hiddenField2.setAttribute("name", "RedirectURL");
            hiddenField2.setAttribute(
              "value",
              `${window.location.origin}/callbackbank`
            );
            form.appendChild(hiddenField2);
            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
          });
      });
  };
  const getTicketType = (type) => {
    switch (type) {
      case "ADL":
        return "بزرگسال";
      case "CHD":
        return "کودک";
      case "INF":
        return "نوزاد";
    }
  };
  const getTicketPrice = (type) => {
    switch (type) {
      case "ADL":
        return state.priceADL;
      case "CHD":
        return state.priceCHD;
      case "INF":
        return state.priceINF;
    }
  };
  const getAllPrice = () => {
    let sum = 0;
    state.ticketCodeAll_.map((oneTicket) => {
      sum += getTicketPrice(oneTicket);
      // console.log(oneTicket);
    });
    setState({
      ...state,
      priceAll: sum,
    });
  };
  const updatePassengerData = (index, value) => {
    let names = state.nameAll_;
    let families = state.familyAll_;
    let sexes = state.sexAll_;
    let meliats = state.meliatAll_;
    let meliCodes = state.meliCodeAll_;
    let birthdays = state.birthDayAll_;
    let pasEndDateAll = state.pasEndDateAll_;

    names[index] = value.name;
    families[index] = value.family;
    sexes[index] = value.sex;
    meliats[index] = value.meliat;
    meliCodes[index] = value.meliCode;
    birthdays[index] = value.birthday;
    pasEndDateAll[index] = value.pasEndDateAll;

    setState({
      ...state,
      nameAll_: names,
      nameAll: names,
      nameEnAll: [...names.map((item) => (item.toUpperCase()))],
      familyAll_: families,
      familyAll: families,
      familyEnAll: [...families.map((item) => (item.toUpperCase()))],
      sexAll_: sexes,
      meliatAll_: meliats,
      meliCodeAll_: meliCodes,
      birthDayAll_: birthdays,
      pasEndDateAll_: pasEndDateAll,
      isUpdated: true,
    });
    console.log(state);
  };
  const [open, setOpen] = useState(false);
  const managePopUpEditForm = () => {
    console.log('state');
    setOpen({
      open: !open,
    });
  };
  console.log(state);
  return (
    <div className="container">
      <div className={styles["flight-detail"]}>
        <FlightReserveDesktopHeader {...state} />
        <FlightReserveMobileHeder {...state} />
        <Scrolltoprefresh />
      </div>
      <div className="row ">
        {/* <div className="col-lg-1"></div> */}
        <div className="col-lg-12 no-padding-xs border-pill-lg px-4">
          <p
            className={`text-right font-size-14 ${styles["pcolor-textpill"]}  `}
          >
            <FontAwesomeIcon icon={faUser} />
            مشخصات مسافرین
          </p>
          <table
            className={`table my-2 text-right ${styles["passenger-list-last-payment"]} `}
          >
            <thead>
              <tr className="font-bold-iransanse font-size-13 hidden-xs">
                <th>#</th>
                <th>نام</th>
                <th>نام‌خانوادگی</th>
                <th>ملیت</th>
                <th>کدملی/گذرنامه</th>
                {state.pasEndDateAll && <th>انقضای گذرنامه</th>}
                <th>تاریخ تولد</th>
                <th>قیمت تومان</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {state.birthDayAll_.length > 0
                ? state.birthDayAll_.map((oneRow, index) => (
                  <tr className="font-size-13">
                    <td className="hidden-xs">
                      <span>{index + 1}.&nbsp;</span>
                      {getTicketType(state.ticketCodeAll_[index])}
                      ({(state.sexAll_[index] == 1 ? 'مرد' : 'زن')})
                    </td>
                    <td className="px-0">
                      <div className="hidden-xs">
                        {state.nameAll_[index]}
                      </div>
                      <div className="visible-xs font-bold-iransanse px-2">
                        <span>
                          <FontAwesomeIcon icon={faUser} />
                          {`${state.nameAll_[index]} ${state.familyAll_[index]
                            } (${getTicketType(
                              state.ticketCodeAll_[index]
                            )})`}
                        </span>
                        <p className="pt-2">
                          <FontAwesomeIcon icon={faInfoCircle} />
                          {state.meliCodeAll_[index] ? state.meliCodeAll_[index] : state.pasNoAll_[index]}
                        </p>
                      </div>
                    </td>
                    <td className="hidden-xs">
                      {state.familyAll_[index]}
                    </td>
                    <td className="hidden-xs">
                      {state.meliatAll_[index] == "IR"
                        ? "ایرانی"
                        : "خارجی"}
                    </td>
                    <td className="hidden-xs">
                      {state.meliCodeAll_[index] ? state.meliCodeAll_[index] : state.pasNoAll_[index]}
                    </td>
                    {state.pasEndDateAll &&
                      <td className="hidden-xs">
                        {state.pasEndDateAll_[index]}
                      </td>
                    }
                    <td>
                      <div className="hidden-xs">
                        {state.birthDayAll_[index]}
                      </div>
                      <div className="visible-xs font-bold-iransanse">
                        <span>
                          <FontAwesomeIcon icon={faCalendar} />
                          {state.birthDayAll_[index]}
                        </span>
                        <p className="pt-1">
                          {/* <FontAwesomeIcon icon={faDollarSign} /> */}
                          <span className="color-secondary">
                            {" "}
                            {moneyFormat(
                              getTicketPrice(
                                state.ticketCodeAll_[index]
                              )
                            )}{' '}
                          </span>
                          ریال
                        </p>
                      </div>
                    </td>
                    <td className="hidden-xs">
                      {moneyFormat(
                        getTicketPrice(
                          state.ticketCodeAll_[index]
                        )
                      )}
                    </td>
                    <td>
                      <div className="font-size-14">
                        <FontAwesomeIcon style={{ cursor: "pointer" }}
                          icon={faEdit}
                          onClick={() => {
                            managePopUpEditForm()
                            setState({
                              ...state,
                              current: {
                                index: index,
                                name: state.nameAll_[index],
                                family: state.familyAll_[index],
                                meliat: state.meliatAll_[index],
                                pasNoAll: state.pasNoAll_[index],
                                meliCode: state.meliCodeAll_[index],
                                pasEndDateAll: state.pasEndDateAll_[index],
                                sex: state.sexAll_[index],
                                birthday: state.birthDayAll_[index],
                              }
                            }
                            );
                          }
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row ">
        <div className="col-lg-1 col-0"></div>
        <div className="col-lg-12 col-12 no-padding-xs border-pill-lg py-2 px-3 mt-2">
          <div className="row justify-content-between px-2">
            {/* child */}
            <div className={`col-lg-4 text-right ${styles['border-left']}`}>
              <div className={`${styles["item"]} pb-3`}>
                <div className={`${styles["descripcion"]}`}>
                  مبلغ کل :
                </div>
                <div className={`${styles["precio"]} font-bold-iransanse`}>
                  {moneyFormat(state.feeGet)}{' '}
                  <span>تومان</span>
                </div>
              </div>
              <div className={`${styles["item"]} pb-3`}>
                <div className={`${styles["descripcion"]}`}>
                  اعتبار کیف پول شما :‌
                </div>
                <div className={`${styles["precio"]} font-bold-iransanse`}>
                  {moneyFormat(0)}{' '}
                  <span>تومان</span>
                </div>
              </div>
              <div className={`${styles["item"]} pb-3`}>
                <div className={`${styles["descripcion"]}`}>
                  مبلغ قابل پرداخت :‌
                </div>
                <div className={`${styles["precio"]} font-bold-iransanse`}>
                  {moneyFormat(state.feeGet)}{' '}
                  <span>تومان</span>
                </div>
              </div>
            </div>
            {/* child */}
            <div className={`col-lg-3 col-6 payment-container d-flex align-items-center justify-content-center text-center ${styles['border-left']}`}>
              <div className={`s-sep w-50 d-flex justify-content-center ${styles['select-bunk']} `}>
                <input type="radio" checked={true} className="ms-3" />
                <img src={'../../../Images/sep.png'} alt="sep" width={'50px'} height={'30px'} />
              </div>
            </div>
            <div className={`col-lg-3 col-6 payment-container d-flex align-items-center justify-content-center text-center ${styles['border-left']}`}>
              <div className={`d-flex justify-content-end ${styles['select-bunk']} `}>
                <div className="row justify-content-center">
                  <div className="col-lg-7 col-6 d-flex align-items-center" style={{ width: 'fit-content' }}>
                    <p className="font-size-13 mb-0">
                      مبلغ قابل پرداخت :‌
                    </p>
                  </div>
                  <div className="col-lg-5 col-6 text-left ps-5" style={{ width: 'fit-content' }}>
                    <span className="font-size-14 text-danger mb-0 font-bold-iransanse">
                      {moneyFormat(state.feeGet)}{' '}
                    </span>
                    <span className="">تومان</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={`col-lg-2 col-12 payment-container d-flex align-items-center justify-content-center text-center mt-2`}>
              <div className="">
                <div className="ms-2 col-12">
                  <button
                    className="btn btn-success-payment py-2 mb-1"
                    onClick={() => {
                      compeleteReservation();
                      getBanks();
                    }}
                  >
                    پرداخت با کارت شتاب
                  </button>
                </div>
                <div className="me-2 col-12 d-flex justify-content-center mt-2">
                  <span
                    className={`py-2 mb-1 cursor-pointer ${styles['cancel-buttom']}`}
                    onClick={() => router.push("/")}
                  >
                    <span>انصراف از خرید</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PopUpWide
        type='editReciept'
        opened={open}
        closePopUp={managePopUpEditForm}
      >
        <div className={stylesflight["flight-search-box-calendar-container"]} style={{ border: " 1px solid", borderRadius: '5px' }}>
          <FlightPassengerEditForm
            {...state.current}
            pathKind={state.pathKind}
            setOpen={setOpen}
            changeProperty={updatePassengerData}
          />
        </div>
      </PopUpWide>
    </div>
  );

}
const mapStateToProps = (state) => ({
  reserveProperties: selectProperties(state),
});
const mapDispatchToProps = (dispatch) => ({
  addReservationProperties: async (value) =>
    dispatch(addReservationProperties(value)),
  messageBoxModify: (value) => dispatch(messageBoxModify(value)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FlightReciept)
);
