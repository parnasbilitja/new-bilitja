import React from 'react';

const Submit = (props) => {
    return (
        <div className="col-lg-6 col-md-12 col-12 finish-reserve">
            <div className="row flex-wrap" style={{ marginTop: 10 }}>
                <div className="col-lg-12 d-flex align-items-center">
                    <input
                        type="checkbox"
                        id="terms"
                        name='rule'
                        onChange={(e) => {
                            props.errHandler(e);
                            props.setState({
                                ...props.state,
                                agreeWithTerm: e.target.checked,
                                agreeWithTermerr: e.target.checked ? false : true
                            });
                        }}
                        className="mx-2"
                    />
                    <label htmlFor="terms" style={{ fontSize: 15 }}>
                        <span onClick={() => props.setClosePopUp(true)} style={{ borderBottom: '2px dashed red', paddingBottom: 10 }}>
                            قوانین و مقررات و صحت اطلاعات{' '}
                        </span>
                        را قبول دارم.
                    </label>
                </div>
                <div className="text-danger font-size-15 col-12 col-md-5 pt-4">
                    {props.state.agreeWithTermerr == true && props.state.agreeWithTerm == false && 'لطفا قوانین را بپذیرید.'}
                </div>
            </div>
            <div className="row finish-reserve-buttons mb-3 ml-5 mt-4">
                <div className="col-lg-8 col-md-8 col-7 padding-3px">
                    <button
                        disabled={props.loading}
                        onClick={(e) => {
                            props.validation()
                            if (!props.validation()) {
                                props.setLoading(false)
                                props.setScrollTop(true)
                                props.messageBoxModify({
                                    state: true,
                                    color: false,
                                    message: "لطفا اطلاعات را تکمیل کنید.",
                                });
                                props.setNumbers(true)
                                props.setNumbers2(true)
                            }
                            else if (props.state.agreeWithTerm === true && props.user.logged) {
                                props.setLoading(true)
                                props.compeleteReservation();
                            }
                            else if (props.state.agreeWithTerm === false) {
                                props.setState({ ...props.state, agreeWithTermerr: true });
                                props.setLoading(false)
                                props.messageBoxModify({
                                    state: true,
                                    color: false,
                                    message: "لطفا با شرایط و مقررات موافقت کنید",
                                });
                            }
                            else if (!props.user.logged ) {
                                props.setState({ ...props.state, stateRegister: false });
                                props.login();
                                props.messageBoxModify({
                                    state: true,
                                    color: false,
                                    message: "لطفا کد تایید ارسال شده را وارد کنید!",
                                });
                                props.accountBoxModify({
                                    state: true,
                                    type: "login",
                                });
                            }
                        }}
                        className="py-2 btn-block col-12 rounded end-payment-btn"
                    >
                        {props.loading == false
                            ? "تکمیل خرید"
                            : "لطفا منتظر بمانید..."
                        }
                    </button>
                </div>
                <div className="col-lg-4 col-md-4 col-5 padding-3px">
                    <span
                        onClick={(e) => {
                            props.router.push(localStorage.getItem('url').split('"')[1]);
                        }}>
                        <span
                            className="btn col-12 back-payment-btn py-2"
                        >بازگشت</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Submit;