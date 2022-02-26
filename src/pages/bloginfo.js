import { useRouter } from "next/router";
import BlogInfo from "../sources/bloginfo/BlogInfo";
import NavBar from "./../sources/component/NavBar.component";
import Footer from "./../sources/component/Footer.component";
const BloginfoMore = () => {
  const myRouter = useRouter();
  function mainRouter(pathName) {
    var path = decodeURI(pathName);
    switch (path) {
      case "/bloginfo":
        return "";
      case "/bloginfo/test1":
        return <BlogInfo />;
      default:
        return "hello";
    }
  }
  return (
    <div className="bodyVar">
      <NavBar />
      {mainRouter(myRouter.asPath)}
      <BlogInfo />
      <Footer />
    </div>
  );
};

export default BloginfoMore;
