import React from "react";
import styles from "../../../../styles/newTour/components/filterComponent.module.scss";
const FilterComponent = () => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.hotelSearchInput}>
        <p>جستجوی نام هتل یا اقامتگاه</p>

        <input
          type="text"
          placeholder="نام هتل را وارد کنید"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => search(e)}
        />
      </div>
      <div className={styles.hotelSearchStars}>
        <p>ستاره های هتل</p>
        <select name="" id="">
          <option value="1" selected>
            همه
          </option>
          <option value="1">1 ستاره</option>
          <option value="2">2 ستاره</option>
          <option value="3">3 ستاره</option>
          <option value="4">4 ستاره</option>
          <option value="0">5 ستاره</option>
        </select>
      </div>
      <div className={styles.hotelSearchOrder}>
        <p>مرتب سازی براساس</p>
        <div>
          <input
            type="checkbox"
            name="ارزان ترین"
            id=""
            onClick={() => checkedClick("cheap", 1)}
            checked={check === "cheap" ? true : false}
          />
          <p htmlFor="">ارزان ترین</p>
        </div>
        <div>
          <input
            type="checkbox"
            name="گران ترین"
            id=""
            checked={check === "expensive" ? true : false}
            onClick={() => checkedClick("expensive", 2)}
          />
          <p htmlFor="">گران ترین</p>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
