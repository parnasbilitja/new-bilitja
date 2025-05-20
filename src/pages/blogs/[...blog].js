import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import NavHandler from "../../Components/share/NavHandler";
import Footer from "../../sources/component/Footer.component";
import Head from "next/head";
import { useRouter } from "next/router";
import DOMPurify from "dompurify";

const Blog = ({ post }) => {
  const Ref = useRef(null);

  const scrollToTop = () => {
    Ref.current.scrollIntoView({ block: "end", behavior: "smooth" });
  };

  const [schema, setSchema] = useState({});
  const router = useRouter();
  const [safeContent, setSafeContent] = useState('');
  const [quickAccess, setQuickAccess] = useState([]);

  useEffect(() => {
    if (post?.content) {
      // 1. Sanitize HTML
      let clean = DOMPurify.sanitize(post.content);
      
      // 2. Add URL prefix to images
      clean = clean.replace(
        /<img([^>]+)src="([^"]+)"/g,
        (match, attributes, src) => {
          const prefix = 'https://hamnavaz.com';
          const fullSrc = src.startsWith('https') ? src : prefix + src;
          return `<img${attributes}src="${fullSrc}"`;
        }
      );

      setSafeContent(clean);
    }
  }, [post]);

  useEffect(() => {
    if (safeContent) {
      const container = document.createElement("div");
      container.innerHTML = safeContent;
  
      const headings = Array.from(container.querySelectorAll("h2"));
      const quickAccessList = headings.map((h2, index) => (
        <li key={index}>
          <button
            onClick={() => {
              const target = document.querySelector(`h2:nth-of-type(${index + 1})`);
              if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            {h2.textContent}
          </button>
        </li>
      ));
  
      setQuickAccess(quickAccessList);
    }
  }, [safeContent]);

  useEffect(() => {
    if (post) {
      const generatedSchema = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: post?.title,
        image: [post?.thumbnail],
        datePublished: post?.createdAt,
        dateModified: post?.createdAt,
        author: [
          {
            "@type": "Person",
            name: post?.user?.name,
            url: router.asPath,
          },
        ],
      };
      setSchema(generatedSchema);
    }
  }, [post]);

  const extractFirstParagraph = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const firstParagraph = tempDiv.querySelector("p");
    return firstParagraph ? firstParagraph.textContent : null;
  };

  const [firstPa, setFirstPa] = useState("");
  useEffect(() => {
    if (post?.body) {
      const firstParagraphContent = extractFirstParagraph(post.body);
      setFirstPa(firstParagraphContent);
    }
  }, [post?.body]);

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <title> {post?.pageTitle}</title>
        <meta
          name="description"
          content={post?.pageDescription || post?.additionalDescription}
        />
        <meta
          name="canonical"
          content={`https://bilitja.com/blogs/${post?.id}/${post?.slug}`}
        />
      </Head>

      <NavHandler />
      <div style={{ marginTop: "120px" }} className="container">
        <div>
    

          <div className="blog-container">
          <div className="quick-access-container">
            <div className="img" style={{width:'100%',height:'200px',overflow:'hidden'}}>
              <img src={'https://hamnavaz.com'+post?.coverPhoto?.source} alt={post?.name} style={{width:'100%',height:'100%',objectFit:'fill'}} />
            </div>
            <div className="quick-access">

            
              <p className="m-0 p-0">دسترسی سریع</p>
            <hr/>
              <ul>
                {quickAccess}
              </ul>
            </div>
            </div>
            <div className="bottom">
            <div>
              <div className="title">
                <div className="title-blog title-blog2">
                <svg fill="#e20000" version="1.1" id="Layer_1"  width="30px" height="30px" viewBox="0 0 92.00 92.00" enable-background="new 0 0 92 92" stroke="#e20000" stroke-width="0.00092"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_1960_" d="M76,2H16c-2.2,0-4,1.8-4,4v80c0,2.2,1.8,4,4,4h60c2.2,0,4-1.8,4-4V6C80,3.8,78.2,2,76,2z M72,82H20V10h52 V82z M28.5,65c0-2.2,1.8-4,4-4h27c2.2,0,4,1.8,4,4s-1.8,4-4,4h-27C30.3,69,28.5,67.2,28.5,65z M29.1,46c0-2.2,1.8-4,4-4h26.3 c2.2,0,4,1.8,4,4s-1.8,4-4,4H33.1C30.9,50,29.1,48.2,29.1,46z M29.1,27c0-2.2,1.8-4,4-4h26.3c2.2,0,4,1.8,4,4s-1.8,4-4,4H33.1 C30.9,31,29.1,29.2,29.1,27z"></path> </g></svg>
                  <div className="text me-2 d-flex justify-content-between align-items-center " style={{width:'100%'}}>
                    <h1 className="font-bold p-0 m-0">{post?.pageTitle}</h1>
                    <span>
                      دسته بندی مقاله :
                      {post?.categories?.map((category) => (
                        <span key={category?.id}>{category?.name}</span>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
              {/* <div style={{ padding: "0 1rem" }}>
                <p style={{ textAlign: "justify" }}>{firstPa}</p>
              </div>
              <div
                className="w-100"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <div className="box-details-top">
                  <div className="view-number">
                    <img
                      src="../../../Images/scanning5.svg"
                      width="22"
                      alt=""
                    />
                    <span> تعداد دیدگاه : </span>
                  </div>
                  <div className="date">
                    <span>{post?.viewCount}</span>
                  </div>
                </div>
                <div className="box-details-bottom">
                  <div className="share">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24.062 24.059"
                    ></svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24.062 24.059"
                    >
                      <path
                        id="Navigation2"
                        d="M9.805,14.125l2.645-2.642M9.805,14.125c-1.939,1.94-10.095-1.47-8.63-5.784s17.5-9.58,20.747-6.336-2.045,19.344-6.336,20.755S7.866,16.066,9.805,14.125Z"
                        transform="translate(0.046 0.091)"
                        fill="none"
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              </div> */}
            </div>
              <div
                className="bg-text"
                dangerouslySetInnerHTML={{ __html: safeContent }}
              />
            </div>

       

          
          </div>
        </div>

        {/* 
                    <div>
                    <div className="toc">
                    <h3>Table of Contents</h3>
                    <ul>
                        {Array.from(document?.querySelectorAll('.bg-text h3')).map((h3, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => {
                                        h3.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }}
                                >
                                    {h3.textContent}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                    </div> */}

      </div>
        <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  const [blogId, ...slugParts] = context.params.blog;
  // const slug = slugParts.join('/');

  try {
    const response = await axios.get(`https://echo.hamnavaz.com/pages/${blogId}`);
    const post = response.data;

    console.log(post);

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return {
      notFound: true,
    };
  }
}

export default Blog;
