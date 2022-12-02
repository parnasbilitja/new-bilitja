import React from "react";
import styles from "../../../styles/Footer.module.scss";
import { faPhone, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInstagram,
    faTwitter,
    faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { footerLinks, footerLinksOut} from '../../Utils/data'

const Footer = () => {
    let today = new Date().toLocaleDateString('fa-IR-u-nu-latn');
    console.log(today);
    return (
        <>
            <div className={styles["footer"]}>
                <div className="container-fluid">
                    <div className="row parent-footer-top">
                        <div className={`col-lg-2 item-footer col-md-12 col-sm-12 col-12 ${styles["footer-logo"]}`}>
                            <img
                                width=""
                                height=""
                                alt="بلیطجا-لوگو"
                                src="../../../Images/bilitja-light-logo.webp"
                            />
                            <p>ارزان ترین بلیط های هواپیما</p>
                            <a href="">www. B i l i t j a .com</a>
                        </div>
                        <div className="col-lg-2 col-md-3 item-footer col-sm-6 col-6 mb-2">
                            <div className="d-flex align-items-center mb-2">
                                <div className={styles["circle"]}></div>
                                <b className="mb-0"> مقاصد داخلی </b>
                            </div>
                            <ul className={styles["ul-lists"]}>
                                {footerLinks.map((item, i) =>(
                                    <li key={i} >
                                        <h6>
                                            {" "}
                                            <a href={`${item.href}${today}`}>{item.name}</a>
                                        </h6>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-3 item-footer col-sm-6 col-6 mb-2">
                            <div className="d-flex align-items-center mb-2">
                                <div className={styles["circle"]}></div>
                                <b className="mb-0"> مقاصد خارجی </b>
                            </div>
                            <ul className={styles["ul-lists"]}>
                                {footerLinksOut.map((item, i) =>(
                                    <li key={i}>
                                        <h6>
                                            {" "}
                                            <a href={`${item.href}${today}`}>{item.name}</a>
                                        </h6>
                                    </li>
                                    ))}
                                
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-5 item-footer col-6 mb-2">
                            <div className="d-flex align-items-center mb-2">
                                <div className={styles["circle"]}></div>
                                <b className="mb-0">مطالب خواندنی</b>
                            </div>
                            <ul className={styles["ul-lists"]}>
                                <li>
                                    <a href="#">راهنمای گردشگری</a>{" "}
                                </li>
                                <li>
                                    <a href="#">بلیط چارتر</a>
                                </li>
                                <li>
                                    <a href="#">راهنمای خرید بلیط</a>
                                </li>
                                <li>
                                    <a href="#">راهنمای استرداد بلیط</a>
                                </li>
                                <li>
                                    <a href="#">قوانین و مقررات</a>
                                </li>
                                <li>
                                    <a href="#">همکاری</a>
                                </li>
                                <li style={{ marginBottom: 20 }}>
                                    <a href="#"></a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-3 item-footer col-6 mb-2">
                            {" "}
                            <div className={styles["footer-virtual-mobile"]}>
                                <div style={{ marginBottom: 8 }}>
                                    <div className="d-flex align-items-center mb-2">
                                        <div className={styles["circle"]}></div>
                                        <b style={{ marginTop: 3 }} className="mb-0">
                                            شبکه های اجتماعی{" "}
                                        </b>
                                    </div>
                                </div>

                                <ul className={styles["ul-soutian"]}>
                                    <li>
                                        <FontAwesomeIcon icon={faGlobe} />
                                        <a href="#">bilitja.com</a>
                                    </li>
                                    <li>
                                        <a href="https://instagram.com/bilitja">
                                            <FontAwesomeIcon icon={faInstagram} />
                                        </a>
                                        <a href="https://instagram.com/hamnavaz.tour">bilitja </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/bilitja">
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </a>
                                        <a href="https://twitter.com/bilitja">bilitja</a>
                                    </li>
                                    <li>
                                        <a href="https://facebook.com/bilitja">
                                            <FontAwesomeIcon icon={faFacebook} />
                                        </a>
                                        <a href="https://facebook.com/bilitja">bilitja</a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                        <div className={`"col-lg-2 col-md-3 item-footer col-6"${styles["footer-contact"]}`}>
                            <div className="d-flex align-items-center mb-2">
                                <div className={styles["circle"]}></div>
                                <b className="mb-0">تماس با ما</b>
                            </div>
                            <ul className={styles["ul-lists"]}>
                                <li>
                                    <FontAwesomeIcon icon={faPhone} />
                                    <a href="#">تهران</a>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faPhone} />
                                    <a href="#"> تلفن پشتیبانی :
                                        <span className={'number-space'}>02184279999</span>
                                    </a>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faPhone} />
                                    <a href="#">موبایل پشتیبانی :
                                        <span className={'number-space'}>09101005065</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className={styles["mobile-footer-soccialmedia"]}>
                            {/* <div className={styles["footer-virtual-mobile"]}>
            <div>
              <div className={styles["circle"]}></div>
              <b className="mb-0">شبکه های اجتماعی</b>
            </div>

            <ul>
              <li>
                <FontAwesomeIcon icon={faGlobe} />
                <a href="#">bilitja.com</a>
              </li>
              <li>
                <a href="https://instagram.com/hamnavaz.tour">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://instagram.com/hamnavaz.tour">
                  hamnavaz.tour
                </a>
              </li>
              <li>
                <a href="https://twitter.com/Hamnavaz_com">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="https://twitter.com/Hamnavaz_com">Hamnavaz_com</a>
              </li>
              <li>
                <a href="https://facebook.com/Hamnavaz_com">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="https://facebook.com/Hamnavaz_com">Hamnavaz_com</a>
              </li>
            </ul>
          </div> */}
                        </div>
                        <div
                            style={{ display: "none" }}
                            className={`col-lg-2 col-md-3 col-6${styles["contact-desktop"]}`}
                        >
                            <div className="d-flex align-items-center mb-2">
                                <div className={styles["circle"]}></div>
                            </div>
                            <ul className={styles["ul-lists"]}>
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
                            </ul>
                        </div>
                        <div className={styles["footer-virtual"]}>
                            <ul>
                                <li>
                                    <FontAwesomeIcon icon={faGlobe} />
                                    <a href="#">bilitja.bilitja</a>
                                </li>
                                <li>
                                    <a href="https://instagram.com/bilitja">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                    <a href="https://instagram.com/bilitja">bilitja.tour</a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/bilitja">
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </a>
                                    <a href="https://twitter.com/bilitja">bilitja</a>
                                </li>
                                <li>
                                    <a href="https://facebook.com/bilitja">
                                        <FontAwesomeIcon icon={faFacebook} />
                                    </a>
                                    <a href="https://facebook.com/bilitja">bilitja</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles["footer-copy"]}>
                    <div className={styles["footer-right"]}>
                        <div className="d-flex justify-content-end ps-4">
                            <a
                                referrerPolicy="origin"
                                target="_blank"
                                href="https://trustseal.enamad.ir/?id=57980&Code=wC1opUKBlpiUx3sEWOGR"
                            >
                                <img
                                    referrerPolicy="origin"
                                    src="https://Trustseal.eNamad.ir/logo.aspx?id=57980&Code=wC1opUKBlpiUx3sEWOGR"
                                    alt=""
                                    id="wC1opUKBlpiUx3sEWOGR" width={'70px'} height={'70px'}
                                />
                            </a>
                        </div>
                        <div>© کپی رایت 1400. Ver 1.1.1</div>
                        <span>کلیه حقوق این سایت محفوظ و متعلق به بلیط جا می‌باشد. </span>
                    </div>
                    <div className={styles["footer-left"]}>
                        <strong style={{ maxWidth: 500, paddingLeft: 20 }}> طراحی و توسعه سایت : </strong>
                        <strong className="text-white">تیم توسعه فنی بلیط جا ( پارناس )</strong>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Footer;
