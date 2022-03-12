import React from "react";
import Row from "./Row";
import axios from "axios";
import globals from "./../../Global";

const CharterList = () => {
  const [agency, setAgency] = React.useState(null);

  const getList = async () => {
    const {data} = await axios.get(
      `${globals.baseUrlNew}BilitAirLines/GetAzhansList`
    );
    setAgency(data);
  };

  React.useEffect(()=>{
    getList()
  },[])
  return (
    <div className="container pt-2 pb-2 pe-2 ps-2">
      <h2 className="text-dark">لیست آژانس های چارتر</h2>

      <div className="table">
        <div className="container overflow-x-scroll">
          <div className="tabel-responsive mt-4 ">
            <div className="top-list-header">
              <div className="col-3 text-center">
                <h6 className="text-light">کد</h6>
              </div>
              <div className="col-3 text-center">
                <h6 className="text-light">نام</h6>
              </div>
              <div className="col-3 text-center">
                <h6 className="text-light">آدرس</h6>
              </div>
              <div className="col-3 text-center">
                <h6 className="text-light">رفتن به سایت</h6>
              </div>
            </div>

            {agency != null ? (
              agency.map((option, index) => (
                <Row option={option} index={index} key={index} />
              ))
            ) : (
              <div className="text-center pt-2 pb-2">
                <h5 className="text-dark">درحال پردازش...</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharterList;
