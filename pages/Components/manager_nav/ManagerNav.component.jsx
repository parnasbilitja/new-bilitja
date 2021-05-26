import React, { useState } from 'react'
import Image from 'next/image'
import '../../../styles/ManagerNav.module.scss'
//import logo from '../../../images/bilitja-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchway, faBars } from '@fortawesome/free-solid-svg-icons'
//import { withRouter } from 'react-router-dom'
const ManagerNav = (props) => {
    const [isOpend,setOpend] =useState(false)
    return (
        <>
            <div className="manager-small-screen-top-bar">
                <FontAwesomeIcon icon={faBars} onClick={() => {
                    setOpend(!isOpend)
                }} />
            </div>
            <div className={`manager-nav-main-container ${isOpend ? 'slidein-manager' : ''}`}>

                <div className="manager-nav-header">
                    <img src='../../../images/bilitja-logo.png' />
                </div>
                <div className="manager-nav-one-row">
                    <div>
                        <FontAwesomeIcon icon={faArchway} />
                    </div>
                    <div onClick={() => {
                        props.history.push('/panel/villas/search')
                    }}>
                        <p className="no-margin font-size-13 font-bold-iransanse">ویلا</p>
                        <p className="no-margin font-size-13 color-textpill">villa</p>
                    </div>
                </div>
                <div className="manager-nav-one-row">
                    <div>
                        <FontAwesomeIcon icon={faArchway} />
                    </div>
                    <div onClick={() => {
                        props.history.push('/panel/city/show')
                    }}>
                        <p className="no-margin font-size-13 font-bold-iransanse">شهر</p>
                        <p className="no-margin font-size-13 color-textpill">City</p>
                    </div>
                </div>
                <div className="manager-nav-one-row">
                    <div>
                        <FontAwesomeIcon icon={faArchway} />
                    </div>
                    <div onClick={() => {
                        props.history.push('/panel/facility/show')
                    }}>
                        <p className="no-margin font-size-13 font-bold-iransanse">امکانات</p>
                        <p className="no-margin font-size-13 color-textpill">Facility</p>
                    </div>
                </div>
                <div className="manager-nav-one-row">
                    <div>
                        <FontAwesomeIcon icon={faArchway} />
                    </div>
                    <div onClick={() => {
                        props.history.push('/panel/rule/show')
                    }}>
                        <p className="no-margin font-size-13 font-bold-iransanse">قوانین</p>
                        <p className="no-margin font-size-13 color-textpill">Rules</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ManagerNav