import React from "react";
import styles from "../../../styles/MessageBox.module.scss";

import { connect } from "react-redux";
import { selectMessageBox } from "../../Redux/UI/ui.reselect";
import { messageBoxModify } from "../../Redux/UI/ui.action";
// this component opens when ever a messsage is goigng to be shown to user...throughout the project
class MessageBox extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    if (this.props.messageBox.state) {
      // message disapears after 4 seconds
      setTimeout(() => {
        this.props.messageBoxModify({
          state: false,
          message: "adasdasadassdas",
        });
      }, 4000);
    }
  }
  render() {
    return (
      <div className="d-flex justify-content-center">
        <div
        className={` ${styles["messagebox"]} ${
          this.props.messageBox.state
            ? styles["messagebox-show"]
            : styles["messagebox-hidden"]
        }`}
      >
        <span>{this.props.messageBox.message}</span>
      </div>
      </div>
    );
  }
}
const mapStatesToProps = (state) => ({
  messageBox: selectMessageBox(state),
});
const mapDispatchestToProps = (dispatch) => ({
  messageBoxModify: (value) => dispatch(messageBoxModify(value)),
});
export default connect(mapStatesToProps, mapDispatchestToProps)(MessageBox);
