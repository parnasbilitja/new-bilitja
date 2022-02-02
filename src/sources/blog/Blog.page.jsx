import style from "../../../styles/Blog.module.scss";

const Blog = () => {
  return (
    <div className={style["bloge"]}>
      <div className={style["bloge-btn"]}>
        <img alt="" />
        <h3>test1</h3>
        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
        <div style={{ marginTop: 12 }}>
          <a href="/bloginfo">بیشتر بخوانید</a>
        </div>
      </div>
      <div className={style["bloge-btn"]}>
        <img alt="" />
        <h3>test2</h3>
        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
        <div style={{ marginTop: 12 }}>
          <a href="/bloginfo/test1"> بیشتر بخوانید</a>
        </div>
      </div>
      <div className={style["bloge-btn"]}>
        <img alt="" />
        <h3>test3</h3>
        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
        {/* <div style={{ marginTop: 500 }}>
          <a href="/flights/bloginfo">بیشتر بخوانید</a>
        </div> */}
        <div style={{ marginTop: 12 }}>
          <a href="/">بیشتر بخوانید</a>
        </div>
      </div>
      <div className={style["bloge-btn"]}>
        <img alt="" />
        <h3>test4</h3>
        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
        <div style={{ marginTop: 12 }}>
          <a href="/"> بیشتر بخوانید</a>
        </div>
      </div>
    </div>
  );
};
export default Blog;
