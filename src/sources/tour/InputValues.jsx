import React from "react";
const InputValues = ({setSearch, search, name, months}) => {
  console.log({setSearch, search, name});
  const searchHandler = (value='',slug='',cityName) => {
    setSearch({
        ...search,
        [name]:slug==''?value:slug,
        value:slug==''? cityName:search.value
    })
  }
  return (
    <div
      style={{
        maxHeight: 200,
        overflowY: "auto",
        background: "#fff",
        borderRadius: 8,
        width: "100%",
        marginTop: 5,
        padding: "0 12px",
        border: '1px solid #cfd3d8',
        cursor: "pointer",
      }}
      className="suggestion-box "
    >
      {months.map((item) => (
                  <div key={item.value}
                        onClick={() => {searchHandler(item.value,item.slug,item.name)}}>
                    <span className="font-size-14">
                      {item.name}
                    </span>
                  </div>
                ))
        }
    </div>
  );
};
export default InputValues
