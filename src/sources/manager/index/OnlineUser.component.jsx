import React from "react";

export const OnlineUser = () => {
  return (
    <section className="card p-3" style={{ borderRadius: "15px" }}>
      <div>
        <div>
          <h6 className=" font-bold-iransanse">کاربران آنلاین</h6>
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
                نام خانوادگی
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>Jacob</td>
            </tr>
            <tr>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
