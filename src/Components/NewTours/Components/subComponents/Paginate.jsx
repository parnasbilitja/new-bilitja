import React, {useEffect, useState} from 'react';
import styles from '../../../../../styles/newTour/components/subComponent/Paginate.module.scss'
import {useRouter} from "next/router";
const Paginate = ({from, to,currentPage, apiCall,param,scrollToTop}) => {
    const [el, setEl] = useState([])
    const[selectedpage,setSelectedPage]=useState(1)
    const router=useRouter()
    const paginateElGen = (to) => {
        let arr = []
        for (let i = 1; i <= to; i++) {
            arr.push(i)
        }
        setEl(arr)
    }
    useEffect(() => {
        // debugger
        paginateElGen(to)
    }, [to])


    function scrollTotop() {
        var body =document.getElementsByTagName("body")
        body[0].scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    return (
        to &&
                <div className={styles['paginate-container']}>
                    <div className={styles["paginate"]}>
                            {
                                el.map(i => {
                                    return (
                                        <div className={styles[selectedpage===i? "active":"pagenumber"]}  onClick={()=> {
                                       apiCall(i)
                                            setSelectedPage(i)
                                            if(scrollToTop===true) {
                                                scrollTotop()
                                            }
                                        }
                                        }>{i}</div>
                                    )
                                })
                            }
                    </div>
                </div>

    );
};

export default Paginate;
