import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import {Loader} from "../../Utils/Loader"
import NewLoader from "../../Components/NewTours/Components/subComponents/NewLoader";
const Blog = () => {
    const [posts, setPosts] = useState([])
    const [searchWord, setSearchWord] = useState('')
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        setLoading(true)
        const getData = async () => {
            await axios.post('https://api.hamnavaz.com/api/v1/post/getPosts',{isAdmin:0,paginate:1})
            .then(res => {
                console.log('1',res.data.data),setPosts(res.data.data),setLoading(false)})
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
  return (<>

          <div className='padd'>
              <div className="col-md-10 m-auto blog-list-parent marginTop120">
                  <div className="title-blog">
                      <div className="title-blog-item">
                          <img src="../../../Images/Document-align-2.svg" width="30" alt="لیست-وبلاگ ها"/>&nbsp;
                          <div className="text">
                              <h1>وبلاگ گردشگری بلیطجا</h1>
                              <span style={{color:'#e20000'}}>{posts.length} مقاله گردشگری و شهرگردی</span>
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
                          <div style={{marginTop:'4rem'}}>
                              <NewLoader title='لطفا صبر کنید....' />
                          </div>
                          :
                          posts.length>0?
                              posts.map((post, index) => (
                                  <>
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
                                          <div style={{marginTop:'10px',display:"flex",flexDirection:'column',rowGap:'3px'}}>
                                              <Link href={`/blogs/${post.slug}`}  rel="noreferrer" >
                                                  <p  style={{fontSize:'15px',fontWeight:'700',whiteSpace:'nowrap',padding:'0',margin:'0'}}>

                                                      {post.title}
                                                  </p>
                                              </Link>

                                              <div className="date">
                                                  <svg id="Watch" xmlns="http://www.w3.org/2000/svg" width="18" height="23" viewBox="0 0 20 26">
                                                      <path id="Path_1214" data-name="Path 1214" d="M5.645,3.145a2.144,2.144,0,0,0-.6,1.2A27.053,27.053,0,0,1,10,4a27.052,27.052,0,0,1,4.951.347,2.144,2.144,0,0,0-.6-1.2C13.811,2.6,12.625,2,10,2S6.189,2.6,5.645,3.145ZM4.23,1.73A4.449,4.449,0,0,0,3,4.995C.65,6.15,0,8.5,0,13s.65,6.85,3,8.005A4.449,4.449,0,0,0,4.23,24.27C5.311,25.35,7.125,26,10,26s4.689-.65,5.77-1.73A4.449,4.449,0,0,0,17,21.005C19.35,19.85,20,17.5,20,13s-.65-6.85-3-8.005A4.449,4.449,0,0,0,15.77,1.73C14.689.65,12.875,0,10,0S5.311.65,4.23,1.73ZM14.951,21.653A27.059,27.059,0,0,1,10,22a27.06,27.06,0,0,1-4.951-.347,2.144,2.144,0,0,0,.6,1.2C6.189,23.4,7.375,24,10,24s3.811-.6,4.355-1.145A2.144,2.144,0,0,0,14.951,21.653Zm-11.7-2.86C2.506,18.124,2,16.755,2,13s.506-5.124,1.25-5.793a4.313,4.313,0,0,1,2.106-.882A24.712,24.712,0,0,1,10,6a24.712,24.712,0,0,1,4.644.325,4.313,4.313,0,0,1,2.106.882C17.494,7.876,18,9.245,18,13s-.506,5.124-1.25,5.793a4.312,4.312,0,0,1-2.106.882A24.709,24.709,0,0,1,10,20a24.709,24.709,0,0,1-4.644-.325A4.312,4.312,0,0,1,3.25,18.793Z" fill="#e20000" fill-rule="evenodd"/>
                                                      <path id="Path_1215" data-name="Path 1215" d="M10,9v3c0,1,0,1,1,1h4" fill="none" stroke="#e20000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                                  </svg>
                                                  <span style={{fontSize:'14px', color:'#e20000'}}>منتشر شده در {post.createdAt.split('T')[0]}</span>
                                              </div>
                                          </div>


                                      </div>

                                  </>
                              ))
                              :
                              <div className="hotelNotFound">متاسفانه مورد مرطبتی موجود نیست</div>
                      }
                  </div>
                  <div>

                  </div>
              </div>
          </div>

  </>


  );
};
export default Blog;
