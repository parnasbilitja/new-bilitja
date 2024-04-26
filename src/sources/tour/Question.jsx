import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const Question = ({faq}) => {
    const [open, setOpen] = useState(false)
    return (
        <div>
         <a class="question" href="#" onClick={() => setOpen(!open)} >
            <div class="right">
                <img src="../../../Images/FAQ.svg" width="20" alt="سوال و پرسش"/>&nbsp;
                <span>{faq.question}</span>
            </div>
            <i class="">
            <FontAwesomeIcon icon={faAngleDown} />
            </i>
        </a>
        {open &&
        <div id="0">
            <div class="answer">
                <span>{faq.answer}</span>
            </div>
        </div>   
        }
        </div>
    );
};

export default Question;