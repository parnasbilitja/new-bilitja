import React from 'react'

import  Styles from "../../../styles/PopUp.module.scss"

const PopUp = (props) => {
    return (
        <div style={props.opened ? { display: 'block' } : { display: 'none' }}>
            <div className="popup-scrren-saver" onClick={() => {
                props.closePopUp(false)
            }}>

            </div>
            <div className={`popup-main-box ${props.opened ? "popup-animation" : ""}`} >
                {props.children}
            </div>
        </div>
    )
}
export default PopUp