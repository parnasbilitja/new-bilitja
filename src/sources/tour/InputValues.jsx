import React from "react";
import { useState } from "react";
const InputValues = ({setSearch, search, name, months}) => {
  const [hide, setHide] = useState(false)
  const searchHandler = (value='',slug='',cityName) => {
    setHide(true)
    setSearch({
        ...search,
        [name]:slug==''?value:slug,
        value:slug==''? cityName:search.value
    })
  }
  return (
    <>
    {/* {!hide && */}
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
      {months
      // .filter(post => {
      //   if (!name == 'month') {
      //     if (search.slug === '') {
      //         return post;
      //     } else if (post.name.includes(search.slug)) {
      //         return post;
      //     }
      //   }})
        .map((item) => (
        <>
          <div key={item.value}
                onClick={() => {searchHandler(item.value,item.slug,item.name)}}>
            <span className="font-size-14">
              {item.name}
            </span>
          </div>
        </>
      ))}
    </div>
    {/* // } */}
    </>
  );
};
export default InputValues
