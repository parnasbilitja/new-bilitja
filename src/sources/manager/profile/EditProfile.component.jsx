import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../../../styles/PrimaryButton.module.scss";
import RouteButtons from "./RouteButtons.components";
import { withRouter } from "next/router";

const EditProfile = () => {
  return (
    <section>
      <div className="border-bottom-black panel-header">
        <div>
          <FontAwesomeIcon icon={faUserAlt} className="color-textpill" />
          &nbsp;&nbsp;
          <span className="no-margin font-size-13 font-bold-iransanse">
            ویرایش اطلاعات
          </span>
        </div>
      </div>
      <div className="card my-4 edit-profile-cnt">
        <form>
          <div className="container-fluid">
            <div className="row my-3">
              <div className="col-lg-4 text-center">
                <img
                  width=""
                  height=""
                  src="https://profiles.utdallas.edu/img/default.png"
                  alt="بلیطجا - عکس پروفایل کاربر"
                  className="img-fluid img-responsive rounded-circle border-black profile-img"
                />
                <div className="button-wrapper">
                  <span className="label font-bold-iransanse">
                    تغییر پروفایل
                  </span>

                  <input
                    type="file"
                    name="upload"
                    id="upload"
                    className={styles["primary-button"]}
                    placeholder="تغییر پروفایل"
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">نام</div>
                  <div className="col-lg-8">
                    <input
                      defaultValue="value"
                      className="col-12 complate-profile-input"
                    />
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">نام خانوادگی</div>
                  <div className="col-lg-8">
                    <input
                      defaultValue="value"
                      className="col-12 complate-profile-input"
                    />
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">شماره همراه</div>
                  <div className="col-lg-8">
                    <input
                      defaultValue="value"
                      className="col-12 complate-profile-input"
                    />
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">کد ملی</div>
                  <div className="col-lg-8">
                    <input
                      defaultValue="value"
                      className="col-12 complate-profile-input"
                    />
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">شماره پاسپورت</div>
                  <div className="col-lg-8">
                    <input
                      defaultValue="value"
                      className="col-12 complate-profile-input"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">نام پدر</div>
                  <div className="col-lg-8">
                    <input
                      defaultValue="value"
                      className="col-12 complate-profile-input"
                    />
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">تاریخ تولد</div>
                  <div className="col-lg-8">
                    <input
                      defaultValue="value"
                      className="col-12 complate-profile-input"
                    />
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">معرف</div>
                  <div className="col-lg-8">
                    <input
                      defaultValue="value"
                      className="col-12 complate-profile-input"
                    />
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">آدرس</div>
                  <div className="col-lg-8">
                    <input
                      defaultValue="value"
                      className="col-12 complate-profile-input"
                    />
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">وضعیت تاهل</div>
                  <div className="col-lg-8">
                    <input
                      defaultValue="value"
                      className="col-12 complate-profile-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-4 mb-3 mt-5">
            <button
              className={`${styles["primary-button"]} py-2 font-bold-iransanse `}
            >
              ویرایش اطلاعات
            </button>
          </div>
        </form>
      </div>
      <RouteButtons />
    </section>
  );
};

export default withRouter(EditProfile);
