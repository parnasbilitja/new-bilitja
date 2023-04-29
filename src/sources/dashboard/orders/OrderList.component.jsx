import axios from "axios";
import globals from "./../../Global";
import { withRouter } from "next/router";
import { useEffect, useState } from "react";
import Table from "./Table";

const OrderList = () => {

  const [state,setState] = useState(null)

  const getList = async () => {
     await axios.get(`${globals.baseUrlNew}Auth/reports/${localStorage.getItem("token")}/1a157116-a01a-4027-ab10-74098ac63815`
    ).then((r) => {setState(r.data)})
    // setState(data)
  };

  useEffect(() => {
    getList();
    // console.log(state);
  }, []);


  return (
    <section>
      <div className="position-relative">
        <h6 className="mt-0 font-bold-iransanse">
          پیگیری
        </h6>
        <div className="d-flex align-items-center">
          <div className="box-through"></div>
          <div className="aside-through"></div>
        </div>
      </div>
                
        <Table props={state && state.reportEbank} />

    </section>
  );
};

export default withRouter(OrderList);
