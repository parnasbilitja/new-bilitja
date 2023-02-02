import NavHandler from "../Components/share/NavHandler";
import Blog from "../sources/blog/Blog.page";
import Footer from "./../sources/component/Footer.component";
const BloginfoRoute = () => {
  
  return (
    <div className="bodyVar">
      <NavHandler />
      <Blog />
      <Footer />
    </div>
  );
};

export default BloginfoRoute;
