import React, { useEffect } from "react";
import { useState } from "react";
import { Loader } from "../../Utils/Loader";
const InputValues = ({setSearch, search, name, months}) => {
  const [hide, setHide] = useState(false)
  const searchHandler = (value='',slug='',cityName,id) => {
    setHide(true)
    setSearch({
        ...search,
        [name]:slug==''?value:slug,
        value:slug==''? cityName:search.value,
        id:id
    })
  }
  useEffect(()=>{
    console.log(name);
    setHide(false)
  },[months,search])
  return (
    <>
    {!hide &&
    <div
      style={{
        maxHeight: 140,
        overflowY: "auto",
        background: "#fff",
        borderRadius: 8,
        width: "100%",
        marginTop: 5,
        padding: "0 12px",
        border: '1px solid #cfd3d8',
        cursor: "pointer",
      }}
      className="suggestion-box"
    >
      {months.length > 1 ? months.map((item) => (
        <>
          <div key={item.value}
                onClick={() => {searchHandler(item.value,item.slug,item.name,item.id)}}>
            <span className="font-size-14">
              {item.name}
            </span>
          </div>
        </>
      ))
      :<Loader/>
    }
    </div>
    }
    </>
  );
};
export default InputValues
