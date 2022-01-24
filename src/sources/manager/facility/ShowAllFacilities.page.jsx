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
import { useRouter } from "next/router";
import styles from "../../../../styles/manager.module.scss";
import stylesTrack from "../../../../styles/TrackOrder.module.scss";

const ShowallFacilities = (props) => {
  const [facilities, setFacilities] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch(`${globals.baseUrl}bj/emkanat/view`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "OK") {
          setFacilities(data.Emkanat);
        }
      });
  };
  const myRouter = useRouter();

  return (
    <div className={styles["panel-main-content"]}>
      <div className="panel-header">
        <div>
          <FontAwesomeIcon icon={faArchway} className="color-textpill" />
          &nbsp;&nbsp;
          <span className="no-margin font-size-13 font-bold-iransanse">
            ویSDFSDFلا
          </span>
        </div>
        <div className="text-left ltr">
          <ManagerTopActionBox
            handleClick={() => {
              myRouter.push("/panel/facility/add");
            }}
          />
        </div>
      </div>
      <h3
        className={` ${stylesTrack["border-bottom-black-track"]} font-size-16 font-bold-iransanse`}
      >
        لsdfsdیست شهر ها
      </h3>
      <div className="margin-top-10px">
        {facilities.map((facility) => (
          <div className={styles["management-one-row"]}>
            <span
              onClick={() => {
                myRouter.push(
                  `${this.props.router.asPath}/${facility.EmkanatId}`
                );
              }}
            >
              {facility.EmkanatName}
            </span>

            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => {
                const answer = window.confirm("آیا از حذف اطمینان دارید");
                if (answer) {
                  fetch(`${globals.baseUrl}bj/emkanat/delete`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      EmkanatId: facility.EmkanatId,
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
  );
};
const mapDispatchesToProps = (dispatch) => ({
  messageBoxModify: async (value) => dispatch(messageBoxModify(value)),
});
export default connect(null, mapDispatchesToProps)(ShowallFacilities);
