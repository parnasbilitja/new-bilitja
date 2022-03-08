import style from "../../../styles/Blog.module.scss";
import { useRouter } from "next/router";
import ShowFlightList from "../flight_List/ShowFlightList.component";
import NavBar from "../../sources/component/NavBar.component";
import NavBarMobileComponent from "../component/NavBarMobile.component";
const Blog = () => {
  const router = useRouter();
  const breakpoint = 440;
  return (
    <div className={style["bloge"]}>
      {breakpoint === 440 ? <NavBarMobileComponent /> : <NavBar />}
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
