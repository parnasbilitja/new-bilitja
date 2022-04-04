import React from "react";
import style from "./Charetr.module.scss";

const Row = ({ option, index }) => {
  return (
    <div>
      <div className={style["items"]} key={index}>
        <div>{option.kndsys}</div>
        <div>{option.azhansNam}</div>
        <div>{option.url}</div>
        <div>
          <a target="_blank" href={option.url}>
            باز کردن سایت
          </a>
        </div>
      </div>
    </div>
  );
};

export default Row;
