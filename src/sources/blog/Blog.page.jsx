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
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 49.812 49.812" className='mx-2'>
                    <g id="Document-align-2" transform="translate(0.5 0.5)">
                        <path id="Path_902" data-name="Path 902" d="M24.406,47.812a59.235,59.235,0,0,1-12.4-.982,13.178,13.178,0,0,1-6.749-3.277A13.176,13.176,0,0,1,1.982,36.8,59.224,59.224,0,0,1,1,24.406a59.224,59.224,0,0,1,.982-12.4A13.177,13.177,0,0,1,5.259,5.259a13.177,13.177,0,0,1,6.749-3.276A59.224,59.224,0,0,1,24.406,1a59.224,59.224,0,0,1,12.4.982,13.176,13.176,0,0,1,6.749,3.276,13.178,13.178,0,0,1,3.277,6.749,59.235,59.235,0,0,1,.982,12.4,59.234,59.234,0,0,1-.982,12.4,13.177,13.177,0,0,1-3.277,6.749A13.177,13.177,0,0,1,36.8,46.83,59.234,59.234,0,0,1,24.406,47.812Z" fill="none" stroke="#e20000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                        <path id="Path_903" data-name="Path 903" d="M7,7h6.383" transform="translate(6.767 6.767)" fill="none" stroke="#e20000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                        <path id="Path_904" data-name="Path 904" d="M7,12H28.278" transform="translate(6.767 12.406)" fill="none" stroke="#e20000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                        <path id="Path_905" data-name="Path 905" d="M14,17h6.383" transform="translate(14.662 18.045)" fill="none" stroke="#e20000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                    </g>
                </svg>
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
            <div className="hotelNotFound">متاسفانه مورد مرطبتی موجود نیست</div>
            }
        </div>                    
    <div>
              
          </div>
    </div>
    </>
    
    
  );
};
export default Blog;
