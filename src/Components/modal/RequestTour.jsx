import React from "react";
// import "../../../styles/AccommodationReceipt.module.scss";
const RequestTour = () => {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }

    return (
        <div>
            <div className="modal-content col-xl-12 col-lg-12 col-12">
                <div className="closeModal d-flex justify-content-end mt-2 ps-2 w-100">
                    <svg width="35" height="35" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="23.1287" cy="23.0799" rx="17.2108" ry="17.2537" stroke="#ff0000" strokeWidth={2} />
                        <path d="M17.3906 28.8301L28.8645 17.3276" stroke="#ff0000" strokeWidth={2} />
                        <path d="M28.8633 28.8301L17.3894 17.3276" stroke="#ff0000" stroke-width={2} />
                    </svg>
                </div>
                <div className="d-flex flex-wrap col-xl-12 col-lg-12 col-12 w-100 mt-3">
                    <div className="text d-flex flex-column align-items-center px-2 mb-2">
                        <p className="text-center font-yekan font-bold font-size-14 mb-0">
                            با تشکر از انتخاب شما
                            لطفا جهت رزرو تور با شماره تلفن<span className="rtl text-right px-2">84278-021</span>تماس حاصل فرمایید
                        </p>
                        <span className="text-center font-yekan font-bold font-size-14 py-2">یا</span>
                        <p className="text-center font-yekan font-bold font-size-14">
                            جهت تماس با شما از طریق کارشناسان  بلیطجا اطلاعات درخواستی زیر را تکمیل و ارسال فرمایید.
                        </p>
                    </div>
                    <div className="in-data w-75 d-flex flex-column align-items-stretch justify-content-center m-auto mb-2">
                        <label htmlFor="" className="pb-2 font-yekan font-bold">شماره تلفن همراه</label>
                        <input type="text" className="w-100 px-2 rounded-3 border-secondary font-yekan" placeholder="شماره همراه خود را وارد کنید" style={{ height: "40px", outline: "none" }} />
                    </div>
                    <div className="selectData w-75 d-flex flex-column align-items-stretch justify-content-center m-auto mb-2">
                        <label htmlFor="" className="pb-2 font-yekan font-bold">تعداد مسافر</label>
                        <select className="w-100 px-2 rounded-3 border-secondary" name="" id="" style={{ height: "40px", outline: "none" }}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    <div className="c-btn request-data my-3 font-yekan m-auto">
                        <button className="ancher bg-success text-white font-size-13 py-2 px-4 rounded-3 mt-2" onClick={() => setShow(!show)}>
                            درخواست رزرو
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default RequestTour;
