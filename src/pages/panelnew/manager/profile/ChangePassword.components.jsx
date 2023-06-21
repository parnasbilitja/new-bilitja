import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../../../../styles/PrimaryButton.module.scss";
import RouteButtons from "./RouteButtons.components";
import { withRouter } from "next/router";

const ChangePassword = () => {
  return (
    <section>
      <div className="border-bottom-black panel-header">
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
        <div className="text-right w-25">
          <button
            className={`${styles["primary-button"]} font-bold-iransanse change-password-btn`}
          >
            تغییر گذرواژه
          </button>
        </div>
      </form>
      <RouteButtons />
    </section>
  );
};

export default withRouter(ChangePassword);
