import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchway,
  faStar,
  faTimes,
  faEye,
  faDollarSign,
  faEdit,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import ManagerTopActionBox from "../ManagerTopActionBox.component";
import globals from "../../Global";
// import Switch from "react-switch";
import styles from "./../../../../styles/Vila.module.scss";
import stylesManage from "./../../../../styles/manager.module.scss";
import { withRouter } from "next/router";

class Villa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vilas: [],
    };
  }

  componentDidMount() {
    this.getData();
  }
  getData = async() => {
    await fetch(`${globals.baseUrl}bj/eghamat/view`)
      .then((res) => res.json())
      .then((data) => this.setState({ vilas: data.Eghamat }));
  };
  render() {
    return (
      <div>
        <section>
          <div className="panel-header">
            <div class="d-flex align-items-start position-relative">
              <h6 className="mt-0 font-bold-iransanse">
                لیست ویلا ها
              </h6>
              <div class="d-flex align-items-center position-absolute" style={{ top: '27px' }}>
                <div class="box-through"></div>
                <div class="aside-through"></div>
              </div>
            </div>
            <div className="text-left ltr">
              <ManagerTopActionBox
                handleClick={() => {
                  this.props.router.push("/panel/villas/add");
                }}
                titlebase="ویلا"
              />
            </div>
          </div>

          <div className="d-flex align-items-start justify-content-start mt-4">
            {/* child */}
            <div className="col-xl-3 col-lg-3 col-sm-3 d-flex flex-column align-items-start ms-3">
              <label className="font-bold-iransanse font-size-16">جستــجو بر اساس شهــر یا کد ویلا</label>
              <input className="w-100 style-indata" onChange={""} defaultValue={""} />
            </div>
            {/* child */}
            <div className="col-xl-2 col-lg-2 col-sm-2 d-flex flex-column align-items-start ms-3">
              <label className="font-bold-iransanse font-size-16">فیلتر بر اساس وضعیت ویلا</label>
              <select className="w-100 style-indata" value={""} onChange={""}>
                <option value="Active">فعال</option>
                <option value="Not-Active">غیر فعال</option>
                <option value="Cancel">حذف فیلتر</option>
              </select>
            </div>
          </div>

          <div className="row margin-top-10px padding-5px">
            <div>
              {/* <div className="filter-list-box background-white">
              <div className="filter-list-heading">
                <span className="color-textpill">
                  <FontAwesomeIcon icon={faCog} />
                  فیلترها
                </span>
              </div>

              <input
                type="text"
                placeholder="جستجو براساس شهر نام یا کد ویلا"
                className="input-search filter-list-input"
              />

              <div className="filter-list-management">
                <strong>فیلتر بر اساس وضعیت ویلا</strong>

                <div>
                  <div className="radio">
                    <input
                      type="checkbox"
                      className="radio"
                      name="accepted"
                      id="accepted"
                    />
                  </div>
                  <label className="font-size-14" htmlFor="accepted">
                    تایید شده
                  </label>
                </div>

                <div>
                  <div className="radio">
                    <input
                      type="checkbox"
                      className="radio"
                      name="unaccepted"
                      id="unaccepted"
                    />
                  </div>
                  <label className="font-size-14" htmlFor="unaccepted">
                    تایید نشده
                  </label>
                </div>
              </div>
            </div> */}
            </div>
            <div className="col-lg-9">
              {this.state.vilas.map((vila) => (
                <div>
                  <div className={` row ${styles["card"]}`}>
                    <div className="col-lg-2 col-5">
                      <img
                        width=""
                        height=""
                        src="/images/flight-parallax.jpg"
                        className="rounded img-fluid img-responsive m-3"
                        alt="بلبطجا - پیشنمایش ویلا"
                      />
                    </div>
                    <div className="col-lg-10">
                      <div className={styles['villa-information-content']}>
                        <div className="col-lg-3 col-6">
                          <p className="font-size-14 font-bold-iransanse no-margin">
                            {vila.Name}
                          </p>
                          <p className="font-size-13 no-margin">
                            {vila.CityName}
                          </p>
                          <p className="color-textpill font-size-13 visible-xs">
                            (کد :1746)
                          </p>
                          <div className="text-right visible-xs">
                            <a
                              className={
                                stylesManage["management-black-outlined-button"]
                              }
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </a>
                            <a
                              className={
                                stylesManage["management-black-outlined-button"]
                              }
                            >
                              <FontAwesomeIcon icon={faDollarSign} />
                            </a>
                            <a
                              className={
                                stylesManage["management-black-outlined-button"]
                              }
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </a>
                          </div>
                          <p className="start-box no-margin hidden-xs">
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                          </p>
                        </div>
                        <div className="col-lg-4 hidden-xs">
                          <p className={styles['parent-option']}>
                            موقعیت: {vila.AddressName}
                          </p>
                          <p className={styles['parent-option']}>
                            کد موقت ویلا: 0
                          </p>
                          <p className={styles['parent-option']}>
                            نام صاحب ویلا: {vila.AdminName}
                          </p>
                        </div>
                        <div className="col-lg-3 hidden-xs">
                          <div className="text-left mb-3">
                            {/* <Switch height={20} /> */}
                            <span className={styles['text']}>
                              فعال
                            </span>
                          </div>
                          <div className="text-left">
                            <a
                              className={
                                stylesManage["management-black-outlined-button"]
                              }
                            >
                              <FontAwesomeIcon
                                icon={faTimes}
                                onClick={() => {
                                  fetch(`${globals.baseUrl}bj/eghamat/delete`, {
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    method: "POST",
                                    body: JSON.stringify({
                                      EghamatId: vila.EghamatId,
                                    }),
                                  })
                                    .then((res) => res.json())
                                    .then((data) => {
                                      if (data.status === "OK") {
                                        this.getData();
                                      }
                                    });
                                }}
                              />
                            </a>
                            <a
                              className={
                                stylesManage["management-black-outlined-button"]
                              }
                              onClick={() => {
                                this.props.router.push(
                                  `/panel/villas/getReservation`
                                );
                              }}
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </a>
                            <a
                              className={
                                stylesManage["management-black-outlined-button"]
                              }
                              onClick={() => {
                                this.props.router.push(
                                  `/panel/villas/detail/${vila.EghamatId}`
                                );
                              }}
                            >
                              <FontAwesomeIcon icon={faDollarSign} />
                            </a>
                            <a
                              className={
                                stylesManage["management-black-outlined-button"]
                              }
                            >
                              <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() => {
                                  this.props.router.push(
                                    `${this.props.router.asPath}/${vila.EghamatId}`
                                  );
                                }}
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* این ساختار مربوط به قبل است  */}
            {/* <div className="col-lg-3 hidden-xs">
              <div className={styles["filter-box"]}>
                <div className="filter-list-heading">
                  <span className={styles["fliter-header"]}>
                    <span>فیلترها</span>
                    <span>
                      <FontAwesomeIcon icon={faCog} />
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    borderBottom: "1px solid black",
                    width: "95%",
                    marginTop: 8,
                    marginRight: 5,
                  }}
                ></div>
                <input
                  style={{
                    width: "90%",
                    height: 33,
                    marginRight: 11,
                    marginTop: 12,
                  }}
                  type="text"
                  placeholder="جستجو براساس شهر نام یا کد ویلا"
                  className="input-search filter-list-input"
                />

                <div className={styles["filter-box-items"]}>
                  <strong> فیلتر بر اساس وضعیت ویلا</strong>
                  <div
                    style={{
                      borderBottom: "1px solid black",
                      width: "95%",
                      marginTop: 8,
                    }}
                  ></div>

                  <div className={styles["input-button"]}>
                    <div className="radio">
                      <input
                        type="checkbox"
                        className="radio"
                        name="accepted"
                        id="accepted"
                      />
                    </div>
                    <label className="font-size-14" htmlFor="accepted">
                      تایید شده
                    </label>
                  </div>

                  <div className={styles["input-button"]}>
                    {" "}
                    <div className="radio">
                      <input
                        type="checkbox"
                        className="radio"
                        name="unaccepted"
                        id="unaccepted"
                      />
                    </div>
                    <label className="font-size-14" htmlFor="unaccepted">
                      تایید نشده
                    </label>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(Villa);
