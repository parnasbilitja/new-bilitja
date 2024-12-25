import {chdAgeStr, numberToWordConvertor, numberWithCommas} from "../../../Utils/newTour";
import React, {useState} from "react";
import {Err} from "../Components/NotifAlert.component";
import styles from '../../../../styles/newTour/Rooms/RoomsSelection.module.scss'
const RoomSelection = (props) => {
    const [selectedRoomsData, setSelecetedRoomsData] = useState([])

    const roomCounter = (typeid) => {

        let room = props.rooms.filter(r => r.room_type_id === typeid)
        return room.length
    }

    const findRoomByName=(roomtypeid,id)=>{
        let foundroom= selectedRoomsData.filter(room=>room.room_type_id===roomtypeid)
        let getIndex= foundroom.findIndex(item => item.id === id)

        return (+getIndex)+1
    }
    const incRoom = (room) => {

        props.rooms.map(r => {

            if (r.room_type_id === room.room_type_id) {
                if (r?.available_room_count > roomNumber(room.room_type_id).length) {
                    setSelecetedRoomsData(prevState => [...prevState, {
                        id: Math.random() * 1000,
                        room_type_id: room.room_type_id,
                        room_id: room.room_id,
                        room_type: room?.room_name,

                        hotel_id: props.hotel.hotel_id,
                        Adl_capacity: room?.adl_capacity,
                        extra_bed_count: 0,
                        inf_count: 0,
                        chd_withbed_count: 0,
                        chd_nobed_count: 0,
                        chd_capacity: room?.room_chd_capacity,
                        extra_bed_capacity: room?.extra_bed_count,
                        total_extra_count: room?.total_extra_count,
                        chd_withbed_prc: room?.chd_w_price,
                        chd_nobed_prc: room?.chd_n_price,
                        chd_withbed_ages: props.hotel?.with_bed_child_ages,
                        chd_nobed_ages: props.hotel?.no_bed_child_ages,
                        ext_prc: room?.extra_bed_price,
                        inf_prc: room.inf_price,
                        adl_count: room.adl_capacity,
                        extra_count: 0,
                        count: 1,
                    }])
                } else {
                    Err('تعداد موارد انتخابی بیش از حد مجاز است.')
                    return r
                }


            } else {
                return r
            }

        })

        // setRooms(justifiedRooms)

        console.log(selectedRoomsData)


    }
    const decRoom = (room) => {

        let foundRoom = selectedRoomsData?.filter(r => r.room_type_id === room.room_type_id)
        foundRoom.pop()
        let filteredRoom = selectedRoomsData?.filter(r => r.room_type_id !== room.room_type_id)
        filteredRoom.push(...foundRoom)
        setSelecetedRoomsData(filteredRoom)
    }

    const roomNumber = (roomid) => {

        let foundrooms = selectedRoomsData.filter(room => room.room_type_id === roomid)

        return foundrooms
    }
    return (<>


        <div className={styles['title']}>
            <p>انتخاب اتاق</p>
        </div>
        <div className={styles["bedcount-container"]}>

            <div className={styles["bedcount"]}>

                {props.rooms?.map(room => (
                    <div className={styles['passengercount']}>
                        <p style={{
                            fontSize: '14px',
                            margin: '0',
                            padding: '0',
                            textAlign: 'center',
                            // marginBottom: '3px'
                        }}>تعداد {room?.room_name} </p>
                        <span style={{fontSize: '10px'}}> (مناسب برای {room?.adl_capacity}نفر )
                                                    </span>
                        <p style={{
                            fontSize: '12px',
                            margin: '0',
                            padding: '0',
                            textAlign: 'center',
                            marginBottom: '8px',
                            color: '#e20000'
                        }}>{numberWithCommas(room?.price)} تومان</p>
                        <div className={styles['count']}>

                            <div
                                className={roomCounter(room?.room_type_id) > 0 ? styles['decin'] : styles['dis_decin']}
                                onClick={() => incRoom(room)}>
                                +
                            </div>
                            <p>{roomNumber(room.room_type_id)?.length}</p>
                            <div
                                className={roomCounter(room.room_type_id) === 0 ? styles['dis_decin'] : styles['decin']}
                                onClick={() => decRoom(room)}>
                                -
                            </div>
                        </div>
                    </div>

                ))}


            </div>


        </div>

        <>
            {selectedRoomsData && <>
                {selectedRoomsData.map((room) => {
                    return (
                        <div className="roomcountDet_container">
                            <div className={"roomcountDet"}>
                                <div className='room-s'>
                                    <div style={{display: 'flex', columnGap: '10px'}}>
                                        <div
                                            className={'cursor-pointer'}
                                            // className={"roomcountDet_remove"}
                                            onClick={() => {
                                                if (selectedRoomsData.length === 1) {
                                                    removeRoom(room.id);
                                                    // setIsOpen(0);
                                                } else {
                                                    removeRoom(room.id);
                                                    // setIsOpen(flight.departure.id.toString()+flight.return.id.toString());
                                                }
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 width={20}
                                                 height={20}
                                                 fill="#e20000" viewBox="0 0 24 24"
                                                 stroke-width="1.5" stroke="#e20000"
                                                 className="size-6">
                                                <path stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                      d="M6 18 18 6M6 6l12 12"/>
                                            </svg>

                                        </div>
                                        <div className={"roomcountDet_name"}>
                                            <p className='p-0 m-0'>{room?.room_type} <small
                                                style={{
                                                    fontWeight: 600,
                                                    fontSize: '12px'
                                                }}>({numberToWordConvertor(findRoomByName(room.room_type_id, room.id))})</small>
                                            </p>
                                        </div>

                                    </div>

                                    <div
                                        className={'roomcount'}

                                    >
                                        <p style={{fontSize: '12px'}}>تعداد بزرگسال این
                                            اتاق:</p>
                                        <p style={{
                                            fontSize: '13px',
                                            color: '#e20000',
                                            fontWeight: '700'
                                        }}>{room?.Adl_capacity}</p>
                                    </div>
                                </div>

                                <div className='roomscon'>
                                    {room.extra_bed_capacity > 0 &&
                                        <div
                                            className={`${
                                                "roomcountDet_bedcount"
                                            } ${

                                                room?.extra_bed_count > 0
                                                    ? "borderActive"
                                                    : "bordernoneActive"

                                            }`}
                                        >
                                            <>
                                                <p className={"bedtype"}>
                                                    تعداد تخت اضافه
                                                </p>
                                                <small style={{fontSize:'10px'}}>(۱۲ سال به بالا)</small>

                                            </>
                                            <p className={"bedtypeprc"}>
                                                {numberWithCommas(
                                                    room.ext_prc
                                                )}{" "}
                                                تومان
                                            </p>

                                            <div
                                                className={
                                                    "roomcountDet_bedcount_count"
                                                }
                                            >
                                                <div
                                                    className={

                                                        (room?.extra_count + room?.chd_withbed_count >=
                                                            room?.total_extra_count) || room.extra_count >= room.extra_bed_capacity
                                                            ? "dis_decin"
                                                            :
                                                            "decin"

                                                    }
                                                    onClick={() => {
                                                        incDet1(room, "ext_count");
                                                    }}
                                                >
                                                    +
                                                </div>
                                                <span>{room?.extra_count}</span>
                                                <div
                                                    className={

                                                        room?.extra_count === 0
                                                            ? "dis_decin"
                                                            :
                                                            "decin"


                                                    }
                                                    onClick={() =>
                                                        decDet1(room?.id, "ext_count")
                                                    }
                                                >
                                                    -
                                                </div>
                                            </div>
                                        </div>
                                    }


                                    {

                                        <div
                                            className={`${
                                                "roomcountDet_bedcount"
                                            } ${

                                                room?.chd_count > 0
                                                    ? "borderActive"
                                                    : "bordernoneActive"

                                            }`}
                                        >

                                            <>
                                                <p className={"bedtype"}>
                                                    تعداد کودک با تخت
                                                </p>
                                                {props.hotel?.with_bed_child_ages.length > 0 &&
                                                    <small style={{fontSize:'10px'}} >({chdAgeStr(props.hotel?.with_bed_child_ages[0], props.hotel?.with_bed_child_ages[1])})</small>}
                                            </>
                                            <p className={"bedtypeprc"}>
                                                {(room.chd_capacity > 0 && room.chd_withbed_prc > 0) ? ` ${numberWithCommas(
                                                    room.chd_withbed_prc
                                                )}
                                                                تومان` : 'عدم موجودی'}
                                            </p>
                                            <div
                                                className={
                                                    "roomcountDet_bedcount_count"
                                                }
                                            >
                                                <div
                                                    className={

                                                        room?.chd_nobed_count + room?.chd_withbed_count >= room?.chd_capacity || (room.chd_withbed_count + room.extra_count >= room.total_extra_count)
                                                            ? "dis_decin"
                                                            :
                                                            "decin"

                                                    }
                                                    onClick={() => incDet1(room, "chd_withbed_count")}
                                                >
                                                    +
                                                </div>
                                                <span>{room?.chd_withbed_count}</span>
                                                <div
                                                    className={

                                                        room?.chd_withbed_count === 0
                                                            ?
                                                            "dis_decin"
                                                            :
                                                            "decin"

                                                    }
                                                    onClick={() =>
                                                        decDet1(room?.id, "chd_withbed_count")
                                                    }
                                                >
                                                    -
                                                </div>
                                            </div>
                                        </div>
                                    }{

                                    <div
                                        className={`${
                                            "roomcountDet_bedcount"
                                        } ${

                                            room?.chd_count > 0
                                                ? "borderActive"
                                                : "bordernoneActive"

                                        }`}
                                    >
                                        <>
                                        </>
                                        <>
                                            <p className={"bedtype"}>
                                                تعداد کودک بدون تخت
                                            </p>
                                            {props.hotel?.no_bed_child_ages.length > 0 &&
                                                <small style={{fontSize:'10px'}}>({chdAgeStr(props.hotel?.no_bed_child_ages[0], props.hotel?.no_bed_child_ages[1])})</small>}
                                        </>
                                        <p className={"bedtypeprc"}>
                                            {room.chd_capacity > 0 ? `${numberWithCommas(
                                                room.chd_nobed_prc
                                            )}
                                                                تومان` : 'عدم موجودی'}
                                        </p>
                                        <div
                                            className={
                                                "roomcountDet_bedcount_count"
                                            }
                                        >
                                            <div
                                                className={

                                                    room?.chd_nobed_count + room?.chd_withbed_count >= room?.chd_capacity
                                                        ? "dis_decin"
                                                        :
                                                        "decin"

                                                }
                                                onClick={() => incDet1(room, "chd_nobed_count")}
                                            >
                                                +
                                            </div>
                                            <span>{room?.chd_nobed_count}</span>
                                            <div
                                                className={

                                                    room?.chd_nobed_count === 0
                                                        ?
                                                        "dis_decin"
                                                        :
                                                        "decin"

                                                }
                                                onClick={() =>
                                                    decDet1(room?.id, "chd_nobed_count")
                                                }
                                            >
                                                -
                                            </div>
                                        </div>
                                    </div>
                                }

                                    {room.Adl_capacity > 0 &&

                                        <div
                                            className={`${


                                                "roomcountDet_bedcount"
                                            }
                                                                                 ${

                                                room?.inf_count > 0
                                                    ? "borderActive"
                                                    : "bordernoneActive"

                                            }`}
                                        >
                                            <>
                                                <p className={"bedtype"}>
                                                    تعداد نوزاد
                                                </p>
                                                <small style={{fontSize:'10px'}}>({chdAgeStr(0, 2)})</small>
                                            </>

                                            <p className={"bedtypeprc"}>
                                                {numberWithCommas(
                                                    room.inf_prc
                                                )}{" "}
                                                تومان
                                            </p>
                                            <div
                                                className={
                                                    "roomcountDet_bedcount_count"
                                                }
                                            >
                                                <div
                                                    className={
                                                        room?.inf_count >= room?.Adl_capacity
                                                            ? "dis_decin"
                                                            :
                                                            "decin"

                                                    }
                                                    onClick={() => incDet1(room, "inf_count")}
                                                >
                                                    +
                                                </div>
                                                <span>{room?.inf_count}</span>
                                                <div
                                                    className={
                                                        room?.inf_count === 0
                                                            ?
                                                            "dis_decin"
                                                            :
                                                            "decin"
                                                    }
                                                    onClick={() =>
                                                        decDet1(room?.id, "inf_count")
                                                    }
                                                >
                                                    -
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>

                            </div>

                        </div>
                    );
                })}

            </>}
        </>


    </>)
}

export default RoomSelection;
