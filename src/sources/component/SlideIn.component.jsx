import styles from "../../../styles/SlideIn.module.scss";
const SlideIn = (props) => {
  return (
    <div>
      <div
        className={` ${styles["slide-in-form"]}        ${
          props.slide ? styles.slidein : styles.slideout
        }`}
      >
        {props.children}
      </div>
      <div
        className={
          props.slide ? `${styles["slide-in-screen-saver"]} d-block` : "d-none"
        }
        onClick={() => {
          props.close();
        }}
      ></div>
    </div>
  );
};

export default SlideIn;
