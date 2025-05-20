// import React, { useEffect, useRef, useState } from "react";
// //import logo from '../../../Images/logo512.png'
// //import footerLogo from '../../../Images/bilitja-light-logo.webp'
// import styles from "../../../styles/NavBarMobile.module.scss";
// import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import SlideIn from "./SlideIn.component";
// import Link from "next/link";
// import { motion, useInView } from "framer-motion";
//
// import { accountBoxModify } from "../../Redux/UI/ui.action";
// import { withRouter } from "next/router";
// import { connect } from "react-redux";
// import { Menu } from "../../Utils/Menu";
// // import {gsap} from "gsap";
//
// // import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// const NavBarMobile = (props) => {
//   // gsap.registerPlugin(ScrollTrigger);
//   const [state, setState] = useState({
//     isMenuOpen: false,
//     slide: false,
//     mobile: "",
//     logged: false,
//   });
//
//   const [menupath, setMenuPath] = useState({path:'/',data:{}});
//
//
//   function findParentByChildNameEn( targetNameEn, parent = null) {
//     for (const item of Menu) {
//       // If current item matches the target, return its parent
//       if (item.nameEn === targetNameEn) {
//         return parent;
//       }
//
//       // If the item has a nested `list`, recursively search inside it
//       if (item.list && item.list.length > 0) {
//         const foundParent = findParentByChildNameEn(item.list, targetNameEn, item);
//         if (foundParent) {
//           console.log(foundParent);
//
//           return foundParent;
//         }
//       }
//     }
//
//     return null; // Return null if not found
//   }
//   useEffect(() => {
//     let token = localStorage.getItem("token");
//     if (token) {
//       const user_mobile = localStorage.getItem("mobile");
//       setState({
//         ...state,
//         logged: true,
//         mobile: user_mobile,
//       });
//     }
//     // if (state.logged) {
//     //   props.user.logged = state.logged;
//     //   props.user.user_info = { mobile: state.mobile }
//     // }
//   }, []);
//
//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       setState({
//         ...state,
//         mobile: localStorage.getItem("mobile"),
//         logged: true,
//       });
//     }
//   }, [props.user]);
//
//   const handleLogoutUser = (e) => {
//     e.preventDefault();
//     localStorage.removeItem("mobile");
//     localStorage.removeItem("token");
//     setState({ ...state, logged: false });
//     props.user.logged = false;
//   };
//
//   // useEffect(()=>{
//   //
//   //     window.addEventListener('scroll',)
//   //     console.log(window?.scrollY)
//   // },[window?.pageYOffset])
//   const [isVisible, setIsVisible] = useState(true);
//   const { ref, inView } = useInView({ threshold: 0.5 });
//   useEffect(() => {
//     setIsVisible(inView);
//   }, [inView]);
//
//   const variants = {
//     visible: { display: "none" },
//     hidden: { display: "block" },
//   };
//   return (
//     <nav
//       className={`${styles["nav-mobile"]} hidden-mobile-head ${
//         styles[window.scrollY > 400 && "hidden"]
//       }`}
//     >
//       {/* <div className={styles['error-mobile']}> hghgshghgsd</div> */}
//
//       <motion.div
//         className={styles["nav-text-detail-mobile"]}
//         ref={ref}
//         variants={variants}
//         animate={isVisible ? "visible" : "hidden"}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="pull-right">
//           <div
//             className={
//               state.logged === true
//                 ? "user-mobile-content align-center"
//                 : styles["nav-detail-first-line"]
//             }
//           >
//             {state.logged == true ? (
//               <>
//                 <div>
//                   <Link href="/dashboard">
//                     <a>
//                       <i className="bilitja icon-login"></i>
//                       {state.mobile}
//                     </a>
//                   </Link>
//                 </div>
//                 <span className="mx-2">&nbsp;/</span>
//                 <div>
//                   <a
//                     href={"#"}
//                     style={{ fontSize: 12 }}
//                     onClick={(e) => handleLogoutUser(e)}
//                     className="cursor-pointer font-bold-iransanse"
//                   >
//                     خروج
//                   </a>
//                 </div>
//               </>
//             ) : (
//               <>
//                 {/* <div>
//                           <a
//                             style={{ fontSize: 12 }}
//                             href=""
//                             onClick={(e) => {
//                               e.preventDefault();
//                               props.accountBoxModify({
//                                 state: true,
//                                 type: "login",
//                               });
//                             }}
//                           >
//                             <i className="bilitja icon-login"></i>
//                             <span>ورود کاربر</span>
//                           </a>
//                         </div> */}
//                 <div className="border-right pb-2">
//                   <a
//                     style={{ fontSize: 12 }}
//                     href=""
//                     onClick={(e) => {
//                       e.preventDefault();
//                       props.accountBoxModify({
//                         state: true,
//                         type: "register",
//                       });
//                     }}
//                   >
//                     {/* <i className="bilitja icon-register"></i> */}
//                     {/*<i className="bilitja icon-login font-size-14 ms-1"></i>*/}
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       height="24"
//                       viewBox="0 -960 960 960"
//                       width="24"
//                     >
//                       <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
//                     </svg>
//
//                     <span className="font-bold-iransanse font-size-13">
//                       ورود / ثبت نام
//                     </span>
//                   </a>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//         <div className="pull-left">
//           <a
//             href="tel:021-84279999"
//             className="color-black font-bold-iransanse"
//           >
//             {/* <span className="text-dark mx-2">مشاوره تلفنی</span> */}
//             <span
//               className="text-dark font-size-14"
//               style={{ direction: "ltr" }}
//             >
//               {" "}
//               &nbsp;021-84278
//             </span>
//             {/*<i className="bilitja icon-phone font-size-16"></i>*/}
//             <svg
//               className="mr-21"
//               width="20"
//               height="20"
//               viewBox="0 0 512 512"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <title />
//               <g data-name="1" id="_1">
//                 <path d="M348.73,450.06a198.63,198.63,0,0,1-46.4-5.85c-52.43-12.65-106.42-44.74-152-90.36s-77.71-99.62-90.36-152C46.65,146.75,56.15,99.61,86.69,69.07l8.72-8.72a42.2,42.2,0,0,1,59.62,0l50.11,50.1a42.18,42.18,0,0,1,0,59.62l-29.6,29.59c14.19,24.9,33.49,49.82,56.3,72.63s47.75,42.12,72.64,56.31L334.07,299a42.15,42.15,0,0,1,59.62,0l50.1,50.1a42.16,42.16,0,0,1,0,59.61l-8.73,8.72C413.53,439,383.73,450.06,348.73,450.06ZM125.22,78a12,12,0,0,0-8.59,3.56l-8.73,8.72c-22.87,22.87-29.55,60-18.81,104.49,11.37,47.13,40.64,96.1,82.41,137.86s90.73,71,137.87,82.41c44.5,10.74,81.61,4.06,104.48-18.81l8.72-8.72a12.16,12.16,0,0,0,0-17.19l-50.09-50.1a12.16,12.16,0,0,0-17.19,0l-37.51,37.51a15,15,0,0,1-17.5,2.72c-30.75-15.9-61.75-39.05-89.65-66.95s-51-58.88-66.94-89.63a15,15,0,0,1,2.71-17.5l37.52-37.51a12.16,12.16,0,0,0,0-17.19l-50.1-50.11A12.07,12.07,0,0,0,125.22,78Z" />
//                 <path d="M364.75,269.73a15,15,0,0,1-15-15,99.37,99.37,0,0,0-99.25-99.26,15,15,0,0,1,0-30c71.27,0,129.25,58,129.25,129.26A15,15,0,0,1,364.75,269.73Z" />
//                 <path d="M428.15,269.73a15,15,0,0,1-15-15c0-89.69-73-162.66-162.65-162.66a15,15,0,0,1,0-30c106.23,0,192.65,86.43,192.65,192.66A15,15,0,0,1,428.15,269.73Z" />
//               </g>
//             </svg>
//           </a>
//         </div>
//       </motion.div>
//       <div className={styles["nav-logo-container-mobile"]}>
//         <div className="pull-right d-flex mb-0">
//           <FontAwesomeIcon
//             icon={faBars}
//             onClick={() => {
//               setState({
//                 slide: true,
//               });
//             }}
//             className="mobile-nav-barsicon"
//           />
//           <h1
//             className="font-bold-iransanse font-size-11 mb-0 d-flex align-center"
//             style={{ alignItems: "center" }}
//           >
//             {" "}
//             خرید اینترنتی بلیط هواپیما و رزرو اقامتگاه{" "}
//           </h1>
//         </div>
//         <Link href="/">
//           <img
//             width="100px"
//             height="80px"
//             alt="بلیطجا - لوگو"
//             src="../../../../Images/bilitja.webp"
//             className="pull-left"
//           />
//         </Link>
//       </div>
//
//       <SlideIn
//         slide={state.slide}
//         close={() => {
//           setState({
//             slide: false,
//           });
//         }}
//       >
//         <div className={styles["nav-items-container-mobile"]}>
//           <div className={styles["logo-menu-mobile"]}>
//             <a href="/">
//               <div className="d-flex justify-content-center align-items-center w-full">
//                 <div className={styles["img-container"]}>
//                   <img
//                     alt="بلیطجا - لوگو - موبایل"
//                     src="../../../Images/bilitja.webp"
//                   />
//                 </div>
//               </div>
//             </a>
//             <p className="no-margin color-white">ارزان ترین بلیط های هواپیما</p>
//           </div>
//           {/* <div>
//             <FontAwesomeIcon
//               icon={faTimes}
//               onClick={() => {
//                 setState({
//                   slide: false,
//                 });
//               }}
//               className="mt-2 ms-2 mobile-nav-timesicon"
//             />
//           </div> */}
//
//           <div className={styles["menu-container"]}>
//             <div>
//               {menupath.path==='/' ? Menu.map((menu) => (
//                 <div onClick={()=>{setMenuPath({path:menu.nameEn,data:menu})}} className="w-full d-flex align-items-center justify-content-between">
//                   <div className={styles["menu-item"]}>
//                     {menu.logo}
//
//                     <p>{menu.name}</p>
//                   </div>
//                   {menu?.list?.length > 0 && (
//                     <svg
//                       width="20px"
//                       height="20px"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                       stroke="#e20000"
//                       strokeWidth="0.00024000000000000003"
//                     >
//                       <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
//                       <g
//                         id="SVGRepo_tracerCarrier"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       ></g>
//                       <g id="SVGRepo_iconCarrier">
//                         <path
//                           d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z"
//                           fill="#e20000"
//                         ></path>
//                       </g>
//                     </svg>
//                   )}
//                 </div>
//               )):
//
//               <>
//
//               <div className={styles['title-container']}>
//
//               <div className={styles['submenu']}>
//               <div className={styles['circle']}></div>
//                 <p >{menupath?.data?.name}</p>
//
//               </div>
//               <button onClick={()=>{setMenuPath({path:'/',data:{}})}}>بازگشت</button>
//
//               </div>
//
//               <div style={{padding:'10px'}}>
//               {
//   menupath?.data?.list?.map((menu) => (
//                 <div onClick={()=>{setMenuPath({path:menu.nameEn,data:menu})}} className="w-full d-flex align-items-center justify-content-between">
//                   <div className={styles["menu-item"]}>
//                     {menu.logo}
//
//                     <p>{menu.name}</p>
//                   </div>
//                   {menu?.list?.length > 0 && (
//                     <svg
//                       width="20px"
//                       height="20px"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                       stroke="#e20000"
//                       strokeWidth="0.00024000000000000003"
//                     >
//                       <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
//                       <g
//                         id="SVGRepo_tracerCarrier"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       ></g>
//                       <g id="SVGRepo_iconCarrier">
//                         <path
//                           d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z"
//                           fill="#e20000"
//                         ></path>
//                       </g>
//                     </svg>
//                   )}
//                 </div>
//               ))
// }
//               </div>
//
//               </>
//
//
//
//               }
//
//
//             </div>
//           </div>
//
//           {/* <ul className="mt-2">
//             <li>
//               <div>
//                 <a href="/ticket" className="d-flex" style={{alignItems: 'center'}}>
//                     <svg width="30" height="30" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" >
//                         <g id="icomoon-ignore">
//                         </g>
//                         <path d="M9.123 30.464l-1.33-6.268-6.318-1.397 1.291-2.475 5.785-0.316c0.297-0.386 0.96-1.234 1.374-1.648l5.271-5.271-10.989-5.388 2.782-2.782 13.932 2.444 4.933-4.933c0.585-0.585 1.496-0.894 2.634-0.894 0.776 0 1.395 0.143 1.421 0.149l0.3 0.070 0.089 0.295c0.469 1.55 0.187 3.298-0.67 4.155l-4.956 4.956 2.434 13.875-2.782 2.782-5.367-10.945-4.923 4.924c-0.518 0.517-1.623 1.536-2.033 1.912l-0.431 5.425-2.449 1.329zM3.065 22.059l5.63 1.244 1.176 5.544 0.685-0.372 0.418-5.268 0.155-0.142c0.016-0.014 1.542-1.409 2.153-2.020l5.978-5.979 5.367 10.945 1.334-1.335-2.434-13.876 5.349-5.348c0.464-0.464 0.745-1.598 0.484-2.783-0.216-0.032-0.526-0.066-0.87-0.066-0.593 0-1.399 0.101-1.881 0.582l-5.325 5.325-13.933-2.444-1.335 1.334 10.989 5.388-6.326 6.326c-0.483 0.482-1.418 1.722-1.428 1.734l-0.149 0.198-5.672 0.31-0.366 0.702z" fill="#000000">
//
//                         </path>
//                     </svg>
//                   <span className="pull-right font-size-14 color-black me-2">
//                     بلیط هواپیما
//                   </span>
//                 </a>
//                 <div className="clear"></div>
//               </div>
//             </li>
//             <li className="">
//               <div>
//                 <a href="/hotels" className="d-flex" style={{alignItems: 'center'}}>
//                     <svg width="35" height="35" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M34 8.5C35.054 8.5 35.918 9.316 35.995 10.351L36 10.5V34.5C36 35.554 35.184 36.418 34.149 36.494L34 36.5H10C8.946 36.5 8.082 35.684 8.005 34.649L8 34.5V10.5C8 9.446 8.816 8.582 9.851 8.505L10 8.5H34ZM22 13.415L18.914 16.5H10V34.5H18V29.5C18 28.446 18.816 27.582 19.851 27.505L20 27.5H24C25.054 27.5 25.918 28.316 25.995 29.351L26 29.5V34.5H34V16.5H25.086L22 13.415ZM24 29.5H20V34.5H24V29.5ZM30 27.5C30.552 27.5 31 27.948 31 28.5C31 29.052 30.552 29.5 30 29.5C29.448 29.5 29 29.052 29 28.5C29 27.948 29.448 27.5 30 27.5ZM14 27.5C14.552 27.5 15 27.948 15 28.5C15 29.052 14.552 29.5 14 29.5C13.448 29.5 13 29.052 13 28.5C13 27.948 13.448 27.5 14 27.5ZM30 23.5C30.552 23.5 31 23.948 31 24.5C31 25.052 30.552 25.5 30 25.5C29.448 25.5 29 25.052 29 24.5C29 23.948 29.448 23.5 30 23.5ZM14 23.5C14.552 23.5 15 23.948 15 24.5C15 25.052 14.552 25.5 14 25.5C13.448 25.5 13 25.052 13 24.5C13 23.948 13.448 23.5 14 23.5ZM30 19.5C30.552 19.5 31 19.948 31 20.5C31 21.052 30.552 21.5 30 21.5C29.448 21.5 29 21.052 29 20.5C29 19.948 29.448 19.5 30 19.5ZM22 19.5C22.552 19.5 23 19.948 23 20.5C23 21.052 22.552 21.5 22 21.5C21.448 21.5 21 21.052 21 20.5C21 19.948 21.448 19.5 22 19.5ZM14 19.5C14.552 19.5 15 19.948 15 20.5C15 21.052 14.552 21.5 14 21.5C13.448 21.5 13 21.052 13 20.5C13 19.948 13.448 19.5 14 19.5ZM34 14.5V10.5H10V14.5H18.084L20.586 12C21.326 11.26 22.501 11.221 23.287 11.883L23.414 12L25.915 14.5H34Z" fill="#3C3C3C"/>
//                     </svg>
//                   <span className="pull-right font-size-14 color-black" style={{marginRight:'0.8rem'}}>
//                     هتل
//                   </span>
//                 </a>
//                 <div className="clear"></div>
//               </div>
//             </li>
//             <li>
//               <div>
//                 <a href="/tours" className="d-flex" style={{alignItems: 'center'}}>
//                     <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 23.003L19.497 23C12.59 22.958 1 22.514 1 20c0-1.09 1.756-1.416 4.187-1.866 1.193-.22 3.677-.682 3.814-1.138-.116-.368-2.117-.889-4.523-.997L4 15.979V15l1 .026c2.06.128 5 .56 5 1.974 0 1.259-2.146 1.656-4.632 2.117-1.18.219-3.153.584-3.382.94.309.97 8.324 1.887 17.515 1.943H20zM9 5.133C9 7.412 6.814 10.5 5 14c-1.814-3.5-4-6.587-4-8.868A4.04 4.04 0 0 1 5 1a4.04 4.04 0 0 1 4 4.132zm-3.435 5.752C6.817 8.66 8 6.562 8 5.132A3.035 3.035 0 0 0 5 2a3.035 3.035 0 0 0-3 3.132c0 1.43 1.183 3.53 2.435 5.753.186.332.376.668.565 1.01.19-.342.379-.678.565-1.01zM7 5a2 2 0 1 1-2-2 2 2 0 0 1 2 2zM6 5a1 1 0 1 0-1 1 1 1 0 0 0 1-1zm17 7.132c0 2.281-2.186 5.368-4 8.868-1.814-3.5-4-6.587-4-8.868a4.002 4.002 0 1 1 8 0zm-3.435 5.753C20.817 15.66 22 13.562 22 12.132a3.003 3.003 0 1 0-6 0c0 1.43 1.183 3.53 2.435 5.753.186.332.376.668.565 1.01.19-.342.379-.678.565-1.01zM21 12a2 2 0 1 1-2-2 2 2 0 0 1 2 2zm-1 0a1 1 0 1 0-1 1 1 1 0 0 0 1-1z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
//                   <span className="pull-right font-size-14 color-black" style={{marginRight:'0.8rem'}}>
//                     تور
//                   </span>
//                 </a>
//                 <div className="clear"></div>
//               </div>
//             </li>
//             <li>
//               <div>
//                   <a href="/blog">
//                     <i className="bilitja font-size-24 icon-blog pull-right rotate-y-180"></i>
//                     <span className="pull-right font-size-14 color-black">
//                       بلاگ
//                     </span>
//                   </a>
//                   <div className="clear"></div>
//                 </div>
//             </li>
//
//             <li>
//               <div>
//                 <a href="/TrackOrder">
//                      <span className="pull-right font-size-14 color-black">
//  <svg width="30" height="30" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M32.6172 17.8203L25.9245 27.8844C25.4988 28.5245 24.5401 28.4649 24.197 27.777L21.9143 23.2003C21.5712 22.5124 20.6125 22.4528 20.1868 23.0929L13.4941 33.157" stroke="#013136" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
//                           <rect x="5.84766" y="6.31836" width="34.4215" height="34.5075" rx="2" stroke="#013136" strokeWidth={2} />
//                         </svg>                      پیگیری خرید
//                   </span>
//
//
//                     <i className="bilitja font-size-14 icon-refrence pull-right rotate-y-180 text-dark"></i>
//
//                 </a>
//                 <div className="clear"></div>
//               </div>
//             </li>
//             <li>
//               <div>
//                 <a href="#">
//                   <i className="bilitja font-size-24 icon-refrence pull-right rotate-y-180"></i>
//                   <span className="pull-right font-size-14 color-black">
//                     درباره ما
//                   </span>
//                 </a>
//                 <div className="clear"></div>
//               </div>
//             </li>
//           </ul> */}
//         </div>
//       </SlideIn>
//     </nav>
//   );
// };
// const mapDispatchesToProps = (dispatch) => ({
//   accountBoxModify: (value) => dispatch(accountBoxModify(value)),
// });
// const mapStateToProps = (state) => ({
//   user: state.user,
// });
//
// export default withRouter(
//   connect(mapStateToProps, mapDispatchesToProps)(NavBarMobile)
// );


import React, {useEffect, useRef, useState} from "react";
//import logo from '../../../Images/logo512.png'
//import footerLogo from '../../../Images/bilitja-light-logo.webp'
import styles from "../../../styles/NavBarMobile.module.scss";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SlideIn from "./SlideIn.component";
import Link from "next/link";
import {motion, useInView} from "framer-motion";

import { accountBoxModify } from "../../Redux/UI/ui.action";
import { withRouter } from "next/router";
import { connect } from "react-redux";
// import {gsap} from "gsap";

// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
const NavBarMobile = (props) => {
// gsap.registerPlugin(ScrollTrigger);
  const [state, setState] = useState({
    isMenuOpen: false,
    slide: false,
    mobile: '',
    logged: false,
  });

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

  const handleLogoutUser = (e) => {
    e.preventDefault();
    localStorage.removeItem("mobile");
    localStorage.removeItem("token");
    setState({ ...state, logged: false })
    props.user.logged = false;
  }


// useEffect(()=>{
//
//     window.addEventListener('scroll',)
//     console.log(window?.scrollY)
// },[window?.pageYOffset])
  const [isVisible, setIsVisible] = useState(true);
  const { ref, inView } = useInView({ threshold: 0.5 });
  useEffect(() => {
    setIsVisible(inView);
  }, [inView]);

  const variants = {
    visible: { display: 'none' },
    hidden: { display: 'block' },
  };
  return (
      <nav className={`${styles["nav-mobile"]} hidden-mobile-head ${styles[window.scrollY>400 && 'hidden']}`}>
        {/* <div className={styles['error-mobile']}> hghgshghgsd</div> */}

        <motion.div className={styles["nav-text-detail-mobile"]}
                    ref={ref} variants={variants} animate={isVisible ? 'visible' : 'hidden'} transition={{ duration: 0.5 }}
        >
          <div className="pull-right">
            <div
                className={
                  state.logged === true
                      ? "user-mobile-content align-center"
                      : styles["nav-detail-first-line"]
                }
            >
              {state.logged == true ? (
                  <>
                    <div>
                      <Link href="/dashboard">
                        <a>
                          <i className="bilitja icon-login"></i>
                          {state.mobile}
                        </a>
                      </Link>
                    </div>
                    <span className="mx-2">&nbsp;/</span>
                    <div>
                      <a
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
                    {/* <div>
                          <a
                            style={{ fontSize: 12 }}
                            href=""
                            onClick={(e) => {
                              e.preventDefault();
                              props.accountBoxModify({
                                state: true,
                                type: "login",
                              });
                            }}
                          >
                            <i className="bilitja icon-login"></i>
                            <span>ورود کاربر</span>
                          </a>
                        </div> */}
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
                        {/* <i className="bilitja icon-register"></i> */}
                        {/*<i className="bilitja icon-login font-size-14 ms-1"></i>*/}
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/></svg>

                        <span className="font-bold-iransanse font-size-13">ورود / ثبت نام</span>
                      </a>
                    </div>
                  </>
              )}
            </div>
          </div>
          <div className="pull-left">
            <a href="tel:021-84279999" className="color-black font-bold-iransanse">
              {/* <span className="text-dark mx-2">مشاوره تلفنی</span> */}
              <span className="text-dark font-size-14" style={{direction:'ltr'}}> &nbsp;021-84278</span>
              {/*<i className="bilitja icon-phone font-size-16"></i>*/}
              <svg className='mr-21' width='20' height='20' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path d="M348.73,450.06a198.63,198.63,0,0,1-46.4-5.85c-52.43-12.65-106.42-44.74-152-90.36s-77.71-99.62-90.36-152C46.65,146.75,56.15,99.61,86.69,69.07l8.72-8.72a42.2,42.2,0,0,1,59.62,0l50.11,50.1a42.18,42.18,0,0,1,0,59.62l-29.6,29.59c14.19,24.9,33.49,49.82,56.3,72.63s47.75,42.12,72.64,56.31L334.07,299a42.15,42.15,0,0,1,59.62,0l50.1,50.1a42.16,42.16,0,0,1,0,59.61l-8.73,8.72C413.53,439,383.73,450.06,348.73,450.06ZM125.22,78a12,12,0,0,0-8.59,3.56l-8.73,8.72c-22.87,22.87-29.55,60-18.81,104.49,11.37,47.13,40.64,96.1,82.41,137.86s90.73,71,137.87,82.41c44.5,10.74,81.61,4.06,104.48-18.81l8.72-8.72a12.16,12.16,0,0,0,0-17.19l-50.09-50.1a12.16,12.16,0,0,0-17.19,0l-37.51,37.51a15,15,0,0,1-17.5,2.72c-30.75-15.9-61.75-39.05-89.65-66.95s-51-58.88-66.94-89.63a15,15,0,0,1,2.71-17.5l37.52-37.51a12.16,12.16,0,0,0,0-17.19l-50.1-50.11A12.07,12.07,0,0,0,125.22,78Z"/><path d="M364.75,269.73a15,15,0,0,1-15-15,99.37,99.37,0,0,0-99.25-99.26,15,15,0,0,1,0-30c71.27,0,129.25,58,129.25,129.26A15,15,0,0,1,364.75,269.73Z"/><path d="M428.15,269.73a15,15,0,0,1-15-15c0-89.69-73-162.66-162.65-162.66a15,15,0,0,1,0-30c106.23,0,192.65,86.43,192.65,192.66A15,15,0,0,1,428.15,269.73Z"/></g></svg>

            </a>
          </div>
        </motion.div>
        <div className={styles["nav-logo-container-mobile"]}>
          <div className="pull-right d-flex mb-0">
            <FontAwesomeIcon
                icon={faBars}
                onClick={() => {
                  setState({
                    slide: true,
                  });
                }}
                className="mobile-nav-barsicon"
            />
            <h1 className="font-bold-iransanse font-size-11 mb-0 d-flex align-center" style={{alignItems: 'center'}}>
              {" "}
              خرید اینترنتی بلیط هواپیما و رزرو اقامتگاه{" "}
            </h1>
          </div>
          <Link href="/">
            <img
                width=""
                height=""
                alt="بلیطجا - لوگو"
                src="../../../../Images/bilitja.webp"
                className="pull-left"
                // style={{width:'50%',height:'120px'}}

            />
          </Link>
        </div>

        <SlideIn
            slide={state.slide}
            close={() => {
              setState({
                slide: false,
              });
            }}
        >
          <div className={styles["nav-items-container-mobile"]}>
            <div className={styles["logo-menu-mobile"]}>
              <a href="/" style={{width:'100%' , display:'flex' ,justifyContent:'center'}}>
                <img
                    width=""
                    height=""
                    alt="بلیطجا - لوگو - موبایل"
                    src="../../../Images/bilitja.webp"
                    style={{width:'50%',height:'80px'}}
                />
              </a>
              <p className="no-margin color-white">
                ارزان ترین بلیط های هواپیما
              </p>
            </div>
            <div>
              <FontAwesomeIcon
                  icon={faTimes}
                  onClick={() => {
                    setState({
                      slide: false,
                    });
                  }}
                  className="mt-2 ms-2 mobile-nav-timesicon"
              />
            </div>

            <ul className="mt-2">
              <li>
                <div>
                  <a href="/ticket" className="d-flex" style={{alignItems: 'center'}}>
                    <svg width="30" height="30" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                      <g id="icomoon-ignore">
                      </g>
                      <path d="M9.123 30.464l-1.33-6.268-6.318-1.397 1.291-2.475 5.785-0.316c0.297-0.386 0.96-1.234 1.374-1.648l5.271-5.271-10.989-5.388 2.782-2.782 13.932 2.444 4.933-4.933c0.585-0.585 1.496-0.894 2.634-0.894 0.776 0 1.395 0.143 1.421 0.149l0.3 0.070 0.089 0.295c0.469 1.55 0.187 3.298-0.67 4.155l-4.956 4.956 2.434 13.875-2.782 2.782-5.367-10.945-4.923 4.924c-0.518 0.517-1.623 1.536-2.033 1.912l-0.431 5.425-2.449 1.329zM3.065 22.059l5.63 1.244 1.176 5.544 0.685-0.372 0.418-5.268 0.155-0.142c0.016-0.014 1.542-1.409 2.153-2.020l5.978-5.979 5.367 10.945 1.334-1.335-2.434-13.876 5.349-5.348c0.464-0.464 0.745-1.598 0.484-2.783-0.216-0.032-0.526-0.066-0.87-0.066-0.593 0-1.399 0.101-1.881 0.582l-5.325 5.325-13.933-2.444-1.335 1.334 10.989 5.388-6.326 6.326c-0.483 0.482-1.418 1.722-1.428 1.734l-0.149 0.198-5.672 0.31-0.366 0.702z" fill="#000000">

                      </path>
                    </svg>
                    <span className="pull-right font-size-14 color-black me-2">
                    بلیط هواپیما
                  </span>
                  </a>
                  <div className="clear"></div>
                </div>
              </li>
              <li className="">
                <div>
                  <a href="/hotels" className="d-flex" style={{alignItems: 'center'}}>
                    <svg width="35" height="35" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M34 8.5C35.054 8.5 35.918 9.316 35.995 10.351L36 10.5V34.5C36 35.554 35.184 36.418 34.149 36.494L34 36.5H10C8.946 36.5 8.082 35.684 8.005 34.649L8 34.5V10.5C8 9.446 8.816 8.582 9.851 8.505L10 8.5H34ZM22 13.415L18.914 16.5H10V34.5H18V29.5C18 28.446 18.816 27.582 19.851 27.505L20 27.5H24C25.054 27.5 25.918 28.316 25.995 29.351L26 29.5V34.5H34V16.5H25.086L22 13.415ZM24 29.5H20V34.5H24V29.5ZM30 27.5C30.552 27.5 31 27.948 31 28.5C31 29.052 30.552 29.5 30 29.5C29.448 29.5 29 29.052 29 28.5C29 27.948 29.448 27.5 30 27.5ZM14 27.5C14.552 27.5 15 27.948 15 28.5C15 29.052 14.552 29.5 14 29.5C13.448 29.5 13 29.052 13 28.5C13 27.948 13.448 27.5 14 27.5ZM30 23.5C30.552 23.5 31 23.948 31 24.5C31 25.052 30.552 25.5 30 25.5C29.448 25.5 29 25.052 29 24.5C29 23.948 29.448 23.5 30 23.5ZM14 23.5C14.552 23.5 15 23.948 15 24.5C15 25.052 14.552 25.5 14 25.5C13.448 25.5 13 25.052 13 24.5C13 23.948 13.448 23.5 14 23.5ZM30 19.5C30.552 19.5 31 19.948 31 20.5C31 21.052 30.552 21.5 30 21.5C29.448 21.5 29 21.052 29 20.5C29 19.948 29.448 19.5 30 19.5ZM22 19.5C22.552 19.5 23 19.948 23 20.5C23 21.052 22.552 21.5 22 21.5C21.448 21.5 21 21.052 21 20.5C21 19.948 21.448 19.5 22 19.5ZM14 19.5C14.552 19.5 15 19.948 15 20.5C15 21.052 14.552 21.5 14 21.5C13.448 21.5 13 21.052 13 20.5C13 19.948 13.448 19.5 14 19.5ZM34 14.5V10.5H10V14.5H18.084L20.586 12C21.326 11.26 22.501 11.221 23.287 11.883L23.414 12L25.915 14.5H34Z" fill="#3C3C3C"/>
                    </svg>
                    <span className="pull-right font-size-14 color-black" style={{marginRight:'0.8rem'}}>
                    هتل
                  </span>
                  </a>
                  <div className="clear"></div>
                </div>
              </li>
              <li>
                <div>
                  <a href="/tours" className="d-flex" style={{alignItems: 'center'}}>
                    <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 23.003L19.497 23C12.59 22.958 1 22.514 1 20c0-1.09 1.756-1.416 4.187-1.866 1.193-.22 3.677-.682 3.814-1.138-.116-.368-2.117-.889-4.523-.997L4 15.979V15l1 .026c2.06.128 5 .56 5 1.974 0 1.259-2.146 1.656-4.632 2.117-1.18.219-3.153.584-3.382.94.309.97 8.324 1.887 17.515 1.943H20zM9 5.133C9 7.412 6.814 10.5 5 14c-1.814-3.5-4-6.587-4-8.868A4.04 4.04 0 0 1 5 1a4.04 4.04 0 0 1 4 4.132zm-3.435 5.752C6.817 8.66 8 6.562 8 5.132A3.035 3.035 0 0 0 5 2a3.035 3.035 0 0 0-3 3.132c0 1.43 1.183 3.53 2.435 5.753.186.332.376.668.565 1.01.19-.342.379-.678.565-1.01zM7 5a2 2 0 1 1-2-2 2 2 0 0 1 2 2zM6 5a1 1 0 1 0-1 1 1 1 0 0 0 1-1zm17 7.132c0 2.281-2.186 5.368-4 8.868-1.814-3.5-4-6.587-4-8.868a4.002 4.002 0 1 1 8 0zm-3.435 5.753C20.817 15.66 22 13.562 22 12.132a3.003 3.003 0 1 0-6 0c0 1.43 1.183 3.53 2.435 5.753.186.332.376.668.565 1.01.19-.342.379-.678.565-1.01zM21 12a2 2 0 1 1-2-2 2 2 0 0 1 2 2zm-1 0a1 1 0 1 0-1 1 1 1 0 0 0 1-1z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
                    <span className="pull-right font-size-14 color-black" style={{marginRight:'0.8rem'}}>
                    تور
                  </span>
                  </a>
                  <div className="clear"></div>
                </div>
              </li>
              <li>
                {/* <div>
                  <a href="/blog">
                    <i className="bilitja font-size-24 icon-blog pull-right rotate-y-180"></i>
                    <span className="pull-right font-size-14 color-black">
                      بلاگ
                    </span>
                  </a>
                  <div className="clear"></div>
                </div> */}
              </li>

              <li>
                <div>
                  <a href="/TrackOrder">
                     <span className="pull-right font-size-14 color-black">
 <svg width="30" height="30" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M32.6172 17.8203L25.9245 27.8844C25.4988 28.5245 24.5401 28.4649 24.197 27.777L21.9143 23.2003C21.5712 22.5124 20.6125 22.4528 20.1868 23.0929L13.4941 33.157" stroke="#013136" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          <rect x="5.84766" y="6.31836" width="34.4215" height="34.5075" rx="2" stroke="#013136" strokeWidth={2} />
                        </svg>                      پیگیری خرید
                  </span>


                    {/*<i className="bilitja font-size-14 icon-refrence pull-right rotate-y-180 text-dark"></i>*/}

                  </a>
                  <div className="clear"></div>
                </div>
              </li>
              {/* <li>
              <div>
                <a href="#">
                  <i className="bilitja font-size-24 icon-refrence pull-right rotate-y-180"></i>
                  <span className="pull-right font-size-14 color-black">
                    درباره ما
                  </span>
                </a>
                <div className="clear"></div>
              </div>
            </li> */}
            </ul>
          </div>
        </SlideIn>
      </nav>
  );
}
const mapDispatchesToProps = (dispatch) => ({
  accountBoxModify: (value) => dispatch(accountBoxModify(value)),
});
const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps, mapDispatchesToProps)(NavBarMobile));

