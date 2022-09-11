import React, { useState } from "react";
import { connect } from "react-redux";
import { selcetAccountBox } from "../../Redux/UI/ui.reselect";
import { accountBoxModify } from "../../Redux/UI/ui.action";
import Login from "./Login.component";
import Authentication from "./Authentication.component";
import Register from "./Register.component";
import ForgetPassword from "./ForgetPassword.component";
const Account = (props) => {
    const [state,setState] = useState({
      mobile: "",
    });
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({...state,
      [name]: value,
    });
  };
    return (
      <>
        {props.accountBox.type == "login" ? (
          <Login mobile={state.mobile} handleChange={handleChange} />
        ) : null}
        {props.accountBox.type == "authentication" ? (
          <Authentication mobile={state.mobile} />
        ) : null}
        {props.accountBox.type == "register" ? <Register /> : null}
        {props.accountBox.type == "forget" ? <ForgetPassword /> : null}
        {/* {
                props.accountBox.type=="forget"?
                    <ForgetPassword/>
                :
                null
            } */}
      </>
    );
}
const mapStatesToProps = (state) => ({
  accountBox: selcetAccountBox(state),
});
export default connect(mapStatesToProps)(Account);
