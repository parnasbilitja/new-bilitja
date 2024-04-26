import NavHandler from "../Components/share/NavHandler";
import Blog from "../sources/blog/Blog.page";
import Footer from "./../sources/component/Footer.component";
import Scrolltoprefresh from '../sources/component/Scrolltoprefresh';
import Head from "next/head";
const BloginfoRoute = (props) => {
  return (
    <div className="bodyVar">
        <Head>

        <title> لیست بلاگ ها | بلبطجا</title>
        </Head>
      <Scrolltoprefresh />
      <NavHandler />
      <Blog />
      <Footer />
    </div>
  );
};


export default BloginfoRoute;
