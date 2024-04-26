import React from 'react';
import styles from '../../../styles/Menubar.module.scss';

const Menubar = (props) => {
    return (
        <div  className={styles.menubarcontainer} >
            <div style={{}} className={styles.menubar}>

                {props.children}
            </div>


        </div>
    );
};

export default Menubar;