import React from "react";
import styles from "../../../../../styles/newTour/components/subComponent/PictureModal.module.scss";
// import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
const PictureModal = ({ url, setIsModal }) => {
  return (
    <motion.div
      className={styles["modal"]}
      layoutId={url}
      onClick={() => setIsModal(null)}
    >
      <motion.div className={styles["modal_imgContainer"]}>
        <motion.img src={url} alt="" />
      </motion.div>
    </motion.div>
  );
};

export default PictureModal;
