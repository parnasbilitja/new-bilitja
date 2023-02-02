import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import {Loader} from "../../Utils/Loader"
const Blog = () => {
    const [posts, setPosts] = useState([])
    const [searchWord, setSearchWord] = useState('')
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        setLoading(true)
        const getData = async () => {
            await axios.post('https://api.hamnavaz.com/api/v1/post/getPosts',{isAdmin:0,paginate:1})
            .then(res => {setPosts(res.data.data),setLoading(false)})
        }
        getData()
        
    },[])

    const search = (e)=>{
        e.preventDefault()
        setLoading(true)
        const getData = async () => {
            await axios.post('https://api.hamnavaz.com/api/v1/post/getPosts',{isAdmin:0,paginate:1,search:searchWord})
            .then(res => {setPosts(res.data.data),setLoading(false)})
        }
        getData()
    }
  return (
    <>
    <div className="col-md-10 m-auto blog-list-parent marginTop120">
        <div className="title-blog">
            <div className="title-blog-item">
                <img src="https://hamnavaz.com/img/Document-align-2.svg" width="30" alt="لیست-وبلاگ ها"/>&nbsp;
                <div className="text">
                    <h1>وبلاگ گردشگری بلیطجا</h1>
                    <span>{posts.length} مقاله گردشگری و شهرگردی</span>
                </div>
            </div>
            <form className="search">
                <div className="inp-form">
                    <input type="text" value={searchWord} onChange={(e)=>setSearchWord(e.target.value)} placeholder="دنبال چی هستی؟..."/>
                </div>
                <button onClick={(e)=>search(e)}>جستجو</button>
            </form>
        </div>
    <div className="list row">
            {loading?
            <Loader />:
            posts.length>0?
            posts.map((post, index) => (
                <>{index<3 &&
                    <div className="box-blog col-12 col-md-6 col-lg-3">
                        <div className="img" >
                            <div className="info-img">
                                <img src="https://hamnavaz.com/img/Attachment%201.svg" width="22" alt=""/>
                                <Link href={`/blogs/${post.slug}`}>
                                    <span style={{color:'white'}}>مشاهده جزئیات بیشتر</span>
                                </Link>
                            </div>
                            <img className="img-fix" src={post.thumbnail} alt=""/>
                        </div>
                        <h2 className="title-box-blog">
                        <Link href={`/blogs/${post.slug}`} className="link-dark" rel="noreferrer">
                            {post.title}
                        </Link>
                        </h2>
                        <div className="date">
                            <img src="https://hamnavaz.com/img/Watch-blog.svg" width="18" alt=""/>
                            <span>منتشر شده در {post.createdAt.split('T')[0]}</span>
                        </div>
                    </div>
                }
                </>
            ))
            :
            <div className="hotelNotFound">متاسفانه مرطبتی موجود نیست</div>
            }
        </div>                    
    <div>
              
          </div>
    </div>
    </>
    
    
  );
};
export default Blog;
