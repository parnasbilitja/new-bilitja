import React, { useEffect, useState } from "react";

import styles from "./TableFooter.module.css";

const TableFooter = ({ range, setPage, page, slice }) => {
  const [scope, setScope] = useState([])
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
    if (page<10) {
      
    }
  }, [slice, page, setPage]);
  const rangeFilter = (el) =>{
    if (el<= page+4 && el>= page-4) {
      return el
    }else{
      return
    }
  }
  return (
    <div className={styles.tableFooter}>
        <button
          className={`${styles.button} ${
            page === 1 ? styles.activeButton : styles.inactiveButton
          }`}
          onClick={() => setPage(1)}
        >
          اول
        </button>
      {range
      .filter((el) => rangeFilter(el))
      .map((el, index) => (
        <button
          key={index}
          className={`${styles.button} ${
            page === el ? styles.activeButton : styles.inactiveButton
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
      <button
          className={`${styles.button} ${
            page === range.length ? styles.activeButton : styles.inactiveButton
          }`}
          onClick={() => setPage(range.length)}
        >
          آخر
        </button>
    </div>
  );
};

export default TableFooter;