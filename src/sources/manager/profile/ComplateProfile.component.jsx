import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../../../styles/PrimaryButton.module.scss";
import RouteButtons from "./RouteButtons.components";
import { withRouter } from "next/router";

const ComplateProfile = () => {
  return (
    <section>
      <div className="border-bottom-black panel-header">
        <div>
          <FontAwesomeIcon icon={faUserAlt} className="color-textpill" />
          &nbsp;&nbsp;
          <span className="no-margin font-size-13 font-bold-iransanse">
            تکمیل اطلاعات
          </span>
        </div>
      </div>
      <div>
        <div className="card my-4 complate-profile-cnt">
          <form>
            <div className="container-fluid">
              <div className="row my-3">
                <div className="col-lg-4 text-center">
                  <img
                    src="https://profiles.utdallas.edu/img/default.png"
                    alt="بلیطجا - عکس پروفایل کاربر"
                    className="img-fluid img-responsive rounded-circle border-black profile-img"
                  />
                </div>
                <div className="col-lg-4">
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">نام</div>
                    <div className="col-lg-8">
                      <input className="col-12 complate-profile-input" />
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">نام خانوادگی</div>
                    <div className="col-lg-8">
                      <input className="col-12 complate-profile-input" />
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">شماره همراه</div>
                    <div className="col-lg-7 text-box">0912547856</div>
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">کد ملی</div>
                    <div className="col-lg-8">
                      <input className="col-12 complate-profile-input" />
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">شماره پاسپورت</div>
                    <div className="col-lg-8">
                      <input className="col-12 complate-profile-input" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">نام پدر</div>
                    <div className="col-lg-8">
                      <input className="col-12 complate-profile-input" />
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">تاریخ تولد</div>
                    <div className="col-lg-8">
                      <input className="col-12 complate-profile-input" />
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">معرف</div>
                    <div className="col-lg-8">
                      <input className="col-12 complate-profile-input" />
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">آدرس</div>
                    <div className="col-lg-8">
                      <input className="col-12 complate-profile-input" />
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">وضعیت تاهل</div>
                    <div className="col-lg-8">
                      <input className="col-12 complate-profile-input" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-4 mb-3 mt-5">
              <button
                className={`${styles["primary-button"]} py-2 font-bold-iransanse `}
              >
                ثبت اطلاعات
              </button>
            </div>
          </form>
        </div>
      </div>
      <RouteButtons />
    </section>
  );
};

export default withRouter(ComplateProfile);
