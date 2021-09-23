import React from "react";
import { connect } from "react-redux";
import { selcetAccountBox } from "../../Redux/UI/ui.reselect";
import { accountBoxModify } from "../../Redux/UI/ui.action";
import Login from "./Login.component";
import Authentication from "./Authentication.component";
import Register from "./Register.component";
import ForgetPassword from "./ForgetPassword.component";
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    return (
      <>
        {this.props.accountBox.type == "login" ? (
          <Login mobile={this.state.mobile} handleChange={this.handleChange} />
        ) : null}
        {this.props.accountBox.type == "authentication" ? (
          <Authentication mobile={this.state.mobile} />
        ) : null}
        {this.props.accountBox.type == "register" ? <Register /> : null}
        {this.props.accountBox.type == "forget" ? <ForgetPassword /> : null}
        {/* {
                this.props.accountBox.type=="forget"?
                    <ForgetPassword/>
                :
                null
            } */}
      </>
    );
  }
}
const mapStatesToProps = (state) => ({
  accountBox: selcetAccountBox(state),
});
export default connect(mapStatesToProps)(Account);
