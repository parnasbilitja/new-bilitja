import React from 'react';
import { moneyFormat } from "../../Utils/SimpleTasks";
import {tableData} from "../../Utils/data"
const Table = ({state}) => {
    return (
        <div className="controller-table mt-3 scroller">
            <div className="thead">
                {tableData.map((item)=>(
                    <div className={`head flex-${item.flex} m-flex-${item.mFlex}`}>
                        <span className="font-size-14 font-bold-iransanse">{item.name}</span>
                    </div>
                ))}
            </div>
            <div className="d-detail py-5">
                {tableData.map((item)=>(
                    <div className={`detail flex-${item.flex} m-flex-${item.mFlex}`}>
                        {item.value != 'amount'?
                        <span className="font-size-14">{state?.referenceEbank[item.value]}</span>
                        :
                        <span className="font-size-14">{moneyFormat(state?.referenceEbank[item.value])}</span>
                        }
                    </div>
                    ))}
            </div>
        </div>
    );
};

export default Table;