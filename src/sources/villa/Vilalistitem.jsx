import style from "../../../styles/Vilalistitem.module.scss";
import Filters from "../flight_List/Filters.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Vilalistitem = () => {
  return (
    <>
      <div className={style["list-vila"]}>
        <div className={style["vila-item"]}>
          <div
            className={`col-lg-3 col-md-3 col-sm-6 col-12 ${style["villa-suggestion"]}`}
          >
            <img
              width=""
              height=""
              alt="تصویر-ویلا-بلبطجا"
              src="/Images/picture2.jpg"
            />
            <p className={style["vilia-desc"]}>
              ویلایی . 3 خوابه . تهران، رودهن
            </p>
            <div className={style["vilia-desc-title"]}>
              استخر سرپوشیده آبگرم با جکوزی و امکانات سرگرمی
            </div>
            <div className={style["vila-price"]}>هر شب از 3٫500٫000 تومان</div>{" "}
            <div className={style["star-vila"]}>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>{" "}
            <div className={style["button"]}>
              <button> رزرو</button>
            </div>
          </div>
          <div
            className={`col-lg-3 col-md-3 col-sm-6 col-12 ${style["villa-suggestion"]}`}
          >
            {" "}
            <img
              width=""
              height=""
              alt="تصویر-ویلا-بلبطجا"
              src="/Images/picture2.jpg"
            />
            <p className={style["vilia-desc"]}>
              ویلایی . 3 خوابه . تهران، رودهن
            </p>
            <div className={style["vilia-desc-title"]}>
              استخر سرپوشیده آبگرم با جکوزی و امکانات سرگرمی
            </div>
            <div className={style["vila-price"]}>هر شب از 3٫500٫000 تومان</div>{" "}
            <div className={style["star-vila"]}>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
            <div className={style["button"]}>
              <button> رزرو</button>
            </div>
          </div>
          <div
            className={`col-lg-3 col-md-3 col-sm-6 col-12 ${style["villa-suggestion"]}`}
          >
            {" "}
            <img
              width=""
              height=""
              alt="تصویر-ویلا-بلبطجا"
              src="/Images/picture2.jpg"
            />
            <p className={style["vilia-desc"]}>
              ویلایی . 3 خوابه . تهران، رودهن
            </p>
            <div className={style["vilia-desc-title"]}>
              استخر سرپوشیده آبگرم با جکوزی و امکانات سرگرمی
            </div>
            <div className={style["vila-price"]}>هر شب از 3٫500٫000 تومان</div>{" "}
            <div className={style["star-vila"]}>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>{" "}
            <div className={style["button"]}>
              <button> رزرو</button>
            </div>
          </div>
          <div
            className={`col-lg-3 col-md-3 col-sm-6 col-12 ${style["villa-suggestion"]}`}
          >
            {" "}
            <img
              width=""
              height=""
              alt="تصویر-ویلا-بلبطجا"
              src="/Images/picture2.jpg"
            />
            <p className={style["vilia-desc"]}>
              ویلایی . 3 خوابه . تهران، رودهن
            </p>
            <div className={style["vilia-desc-title"]}>
              استخر سرپوشیده آبگرم با جکوزی و امکانات سرگرمی
            </div>
            <div className={style["vila-price"]}>هر شب از 3٫500٫000 تومان</div>{" "}
            <div className={style["star-vila"]}>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>{" "}
            <div className={style["button"]}>
              <button> رزرو</button>
            </div>
          </div>
          <div
            className={`col-lg-3 col-md-3 col-sm-6 col-12 ${style["villa-suggestion"]}`}
          >
            {" "}
            <img
              width=""
              height=""
              alt="تصویر-ویلا-بلبطجا"
              src="/Images/picture2.jpg"
            />
            <p className={style["vilia-desc"]}>
              ویلایی . 3 خوابه . تهران، رودهن
            </p>
            <div className={style["vilia-desc-title"]}>
              استخر سرپوشیده آبگرم با جکوزی و امکانات سرگرمی
            </div>
            <div className={style["vila-price"]}>هر شب از 3٫500٫000 تومان</div>{" "}
            <div className={style["star-vila"]}>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>{" "}
            <div className={style["button"]}>
              <button> رزرو</button>
            </div>
          </div>
        </div>
        <div className={style["filterbox"]}>
          <Filters />
        </div>
      </div>
    </>
  );
};

export default Vilalistitem;
