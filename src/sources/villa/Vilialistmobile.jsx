import style from "../../../styles/Vilalist.module.scss";
import { useState } from "react";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Vilialistmobile = () => {
  const styles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 0,
  };
  const [opens, setOpens] = useState(false);
  const handleOpen = () => setOpens(true);
  const handleClose = () => setOpens(false);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={opens}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={opens}>
          <Box sx={styles}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
            ></Typography>
            <Typography id="transition-modal-description">
              <Swiper
                style={{ height: 400, color: "white" }}
                pagination={{
                  type: "fraction",
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
              >
                <SwiperSlide>
                  <img
                    className={style["picture-box-item6"]}
                    src="/Images/picture1.jpg"
                    alt="تصویر-1"
                    width={820}
                    height={400}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className={style["picture-box-item6"]}
                    src="/Images/picture2.jpg"
                    alt="تصویر-1"
                    width={820}
                    height={400}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className={style["picture-box-item6"]}
                    src="/Images/picture3.jpg"
                    alt="تصویر-1"
                    width={820}
                    height={400}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className={style["picture-box-item6"]}
                    src="/Images/picture4.jpg"
                    alt="تصویر-1"
                    width={820}
                    height={400}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className={style["picture-box-item6"]}
                    src="/Images/picture5.jpg"
                    alt="تصویر-1"
                    width={820}
                    height={400}
                  />
                </SwiperSlide>
              </Swiper>
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <div className={style["picture-box-mobile"]}>
        <div className={style["picture-box-right-mobile"]}>
          <div>
            <img
              className={style["picture-box-item1"]}
              src="/Images/picture1.jpg"
              alt="تصویر-1"
              width={240}
              height={190}
            />
            <img
              className={style["picture-box-item2"]}
              src="/Images/picture2.jpg"
              alt="تصویر-1"
              width={240}
              height={190}
            />
          </div>
          <div>
            <img
              src="/Images/picture3.jpg"
              alt="تصویر-1"
              width={240}
              height={190}
            />
            <img
              src="/Images/picture4.jpg"
              alt="تصویر-1"
              width={240}
              height={190}
            />
          </div>
        </div>
        <div className={style["picture-box-left-mobile"]}>
          <div className={style["box-items-image-button-mobile"]}>
            <img
              className={style["picture-box-item6"]}
              src="/Images/picture5.jpg"
              alt="تصویر-1"
              width={470}
              height={350}
            />
          </div>
          <div
            onClick={handleOpen}
            className={style["picture-box-left-button-mobile"]}
          >
            <button> مشاهده تمام تصاویر</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vilialistmobile;
