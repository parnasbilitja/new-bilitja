import React from "react";

export const LastReserve = () => {
  return (
    <section className="card my-1 p-3" style={{ borderRadius: "15px" }}>
      <div>
        <div>
          <h6 className=" font-bold-iransanse">آخرین سفارشات</h6>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <th className="font-bold-iransanse" style={{ fontSize: "12px" }}>
                موضوع
              </th>
              <th className="font-bold-iransanse" style={{ fontSize: "12px" }}>
                توضیحات
              </th>
              <th className="font-bold-iransanse" style={{ fontSize: "12px" }}>
                پروژه
              </th>
              <th className="font-bold-iransanse" style={{ fontSize: "12px" }}>
                وضعیت
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>Otto</td>
              <td>Otto</td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>Jacob</td>
              <td>Jacob</td>
              <td>Jacob</td>
            </tr>
            <tr>
              <td>the Bird</td>
              <td>the Bird</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
