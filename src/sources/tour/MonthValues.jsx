import React, { useEffect } from "react";
import { useState } from "react";
import { Loader } from "../../Utils/Loader";
import NewLoader from "../../Components/NewTours/Components/subComponents/NewLoader";
import styles from "../../../styles/InputValues.module.scss";
const MonthValues = ({setSearch, search, name, months,setsearchInput,issearchbox,searchInput,handleChange,setIsSearchbox}) => {
    const [hide, setHide] = useState(false)
    const searchHandler = (value='',name) => {
        // debugger
        setHide(true)
        setSearch({
            ...search,
            [name]:value,
            // value:slug==''? cityName:search.value,
            // id:id
        })
        console.log(search)

        // setsearchInput(cityName)


    }
    useEffect(()=>{
        console.log(name);
        setHide(false)
    },[months,search])

    const [widthMobi, setWidthMobi] = useState(
        typeof window !== "undefined" && getWindowSize()
    );

    function getWindowSize() {
        const {innerWidth} = window;
        return innerWidth;
    }

    useEffect(() => {
        function handleWindowResize() {
            setWidthMobi(getWindowSize());
        }

        window.addEventListener("resize", handleWindowResize);
    }, []);
    return (
        <>
            {!hide ? (widthMobi >= 868 ?

                        <div
                            className={`suggestion-box ${styles['citiescontainer']}`}
                        >
                            {months.map((item) => (
                                <>
                                    <div key={item.value}
                                         onClick={() => {
                                             // setsearchInput(item.name)
                                             searchHandler(item.value,name)
                                         }}>
                                        <span className="font-size-14">
                                              {item.name}
                                            </span>
                                    </div>
                                </>
                            ))

                            }
                        </div> :

                        (issearchbox && <div className={styles['con']}>

                            <div className={styles['citycon']}>
                                <div className={styles['cities']}>
                                    <div className={styles['title']}>
                                        <p>شهرها</p>
                                        <div className={styles['closebtn']} onClick={() => {
                                            setIsSearchbox()
                                        }}>
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times"
                                                 className="svg-inline--fa fa-times fa-w-11 " role="img"
                                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" fill='#e20000'>
                                                <path
                                                    d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                                            </svg>
                                        </div>

                                    </div>
                                    <div className={styles['inputcon']}>
                                        <input type="text" value={searchInput} onChange={(e) => {
                                            // setsearch(e.target.value)
                                            handleChange(e)
                                        }} placeholder={``}/>
                                        <button></button>
                                    </div>

                                    <div className={styles['citiesItem']}>
                                        {months.length === 0 ? (
                                            <NewLoader/>
                                        ) : (
                                            months?.map((item) => (
                                                <>
                                                    <div key={item.value}
                                                         onClick={() => {
                                                             // searchHandler(item.value, item.slug, item.name, item.id)
                                                             // setsearchInput(item.destination_name)
                                                             searchHandler(item.value,name)
                                                             setIsSearchbox()
                                                         }}>
                                                <span className="font-size-14">
                                                    {item.name}
                                                    </span>
                                                    </div>
                                                </>
                                            ))
                                        )}

                                    </div>
                                </div>

                            </div>
                        </div>)
                )
                : null
            }
        </>
    );
};
export default MonthValues
