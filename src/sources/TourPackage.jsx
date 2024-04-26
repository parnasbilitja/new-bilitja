import React from 'react';
import styles from '../../styles/TourPackage/PackageTourDetails.module.scss'
const TourPackage = ({transfers}) => {
    return (
        <div className={styles['header-left-container']}>
            {transfers && transfers.map(transfer=>{
                return(
                    <div className={styles['header-left-item']}>
                        <div className={styles['airline-det']}>
                            <div className={styles['image-con']}>
                                <img src={transfer.origin_airline_thumb.url} alt=""/>
                            </div>
                        </div>
                        <div></div>
                        <div></div>
                        <p>{transfer?.id}</p>

                    </div>
                )
            })}
        </div>
    );
};

export default TourPackage;
