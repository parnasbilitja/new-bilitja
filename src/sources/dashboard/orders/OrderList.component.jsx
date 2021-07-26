import { withRouter } from "next/router";

const OrderList = () => {
  return (
    <section>
      <div className="border-bottom-black panel-header">
        <div>
          &nbsp;&nbsp;
          <span className="no-margin font-size-13 font-bold-iransanse">
            سفارشات
          </span>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <th className="font-bold-iransanse" style={{ fontSize: "12px" }}>
                نام
              </th>
              <th className="font-bold-iransanse" style={{ fontSize: "12px" }}>
                ساعت
              </th>
              <th className="font-bold-iransanse" style={{ fontSize: "12px" }}>
                تاریخ
              </th>
              <th className="font-bold-iransanse" style={{ fontSize: "12px" }}>
                وضعیت
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default withRouter(OrderList);
