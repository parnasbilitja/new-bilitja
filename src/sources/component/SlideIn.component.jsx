import styles from '../../../styles/SlideIn.module.scss'
const SlideIn = function (props) {
    return (
        <div>
            <div className={` ${styles['slide-in-form']}        ${props.slide ? styles.slidein : styles.slideout}`}>
                {props.children}
            </div>
            <div className={styles["slide-in-screen-saver"]} style={props.slide ? { display: "block" } : { display: "none" }} onClick={() => {
                    props.close()
            }}></div>
        </div>
    )
}

export default SlideIn