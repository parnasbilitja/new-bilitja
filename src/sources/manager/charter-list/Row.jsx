import React from "react";

const Row = ({ option, index }) => {
  return (
    <div>
      <div
        className={
          index % 2 == 0
            ? "d-flex bg-light align-items-center  pt-1 pb-1"
            : "d-flex bg-muted align-items-center  pt-1 pb-1"
        }
        key={index}
      >
        <div className="col-3 text-center">
          <h6 className="text-dark"> {option.kndsys}</h6>
        </div>
        <div className="col-3 text-center">
          <h6 className="text-dark"> {option.azhansNam}</h6>
        </div>
          <div className="col-3 text-center">
                <h6 className="text-dark">{option.url}</h6>
              </div>
              <div className="col-3 text-center pe-1">
                  <a className="btn btn-primary-1 font-size-12" target="_blank" href={option.url}>
                    باز کردن سایت
                  </a>
              </div>
      </div>
    </div>
  );
};

export default Row;
