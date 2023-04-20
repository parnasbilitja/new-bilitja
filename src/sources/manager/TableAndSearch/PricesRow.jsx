import React from 'react';
import { moneyFormatrial } from '../../../Utils/SimpleTasks';

const PricesRow = ({ foroshAll, buyAll, Profit, Transaction }) => {
    return (
        <div className="d-detail d-flex align-items-center" >
            {Transaction!= true &&
            <>
                <div className={`detail flex-7 m-flex-7`}>
                <span className="font-size-14"></span>
                </div>
                <div className={`detail flex-12 m-flex-7`}>
                <span className="font-size-14"></span>
                </div>
            </>
            }
                <div className={`detail flex-7 m-flex-7`}>
                <span className="font-size-14"></span>
                </div>
            <div className={`detail flex-7 m-flex-7`}>
              <span className="font-size-14"></span>
            </div>
            <div className={`detail flex-7 m-flex-7`}>
              <span className="font-size-14"></span>
            </div>

            <div className={`detail flex-7 m-flex-7`}>
              <span className="font-size-14"></span>
            </div>
            <div className={`detail flex-7 m-flex-7`}>
              <span className="font-size-14"></span>
            </div>
            <div className={`detail flex-7 m-flex-7`}>
              <span className="font-size-14"></span>
            </div>
            <div className={`detail flex-7 m-flex-7`}>
              <span className="font-size-14"></span>
            </div>
            <div className={`detail flex-7 m-flex-7`}>
              <span className="font-size-14"></span>
            </div>
            <div className={`detail flex-7 m-flex-7`}>
              <span className="font-size-14"></span>
            </div>
            <div className={`detail flex-8 m-flex-7`}>
              <span className="font-size-14"></span>
            </div>
            
            <div className={`detail flex-7 m-flex-7`}>
              <span className="font-size-14"></span>
            </div><div className={`detail flex-7 m-flex-7`}>
              <span className="font-size-14"></span>
            </div>

            <div className={`detail flex-${Transaction== true?'12':'7'} m-flex-7`}>
              <span className="font-size-14">{moneyFormatrial(foroshAll)}</span>
            </div>
            {Transaction!= true &&
            <>
            <div className={`detail flex-7 m-flex-7`}>
              <span className="font-size-14">{moneyFormatrial(buyAll)}</span>
            </div>
            <div className={`detail flex-7 m-flex-7`}>
              <span className="font-size-14">{moneyFormatrial(Profit)}</span>
            </div>
            </>}
        </div>
    );
};

export default PricesRow;