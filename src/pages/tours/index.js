import React, {useState} from "react";
import ToursBase from "../../Components/tours/ToursBase";
import Scrolltoprefresh from "../../sources/component/Scrolltoprefresh";

const index = () => {
    const [tourSwitch, setTourSwitch] = useState("package-tour");
    return (
        <div className="mt-90 bodyVar">
            <Scrolltoprefresh/>
            <ToursBase tourSwitch={tourSwitch} setTourSwitch={()=>setTourSwitch()} />
        </div>
    );
};

export default index;
