import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import RouteButtons from "./RouteButtons.components";
import { withRouter } from "next/router";

const Profile = () => {
  return (
    <section>
      <div className="border-bottom-black ">
        <div>
          <p>
            <FontAwesomeIcon icon={faUserAlt} className="color-textpill" />
            <span className=" font-size-13 font-bold-iransanse mx-2">
              اطلاعات کاربر
            </span>
          </p>
        </div>
      </div>
      <div>
        <div
          className="card my-4"
          style={{ borderRadius: "15px", border: "transparent" }}
        >
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
                  <div className="col-lg-7 text-box">------</div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">نام خانوادگی</div>
                  <div className="col-lg-7 text-box">-------</div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">شماره همراه</div>
                  <div className="col-lg-7 text-box">-------</div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">کد ملی</div>
                  <div className="col-lg-7 text-box">--------</div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">شماره پاسپورت</div>
                  <div className="col-lg-7 text-box">---------</div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">نام پدر</div>
                  <div className="col-lg-7 text-box">----------</div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">تاریخ تولد</div>
                  <div className="col-lg-7 text-box">-----------</div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">معرف</div>
                  <div className="col-lg-7 text-box">----</div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">آدرس</div>
                  <div className="col-lg-7 text-box"></div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">وضعیت تاهل</div>
                  <div className="col-lg-7 text-box">مجرد</div>
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

export default withRouter(Profile);
