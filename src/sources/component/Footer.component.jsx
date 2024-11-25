import React, { useState, useEffect } from "react";
import styles from "../../../styles/Footer.module.scss";
import { faPhone, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { footerLinks, footerLinksOut } from "../../Utils/data";
import Link from "next/link";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./Map.component"), {
  ssr: false,
});
const Footer = (props) => {
  const { position, zoom } = props;
  const [width, setWidth] = useState();
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  const isBrowser = () => typeof window !== "undefined"; //The
  function scrollToTop() {


var body =document.getElementsByTagName("body")
    body[0].scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  let today = new Date().toLocaleDateString("fa-IR-u-nu-latn");
  return (
    <div style={{marginTop:'15px'}}>
      {/*<div className={styles["newsletter"]}>*/}
      {/*  <div className={styles["borderbottom-container"]}>*/}
      {/*    <div className={styles["circle1"]} style={{cursor:'pointer !important'}} onClick={() => scrollToTop()}>*/}
      {/*      <svg*/}
      {/*        viewBox="0 0 96 96"*/}
      {/*        xmlns="http://www.w3.org/2000/svg"*/}
      {/*        height="25px"*/}
      {/*        width="25px"*/}
      {/*      >*/}
      {/*        <title />*/}
      {/*        <path d="M82.6074,62.1072,52.6057,26.1052a6.2028,6.2028,0,0,0-9.2114,0L13.3926,62.1072a5.999,5.999,0,1,0,9.2114,7.6879L48,39.3246,73.396,69.7951a5.999,5.999,0,1,0,9.2114-7.6879Z" />*/}
      {/*      </svg>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div*/}
      {/*    className="d-flex w-100 justify-content-center flex-column align-items-center"*/}
      {/*    style={{ marginTop: "3rem" }}*/}
      {/*  >*/}
      {/*    <p*/}
      {/*      style={{*/}
      {/*        fontSize: "1.6rem",*/}
      {/*        color: "#e20000",*/}
      {/*        fontWeight: 600,*/}
      {/*        marginBottom: "4px",*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      عضویت در خبرنامه بلیطجا*/}
      {/*    </p>*/}
      {/*    <p style={{ fontSize: "1rem", color: "black" }}>*/}
      {/*      از آفر ها و تور های لحظه آخری بلیطجا با خبر شوید !*/}
      {/*    </p>*/}
      {/*  </div>*/}
      {/*  <div className="container-fluid">*/}
      {/*    <div className="row justify-content-center">*/}
      {/*      <form className="search w-20  col-lg-3 col-sm-12  mb-2">*/}
      {/*        <div className="inp-form">*/}
      {/*          <input type="text" placeholder="شماره موبایل *" />*/}
      {/*        </div>*/}
      {/*      </form>*/}
      {/*      <form className="search w-20 col-lg-3 col-sm-12 col-6 ">*/}
      {/*        <div className="inp-form">*/}
      {/*          <input type="text" placeholder="ایمیل (اختیاری)" />*/}
      {/*        </div>*/}
      {/*      </form>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div*/}
      {/*    className={`d-flex justify-content-center mt-3 ${styles["btn-con"]}`}*/}
      {/*  >*/}
      {/*    <button>عضویت در خبرنامه</button>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className={styles["footer"]}>
        <div className="container-fluid">
          <div className="row parent-footer-top justify-content-between">
            <div className="d-lg-flex align-items-start">
              <div className="col-lg-4 col-md-12 col-12 col-sm-12 item-footer mb-2">
                <div className="d-flex align-items-center mb-2">
                  <div style={{ marginLeft: "15x" }}>
                    <img src="../../../Images/Display.png" alt="display" />
                  </div>
                  <b className="mr-2"> معرفی بلیطجا </b>
                </div>

                <div className="px-4 mt-3">
                  <p style={{ textAlign: "justify" }}>
                    شرکت خدمات مسافرت هوایی و جهانگردی بلیطجا با ۱۴
                    سال سابقه وبادارا بودن مجوز های بند الف و ب از سازمان میراث
                    فرهنگی و گردشگری و سازمان هواپیمایی کشوری همواره بر آن بوده
                    است که بهترین خدمات فروش بلیط هواپیما و تور مسافرتی را به
                    مسافرین محترم و همکاران عزیز عرضه نماید.
                  </p>
                </div>

                <div className="d-flex justify-content-between p-2 mt-4">
                  <div>
                    <a
                      referrerPolicy="origin"
                      target="_blank"
                      href="https://trustseal.enamad.ir/?id=22234&amp;Code=HOlroFa2HgPi7nU9N9rN"
                    >
                      <img src="../../../Images/enamad1.png" alt="enamad" />
                    </a>
                  </div>
                  <div>
                    <img
                      src="../../../Images/neshansabte.png"
                      alt="neshansabt"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-12 col-sm-12 item-footer mb-2 p-sm-1">
                {" "}
                <div className={styles["footer-virtual-mobile"]}>
                  <div style={{ marginBottom: 8 }}>
                    <div className="d-flex align-items-center justify-content-lg-center mb-2">
                      <div style={{ marginLeft: "15x" }}>
                        <img src="../../../Images/Display.png" alt="" />
                      </div>
                      <b style={{ marginTop: 3 }} className="mb-0 mr-2">
                        دسترسی سریع{" "}
                      </b>
                    </div>
                  </div>

                  <div className="mt-4 w-100 d-flex justify-content-center">
                    <ul className={`${styles["ul-lists"]}`}>
                      {footerLinks.map((item, i) => (
                        <li key={i} style={{ color: "black!important" }}>
                          <p
                            className="font-size-8 mb-0 color-black"
                            style={{ color: "black!important" }}
                          >
                            {" "}
                            <Link href={`${item.href}`}>{item.name}</Link>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className={`"col-lg-4 col-md-12 col-12 col-sm-12 item-footer mb-3  "${styles["footer-contact"]} contact-container`}
                style={{ width: "fit-content" }}
              >
                <div className="d-flex align-items-center mb-2">
                  <div style={{ marginLeft: "15x" }}>
                    <img src="../../../Images/Display.png" alt="display" />
                  </div>
                  <b className="mb-0 mr-2">تماس با ما</b>
                </div>

                <div className="mb-4" style={{ height: "180px" }}>
                  <MapComponent coordinates={[35.718982, 51.434697619]}/>
                </div>

                <div>
                  <div className="d-flex justify-content-between mb-3">
                    <div className="ml-2 align-self-start">
                      <img src="../../../Images/008-maps.svg" alt="maps" />
                    </div>
                    <span className="mr-2">
                      سهروردی جنوبی، خیابان ابرار شرقی، خیابان اقلیمی، پلاک 12،
                      واحد سوم
                    </span>
                  </div>
                  <div className="d-flex mb-3">
                    <div className="ml-2 align-self-start">
                      <img
                        src="../../../Images/003-telephone.svg"
                        alt="telephone"
                      />
                    </div>
                    <span className="mr-2">021-84279999</span>
                  </div>
                  <div className="d-flex mb-1">
                    <div className="ml-2 align-self-start">
                      <img
                        src="../../../Images/002-speech bubble.svg"
                        alt="whatsapp"
                      />
                    </div>
                    <span className="mr-2">واتساپ : 09371000007</span>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <div className="d-flex justify-content-between align-items-center col-lg-3">
                      <div className="ml-2 ">
                        <img
                          src="../../../Images/001-mail inbox app.svg"
                          alt="evelope"
                        />
                      </div>
                      <span className="mr-2">info[at]hamnavaz.com</span>
                    </div>
                    <div className="d-flex justify-content-between col-lg-3 contact-us">
                      <a href="https://instgram.com/hamnavaz.tour">
                        <div style={{ position: "relative" }}>
                          {/*<div className="tooltip">hi</div>*/}
                          <svg
                            height="22px"
                            version="1.1"
                            viewBox="0 0 600 600"
                            width="22px"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g transform="matrix(1.01619,0,0,1.01619,44,43.8384)">
                              <path d="M251.921,0.159C183.503,0.159 174.924,0.449 148.054,1.675C121.24,2.899 102.927,7.157 86.902,13.385C70.336,19.823 56.287,28.437 42.282,42.442C28.277,56.447 19.663,70.496 13.225,87.062C6.997,103.086 2.739,121.399 1.515,148.213C0.289,175.083 0,183.662 0,252.08C0,320.497 0.289,329.076 1.515,355.946C2.739,382.76 6.997,401.073 13.225,417.097C19.663,433.663 28.277,447.712 42.282,461.718C56.287,475.723 70.336,484.337 86.902,490.775C102.927,497.002 121.24,501.261 148.054,502.484C174.924,503.71 183.503,504 251.921,504C320.338,504 328.917,503.71 355.787,502.484C382.601,501.261 400.914,497.002 416.938,490.775C433.504,484.337 447.553,475.723 461.559,461.718C475.564,447.712 484.178,433.663 490.616,417.097C496.843,401.073 501.102,382.76 502.325,355.946C503.551,329.076 503.841,320.497 503.841,252.08C503.841,183.662 503.551,175.083 502.325,148.213C501.102,121.399 496.843,103.086 490.616,87.062C484.178,70.496 475.564,56.447 461.559,42.442C447.553,28.437 433.504,19.823 416.938,13.385C400.914,7.157 382.601,2.899 355.787,1.675C328.917,0.449 320.338,0.159 251.921,0.159ZM251.921,45.551C319.186,45.551 327.154,45.807 353.718,47.019C378.28,48.14 391.619,52.244 400.496,55.693C412.255,60.263 420.647,65.723 429.462,74.538C438.278,83.353 443.737,91.746 448.307,103.504C451.757,112.381 455.861,125.72 456.981,150.282C458.193,176.846 458.45,184.814 458.45,252.08C458.45,319.345 458.193,327.313 456.981,353.877C455.861,378.439 451.757,391.778 448.307,400.655C443.737,412.414 438.278,420.806 429.462,429.621C420.647,438.437 412.255,443.896 400.496,448.466C391.619,451.916 378.28,456.02 353.718,457.14C327.158,458.352 319.191,458.609 251.921,458.609C184.65,458.609 176.684,458.352 150.123,457.14C125.561,456.02 112.222,451.916 103.345,448.466C91.586,443.896 83.194,438.437 74.378,429.621C65.563,420.806 60.103,412.414 55.534,400.655C52.084,391.778 47.98,378.439 46.859,353.877C45.647,327.313 45.391,319.345 45.391,252.08C45.391,184.814 45.647,176.846 46.859,150.282C47.98,125.72 52.084,112.381 55.534,103.504C60.103,91.746 65.563,83.353 74.378,74.538C83.194,65.723 91.586,60.263 103.345,55.693C112.222,52.244 125.561,48.14 150.123,47.019C176.687,45.807 184.655,45.551 251.921,45.551Z" />
                              <path d="M251.921,336.053C205.543,336.053 167.947,298.457 167.947,252.08C167.947,205.702 205.543,168.106 251.921,168.106C298.298,168.106 335.894,205.702 335.894,252.08C335.894,298.457 298.298,336.053 251.921,336.053ZM251.921,122.715C180.474,122.715 122.556,180.633 122.556,252.08C122.556,323.526 180.474,381.444 251.921,381.444C323.367,381.444 381.285,323.526 381.285,252.08C381.285,180.633 323.367,122.715 251.921,122.715Z" />
                              <path d="M416.627,117.604C416.627,134.3 403.092,147.834 386.396,147.834C369.701,147.834 356.166,134.3 356.166,117.604C356.166,100.908 369.701,87.374 386.396,87.374C403.092,87.374 416.627,100.908 416.627,117.604Z" />
                            </g>
                          </svg>
                        </div>
                      </a>
                      <a href="https://wa.me/+989102500025">
                        <div>
                          <svg
                            height="22px"
                            width="22px"
                            viewBox="0 0 448 512"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                          </svg>
                        </div>
                      </a>

                      <a href="">
                        <div>
                          <svg
                            height="22px"
                            width="22px"
                            id="svg8"
                            version="1.1"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <defs id="defs2" />
                            <g id="g2315" transform="translate(0,-290.65)">
                              <path
                                d="m 5,294.65 c -1.6447,0 -3,1.3553 -3,3 v 10 c 0,1.6447 1.3553,3 3,3 h 14 c 1.6447,0 3,-1.3553 3,-3 v -10 c 0,-1.6447 -1.3553,-3 -3,-3 z m 0.61523,2 h 12.75586 l -6.09179,5.88086 c -0.15622,0.15084 -0.4497,0.15118 -0.60547,0 z M 20,297.85703 V 307.65 c 0,0.5713 -0.4287,1 -1,1 H 5 c -0.5713,0 -1,-0.4287 -1,-1 v -9.7793 l 6.28125,6.09571 c 0.9397,0.91204 2.44471,0.91352 3.38672,0.004 z"
                                id="rect2299"
                              />
                            </g>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
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
                  <a href="#">hamnavaz.hamnavaz</a>
                </li>
                <li>
                  <a href="https://instagram.com/bilitja">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                  <a href="https://instagram.com/bilitja">hamnavaz.tour</a>
                </li>
                <li>
                  <a href="https://twitter.com/bilitja">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  <a href="https://twitter.com/bilitja">hamnavaz</a>
                </li>
                <li>
                  <a href="https://facebook.com/bilitja">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                  <a href="https://facebook.com/bilitja">hamnavaz</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles["footer-copy"]}>
          <div className={styles["footer-right"]}>
            <div>© کپی رایت1402 Ver 1.2.3</div> &nbsp;
            {width < 826 && <br />}
            <span>
              کلیه حقوق این سایت محفوظ و متعلق به بلیطجا است.{" "}
            </span>
          </div>
          <a href="http://parnas.agency">
            <div className={styles["footer-left"]}>
              <img src="../../../Images/download.png" alt="" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
export default Footer;
