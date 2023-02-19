import React, { useEffect } from "react";
import styles from "../../../styles/MessageBox.module.scss";

import { connect } from "react-redux";
import { selectMessageBox } from "../../Redux/UI/ui.reselect";
import { messageBoxModify } from "../../Redux/UI/ui.action";
// this component opens when ever a messsage is goigng to be shown to user...throughout the project
const MessageBox = (props) => {
  // console.log(props.messageBox);
  useEffect(() => {
    if (props.messageBox.state) {
      // message disapears after 4 seconds
      setTimeout(() => {
        props.messageBoxModify({
          color:'',
          state: false,
          message: "لطفا اطلاعات را تکمیل کنید.",
        });
      }, 4000);
    }
  },[props.messageBox.state])

  // componentDidUpdate() {
    
  // }
    return (
      <div className="d-flex justify-content-center">
        {props.messageBox.state &&
        <div className={`${styles["messagebox-parent"]}`}>
        <div
        className={` ${styles["messagebox"]} ${`${props.messageBox.color ?'bg-success':'bg-danger'}`
      }`}
      >
        <span dangerouslySetInnerHTML={{__html:props.messageBox.message}} />
        </div>
      </div>
      }
      </div>
    );
}
const mapStatesToProps = (state) => ({
  messageBox: selectMessageBox(state),
});
const mapDispatchestToProps = (dispatch) => ({
  messageBoxModify: (value) => dispatch(messageBoxModify(value)),
});
export default connect(mapStatesToProps, mapDispatchestToProps)(MessageBox);
