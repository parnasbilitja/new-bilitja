import React, { useEffect, useState } from 'react'

import { Provider } from 'react-redux'
import { store, persistor } from '../Redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { useRouter } from 'next/router';
import Flight from '../Components/flight/Flight.page'
import FlightReserve from '../Components/flight_reserve/FlightReseve.page'
import NavBar from '../Components/nav_bar/NavBar.component'
import NavBarMobile from '../Components/nav_bar_mobile/NavBarMobile.component'
import Footer from '../Components/footer/Footer.component'
import MessageBox from '../Components/message_box/MessageBox.component'
import PopUp from '../Components/pop_up/PopUp.component'
import Account from '../Components/account/Account.component'

export default function Hotels(){
    const myRouter=useRouter();
    const [width,setWidth] =useState(0);

    const handleResize = ()=>{
      setWidth(window.innerWidth)
    }
    useEffect(()=> {
      //setWidth(window.innerWidth);
      window.addEventListener('resize',handleResize)
      return()=>{
        window.removeEventListener('resize', handleResize)
      }
    },[]);

    //window.innerWidth
     return (
      <Provider store={store}>
              

<div className='bodyVar'>
     

{ width <= 826 ? <NavBarMobile /> : <NavBar /> }
 <div style={width <= 826 ? { marginTop: 110 } : { marginTop: 90 }} className='font-'>

 <section class="info-hotel mt-4">
    <div class="responsive-desktop">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 col-xl-12  margin-x parent-info-hotel">
                    <div class="col-md-8 col-xl-8 col-lg-8 info-right">
                        <div class="w-100 d-flex flex-column parent-slidertoslider">
                            <div class="col-md-12 col-12 col-xl-12 title-hotel-slider">
                                <div class="title">
                                    <i class="fa fa-hotel"></i>
                                    <div class="hotel-two-language d-flex justify-content-between">
                                        <h5 class="persian">هتل پارسیان استقلال تهران</h5>
                                        <h5 class="engilish">Parsian Esteghlal International Hotel in Tehran</h5>
                                    </div>

                                </div>
                            </div>
                            <div class="col-xl-12 col-md-12 col-lg-12  col-12">
                                <div class="swiper-container swiper1">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide swiper-slide-top">
                                            <div class="img-single">
                                                <img src="../../Images/hotel/image-coffe.jpg" width="100%" alt=" "/>
                                            </div>
                                        </div>
                                        <div class="swiper-slide swiper-slide-top">
                                            <div class="img-single">
                                                <img src="../../Images/hotel/image-home.jpg" width="100%" alt=" "/>
                                            </div>
                                        </div>
                                        <div class="swiper-slide swiper-slide-top">
                                            <div class="img-single">
                                                <img src="../../Images/hotel/image-luc.jpg" width="100%" alt=" "/>
                                            </div>
                                        </div>
                                        <div class="swiper-slide swiper-slide-top">
                                            <div class="img-single">
                                                <img src="../../Images/hotel/image-tenis.jpg" width="100%" alt=" "/>
                                            </div>
                                        </div>
                                        <div class="swiper-slide swiper-slide-top">
                                            <div class="img-single">
                                                <img src="../../Images/hotel/image-coffe.jpg" width="100%" alt=" "/>
                                            </div>
                                        </div>
                                        <div class="swiper-slide swiper-slide-top">
                                            <div class="img-single">
                                                <img src="../../Images/hotel/image-home.jpg" width="100%" alt=" "/>
                                            </div>
                                        </div>
                                        <div class="swiper-slide swiper-slide-top">
                                            <div class="img-single">
                                                <img src="../../Images/hotel/image-luc.jpg" width="100%" alt=" "/>
                                            </div>
                                        </div>
                                        <div class="swiper-slide swiper-slide-top">
                                            <div class="img-single">
                                                <img src="../../Images/hotel/image-tenis.jpg" width="100%" alt=" "/>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="swiper-button-next"></div>
                                    <div class="swiper-button-prev"></div>
                                </div>

                            </div>
                            <div  class="col-xl-12 col-md-12 col-lg-12 ">
                                <div class="swiper-container gallery-thumbs mt-2 ml-3">
                                    <div class="swiper-wrapper gallery-thumbs-wrapper">
                                        <div class="swiper-slide item-pagintion mr-4">
                                            <div class="imgs-gallery"><img src="../../Images/hotel/image-coffe.jpg" alt=""/></div>
                                        </div>
                                        <div class="swiper-slide item-pagintion mr-4">
                                            <div class="imgs-gallery"><img src="../../Images/hotel/image-home.jpg" alt=""/></div>
                                        </div>
                                        <div class="swiper-slide item-pagintion mr-4">
                                            <div class="imgs-gallery"><img src="../../Images/hotel/image-luc.jpg" alt=""/></div>
                                        </div>
                                        <div class="swiper-slide item-pagintion mr-4">
                                            <div class="imgs-gallery"><img src="../../Images/hotel/image-tenis.jpg" alt=""/></div>
                                        </div>
                                        <div class="swiper-slide item-pagintion mr-4">
                                            <div class="imgs-gallery"><img src="../../Images/hotel/image-coffe.jpg" alt=""/></div>
                                        </div>
                                        <div class="swiper-slide item-pagintion mr-4">
                                            <div class="imgs-gallery"><img src="../../Images/hotel/image-home.jpg" alt=""/></div>
                                        </div>
                                        <div class="swiper-slide item-pagintion mr-4">
                                            <div class="imgs-gallery"><img src="../../Images/hotel/image-luc.jpg" alt=""/></div>
                                        </div>
                                        <div class="swiper-slide item-pagintion mr-4">
                                            <div class="imgs-gallery"><img src="../../Images/hotel/image-tenis.jpg" alt=""/></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="about-hotel">
                            <div class="title">
                                <i class="fa fa-hotel"></i>
                                <h5>درباره هتل قصر</h5>
                            </div>
                            <div class="text mt-4"><span>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</span>
                            </div>
                        </div>
                        <div class="book-hotel">
                            <div class="title">
                                <i class="fa fa-hotel"></i>
                                <h5>اتاق های قابل رزرو</h5>
                            </div>
                            <div class="box-book">
                                <div class="top">
                                    <div><h6>اتاق یک تخته</h6></div>
                                    <div>
                                        <div class="price-book-box">
                                            <div class="d-flex flex-column">
                                                <div class="w-100 d-flex justify-content-end">
                                                    <label for="">14%</label>

                                                </div>
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <span>قیمت 46 شب</span>
                                                <h5><strong>4،500،000</strong></h5>
                                                <small class="mr-2"> تومان</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <div>
                                        <i class="fa fa-utensils"></i>
                                        <span class="border-text">به همراه صبحانه</span>
                                        <i class="fa fa-user"></i>
                                        <span class="border-text">1 بزرگسال</span>
                                        <i class="fa fa-moon"></i>
                                        <span class="border-text">
                                            قیمت برای یک شب
                                            <strong>1،000،000</strong>
                                            تومان
                                        </span>
                                    </div>
                                    <div>
                                        <a class="book-room" href="">رزرو اتاق</a>
                                    </div>
                                </div>
                            </div>
                            <div class="box-book">
                                <div class="top">
                                    <div><h6>اتاق لوکس </h6></div>
                                    <div>
                                        <div class="price-book-box">
                                            <div class="d-flex flex-column">
                                                <div class="w-100 d-flex justify-content-end">
                                                    <label for="">14%</label>

                                                </div>
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <span>قیمت 46 شب</span>
                                                <h5><strong>4،500،000</strong></h5>
                                                <small class="mr-2"> تومان</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <div>
                                        <i class="fa fa-utensils"></i>
                                        <span class="border-text">به همراه صبحانه</span>
                                        <i class="fa fa-user"></i>
                                        <span class="border-text">1 بزرگسال</span>
                                        <i class="fa fa-moon"></i>
                                        <span class="border-text">
                                            قیمت برای یک شب
                                            <strong>1،000،000</strong>
                                            تومان
                                        </span>
                                    </div>
                                    <div>
                                        <a class="book-room" href="">رزرو اتاق</a>
                                    </div>
                                </div>
                            </div>
                            <div class="box-book">
                                <div class="top">
                                    <div><h6>اتاق دو تخته</h6></div>
                                    <div>
                                        <div class="price-book-box">
                                            <div class="d-flex flex-column">
                                                <div class="w-100 d-flex justify-content-end">
                                                    <label for="">14%</label>

                                                </div>
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <span>قیمت 46 شب</span>
                                                <h5><strong>4،500،000</strong></h5>
                                                <small class="mr-2"> تومان</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <div>
                                        <i class="fa fa-utensils"></i>
                                        <span class="border-text">به همراه صبحانه</span>
                                        <i class="fa fa-user"></i>
                                        <span class="border-text">1 بزرگسال</span>
                                        <i class="fa fa-moon"></i>
                                        <span class="border-text">
                                            قیمت برای یک شب
                                            <strong>1،000،000</strong>
                                            تومان
                                        </span>
                                    </div>
                                    <div>
                                        <a class="book-room" href="">رزرو اتاق</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="items-needed-hotel">
                            <div class="title">
                                <i class="fa fa-star"></i>
                                <h5>امکانات هتل</h5>
                            </div>
                            <div class="items">
                                <div class="child">
                                    <i class="fa fa-utensils"></i>
                                    <span>رستوران در هتل</span>
                                </div>
                                <div class="child">
                                    <i class="fa fa-level-down-alt"></i>
                                    <span>آسانسور</span>
                                </div>
                                <div class="child">
                                    <i class="fa fa-hotel"></i>
                                    <span>لابی</span>
                                </div>
                                <div class="child">
                                    <i class="fa fa-parking"></i>
                                    <span>پارکینگ</span>
                                </div>
                                <div class="child">
                                    <i class="fa fa-utensils"></i>
                                    <span>رستوران در هتل</span>
                                </div>
                                <div class="child">
                                    <i class="fa fa-level-down-alt"></i>
                                    <span>آسانسور</span>
                                </div>
                                <div class="child">
                                    <i class="fa fa-hotel"></i>
                                    <span>لابی</span>
                                </div>
                                <div class="child">
                                    <i class="fa fa-parking"></i>
                                    <span>پارکینگ</span>
                                </div>
                            </div>
                        </div>
                        <div class="items-needed-room">
                            <div class="title">
                                <i class="fa fa-star"></i>
                                <h5>امکانات اتاق</h5>
                            </div>
                            <div class="items">
                                <div class="child">
                                    <i class="fa fa-toilet"></i>
                                    <span>سرویس فرنگی</span>
                                </div>
                                <div class="child">
                                    <i class="fa fa-toilet"></i>
                                    <span>سرویس ایرانی</span>
                                </div>
                                <div class="child">
                                    <i class="fa fa-tv"></i>
                                    <span>تلویزیون</span>
                                </div>
                                <div class="child">
                                    <i class="fa fa-shower"></i>
                                    <span>حمام</span>
                                </div>
                                <div class="child">
                                    <i class="fa fa-toilet"></i>
                                    <span>سرویس فرنگی</span>
                                </div>
                                <div class="child">
                                    <i class="fa fa-toilet"></i>
                                    <span>سرویس ایرانی</span>
                                </div>
                                <div class="child">
                                    <i class="fa fa-tv"></i>
                                    <span>تلویزیون</span>
                                </div>
                                <div class="child">
                                    <i class="fa fa-shower"></i>
                                    <span>حمام</span>
                                </div>
                            </div>
                        </div>
                        <div class="faq">
                            <div class="title">
                                <i class="fa fa-question"></i>
                                <h5>سوالات متداول مشتریان</h5>
                            </div>
                            <div class="product-tab-content">

                                <div class="tab-content" id="product-tab">
                                    <div class="tab-pane fade show active" id="productDescription" role="tabpanel"
                                         aria-labelledby="productDescription-tab">
                                        <div class="product-desc">
                                            <div class="accordion accordion-product" id="accordionDescription">
                                                <div class="card ">
                                                    <div class="card-header" id="headingOne">
                                                        <h5 class="mb-0">
                                                            <button class="btn btn-dark" type="button"
                                                                    data-toggle="collapse"
                                                                    data-target="#collapseOne" aria-expanded="true"
                                                                    aria-controls="collapseOne">
                                                                سوال یک
                                                            </button>
                                                        </h5>
                                                    </div>

                                                    <div id="collapseOne" class="collapse show"
                                                         aria-labelledby="headingOne"
                                                         data-parent="#accordionDescription">
                                                        <div class="card-body">
                                                            <p>
                                                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                                                                چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                                                                بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و
                                                                برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با
                                                                هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت
                                                                و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
                                                                متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                                                                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ
                                                                پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید
                                                                داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط
                                                                سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی
                                                                دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
                                                                طراحی اساسا مورد استفاده قرار گیرد.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="headingTwo">
                                                        <h5 class="mb-0">
                                                            <button class="btn collapsed" type="button"
                                                                    data-toggle="collapse" data-target="#collapseTwo"
                                                                    aria-expanded="false" aria-controls="collapseTwo">
                                                                سوال دو
                                                            </button>
                                                        </h5>
                                                    </div>
                                                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo"
                                                         data-parent="#accordionDescription">
                                                        <div class="card-body">
                                                            <p>
                                                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                                                                چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                                                                بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و
                                                                برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با
                                                                هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت
                                                                و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
                                                                متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                                                                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ
                                                                پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید
                                                                داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط
                                                                سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی
                                                                دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
                                                                طراحی اساسا مورد استفاده قرار گیرد.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="headingThree">
                                                        <h5 class="mb-0">
                                                            <button class="btn collapsed" type="button"
                                                                    data-toggle="collapse" data-target="#collapseThree"
                                                                    aria-expanded="false" aria-controls="collapseThree">
                                                                سوال سه
                                                            </button>
                                                        </h5>
                                                    </div>
                                                    <div id="collapseThree" class="collapse"
                                                         aria-labelledby="headingThree"
                                                         data-parent="#accordionDescription">
                                                        <div class="card-body">
                                                            <p>
                                                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                                                                چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                                                                بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و
                                                                برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با
                                                                هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت
                                                                و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
                                                                متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                                                                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ
                                                                پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید
                                                                داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط
                                                                سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی
                                                                دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
                                                                طراحی اساسا مورد استفاده قرار گیرد.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="productParams" role="tabpanel"
                                         aria-labelledby="productParams-tab">
                                        <div class="product-params">
                                            <section>
                                                <h3 class="params-title">مشخصات کلی</h3>
                                                <ul class="params-list">
                                                    <li>
                                                        <div class="params-list-key">
                                                            <span>ابعاد</span>
                                                        </div>
                                                        <div class="params-list-value">
                                                        <span>
                                                            7.8 × 74.7 × 158.5 میلی‌متر
                                                        </span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="params-list-key">
                                                            <span>توضیحات سیم کارت</span>
                                                        </div>
                                                        <div class="params-list-value">
                                                        <span>
                                                            سایز نانو (8.8 × 12.3 میلی‌متر)
                                                        </span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="params-list-key">
                                                            <span>وزن</span>
                                                        </div>
                                                        <div class="params-list-value">
                                                        <span>
                                                            166 گرم
                                                        </span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="params-list-key">
                                                            <span>ویژگی‌های خاص</span>
                                                        </div>
                                                        <div class="params-list-value">
                                                        <span>
                                                            مناسب عکاسی , فبلت , مجهز به حس‌گر اثرانگشت , مناسب عکاسی
                                                            سلفی
                                                        </span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="params-list-key">
                                                            <span>تعداد سیم کارت</span>
                                                        </div>
                                                        <div class="params-list-value">
                                                        <span>
                                                            دو سیم کارت
                                                        </span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </section>
                                            <section>
                                                <h3 class="params-title">پردازنده</h3>
                                                <ul class="params-list">
                                                    <li>
                                                        <div class="params-list-key">
                                                            <span>تراشه</span>
                                                        </div>
                                                        <div class="params-list-value">
                                                        <span>
                                                            Exynos 7904 (14 nm) Chipset
                                                        </span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="params-list-key">
                                                            <span>پردازنده ی مرکزی</span>
                                                        </div>
                                                        <div class="params-list-value">
                                                        <span>
                                                            Dual--Core Cortex-A73 + Hexa-Core Cortex-A53 CPU
                                                        </span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="params-list-key">
                                                            <span>نوع پردازنده</span>
                                                        </div>
                                                        <div class="params-list-value">
                                                        <span>
                                                            64 بیت
                                                        </span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="params-list-key">
                                                            <span>فرکانس پردازنده‌ی مرکزی</span>
                                                        </div>
                                                        <div class="params-list-value">
                                                        <span>
                                                            1.6 و 1.8 گیگاهرتز
                                                        </span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="params-list-key">
                                                            <span>پردازنده ی گرافیکی</span>
                                                        </div>
                                                        <div class="params-list-value">
                                                        <span>
                                                            Mali-G71 MP2 GPU
                                                        </span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </section>
                                            <section>
                                                <h3 class="params-title">سایر مشخصات</h3>
                                                <ul class="params-list">
                                                    <li>
                                                        <div class="params-list-key">
                                                            <span>حس‌گرها</span>
                                                        </div>
                                                        <div class="params-list-value">
                                                        <span>
                                                            قطب‌نما (Compass) , شتاب‌سنج (Accelerometer) , مجاورت
                                                            (Proximity) , اثرانگشت
                                                            زیر صفحه نمایش (FingerPrint|Under-Display)
                                                        </span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="params-list-key">
                                                            <span>باتری قابل تعویض</span>
                                                        </div>
                                                        <div class="params-list-value">
                                                        <span>
                                                            خیر
                                                        </span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="params-list-key">
                                                            <span>مشخصات باتری</span>
                                                        </div>
                                                        <div class="params-list-value">
                                                        <span>
                                                            باتری از نوع لیتیوم پلیمری با ظرفیت 4000 میلی‌ آمپر ساعت
                                                        </span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="params-list-key"></div>
                                                        <div class="params-list-value">
                                                        <span>
                                                            امکان شارژ سریع باتری با توان 15 وات (Fast battery charging
                                                            15W)
                                                        </span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="params-list-key">
                                                            <span>اقلام همراه گوشی</span>
                                                        </div>
                                                        <div class="params-list-value">
                                                        <span>
                                                            دفترچه‌ راهنما , کابل USB , شارژر
                                                        </span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </section>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="productComments" role="tabpanel"
                                         aria-labelledby="productComments-tab">
                                         {/* product-review  */}
                                        <div class="product-review-form mb-3">
                                            <form action="#">
                                                <div class="row align-items-center">
                                                    <div class="col-lg-6">
                                                        <div class="form-element-row">
                                                            <label for="phone-number" class="label-element">عنوان نظر
                                                                شما
                                                                (اجباری)</label>
                                                            <input type="text" class="input-element"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label>امتیاز شما:</label>
                                                            <div class="add-rating">
                                                                <input type="radio" name="rating" id="rating-1"/>
                                                                <label for="rating-1"></label>
                                                                <input type="radio" name="rating" id="rating-2"/>
                                                                <label for="rating-2"></label>
                                                                <input type="radio" name="rating" id="rating-3"/>
                                                                <label for="rating-3"></label>
                                                                <input type="radio" name="rating" id="rating-4"/>
                                                                <label for="rating-4"></label>
                                                                <input type="radio" name="rating" id="rating-5"/>
                                                                <label for="rating-5"></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-element-row">
                                                            <label for="phone-number" class="label-element">ایمیل
                                                                شما</label>
                                                            <input type="text" class="input-element"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="form-element-row">
                                                            <label for="phone-number" class="label-element">نظر
                                                                شما</label>
                                                            <textarea name="comment" id="comment" cols="30" rows="10"
                                                                      class="input-element"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <button class="btn btn-primary px-3">ارسال نظر <i
                                                                    class="fad fa-comment-alt-edit"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <div class="section-title mb-1 mt-4">
                                                نظرات کاربران (۵)
                                            </div>
                                            <hr/>
                                        </div>
                                        <div class="comments-list">
                                            <div class="row">
                                                <div class="col-md-3 aside">
                                                    <ul class="comments-user-shopping">
                                                        <li>
                                                            <div class="cell cell-name">
                                                                کاربر اینجانب
                                                            </div>
                                                            <div class="comments-buyer-badge">خریدار</div>
                                                        </li>
                                                        <li>
                                                            <div class="cell">
                                                                در تاریخ ۷ فروردین ۱۳۹۹
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <div class="alert alert-info">
                                                        <i class="fas fa-thumbs-up"></i> خرید این محصول را توصیه می‌کنم
                                                    </div>
                                                    <ul class="comments-user-shopping">
                                                        <li>
                                                            <div class="cell cell-title">رنگ:</div>
                                                            <div class="cell color-cell">
                                                            <span class="shopping-color-value"
                                                                  ></span>سفید
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="cell cell-title">فروشنده:</div>
                                                            <div class="cell seller-cell">
                                                                <a href="#" class="border-bottom-dt">زندگیِ مدرن</a>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="col-md-9 article">
                                                    <div class="header">
                                                        <div>راضیم</div>
                                                    </div>
                                                    <p>من ۳روز که خریدم و راضی هستم دوربینش خوبه فقط به نظرم باتری
                                                        زود تموم میشه البته دائما هم باهاش کار میکنم ولی هر روز
                                                        شارژش می‌کنم گوشیه خوش دستیه</p>
                                                    <div class="footer">
                                                        <div class="comments-likes">
                                                            آیا این نظر برایتان مفید بود؟
                                                            <button class="btn-like" data-counter="۰">بله</button>
                                                            <button class="btn-like" data-counter="۰">خیر</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-3 aside">
                                                    <ul class="comments-user-shopping">
                                                        <li>
                                                            <div class="cell cell-name">
                                                                کاربر اینجانب
                                                            </div>
                                                            <div class="comments-buyer-badge">خریدار</div>
                                                        </li>
                                                        <li>
                                                            <div class="cell">
                                                                در تاریخ ۷ فروردین ۱۳۹۹
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <div class="alert alert-info">
                                                        <i class="fas fa-thumbs-up"></i> خرید این محصول را توصیه می‌کنم
                                                    </div>
                                                    <ul class="comments-user-shopping">
                                                        <li>
                                                            <div class="cell cell-title">رنگ:</div>
                                                            <div class="cell color-cell">
                                                            <span class="shopping-color-value"
                                                                  ></span>مشکی
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="cell cell-title">فروشنده:</div>
                                                            <div class="cell seller-cell">
                                                                <a href="#" class="border-bottom-dt">زندگیِ مدرن</a>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="col-md-9 article">
                                                    <div class="header">
                                                        <div>مدل 128 گیگ با رام 4 پیشنهاد میشه</div>
                                                    </div>
                                                    <p>سلام بعد از چند روز استفاده ازش راضی هستم و فکرشو نمیکردم به
                                                        عنوان یه گوشی تقریبا میان رده راضیم کنه و تصورم یه گوشیه
                                                        ضعیف بود.به عنوان کسی که زیاد با کامپیوتر و گوشی سر و کار
                                                        داره و سرعت و امکانات براش مهمه کاملا توقعاتمو برآروده
                                                        کرد.طراحی به روز و جذابی هم داره.رنگ مشکی 128 گیگ با رام 4
                                                        رو گرفتم که زیبایی خاصی داره.از دیجیکالا هم تشکر میکنم که
                                                        محصولو به موقع در تعطیلات به دستم رسوند و گارانتی و برگه
                                                        نحوه رجستر کردن گوشی همراهش بود و بسته بندی خوبی
                                                        داشت.دوستانی هم که میگفتن مشکل هنگ داره بنده مشاهده نکردم و
                                                        قبل استفاده کاملا بروزرسانیش کردم اول.نکته آخر اینکه برای
                                                        اینکه عمر باتری بیشتر باشه تو تنظیمات از حالت فست شارژ خارج
                                                        کنید و استاندارد شارژ کنید بهتره و مواقع اضطراری از فست
                                                        استفاده کنید و برای اولین بار بگذارید شارژ گوشی به پانزده
                                                        درصد برسه و خالی بشه بعد بزنید به شارژ و ازش استفاده نکنید
                                                        تا فول بشه و بعد استفاده کنید.گوشی های هوشمند نیازی به شارژ
                                                        طولانی مدت ندارند.</p>
                                                    <div class="comments-evaluation">
                                                        <div class="comments-evaluation-positive">
                                                            <span>نقاط قوت</span>
                                                            <ul>
                                                                <li>فینگر تاچ عالی نیست ولی رضایت بخشه.تاچ قوی داره
                                                                </li>
                                                                <li>نور صفحه نمایش زیاد و کیفت صفحه نمایش قابل قبوله
                                                                </li>
                                                                <li>سخت افزار مناسب و سرعت خوب
                                                                </li>
                                                                <li>داشتن کاور ژله ای شفاف همراه گوشی و صدای واضح و
                                                                    بلند
                                                                </li>
                                                                <li>میزان شارژ دهی مناسب و دوربین سلفی خوب</li>
                                                            </ul>
                                                        </div>

                                                        <div class="comments-evaluation-negative">
                                                            <span>نقاط ضعف</span>
                                                            <ul>
                                                                <li>نداشتن گلاس صفحه
                                                                </li>
                                                                <li>سیم شارژر خیلی کوتاهه</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="footer">
                                                        <div class="comments-likes">
                                                            آیا این نظر برایتان مفید بود؟
                                                            <button class="btn-like" data-counter="۰">بله</button>
                                                            <button class="btn-like" data-counter="۰">خیر</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-3 aside">
                                                    <ul class="comments-user-shopping">
                                                        <li>
                                                            <div class="cell cell-name">
                                                                کاربر اینجانب
                                                            </div>
                                                            <div class="comments-buyer-badge">خریدار</div>
                                                        </li>
                                                        <li>
                                                            <div class="cell">
                                                                در تاریخ ۷ فروردین ۱۳۹۹
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <div class="alert alert-info">
                                                        <i class="fas fa-thumbs-up"></i> خرید این محصول را توصیه می‌کنم
                                                    </div>
                                                    <ul class="comments-user-shopping">
                                                        <li>
                                                            <div class="cell cell-title">رنگ:</div>
                                                            <div class="cell color-cell">
                                                            <span class="shopping-color-value"
                                                                  ></span>سفید
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="cell cell-title">فروشنده:</div>
                                                            <div class="cell seller-cell">
                                                                <a href="#" class="border-bottom-dt">زندگیِ مدرن</a>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="col-md-9 article">
                                                    <div class="header">
                                                        <div>راضیم</div>
                                                    </div>
                                                    <p>من ۳روز که خریدم و راضی هستم دوربینش خوبه فقط به نظرم باتری
                                                        زود تموم میشه البته دائما هم باهاش کار میکنم ولی هر روز
                                                        شارژش می‌کنم گوشیه خوش دستیه</p>
                                                    <div class="footer">
                                                        <div class="comments-likes">
                                                            آیا این نظر برایتان مفید بود؟
                                                            <button class="btn-like" data-counter="۰">بله</button>
                                                            <button class="btn-like" data-counter="۰">خیر</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-3 aside">
                                                    <ul class="comments-user-shopping">
                                                        <li>
                                                            <div class="cell cell-name">
                                                                کاربر اینجانب
                                                            </div>
                                                            <div class="comments-buyer-badge">خریدار</div>
                                                        </li>
                                                        <li>
                                                            <div class="cell">
                                                                در تاریخ ۷ فروردین ۱۳۹۹
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <div class="alert alert-info">
                                                        <i class="fas fa-thumbs-up"></i> خرید این محصول را توصیه می‌کنم
                                                    </div>
                                                    <ul class="comments-user-shopping">
                                                        <li>
                                                            <div class="cell cell-title">رنگ:</div>
                                                            <div class="cell color-cell">
                                                            <span class="shopping-color-value"
                                                                  ></span>سفید
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="cell cell-title">فروشنده:</div>
                                                            <div class="cell seller-cell">
                                                                <a href="#" class="border-bottom-dt">زندگیِ مدرن</a>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="col-md-9 article">
                                                    <div class="header">
                                                        <div>راضیم</div>
                                                    </div>
                                                    <p>من ۳روز که خریدم و راضی هستم دوربینش خوبه فقط به نظرم باتری
                                                        زود تموم میشه البته دائما هم باهاش کار میکنم ولی هر روز
                                                        شارژش می‌کنم گوشیه خوش دستیه</p>
                                                    <div class="footer">
                                                        <div class="comments-likes">
                                                            آیا این نظر برایتان مفید بود؟
                                                            <button class="btn-like" data-counter="۰">بله</button>
                                                            <button class="btn-like" data-counter="۰">خیر</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-3 aside">
                                                    <ul class="comments-user-shopping">
                                                        <li>
                                                            <div class="cell cell-name">
                                                                کاربر اینجانب
                                                            </div>
                                                            <div class="comments-buyer-badge">خریدار</div>
                                                        </li>
                                                        <li>
                                                            <div class="cell">
                                                                در تاریخ ۷ فروردین ۱۳۹۹
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <div class="alert alert-info">
                                                        <i class="fas fa-thumbs-up"></i> خرید این محصول را توصیه می‌کنم
                                                    </div>
                                                    <ul class="comments-user-shopping">
                                                        <li>
                                                            <div class="cell cell-title">رنگ:</div>
                                                            <div class="cell color-cell">
                                                            <span class="shopping-color-value"
                                                                  ></span>سفید
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="cell cell-title">فروشنده:</div>
                                                            <div class="cell seller-cell">
                                                                <a href="#" class="border-bottom-dt">زندگیِ مدرن</a>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="col-md-9 article">
                                                    <div class="header">
                                                        <div>راضیم</div>
                                                    </div>
                                                    <p>من ۳روز که خریدم و راضی هستم دوربینش خوبه فقط به نظرم باتری
                                                        زود تموم میشه البته دائما هم باهاش کار میکنم ولی هر روز
                                                        شارژش می‌کنم گوشیه خوش دستیه</p>
                                                    <div class="footer">
                                                        <div class="comments-likes">
                                                            آیا این نظر برایتان مفید بود؟
                                                            <button class="btn-like" data-counter="۰">بله</button>
                                                            <button class="btn-like" data-counter="۰">خیر</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-3 aside">
                                                    <ul class="comments-user-shopping">
                                                        <li>
                                                            <div class="cell cell-name">
                                                                کاربر اینجانب
                                                            </div>
                                                            <div class="comments-buyer-badge">خریدار</div>
                                                        </li>
                                                        <li>
                                                            <div class="cell">
                                                                در تاریخ ۷ فروردین ۱۳۹۹
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <div class="alert alert-danger">
                                                        <i class="fas fa-thumbs-down"></i> خرید این محصول را توصیه
                                                        نمی‌کنم
                                                    </div>
                                                    <ul class="comments-user-shopping">
                                                        <li>
                                                            <div class="cell cell-title">رنگ:</div>
                                                            <div class="cell color-cell">
                                                            <span class="shopping-color-value"
                                                                  ></span>سفید
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="cell cell-title">فروشنده:</div>
                                                            <div class="cell seller-cell">
                                                                <a href="#" class="border-bottom-dt">زندگیِ مدرن</a>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="col-md-9 article">
                                                    <div class="header">
                                                        <div>راضیم</div>
                                                    </div>
                                                    <p>من ۳روز که خریدم و راضی هستم دوربینش خوبه فقط به نظرم باتری
                                                        زود تموم میشه البته دائما هم باهاش کار میکنم ولی هر روز
                                                        شارژش می‌کنم گوشیه خوش دستیه</p>
                                                    <div class="footer">
                                                        <div class="comments-likes">
                                                            آیا این نظر برایتان مفید بود؟
                                                            <button class="btn-like" data-counter="۰">بله</button>
                                                            <button class="btn-like" data-counter="۰">خیر</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-3 aside">
                                                    <ul class="comments-user-shopping">
                                                        <li>
                                                            <div class="cell cell-name">
                                                                کاربر اینجانب
                                                            </div>
                                                            <div class="comments-buyer-badge">خریدار</div>
                                                        </li>
                                                        <li>
                                                            <div class="cell">
                                                                در تاریخ ۷ فروردین ۱۳۹۹
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <div class="alert alert-info">
                                                        <i class="fas fa-thumbs-up"></i> خرید این محصول را توصیه می‌کنم
                                                    </div>
                                                    <ul class="comments-user-shopping">
                                                        <li>
                                                            <div class="cell cell-title">رنگ:</div>
                                                            <div class="cell color-cell">
                                                            <span class="shopping-color-value"
                                                                  ></span>سفید
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="cell cell-title">فروشنده:</div>
                                                            <div class="cell seller-cell">
                                                                <a href="#" class="border-bottom-dt">زندگیِ مدرن</a>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="col-md-9 article">
                                                    <div class="header">
                                                        <div>راضیم</div>
                                                    </div>
                                                    <p>من ۳روز که خریدم و راضی هستم دوربینش خوبه فقط به نظرم باتری
                                                        زود تموم میشه البته دائما هم باهاش کار میکنم ولی هر روز
                                                        شارژش می‌کنم گوشیه خوش دستیه</p>
                                                    <div class="footer">
                                                        <div class="comments-likes">
                                                            آیا این نظر برایتان مفید بود؟
                                                            <button class="btn-like" data-counter="۰">بله</button>
                                                            <button class="btn-like" data-counter="۰">خیر</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* end product-review */}
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="col-md-4 col-xl-4 col-lg-4 info-left position-sticky">
                        <div class="box-search-info">
                            <h6 class="text-center ">جستجو</h6>
                            <select name="" id="">
                                <option value="">تهران</option>
                                <option value="">شیراز</option>
                                <option value="">مشهد</option>

                            </select>
                            <div class="date">
                                <input type="text" placeholder="تاریخ رفت"/>
                                <i class="fa fa-calendar"></i>
                            </div>
                            <div class="date">
                                <input type="text" placeholder="تاریخ برگشت"/>
                                <i class="fa fa-calendar"></i>
                            </div>

                            <select name="" id="">
                                <option value="">1شب</option>
                                <option value="">2 شب</option>
                                <option value="">3شب</option>

                            </select>
                            <a class="search-btn" href="">جستجو</a>

                        </div>
                        <div class="map-location">
                            <div class="title">
                                <i class="fa fa-map-pin"></i>
                                <h5>موقعیت مکانی هتل</h5>
                            </div>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d103667.99935884918!2d51.4228224!3d35.71084516931367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1623047737718!5m2!1sen!2s"
                                    width="100%" height="400" 
                                    allowfullscreen="" loading="lazy"></iframe>
                        </div>
                        <div class="Recommended-hotel-prs">
                            <div class="title">
                                <i class="fa fa-hotel"></i>
                                <h5>هتل های پیشنهادی</h5>
                            </div>
                            <div class="Recommended-hotel-box-prs">
                                <div class="thumbnail-prs">
                                    <div  class="black-bg-prs"></div>
                                    <div class="title">
                                        <h6 class="fa">هتل هفت آسمان سلام مشهد</h6>
                                        <h6 class="en">Haft Aseman Hotel in Mashhad</h6>
                                    <div class="icon-star">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>

                                    </div>
                                        <a class="view-hotel-prs" href="">مشاهده هتل</a>
                                    </div>
                                </div>
                            </div>
                            <div class="Recommended-hotel-box-prs">
                                <div class="thumbnail-prs">
                                    <div class="black-bg-prs"></div>
                                    <div class="title">
                                        <h6 class="fa">هتل هفت آسمان سلام مشهد</h6>
                                        <h6 class="en">Haft Aseman Hotel in Mashhad</h6>
                                        <div class="icon-star">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>

                                        </div>
                                        <a class="view-hotel-prs" href="">مشاهده هتل</a>
                                    </div>
                                </div>
                            </div>
                            <div class="Recommended-hotel-box-prs">
                                <div class="thumbnail-prs">
                                    <div  class="black-bg-prs"></div>
                                    <div class="title">
                                        <h6 class="fa">هتل هفت آسمان سلام مشهد</h6>
                                        <h6 class="en">Haft Aseman Hotel in Mashhad</h6>
                                        <div class="icon-star">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>

                                        </div>
                                        <a class="view-hotel-prs" href="">مشاهده هتل</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


     <MessageBox />
     <Footer />
   </div>
   {/* <PopUp opened={this.props.accountBox.state} closePopUp={() => {
     this.props.accountBoxModify({
       state: false
     })
   }}>
         <Account />
   </PopUp> */}
         </div>

         <reportWebVitals/>
    </Provider>

);
}
