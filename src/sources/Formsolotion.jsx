import { useState } from "react";
import styles from "../../styles/Flight.module.scss";
import Accordion from "react-bootstrap/Accordion";

const Formsolotion = () => {
  return (
    <div>
      {/* <div className={styles["text-title"]}>سوالات متداول از بلیطجا</div>
      <span className={styles["form"]}>
        <span>
          <Accordion className={styles["accordian"]} defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Button className={styles["accordian-button"]}>
                <div className={styles["filter-list-heading"]}>
                  <strong className={styles["color-textpill"]}>
                    <strong className={styles["filter-title"]}>
                      بار مجاز برای پرواز چقدر می باشد ؟
                    </strong>
                  </strong>
                </div>
              </Accordion.Button>
              <Accordion.Body>
                بار مجاز پیش از رزرو بلیط هواپیما با کلیک روی جزئیات بلیط و سپس
                «بار مجاز» قابل مشاهده است. بار مجاز داخل کابین معمولاً یک چمدان
                دستی تا ۵ کیلوگرم است و در برخی ایرلاین‌ها این میزان تا ۷
                کیلوگرم افزایش می‌یابد. هنگامی که ایمیل نهایی‌شدن رزرو پرواز را
                از فلایتیو دریافت می‌کنید، از قوانین مرتبط مثل بار مجاز پروازتان
                نیز مطلع می‌شوید.
              </Accordion.Body>
            </Accordion.Item>{" "}
          </Accordion>
        </span>
        <span>
          <Accordion className={styles["accordian"]} defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Button className={styles["accordian-button"]}>
                <div className={styles["filter-list-heading"]}>
                  <strong className={styles["color-textpill"]}>
                    <strong className={styles["filter-title"]}>
                      بلیط هواپیما را بصورت آنلاین خریداری کنیم یا تلفنی ؟
                    </strong>
                  </strong>
                </div>
              </Accordion.Button>
              <Accordion.Body>
                هم بصورت تلفنی می توانید رزرو کنید و هم بصورت آنلاین از طریق
                سایت اصلی بلیطجا، تمامی خرید های آنلاین در محیطی امن می باشد و
                با خیال راحت بلیط هواپیما را به همراه جا بصورت آنلاین خرید کنید.
                <br />
                برای رزرو تلفنی با شماره زیر در تماس باشید :
                <br />
                09101214100
              </Accordion.Body>
            </Accordion.Item>{" "}
          </Accordion>
        </span>
      </span>{" "}
      <span className={styles["form"]}>
        <span>
          <Accordion className={styles["accordian"]} defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Button className={styles["accordian-button"]}>
                <div className={styles["filter-list-heading"]}>
                  <strong className={styles["color-textpill"]}>
                    <strong className={styles["filter-title"]}>
                      چند روز قبل از پرواز، بلیط هواپیما را بخریم؟
                    </strong>
                  </strong>
                </div>
              </Accordion.Button>
              <Accordion.Body className={styles["body-text"]}>
                امکان رزرو بلیط هواپیما از ماه‌ها قبل وجود دارد. اما گاهی اوقات
                قیمت بلیط هواپیما در روزهای نزدیک به پرواز ارزان‌تر می‌شود.
                بنابراین در صورتی که شرایطتان اجازه می‌دهد، رزرو آنلاین بلیط
                هواپیما را به روزهای نزدیک پرواز موکول کنید. البته اگر قصد سفر
                در ایام پرسفر نظیر تعطیلات را دارید، باید هر چه زودتر رزرو بلیط
                هواپیما را انجام دهید.
              </Accordion.Body>
            </Accordion.Item>{" "}
          </Accordion>
        </span>
        <span>
          <Accordion className={styles["accordian"]} defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Button className={styles["accordian-button"]}>
                <div className={styles["filter-list-heading"]}>
                  <strong className={styles["color-textpill"]}>
                    <strong className={styles["filter-title"]}>
                      چند روز قبل از پرواز، بلیط هواپیما را بخریم؟
                    </strong>
                  </strong>
                </div>
              </Accordion.Button>
              <Accordion.Body>
                امکان رزرو بلیط هواپیما از ماه‌ها قبل وجود دارد. اما گاهی اوقات
                قیمت بلیط هواپیما در روزهای نزدیک به پرواز ارزان‌تر می‌شود.
                بنابراین در صورتی که شرایطتان اجازه می‌دهد، رزرو آنلاین بلیط
                هواپیما را به روزهای نزدیک پرواز موکول کنید. البته اگر قصد سفر
                در ایام پرسفر نظیر تعطیلات را دارید، باید هر چه زودتر رزرو بلیط
                هواپیما را انجام دهید.
              </Accordion.Body>
            </Accordion.Item>{" "}
          </Accordion>
        </span>
      </span>
      <span className={styles["form"]}>
        <span>
          <Accordion className={styles["accordian"]} defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Button className={styles["accordian-button"]}>
                <div className={styles["filter-list-heading"]}>
                  <strong className={styles["color-textpill"]}>
                    <strong className={styles["filter-title"]}>
                      چند روز قبل از پرواز، بلیط هواپیما را بخریم؟
                    </strong>
                  </strong>
                </div>
              </Accordion.Button>
              <Accordion.Body>
                امکان رزرو بلیط هواپیما از ماه‌ها قبل وجود دارد. اما گاهی اوقات
                قیمت بلیط هواپیما در روزهای نزدیک به پرواز ارزان‌تر می‌شود.
                بنابراین در صورتی که شرایطتان اجازه می‌دهد، رزرو آنلاین بلیط
                هواپیما را به روزهای نزدیک پرواز موکول کنید. البته اگر قصد سفر
                در ایام پرسفر نظیر تعطیلات را دارید، باید هر چه زودتر رزرو بلیط
                هواپیما را انجام دهید.
              </Accordion.Body>
            </Accordion.Item>{" "}
          </Accordion>
        </span>
        <span>
          <Accordion className={styles["accordian"]} defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Button className={styles["accordian-button"]}>
                <div className={styles["filter-list-heading"]}>
                  <strong className={styles["color-textpill"]}>
                    <strong className={styles["filter-title"]}>
                      چند روز قبل از پرواز، بلیط هواپیما را بخریم؟
                    </strong>
                  </strong>
                </div>
              </Accordion.Button>
              <Accordion.Body>
                امکان رزرو بلیط هواپیما از ماه‌ها قبل وجود دارد. اما گاهی اوقات
                قیمت بلیط هواپیما در روزهای نزدیک به پرواز ارزان‌تر می‌شود.
                بنابراین در صورتی که شرایطتان اجازه می‌دهد، رزرو آنلاین بلیط
                هواپیما را به روزهای نزدیک پرواز موکول کنید. البته اگر قصد سفر
                در ایام پرسفر نظیر تعطیلات را دارید، باید هر چه زودتر رزرو بلیط
                هواپیما را انجام دهید.
              </Accordion.Body>
            </Accordion.Item>{" "}
          </Accordion>
        </span>
      </span> */}
      {/* <Accordion
        style={{ width: "35%", marginRight: 100 }}
        defaultActiveKey="0"
      >
        <Accordion.Item eventKey="1" style={{ marginTop: 15 }}>
          <Accordion.Button
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className={styles["filter-list-heading"]}>
              <strong className={styles["color-textpill"]}>
                <strong className={styles["filter-title"]}>
                  چند روز قبل از پرواز، بلیط هواپیما را بخریم؟
                </strong>
              </strong>
            </div>
          </Accordion.Button>
          <Accordion.Body>
            امکان رزرو بلیط هواپیما از ماه‌ها قبل وجود دارد. اما گاهی اوقات قیمت
            بلیط هواپیما در روزهای نزدیک به پرواز ارزان‌تر می‌شود. بنابراین در
            صورتی که شرایطتان اجازه می‌دهد، رزرو آنلاین بلیط هواپیما را به
            روزهای نزدیک پرواز موکول کنید. البته اگر قصد سفر در ایام پرسفر نظیر
            تعطیلات را دارید، باید هر چه زودتر رزرو بلیط هواپیما را انجام دهید.
          </Accordion.Body>
        </Accordion.Item>{" "}
        <Accordion.Item eventKey="2" style={{ marginTop: 15 }}>
          <Accordion.Button
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className={styles["filter-list-heading"]}>
              <strong className={styles["color-textpill"]}>
                <strong className={styles["filter-title"]}>
                  چند روز قبل از پرواز، بلیط هواپیما را بخریم؟
                </strong>
              </strong>
            </div>
          </Accordion.Button>
          <Accordion.Body>
            امکان رزرو بلیط هواپیما از ماه‌ها قبل وجود دارد. اما گاهی اوقات قیمت
            بلیط هواپیما در روزهای نزدیک به پرواز ارزان‌تر می‌شود. بنابراین در
            صورتی که شرایطتان اجازه می‌دهد، رزرو آنلاین بلیط هواپیما را به
            روزهای نزدیک پرواز موکول کنید. البته اگر قصد سفر در ایام پرسفر نظیر
            تعطیلات را دارید، باید هر چه زودتر رزرو بلیط هواپیما را انجام دهید.
          </Accordion.Body>
        </Accordion.Item>{" "}
        <Accordion.Item eventKey="3" style={{ marginTop: 15 }}>
          <Accordion.Button
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className={styles["filter-list-heading"]}>
              <strong className={styles["color-textpill"]}>
                <strong className={styles["filter-title"]}>
                  چند روز قبل از پرواز، بلیط هواپیما را بخریم؟
                </strong>
              </strong>
            </div>
          </Accordion.Button>
          <Accordion.Body>
            امکان رزرو بلیط هواپیما از ماه‌ها قبل وجود دارد. اما گاهی اوقات قیمت
            بلیط هواپیما در روزهای نزدیک به پرواز ارزان‌تر می‌شود. بنابراین در
            صورتی که شرایطتان اجازه می‌دهد، رزرو آنلاین بلیط هواپیما را به
            روزهای نزدیک پرواز موکول کنید. البته اگر قصد سفر در ایام پرسفر نظیر
            تعطیلات را دارید، باید هر چه زودتر رزرو بلیط هواپیما را انجام دهید.
          </Accordion.Body>
        </Accordion.Item>{" "}
        <Accordion.Item eventKey="4" style={{ marginTop: 15 }}>
          <Accordion.Button
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className={styles["filter-list-heading"]}>
              <strong className={styles["color-textpill"]}>
                <strong className={styles["filter-title"]}>
                  چند روز قبل از پرواز، بلیط هواپیما را بخریم؟
                </strong>
              </strong>
            </div>
          </Accordion.Button>
          <Accordion.Body>
            امکان رزرو بلیط هواپیما از ماه‌ها قبل وجود دارد. اما گاهی اوقات قیمت
            بلیط هواپیما در روزهای نزدیک به پرواز ارزان‌تر می‌شود. بنابراین در
            صورتی که شرایطتان اجازه می‌دهد، رزرو آنلاین بلیط هواپیما را به
            روزهای نزدیک پرواز موکول کنید. البته اگر قصد سفر در ایام پرسفر نظیر
            تعطیلات را دارید، باید هر چه زودتر رزرو بلیط هواپیما را انجام دهید.
          </Accordion.Body>
        </Accordion.Item>{" "}
        <Accordion.Item eventKey="5" style={{ marginTop: 15 }}>
          <Accordion.Button
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className={styles["filter-list-heading"]}>
              <strong className={styles["color-textpill"]}>
                <strong className={styles["filter-title"]}>
                  چند روز قبل از پرواز، بلیط هواپیما را بخریم؟
                </strong>
              </strong>
            </div>
          </Accordion.Button>
          <Accordion.Body>
            امکان رزرو بلیط هواپیما از ماه‌ها قبل وجود دارد. اما گاهی اوقات قیمت
            بلیط هواپیما در روزهای نزدیک به پرواز ارزان‌تر می‌شود. بنابراین در
            صورتی که شرایطتان اجازه می‌دهد، رزرو آنلاین بلیط هواپیما را به
            روزهای نزدیک پرواز موکول کنید. البته اگر قصد سفر در ایام پرسفر نظیر
            تعطیلات را دارید، باید هر چه زودتر رزرو بلیط هواپیما را انجام دهید.
          </Accordion.Body>
        </Accordion.Item>{" "}
        <Accordion.Item eventKey="6" style={{ marginTop: 15 }}>
          <Accordion.Button
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className={styles["filter-list-heading"]}>
              <strong className={styles["color-textpill"]}>
                <strong className={styles["filter-title"]}>
                  چند روز قبل از پرواز، بلیط هواپیما را بخریم؟
                </strong>
              </strong>
            </div>
          </Accordion.Button>
          <Accordion.Body>
            امکان رزرو بلیط هواپیما از ماه‌ها قبل وجود دارد. اما گاهی اوقات قیمت
            بلیط هواپیما در روزهای نزدیک به پرواز ارزان‌تر می‌شود. بنابراین در
            صورتی که شرایطتان اجازه می‌دهد، رزرو آنلاین بلیط هواپیما را به
            روزهای نزدیک پرواز موکول کنید. البته اگر قصد سفر در ایام پرسفر نظیر
            تعطیلات را دارید، باید هر چه زودتر رزرو بلیط هواپیما را انجام دهید.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> */}
    </div>
  );
};

export default Formsolotion;
