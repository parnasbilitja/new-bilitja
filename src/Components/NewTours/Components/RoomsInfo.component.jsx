import React, {useEffect, useState} from "react";
import styles from "../../../../styles/newTour/components/RoomsInfo.module.scss";

import {humanType, humanType1, numberWithCommas} from "../../../Utils/newTour";
import {fontSize} from "@mui/system";

const RoomsInfo = (props) => {

    useEffect(()=>{
        
    },[props.totalRservedroomData])
    
    const [isEdit, setIsEdit] = useState(false)

    const PrcRoomGen=(flight,services)=>{
        

        let flifgtsPrc=flight?.departure?.adl_price + flight?.return?.adl_price

        let totalPrc=0
        totalPrc+=flifgtsPrc

        services.map(service=>{
            totalPrc+=service?.rate
        })

        return totalPrc

    }
    return (
        <>
            <table className={styles["passengers_container"]}>
                <tr>
                    <th className={styles["th"]}>ردیف</th>
                    <th className={styles["th"]}>نوع</th>
                    <th className={styles["th"]}>جنسیت</th>
                    <th className={styles["th"]}>نام</th>
                    <th className={styles["th"]}>نام خانوادگی</th>
                    <th className={styles["th"]}>ملیت</th>
                     <th className={styles["th"]}>کدملی</th>
                    <th className={styles["th"]}>تاریخ تولد</th>
                    <th className={styles["th"]}>شماره پاسپورت</th>
                    <th className={styles["th"]}>تاریخ انقضای پاسپورت</th>
                    <th className={styles["th"]}>قیمت</th>
                    <th className={styles["th"]}></th>
                </tr>
                {props.reservedRooms?.passengers?.map((passenger, index) => {
                    return (
                        <tr>
                            <td
                                className={styles["td"]}
                                style={{backgroundColor: "#f8f9fd"}}
                            >
                                <p style={{fontWeight: "900", margin: 0}}>{index + 1}</p>
                            </td>
                            <td className={styles["td"]}>{humanType1(passenger?.id)}</td>
                            <td className={styles["td"]}>
                                {passenger.gender === "1" ? "آقا" : "خانم"}
                            </td>
                            <td className={styles["td"]}
                                style={{fontSize: '13px', fontWeight: 600}}>{passenger?.name}</td>
                            <td className={styles["td"]}
                                style={{fontSize: '13px', fontWeight: 600}}>{passenger?.family}</td>
                            <td className={styles["td"]}>
                                {passenger.nationality === "1" ? "ایرانی" : "غیرایرانی"}
                            </td>

                                <td className={styles["td"]}>{passenger?.id_code ?passenger?.id_code:'-----'}</td>

                            <td className={styles["td"]} style={{fontSize: '13px'}}>
                                {passenger?.birth_day?.replace(/-/g, "/")}
                            </td>
                            <td className={styles["td"]}
                                style={{fontSize: '13px', fontWeight: 600}}>{passenger?.passport}</td>
                            <td className={styles["td"]} style={{fontSize: '13px', fontWeight: 600}}>
                                {passenger?.expired_passport?.replace(/-/g, "/")}
                            </td>
                            <td className={styles["td"]}>
                                {" "}
                                <strong
                                    style={{
                                        fontWeight: "900",
                                        marginLeft: "3px",
                                        fontSize: "13px",
                                        color: 'red' +
                                            '',
                                    }}
                                >
                                    {" "}
                                    {numberWithCommas(passenger.total_room_price)}
                                </strong>
                                <span>تومان</span>
                            </td>

                        </tr>
                    );
                })}
            </table>
        </>
    );
};

export default RoomsInfo;
