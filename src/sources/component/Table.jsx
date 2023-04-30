import React from 'react';
import { moneyFormat } from "../../Utils/SimpleTasks";
import {tableData} from "../../Utils/data"
import { useState } from 'react';
import { useEffect } from 'react';
const Table = ({state}) => {
    // console.log(state);
    const [width, setWidth] = useState(0)
    useEffect(() => {
        setWidth(window.innerWidth)
    },[])
    return (
        <div className={`controller-table mt-3 scroller`}>
            <div className="thead">
                {tableData.map((item)=>(
                    <div className={`head flex-${item.flex} m-flex-${item.mFlex}`}>
                        <span className="font-size-14 font-bold-iransanse">{item.name}</span>
                    </div>
                ))}
            </div>
            <div className="d-detail py-4">
                {tableData.map((item)=>(
                    <div className={`detail flex-${item.flex} m-flex-${item.mFlex}`}>
                        {
                        item.value === 'stat'?
                        <span className={`font-size-14 ${state?.referenceEbank.stat == 'پرداخت موفق'? 'text-success':'text-danger'}`}>{state?.referenceEbank[item.value]}</span>
                        :
                        item.value != 'amount'?
                        <span className={`font-size-14 ${item.value == 'reqPnr'&& 'fontEn'}`}>{state?.referenceEbank[item.value]}</span>
                        :
                        <span className="font-size-14">{moneyFormat(state?.referenceEbank[item.value])} تومان</span>
                        }
                    </div>
                    ))}
            </div>
        </div>
    );
};

export default Table;