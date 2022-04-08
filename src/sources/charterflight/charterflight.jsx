import NavBarComponent from "../component/NavBar.component";
import style from "./Charter.module.scss";
import FlightSearchBox from "../flight_List/FlightSearchBox.component";
import Descflitlist from "../flight_List/Descflitlist";
import Formsolotion from "../Formsolotion";
const Charetrflight = () => {
  return (
    <div className={style["charterlist"]}>
      <div>
        <NavBarComponent />
      </div>
      <div className={style["charterlist-title"]}>
        <div className={style["gradiant"]}>
          <h1>بلیط چارتر</h1>
          <p className={style["title-text"]}>ارزانترین و لحظه آخری</p>
          <img src="../../../Images/airplane-view.jpg" alt="بلیطجا - لوگو" />
        </div>
      </div>
      <div className={style["charterlist-box"]}>
        <FlightSearchBox />
      </div>
      {/* <div className={style["charterlist-img"]}>
        <img
          width="83%"
          height="83%"
          src="../../../Images/flight-index.webp"
          alt="بلیطجا - لوگو"
        />
      </div> */}
      <div className={style["charterflight-items"]}>
        <div className={style["charterflight-items-coulm"]}>
          <div className={style["charterflight-items-border"]}>
            <div className={style["charterflight-items-price"]}>
              قیمت : 1300000
            </div>
            <div>
              <button>خرید</button>
            </div>
          </div>
          <div className={style["charterflight-from-to"]}>
            <div className={style["charterflight-from-to-items"]}>
              <div>تهران به کیش </div>
              <span> شماره پرواز : 12345 </span>
            </div>
            <div className={style["charterflight-from-to-date"]}>
              <div> دوشنبه </div>
              <span> تاریخ : 1401/01/16 </span>
            </div>
          </div>
          <div className={style["logo-airline"]}>
            <div>
              {" "}
              <img
                width="100%"
                height="100%"
                src="../../../Images/QB.png"
                alt="بلیطجا - لوگو"
              />
            </div>
            <div>قشم ایر</div>
          </div>
          <div className={style["charterflight-seet"]}>
            <div className={style["time"]}>
              <div className={style["icon"]}>
                <i className="bilitja icon-seat"></i>
              </div>
              <span>تعداد صندلی : 6</span>
            </div>
            <div className={style["cap"]}>
              <div className={style["icon"]}>
                <i className="bilitja icon-clock"></i>
              </div>
              <span> ساعت : 22:30</span>
            </div>
          </div>
        </div>
        <div className={style["charterflight-items-coulm"]}>
          <div className={style["charterflight-items-border"]}>
            <div className={style["charterflight-items-price"]}>
              قیمت : 1300000
            </div>
            <div>
              <button>خرید</button>
            </div>
          </div>
          <div className={style["charterflight-from-to"]}>
            <div className={style["charterflight-from-to-items"]}>
              <div>تهران به کیش </div>
              <span> شماره پرواز : 12345 </span>
            </div>
            <div className={style["charterflight-from-to-date"]}>
              <div> دوشنبه </div>
              <span> تاریخ : 1401/01/16 </span>
            </div>
          </div>{" "}
          <div className={style["logo-airline"]}>
            <div>
              {" "}
              <img
                width="100%"
                height="100%"
                src="../../../Images/QB.png"
                alt="بلیطجا - لوگو"
              />
            </div>
            <div>قشم ایر</div>
          </div>
          <div className={style["charterflight-seet"]}>
            <div className={style["time"]}>
              <div className={style["icon"]}>
                <i className="bilitja icon-seat"></i>
              </div>
              <span>تعداد صندلی : 6</span>
            </div>
            <div className={style["cap"]}>
              <div className={style["icon"]}>
                <i className="bilitja icon-clock"></i>
              </div>
              <span> ساعت : 22:30</span>
            </div>
          </div>
        </div>
      </div>
      <div className={style["charterflight-items"]}>
        <div className={style["charterflight-items-coulm"]}>
          <div className={style["charterflight-items-border"]}>
            <div className={style["charterflight-items-price"]}>
              قیمت : 1300000
            </div>
            <div>
              <button>خرید</button>
            </div>
          </div>
          <div className={style["charterflight-from-to"]}>
            <div className={style["charterflight-from-to-items"]}>
              <div>تهران به کیش </div>
              <span> شماره پرواز : 12345 </span>
            </div>
            <div className={style["charterflight-from-to-date"]}>
              <div> دوشنبه </div>
              <span> تاریخ : 1401/01/16 </span>
            </div>
          </div>
          <div className={style["logo-airline"]}>
            <div>
              {" "}
              <img
                width="100%"
                height="100%"
                src="../../../Images/QB.png"
                alt="بلیطجا - لوگو"
              />
            </div>
            <div>قشم ایر</div>
          </div>
          <div className={style["charterflight-seet"]}>
            <div className={style["time"]}>
              <div className={style["icon"]}>
                <i className="bilitja icon-seat"></i>
              </div>
              <span>تعداد صندلی : 6</span>
            </div>
            <div className={style["cap"]}>
              <div className={style["icon"]}>
                <i className="bilitja icon-clock"></i>
              </div>
              <span> ساعت : 22:30</span>
            </div>
          </div>
        </div>
        <div className={style["charterflight-items-coulm"]}>
          <div className={style["charterflight-items-border"]}>
            <div className={style["charterflight-items-price"]}>
              قیمت : 1300000
            </div>
            <div>
              <button>خرید</button>
            </div>
          </div>
          <div className={style["charterflight-from-to"]}>
            <div className={style["charterflight-from-to-items"]}>
              <div>تهران به کیش </div>
              <span> شماره پرواز : 12345 </span>
            </div>
            <div className={style["charterflight-from-to-date"]}>
              <div> دوشنبه </div>
              <span> تاریخ : 1401/01/16 </span>
            </div>
          </div>
          <div className={style["logo-airline"]}>
            <div>
              <img
                width="100%"
                height="100%"
                src="../../../Images/QB.png"
                alt="بلیطجا - لوگو"
              />
            </div>
            <div>قشم ایر</div>
          </div>
          <div className={style["charterflight-seet"]}>
            <div className={style["time"]}>
              <div className={style["icon"]}>
                <i className="bilitja icon-seat"></i>
              </div>
              <span>تعداد صندلی : 6</span>
            </div>
            <div className={style["cap"]}>
              <div className={style["icon"]}>
                <i className="bilitja icon-clock"></i>
              </div>
              <span> ساعت : 22:30</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Formsolotion />
      </div>
      <div className={style["charterlist-text"]}>
        <Descflitlist />
      </div>
    </div>
  );
};

export default Charetrflight;
