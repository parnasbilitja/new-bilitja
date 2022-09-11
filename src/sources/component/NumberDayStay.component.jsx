import React from 'react'

const NumberDayStay = (props) => {
    const numberOfDays = [1,2,3,4,5,6,7,8,9]
    return(
        <div>
            <div className="suggestion-box">
                {
                    numberOfDays.map(x=>(
                        <div onClick={()=>{
                            props.handleChange(x)
                        }}>
                            {x} شب
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default NumberDayStay