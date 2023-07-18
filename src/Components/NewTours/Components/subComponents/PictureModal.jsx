import React from "react";
import styles from "../../../../../styles/newTour/components/subComponent/PictureModal.module.scss";
// import { AnimatePresence } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
const PictureModal = ({ url, setIsModal }) => {
  return (
    <AnimatePresence>
      <motion.div className={styles["modal"]} onClick={() => setIsModal(null)}>
        <motion.div layoutId={url} className={styles["modal_imgContainer"]}>
          <motion.img src={url} alt="" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PictureModal;
