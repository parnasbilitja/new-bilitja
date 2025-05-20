// import styles from "../../../styles/NewNavbar.module.scss";
// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import { Menu } from "../../Utils/Menu";
// import {
//   motion,
//   useScroll,
//   useMotionValueEvent,
//   AnimatePresence,
// } from "framer-motion";
// import { useRouter } from "next/router";
// const NavBar = ({ searchParams }) => {
//   // const pathName = usePathname();
//   // const dispatch = useDispatch();
//   const [activeIndex, setActiveIndex] = useState(0);
//   const router =useRouter()
//   const [menuOption, setMenuOption] = useState({
//     showDropDown: false,
//     activeItem: "",
//     menu_det: {},
//   });
//
//   const { scrollY } = useScroll();
//   const containerRef = useRef(null);
//
//   const targetSubmenu = (code) => {
//     return Menu?.filter((m) => m?.titleEn === code)[0];
//   };
//
//   return (
//     <>
//       <nav
//         className={styles.navbar}
//         ref={containerRef}
//         onMouseLeave={() => {
//           setMenuOption((prev) => ({
//             ...prev,
//             showDropDown: false,
//             activeItem: "",
//           }));
//         }}
//       >
//         <AnimatePresence>
//           <motion.div
//             className={`${styles["navbar-container"]} ${
//               menuOption.expandNav ? "expanded" : ""
//             }`}
//           >
//             <div className={styles["navbar-content"]}>
//               <div className={styles["logo-container"]}>
//                 <a href="/">
//                   <img
//                     width=""
//                     height=""
//                     className={styles["logo"]}
//                     src="/Images/bilitja.webp"
//                     alt="بلیطجا - لوگو - دسکتاپ"
//                     style={{ cursor: "pointer" }}
//                   />
//                 </a>
//                 <h1 className="font-size-10 font-bold-iransanse pt-1">
//                   خرید اینترنتی بلیط هواپیما و رزرو اقامتگاه
//                 </h1>
//               </div>
//
//               <div style={{ position: "relative" }}>
//                 <div className="flex w-full justify-between items-center">
//                   <div className={styles.menu}>
//                     {menuOption.activeItem?.length > 0 && (
//                       <div
//                         className={styles["active-indicator"]}
//                         style={{
//                           width: "80px",
//                           transform: `translateX(-${activeIndex * 98}px)`,
//                         }}
//                       />
//                     )}
//                     {Menu.map((item) => (
//                       <>
//                         <div
//                           key={item.nameEn}
//                           onMouseEnter={() =>{
//                             setMenuOption((prev) => ({
//                               ...prev,
//                               showDropDown: true,
//                               expandNav: true,
//                               menu_det: item.list,
//                               activeItem: item?.nameEn,
//                             }))
//                           }
//
//                           }
//
//                           onClick={()=>{
//                             if(item.nameEn!=='tours' || item.nameEn!=='hotel'){
//                               router.push(item.slug)
//                             }
//                           }}
//                           className={styles["menu-item"]}
//                         >
//                           {item?.logo}
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               gap: "2px",
//                             }}
//                           >
//                             <p
//                               className={`${
//                                 menuOption.activeItem === item.titleEn
//                                   ? "active"
//                                   : "inactive"
//                               } ${
//                                 menuOption?.expandNav ? "expanded" : "collapsed"
//                               }`}
//                             >
//                               {item.name}
//                             </p>
//                             { (item.nameEn==='hotel' || item.nameEn==='tours')&&<svg
//                               width="15px"
//                               height="15px"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                               stroke="#000000"
//                               stroke-width="0.00024000000000000003"
//                             >
//                               <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//                               <g
//                                 id="SVGRepo_tracerCarrier"
//                                 stroke-linecap="round"
//                                 stroke-linejoin="round"
//                                 stroke="#CCCCCC"
//                                 stroke-width="0.528"
//                               ></g>
//                               <g id="SVGRepo_iconCarrier">
//                                 {" "}
//                                 <path
//                                   d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
//                                   fill="#0F0F0F"
//                                 ></path>{" "}
//                               </g>
//                             </svg>}
//                           </div>
//                         </div>
//                       </>
//                     ))}
//                   </div>
//                   {/*
//                 {menuOption.expandNav && (
//                   <p
//                     className={styles["auth-button"]}
//                     onClick={() =>
//                       dispatch(
//                         SetAuthOpen({ isOpen: true, auth_mode: "signin" })
//                       )
//                     }
//                   >
//                     ثبت نام / ورود
//                   </p>
//                 )} */}
//                 </div>
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: "76px",
//                     right: "85px",
//                     zIndex: "999",
//                   }}
//                 >
//                   <AnimatePresence>
//                     {menuOption.showDropDown &&
//                       menuOption?.activeItem === "hotel" && (
//                         <motion.div
//                           initial={{
//                             opacity: 0,
//                             height: "auto",
//                             display: "none",
//                           }}
//                           animate={{
//                             height: menuOption.showDropDown ? "auto" : "0px",
//                             opacity: menuOption.showDropDown ? 1 : 0,
//                             backgroundColor: "rgb(251,250,250)",
//
//                             display: menuOption.showDropDown ? "block" : "none",
//                           }}
//                           exit={{
//                             opacity: 0,
//                             height: "auto",
//                             display: "none",
//                             transition: { duration: 0.6 },
//                           }}
//                           transition={{ delay: 0, duration: 0.6 }}
//                           className={styles["submenu-hotel"]}
//                         >
//                           <ul className={styles['nested-menu']}>
//                             {menuOption.menu_det.map((hotel) => {
//                               return (
//
//                                   <li>
//                                     {hotel.name}
//                                     <svg
//                                       width="20px"
//                                       height="20px"
//                                       viewBox="0 0 24 24"
//                                       fill="none"
//                                       xmlns="http://www.w3.org/2000/svg"
//                                       stroke="#e20000"
//                                       strokeWidth="0.00024000000000000003"
//                                     >
//                                       <g
//                                         id="SVGRepo_bgCarrier"
//                                         strokeWidth="0"
//                                       ></g>
//                                       <g
//                                         id="SVGRepo_tracerCarrier"
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                       ></g>
//                                       <g id="SVGRepo_iconCarrier">
//                                         <path
//                                           d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z"
//                                           fill="#e20000"
//                                         ></path>
//                                       </g>
//                                     </svg>
//
//                                     {/* Render nested lists */}
//
//                                       <div className={styles["details"]}>
//                                         <ul className={styles['nested-menu']}>
//                                           {hotel.list.map((l) => (
//                                             <li key={l.name}>
//                                               {l.name}
//                                               {l.list.length>0 && <svg
//                                                 width="20px"
//                                                 height="20px"
//                                                 viewBox="0 0 24 24"
//                                                 fill="none"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 stroke="#e20000"
//                                                 strokeWidth="0.00024000000000000003"
//                                               >
//                                                 <g
//                                                   id="SVGRepo_bgCarrier"
//                                                   strokeWidth="0"
//                                                 ></g>
//                                                 <g
//                                                   id="SVGRepo_tracerCarrier"
//                                                   strokeLinecap="round"
//                                                   strokeLinejoin="round"
//                                                 ></g>
//                                                 <g id="SVGRepo_iconCarrier">
//                                                   <path
//                                                     d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z"
//                                                     fill="#e20000"
//                                                   ></path>
//                                                 </g>
//                                               </svg>}
//
//                                               {/* Render deeper nested lists */}
//                                               <div className={styles["details"]}>
//                                         <ul>
//                                         {l?.list?.map((f) => (
//                                             <li key={f.name} onClick={()=>{router.push(`/hotels?id=${f.slug}&page=1`)}}>
//                                               {f.name}
//                                               {/* <svg
//                                                 width="20px"
//                                                 height="20px"
//                                                 viewBox="0 0 24 24"
//                                                 fill="none"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 stroke="#e20000"
//                                                 strokeWidth="0.00024000000000000003"
//                                               >
//                                                 <g
//                                                   id="SVGRepo_bgCarrier"
//                                                   strokeWidth="0"
//                                                 ></g>
//                                                 <g
//                                                   id="SVGRepo_tracerCarrier"
//                                                   strokeLinecap="round"
//                                                   strokeLinejoin="round"
//                                                 ></g>
//                                                 <g id="SVGRepo_iconCarrier">
//                                                   <path
//                                                     d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z"
//                                                     fill="#e20000"
//                                                   ></path>
//                                                 </g>
//                                               </svg> */}
//
//                                               {/* Render deeper nested lists */}
//
//                                             </li>
//                                           ))}
//                                         </ul>
//                                       </div>
//
//
//                                             </li>
//                                           ))}
//                                         </ul>
//                                       </div>
//
//
//                                   </li>
//                               );
//                             })}
//                           </ul>
//                         </motion.div>
//                       )}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//
//         <AnimatePresence>
//           {menuOption.showDropDown && menuOption?.activeItem === "tours" && (
//             <motion.div
//               initial={{
//                 opacity: 0,
//                 height: "0px",
//                 display: "none",
//               }}
//               animate={{
//                 height: menuOption.showDropDown ? "500px" : "0px",
//                 opacity: menuOption.showDropDown ? 1 : 0,
//
//                 display: menuOption.showDropDown ? "block" : "none",
//               }}
//               exit={{
//                 opacity: 0,
//                 height: "0px",
//                 display: "none",
//                 transition: { duration: 0.6 },
//               }}
//               transition={{ delay: 0, duration: 0.6 }}
//               className={styles["submenu"]}
//             >
//               <div className={styles["item-container"]}>
//                 {menuOption?.menu_det?.map((i) => {
//                   return (
//                     <>
//                       <div>
//                         <div
//                           className="d-flex justify-content-between p-2 align-items-center mb-2"
//                           style={{
//                             padding: "5px",
//                             backgroundColor: "#e2000f17",
//                             borderRadius: "10px",
//                           }}
//                         >
//                           <p className="p-0 m-0 font-size-14 font-bold">
//                             {i.name}
//                           </p>
//                           <svg
//                             width="15px"
//                             height="15px"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                             stroke="#000000"
//                             stroke-width="0.00024000000000000003"
//                           >
//                             <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//                             <g
//                               id="SVGRepo_tracerCarrier"
//                               stroke-linecap="round"
//                               stroke-linejoin="round"
//                               stroke="#CCCCCC"
//                               stroke-width="0.528"
//                             ></g>
//                             <g id="SVGRepo_iconCarrier">
//                               {" "}
//                               <path
//                                 d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
//                                 fill="#0F0F0F"
//                               ></path>{" "}
//                             </g>
//                           </svg>
//                         </div>
//
//                         <div
//                           style={{
//                             width: "100%",
//                             backgroundColor: "#fff",
//                             borderRadius: "10px",
//                             padding: "10px",
//                           }}
//                         >
//                           {i.list.map((l) => {
//                             return (
//                               <p className="p-0 mb-1 font-size-14 font-bold">
//                                 {l.name}
//                               </p>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     </>
//                   );
//                 })}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>
//     </>
//   );
// };
//
// export default NavBar;


import React, { useState, useEffect } from "react";
import Image from "next/image";
//import logo from '../../../Images/logo512.png'
import styles from "../../../styles/NavBar.module.scss";
import Link from "next/link";

//import '../../../public/kilofont.svg'
import { connect } from "react-redux";
import { selcetAccountBox } from "../../Redux/UI/ui.reselect";
import {useRouter, withRouter} from "next/router";
import { accountBoxModify } from "../../Redux/UI/ui.action";
import PopUp from "./PopUp.component";

import Account from '../account/Account.component'
import {RouteTranslator} from "../../Utils/newTour";
import useScrollDirection from "../..//sources/useScrollDirection";
// import {useScroll}
const NavBar = (props) => {
//
  const [state, setState] = useState({
    mobile: '',
    logged: false,
  });

  const router=useRouter()

  useEffect(() => {


    let token = localStorage.getItem("token");
    if (token) {
      const user_mobile = localStorage.getItem("mobile");
      setState({
        ...state,
        logged: true,
        mobile: user_mobile,
      });
    }
    // if (state.logged) {
    //   props.user.logged = state.logged;
    //   props.user.user_info = { mobile: state.mobile }
    // }
  }, [])

  useEffect(() => {


    if (localStorage.getItem("token")) {
      setState({
        ...state,
        mobile: localStorage.getItem("mobile"),
        logged: true
      })
    }
  }, [props.user])

  // if (state.logged) {
  //   var hours = 1;
  //   var now = new Date().getTime();
  //   var setupTime = localStorage.getItem('setupTime');
  //   if (setupTime == null) {
  //     localStorage.setItem('setupTime', now)
  //   } else {
  //     if (now - setupTime > hours * 6 * 6 * 1) {
  //       localStorage.clear()
  //       localStorage.setItem('setupTime', now);
  //       localStorage.removeItem("mobile")
  //     }
  //   }
  // }


  const scrollDirection = useScrollDirection();
  useEffect(()=>{
    console.log(scrollDirection)
  },[scrollDirection])

  const handleLogoutUser = (e) => {
    e.preventDefault();
    localStorage.removeItem("mobile");
    localStorage.removeItem("token");
    setState({ ...state, logged: false })
    props.user.logged = false;
  }
  return (

      <div className="col-xl-12 col-lg-12 hidden-desktop">

        <div className={styles.navbar}>
          <nav className={styles.navVar}>
            <div className="d-flex flex-row-reverse justify-content-between" >
              <div className={` ${styles["nav-text-detail"]}`}>
                <div>
                  {/* <a
              href="/villa/intro"
              className={`font-size-10 btn-outlined ${styles["btn-nav-hosting"]}`}
            >
              میزبان شوید
            </a> */}
                </div>
                <div className="font-size-12 d-flex flex-column justify-content-center">
                  <div
                      className={
                        state.logged === true
                            ? "user-mobile-content"
                            : styles["nav-detail-first-line"]
                      }
                  >
                    {state.logged == true ? (
                        <>
                          <div>
                            <Link href="/dashboard">
                              <a>
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="24"><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/></svg>
                                {state.mobile}
                              </a>
                            </Link>
                          </div>
                          <span className="mx-2">&nbsp;/</span>
                          <div>
                            <a
                                // href={props.router.route}
                                href={'#'}
                                style={{ fontSize: 12 }}
                                onClick={(e) => handleLogoutUser(e)}
                                className="cursor-pointer font-bold-iransanse"
                            >
                              خروج
                            </a>

                          </div>
                        </>
                    ) : (
                        <>
                          <div className="border-right pb-2">
                            <a
                                style={{ fontSize: 12 }}
                                href=""
                                onClick={(e) => {
                                  e.preventDefault();
                                  props.accountBoxModify({
                                    state: true,
                                    type: "register",
                                  });
                                }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" ><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/></svg>
                              <span className="font-bold-iransanse font-size-14">ورود / ثبت نام</span>
                            </a>


                          </div>
                        </>
                    )}
                  </div>
                  <div className={styles["nav-detail-second-line"]}>
                    <div href="#" style={{ fontSize: 12 }}>
                      <span className="font-bold-iransanse">مشاوره تلفنی : </span>
                      <a href="tel:02184278" >84279999-021</a>
                      <svg className='mr-21' width='20' height='20' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path d="M348.73,450.06a198.63,198.63,0,0,1-46.4-5.85c-52.43-12.65-106.42-44.74-152-90.36s-77.71-99.62-90.36-152C46.65,146.75,56.15,99.61,86.69,69.07l8.72-8.72a42.2,42.2,0,0,1,59.62,0l50.11,50.1a42.18,42.18,0,0,1,0,59.62l-29.6,29.59c14.19,24.9,33.49,49.82,56.3,72.63s47.75,42.12,72.64,56.31L334.07,299a42.15,42.15,0,0,1,59.62,0l50.1,50.1a42.16,42.16,0,0,1,0,59.61l-8.73,8.72C413.53,439,383.73,450.06,348.73,450.06ZM125.22,78a12,12,0,0,0-8.59,3.56l-8.73,8.72c-22.87,22.87-29.55,60-18.81,104.49,11.37,47.13,40.64,96.1,82.41,137.86s90.73,71,137.87,82.41c44.5,10.74,81.61,4.06,104.48-18.81l8.72-8.72a12.16,12.16,0,0,0,0-17.19l-50.09-50.1a12.16,12.16,0,0,0-17.19,0l-37.51,37.51a15,15,0,0,1-17.5,2.72c-30.75-15.9-61.75-39.05-89.65-66.95s-51-58.88-66.94-89.63a15,15,0,0,1,2.71-17.5l37.52-37.51a12.16,12.16,0,0,0,0-17.19l-50.1-50.11A12.07,12.07,0,0,0,125.22,78Z"/><path d="M364.75,269.73a15,15,0,0,1-15-15,99.37,99.37,0,0,0-99.25-99.26,15,15,0,0,1,0-30c71.27,0,129.25,58,129.25,129.26A15,15,0,0,1,364.75,269.73Z"/><path d="M428.15,269.73a15,15,0,0,1-15-15c0-89.69-73-162.66-162.65-162.66a15,15,0,0,1,0-30c106.23,0,192.65,86.43,192.65,192.66A15,15,0,0,1,428.15,269.73Z"/></g></svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-row-reverse">
                <div className={"nav-items-container"}>
                  <ul className={styles["navbar-items"]}>
                    <li>
                      <Link href="/ticket" >
                        <a>
                          <div className="mb-2 mt-1">
                            <svg width="30" height="30" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                              <g id="icomoon-ignore">
                              </g>
                              <path d="M9.123 30.464l-1.33-6.268-6.318-1.397 1.291-2.475 5.785-0.316c0.297-0.386 0.96-1.234 1.374-1.648l5.271-5.271-10.989-5.388 2.782-2.782 13.932 2.444 4.933-4.933c0.585-0.585 1.496-0.894 2.634-0.894 0.776 0 1.395 0.143 1.421 0.149l0.3 0.070 0.089 0.295c0.469 1.55 0.187 3.298-0.67 4.155l-4.956 4.956 2.434 13.875-2.782 2.782-5.367-10.945-4.923 4.924c-0.518 0.517-1.623 1.536-2.033 1.912l-0.431 5.425-2.449 1.329zM3.065 22.059l5.63 1.244 1.176 5.544 0.685-0.372 0.418-5.268 0.155-0.142c0.016-0.014 1.542-1.409 2.153-2.020l5.978-5.979 5.367 10.945 1.334-1.335-2.434-13.876 5.349-5.348c0.464-0.464 0.745-1.598 0.484-2.783-0.216-0.032-0.526-0.066-0.87-0.066-0.593 0-1.399 0.101-1.881 0.582l-5.325 5.325-13.933-2.444-1.335 1.334 10.989 5.388-6.326 6.326c-0.483 0.482-1.418 1.722-1.428 1.734l-0.149 0.198-5.672 0.31-0.366 0.702z" fill="#000000">
                              </path>
                            </svg>
                          </div>
                          بلیط هواپیما
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/tour">
                        <a>
                          {/* <i
                          className={`bilitja icon-tours  ${styles["nav-icon"]} rotate-y-180`}
                        ></i> */}
                          <div className="s" style={{marginBottom:'11px',marginTop:'1px'}}>
                            <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 23.003L19.497 23C12.59 22.958 1 22.514 1 20c0-1.09 1.756-1.416 4.187-1.866 1.193-.22 3.677-.682 3.814-1.138-.116-.368-2.117-.889-4.523-.997L4 15.979V15l1 .026c2.06.128 5 .56 5 1.974 0 1.259-2.146 1.656-4.632 2.117-1.18.219-3.153.584-3.382.94.309.97 8.324 1.887 17.515 1.943H20zM9 5.133C9 7.412 6.814 10.5 5 14c-1.814-3.5-4-6.587-4-8.868A4.04 4.04 0 0 1 5 1a4.04 4.04 0 0 1 4 4.132zm-3.435 5.752C6.817 8.66 8 6.562 8 5.132A3.035 3.035 0 0 0 5 2a3.035 3.035 0 0 0-3 3.132c0 1.43 1.183 3.53 2.435 5.753.186.332.376.668.565 1.01.19-.342.379-.678.565-1.01zM7 5a2 2 0 1 1-2-2 2 2 0 0 1 2 2zM6 5a1 1 0 1 0-1 1 1 1 0 0 0 1-1zm17 7.132c0 2.281-2.186 5.368-4 8.868-1.814-3.5-4-6.587-4-8.868a4.002 4.002 0 1 1 8 0zm-3.435 5.753C20.817 15.66 22 13.562 22 12.132a3.003 3.003 0 1 0-6 0c0 1.43 1.183 3.53 2.435 5.753.186.332.376.668.565 1.01.19-.342.379-.678.565-1.01zM21 12a2 2 0 1 1-2-2 2 2 0 0 1 2 2zm-1 0a1 1 0 1 0-1 1 1 1 0 0 0 1-1z"/><path fill="none" d="M0 0h24v24H0z"/></svg>

                          </div>
                          رزرو تور
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/hotels" >
                        <a className="" style={{color: 'gray'}}>
                          <div className="mb-1">
                            <svg style={{marginBottom:'5px'}} width="36" height="36" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M34 8.5C35.054 8.5 35.918 9.316 35.995 10.351L36 10.5V34.5C36 35.554 35.184 36.418 34.149 36.494L34 36.5H10C8.946 36.5 8.082 35.684 8.005 34.649L8 34.5V10.5C8 9.446 8.816 8.582 9.851 8.505L10 8.5H34ZM22 13.415L18.914 16.5H10V34.5H18V29.5C18 28.446 18.816 27.582 19.851 27.505L20 27.5H24C25.054 27.5 25.918 28.316 25.995 29.351L26 29.5V34.5H34V16.5H25.086L22 13.415ZM24 29.5H20V34.5H24V29.5ZM30 27.5C30.552 27.5 31 27.948 31 28.5C31 29.052 30.552 29.5 30 29.5C29.448 29.5 29 29.052 29 28.5C29 27.948 29.448 27.5 30 27.5ZM14 27.5C14.552 27.5 15 27.948 15 28.5C15 29.052 14.552 29.5 14 29.5C13.448 29.5 13 29.052 13 28.5C13 27.948 13.448 27.5 14 27.5ZM30 23.5C30.552 23.5 31 23.948 31 24.5C31 25.052 30.552 25.5 30 25.5C29.448 25.5 29 25.052 29 24.5C29 23.948 29.448 23.5 30 23.5ZM14 23.5C14.552 23.5 15 23.948 15 24.5C15 25.052 14.552 25.5 14 25.5C13.448 25.5 13 25.052 13 24.5C13 23.948 13.448 23.5 14 23.5ZM30 19.5C30.552 19.5 31 19.948 31 20.5C31 21.052 30.552 21.5 30 21.5C29.448 21.5 29 21.052 29 20.5C29 19.948 29.448 19.5 30 19.5ZM22 19.5C22.552 19.5 23 19.948 23 20.5C23 21.052 22.552 21.5 22 21.5C21.448 21.5 21 21.052 21 20.5C21 19.948 21.448 19.5 22 19.5ZM14 19.5C14.552 19.5 15 19.948 15 20.5C15 21.052 14.552 21.5 14 21.5C13.448 21.5 13 21.052 13 20.5C13 19.948 13.448 19.5 14 19.5ZM34 14.5V10.5H10V14.5H18.084L20.586 12C21.326 11.26 22.501 11.221 23.287 11.883L23.414 12L25.915 14.5H34Z" fill="#3C3C3C"/>
                            </svg>                    </div>
                          رزرو هتل
                        </a>
                      </Link>
                    </li>
                    {/*<li>*/}

                    {/*  <Link href="/blog" >*/}
                    {/*    <a>*/}
                    {/*      <div className="mb-2">*/}
                    {/*        <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*          <path d="M4.82698 7.13803L5.27248 7.36502L4.82698 7.13803ZM5.2682 18.7318L5.62175 19.0854H5.62175L5.2682 18.7318ZM17.862 16.173L17.635 15.7275L17.862 16.173ZM19.173 14.862L18.7275 14.635L19.173 14.862ZM19.173 7.13803L18.7275 7.36502V7.36502L19.173 7.13803ZM17.862 5.82698L18.089 5.38148V5.38148L17.862 5.82698ZM6.13803 5.82698L6.36502 6.27248L6.13803 5.82698ZM7.20711 16.7929L7.56066 17.1464L7.20711 16.7929ZM5 10.3C5 9.45167 5.00039 8.84549 5.03921 8.37032C5.07756 7.90099 5.15089 7.60366 5.27248 7.36502L4.38148 6.91103C4.17609 7.31413 4.08593 7.75771 4.04253 8.28889C3.99961 8.81423 4 9.46817 4 10.3H5ZM5 11.5V10.3H4V11.5H5ZM4 11.5V16.5H5V11.5H4ZM4 16.5V18.4136H5V16.5H4ZM4 18.4136C4 19.26 5.02329 19.6838 5.62175 19.0854L4.91465 18.3782C4.91754 18.3753 4.92812 18.368 4.94323 18.3654C4.9556 18.3632 4.96421 18.3654 4.96913 18.3674C4.97406 18.3695 4.98164 18.374 4.98888 18.3843C4.99771 18.3968 5 18.4095 5 18.4136H4ZM5.62175 19.0854L7.56066 17.1464L6.85355 16.4393L4.91465 18.3782L5.62175 19.0854ZM14.7 16H7.91421V17H14.7V16ZM17.635 15.7275C17.3963 15.8491 17.099 15.9224 16.6297 15.9608C16.1545 15.9996 15.5483 16 14.7 16V17C15.5318 17 16.1858 17.0004 16.7111 16.9575C17.2423 16.9141 17.6859 16.8239 18.089 16.6185L17.635 15.7275ZM18.7275 14.635C18.4878 15.1054 18.1054 15.4878 17.635 15.7275L18.089 16.6185C18.7475 16.283 19.283 15.7475 19.6185 15.089L18.7275 14.635ZM19 11.7C19 12.5483 18.9996 13.1545 18.9608 13.6297C18.9224 14.099 18.8491 14.3963 18.7275 14.635L19.6185 15.089C19.8239 14.6859 19.9141 14.2423 19.9575 13.7111C20.0004 13.1858 20 12.5318 20 11.7H19ZM19 10.3V11.7H20V10.3H19ZM18.7275 7.36502C18.8491 7.60366 18.9224 7.90099 18.9608 8.37032C18.9996 8.84549 19 9.45167 19 10.3H20C20 9.46817 20.0004 8.81423 19.9575 8.28889C19.9141 7.75771 19.8239 7.31413 19.6185 6.91103L18.7275 7.36502ZM17.635 6.27248C18.1054 6.51217 18.4878 6.89462 18.7275 7.36502L19.6185 6.91103C19.283 6.25247 18.7475 5.71703 18.089 5.38148L17.635 6.27248ZM14.7 6C15.5483 6 16.1545 6.00039 16.6297 6.03921C17.099 6.07756 17.3963 6.15089 17.635 6.27248L18.089 5.38148C17.6859 5.17609 17.2423 5.08593 16.7111 5.04253C16.1858 4.99961 15.5318 5 14.7 5V6ZM9.3 6H14.7V5H9.3V6ZM6.36502 6.27248C6.60366 6.15089 6.90099 6.07756 7.37032 6.03921C7.84549 6.00039 8.45167 6 9.3 6V5C8.46817 5 7.81423 4.99961 7.28889 5.04253C6.75771 5.08593 6.31413 5.17609 5.91103 5.38148L6.36502 6.27248ZM5.27248 7.36502C5.51217 6.89462 5.89462 6.51217 6.36502 6.27248L5.91103 5.38148C5.25247 5.71703 4.71703 6.25247 4.38148 6.91103L5.27248 7.36502ZM7.56066 17.1464C7.65443 17.0527 7.78161 17 7.91421 17V16C7.51639 16 7.13486 16.158 6.85355 16.4393L7.56066 17.1464Z" fill="#222222"/>*/}
                    {/*          <path d="M8.5 9.5L15.5 9.5" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>*/}
                    {/*          <path d="M8.5 12.5L13.5 12.5" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>*/}
                    {/*        </svg>          </div>          <p>*/}
                    {/*      بلاگ*/}
                    {/*    </p>*/}
                    {/*    </a>*/}


                    {/*  </Link>*/}
                    {/*</li>*/}
                    <li>
                      <Link href="/TrackOrder">
                        <a>
                          <div className="mb-2 mt-1 " style={{fontSize:'10px'}}>
                            <svg width="27" height="27" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M32.6172 17.8203L25.9245 27.8844C25.4988 28.5245 24.5401 28.4649 24.197 27.777L21.9143 23.2003C21.5712 22.5124 20.6125 22.4528 20.1868 23.0929L13.4941 33.157" stroke="#013136" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                              <rect x="5.84766" y="6.31836" width="34.4215" height="34.5075" rx="2" stroke="#013136" strokeWidth={2} />
                            </svg>        </div>                <p>
                          پیگیری خرید
                        </p>

                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className={styles["nav-logo-container"]}>
                  <div>
                    <a href="/" >
                      <img
                          width=""
                          height=""
                          className={styles["logo"]}
                          src="/Images/bilitja.webp"
                          alt="بلیطجا - لوگو - دسکتاپ"
                          style={{ cursor: "pointer" }}
                      />
                    </a>
                    <h1 className="font-size-10 font-bold-iransanse pt-1">
                      خرید اینترنتی بلیط هواپیما و رزرو اقامتگاه
                    </h1>
                  </div>
                </div>
              </div>

            </div>

          </nav>

          <div className={`${scrollDirection === "down"? "hide" : ""}`}>
            { router.pathname==='/'  || (router.pathname.split('/').length<=2&&(router.pathname.split('/')[1]==='tours' || router.pathname.split('/')[1]==='hotels'|| router.pathname.split('/')[1]==='flights'|| router.pathname.split('/')[1]==='tour') || router.pathname.split('/')[1]==='ticket')?null:
                <div style={{ width:'100%',height:'20px', backgroundColor:'#e20000',padding:'1rem 2rem',color:'white',display:'flex',alignItems:'center'}} key={'routebar'} >
                  {RouteTranslator(router.pathname.split('/'),router.query).map((r,i)=>{
                    return(
                        <div key={r}>

                          <span style={{fontSize:'14px',fontWeight:'700'}}>{r}</span>
                          {
                              i!==RouteTranslator(router.pathname.split('/')).length -1 &&
                              <svg height="20" viewBox="0 0 48 48" width="20" fill='#fff' xmlns="http://www.w3.org/2000/svg"><path d="M30.83 32.67l-9.17-9.17 9.17-9.17-2.83-2.83-12 12 12 12z"/><path d="M0-.5h48v48h-48z" fill="none"/></svg>

                          }
                        </div>
                    )
                  })}</div>
            }
          </div>


          <PopUp
              opened={props.accountBox.state}
              closePopUp={() => {
                props.accountBoxModify({
                  state: false,
                });
              }}
          >
            <Account />
          </PopUp>
        </div>



      </div>
  );
}

const mapDispatchesToProps = (dispatch) => ({
  accountBoxModify: (value) => dispatch(accountBoxModify(value)),
});
const mapStateToProps = (state) => ({
  user: state.user,
  accountBox: selcetAccountBox(state),
});

export default withRouter(connect(mapStateToProps, mapDispatchesToProps)(NavBar));
