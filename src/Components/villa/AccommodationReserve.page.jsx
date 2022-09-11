import React from "react";
import ImageSlider from "../component/ImageSlider.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCalendar,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";
import AccommodationReserveCalendar from "./AccommodationReserveCalendar.component";

import globals from "../../Globals/Global";

import { messageBoxModify } from "../../Redux/UI/ui.action";
import { addReservationProperties } from "../../Redux/Reservevilla/reserve_villa.action";
import { connect } from "react-redux";
import { withRouter } from "next/router";

class AccommodationReserve extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myId: this.props.router.asPath.substr(21),
      selectedDaysArray: [],
      room: {},
    };
  }

  componentDidMount() {
    fetch(
      `${globals.baseUrl}bj/eghamat/view/${this.props.router.asPath.substr(21)}`
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          ...json.Eghamat[0],
        });
      });
    fetch(
      `${globals.baseUrl}bj/eghamatRoom/view/${this.props.router.asPath.substr(
        21
      )}`
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          room: {
            ...json.EghamatRoom[0],
          },
        });
      });
  }

  setDate = (args) => {
    this.setState({
      selectedDaysArray: args,
    });
  };

  validation = () => {
    if (this.state.selectedDaysArray.length == 0) {
      return "لطفا روز های اقامت را مشخص کنید";
    }
    return "OK";
  };

  render() {
    return (
      <div className="container-fluid">
        <br />
        <div className="row">
          <div className="col-lg-1 col-md-1 col-sm-0 col-0"></div>
          <div className="col-lg-10 col-12">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12 col-12 no-padding">
                <img width="" height="" Slider />
                <br />
                <br />
                <div className="border-pill text-right">
                  <div className="border-bottom-black padding-10px">
                    <h1 className="font-size-20 font-bold-iransanse">
                      {this.state.Name}
                    </h1>
                  </div>
                  <div className="row padding-10px">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                      <FontAwesomeIcon icon={faClock} />
                      <span> شهر : {this.state.CityName} </span>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                      <FontAwesomeIcon icon={faClock} />
                      <span> محدوده : {this.state.AddressName} </span>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <FontAwesomeIcon icon={faClock} />
                      <span> آدرس : {this.state.Address} </span>
                    </div>
                  </div>
                </div>
                <br />
                <div className="border-pill text-right">
                  <div className="border-bottom-black padding-10px">
                    <h1 className="font-size-16 font-bold-iransanse">
                      توضیحات
                    </h1>
                  </div>
                  <div className="row padding-10px">
                    <div className="col-12">
                      <p>{this.state.Dsc}</p>
                    </div>
                  </div>
                </div>
                <br />
                <div className="border-pill text-right">
                  <div className="border-bottom-black padding-10px">
                    <h1 className="font-size-20 font-bold-iransanse">
                      ظرفیت ویلا
                    </h1>
                  </div>
                  <div className="row padding-10px">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="row">
                        <div className="col-lg-2 col-2 topic-icon">
                          <FontAwesomeIcon
                            className="font-size-30"
                            icon={faUniversity}
                          />
                        </div>
                        <div className="col-lg-10 col-10">
                          <p className="no-margin font-size-14">
                            {" "}
                            متراژ زمین:{" "}
                            <span className="color-primary">
                              {this.state.Metraj} متر
                            </span>
                          </p>
                          <p className="no-margin font-size-14">
                            {" "}
                            متراژ بنا:{" "}
                            <span className="color-primary">
                              {this.state.room.Metraj} متر
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="row">
                        <div className="col-lg-2 col-2 topic-icon">
                          <FontAwesomeIcon
                            className="font-size-30"
                            icon={faUniversity}
                          />
                        </div>
                        <div className="col-lg-10 col-10">
                          <p className="no-margin font-size-14">
                            {" "}
                            نوع بنا:{" "}
                            <span className="color-primary">
                              {this.state.BuildingType}
                            </span>
                          </p>
                          <p className="no-margin font-size-14">
                            {" "}
                            تعداداتاق:{" "}
                            <span className="color-primary">
                              {this.state.room.RoomCount}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row padding-10px">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="row">
                        <div className="col-lg-2 col-2 topic-icon">
                          <FontAwesomeIcon
                            className="font-size-30"
                            icon={faUniversity}
                          />
                        </div>
                        <div className="col-lg-10 col-10">
                          <p className="no-margin font-size-14">
                            تخت2 نفره:
                            <span className="color-primary">
                              {this.state.room.Takht2Count} عدد
                            </span>
                          </p>
                          <p className="no-margin font-size-14">
                            تخت1 نفره:
                            <span className="color-primary">
                              {this.state.room.Takht1Count} عدد
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="row">
                        <div className="col-lg-2 col-2 topic-icon">
                          <FontAwesomeIcon
                            className="font-size-30"
                            icon={faUniversity}
                          />
                        </div>
                        <div className="col-lg-10 col-10">
                          <p className="no-margin font-size-14">
                            {" "}
                            ظرفیت :{" "}
                            <span className="color-primary">
                              {this.state.room.Cap}
                            </span>
                          </p>
                          <p className="no-margin font-size-14">
                            {" "}
                            حداکثر ظرفیت :{" "}
                            <span className="color-primary">
                              {this.state.room.CapMax}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row padding-10px">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="row">
                        <div className="col-lg-2 col-2 topic-icon">
                          <FontAwesomeIcon
                            className="font-size-30"
                            icon={faUniversity}
                          />
                        </div>
                        <div className="col-lg-10 col-10">
                          <p className="no-margin font-size-14">
                            {" "}
                            تعداد تشک :{" "}
                            <span className="color-primary">
                              {this.state.room.ToshakCount}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12"></div>
                  </div>
                </div>
                <div className="border-pill text-right">
                  <div className="border-bottom-black padding-10px">
                    <h1 className="font-size-20 font-bold-iransanse">
                      نوع اقامتگاه
                    </h1>
                  </div>
                  <div className="row padding-10px"></div>
                </div>
                <br />
                <div className="border-pill text-right">
                  <div className="border-bottom-black padding-10px">
                    <h1 className="font-size-20 font-bold-iransanse">
                      چشم انداز
                    </h1>
                  </div>
                  <div className="row padding-10px"></div>
                </div>
                <br />
                <div className="border-pill text-right">
                  <div className="border-bottom-black padding-10px">
                    <h1 className="font-size-20 font-bold-iransanse">
                      امکانات ویلا
                    </h1>
                  </div>
                  <div className="row padding-10px"></div>
                </div>
                <br />
                <div className="border-pill text-right">
                  <div className="border-bottom-black padding-10px">
                    <h1 className="font-size-20 font-bold-iransanse">
                      قوانین ویلا
                    </h1>
                  </div>
                  <div className="row padding-10px"></div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12 text-right">
                <div className="border-pill padding-5px">
                  <p className="font-size-12">قیمت ها به هزار تومان می‌باشد</p>
                  <AccommodationReserveCalendar setDate={this.setDate} />

                  <p className="border-bottom-black font-size-13 margin-top-20px margin-bottom-5px">
                    روز های انتخاب شده شما (قیمت ها به تومان می‌باشد)
                  </p>
                  <div className="row">
                    <div className="col-lg-1 col-1"></div>
                    <div className="col-lg-5 col-5 border-pill padding-5px">
                      <span className="font-size-13">
                        <FontAwesomeIcon icon={faCalendar} />
                        &nbsp;تاریخ ورود :
                        {this.state.selectedDaysArray[0]
                          ? this.state.selectedDaysArray[0][0]
                          : null}
                      </span>
                    </div>
                    &nbsp;&nbsp;
                    <div className="col-lg-5 col-5 border-pill padding-5px">
                      <span className="font-size-13">
                        <FontAwesomeIcon icon={faCalendar} />
                        &nbsp;تاریخ خروج :{" "}
                        {this.state.selectedDaysArray[
                          this.state.selectedDaysArray.length - 1
                        ]
                          ? this.state.selectedDaysArray[
                              this.state.selectedDaysArray.length - 1
                            ][0]
                          : null}
                      </span>
                    </div>
                  </div>
                  <p className="border-bottom margin-top-10px margin-bottom-5px"></p>
                  <div className="font-size-14 padding-10px">
                    {this.state.selectedDaysArray.map((day) => (
                      <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-4 col-6 font-size-13 font-bold-iransanse">
                          {day[0]}
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-6 font-size-13 font-bold-iransanse">
                          {day[1] != null ? day[1] : "قیمتی ثبت نشده است"}
                        </div>
                      </div>
                    ))}

                    <span className="pull-left">
                      {this.state.selectedDaysArray.reduce(
                        (a, b) => a + (b[1] || 0),
                        0
                      )}{" "}
                      تومان
                    </span>
                    <span>مبلغ کل</span>
                  </div>
                  <div className="row">
                    <div className="col-lg-1 col-1"></div>
                    <div className="col-lg-5 col-5 no-padding">
                      <a
                        className="btn-outlined-reserve-tall mt-8"
                        onClick={() => {
                          const message = this.validation();
                          if (message != "OK") {
                            this.props.messageBoxModify({
                              color:false,
                              state: true,
                              message: message,
                            });
                            return;
                          }
                          this.props
                            .addReservationProperties({
                              EghamatId: this.props.router.asPath.substr(21),
                              RoomRow: 1,
                              DateInc: this.state.selectedDaysArray[0][0],
                              NightCount: this.state.selectedDaysArray.length,
                              selectedDaysArray: this.state.selectedDaysArray,
                              Address: this.state.Address,
                              CityName: this.state.CityName,
                              AddressName: this.state.AddressName,
                            })
                            .then(() => {
                              this.props.router.push("/receipt/villa/tehran");
                            });
                        }}
                      >
                        رزرو
                      </a>
                    </div>
                    &nbsp;&nbsp;
                    <div className="col-lg-5 col-5 no-padding">
                      <a className="btn-outlined-cancle-tall mt-8">بازگشت</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-200"></div>
          </div>
        </div>
      </div>
    );
  }
}
const dispatchStatesToProps = (dispatch) => ({
  addReservationProperties: async (value) =>
    dispatch(addReservationProperties(value)),
  messageBoxModify: (value) => dispatch(messageBoxModify(value)),
});

export default withRouter(
  connect(null, dispatchStatesToProps)(AccommodationReserve)
);
