import React, { useEffect, useState } from "react";
import styles from "../../../styles/PrimaryTextInput.module.scss";

const PrimaryTextInputMobile = (props) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  return props.readonlyattr ? (
    <input
      {...props}
      readOnly={width > 420 ? false : true}
      autoComplete="off"
      className="form-input primary-text px-2"
    />
  ) : (
    <input
      {...props}
      readOnly={width > 420 ? false : true}
      autoComplete="off"
      className="form-input primary-text px-2 rounded "
    />
  );
};
export default PrimaryTextInputMobile;
