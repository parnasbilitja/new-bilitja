import React from "react";

export const Loader = () => {
  return (
    <>
      <div className="loader-data d-flex flex-column align-items-center justify-content-center" style={{ width: '100%', height: '35vh' }}>
        <div className="image">
          <img src="../../Images/Loading_Circle2.gif" width={'150px'} height={'150px'} alt="loader" />
        </div>
        <div className="text mt-5">
          <span className="font-yekan font-bold font-size-24">لــطفا صــبر کـنید</span>
        </div>
      </div>
    </>
  );
};
