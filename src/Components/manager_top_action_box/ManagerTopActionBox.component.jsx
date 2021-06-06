import React from 'react'
import '../../../styles/ManagerTopActionBox.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faInfo } from '@fortawesome/free-solid-svg-icons'
import PrimaryButton from '../primary_button/PrimaryButton.component'

class ManagerTopActionBox extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <>
                <div className="manager-top-action-box hidden-xs" onClick={this.props.handleClick}>
                    <span className="pull-right font-size-13 font-bold-iransanse">افزودن</span>
                    <FontAwesomeIcon className="pull-left red-icon" icon={faPlusCircle} />
                    <div className="border-bottom margin-top-15px">&nbsp;</div>
                    <span className="pull-right font-size-13 color-textpill padding-3px">مشاهده جزییات</span>
                    <FontAwesomeIcon className="pull-left color-textpill font-size-13" icon={faInfo} />
                </div>

                <div className="manager-top-action-button visible-xs">
                    <button className="btn-outlined-reserve" onClick={this.props.handleClick}>افزودن</button>
                </div>
            </>
        )
    }
}
export default ManagerTopActionBox