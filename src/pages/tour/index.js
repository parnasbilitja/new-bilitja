import React, {useState} from "react";
import ToursBase from "../../Components/tours/ToursBase";

const index = () => {
    const [tourSwitch, setTourSwitch] = useState("tour");
  return (
    <div className="mt-90 bodyVar">
      <ToursBase tourSwitch={tourSwitch} setTourSwitch={()=>setTourSwitch()}/>
    </div>
  );
};

export default index;
