import React from 'react'

const VilaReservation = (props) => {
    return (

        <div className="container">
            <div>
                <h3 className="border-bottom-black-track font-size-16 font-bold-iransanse">گزارشات ویلا</h3>
                <div className="row panel-main-content">
                    <table className="table table-striped font-size-13">
                        <thead>
                            <tr>
                                <th>ویلا id</th>
                                <th className="hidden-xs">نام سرپرست</th>
                                <th>تاریخ ورود</th>
                                <th>تاریخ خروج</th>
                                <th>شماره درخواست</th>
                                <th className="hidden-xs">مدت اقامتگاه</th>
                                <th className="hidden-xs">شماره تماس</th>
                                <th className="hidden-xs">تاریخ رزرو</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1746</td>
                                <td className="hidden-xs"></td>
                                <td>1399/11/29</td>
                                <td>1399/11/30</td>
                                <td>---</td>
                                <td className="hidden-xs">1 شب</td>
                                <td className="hidden-xs"></td>
                                <td className="hidden-xs">1399/11/29</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}
export default VilaReservation