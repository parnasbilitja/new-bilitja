import style from "../../../styles/Blog.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavBarComponent from "../component/NavBar.component";
import NavBarMobileComponent from "../component/NavBarMobile.component";
const Blog = () => {
  const router = useRouter();
  const [width, setWidth] = useState();
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);
  console.log("width", width);
  return (
    <div className={style["bloge"]}>
      {width <= 769 ? <NavBarMobileComponent /> : <NavBarComponent />}
      <div className={style["bloge-btn"]}>
        <img alt="" />
        <h3>test1</h3>
        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
        <div style={{ marginTop: 12 }}>
          <a onClick={() => router.push("/flightlistadmin")}>بیشتر بخوانید</a>
        </div>
      </div>
      <div className={style["bloge-btn"]}>
        <img alt="" />
        <h3>test2</h3>
        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
        <div style={{ marginTop: 12 }}>
          <a honClick={() => router.push("/bloginfo")}> بیشتر بخوانید</a>
        </div>
      </div>
      <div className={style["bloge-btn"]}>
        <img alt="" />
        <h3>test3</h3>
        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
        <div style={{ marginTop: 12 }}>
          <a onClick={() => router.push("/bloginfo")}>بیشتر بخوانید</a>
        </div>
      </div>
      <div className={style["bloge-btn"]}>
        <img alt="" />
        <h3>test4</h3>
        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
        <div style={{ marginTop: 12 }}>
          <a onClick={() => router.push("/bloginfo")}> بیشتر بخوانید</a>
        </div>
      </div>
    </div>
  );
};
export default Blog;
