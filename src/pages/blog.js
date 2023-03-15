import NavHandler from "../Components/share/NavHandler";
import Blog from "../sources/blog/Blog.page";
import Footer from "./../sources/component/Footer.component";
import Scrolltoprefresh from '../sources/component/Scrolltoprefresh';
const BloginfoRoute = (props) => {
  return (
    <div className="bodyVar">
      <Scrolltoprefresh />
      <NavHandler />
      <Blog />
      <Footer />
    </div>
  );
};


export default BloginfoRoute;
