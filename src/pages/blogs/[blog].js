import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import NavHandler from '../../Components/share/NavHandler';
import Footer from '../../sources/component/Footer.component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendar } from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";
import Head from "next/head";
// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


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

    const[schema,setschema]=useState([])

    const router =useRouter()
    useEffect(()=>{
        console.log(post.body)
        let generatedSchema= {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": post.title,
            "image": [
         post.thumbnail
            ],
            "datePublished": post.createdAt,
            "dateModified": post.createdAt,
            "author": [{
                "@type": "Person",
                "name": post?.user?.name,
                "url": router.asPath
            }]
        }
        setschema(generatedSchema)
    },[post])

    const extractFirstParagraph = (html) => {
        const tempDiv = document.createElement('div');
        // Set the HTML content
        tempDiv.innerHTML = html;
        // Find the first <p> tag
        const firstParagraph = tempDiv.querySelector('p');
        // Extract the content of the first <p> tag
        return firstParagraph ? firstParagraph.textContent : null;

    };

    const [firstPa,setFirstPa]=useState('')
    useEffect(()=>{
        const firstParagraphContent = extractFirstParagraph(post.body);
        //
        setFirstPa(firstParagraphContent)
// Manipulate the parsed content (e.g., extracting text from <p> tags)
//         const paragraphs = reactComponents.map(node => {
//             if (node.type === 'p') {
//                 return node.children[0].data; // Assuming the text is the first child of the <p> tag
//             }
//             return null;
//         }).filter(text => text !== null); // Filter out null values
//
// // Set the manipulated content into an array
//         const arrayOfParagraphs = paragraphs;

    },[post?.body])
    return (
        <>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            </Head>

            <div style={{marginTop:'120px'}}>

                <NavHandler/>
                <div class="col-md-10 flex-column-mobi m-auto blog-info-parent">
                    <div >
                        <div style={{width:'100%',display:'grid',gridTemplateColumns:'repeat(2,1fr)'}}  class="tops" ref={Ref}>
                            <div >
                                <div class="title">
                                    <div class="title-blog title-blog2" >
                                        <img src="../../../Images/Document-align-2.svg" width="30" alt=""/>
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
                                <div style={{padding:'0 1rem'}}>
                                    <p style={{textAlign:'justify'}}>
                                        {firstPa}
                                    </p>
                                </div>
                                <div class=" w-100" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',rowGap:'10px'}}>
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
                                                <path id="Navigation2" d="M9.805,14.125l2.645-2.642M9.805,14.125c-1.939,1.94-10.095-1.47-8.63-5.784s17.5-9.58,20.747-6.336-2.045,19.344-6.336,20.755S7.866,16.066,9.805,14.125Z" transform="translate(0.046 0.091)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
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
                    {/*<div class="col-md-3 sidebar-blog" style={{marginRight:'2.1rem'}}>*/}
                    {/*    <div class="box-all d-flex flex-column w-100 ">*/}
                    {/*        <div class="box-category">*/}
                    {/*            <div class="title-category">*/}
                    {/*                <img src="../../../Images/category.png" width="20" alt=""/>*/}
                    {/*                <strong>دسته‌بندی</strong>*/}
                    {/*            </div>*/}
                    {/*            <ul class="under-category">*/}
                    {/*                {post.categories?.map((category)=>(*/}

                    {/*                    <li>*/}
                    {/*                        <a href={`/blogs?searchKey=${category.name}`} style={{fontSize:'15px'}}>*/}
                    {/*                            <i className="icon-circle"></i>*/}
                    {/*                            {category.name}*/}
                    {/*                        </a>*/}
                    {/*                    </li>*/}
                    {/*                ))}*/}
                    {/*            </ul>*/}
                    {/*        </div>*/}
                    {/*        <div class="box-category">*/}
                    {/*            <div class="title-category">*/}
                    {/*                <img class="img-search" src="../../../Images/search.png" width="20" alt="جستجو"/>*/}
                    {/*                <strong>جستجو</strong>*/}
                    {/*            </div>*/}
                    {/*            <p style={{fontSize:'14px',paddingTop:'12px'}}>کلمه‌ی کلیدی مورد نظر خود را بنویسید و بر روی دکمه جستجو کلیک کنید.</p>*/}
                    {/*            <div class="inp-form">*/}
                    {/*                <input type="text" />*/}
                    {/*            </div>*/}
                    {/*            <button class="btn-search"  >جستجو کن</button>*/}
                    {/*        </div>*/}
                    {/*        <div class="box-category">*/}
                    {/*            <div class="title-category">*/}
                    {/*                <img src="../../../Images/archive.png" width="20" alt="آرشیو"/>*/}
                    {/*                <strong>آرشیو</strong>*/}
                    {/*            </div>*/}
                    {/*            <ul class="under-category">*/}
                    {/*                <li>*/}
                    {/*                    <a target="_blank">*/}
                    {/*                        <i class="icon-circle"></i>*/}
                    {/*                        {post.createdAt?.split('T')[0]}*/}
                    {/*                    </a>*/}
                    {/*                </li>*/}
                    {/*            </ul>*/}
                    {/*        </div>*/}
                    {/*        <div class="box-category">*/}
                    {/*            <div class="title-category">*/}
                    {/*                <img src="../../../Images/tag2.png" width="20" alt="برچسب ها"/>*/}
                    {/*                <strong>برچسب ها</strong>*/}
                    {/*            </div>*/}
                    {/*            <div class="label-item">*/}
                    {/*                {post.tags?.map(tag =>(*/}
                    {/*                    <a href={`/blogs?searchKey=${tag}`}>{tag} | </a>*/}
                    {/*                ))}*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                {/*<div className='scrollTop' onClick={()=>scrollToTop()}>*/}
                {/*/!* <FontAwesomeIcon icon={faClock} /> *!/*/}
                {/*برگشت به بالا*/}
                {/*</div>*/}
                <Footer/>
            </div>
        </>

    );
};
blog.getInitialProps = ({ query }) => {
    return {
      Pathname: query
    }
  }
export default blog;
