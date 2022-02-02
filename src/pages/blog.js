import { useRouter } from "next/router";
import Blog from "../sources/blog/Blog.page";
import NavBarMobileComponent from "../sources/component/NavBarMobile.component";
import NavBar from "./../sources/component/NavBar.component";
import Footer from "./../sources/component/Footer.component";
import BlogInfo from "../sources/bloginfo/BlogInfo";

const BloginfoRoute = () => {
  const myRouter = useRouter();
  function mainRouter(pathName) {
    var path = decodeURI(pathName);

    switch (path) {
      case "/blog":
        return "";
      default:
        return "hello";
    }
  }
  return (
    <div className="bodyVar">
      <NavBar />
      {mainRouter(myRouter.asPath)}
      <Blog />
      <Footer />
    </div>
  );
};

export default BloginfoRoute;
