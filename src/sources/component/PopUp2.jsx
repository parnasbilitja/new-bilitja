import React from 'react';

function PopUp2(props) {
    return (
        <div className={'modalContainer'} >

            <div className={'contentContainer'}>
                {props.children}
            </div>
            </div>
    );
}

export default PopUp2;

