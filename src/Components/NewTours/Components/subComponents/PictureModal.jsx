import React from "react";
import styles from "../../../../../styles/newTour/components/subComponent/PictureModal.module.scss";
// import { AnimatePresence } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// Import Swiper styles
import "swiper/css";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
const PictureModal = ({ url, setIsModal, gallery }) => {
  return (
    <AnimatePresence>
      <motion.div
        className={styles["modal"]}
        // onClick={() => setIsModal(null)}
      >
        <motion.div layoutId={url} className={styles["modal_imgContainer"]}>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: false }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            loop={true}
          >
            <SwiperSlide>
              <svg
                data-name="Layer 1"
                height="30"
                id="Layer_1"
                viewBox="0 0 200 200"
                width="30"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  top: "10",
                  right: "10",
                  cursor: "pointer",
                  backgroundColor: "white",
                  borderRadius: "50px",
                  padding: "0",
                }}
                onClick={() => setIsModal(0)}
              >
                <title />
                <path
                  fill="#e20000"
                  d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Z"
                />
                <path
                  fill="#e20000"
                  d="M128.5,74a9.67,9.67,0,0,0-14,0L100,88.5l-14-14a9.9,9.9,0,0,0-14,14l14,14-14,14a9.9,9.9,0,0,0,14,14l14-14,14,14a9.9,9.9,0,0,0,14-14l-14-14,14-14A10.77,10.77,0,0,0,128.5,74Z"
                />
              </svg>
              <img src={url} alt="" />
            </SwiperSlide>
            {gallery.map((pic) => {
              return (
                <SwiperSlide>
                  <svg
                    data-name="Layer 1"
                    height="30"
                    id="Layer_1"
                    viewBox="0 0 200 200"
                    width="30"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      position: "absolute",
                      top: "10",
                      right: "10",
                      cursor: "pointer",
                      backgroundColor: "white",
                      borderRadius: "50px",
                      padding: "0",
                    }}
                    onClick={() => setIsModal(0)}
                  >
                    <title />
                    <path
                      fill="#e20000"
                      d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Z"
                    />
                    <path
                      fill="#e20000"
                      d="M128.5,74a9.67,9.67,0,0,0-14,0L100,88.5l-14-14a9.9,9.9,0,0,0-14,14l14,14-14,14a9.9,9.9,0,0,0,14,14l14-14,14,14a9.9,9.9,0,0,0,14-14l-14-14,14-14A10.77,10.77,0,0,0,128.5,74Z"
                    />
                  </svg>
                  <img src={pic.url} alt="" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PictureModal;
