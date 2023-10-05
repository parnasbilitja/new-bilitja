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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 49.812 49.812">
                                        <g id="Document-align-2" transform="translate(0.5 0.5)">
                                            <path id="Path_902" data-name="Path 902" d="M24.406,47.812a59.235,59.235,0,0,1-12.4-.982,13.178,13.178,0,0,1-6.749-3.277A13.176,13.176,0,0,1,1.982,36.8,59.224,59.224,0,0,1,1,24.406a59.224,59.224,0,0,1,.982-12.4A13.177,13.177,0,0,1,5.259,5.259a13.177,13.177,0,0,1,6.749-3.276A59.224,59.224,0,0,1,24.406,1a59.224,59.224,0,0,1,12.4.982,13.176,13.176,0,0,1,6.749,3.276,13.178,13.178,0,0,1,3.277,6.749,59.235,59.235,0,0,1,.982,12.4,59.234,59.234,0,0,1-.982,12.4,13.177,13.177,0,0,1-3.277,6.749A13.177,13.177,0,0,1,36.8,46.83,59.234,59.234,0,0,1,24.406,47.812Z" fill="none" stroke="#e20000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                                            <path id="Path_903" data-name="Path 903" d="M7,7h6.383" transform="translate(6.767 6.767)" fill="none" stroke="#e20000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                                            <path id="Path_904" data-name="Path 904" d="M7,12H28.278" transform="translate(6.767 12.406)" fill="none" stroke="#e20000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                                            <path id="Path_905" data-name="Path 905" d="M14,17h6.383" transform="translate(14.662 18.045)" fill="none" stroke="#e20000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                                        </g>
                                    </svg>
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
                                        <img src="../../../Images/scanning5.svg" width="22" alt=""/>
                                        <span> تعداد دیدگاه :  </span>
                                    </div>
                                    <div class="date">
                                        <span>{post.viewCount}</span>
                                    </div>
                                </div>
                                <div class="box-details-bottom">
                                    <div class="share">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24.062 24.059">
                                            <path id="Navigation2" d="M9.805,14.125l2.645-2.642M9.805,14.125c-1.939,1.94-10.095-1.47-8.63-5.784s17.5-9.58,20.747-6.336-2.045,19.344-6.336,20.755S7.866,16.066,9.805,14.125Z" transform="translate(0.046 0.091)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                        </svg>
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
                                <img src="../../../Images/category.png" width="20" alt=""/>
                                <strong>دسته‌بندی</strong>
                            </div>
                            <ul class="under-category">
                                {post.categories?.map((category)=>(

                                    <li>
                                        <a href={`/blogs?searchKey=${category.name}`} style={{fontSize:'15px'}}>
                                            <i className="icon-circle"></i>
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
                            <button class="btn-search"  >جستجو کن</button>
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
                                <img src="../../../Images/tag2.png" width="20" alt="برچسب ها"/>
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