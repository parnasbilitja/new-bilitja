import React from "react";
import Base from "../Components/home/Base";
const App = (props) =>  {
    return (
      <div className="bodyVar" >
        <Base {...props} />
      </div>
    );
  }

export default App;
