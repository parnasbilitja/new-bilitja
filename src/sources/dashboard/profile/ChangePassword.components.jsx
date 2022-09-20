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
    mobile:localStorage.getItem("mobile"),
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

  const handleSetPassword = () => {
    if (state.passwordnew == "") {
      props.messageBoxModify({
        state: true,
        color:false,
        message: "لطفا فیلد را کامل پر کنید.",
      });
    } else {
      fetch(`${globals.baseUrlNew}auth/setPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserId: localStorage.getItem("token"),
          password: state.password,
          passwordnew: state.passwordnew,
          hostname : "bilitja.com",
          customerId : "1a157116-a01a-4027-ab10-74098ac63815",
          agencyName : "بلیطجا",
          telNumber : "02157874",
  
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 0) {
            props.messageBoxModify({
              state: true,
              color:true,
              message: "گذرواژه شما با موفقیت ثبت شد.",
            });
            localStorage.removeItem("f-token");
            // props.history.push("/")
          } else if (data.status == -100) {
            props.messageBoxModify({
              color:false,
              state: true,
              message: data.message,
            });
          }
        });
    }
  };

  const verifyToken = (e) => {
    setState({...state, password: e.target.valueAsNumber || e.target.value });
    console.log(state.password);
    if (state.password.length > 3 && state.password.length < 5) {
    fetch(`${globals.baseUrlNew}auth/ForgotPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile: state.mobile,
        token: e.target.value.length > 3 ? e.target.value :state.password,
        customerId: "1a157116-a01a-4027-ab10-74098ac63815",
        hostname: "bilitja.com",
        agencyName: "بلیطجا",
        telNumber: "02157874"

      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 0) {
          props.messageBoxModify({
            color:true,
            state: true,
            message: "احراز هویت شما تایید شد.",
          });

          setState({...state,
            showSetPassword: true,
            btn_text: "دریافت کد احراز هویت",
          });
          localStorage.setItem("f-token", data.token);
        } else if (data.status == -100) {
          props.messageBoxModify({
            color:false,
            state: true,
            message: "کد احراز هویت شما صحیح نمی باشد.",
          });
        }
      }); 
    }
  };

  useEffect(() => {
    const verifyToken = () => {
      // setState({...state, password: e.target.valueAsNumber || e.target.value });
      console.log(state.password);
      if (state.password.length > 3 && state.password.length < 5) {
      fetch(`${globals.baseUrlNew}auth/ForgotPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: state.mobile,
          token: state.password,
          customerId: "1a157116-a01a-4027-ab10-74098ac63815",
          hostname: "bilitja.com",
          agencyName: "بلیطجا",
          telNumber: "02157874"
  
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 0) {
            props.messageBoxModify({
              color:true,
              state: true,
              message: "احراز هویت شما تایید شد.",
            });
  
            setState({...state,
              showSetPassword: true,
              btn_text: "دریافت کد احراز هویت",
            });
            localStorage.setItem("f-token", data.token);
          } else if (data.status == -100) {
            props.messageBoxModify({
              color:false,
              state: true,
              message: "کد احراز هویت شما صحیح نمی باشد.",
            });
          }
        }); 
      }
    };
    verifyToken()
  },[state.password])

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
            <label className="font-bold-iransanse">کد احراز هویت:</label>
            <input
              value={state.password}
              maxLength={4}
              onChange={(e) =>{
                setState((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
                // {state.password.length > 2 &&
                verifyToken(e)
              // }
                console.log(e.target.valueAsNumber || e.target.value);
              }
              }
              type="text"
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
            <button onClick={() => {handleSetPassword();router.push("/dashboard/profile")}}
              className={`${styles["primary-button"]}  font-bold-iransanse py-2  `}
              type="submit"
            >
              تغییر گذرواژه
            </button>
          </div>
          <div className="col-lg-4 mb-2">
            <button
              className={`btn btn-outline-danger col-12 py-2 font-bold-iransanse h-3em `}
              onClick={() => router.push("/dashboard/profile")}
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
