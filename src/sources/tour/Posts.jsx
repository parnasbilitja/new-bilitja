import axios from 'axios';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Loader } from '../../Utils/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {fetchPosts} from '../../Redux/posts/Action';
const Posts = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [width, setWidth] = useState();
    let getData = useSelector(state => state.PostDataReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        if (getData?.data?.length<1) {
            dispatch(fetchPosts())
        }
        setPosts(getData.data)
        setWidth(window.innerWidth)

    }, [])
    
    useEffect(() => {

        if (posts?.length<1) {
            setPosts(getData.data)
        }
    },[getData])
    return (
        <div className="mx-2">
            <div className="d-flex flex-wrap align-items-center justify-content-between mt-5">
                <div className="d-flex mt-2 flex-column col-xl-5 col-lg-5 col-sm-9 col-12">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex justify-content-between align-items-center">
                            <svg className="ms-3" xmlns="http://www.w3.org/2000/svg" width="30.326" height="30.086" viewBox="0 0 14.326 17.086">
                                <g id="Bookmark" transform="translate(1 1)">
                                    <path id="Path_835" data-name="Path 835" d="M3.213,15.826h0l-.007,0a1.265,1.265,0,0,1-2-.941C1.121,13.721,1,11.579,1,8.464V8.408H1c0-1.236,0-2.314.089-3.213A5.283,5.283,0,0,1,1.795,2.8C2.7,1.413,4.432,1.011,7.16,1s4.469.388,5.372,1.787a5.329,5.329,0,0,1,.705,2.4c.088.9.089,1.982.089,3.219v.056c0,3.115-.121,5.257-.211,6.426a1.265,1.265,0,0,1-1.995.941h0l-.007,0c-.707-.483-1.361-1-1.87-1.41l-.009-.007c-.232-.184-.442-.352-.607-.474a3.743,3.743,0,0,0-.807-.482,1.755,1.755,0,0,0-1.313,0,3.744,3.744,0,0,0-.807.482h0c-.165.122-.375.29-.607.474l-.009.007C4.574,14.822,3.92,15.343,3.213,15.826Z" transform="translate(-1 -1)" fill="none" stroke="#ff0000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} />
                                    <path id="Path_836" data-name="Path 836" d="M12,5a1.727,1.727,0,0,1,1.541.51c.514.512.514,2.227.514,2.911" transform="translate(-4.468 -2.262)" fill="none" stroke="#279692" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} />
                                </g>
                            </svg>
                            <div className="text">
                                <h5 className="font-bold title-custom">وبلاگ گردشگری بلیطجا</h5>
                                <h6 className="subtitle-custom">هتل ها، مکان های دیدنی، پارک های آبی، همه و همه در اینجا</h6>
                            </div>
                        </div>
                    </div>
                </div>
                        {width>826&&
                            <div className='d-flex justify-content-end'>
                                <Link href={'/blog'}>
                                    <a className="see-more">
                                    مشاهده بیشتر...
                                    </a>
                                    </Link>
                            </div>
                        }
            </div>
            <div className="bottom d-flex align-items-center mt-3 mb-3">
                <div className="border-right"></div>
                <div className="border-left"></div>
            </div>
            {getData.loading?
            <Loader />:    
            <div class="box-blog-parent" >
                <div class="right-blog" >
                        <div class="info-blog">
                            <h6>
                                <a href={`/blogs/${getData.data[0]?.slug}`} class="link-light font-size-15 font-bold-iransanse" >{getData.data[0]?.title}</a>
                            </h6>
                            <div class="date-info">
                                <img src="https://hamnavaz.com/img/Watch.svg" width="20" alt="تاریخ-انتشار"/>
                                <small>انتشار شده در {getData.data[0]?.createdAt.split('T')[0]}</small>
                            </div>
                        </div>
                        <img src={getData.data[0]?.thumbnail} class="img-blog" alt={getData.data[0]?.title} />
                    </div>
                        <div class="left-blog">
                            <div class="top">
                                <div class="info-blog" >
                                    <h6>
                                    <a href={`/blogs/${getData.data[1]?.slug}`} class="link-light font-size-15 font-bold-iransanse" >{getData.data[1]?.title}</a>
                                    </h6>
                                    <div class="date-info">
                                        <img src="https://hamnavaz.com/img/Watch.svg" width="20" alt="2تاریخ-انتشار"/>
                                        <small>انتشار شده در {getData.data[1]?.createdAt.split('T')[0]}</small>
                                    </div>
                                </div>
                                <img src={getData.data[1]?.thumbnail} class="img-blog" alt={getData.data[1]?.title} />
                            </div>
                        <div class="bottom" >
                            <div class="bottom-left-blog">
                                <div class="info-blog">
                                    <h6>
                                        <a href={`/blogs/${getData.data[2]?.slug}`} class="link-light font-size-15 font-bold-iransanse" >{getData.data[2]?.title}</a>
                                    </h6>
                                    <div class="date-info">
                                        <img src="https://hamnavaz.com/img/Watch.svg" width="20" alt="3تاریخ-انتشار"/>
                                        <small>انتشار شده در {getData.data[2]?.createdAt.split('T')[0]}</small>
                                    </div>
                            </div>
                                <img src={getData.data[2]?.thumbnail} class="img-blog" alt={getData.data[2]?.title} />
                            </div>
                            <div class="bottom-right-blog" >
                                <div class="info-blog">
                                    <h6><a href={`/blogs/${getData.data[3]?.slug}`} class="link-light font-size-15 font-bold-iransanse" >{getData.data[3]?.title}</a></h6>
                                    <div class="date-info">
                                        <img src="https://hamnavaz.com/img/Watch.svg" width="20" alt="تاریخ-انتشار4"/>
                                        <small>انتشار شده در {getData.data[3]?.createdAt.split('T')[0]}</small>
                                    </div>
                                </div>
                                <img src={getData.data[3]?.thumbnail} class="img-blog" alt={getData.data[3]?.title} />
                            </div>
                    </div>
                </div>
            </div>    
        }
        </div>
    );
};

export default Posts;
