import React, { useEffect, useState } from "react";
import globals from "../../Global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRemoveFormat,
  faTrash,
  faArchway,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { messageBoxModify } from "../../../Redux/UI/ui.action";
import ManagerTopActionBox from "../ManagerTopActionBox.component";
import { useRouter, withRouter } from "next/router";
import styles from "../../../../styles/manager.module.scss";
import stylesTrack from "../../../../styles/TrackOrder.module.scss";

const ShowallCities = (props) => {
  const [cities, setCities] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    fetch(`${globals.baseUrl}bj/city/view`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "OK") {
          setCities(data.City);
        }
      });
  };
  const myRouter = useRouter();

  return (
    <section>
      <div>
        <div className="panel-header">
          <div class="position-relative" style={{ width: '140px' }}>
            <h6 className="mt-0 font-bold-iransanse">
              لیست شهــرها
            </h6>
            <div class="d-flex align-items-center position-absolute" style={{ top: '27px' }}>
              <div class="box-through"></div>
              <div class="aside-through"></div>
            </div>
          </div>
          <div className="text-left ltr">
            <ManagerTopActionBox
              handleClick={() => {
                myRouter.push("/panel/city/add");
              }}
              titlebase="شهــر"
            />
          </div>
        </div>
        <div className="margin-top-10px">
          {cities.map((city) => (
            <div className={styles["management-one-row"]}>
              <span>{city.ProvinceName}</span>
              <span
                onClick={() => {
                  myRouter.push(`${this.props.router.asPath}/${city.CityId}`);
                }}
              >
                {city.CityName}
              </span>

              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => {
                  const answer = window.confirm("آیا از حذف اطمینان دارید");
                  if (answer) {
                    fetch(`${globals.baseUrl}bj/city/delete`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        CityId: city.CityId,
                      }),
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        if (data.status == "OK") {
                          props
                            .messageBoxModify({
                              state: true,
                              color:true,
                              message: "عملیات موفقیت آمیز بود",
                            })
                            .then(() => {
                              getData();
                            });
                        } else {
                          props.messageBoxModify({
                            state: true,
                            color:false,
                            message: data.message,
                          });
                        }
                      });
                  }
                }}
              />
            </div>
          ))}
        </div>

        <div className="my-10">
          {/* filter */}
          <div className="filterData">
            {/* child */}
            <div className="col-xl-3 col-lg-3 col-sm-3 d-flex flex-column align-items-start ms-3">
              <label className="font-bold-iransanse font-size-16">جستــجو بر اساس شهــر یا کد ویلا</label>
              <input className="w-100 style-indata" onChange={""} defaultValue={""} />
            </div>
          </div>
          {/* table struct for all pages dynamics classes custom */}
          <div className="controller-table mt-3 scroller">
            {/* head */}
            <div className="thead d-flex align-items-center">
              <div className="head flex-5 m-flex-15"></div>
              <div className="head flex-7 m-flex-15">
                <span className="font-size-14 font-bold-iransanse">شناسه</span>
              </div>
              <div className="head flex-25 m-flex-50">
                <span className="font-size-14 font-bold-iransanse">نام شهر</span>
              </div>
              <div className="head flex-12 m-flex-20">
                <span className="font-size-14 font-bold-iransanse">عنوان اول</span>
              </div>
              <div className="head flex-12 m-flex-20">
                <span className="font-size-14 font-bold-iransanse">عنوان دوم</span>
              </div>
              <div className="head flex-12 m-flex-20">
                <span className="font-size-14 font-bold-iransanse">عنوان سوم</span>
              </div>
              <div className="head flex-12 m-flex-20">
                <span className="font-size-14 font-bold-iransanse">عنوان سوم</span>
              </div>
              <div className="head flex-12 m-flex-20">
                <span className="font-size-14 font-bold-iransanse">عنوان سوم</span>
              </div>
              <div className="head flex-12 m-flex-20">
                <span className="font-size-14 font-bold-iransanse">عنوان چهارم</span>
              </div>
              <div className="head flex-12 m-flex-20">
                <span className="font-size-14 font-bold-iransanse">عملیات</span>
              </div>
            </div>
            {/* parent detail */}
            <div className="data-detail">
              {/* child loop */}
              <div className="d-detail d-flex align-items-center">
                <div className="detail flex-5 m-flex-15"></div>
                <div className="detail flex-7 m-flex-15">
                  <span className="font-size-14">100056</span>
                </div>
                <div className="detail flex-25 m-flex-50">
                  <span className="font-size-14">رشت</span>
                </div>
                <div className="detail flex-12 m-flex-20">
                  <span className="font-size-14">دیتیل بخش اول</span>
                </div>
                <div className="detail flex-12 m-flex-20">
                  <span className="font-size-14">دیتیل بخش دوم</span>
                </div>
                <div className="detail flex-12 m-flex-20">
                  <span className="font-size-14">دیتیل بخش سوم</span>
                </div>
                <div className="detail flex-12 m-flex-20">
                  <span className="font-size-14">دیتیل بخش سوم</span>
                </div>
                <div className="detail flex-12 m-flex-20">
                  <span className="font-size-14">دیتیل بخش سوم</span>
                </div>
                <div className="detail flex-12 m-flex-20">
                  <span className="font-size-14"> بخش چهارم</span>
                </div>
                <div className="detail flex-12 m-flex-20">
                  {/* ActionCall */}
                  <a href="#" class="actioncall bg-white ml-5 py-2 px-2">
                    <div class="image tooltipcustom d-flex cursor-pointer">
                      <svg width="25" height="25" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0013 28.2652L12.0013 28.2652C11.9882 28.2783 11.9748 28.2917 11.961 28.3054C11.8092 28.4567 11.6171 28.6481 11.4806 28.8897C11.3441 29.1313 11.2793 29.3946 11.2281 29.6027C11.2234 29.6216 11.2189 29.64 11.2144 29.658L12.181 29.899L11.2144 29.658L9.6376 35.9809C9.63481 35.9921 9.63189 36.0037 9.62888 36.0158C9.59215 36.1623 9.54126 36.3652 9.5238 36.5448C9.5037 36.7515 9.49728 37.2035 9.86628 37.5721C10.2353 37.9406 10.6872 37.9337 10.8939 37.9133C11.0735 37.8956 11.2764 37.8445 11.4228 37.8076C11.4348 37.8046 11.4465 37.8017 11.4577 37.7989L11.2174 36.8403L11.4577 37.7989L17.7605 36.2192L17.7606 36.2192C17.7614 36.219 17.7622 36.2188 17.763 36.2186C17.7802 36.2143 17.7978 36.2099 17.8159 36.2055C18.0244 36.1539 18.2884 36.0886 18.5303 35.9513L18.0368 35.0815L18.5303 35.9513C18.7723 35.814 18.9637 35.6209 19.115 35.4684C19.1287 35.4545 19.1421 35.441 19.1552 35.4279L34.5653 19.9793L34.6037 19.9408C34.9025 19.6414 35.193 19.3503 35.4004 19.0779C35.6342 18.7707 35.8538 18.3733 35.8538 17.8606C35.8538 17.3479 35.6342 16.9505 35.4004 16.6434C35.193 16.371 34.9025 16.0799 34.6037 15.7804L34.5653 15.7419L31.6533 12.8227L31.6148 12.7841C31.3147 12.4831 31.0231 12.1906 30.7501 11.9819C30.4425 11.7466 30.044 11.5254 29.5293 11.5254C29.0147 11.5254 28.6162 11.7466 28.3085 11.9819C28.0356 12.1906 27.7439 12.4831 27.4438 12.7841C27.431 12.7969 27.4182 12.8098 27.4053 12.8227L12.0124 28.254L12.0124 28.254L12.0013 28.2652Z" stroke="#279692" strokeWidth="2"></path>
                        <path d="M24.7461 14.9865L30.483 11.1523L36.2199 16.9036L32.3953 22.6548L24.7461 14.9865Z" fill="#279692"></path>
                      </svg>
                      <div class="s-tooltip">
                        <span>ویرایش</span>
                      </div>
                    </div>
                  </a>
                  {/* ActionCall */}
                  <button class="actioncall bg-white ml-5 py-2 px-2">
                    <div class="image tooltipcustom d-flex cursor-pointer">
                      <svg width="25" height="25" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.7852 19.2988L12.7852 15.4647" stroke="#ff383f" strokeWidth={2} strokeLinecap="round"></path>
                        <path d="M17.8828 19.2988L17.8828 15.4647" stroke="#ff383f" strokeWidth={2} strokeLinecap="round"></path>
                        <path d="M3.85938 9.07617H26.8071V9.07617C25.0914 9.07617 24.2336 9.07617 23.6689 9.56799C23.5996 9.62832 23.5346 9.69336 23.4743 9.76264C22.9824 10.3273 22.9824 11.1851 22.9824 12.9008V21.6909C22.9824 23.5765 22.9824 24.5193 22.3967 25.1051C21.8109 25.6909 20.8681 25.6909 18.9824 25.6909H11.684C9.79837 25.6909 8.85556 25.6909 8.26977 25.1051C7.68399 24.5193 7.68399 23.5765 7.68399 21.6909V12.9008C7.68399 11.1851 7.68399 10.3273 7.19217 9.76264C7.13184 9.69336 7.0668 9.62832 6.99752 9.56799C6.43283 9.07617 5.57501 9.07617 3.85938 9.07617V9.07617Z" stroke="#ff383f" strokeWidth={2} strokeLinecap="round"></path>
                        <path d="M12.8702 4.43653C13.0155 4.30065 13.3356 4.18058 13.7809 4.09494C14.2262 4.00931 14.7718 3.96289 15.3331 3.96289C15.8944 3.96289 16.44 4.00931 16.8853 4.09494C17.3306 4.18058 17.6507 4.30065 17.7959 4.43653" stroke="#ff383f" strokeWidth={2} strokeLinecap="round"></path>
                      </svg>
                      <div class="s-tooltip">
                        <span>حذف</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              {/* child loop */}
              <div className="d-detail d-flex align-items-center">
                <div className="detail flex-5 m-flex-10"></div>
                <div className="detail flex-7 m-flex-15">
                  <span className="font-size-14">100056</span>
                </div>
                <div className="detail flex-25 m-flex-50">
                  <span className="font-size-14">رشت</span>
                </div>
                <div className="detail flex-12 m-flex-20">
                  <span className="font-size-14">دیتیل بخش اول</span>
                </div>
                <div className="detail flex-12 m-flex-20">
                  <span className="font-size-14">دیتیل بخش دوم</span>
                </div>
                <div className="detail flex-12 m-flex-20">
                  <span className="font-size-14">دیتیل بخش سوم</span>
                </div>
                <div className="detail flex-12 m-flex-20">
                  <span className="font-size-14">دیتیل بخش سوم</span>
                </div>
                <div className="detail flex-12 m-flex-20">
                  <span className="font-size-14">دیتیل بخش سوم</span>
                </div>
                <div className="detail flex-12 m-flex-20">
                  <span className="font-size-14">دیتیل بخش چهارم</span>
                </div>
                <div className="detail flex-12 m-flex-20">
                  {/* ActionCall */}
                  <a href="#" class="actioncall bg-white ml-5 py-2 px-2">
                    <div class="image tooltipcustom d-flex cursor-pointer">
                      <svg width="25" height="25" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0013 28.2652L12.0013 28.2652C11.9882 28.2783 11.9748 28.2917 11.961 28.3054C11.8092 28.4567 11.6171 28.6481 11.4806 28.8897C11.3441 29.1313 11.2793 29.3946 11.2281 29.6027C11.2234 29.6216 11.2189 29.64 11.2144 29.658L12.181 29.899L11.2144 29.658L9.6376 35.9809C9.63481 35.9921 9.63189 36.0037 9.62888 36.0158C9.59215 36.1623 9.54126 36.3652 9.5238 36.5448C9.5037 36.7515 9.49728 37.2035 9.86628 37.5721C10.2353 37.9406 10.6872 37.9337 10.8939 37.9133C11.0735 37.8956 11.2764 37.8445 11.4228 37.8076C11.4348 37.8046 11.4465 37.8017 11.4577 37.7989L11.2174 36.8403L11.4577 37.7989L17.7605 36.2192L17.7606 36.2192C17.7614 36.219 17.7622 36.2188 17.763 36.2186C17.7802 36.2143 17.7978 36.2099 17.8159 36.2055C18.0244 36.1539 18.2884 36.0886 18.5303 35.9513L18.0368 35.0815L18.5303 35.9513C18.7723 35.814 18.9637 35.6209 19.115 35.4684C19.1287 35.4545 19.1421 35.441 19.1552 35.4279L34.5653 19.9793L34.6037 19.9408C34.9025 19.6414 35.193 19.3503 35.4004 19.0779C35.6342 18.7707 35.8538 18.3733 35.8538 17.8606C35.8538 17.3479 35.6342 16.9505 35.4004 16.6434C35.193 16.371 34.9025 16.0799 34.6037 15.7804L34.5653 15.7419L31.6533 12.8227L31.6148 12.7841C31.3147 12.4831 31.0231 12.1906 30.7501 11.9819C30.4425 11.7466 30.044 11.5254 29.5293 11.5254C29.0147 11.5254 28.6162 11.7466 28.3085 11.9819C28.0356 12.1906 27.7439 12.4831 27.4438 12.7841C27.431 12.7969 27.4182 12.8098 27.4053 12.8227L12.0124 28.254L12.0124 28.254L12.0013 28.2652Z" stroke="#279692" strokeWidth="2"></path>
                        <path d="M24.7461 14.9865L30.483 11.1523L36.2199 16.9036L32.3953 22.6548L24.7461 14.9865Z" fill="#279692"></path>
                      </svg>
                      <div class="s-tooltip">
                        <span>ویرایش</span>
                      </div>
                    </div>
                  </a>
                  {/* ActionCall */}
                  <button class="actioncall bg-white ml-5 py-2 px-2">
                    <div class="image tooltipcustom d-flex cursor-pointer">
                      <svg width="25" height="25" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.7852 19.2988L12.7852 15.4647" stroke="#ff383f" strokeWidth={2} strokeLinecap="round"></path>
                        <path d="M17.8828 19.2988L17.8828 15.4647" stroke="#ff383f" strokeWidth={2} strokeLinecap="round"></path>
                        <path d="M3.85938 9.07617H26.8071V9.07617C25.0914 9.07617 24.2336 9.07617 23.6689 9.56799C23.5996 9.62832 23.5346 9.69336 23.4743 9.76264C22.9824 10.3273 22.9824 11.1851 22.9824 12.9008V21.6909C22.9824 23.5765 22.9824 24.5193 22.3967 25.1051C21.8109 25.6909 20.8681 25.6909 18.9824 25.6909H11.684C9.79837 25.6909 8.85556 25.6909 8.26977 25.1051C7.68399 24.5193 7.68399 23.5765 7.68399 21.6909V12.9008C7.68399 11.1851 7.68399 10.3273 7.19217 9.76264C7.13184 9.69336 7.0668 9.62832 6.99752 9.56799C6.43283 9.07617 5.57501 9.07617 3.85938 9.07617V9.07617Z" stroke="#ff383f" strokeWidth={2} strokeLinecap="round"></path>
                        <path d="M12.8702 4.43653C13.0155 4.30065 13.3356 4.18058 13.7809 4.09494C14.2262 4.00931 14.7718 3.96289 15.3331 3.96289C15.8944 3.96289 16.44 4.00931 16.8853 4.09494C17.3306 4.18058 17.6507 4.30065 17.7959 4.43653" stroke="#ff383f" strokeWidth={2} strokeLinecap="round"></path>
                      </svg>
                      <div class="s-tooltip">
                        <span>حذف</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const mapDispatchesToProps = (dispatch) => ({
  messageBoxModify: async (value) => dispatch(messageBoxModify(value)),
});
export default withRouter(connect(null, mapDispatchesToProps)(ShowallCities));
