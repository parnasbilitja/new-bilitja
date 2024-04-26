import React from 'react';
import { moneyFormat, moneyFormatrial } from "../../Utils/SimpleTasks";
import { useState } from 'react';
import { useEffect } from 'react';
const Table = ({tableData,state}) => {
    const [width, setWidth] = useState(0)
    useEffect(() => {
        setWidth(window.innerWidth)
        console.log(tableData);
    },[])
    return (
        <div className={`controller-table mt-3 scroller`}>
            <div className="thead">
                {tableData?.map((item)=>(
                    <div className={`head flex-${item.flex} m-flex-${item.mFlex}`}>
                        <span className="font-size-14 font-bold-iransanse">{item.name}</span>
                    </div>
                ))}
            </div>
            <div className="d-detail py-4">
                {tableData?.map((item)=>(
                    <div className={`detail flex-${item.flex} m-flex-${item.mFlex}`}>
                        {
                        item.value === 'stat'?
                        <span className={`font-size-14 ${state.stat == 'پرداخت موفق'? 'text-success':'text-danger'}`}>{state[item.value]}</span>
                        :
                        item.value === 'numADL'?
                        <span className={`font-size-14`}>{state.numADL+state.numCHD+state.numINF}</span>
                        :
                        item.value === 'pathKind'?
                        <span className={`font-size-14`}>{state[item.value]==2?'داخلی':'خارجی'}</span>
                        :
                        item.value === 'sex'?
                        <span className={`font-size-14`}>{state.sex==2?'خانم':'آقا'}</span>
                        :
                        item.value === 'meliat'?
                        <span className={`font-size-14`}>{state.meliat=="IR"?'ایرانی':'غیر ایرانی'}</span>
                        :
                        item.value != 'amount'?
                        <span className={`font-size-14 ${item.value == 'reqPnr'&& 'fontEn'}`}>{state[item.value]}</span>
                        :
                        <span className="font-size-14">{moneyFormatrial(state[item.value])} تومان</span>
                        }
                    </div>
                    ))}
            </div>
        </div>
    );
};

export default Table;