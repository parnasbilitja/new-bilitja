import React, { useEffect, useState } from "react";
import globals from "../../Global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRemoveFormat,
  faTrash,
  faArchway,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { messageBoxModify } from "../../../Redux/UI/ui.action";
import ManagerTopActionBox from "../ManagerTopActionBox.component";
import { useRouter, withRouter } from "next/router";
import styles from "../../../../styles/manager.module.scss";
import stylesTrack from "../../../../styles/TrackOrder.module.scss";

const ShowallCities = (props) => {
  const [cities, setCities] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    fetch(`${globals.baseUrl}bj/city/view`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "OK") {
          setCities(data.City);
        }
      });
  };
  const myRouter = useRouter();

  return (
    <section>
      <div>
        <div className="panel-header">
          <div class="position-relative" style={{ width: '140px' }}>
            <h6 className="mt-0 font-bold-iransanse">
              لیست شهــرها
            </h6>
            <div class="d-flex align-items-center position-absolute" style={{ top: '27px' }}>
              <div class="box-through"></div>
              <div class="aside-through"></div>
            </div>
          </div>
          <div className="text-left ltr">
            <ManagerTopActionBox
              handleClick={() => {
                myRouter.push("/panel/city/add");
              }}
              titlebase="شهــر"
            />
          </div>
        </div>
        <div className="margin-top-10px">
          {cities.map((city) => (
            <div className={styles["management-one-row"]}>
              <span>{city.ProvinceName}</span>
              <span
                onClick={() => {
                  myRouter.push(`${this.props.router.asPath}/${city.CityId}`);
                }}
              >
                {city.CityName}
              </span>

              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => {
                  const answer = window.confirm("آیا از حذف اطمینان دارید");
                  if (answer) {
                    fetch(`${globals.baseUrl}bj/city/delete`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        CityId: city.CityId,
                      }),
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        if (data.status == "OK") {
                          props
                            .messageBoxModify({
                              state: true,
                              message: "عملیات موفقیت آمیز بود",
                            })
                            .then(() => {
                              getData();
                            });
                        } else {
                          props.messageBoxModify({
                            state: true,
                            message: data.message,
                          });
                        }
                      });
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
const mapDispatchesToProps = (dispatch) => ({
  messageBoxModify: async (value) => dispatch(messageBoxModify(value)),
});
export default withRouter(connect(null, mapDispatchesToProps)(ShowallCities));
