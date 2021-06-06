import React from 'react'
import "../../../styles/PopUpWide.module.scss"
const PopUpWide = (props) => {
    return (
        <div style={props.opened ? { display: 'block' } : { display: 'none' }}>
            <div className="popup-calendar-scrren-saver" onClick={() => {
                props.closePopUp(false)
            }} >

            </div>
            <div onClick={() => {
                props.closePopUp(false)
            }} className={`popup-calendar-main-box ${props.opened ? "popup-animation" : ""}`} >
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}
export default PopUpWide 