import React from 'react';
import Question from './Question';

const Questions = ({data}) => {
    return (
        <div id="questions" class="faq">
            <div class="title-faq">
                <img src="https://hamnavaz.com/img/Document-align-2.svg" width="35" alt="سوالات متداول"/>
                <div class="text">
                    <h2 style={{fontSize: "18px"}}>&nbsp; سوالات متداول
                        تور آنتالیا</h2>
                </div>
            </div>
            <div class="box-faq">
                {data?.map(faq=>(
                    <>
                        <Question faq={faq} />
                    </>
                        ))}
                </div>
            
        </div>
    );
};

export default Questions;