import {
  chdAgeStr,
  MiladiToJalaliConvertor,
  numberToWordConvertor,
  numberWithCommas,
  startBuilder,
  timeFixer,
} from "../../../Utils/newTour";
import React, { useEffect, useState } from "react";
import { Err, ErrSuccess } from "../Components/NotifAlert.component";
import globals from "../../../sources/Global";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import styles from "../../../../styles/newTour/Rooms/RoomsSelection.module.scss";
import axios from "axios";
import { useRouter } from "next/router";
const RoomSelection = (props) => {
  const [selectedRoomsData, setSelecetedRoomsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reserveInfo, setReserveInfo] = useState({
    status: false,
    info: {},
  });
  const [reserver, setReserver] = useState({
    phone: "",
    name: "",
  });
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Hide notification after 2 seconds
      },
      () => {
        console.error(
          "Failed to copy text: could not access clipboard service"
        );
        setCopied(false);
      }
    );
  };
  const roomCounter = (typeid) => {
    let room = props.rooms.filter((r) => r.room_type_id === typeid);
    return room.length;
  };

  const findRoomByName = (roomtypeid, id) => {
    let foundroom = selectedRoomsData.filter(
      (room) => room.room_type_id === roomtypeid
    );
    let getIndex = foundroom.findIndex((item) => item.id === id);

    return +getIndex + 1;
  };
  const pdfRef = useRef();

  const downloadPDF = (text) => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(text + ".pdf");
    });
  };
  const incRoom = (room) => {
    props.rooms.map((r) => {
      if (r.room_type_id === room.room_type_id) {
        if (r?.available_room_count > roomNumber(room.room_type_id).length) {
          setSelecetedRoomsData((prevState) => [
            ...prevState,
            {
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
            },
          ]);
        } else {
          Err("تعداد موارد انتخابی بیش از حد مجاز است.");
          return r;
        }
      } else {
        return r;
      }
    });

    // setRooms(justifiedRooms)
  };

  const decDet1 = (id, type) => {
    if (type === "ext_count") {
      const findRoom = selectedRoomsData.map((x) => {
        if (x?.id === id) {
          if (x.extra_count > 0) {
            return {
              ...x,
              extra_count: x.extra_count - 1,
            };
          } else {
            return {
              ...x,
              extra_count: 0,
            };
          }
        } else {
          return x;
        }
      });
      setSelecetedRoomsData(findRoom);
    } else if (type === "inf_count") {
      const findRoom = selectedRoomsData.map((x) => {
        if (x?.id === id) {
          if (x.inf_count) {
            return {
              ...x,
              inf_count: x.inf_count - 1,
            };
          } else {
            return {
              ...x,
              inf_count: 0,
            };
          }
        } else {
          return x;
        }
      });
      setSelecetedRoomsData(findRoom);
    } else if (type === "chd_withbed_count") {
      const findRoom = selectedRoomsData.map((x) => {
        if (x?.id === id) {
          if (x?.chd_withbed_count) {
            return {
              ...x,
              chd_withbed_count: x?.chd_withbed_count - 1,
            };
          } else {
            return {
              ...x,
              chd_withbed_count: 0,
            };
          }
        } else {
          return x;
        }
      });
      setSelecetedRoomsData(findRoom);
    } else if (type === "chd_nobed_count") {
      const findRoom = selectedRoomsData.map((x) => {
        if (x?.id === id) {
          if (x?.chd_nobed_count) {
            return {
              ...x,
              chd_nobed_count: x?.chd_nobed_count - 1,
            };
          } else {
            return {
              ...x,
              chd_nobed_count: 0,
            };
          }
        } else {
          return x;
        }
      });
      setSelecetedRoomsData(findRoom);
    }
    //
  };

  const incDet1 = (room, type) => {
    // '';
    if (type === "ext_count") {
      const findRoom = selectedRoomsData.map((x) => {
        if (x?.id === room?.id) {
          if (x?.extra_count + x.chd_withbed_count >= x?.total_extra_count) {
            Err("به دلیل نبود ظرفیت امکان اضافه کردن وجود ندارد");
            return x;
          } else {
            if (x.extra_count < x.extra_bed_capacity) {
              return {
                ...x,
                extra_count: x.extra_count + 1,
              };
            } else {
              Err("تخت اضافه بیش از تعداد انتخاب شده موجود نیست");
              return x;
            }
          }
        } else {
          return x;
        }
      });

      setSelecetedRoomsData(findRoom);
    } else if (type === "inf_count") {
      const findRoom = selectedRoomsData.map((x) => {
        if (x?.id === room?.id) {
          if (x.inf_count < x.Adl_capacity) {
            return {
              ...x,
              inf_count: x.inf_count + 1,
            };
          } else {
            Err("گنجایش نوزاد بیش از تعداد انتخاب شده موجود نیست");
            return x;
          }
        } else {
          return x;
        }
      });

      setSelecetedRoomsData(findRoom);
    } else if (type === "chd_withbed_count") {
      const findRoom = selectedRoomsData.map((x) => {
        if (x?.id === room?.id) {
          if (x?.chd_withbed_count + x?.extra_count >= x?.total_extra_count) {
            Err("به دلیل نبود ظرفیت امکان اضافه کردن وجود ندارد");
            return x;
          } else {
            // ''
            if (x?.chd_withbed_count + x?.chd_nobed_count < x?.chd_capacity) {
              return {
                ...x,
                chd_withbed_count: x?.chd_withbed_count + 1,
              };
            } else {
              Err("گنجایش کودک بیش از تعداد انتخاب شده موجود نیست");
              return x;
            }
          }
        } else {
          return x;
        }
      });

      setSelecetedRoomsData(findRoom);
    } else if (type === "chd_nobed_count") {
      const findRoom = selectedRoomsData.map((x) => {
        if (x?.id === room?.id) {
          if (x?.chd_nobed_count + x?.extra_count >= x?.total_extra_count) {
            Err("به دلیل نبود ظرفیت امکان اضافه کردن وجود ندارد");
            return x;
          } else {
            if (x?.chd_nobed_count + x?.chd_withbed_count < x?.chd_capacity) {
              return {
                ...x,
                chd_nobed_count: x?.chd_nobed_count + 1,
              };
            } else {
              Err("گنجایش کودک بیش از تعداد انتخاب شده موجود نیست");
              return x;
            }
          }
        } else {
          return x;
        }
      });

      setSelecetedRoomsData(findRoom);
    }
    //
  };

  const removeRoom = (id) => {
    const newSelectedRoom = selectedRoomsData.filter((room) => room.id !== id);
    setSelecetedRoomsData(newSelectedRoom);
  };
  const decRoom = (room) => {
    let foundRoom = selectedRoomsData?.filter(
      (r) => r.room_type_id === room.room_type_id
    );
    foundRoom.pop();
    let filteredRoom = selectedRoomsData?.filter(
      (r) => r.room_type_id !== room.room_type_id
    );
    filteredRoom.push(...foundRoom);
    setSelecetedRoomsData(filteredRoom);
  };

  const roomNumber = (roomid) => {
    let foundrooms = selectedRoomsData.filter(
      (room) => room.room_type_id === roomid
    );

    return foundrooms;
  };

  const router = useRouter();

  const tourReserve = () => {
    if (selectedRoomsData.length > 0) {
      // setIsLoading(true)
      axios
        .post(
          `${globals.tourPackages}reserves/checking`,
          {
            tour_id: +router.query.tour[0],
            package_id: props.hotel.id,
            reserver_full_name: reserver.name,
            reserver_phone: reserver.phone,
            checkin: props.hotel.check_in,
            checkout: props.hotel.check_out,
            hotel_id: props.hotel.hotel_id,
            flight_id: props.flight_id,
            rooms: selectedRoomsData,
          },
          {
            headers: {
              "x-app-key":
                "1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05", //the token is a variable which holds the token
            },
          }
        )
        .then((res) => {
          setReserveInfo({ status: true, info: res?.data });

          ErrSuccess(
            "رزرو شما با موفقیت انجام شد کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت"
          );
          setLoading(false);
        })
        .catch((err) => {
          // setIsLoading(false)

          setLoading(false);
          Err("این پرواز با این تعداد اتاق انتخابی موجودی ندارد");
        });
    } else {
      // setIsLoading(false)
      Err("لطفا پرواز و اتاق مورد نظر خود راانتخاب کنید");
    }
  };


  return (
    <div className={styles["selectioncontainer"]}>
      {!reserveInfo.status && (
        <>
          <div className={styles["warn"]}>
            <p className="font-size-13 font-iransans-bold text-center">
              ضمن تشکر از انتخاب شما ، لطفا جهت خرید تور نام رزروگیرنده و شماره
              تماس را وارد فرمایید و اتاق های خود را انتخاب کنید تا کارشناسان ما
              در اسرع وقت با شما تماس بگیرند
            </p>
          </div>

          <div
            className={styles["title"]}
            style={{
              width: "100%",
              padding: "5px",
              backgroundColor: "#cecece",
              borderRadius: "5px",
              color: "#000 !important",
              marginTop: "10px",
            }}
          >
            <p className="text-center" style={{ color: "#000" }}>
              مشخصات رزرو گیرنده
            </p>
          </div>
          <div
            className={`d-flex justify-content-center w-100 gap-2 mt-3 ${styles["forms"]}`}
          >
            <div className={styles["input-container"]}>
              <input
                type="text"
                placeholder="نام و نام خانوادگی"
                value={reserver.name}
                onChange={(e) => {
                  setReserver((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
              />
            </div>
            <div className={styles["input-container"]}>
              <input
                type="text"
                placeholder="شماره تلفن"
                value={reserver.phone}
                maxLength={11}
                onChange={(e) => {
                  if (isNaN(e.target.value)) {
                    Err("لطفا شماره تلفن را به عدد وارد کنید");
                    setReserver((prev) => ({
                      ...prev,
                      phone: "",
                    }));
                  } else {
                    setReserver((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }));
                  }
                }}
              />
            </div>
          </div>
          <div
            className={styles["title"]}
            style={{
              width: "100%",
              padding: "5px",
              backgroundColor: "#cecece",
              borderRadius: "5px",
              color: "#000 !important",
              marginTop: "10px",
            }}
          >
            <p className="text-center" style={{ color: "#000" }}>
              انتخاب اتاق
            </p>
          </div>
          <div className={styles["bedcount-container"]}>
            <div className={styles["bedcount"]}>
              {props.rooms
                ?.sort((a, b) => a.adl_capacity - b.adl_capacity)
                .map((room) => (
                  <div className={styles["passengercount"]}>
                    <p
                      style={{
                        fontSize: "14px",
                        margin: "0",
                        padding: "0",
                        textAlign: "center",
                        whiteSpace:"nowrap"
                        // marginBottom: '3px'
                      }}
                    >
                      تعداد {room?.room_name}{" "}
                    </p>
                    <span style={{ fontSize: "10px" }}>
                      {" "}
                      (مناسب برای {room?.adl_capacity}نفر )
                    </span>
                    <p
                      style={{
                        fontSize: "12px",
                        margin: "0",
                        padding: "0",
                        textAlign: "center",
                        marginBottom: "8px",
                        color: "#e20000",
                      }}
                    >
                      {numberWithCommas(room?.price)} تومان
                    </p>
                    <div className={styles["count"]}>
                      <div
                        className={
                          roomCounter(room?.room_type_id) > 0
                            ? styles["decin"]
                            : styles["dis_decin"]
                        }
                        onClick={() => incRoom(room)}
                      >
                        +
                      </div>
                      <p>{roomNumber(room.room_type_id)?.length}</p>
                      <div
                        className={
                          roomCounter(room.room_type_id) === 0
                            ? styles["dis_decin"]
                            : styles["decin"]
                        }
                        onClick={() => decRoom(room)}
                      >
                        -
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <>
            {selectedRoomsData && (
              <>
                {selectedRoomsData.map((room) => {
                  return (
                    <div className="roomcountDet_container">
                      <div className={"roomcountDet"}>
                        <div className="room-s">
                          <div style={{ display: "flex", columnGap: "10px" }}>
                            <div
                              className={"cursor-pointer"}
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
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                fill="#e20000"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="#e20000"
                                className="size-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M6 18 18 6M6 6l12 12"
                                />
                              </svg>
                            </div>
                            <div className={"roomcountDet_name"}>
                              <p className="p-0 m-0">
                                {room?.room_type}{" "}
                                <small
                                  style={{
                                    fontWeight: 600,
                                    fontSize: "12px",
                                  }}
                                >
                                  (
                                  {numberToWordConvertor(
                                    findRoomByName(room.room_type_id, room.id)
                                  )}
                                  )
                                </small>
                              </p>
                            </div>
                          </div>

                          <div className={"roomcount"}>
                            <p style={{ fontSize: "12px" }}>
                              تعداد بزرگسال این اتاق:
                            </p>
                            <p
                              style={{
                                fontSize: "13px",
                                color: "#e20000",
                                fontWeight: "700",
                              }}
                            >
                              {room?.Adl_capacity}
                            </p>
                          </div>
                        </div>

                        <div className="roomscon">
                          {room.extra_bed_capacity > 0 && (
                            <div
                              className={`${"roomcountDet_bedcount"} ${
                                room?.extra_bed_count > 0
                                  ? "borderActive"
                                  : "bordernoneActive"
                              }`}
                            >
                              <>
                                <p className={"bedtype"}>تعداد تخت اضافه</p>
                                <small style={{ fontSize: "10px" }}>
                                  (۱۲ سال به بالا)
                                </small>
                              </>
                              <p className={"bedtypeprc"}>
                                {numberWithCommas(room.ext_prc)} تومان
                              </p>

                              <div className={"roomcountDet_bedcount_count"}>
                                <div
                                  className={
                                    room?.extra_count +
                                      room?.chd_withbed_count >=
                                      room?.total_extra_count ||
                                    room.extra_count >= room.extra_bed_capacity
                                      ? "dis_decin"
                                      : "decin"
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
                                      : "decin"
                                  }
                                  onClick={() => decDet1(room?.id, "ext_count")}
                                >
                                  -
                                </div>
                              </div>
                            </div>
                          )}

                          {
                            <div
                              className={`${"roomcountDet_bedcount"} ${
                                room?.chd_count > 0
                                  ? "borderActive"
                                  : "bordernoneActive"
                              }`}
                            >
                              <>
                                <p className={"bedtype"}>تعداد کودک با تخت</p>
                                {props.hotel?.with_bed_child_ages?.length >
                                  0 && (
                                  <small style={{ fontSize: "10px" }}>
                                    (
                                    {chdAgeStr(
                                      props.hotel?.with_bed_child_ages[0],
                                      props.hotel?.with_bed_child_ages[1]
                                    )}
                                    )
                                  </small>
                                )}
                              </>
                              <p className={"bedtypeprc"}>
                                {room.chd_capacity > 0 &&
                                room?.chd_withbed_prc > 0
                                  ? ` ${numberWithCommas(room?.chd_withbed_prc)}
                                                                تومان`
                                  : "عدم موجودی"}
                              </p>
                              <div className={"roomcountDet_bedcount_count"}>
                                <div
                                  className={
                                    room?.chd_nobed_count +
                                      room?.chd_withbed_count >=
                                      room?.chd_capacity ||
                                    room.chd_withbed_count + room.extra_count >=
                                      room.total_extra_count
                                      ? "dis_decin"
                                      : "decin"
                                  }
                                  onClick={() =>
                                    incDet1(room, "chd_withbed_count")
                                  }
                                >
                                  +
                                </div>
                                <span>{room?.chd_withbed_count}</span>
                                <div
                                  className={
                                    room?.chd_withbed_count === 0
                                      ? "dis_decin"
                                      : "decin"
                                  }
                                  onClick={() =>
                                    decDet1(room?.id, "chd_withbed_count")
                                  }
                                >
                                  -
                                </div>
                              </div>
                            </div>
                          }
                          {
                            <div
                              className={`${"roomcountDet_bedcount"} ${
                                room?.chd_count > 0
                                  ? "borderActive"
                                  : "bordernoneActive"
                              }`}
                            >
                              <></>
                              <>
                                <p className={"bedtype"}>تعداد کودک بدون تخت</p>
                                {props.hotel?.no_bed_child_ages?.length > 0 && (
                                  <small style={{ fontSize: "10px" }}>
                                    (
                                    {chdAgeStr(
                                      props.hotel?.no_bed_child_ages[0],
                                      props.hotel?.no_bed_child_ages[1]
                                    )}
                                    )
                                  </small>
                                )}
                              </>
                              <p className={"bedtypeprc"}>
                                {room.chd_capacity > 0
                                  ? `${numberWithCommas(room.chd_nobed_prc)}
                                                                تومان`
                                  : "عدم موجودی"}
                              </p>
                              <div className={"roomcountDet_bedcount_count"}>
                                <div
                                  className={
                                    room?.chd_nobed_count +
                                      room?.chd_withbed_count >=
                                    room?.chd_capacity
                                      ? "dis_decin"
                                      : "decin"
                                  }
                                  onClick={() =>
                                    incDet1(room, "chd_nobed_count")
                                  }
                                >
                                  +
                                </div>
                                <span>{room?.chd_nobed_count}</span>
                                <div
                                  className={
                                    room?.chd_nobed_count === 0
                                      ? "dis_decin"
                                      : "decin"
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

                          {room.Adl_capacity > 0 && (
                            <div
                              className={`${"roomcountDet_bedcount"}
                                                                                 ${
                                                                                   room?.inf_count >
                                                                                   0
                                                                                     ? "borderActive"
                                                                                     : "bordernoneActive"
                                                                                 }`}
                            >
                              <>
                                <p className={"bedtype"}>تعداد نوزاد</p>
                                <small style={{ fontSize: "10px" }}>
                                  ({chdAgeStr(0, 2)})
                                </small>
                              </>

                              <p className={"bedtypeprc"}>
                                {numberWithCommas(room.inf_prc)} تومان
                              </p>
                              <div className={"roomcountDet_bedcount_count"}>
                                <div
                                  className={
                                    room?.inf_count >= room?.Adl_capacity
                                      ? "dis_decin"
                                      : "decin"
                                  }
                                  onClick={() => incDet1(room, "inf_count")}
                                >
                                  +
                                </div>
                                <span>{room?.inf_count}</span>
                                <div
                                  className={
                                    room?.inf_count === 0
                                      ? "dis_decin"
                                      : "decin"
                                  }
                                  onClick={() => decDet1(room?.id, "inf_count")}
                                >
                                  -
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </>
          {selectedRoomsData.length > 0 && (
            <div className={"reservecon"}>
              <div
                className="font-yekan w-100"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button
                  style={{
                    width: "130px",
                    height: "50px",
                    backgroundColor: "#069e2c !important",
                    whiteSpace: "nowrap",
                  }}
                  className={`ancher d-flex justify-content-center align-items-center bg-success text-white font-size-13 py-2 px-4 rounded-3  foc01`}
                  onClick={() => {
                    if (!loading) {
                      setLoading(true);
                      if (reserver.name && reserver.phone) {
                        tourReserve();
                      } else {
                        Err("نام رزروگیرنده و شماره همراه الزامی است.");
                        setLoading(false);
                      }
                    }
                  }}
                >
                  {loading ? "لطفا منتظر بمانید..." : ` انتخاب و ورود اسامی`}
                </button>
              </div>
              <div style={{ display: "flex", columnGap: "10px" }}>
                <p className={"p-0 m-0"}>تعداد اتاق:</p>
                <p
                  className={"p-0 m-0"}
                  style={{ color: "#e20000", fontWeight: "700" }}
                >
                  {selectedRoomsData.length}
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {reserveInfo.status && (
        <div className={styles["confimation_details"]} ref={pdfRef}>
          <div className={styles["content"]}>
            <div className="d-md-flex d-lg-flex gap-3 align-items-center mb-1">
              <div className={styles["success-message"]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={15}
                  height={15}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="5"
                  stroke="#4BB543"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>

                <p>
                  ضمن تشکر از رزرو شما ، کد رفرنس را جهت پیگیری ، ادامه روند
                  رزرو و خرید تور نزد خود نگه دارید، در صورت بروز هرگونه مشکل ،
                  با کارشناسان ما در ارتباط باشید.
                </p>
              </div>
              <button
                className={styles["pdf-btn"]}
                onClick={() => {
                  downloadPDF(reserveInfo?.info?.data?.information?.ref_code);
                }}
              >
                دانلود اطلاعات تور
              </button>
            </div>

            <div className={styles["hotel_flight"]}>
              <div className={styles["hotel"]}>
                <div className={styles["title"]}>
                  <p className="p-0 m-0">اطلاعات هتل</p>
                </div>
                <hr className="py-1 m-0" />

                <div className={styles["main-info"]}>
                  <div className={styles["img-con"]}>
                    <img src={reserveInfo?.info.data?.hotel?.thumbnail?.url} />
                  </div>
                  <div className={styles["info"]}>
                    <div>
                      <div className="gap-1 d-flex mb-1">
                        {startBuilder(reserveInfo?.info?.data?.hotel?.stars)}
                      </div>
                      <p className="font-size-14">
                        {reserveInfo?.info?.data?.hotel?.titleEn}
                      </p>
                      <p className=" mb-1 font-size-13">
                        {reserveInfo?.info?.data?.hotel?.title}
                      </p>

                      <p className="font-size-10">
                        {reserveInfo?.info.data?.hotel?.address}
                      </p>
                    </div>

                    <div className="d-md-flex d-lg-flex justify-content-between p-1 ">
                      <div className="d-flex gap-2">
                        <label style={{ fontSize: "12px" }}>
                          تاریخ ورود به هتل :
                        </label>
                        <p style={{ fontSize: "12px" }}>
                          {MiladiToJalaliConvertor(
                            reserveInfo?.info.data?.hotel?.checkin
                          )}
                        </p>
                      </div>

                      <div className="d-flex gap-2">
                        <label style={{ fontSize: "12px" }}>
                          تاریخ خروج از هتل:
                        </label>
                        <p style={{ fontSize: "12px" }}>
                          {MiladiToJalaliConvertor(
                            reserveInfo?.info.data?.hotel?.checkout
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles["card"]}>
                <div className={styles["title"]}>
                  <p>اطلاعات پرواز</p>

                  <hr className="m-0 py-1" />

                  <div>
                    <div
                      className={styles["flight_card"]}
                      style={{ cursor: "pointer" }}
                    >
                      <div className={styles["dep_return"]}>
                        <div
                          className={`${styles["item_details"]} ${styles["airline"]}`}
                        >
                          <div className={styles["img_container"]}>
                            <img
                              src={
                                reserveInfo?.info.data?.flights?.departure
                                  ?.airline_logo?.url
                              }
                              alt=""
                            />
                          </div>
                          <div className={styles["item"]}>
                            <p>
                              {
                                reserveInfo?.info.data?.flights?.departure
                                  ?.airline_name
                              }
                            </p>
                          </div>
                        </div>

                        <div className={styles["item_details"]}>
                          <div className={styles["item"]}>
                            <p>
                              {
                                reserveInfo?.info.data?.flights?.departure
                                  ?.origin_name
                              }{" "}
                              به{" "}
                              {
                                reserveInfo?.info.data?.flights?.departure
                                  ?.destination_name
                              }
                            </p>
                          </div>
                          <div className={styles["item"]}>
                            <p> ش.پ:</p>
                            <p>
                              {
                                reserveInfo?.info.data?.flights?.departure
                                  ?.flight_number
                              }
                            </p>
                          </div>
                        </div>

                        <div className={styles["item_details"]}>
                          <div className={styles["item"]}>
                            <p>زمان پرواز:</p>
                            <p>
                              {MiladiToJalaliConvertor(
                                reserveInfo?.info.data?.flights?.departure?.date
                              )}{" "}
                              |{" "}
                              {timeFixer(
                                reserveInfo?.info.data?.flights?.departure?.time
                              )}
                            </p>
                          </div>
                          <div className={styles["item"]}>
                            <p>مدت پرواز:</p>
                            <p>
                              {
                                reserveInfo?.info.data?.flights?.departure
                                  ?.duration
                              }{" "}
                              ساعت
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={
                          "d-flex justify-content-center  align-content-center"
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#e20000"
                          viewBox="0 0 24 24"
                          width={25}
                          className={styles["svg"]}
                          height={25}
                          stroke-width="1.5"
                          stroke="#e20000"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                          />
                        </svg>
                      </div>
                      <div className={styles["dep_return"]}>
                        <div className={styles["item_details"]}>
                          <div className={styles["img_container"]}>
                            <img
                              src={
                                reserveInfo?.info.data?.flights?.return
                                  ?.airline_logo?.url
                              }
                              alt=""
                            />
                          </div>
                          <div className={styles["item"]}>
                            <p>
                              {
                                reserveInfo?.info.data?.flights?.return
                                  ?.airline_name
                              }
                            </p>
                          </div>
                        </div>

                        <div className={styles["item_details"]}>
                          <div className={styles["item"]}>
                            <p>
                              {
                                reserveInfo?.info.data?.flights?.return
                                  ?.origin_name
                              }{" "}
                              به{" "}
                              {
                                reserveInfo?.info.data?.flights?.return
                                  ?.destination_name
                              }
                            </p>
                          </div>
                          <div className={styles["item"]}>
                            <p> ش.پ:</p>
                            <p>
                              {
                                reserveInfo?.info.data?.flights?.return
                                  ?.flight_number
                              }
                            </p>
                          </div>
                        </div>

                        <div className={styles["item_details"]}>
                          <div className={styles["item"]}>
                            <p>زمان پرواز:</p>
                            <p>
                              {MiladiToJalaliConvertor(
                                reserveInfo?.info.data?.flights?.return?.date
                              )}{" "}
                              |{" "}
                              {timeFixer(
                                reserveInfo?.info.data?.flights?.return?.time
                              )}
                            </p>
                          </div>
                          <div className={styles["item"]}>
                            <p>مدت پرواز:</p>
                            <p>
                              {
                                reserveInfo?.info.data?.flights?.return
                                  ?.duration
                              }{" "}
                              ساعت
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* rooms */}
            <div className={styles["card"]}>
              <div className={styles["title"]}>
                <p className="p-0 m-0">اتاق های انتخابی</p>
              </div>
              <hr className="py-1 m-0" />

              <div className={styles["rooms"]}>
                {selectedRoomsData.map((room) => (
                  <div className={styles["room"]}>
                    <div className="d-flex align-items-center justify-content-center">
                      <label className="font-size-14 p-0 m-0 text-center">
                        {room?.room_type}
                      </label>
                    </div>
                    <hr className="py-1 m-0" />

                    <div className="d-flex align-items-center justify-content-between px-1">
                      <label className="font-size-13"> تعداد تخت اضافه</label>

                      <p className="m-0 p-0 font-size-13">
                        {" "}
                        {room.extra_count} نفر
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between px-1">
                      <label className="font-size-13"> تعداد کودک با تخت</label>
                      <p className="m-0 p-0 font-size-13">
                        {" "}
                        {room.chd_withbed_count} نفر
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between px-1">
                      <label className="font-size-13">
                        {" "}
                        تعداد کودک بدون تخت
                      </label>
                      <p className="m-0 p-0 font-size-13">
                        {" "}
                        {room.chd_nobed_count} نفر
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between px-1">
                      <label className="font-size-13"> تعداد نوزاد</label>
                      <p className="m-0 p-0 font-size-13">
                        {" "}
                        {room.inf_count} نفر
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles["card"]}>
              <div className={styles["moreinfo"]}>
                <div className="d-flex align-items-center">
                  <label className="font-size-13 gap-3">
                    مبلغ قابل پرداخت:
                  </label>
                  <p
                    style={{ color: "#e20000" }}
                    className="font-size-14 p-0 m-0 font-bold"
                  >
                    {numberWithCommas(
                      reserveInfo?.info?.data?.prices?.total_price
                    )}{" "}
                    تومان
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-column justify-content-center">
                    <div className={`d-flex align-items-center gap-3`}>
                      <label className="font-size-13"> نام رزروگیرنده :</label>
                      <p className="font-size-14 p-0 m-0">
                        {
                          reserveInfo?.info?.data?.information?.reserver
                            .full_name
                        }
                      </p>
                    </div>
                    <div className={`d-flex align-items-center gap-3`}>
                      <label className="font-size-13 ">
                        {" "}
                        شماره رزروگیرنده :
                      </label>
                      <p className="font-size-14 p-0 m-0">
                        {reserveInfo?.info?.data?.information?.reserver.phone}
                      </p>
                    </div>
                  </div>

                  <div
                    className={styles["ref_code"]}
                    onClick={() =>
                      handleCopy(reserveInfo?.info?.data?.information?.ref_code)
                    }
                  >
                    <div className={`d-flex align-items-center gap-3`}>
                      <label className="font-size-10 "> کد رفرنس :</label>
                      <p className="font-size-14 p-0 m-0">
                        {reserveInfo?.info?.data?.information?.ref_code}
                      </p>
                    </div>

                    <div className="d-flex align-items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#000"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                        />
                      </svg>

                      <label className="font-size-10 ">
                        {copied ? "کپی شد!" : "کپی رفرنس"}{" "}
                      </label>
                      {/* <p></p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomSelection;
