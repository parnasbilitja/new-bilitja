import React from "react";
import styles from "../../../styles/FlightReserve.module.scss";


import { addReservationProperties } from "../../Redux/Reserve/reserve.action";
import FlightPassengerForm from "./FlightPassengerForm.component";
import FlightReserveDesktopHeader from "./FlightReserveDesktopHeader.component";
import FlightReserveMobileHeader from "./FlightReserveMobileHeader.component";
import {
    faMale,
    faFemale,
    faChild,
    faBaby,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import globals from "../Global";

import { connect } from "react-redux";
import { selectProperties } from "../../Redux/Reserve/reserve.reselect";
import { messageBoxModify, accountBoxModify } from "../../Redux/UI/ui.action";

import {
    isValidIranianNationalCode,
    moneyFormat,
    isValidPassportCode,
} from "../../Utils/SimpleTasks";
import { withRouter } from "next/router";
import { Loader } from "../../Utils/Loader";
import RegisterComponent from "../account/Register.component";
import PopUp from "../component/PopUp.component";

class FlightReserve extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateRegister: false,
            passengers: [],
            priceAll: 0,
            mobileSubmiter: "",
            phoneSubmiter: "",
            mobileSubmiterErr: "",
            phoneSubmiterErr: "",
            agreeWithTerm: false,
            loading: false,
        };
    }

    componentDidMount() {
        this.props.addReservationProperties({
            reqNo: this.props.router.asPath.split("/")[7],
            reqPnr: this.props.router.asPath.split("/")[8],
            priceMessage: "",
        });
        fetch(
            `${globals.baseUrlNew
            }BilitFlightReserve/flightsReserve/ravisReserveProperty/${this.props.router.asPath.split("/")[7]
            }-${this.props.router.asPath.split("/")[8]
            }/1a157116-a01a-4027-ab10-74098ac63815`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.status == "0") {
                    new Array(parseInt(data.flightReservePropertyModel.numADL))
                        .fill()
                        .forEach((x) => {
                            this.addNewPassenger(
                                "ADL",
                                data.flightReservePropertyModel.priceADL
                            );
                        });
                    Array(parseInt(data.flightReservePropertyModel.numCHD))
                        .fill()
                        .forEach((x) => {
                            this.addNewPassenger(
                                "CHD",
                                data.flightReservePropertyModel.priceCHD
                            );
                        });
                    Array(parseInt(data.flightReservePropertyModel.numINF))
                        .fill()
                        .forEach((x) => {
                            this.addNewPassenger(
                                "INF",
                                data.flightReservePropertyModel.priceINF
                            );
                        });

                    this.setState({
                        ...data.flightReservePropertyModel,
                    });
                } else {
                }
            });
    }
    fillPassengersData = (field, passengerNo, value) => {
        let passenger = this.state.passengers.find((x) => x.id == passengerNo);
        passenger[field] = value;
        let passengers_ = this.state.passengers.map((x) => {
            if (x.id == passengerNo) {
                return passenger;
            } else {
                return x;
            }
        });

        this.setState({
            passengers: passengers_,
        });
        this.getAllPrice();
    };

    addNewPassenger = (type, price) => {
        let passengers = this.state.passengers;
        let max_ = -1;
        passengers.map((onePassenger) => {
            if (onePassenger.id > max_) {
                max_ = onePassenger.id;
            }
        });
        const additionalPassenger = {
            id: max_ + 1,
            type: type,
            name: "",
            family: "",
            nationality: "IR",
            gender: "1",
            code: "",
            birthday: "",
            pasaport: "",
            // add new fild for extPasaport
            extPasaport: "",
            price: price,
            nameErr: "",
            familyErr: "",
            codeErr: "",
            birthdayErr: "",
            pasaportErr: "",
            futureday: "",
            pasno: "",
            birthdate: "",
            pasenddat: "",
            pasenddatErr: "",
            pasnoErr: "",
        };

        passengers.push(additionalPassenger);

        this.setState(
            {
                passengers: passengers,
            },
            () => {
                this.getAllPrice();
            }
        );
    };

    removePassenger = (id) => {
        let passengers = this.state.passengers;
        passengers = passengers.filter((onePssenger) => onePssenger.id != id);
        this.setState(
            {
                passengers: passengers,
            },
            () => {
                this.getAllPrice();
            }
        );
    };

    validation = () => {
        let isValid = true;

        let mobileSubmiterErr = "";
        let phoneSubmiterErr = "";
        if (this.state.mobileSubmiter == "") {
            mobileSubmiterErr = "وارد کردن شماره همراه اجباری است";
            isValid = false;
        }
        if (this.state.mobileSubmiter.length < 10) {
            mobileSubmiterErr = "شماره موبایل باید 11 رقمی باشد";
            isValid = false;
        }
        if (this.state.phoneSubmiter == "") {
            phoneSubmiterErr = "وارد کردن شماره ثابت اجباری است";
            isValid = false;
        }
        const passengers = this.state.passengers.map((onePassenger) => {
            const tempPassenger = onePassenger;

            tempPassenger.nameErr = "";
            tempPassenger.familyErr = "";
            tempPassenger.codeErr = "";
            tempPassenger.birthdayErr = "";
            tempPassenger.pasaportErr = "";
            tempPassenger.pasnoErr = "";
            tempPassenger.pasenddatErr = "";

            if (tempPassenger.name == "") {
                tempPassenger.nameErr = "نام الزامی میباشد";
                isValid = false;
            }

            if (tempPassenger.family == "") {
                tempPassenger.familyErr = "نام‌خانوادگی الزامی میباشد";
                isValid = false;
            }

            if (tempPassenger.pasno == "" && this.state.pathKind == 2) {
                tempPassenger.pasnoErr = "شماره پاسپورت الزامی میباشد";
                isValid = false;
            }
            if (tempPassenger.futureday == "" && this.state.pathKind == 2) {
                tempPassenger.pasenddatErr = "انقضای پاسپورت الزامی میباشد";
                isValid = false;
            }
            if (onePassenger.nationality == "IR" && this.state.pathKind != 2) {
                if (!isValidIranianNationalCode(tempPassenger.code)) {
                    tempPassenger.codeErr = "کدملی نامعتبر میباشد";
                    isValid = false;
                }
            } else {
                if (!isValidPassportCode(tempPassenger.code)) {
                    tempPassenger.codeErr = "کد پاسپورت نا معتبر میباشد";
                    isValid = false;
                }
            }

            if (tempPassenger.birthday == "") {
                tempPassenger.birthdayErr = "تاریخ تولد الزامی میباشد";
                isValid = false;
            }
            // if (tempPassenger.pasaport == "") {
            //     tempPassenger.pasaportErr = "پاسپورت الزامی میباشد"
            //     isValid = false
            // }
            return tempPassenger;
        });
        this.setState({
            passengers: passengers,
            mobileSubmiterErr: mobileSubmiterErr,
            phoneSubmiterErr: phoneSubmiterErr,
        });
        return isValid;
    };

    getAllPrice = () => {
        let sum = 0;
        this.state.passengers.forEach((onePassenger) => {
            sum += onePassenger.price;
        });
        this.setState({
            priceAll: sum,
        });
    };
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: parseInt(value),
        });
    };

    authUserPopUP = () => {
        this.setState({
            stateRegister: false,
        });
    };

    validationNumberOfPassengers = (type = '') => {
        const numADL = this.state.passengers.filter((x) => x.type == "ADL").length;
        const numCHD = this.state.passengers.filter((x) => x.type == "CHD").length;
        const numINF = this.state.passengers.filter((x) => x.type == "INF").length;
        const cap = this.state.capLast;
        let message = "";
        let valid = true;

        if (numADL <= numINF && type != 'ADL' && type != 'CHD') {
            message = "تعداد نوزاد نمیتواند بیشتر از تعداد بزرگسال باشد";
            valid = false;
        } else if (numADL <= 0) {
            message = "باید حداقل یک بزرگسال در بین مسافرین باشد";
            valid = false;
        } else if (numADL + numCHD >= cap && type != 'INF') {
            message = "تعداد افراد بیش از ظرفیت پرواز است";
            valid = false;
        }
        if (!valid) {
            this.props.messageBoxModify({
                message: message,
                state: true,
            });
        }

        console.log(this.state.passengers);

        return valid;
    };
    compeleteReservation = () => {
        const numADL = this.state.passengers.filter((x) => x.type == "ADL").length;
        const numCHD = this.state.passengers.filter((x) => x.type == "CHD").length;
        const numINF = this.state.passengers.filter((x) => x.type == "INF").length;

        const reservePassengerObject = {
            reqNo: this.props.reserveProperties.reqNo,
            reqPnr: this.props.reserveProperties.reqPnr,
            nameFamily:
                this.state.passengers[0].name + " " + this.state.passengers[0].family,
            nameFamilyEn:
                this.state.passengers[0].name + " " + this.state.passengers[0].family,
            nameEnAll: this.state.passengers.map((x) => x.name).join(","),
            familyEnAll: this.state.passengers.map((x) => x.family).join(","),
            nameAll: this.state.passengers.map((x) => x.name).join(","),
            familyAll: this.state.passengers.map((x) => x.family).join(","),
            meliCodeAll: this.state.passengers.map((x) => x.code).join(","),
            ticketCodeAll: this.state.passengers.map((x) => x.type).join(","),
            sexAll: this.state.passengers.map((x) => x.gender).join(","),
            birthDayAll: this.state.passengers.map((x) => x.birthday).join(","),
            meliatAll: this.state.passengers.map((x) => x.nationality).join(","),
            telNo: this.state.phoneSubmiter.toString(),
            mobileNo: this.state.mobileSubmiter.toString(),
            pasNoAll: this.state.passengers.map((x) => x.pasno).join(","),    //Array(this.state.passengers.length).fill("").join(","),
            pasStDateAll: Array(this.state.passengers.length).fill("").join(","),
            pasEndDateAll: this.state.passengers.map((x) => x.futureday).join(","),
            numADL: numADL,
            numCHD: numCHD,
            numINF: numINF,
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
                if (data.status == "0") {
                    this.props.router.push(
                        `/flights/receipt/${data.reqNo}/${data.reqPnr}`
                    );
                } else {
                    this.props.messageBoxModify({
                        state: true,
                        message: data.message,
                    });
                }
            });
    };

    render() {
        return (
            <div className="container">
                <div className={`${styles["flight-detail"]}`}>
                    <FlightReserveDesktopHeader {...this.state} />
                    <FlightReserveMobileHeader {...this.state} />
                </div>
                <div className="row mt-10">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-12 no-padding-xs border-pill-lg mt-2">
                        {this.state.passengers
                            ? this.state.passengers
                                .filter((x) => x.type == "ADL")
                                .map((onePassenger, index) => (
                                    <FlightPassengerForm
                                        {...onePassenger}
                                        id={onePassenger.id}
                                        index={index}
                                        type="ADL"
                                        removePassenger={this.removePassenger}
                                        fillPassengersData={this.fillPassengersData}
                                        pathKind={this.state.pathKind}
                                    />
                                ))
                            : null}
                        {this.state.passengers
                            ? this.state.passengers
                                .filter((x) => x.type == "CHD")
                                .map((onePassenger, index) => (
                                    <FlightPassengerForm
                                        {...onePassenger}
                                        id={onePassenger.id}
                                        index={index}
                                        type="CHD"
                                        removePassenger={this.removePassenger}
                                        fillPassengersData={this.fillPassengersData}
                                        pathKind={this.state.pathKind}
                                    />
                                ))
                            : null}
                        {this.state.passengers
                            ? this.state.passengers
                                .filter((x) => x.type == "INF")
                                .map((onePassenger, index) => (
                                    <FlightPassengerForm
                                        {...onePassenger}
                                        id={onePassenger.id}
                                        index={index}
                                        removePassenger={this.removePassenger}
                                        fillPassengersData={this.fillPassengersData}
                                        pathKind={this.state.pathKind}
                                    />
                                ))
                            : null}
                        <div className={`row ${styles["add-passanger"]} text-left`}>
                            <div className="visible-xs col-12 ">
                                <p className="font-size-14">
                                    <span className="font-bold-iransanse">
                                        مجموع قیمت: &nbsp;
                                    </span>
                                    <span className="color-secondary font-bold-iransanse">
                                        {moneyFormat(this.state.priceAll)}
                                        &nbsp;
                                    </span>
                                    <span className="font-bold-iransanse">تومان</span>
                                </p>
                            </div>

                            <div className="col-lg-9 col-md-8 col-12">
                                <div className="row">
                                    <div className="col-lg-2 col-md-4 col-6 no-padding">
                                        <a
                                            href="#"
                                            className={` ${styles["btn-outlined-private"]}  btn-outlined  font-bold-iransanse`}
                                            onClick={(e) => {
                                                if (this.validationNumberOfPassengers('ADL')) {
                                                    this.addNewPassenger("ADL", this.state.priceADL);
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

                                    <div className="col-lg-2 col-md-4 col-6 no-padding">
                                        <div
                                            className={` ${styles["btn-outlined-private"]}  btn-outlined  font-bold-iransanse`}
                                            onClick={(e) => {
                                                if (this.validationNumberOfPassengers('CHD')) {
                                                    this.addNewPassenger("CHD", this.state.priceCHD);
                                                }
                                                e.preventDefault();
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                            <span className="me-2">کودک</span>
                                            <FontAwesomeIcon className="pull-left" icon={faChild} />
                                        </div>
                                    </div>

                                    <div className="col-lg-2 col-md-4 col-6 no-padding">
                                        <a
                                            href="#"
                                            className={` ${styles["btn-outlined-private"]}  btn-outlined  font-bold-iransanse`}
                                            onClick={(e) => {
                                                if (this.validationNumberOfPassengers('INF')) {
                                                    this.addNewPassenger("INF", this.state.priceINF);
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
                            </div>
                            <div className="col-lg-3 col-md-4 hidden-xs">
                                <p className="font-size-14">
                                    <span className="font-bold-iransanse">
                                        مجموع قیمت: &nbsp;
                                    </span>
                                    <span className="color-secondary font-bold-iransanse">
                                        {moneyFormat(this.state.priceAll)}
                                        &nbsp;
                                    </span>
                                    <span className="font-bold-iransanse">تومان</span>
                                </p>
                            </div>
                        </div>

                        <div className={`row ${styles["passanger-submiter"]} `}>
                            <div className="col-lg-6 col-md-12 col-12 px-4">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-6 padding-3px">
                                        <div>
                                            <input
                                                inputMode="numeric"
                                                placeholder="شماره همراه"
                                                name="mobileSubmiter"
                                                onChange={this.handleChange}
                                                className="col-12 reserve-input px-2 h-35em"
                                                maxLength={11}
                                            />
                                        </div>
                                        <span className="color-secondary">
                                            {this.state.mobileSubmiterErr}
                                        </span>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-6 padding-3px">
                                        <div>
                                            <input
                                                className="col-12 reserve-input px-2 h-35em"
                                                inputMode="numeric"
                                                placeholder="شماره ثابت"
                                                name="phoneSubmiter"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <span className="color-secondary">
                                            {this.state.phoneSubmiterErr}
                                        </span>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-lg-6 col-md-6 col-12 padding-3px">
                                        <div>
                                            <input
                                                className="col-12 reserve-input px-2 h-35em"
                                                placeholder="ایمیل (اختیاری)"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 padding-3px">
                                        <div>
                                            <input
                                                className="col-12 reserve-input px-2 h-35em"
                                                placeholder="کد تخفیف (اختیاری)"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12 col-12 finish-reserve">
                                <div className="row" style={{ marginTop: 10 }}>
                                    <div className="col-lg-9 d-flex align-items-center">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            onChange={(e) => {
                                                this.setState({
                                                    agreeWithTerm: e.target.checked,
                                                });
                                            }}
                                            className="mx-2"
                                        />
                                        <label htmlFor="terms" style={{ fontSize: 15 }}>
                                            قوانین و مقررات و صحت اطلاعات را قبول دارم.
                                        </label>
                                    </div>
                                    <div className="col-lg-3 text-right">
                                        <div className={styles["ruls-text"]}>
                                            <a style={{ marginRight: 10, marginTop: 5, borderBottom: '2px dashed #090026', paddingBottom: 5, color: '#090026' }} href="">
                                                قوانین و مقررات
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row finish-reserve-buttons mb-3 ml-5 mt-4">
                                    <div className="col-lg-8 col-md-8 col-7 padding-3px">
                                        <button
                                            onClick={(e) => {

                                                e.preventDefault();
                                                this.props.accountBoxModify({
                                                    state: true,
                                                    type: "register",
                                                });

                                                if (!this.validation()) {
                                                    this.setState({ loading: false });
                                                    this.props.messageBoxModify({
                                                        state: true,
                                                        message: "لطفا اطلاعات را تکمیل کنید.",
                                                    });
                                                    e.preventDefault();
                                                } else if (this.state.agreeWithTerm === true) {
                                                    this.setState({ loading: true });
                                                    this.compeleteReservation();
                                                    e.preventDefault();
                                                } else {
                                                    this.setState({ loading: false });

                                                    this.props.messageBoxModify({
                                                        state: true,
                                                        message: "لطفا با شرایط و مقررات موافقت کنید",
                                                    });
                                                }
                                            }}
                                            className="py-2 btn-block col-12 end-payment-btn btn"
                                        >
                                            {this.state.loading == false
                                                ? "تکمیل خرید"
                                                : "درحال پردازش..."}
                                        </button>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-5 padding-3px">
                                        <a
                                            className="btn col-12 back-payment-btn py-2"
                                            onClick={() => {
                                                this.props.router.back();
                                            }}
                                        >
                                            <span>بازگشت</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <PopUp
                    opened={this.state.stateRegister}
                    closePopUp={this.authUserPopUP}
                >
                    <RegisterComponent />
                </PopUp>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    reserveProperties: selectProperties(state),
});
const mapDispatchToProps = (dispatch) => ({
    accountBoxModify: (value) => dispatch(accountBoxModify(value)),
    addReservationProperties: async (value) =>
        dispatch(addReservationProperties(value)),
    messageBoxModify: (value) => dispatch(messageBoxModify(value)),
});
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(FlightReserve)
);
