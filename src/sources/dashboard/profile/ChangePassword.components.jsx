import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../../../styles/PrimaryButton.module.scss";
import RouteButtons from "./RouteButtons.components";
import { useRouter, withRouter } from "next/router";
import { useEffect, useState } from "react";
import globals from "./../../Global";
import { messageBoxModify } from "./../../../Redux/UI/ui.action";
import { connect } from "react-redux";

const ChangePassword = (props) => {
  const router = useRouter();
  const [state, setState] = useState({
    password: "",
    passwordnew: "",
    confirm_password: "",
    UserId: "",
  });
  console.log(state);
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      UserId: localStorage.getItem("token"),
    }));
  }, []);

  const handleSetPassword = (event) => {
    event.preventDefault();
    if (state.passwordnew !== "" && state.confirm_password !== "") {
      if (state.passwordnew == state.confirm_password) {
        fetch(`${globals.baseUrlNew}account/auth/setPassword`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            UserId: state.UserId,
            password: state.password,
            passwordnew: state.passwordnew,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "-100") {
              props.messageBoxModify({
                state: true,
                message: data.message,
              });
            } else if (data.status === "0") {
              props.messageBoxModify({
                state: true,
                message: "گذرواژه شما با موفقیت تغییر یافت",
              });
              setState({
                password: "",
                passwordnew: "",
                confirm_password: "",
              });
            } else {
              props.messageBoxModify({
                state: true,
                message: "از اتصال خود به اینترنت اطمینان حاصل کنید.",
              });
            }
          })
          .catch((err) => console.log(err));
      } else {
        props.messageBoxModify({
          state: true,
          message: "تکرار گذرواژه با گذرواژه جدید مطابقت ندارد.",
        });
      }
    } else {
      props.messageBoxModify({
        state: true,
        message: "فیلدا هارا پر کنید.",
      });
    }
  };
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
      <form className="mb-4" onSubmit={handleSetPassword}>
        <div className="row">
          <div className="col-lg-4  form-groupe my-3">
            <label className="font-bold-iransanse">گذرواژه فعلی:</label>
            <input
              value={state.password}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
              type="password"
              className="col-12 change-password-input"
            />
          </div>
          <div className="col-lg-4  form-groupe my-3">
            <label className="font-bold-iransanse">گذرواژه جدید:</label>
            <input
              value={state.passwordnew}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  passwordnew: e.target.value,
                }))
              }
              type="password"
              className="col-12 change-password-input"
            />
          </div>
          <div className="col-lg-4  form-groupe my-3">
            <label className="font-bold-iransanse">تکرار گذرواژه جدید:</label>
            <input
              value={state.confirm_password}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  confirm_password: e.target.value,
                }))
              }
              type="password"
              className="col-12 change-password-input"
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-lg-8 mb-2">
            <button
              className={`${styles["primary-button"]}  font-bold-iransanse py-2  `}
              type="submit"
            >
              تغییر گذرواژه
            </button>
          </div>
          <div className="col-lg-4 mb-2">
            <button
              className={`btn btn-outline-danger col-12 py-2 font-bold-iransanse  `}
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

const mapDispatchesToProps = (dispatch) => ({
  messageBoxModify: (value) => dispatch(messageBoxModify(value)),
});

export default connect(null, mapDispatchesToProps)(ChangePassword);
