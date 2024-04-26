import React from "react";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../../styles/Flight.module.scss";
class villaFilterList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles["filter-list-box"]}>
        <div className={styles["filter-list-heading"]}>
          <span className="color-textpill">
            <FontAwesomeIcon icon={faCog} />
            فیلترها
          </span>
        </div>

        <div className={styles["filter-list-airlines"]}>
          <strong>چشم انداز</strong>
          <div>
            <div className="radio">
              <input type="checkbox" className="radio" />
            </div>
            <img
              width=""
              height=""
              width=""
              height=""
              alt="بلبطجا - لوگو فیلتر منظره"
            />
            <label className="font-size-14" htmlFor="cheapest">
              منظره
            </label>
          </div>
          <div>
            <div className="radio">
              <input type="checkbox" className="radio" />
            </div>
            <img
              width=""
              height=""
              width=""
              height=""
              alt="بلبطجا - لوگو فیلتر منظره"
            />
            <label className="font-size-14" htmlFor="cheapest">
              منظره
            </label>
          </div>
          <div>
            <div className="radio">
              <input type="checkbox" className="radio" />
            </div>
            <img
              width=""
              height=""
              width=""
              height=""
              alt="بلبطجا - لوگو فیلتر منظره"
            />
            <label className="font-size-14" htmlFor="cheapest">
              منظره
            </label>
          </div>
          <div>
            <div className="radio">
              <input type="checkbox" className="radio" />
            </div>
            <img
              width=""
              height=""
              width=""
              height=""
              alt="بلبطجا - لوگو فیلتر منظره"
            />
            <label className="font-size-14" htmlFor="cheapest">
              منظره
            </label>
          </div>
          <div>
            <div className="radio">
              <input type="checkbox" className="radio" />
            </div>
            <img
              width=""
              height=""
              width=""
              height=""
              alt="بلبطجا - لوگو فیلتر منظره"
            />
            <label className="font-size-14" htmlFor="cheapest">
              منظره
            </label>
          </div>
        </div>
        <div className={styles["filter-list-airlines"]}>
          <strong> حالت </strong>
          <div>
            <div className="radio">
              <input type="checkbox" className="radio" />
            </div>
            <img
              width=""
              height=""
              width=""
              height=""
              alt="بلبطجا - لوگو فیلتر منظره"
            />
            <label className="font-size-14" htmlFor="cheapest">
              منظره
            </label>
          </div>
          <div>
            <div className="radio">
              <input type="checkbox" className="radio" />
            </div>
            <img
              width=""
              height=""
              width=""
              height=""
              alt="بلبطجا - لوگو فیلتر منظره"
            />
            <label className="font-size-14" htmlFor="cheapest">
              منظره
            </label>
          </div>
          <div>
            <div className="radio">
              <input type="checkbox" className="radio" />
            </div>
            <img
              width=""
              height=""
              width=""
              height=""
              alt="بلبطجا - لوگو فیلتر منظره"
            />
            <label className="font-size-14" htmlFor="cheapest">
              منظره
            </label>
          </div>
          <div>
            <div className="radio">
              <input type="checkbox" className="radio" />
            </div>
            <img
              width=""
              height=""
              width=""
              height=""
              alt="بلبطجا - لوگو فیلتر منظره"
            />
            <label className="font-size-14" htmlFor="cheapest">
              منظره
            </label>
          </div>
          <div>
            <div className="radio">
              <input type="checkbox" className="radio" />
            </div>

            <label className="font-size-14" htmlFor="cheapest">
              منظره
            </label>
          </div>
        </div>
      </div>
    );
  }
}
export default villaFilterList;
