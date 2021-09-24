import { withRouter } from "next/router";

const MyVilla = () => {
  return (
    <div className="border-bottom-black panel-header">
      <div>
        &nbsp;&nbsp;
        <span className="no-margin font-size-13 font-bold-iransanse">
          طراحی صفحه
        </span>
      </div>
      <div className="text-left ltr"></div>
    </div>
  );
};

export default withRouter(MyVilla);
