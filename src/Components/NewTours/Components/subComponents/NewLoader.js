import React from 'react';
import styles from '../../../../../styles/newTour/components/subComponent/NewLoader.module.scss'

const NewLoader = ({title}) => {
    return (
        <div className={styles['Container']}>

            {/*<div className={styles['loader-container']}>*/}
            {/*    <div className={styles["custom-loader"]}></div>*/}
            {/*</div>*/}
            <img src="../../Images/travel.gif" alt="" width='100px' height='100px'/>

            {title&&<strong>{title}</strong>}
        </div>
    );
};

export default NewLoader;

