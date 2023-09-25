import React, {useEffect, useState} from 'react';
import styles from '../../../../../styles/newTour/components/subComponent/Paginate.module.scss'
const Paginate = ({from, to, apiCall}) => {
    const [el, setEl] = useState([])
    const paginateElGen = (to) => {
        let arr = []
        for (let i = 1; i <= to; i++) {
            arr.push(i)
        }
        setEl(arr)
    }
    useEffect(() => {
        paginateElGen(to)
    }, [to])
    return (
        <div className={styles['paginate-container']}>
            <div className={styles["paginate"]}>
                    {
                        el.map(i => {
                            return (
                                <div>{i}</div>
                            )
                        })
                    }
            </div>
        </div>
    );
};

export default Paginate;