import React from 'react';
import { moneyFormat } from '../../../Utils/SimpleTasks';

const PricesRow = ({ foroshAll, buyAll, Profit, Transaction,reserving }) => {
    return (
        <div className="d-detail d-flex align-items-center" >
            {Transaction!= true &&
            <>
                <div className={`detail flex-7 m-flex-35`}>
                <span className="font-size-14"></span>
                </div>
                <div className={`detail flex-12 m-flex-35`}>
                <span className="font-size-14"></span>
                </div>
            </>
            }
            {reserving == true &&
            <>
              <div className={`detail flex-10 m-flex-40`}>
                <span className="font-size-14"></span>
              </div>
              <div className={`detail flex-15 m-flex-15`}>
                <span className="font-size-14"></span>
              </div>
            </>}
            <div className={`detail flex-7 m-flex-35`}>
              <span className="font-size-14"></span>
            </div>
            {/*<div className={`detail flex-7 m-flex-35`}>*/}
            {/*  <span className="font-size-14"></span>*/}
            {/*</div>*/}
            {/*<div className={`detail flex-7 m-flex-35`}>*/}
            {/*  <span className="font-size-14"></span>*/}
            {/*</div>*/}

            {/*<div className={`detail flex-7 m-flex-35`}>*/}
            {/*  <span className="font-size-14"></span>*/}
            {/*</div>*/}
            {/*<div className={`detail flex-7 m-flex-35`}>*/}
            {/*  <span className="font-size-14"></span>*/}
            {/*</div>*/}
            <div className={`detail flex-7 m-flex-${Transaction== true ?'5':"35"}`}>
              <span className="font-size-14"></span>
            </div>
            <div className={`detail flex-7 m-flex-${Transaction== true ?'5':"40"}`}>
              <span className="font-size-14"></span>
            </div>
            <div className={`detail flex-7 m-flex-${Transaction== true ?'2':"40"}`}>
              <span className="font-size-14"></span>
            </div>
            <div className={`detail flex-7 m-flex-${Transaction== true ?'2':"28"}`}>
              <span className="font-size-14"></span>
            </div>
            <div className={`detail flex-8 m-flex-${Transaction== true ?'0':"28"}`}>
              <span className="font-size-14"></span>
            </div>

            <div className={`detail flex-7 m-flex-35`}>
              <span className="font-size-14"></span>
            </div>
            <div className={`detail flex-${Transaction== true?'8':'7'} m-flex-${Transaction== true?'0':'10'}`}>
              <span className="font-size-14"></span>
            </div>

            <div className={`detail flex-${Transaction== true?'12':'7'} m-flex-35`}>
              <span className="font-size-14">{moneyFormat(foroshAll)}</span>
            </div>
            {Transaction!= true &&
            <>
            <div className={`detail flex-7 m-flex-29`}>
              <span className="font-size-14">{moneyFormat(buyAll)}</span>
            </div>
            <div className={`detail flex-7 m-flex-45`}>
              <span className="font-size-14">{moneyFormat(Profit)}</span>
            </div>
            </>}
        </div>
    );
};

export default PricesRow;
