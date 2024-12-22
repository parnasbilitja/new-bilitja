'use client'
import React, { useEffect } from "react";
import { useState } from "react";

// import MainLoader from "../../sources//components/common/MainLoader";
import styles from "../../../styles/InputValues.module.scss";
import { motion } from "framer-motion";
import {Loader} from "../../Utils/Loader";
import NewLoader from "../../Components/NewTours/Components/subComponents/NewLoader";

const InputValues = ({setSearch, search, name, months,setsearchInput,issearchbox,searchInput,handleChange,setIsSearchbox}) => {
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

        // setsearchInput(cityName)


    }
    const [lists,setLists] = useState(months);
    useEffect(()=>{
        setHide(false)
    },[])

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

    const InputHandler = (value) => {
        if(value!==''){

        let new_list = months.filter((item) => item.name.includes(value));
            setLists(new_list);

        }else {
            setLists(months)
        }

    }



    return (
        <>
            <div className={'isDesktop'}>
                <motion.div
                    initial={{opacity:0,x:150}}
                    animate={{opacity:1,x:0}}
                    transition={{duration:0.3}}
                    className={styles['suggestion-box']}

                    style={{backgroundColor:'white',padding:'2px 10px',marginTop:'8px',borderRadius:'10px',position:'absolute',zIndex:'9999',width:'300px' , maxHeight:'100px' ,minHeight:'40px',overflowY:'scroll'}}
                >
                    {months?.length > 0 ? months?.map((item) => (
                            <>
                                <div key={item.code}
                                     style={{cursor:'pointer'}}

                                     onClick={(e) => {
                                         e.stopPropagation()
                                         //  setIsSearchbox(false)
                                         setsearchInput(item?.name)
                                         searchHandler(item.name, name)
                                         handleChange(item)
                                     }}>

                                    <div className={'d-flex align-items-center justify-content-between'}>
                                           <span className="font-size-14">
                                              {item.name ? item.name : (item + ' ' + 'شب')}
                                            </span>

                                        <span className={'font-size-10'}>
                                            {item.code? item.code : ''}
                                        </span>
                                    </div>

                                </div>
                            </>
                        )) :
                        <div style={{height:'100px',width:'100%' ,display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <NewLoader/>
                        </div>
                    }
                </motion.div>
            </div>
            <div className={'isMobile'}>
                <div className={styles['con']}>

                    <div className={styles['citycon']}>
                        <div className={styles['cities']}>
                            <div className={styles['title']}>
                                <p>شهرها</p>
                                <div className={styles['closebtn']} onClick={() => {
                                    setIsSearchbox()
                                }}>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times"
                                         className="svg-inline--fa fa-times fa-w-11 " role="img"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" fill='#137cb6'>
                                        <path
                                            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                                    </svg>
                                </div>

                            </div>
                            <div className={styles['inputcon']}>
                                <input type="text" autoFocus={true}  onChange={(e) => {
                                    // e.preventDefault()
                                    e?.stopPropagation()
InputHandler(e.target.value)
                                    // setsearch(e.target.value)
                                    // handleChange(e)
                                }} placeholder={`جستجو کنید`}
                                />
                                {/*<button></button>*/}
                            </div>

                            <div className={styles['citiesItem']}>
                                {lists?.length === 0 ? (
                                    // <MainLoader/>
                                        <>
                                        <p style={{color:'#e20000'}}>موردی یافت نشد</p></>
                                ) : (
                                    lists?.map((item) => (
                                        <>
                                            <div key={item.code}
                                                 onClick={() => {
                                                     // searchHandler(item.value, item.slug, item.name, item.id)
                                                     setsearchInput(item.name)
                                                     searchHandler(item.name, name)
                                                     //  setIsSearchbox()
                                                     handleChange(item)

                                                 }}>
                                                <span className="font-size-14">
                                                {item.name ? item.name : (item + ' '+ 'شب')}
                                                </span>
                                            </div>
                                        </>
                                    ))
                                )}

                            </div>
                        </div>

                    </div>
                </div>

            </div>



        </>



    );
};
export default InputValues
