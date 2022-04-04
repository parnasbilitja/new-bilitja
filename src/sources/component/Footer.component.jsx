import React from "react";

//import footerLogo from '../../../Images/bilitja-light-logo.webp'

import styles from "../../../styles/Footer.module.scss";
import { faPhone, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
//import { Instagram, Twitter, Facebook } from "@material-ui/icons";
// just view, without any functionality
const Footer = () => {
  return (
    <div className={styles["footer"]}>
      <div className="container-fluid">
        <div className="row">
          <div
            className={`col-lg-2 col-md-12 col-sm-12 col-12 ${styles["footer-logo"]}`}
          >
            <img
              width=""
              height=""
              alt="بلیطجا-لوگو"
              src="../../../Images/bilitja-light-logo.webp"
            />
            <p>ارزان ترین بلیط های هواپیما</p>
            <a href="">www. B i l i t j a .com</a>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-6 col-6 mb-2">
            <div className="d-flex align-items-center mb-2">
              <div className={styles["circle"]}></div>
              <h3 className="mb-0"> مقاصد داخلی </h3>
            </div>
            <ul className={styles["ul-lists"]}>
              <li>
                <h6>
                  {" "}
                  <a href="#">اصفهان</a>
                </h6>
              </li>
              <li>
                <h6>
                  {" "}
                  <a href="#">کیش</a>
                </h6>
              </li>
              <li>
                <h6>
                  {" "}
                  <a href="#">یزد</a>
                </h6>
              </li>
              <li>
                <h6>
                  {" "}
                  <a href="#">کرمانشاه</a>
                </h6>
              </li>
              <li>
                <h6>
                  {" "}
                  <a href="#">مشهد</a>
                </h6>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-6 col-6 mb-2">
            <div className="d-flex align-items-center mb-2">
              <div className={styles["circle"]}></div>
              <h3 className="mb-0"> مقاصد خارجی </h3>
            </div>
            <ul className={styles["ul-lists"]}>
              <li>
                <h6>
                  {" "}
                  <a href="#">ترکیه</a>
                </h6>
              </li>
              <li>
                <h6>
                  {" "}
                  <a href="#">گرجستان</a>
                </h6>
              </li>
              <li>
                <h6>
                  {" "}
                  <a href="#">دبی</a>
                </h6>
              </li>
              <li>
                <h6>
                  {" "}
                  <a href="#">آنتالیا</a>
                </h6>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-5 col-6 mb-2">
            <div className="d-flex align-items-center mb-2">
              <div className={styles["circle"]}></div>
              <h3 className="mb-0">مطالب خواندنی</h3>
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
          <div className="col-lg-2 col-md-3 col-6 mb-2">
            {" "}
            <div className={styles["footer-virtual-mobile"]}>
              <div style={{ marginBottom: 8 }}>
                <div
                  style={{ marginRight: -15, marginTop: 7 }}
                  className={styles["circle"]}
                ></div>
                <h3 style={{ marginTop: -12 }} className="mb-0">
                  شبکه های اجتماعی
                </h3>
              </div>

              <ul style={{ marginTop: 15 }}>
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
            {/* <a
              referrerPolicy="origin"
              target="_blank"
              href="https://trustseal.enamad.ir/?id=57980&Code=wC1opUKBlpiUx3sEWOGR"
            >
              <img
                referrerPolicy="origin"
                src="https://Trustseal.eNamad.ir/logo.aspx?id=57980&Code=wC1opUKBlpiUx3sEWOGR"
                alt=""
                id="wC1opUKBlpiUx3sEWOGR"
              />
            </a> */}
          </div>
          <div className={styles["mobile-footer-soccialmedia"]}>
            <div
              className={`"col-lg-2 col-md-3 col-6"${styles["footer-contact"]}`}
            >
              <div className="d-flex align-items-center mb-2">
                <div className={styles["circle"]}></div>
                <h3 className="mb-0">تـــماس با ما</h3>
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
            {/* <div className={styles["footer-virtual-mobile"]}>
              <div>
                <div className={styles["circle"]}></div>
                <h3 className="mb-0">شبکه های اجتماعی</h3>
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
              <h3 className="mb-0">تـــماس با ما</h3>
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
          <div>© کپی رایت 1400. Ver 1.1.1</div>
          <span>کلیه حقوق این سایت محفوظ و متعلق به بلیط جا می‌باشد. </span>
        </div>
        <div className={styles["footer-left"]}>
          <div>طراحی و توسعه سایت : </div>
          <span> تیم فنی و توسعه بلیطجا </span>
        </div>
      </div>
    </div>
  );
};
export default Footer;
