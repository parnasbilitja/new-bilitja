import React from "react";

export const Requests = () => {
  return (
    <section className="card my-1 p-3 br-15">
      <div>
        <div>
          <h6 className=" font-bold-iransanse">درخواست ها</h6>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <th className="font-bold-iransanse font-size-12">موضوع</th>
              <th className="font-bold-iransanse font-size-12">توضیحات</th>
              <th className="font-bold-iransanse font-size-12">پروژه</th>
              <th className="font-bold-iransanse font-size-12">وضعیت</th>
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
