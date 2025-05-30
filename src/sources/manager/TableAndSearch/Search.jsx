import React, { useState } from 'react';

const Search = ({setSearchBar,searchBar}) => {
    const searchBarHandler = (e) =>{
        e.preventDefault();
        setSearchBar(e.target.value);
      };
    return (
        <div className="c-input col-12 position-relative pt-2">
            <input type="text" value={searchBar} onChange={e=>searchBarHandler(e)} placeholder='جستجو...' class="w-100 pe-2" style={{height: 43,outline: "none",borderRadius: 8,border:"1px solid #fff",boxShadow: "0 0 4px #b9b0b0"}}  />
            <div className="ic-search  position-absolute" style={{left: 10,top: 17}}>
                <svg width="25" height="25" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="14.0569" cy="14.6788" rx="8.9241" ry="8.94638" stroke="#CCD2E3" strokeWidth="2"></ellipse>
                    <path d="M14.059 10.8457C13.5567 10.8457 13.0594 10.9449 12.5954 11.1376C12.1313 11.3302 11.7097 11.6127 11.3546 11.9687C10.9994 12.3247 10.7177 12.7474 10.5255 13.2126C10.3333 13.6778 10.2344 14.1764 10.2344 14.6799" stroke="#CCD2E3" strokeWidth="2" strokeLinecap="round"></path>
                    <path d="M25.5316 26.1818L21.707 22.3477" stroke="#CCD2E3" strokeWidth="2" strokeLinecap="round"></path>
                </svg>
            </div>
        </div>
    );
};

export default Search;
