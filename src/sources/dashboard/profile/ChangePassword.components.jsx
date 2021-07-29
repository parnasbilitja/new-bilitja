import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../../../styles/PrimaryButton.module.scss";
import RouteButtons from "./RouteButtons.components";
import { useRouter, withRouter } from "next/router";

const ChangePassword = () => {
  const router = useRouter();
  return (
    <section>
      <div className="border-bottom-black">
        <div>
          <FontAwesomeIcon icon={faLock} className="color-textpill" />
          &nbsp;&nbsp;
          <span className="no-margin font-size-13 font-bold-iransanse">
            تغییر گذرواژه
          </span>
        </div>
      </div>
      <form className="mb-4">
        <div className="row">
          <div className="col-lg-4  form-groupe my-3">
            <label className="font-bold-iransanse">گذرواژه فعلی:</label>
            <input type="password" className="col-12 change-password-input" />
          </div>
          <div className="col-lg-4  form-groupe my-3">
            <label className="font-bold-iransanse">گذرواژه جدید:</label>
            <input type="password" className="col-12 change-password-input" />
          </div>
          <div className="col-lg-4  form-groupe my-3">
            <label className="font-bold-iransanse">تکرار گذرواژه جدید:</label>
            <input type="password" className="col-12 change-password-input" />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-lg-8  ">
            <button
              className={`${styles["primary-button"]}  font-bold-iransanse mb-1 `}
            >
              تغییر گذرواژه
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
      </form>
    </section>
  );
};

export default withRouter(ChangePassword);
