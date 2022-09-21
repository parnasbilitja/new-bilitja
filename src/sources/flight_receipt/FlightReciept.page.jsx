import React from "react";
import styles from "../../../styles/FlightReciept.module.scss";
import stylesflight from "../../../styles/FlightSearchBox.module.scss";
import FlightReserveDesktopHeader from "./FlightReserveDesktopHeader.component";
import FlightReserveMobileHeder from "./FlightReserveMobileHeader.component";
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

class FlightReciept extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      birthDayAll_: [],
      familyAll_: [],
      meliCodeAll_: [],
      pasNoAll_: [],
      meliatAll_: [],
      nameAll_: [],
      sexAll_: [],
      ticketCodeAll_: [],
      open: false,
      isUpdated: false,
      current: {
        name: "",
        family: "",
        meliat: "",
        meliCode: "",
        sex: "",
        birthday: "",
        index: 0,
      },
    };
    console.log(this.props);
  }

  componentDidMount() {
    //console.log(`${window.location.origin}/api/callbackbank`);

    this.props.addReservationProperties({
      reqNo: this.props.router.asPath.split("/")[3],
      reqPnr: this.props.router.asPath.split("/")[4],
      priceMessage: "",
    });
    fetch(
      `${globals.baseUrlNew
      }BilitFlightReserve/flightsReserve/ravisReserveProperty/${this.props.router.asPath.split("/")[3]
      }-${this.props.router.asPath.split("/")[4]
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

          this.setState(
            {
              ...data.flightReservePropertyModel,
              birthDayAll_: birthDayAll,
              familyAll_: familyAll,
              meliCodeAll_: meliCodeAll,
              pasNoAll_: pasNoAll,
              meliatAll_: meliatAll,
              nameAll_: nameAll,
              sexAll_: sexAll,
              pathKind:pathKind,
              ticketCodeAll_: ticketCodeAll,
            },
            this.getAllPrice
          );
        }
      });
      
  }
  compeleteReservation = () => {
    const reservePassengerObject = {
      reqNo: this.props.reserveProperties.reqNo,
      reqPnr: this.props.reserveProperties.reqPnr,
      nameFamily: this.state.nameAll_[0] + " " + this.state.familyAll_[0],
      nameFamilyEn: this.state.nameAll_[0] + " " + this.state.familyAll_[0],
      nameEnAll: this.state.nameAll_.join(","),
      familyEnAll: this.state.familyAll_.join(","),
      nameAll: this.state.nameAll_.join(","),
      familyAll: this.state.familyAll_.join(","),
      meliCodeAll: this.state.meliCodeAll_.join(","),
      ticketCodeAll: this.state.ticketCodeAll_.join(","),
      sexAll: this.state.sexAll_.join(","),
      birthDayAll: this.state.birthDayAll_.join(","),
      meliatAll: this.state.meliatAll_.join(","),
      telNo: "66955766",
      mobileNo: this.state.mobileNo,
      numADL: this.state.numADL,
      numCHD: this.state.numCHD,
      numINF: this.state.numINF,
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
        } else {
          this.props.messageBoxModify({
            color:false,
            state: true,
            message: "لطفا اطلاعات را کامل وارد کنید",
          });
        }
      });
      
  };
  getBanks = () => {
    fetch(
      `${globals.baseUrlNew}OnlinePay/api/onlinePay/pricing/getBanks/${this.props.reserveProperties.reqNo}/${this.props.reserveProperties.reqPnr}?customerId=1a157116-a01a-4027-ab10-74098ac63815`
    )
      .then((res) => res.json())
      .then((data) => {
        fetch(
          `${globals.baseUrlNew}OnlinePay/api/onlinePay/pricing/saveEbank`,
          {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
              reqNo: this.props.reserveProperties.reqNo,
              reqPnr: this.props.reserveProperties.reqPnr,
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
  getTicketType = (type) => {
    switch (type) {
      case "ADL":
        return "بزرگسال";
      case "CHD":
        return "کودک";
      case "INF":
        return "نوزاد";
    }
  };
  getTicketPrice = (type) => {
    switch (type) {
      case "ADL":
        return this.state.priceADL;
      case "CHD":
        return this.state.priceCHD;
      case "INF":
        return this.state.priceINF;
    }
  };
  getAllPrice = () => {
    let sum = 0;
    this.state.ticketCodeAll_.forEach((oneTicket) => {
      sum += this.getTicketPrice(oneTicket);
    });
    this.setState({
      priceAll: sum,
    });
  };
  updatePassengerData = (index, value) => {
    let names = this.state.nameAll_;
    let families = this.state.familyAll_;
    let sexes = this.state.sexAll_;
    let meliats = this.state.meliatAll_;
    let meliCodes = this.state.meliCodeAll_;
    let birthdays = this.state.birthDayAll_;

    names[index] = value.name;
    families[index] = value.family;
    sexes[index] = value.sex;
    meliats[index] = value.meliat;
    meliCodes[index] = value.meliCode;
    birthdays[index] = value.birthday;

    this.setState({
      nameAll_: names,
      familyAll_: families,
      sexAll_: sexes,
      meliatAll_: meliats,
      meliCodeAll_: meliCodes,
      birthDayAll_: birthdays,
      isUpdated: true,
    });
  };
  managePopUpEditForm = (value) => {
    this.setState({
      open: value,
    });
  };

  render() {
    return (
      <div className="container">
        <div className={styles["flight-detail"]}>
          <FlightReserveDesktopHeader {...this.state} />
          <FlightReserveMobileHeder {...this.state} />
        </div>
        <div className="row mt-10">
          {/* <div className="col-lg-1"></div> */}
          <div className="col-lg-12 no-padding-xs border-pill-lg">
            <p
              className={`text-right font-size-14 ${styles["pcolor-textpill"]}  `}
            >
              <FontAwesomeIcon icon={faUser} />
              مشخصات مسافرین
            </p>
            <table
              className={`table text-right ${styles["passenger-list-last-payment"]} `}
            >
              <thead>
                <tr className="font-bold-iransanse font-size-13 hidden-xs">
                  <th>رده</th>
                  <th>نام</th>
                  <th>نام‌خانوادگی</th>
                  <th>ملیت</th>
                  <th>کدملی/گذرنامه</th>
                  <th>تاریخ تولد</th>
                  <th>قیمت تومان</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.birthDayAll_.length > 0
                  ? this.state.birthDayAll_.map((oneRow, index) => (
                    <tr className="font-size-13">
                      <td className="hidden-xs">
                        {this.getTicketType(this.state.ticketCodeAll_[index])}
                      </td>
                      <td>
                        <div className="hidden-xs">
                          {this.state.nameAll_[index]}
                        </div>
                        <div className="visible-xs font-bold-iransanse">
                          <span>
                            <FontAwesomeIcon icon={faUser} />
                            {`${this.state.nameAll_[index]} ${this.state.familyAll_[index]
                              } (${this.getTicketType(
                                this.state.ticketCodeAll_[index]
                              )})`}
                          </span>
                          <p>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            {this.state.meliCodeAll_[index]?this.state.meliCodeAll_[index]:this.state.pasNoAll_[index]}
                          </p>
                        </div>
                      </td>
                      <td className="hidden-xs">
                        {this.state.familyAll_[index]}
                      </td>
                      <td className="hidden-xs">
                        {this.state.meliatAll_[index] == "IR"
                          ? "ایرانی"
                          : "خارجی"}
                      </td>
                      <td className="hidden-xs">
                        {this.state.meliCodeAll_[index]?this.state.meliCodeAll_[index]:this.state.pasNoAll_[index]}
                      </td>
                      <td>
                        <div className="hidden-xs">
                          {this.state.birthDayAll_[index]}
                        </div>
                        <div className="visible-xs font-bold-iransanse">
                          <span>
                            <FontAwesomeIcon icon={faCalendar} />
                            {this.state.birthDayAll_[index]}
                          </span>
                          <p>
                            <FontAwesomeIcon icon={faDollarSign} />
                            <span className="color-secondary">
                              {" "}
                              {moneyFormat(
                                this.getTicketPrice(
                                  this.state.ticketCodeAll_[index]
                                )
                              )}
                            </span>
                          </p>
                        </div>
                      </td>
                      <td className="hidden-xs">
                        {moneyFormat(
                          this.getTicketPrice(
                            this.state.ticketCodeAll_[index]
                          )
                        )}
                      </td>
                      <td>
                        <div className="font-size-14">
                          <FontAwesomeIcon
                            icon={faEdit}
                            onClick={() => {
                              this.setState(
                                {
                                  current: {
                                    index: index,
                                    name: this.state.nameAll_[index],
                                    family: this.state.familyAll_[index],
                                    meliat: this.state.meliatAll_[index],
                                    pasNoAll:this.state.pasNoAll_[index],
                                    meliCode: this.state.meliCodeAll_[index],
                                    sex: this.state.sexAll_[index],
                                    birthday: this.state.birthDayAll_[index],
                                  },
                                },
                                () => {
                                  this.managePopUpEditForm(true);
                                }
                              );
                            }}
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
        <div className="row mt-10">
          <div className="col-lg-1 col-0"></div>
          <div className="col-lg-12 col-12 no-padding-xs border-pill-lg pt-10">
            <div className="row justify-content-between">
              {/* child */}
              <div className="col-lg-4 text-right">
                <div className="row">
                  <div className="col-lg-7 col-6">
                    <p className="font-size-13 font-bold-iransanse">
                      مبلغ کل :
                    </p>
                  </div>
                  <div className="col-lg-5 col-6 text-left">
                    <p className="font-size-13">
                      {moneyFormat(this.state.priceAll)} تومان
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-7 col-6">
                    <p className="font-size-13 font-bold-iransanse">
                      اعتبار کیف پول شما :‌
                    </p>
                  </div>
                  <div className="col-lg-5 col-6 text-left">
                    <p className="font-size-13">{moneyFormat(0)} تومان</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-7 col-6">
                    <p className="font-size-13 font-bold-iransanse">
                      مبلغ قابل پرداخت :‌
                    </p>
                  </div>
                  <div className="col-lg-5 col-6 text-left">
                    <p className="font-size-13">
                      {moneyFormat(this.state.priceAll)} تومان
                    </p>
                  </div>
                </div>
              </div>
              {/* child */}
              <div className={`col-lg-4 col-12 payment-container d-flex align-items-center justify-content-end text-right`}>
                <div className="d-flex justify-content-end">
                  <div className="ms-2">
                    <button
                      className="btn btn-success-payment py-2 col-12 mb-1"
                      onClick={() => {
                        if (this.state.isUpdated) {
                          this.compeleteReservation();
                        }
                        // if (props.user.logged && localStorage.getItem('token')) { 
                          this.getBanks();
                        // }else{
                        //   this.props.messageBoxModify({
                        //     color:false,
                        //     state: true,
                        //     message: "لطفا وارد حساب کاربری خود شوید",
                        //   });
                        // }
                      }}
                    >
                      پرداخت با کارت شتاب
                    </button>
                  </div>
                  <div className="me-2">
                    <button
                      className="btn-danger-outlined btn col-12 py-2 mb-1"
                      onClick={() => router.push("/")}
                    >
                      <span>انصراف</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PopUpWide
          opened={this.state.open}
          closePopUp={this.managePopUpEditForm}
        >
          <div className={stylesflight["flight-search-box-calendar-container"]}>
            <FlightPassengerEditForm
              {...this.state.current}
              pathKind={this.state.pathKind}
              closePopUpEditFrom={this.managePopUpEditForm}
              changeProperty={this.updatePassengerData}
            />
          </div>
        </PopUpWide>
      </div>
    );
  }
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
