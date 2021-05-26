import React from  'react'
import '../../../styles/MessageBox.module.scss'

import {connect} from 'react-redux'
import {selectMessageBox} from '../../Redux/UI/ui.reselect'
import {messageBoxModify} from '../../Redux/UI/ui.action'
// this component opens when ever a messsage is goigng to be shown to user...throughout the project
class MessageBox extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidUpdate(){
        if(this.props.messageBox.state){
            // message disapears after 4 seconds
            setTimeout(()=>{
                this.props.messageBoxModify({
                    state:false,
                    message:''
                })
            },4000)
        }
    }
    render(){
        return(
            <div className={`messagebox ${this.props.messageBox.state ? "messagebox-show" :"messagebox-hidden"}`}>
                {this.props.messageBox.message}
            </div>
        )
    }
}
const mapStatesToProps = (state)=>({
    messageBox:selectMessageBox(state)
})
const mapDispatchestToProps=(dispatch)=>({
    messageBoxModify:value=>dispatch(messageBoxModify(value))
})
export default connect(mapStatesToProps,mapDispatchestToProps)(MessageBox)