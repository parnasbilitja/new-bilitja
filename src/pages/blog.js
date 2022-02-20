import { useRouter } from "next/router";
import Blog from "../sources/blog/Blog.page";
import Footer from "./../sources/component/Footer.component";

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
      {mainRouter(myRouter.asPath)}
      <Blog />
      <Footer />

    </div>
  );
};

export default BloginfoRoute;
