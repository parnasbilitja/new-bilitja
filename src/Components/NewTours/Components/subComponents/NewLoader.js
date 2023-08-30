import React, {Component} from 'react';
import styles from '../../../../../styles/newTour/components/subComponent/NewLoader.module.scss'
class NewLoader extends Component {
    render() {
        return (
            <div className={styles['loader-container']}>
                <div className={styles["custom-loader"]}></div>
            </div>
        );
    }
}

export default NewLoader;