import React, { useEffect, useState } from "react";

import styles from "./TableFooter.module.css";

const TableFooter = ({ range, setPage, page, slice }) => {
    const [scope2,setScope2] = useState({
        first:0,
        last:0
    })
    const [scope,setScope] = useState(range)
    
    useEffect(() => {
        if (range.length > 10) {
            setScope2({
                first:page<5?range.slice(0,page+3):range.slice(page-3,page+3),
                last:range.slice(range.length-6)
            })
        }
        if (scope2.first.length>1) {
          if (scope2.first[scope2.first.length-1]<scope2.last[0]) { 
            setScope([...scope2.first,'...',...scope2.last])
          }else{
            setScope([1,2,3,4,5,'...',...scope2.last])
          }
        }
      }, [range.length,scope2]);  
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
    if (range.length > 10) {
        setScope2({
            first:page<5?range.slice(0,page+3):range.slice(page-3,page+3),

            last:range.slice(range.length-6)
        })
    }
    if (scope2.first.length>1) {
        setScope([...scope2.first,'...',...scope2.last])
    }
  }, [page,range]);

  return (
    <div className={styles.tableFooter}>
      {scope.length>0?scope.map((el, index) => (
        <button
          key={index}
          className={`${styles.button} ${
            page === el ? styles.activeButton : styles.inactiveButton
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      )):range.length>0?range.map((el, index) => (
        <>{parseInt(el)>parseInt(range.length-5)?
        <button
          key={index}
          className={`${styles.button} ${
            page === el ? styles.activeButton : styles.inactiveButton
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
        : parseInt(el)<+5?
        <button
        key={index}
        className={`${styles.button} ${
          page === el ? styles.activeButton : styles.inactiveButton
        }`}
        onClick={() => setPage(el)}
      >
        {el}
      </button>
      : parseInt(el)==5?'...'
      :''
        }
        </>
      )):''
      
    }
    </div>
  );
};

export default TableFooter;