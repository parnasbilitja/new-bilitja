import React from 'react'

class NumberDayStay extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const numberOfDays = [1,2,3,4,5,6,7,8,9]
        return(
            <div>
                <div className="suggestion-box">
                    {
                        numberOfDays.map(x=>(
                            <div onClick={()=>{
                                this.props.handleChange(x)
                            }}>
                                {x} شب
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}
export default NumberDayStay