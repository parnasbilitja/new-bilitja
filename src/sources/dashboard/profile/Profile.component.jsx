import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import RouteButtons from "./RouteButtons.components";
import { useRouter, withRouter } from "next/router";
import { useEffect, useState } from "react";
import globals from "./../../Global";
import { connect } from "react-redux";
import { SetUserInformation } from "../../../Redux/Dashboard/Profile/profile.action";

const Profile = (props) => {
  const router = useRouter();
  useEffect(() => {
    debugger
    fetch(`${globals.baseUrlNew}auth/profileView`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile: localStorage.getItem("mobile"),
        userid: localStorage.getItem("token"),
        hostname: "bilitja.com",
        customerId: "1a157116-a01a-4027-ab10-74098ac63815",
        agencyName: "بلیطجا",
        telNumber: "02157874",

      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "0") {
          props.setUserInformationAction(data.profilemodel);
        } else {
          // alert("Have Profnlem");
        }
      });

    console.log('sadgh')
  }, [router]);

  return (
    <section>
      <div>
        <div className="position-relative">
          <h6 className="mt-0 font-bold-iransanse">
            اطـلاعات کــاربــر
          </h6>
          <div className="d-flex align-items-center">
            <div className="box-through"></div>
            <div className="aside-through"></div>
          </div>
        </div>
      </div>
      <div>
        {props.user_information.name === null ? (
          <div className="alert alert-warning text-center mt-2">
            <span className="font-size-15">
              {" "}
              مسافر گرامی، لطفا ابتدا از قسمت تکمیل پروفایل تمامی اطلاعات خود را
              تکمیل کنید.
            </span>
            <a
              className="font-bold-iransanse cursor-pointer font-size-14 mx-1"
              onClick={() => router.push("/dashboard/complate-profile")}
            >
              برای دسترسی سریع اینجا کلیک کنید
            </a>
          </div>
        ) : null}
        <div className="card my-4 profile-cnt">
          <div className="container-fluid">
            <div className="row my-3">
              {/* <div className="col-lg-3 text-center">
                <img
                  width=""
                  height=""
                  src={"https://profiles.utdallas.edu/img/default.png"}
                  alt="بلیطجا - عکس پروفایل کاربر"
                  className="img-fluid img-responsive rounded-circle border-black profile-img"
                />
              </div> */}
              <div className="col-lg-9 d-flex flex-wrap align-items-start justify-content-between">
                <div className="flex-48">
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">نام</div>
                    <div className="col-lg-7 text-box">
                      {props.user_information.name !== null
                        ? props.user_information.name
                        : "------"}
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">نام خانوادگی</div>
                    <div className="col-lg-7 text-box">
                      {" "}
                      {props.user_information.family !== null
                        ? props.user_information.family
                        : "------"}
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">شماره همراه</div>
                    <div className="col-lg-7 text-box">
                      {props.user_information.mobile !== null
                        ? props.user_information.mobile
                        : "------"}
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">کد ملی</div>
                    <div className="col-lg-7 text-box">
                      {" "}
                      {props.user_information.meliCod !== null
                        ? props.user_information.meliCod
                        : "------"}
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">شماره پاسپورت</div>
                    <div className="col-lg-7 text-box">
                      {" "}
                      {props.user_information.pasNo !== null
                        ? props.user_information.pasNo
                        : "------"}
                    </div>
                  </div>
                </div>
                <div className="flex-48">
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">جنسیت</div>
                    <div className="col-lg-7 text-box">
                      {props.user_information.gender !== 0
                        ? props.user_information.gender == 1
                          ? "مرد"
                          : "زن"
                        : "------"}
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">تاریخ تولد</div>
                    <div className="col-lg-7 text-box">
                      {" "}
                      {props.user_information.birthDate !== null
                        ? props.user_information.birthDate
                        : "------"}
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">معرف</div>
                    <div className="col-lg-7 text-box">
                      {" "}
                      {props.user_information.mobileMoaref != "" ||
                        props.user_information.mobileMoaref != null
                        ? props.user_information.mobileMoaref
                        : "------"}
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">وضعیت تاهل</div>
                    <div className="col-lg-7 text-box">
                      {" "}
                      {props.user_information.mariedStat !== 0
                        ? props.user_information.mariedStat == 1
                          ? "مجرد"
                          : "متاهل"
                        : "------"}
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="row my-2 w-100">
                    <div className="col-lg-2 title-box ms-1">آدرس</div>
                    <div className="col-xl-12 col-lg-12 col-12 text-box me-0">
                      {" "}
                      {props.user_information.address !== null
                        ? props.user_information.address
                        : "------"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RouteButtons />
    </section>
  );
};

const mapDispatchesToProps = (dispatch) => ({
  setUserInformationAction: (value) => dispatch(SetUserInformation(value)),
});
const mapStateToProps = (state) => ({
  user_information: state.user_information,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchesToProps)(Profile)
);
