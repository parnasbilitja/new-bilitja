import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../../../styles/PrimaryButton.module.scss";
import RouteButtons from "./RouteButtons.components";
import { useRouter, withRouter } from "next/router";

const ComplateProfile = () => {
  const router = useRouter();
  return (
    <section>
      <div className="border-bottom-black">
        <div>
          <FontAwesomeIcon icon={faUserAlt} className="color-textpill" />
          &nbsp;&nbsp;
          <span className="no-margin font-size-13 font-bold-iransanse">
            تکمیل اطلاعات
          </span>
        </div>
      </div>
      <div>
        <div
          className="card my-4"
          style={{ borderRadius: "15px", border: "transparent" }}
        >
          <form>
            <div className="container-fluid">
              <div className="row my-3">
                <div className="col-lg-4 text-center">
                  <img
                    src="https://profiles.utdallas.edu/img/default.png"
                    alt="User Profile"
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
                    <div className="col-lg-7 text-box">--------</div>
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
              <div className="row my-2">
                <div className="col-lg-8  ">
                  <button
                    className={`${styles["primary-button"]}  font-bold-iransanse mb-1 `}
                  >
                    ثبت اطلاعات
                  </button>
                </div>
                <div className="col-lg-4">
                  <button
                    className={`btn btn-danger col-12 py-2 font-bold-iransanse mb-1 `}
                    onClick={() => router.push("/dashboard/profile")}
                    style={{ height: "3em" }}
                    type="button"
                  >
                    انصراف
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default withRouter(ComplateProfile);
