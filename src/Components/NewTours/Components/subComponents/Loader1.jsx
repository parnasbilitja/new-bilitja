
import styles from '../../../../../styles/Loader1.module.scss'



export default function Loader1() {
    return (
        <div className={styles['lds-ring']} >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
