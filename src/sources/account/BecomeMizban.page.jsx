import React from 'react'
//import firstTime from '../../../Images/first-time.png'
import styles from '../../../styles/BecomeMizban.module.scss'
import stylesTrack from '../../../styles/TrackOrder.module.scss'
import PrimaryTextInput from '../component/PrimaryTextInput.component'
import PrimaryButton from '../component/PrimaryButton.component'
const BecomeMizban = () => {
    return (
        <div className="become-host-box-container">
            <br /><br />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-12"></div>
                    <div className="col-lg-9 col-md-9 col-sm-12">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-12 text-center">
                                <img src='../../../Images/first-time.png' />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-12 margin-top-20px text-right">
                                <div className="become-host-box">
                                    <h3 className={` ${stylesTrack['border-bottom-black-track']} font-size-16 font-bold-iransanse`}>میزبان شوید</h3>

                                    <p className="color-textpill font-size-13">شماره موبایل خود را وارد کنید</p>
                                    <div className={` form-input-border  ${styles['form-input-border-private']} `}>
                                        <PrimaryTextInput />
                                    </div>
                                    <PrimaryButton value="ادامه" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />
        </div>
    )
}

export default BecomeMizban