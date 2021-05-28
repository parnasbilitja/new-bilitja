import React from 'react'
import Image from 'next/image'
//import footerLogo from '../../../images/bilitja-light-logo.png'

import '../../../styles/Footer.module.scss'

import { faPhone, faGlobe, faMap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// just view, without any functionality
const Footer = () => {
    return (
        <div className="footer">
            <div className="container-fluid">
                <div className="row">

                    <div className="col-lg-2 col-md-12 col-sm-12 col-12 footer-logo">
                        <img src='../../../images/bilitja-light-logo.png' />
                        <p>ارزان ترین بلیط های هواپیما</p>
                        <a href="">www. B i l i t j a .com</a>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-6 col-6"><h3> مقاصد داخلی </h3>
                        <ul>
                            <li><a href="#">اصفهان</a> </li>
                            <li><a href="#">کیش</a></li>
                            <li><a href="#">یزد</a></li>
                            <li><a href="#">کرمانشاه</a></li>
                            <li><a href="#">مشهد</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-6 col-6"><h3> مقاصد خارجی </h3>
                        <ul>
                            <li><a href="#">ترکیه</a> </li>
                            <li><a href="#">گرجستان</a></li>
                            <li><a href="#">دبی</a></li>
                            <li><a href="#">آنتالیا</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-5 col-6"><h3> مطالب خواندنی </h3>
                        <ul>
                            <li><a href="#">راهنمای گردشگری</a> </li>
                            <li><a href="#">بلیط چارتر</a></li>
                            <li><a href="#">راهنمای خرید بلیط</a></li>
                            <li><a href="#">راهنمای استرداد بلیط</a></li>
                            <li><a href="#">قوانین و مقررات</a></li>
                            <li><a href="#">همکاری</a></li>
                            <li><a href="#">امتیازات</a></li>
                        </ul>
                    </div>


                    <div className="col-lg-3 col-md-3 col-6">
                        <h3>تماس با ما</h3>
                        <ul>
                            <li>
                                <FontAwesomeIcon icon={faPhone} />
                                <a href="#">تهران</a>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faPhone} />
                                <a href="#"> تلفن پشتیبانی : 02157912000 - 02157874</a>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faPhone} />
                                <a href="#">موبایل پشتیبانی : 09101214100</a>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faGlobe} />
                                <a href="#"></a>
                            </li>
                           
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer
