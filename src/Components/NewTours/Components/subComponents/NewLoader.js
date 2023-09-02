import React, {Component} from 'react';
import styles from '../../../../../styles/newTour/components/subComponent/NewLoader.module.scss'

const NewLoader = ({title}) => {
    return (
        <>
            <div className={styles['loader-container']}>
                <div className={styles["custom-loader"]}></div>
            </div>
            {title&&<strong>{title}</strong>}
        </>
    );
};

export default NewLoader;

