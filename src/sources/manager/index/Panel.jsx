import React from "react";
import { OnlineUser } from "./OnlineUser.component";
import { TopHeaderBox } from "./TopHeaderBox.component";
import { Requests } from "./Request.component";
import { FlightLate } from "./FlightLate.component";
import { Cash } from "./Cash.component";
import { LastReserve } from "./LastReserve.component";

export const Panel = () => {
  return (
    <div>
      <TopHeaderBox />

      <div className="row">
        <div className="col-lg-6">
          <OnlineUser />
        </div>
        <div className="col-lg-6">
          <Requests />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-4">
          <FlightLate />
        </div>
        <div className="col-lg-4">
          <Cash />
        </div>
        <div className="col-lg-4">
          <LastReserve />
        </div>
      </div>
    </div>
  );
};
