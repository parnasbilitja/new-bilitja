import React from 'react';
import Paginate from "../Components/NewTours/Components/subComponents/Paginate";

const Pouya = () => {
    return (
        <div style={{padding:'1rem',overflowY:'scroll'}}>
            <Paginate to={100} apiCall={(val)=>{console.log(val);}}/>
        </div>
    );
};

export default Pouya;
