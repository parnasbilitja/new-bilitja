import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import NavHandler from '../../Components/share/NavHandler';
import Footer from '../../sources/component/Footer.component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendar } from "@fortawesome/free-solid-svg-icons";

const blog = (props) => {
    const [post, setPost] = useState([])
    useEffect(()=>{
        const getData = async () => {
            await axios.get(`https://api.hamnavaz.com/api/v1/post/getPost/${props.Pathname.blog}`)
            .then(res => {setPost(res.data.data)})
        }
        getData()
        
    },[])
    const Ref = useRef(null);

  const scrollToTop = () => {
    Ref.current.scrollIntoView({ block: "end", behavior: "smooth" });
  };

  
    return (
        <div className="mt-100">
        <NavHandler/>
            <div class="col-md-10 flex-column-mobi m-auto blog-info-parent">
                    <div class="col-md-9">
                        <div class="tops" ref={Ref}>
                            <div class="details">
                                <div class="title">
                                    <div class="title-blog title-blog2">
                                        <img src="https://hamnavaz.com/img/Document-align-2.svg" width="30" alt=""/>
                                        <div class="text me-2">
                                            <h1>{post.title}</h1>
                                            <span>
                                                دسته بندی مقاله :
                                                {post.categories?.map((category)=>(
                                                    <span>{category.name}</span>
                                                    ))}
                                            </span>
                                        </div>
                                    </div> 
                                </div>
                                <div class="box-details w-100-mobi">
                                    <div class="box-details-top">
                                        <div class="view-number">
                                            <img src="https://hamnavaz.com/img/Scanning%205.svg" width="22" alt=""/>
                                            <span> تعداد دیدگاه :  </span>
                                        </div>
                                        <div class="date">
                                            <span>{post.viewCount}</span>
                                        </div>
                                    </div>
                                    <div class="box-details-bottom">
                                        <div class="share">
                                            <img src="https://hamnavaz.com/img/Navigation2.svg" width="20" alt=""/>
                                        </div>
                                        <div class="social-media">
                                            <div class="wrapper">
                                                <div class="icon instagram">
                                                    <div class="tooltip">Telegram
                                                        <a style={{marginRight: "10px"}} data-text="Take a look at this awesome website:" class="wa_btn wa_btn_s link-telegram">
                                                            
                                                        </a>
                                                    </div>
                                                    <div class="span-margin"><i class=" icon-telegram"></i></div>
                                                    </div>
                                                    <div class="icon github">
                                                        <div class="tooltip">
                                                            <a href="whatsapp://send?text=+'https://hamnavaz.com/livewire/message/store.blog.blog-info">whatsapp</a>
                                                        </div>
                                                        <a href="whatsapp://send?text=+https://hamnavaz.com/livewire/message/store.blog.blog-info">
                                                            <div class="span-margin"><i class="icon-whatsapp"></i>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="img"><img src={post.thumbnail} alt={post.name}/></div>
                                </div>
                                <div class="bottom">
                                    <div className="bg-text" dangerouslySetInnerHTML={{__html:post.body}} />
                                </div>
                            </div>
                            <div class="col-md-3 sidebar-blog" style={{marginRight:'2.1rem'}}>
                                <div class="box-all d-flex flex-column w-100 ">
                                    <div class="box-category">
                                        <div class="title-category">
                                            <img src="https://hamnavaz.com/img/category.png" width="20" alt=""/>
                                            <strong>دسته‌بندی</strong>
                                        </div>
                                        <ul class="under-category">
                                            {post.categories?.map((category)=>(

                                                <li>
                                                    <a href={`/blogs?searchKey=${category.name}`}>
                                                        <i class="icon-circle"></i>
                                                        {category.name}
                                                    </a>
                                                </li>
                                                    ))}
                                        </ul>
                                    </div>
                                    <div class="box-category">
                                        <div class="title-category">
                                            <img class="img-search" src="../../../Images/search.png" width="20" alt="جستجو"/>
                                            <strong>جستجو</strong>
                                        </div>
                                        <p style={{fontSize:'14px',paddingTop:'12px'}}>کلمه‌ی کلیدی مورد نظر خود را بنویسید و بر روی دکمه جستجو کلیک کنید.</p>
                                        <div class="inp-form">
                                            <input type="text" />
                                        </div>
                                        <button class="btn-search" >جستجو کن</button>
                                    </div>
                                    <div class="box-category">
                                        <div class="title-category">
                                            <img src="../../../Images/archive.png" width="20" alt="آرشیو"/>
                                            <strong>آرشیو</strong>
                                        </div>
                                        <ul class="under-category">
                                            <li>
                                                <a target="_blank">
                                                    <i class="icon-circle"></i>
                                                    {post.createdAt?.split('T')[0]}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="box-category">
                                        <div class="title-category">
                                            <img src="../../../Images/tag(1).png" width="20" alt="برچسب ها"/>
                                            <strong>برچسب ها</strong>
                                        </div>
                                        <div class="label-item">
                                            {post.tags?.map(tag =>(
                                                <a href={`/blogs?searchKey=${tag}`}>{tag} | </a>
                                            ))}
                                    </div>
                                    </div>
                                </div>
                            </div>
            </div>
            <div className='scrollTop' onClick={()=>scrollToTop()}>
            {/* <FontAwesomeIcon icon={faClock} /> */}
            برگشت به بالا
            </div>
            <Footer/>
        </div>
    );
};
blog.getInitialProps = ({ query }) => {
    return {
      Pathname: query
    }
  }
export default blog;