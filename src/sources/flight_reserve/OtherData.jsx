import React from 'react';

const OtherData = (props) => {
    return (
        <div className="col-lg-6 col-md-12 col-12 px-4">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-6 padding-3px">
                    <div>
                        <input
                            value={props.state.mobileSubmiter}
                            type="text"
                            placeholder="شماره همراه"
                            name="mobileSubmiter"
                            onChange={(e) => { props.handleChange(e) }}
                            className="col-12 reserve-input px-2 h-2em"
                            maxLength={11}
                        />
                    </div>
                    <span className="color-secondary font-size-14">
                        {
                            props.state.mobileSubmiter?.length < 11 && props.state.mobileSubmiter != '' ? 'شماره همراه باید ۱۱ رقمی باشد' :
                                props.state.mobileSubmiter == '' && props.numbers2 ? props.state.mobileSubmiterErr :
                                    ''}
                    </span>
                </div>
                <div className="col-lg-6 col-md-6 col-6 padding-3px">
                    <div>
                        <input
                            maxLength={11}
                            value={props.state.phoneSubmiter}
                            className="col-12 reserve-input px-2 h-2em"
                            type="text"
                            placeholder="شماره ثابت"
                            name="phoneSubmiter"
                            onChange={(e) => props.handleChange(e)}
                        />
                    </div>
                    <span className="color-secondary  font-size-14">
                        {props.state.phoneSubmiter == '' && props.numbers && props.state.phoneSubmiterErr}
                    </span>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-lg-6 col-md-6 col-12 padding-3px">
                    <div>
                        <input
                            className="col-12 reserve-input px-2 h-2em"
                            placeholder="ایمیل (اختیاری)"
                            name="email"
                            onChange={(e) => props.handleChange(e)}
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12 padding-3px">
                    <div>
                        <input
                            className="col-12 reserve-input px-2 h-2em"
                            placeholder="کد تخفیف (اختیاری)"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtherData;