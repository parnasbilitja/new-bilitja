import React from "react";

const Loader = () => {
  return (
    <>
      <div className="loader-data d-flex flex-column align-items-center justify-content-center" style={{ width: '100%', height: '25vh' }}>
        <div className="image">
          <img src="/images/Loading_Circle.gif" width={'150px'} height={'150px'} />
        </div>
        <div className="text mt-5">
          <span className="font-yekan font-bold font-size-24">لــطفا صــبر کـنید</span>
        </div>
      </div>
    </>
  );
};
export default Loader;