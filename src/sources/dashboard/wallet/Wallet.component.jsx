import { withRouter } from "next/router";

const WalletBalanc = () => {
  return (
    <section className="container-fluid">
      <div className="row">
        <div className="card text-left py-3" style={{ borderRadius: "15px" }}>
          <h6 className="font-bold-iransanse mx-3">مانده حساب: 0 تومان</h6>
        </div>
        <div className=" col-lg-6">
          <div className="card mt-4 p-3" style={{ borderRadius: "15px" }}>
            <div className="border-bottom-black panel-header">
              <div>
                &nbsp;&nbsp;
                <span className="no-margin font-size-13 font-bold-iransanse">
                  تراکنش
                </span>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-sm table-striped">
                <thead>
                  <tr>
                    <th
                      className="font-bold-iransanse"
                      style={{ fontSize: "12px" }}
                    >
                      تاریخ
                    </th>
                    <th
                      className="font-bold-iransanse"
                      style={{ fontSize: "12px" }}
                    >
                      مبلغ
                    </th>
                    <th
                      className="font-bold-iransanse"
                      style={{ fontSize: "12px" }}
                    >
                      توضیحات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">2012/06/15</th>
                    <td>10.000</td>
                    <td>Otto</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card mt-4 p-3" style={{ borderRadius: "15px" }}>
            <div className="border-bottom-black panel-header pb-3">
              <div>
                &nbsp;&nbsp;
                <span className="no-margin font-size-13 font-bold-iransanse">
                  سفارشات
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withRouter(WalletBalanc);
