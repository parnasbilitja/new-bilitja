import React from "react";
// import "../../../styles/AccommodationReceipt.module.scss";
const  RequestTour =() =>{
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }

        return (
            <div>
                <div className="modal-content col-xl-12 col-lg-12 col-12">
                    <div className="closeModal me-right mt-2 me-2">
                        <svg width="25" height="25" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="23.1287" cy="23.0799" rx="17.2108" ry="17.2537" stroke="#ff0000" strokeWidth={2} />
                            <path d="M17.3906 28.8301L28.8645 17.3276" stroke="#ff0000" strokeWidth={2} />
                            <path d="M28.8633 28.8301L17.3894 17.3276" stroke="#ff0000" stroke-width={2} />
                        </svg>
                    </div>
                    <div className="d-flex flex-wrap col-xl-12 col-lg-12 col-12 w-100 mt-3">
                        <div className="in-data w-100">
                            <input type="text" placeholder="داده خود را وارد کنید" />
                        </div>
                        <div className="selectData w-100">
                            <select name="" id="">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


export default RequestTour;
