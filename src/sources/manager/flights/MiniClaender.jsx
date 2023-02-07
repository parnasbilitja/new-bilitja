import React from 'react';
import Calendar from './Calender';

const MiniClaender = (props) => {
    return (
        <div>
            <p style={{ marginTop: 30 }} className="text-center mx-3">
              متاسفانه هیچ پروازی از{" "}
              <strong className="text-danger">
                {props.sourceName}
              </strong>{" "}
              <strong>به </strong>
              <strong className="text-danger">
                {props.destinationName}
              </strong>{" "}
              یافت نشد لطفا از تقویم انتخاب کنید.
            </p>
            <Calendar setDate={props.setDate} refreshAction={props.seachData} />
        </div>
    );
};

export default MiniClaender;