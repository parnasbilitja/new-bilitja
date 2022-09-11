import React, { useEffect, useState } from 'react';
// datePicker
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";

const Calender = ({ change, inputPlaceholder }) => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [loca, setLoca] = useState(change)
    useEffect(() => {
        console.log(selectedDay)
    }, [selectedDay])
    return (
        <div>
            <DatePicker
                renderFooter={() => (
                    <button className="py-2 px-4"
                        style={{ height: "3em", paddingRight: '10px', paddingLeft: '10px', fontSize: 12 }}
                        onClick={() => setLoca(loca == 'fa' ? 'en' : 'fa')}>{loca == 'fa' ? 'Christian month' : 'شمسی'}</button>
                )}
                value={selectedDay}
                onChange={setSelectedDay}
                shouldHighlightWeekends
                inputPlaceholder={inputPlaceholder}
                locale={loca}
            />
        </div>
    );
};

export default Calender;