const footerLinks = [

    {
        name: 'تماس باما', href: '/contact-us'
    }, {
        name: 'درباره ما', href: '/about-us'
    }, {
        name: 'هتل های داخلی', href: '/hotels'
    }, {
        name: 'هتل های خارجی', href: '/hotels'
    }, {
        name: 'تور قشم', href: 'تور-قشم/'
    }, {
        name: 'تور ایتالیا', href: 'تور-سواحل-ایتالیا/'
    }, {
        name: 'تور قطر', href: 'تور-قطر/'
    }, {
        name: 'تور استانبول', href: 'تور-استانبول/'
    }, {
        name: 'تور دبی', href: 'تور-دبی/'
    }, {
        name: 'تورآنتالیا', href: 'تور-آنتالیا/'
    }, {
        name: 'تور ترکیه', href: '/turkey'
    },

]

const tourName = [
    {
        name: 'قشم', href: 'تور-قشم/'
    }, {
        name: 'سواحل-ایتالیا', href: 'تور-سواحل-ایتالیا/'
    }, {
        name: 'قطر', href: 'تور-قطر/'
    }, {
        name: 'استانبول', href: 'تور-استانبول/'
    }, {
        name: 'دبی', href: 'تور-دبی/'
    }, {
        name: 'آنتالیا', href: 'تور-آنتالیا/'
    }, {
        name: 'آلانیا', href: 'تور-آلانیا/'
    }

]

const footerLinksOut = [{
    name: 'ترکیه', href: '/flights/tehran-to-istanbul-all/airfares-thr,ika-ist,saw,teq#'
}, {
    name: 'گرجستان', href: '/flights/tehran-to-tbilisi/airfares-thr,ika-tbs#'
}, {
    name: 'دبی', href: '/flights/tehran-to-dubi-all/airfares-thr,ika-dxb,dwc,shj#'
}, {
    name: 'آنتالیا', href: '/flights/tehran-to-antalya-all/airfares-thr,ika-ayt,dnz,ise#'
},

]

const tableData = [{
    name: 'شماره درخواست', flex: 15, mFlex: 30, value: 'reqNo',
}, {
    name: 'نام خانوادگی', flex: 20, mFlex: 30, value: 'nameFamily',
}, {
    name: 'موبایل', flex: 10, mFlex: 30, value: 'mobileNo',
}, {
    name: 'تاریخ', flex: 10, mFlex: 25, value: 'dateTimeSabt',
}, {
    name: 'قیمت خرید', flex: 20, mFlex: 35, value: 'amount',
}, {
    name: 'وضعیت', flex: 9, mFlex: 30, value: 'stat',
}, {
    name: 'بانک', flex: 8, mFlex: 20, value: 'bankName',
}, {
    name: 'رفرنس', flex: 8, mFlex: 17, value: 'reqPnr',
},

];
const flightsData = [[{
    name: "مشهد", url: "tehran-to-mashhad/airfares-thr,ika-mhd",
}, {
    name: "کیش", url: "tehran-to-kish/airfares-thr,ika-kih",
}, {
    name: "قشم", url: "tehran-to-qeshm/airfares-thr,ika-gsm",
}, {
    name: "اهواز", url: "tehran-to-ahvaz/airfares-thr,ika-awz",
}, {
    name: "تبریز", url: "tehran-to-tabriz/airfares-thr,ika-tbz",
}, {
    name: "شیراز", url: "tehran-to-shiraz/airfares-thr,ika-syz",
},], [{
    name: "استانبول", url: "tehran-to-istanbul/airfares-thr,ika-ist",
}, {
    name: "دبی", url: "tehran-to-dubi/airfares-thr,ika-dxb",
}, {
    name: "تفلیس", url: "tehran-to-teflis/airfares-thr,ika-tbs",
}, {
    name: "آنتالیا", url: "tehran-to-antalya-all/airfares-thr,ika-ayt,dnz,ise",
}, {
    name: "باکو", url: "tehran-to-baku/airfares-thr,ika-gyd",
}, {
    name: "نجف", url: "tehran-to-najaf/airfares-thr,ika-njf",
},]]
const flightsDataHotel = [[{
    name: "مشهد", url: "#",
}, {
    name: "کیش", url: "#",
}, {
    name: "اصفهان", url: "#",
}, {
    name: "اهواز", url: "#",
}, {
    name: "تبریز", url: "#",
}, {
    name: "شیراز", url: "#",
},], [{
    name: "استانبول", url: "#",
}, {
    name: "دبی", url: "#",
}, {
    name: "تفلیس", url: "#",
}, {
    name: "آنتالیا", url: "#",
}, {
    name: "آنکارا", url: "#",
}, {
    name: "آلانیا", url: "#",
},]]

const homeText = ' در دنیای امروزی با توجه به گسترش خرید بلیط هواپیما به صورت آنلاین و جستجوی کاربران برای بلیط چارتری و بلیط ارزان هواپیما و افزایش تمایل مردم برای سفر با هواپیما و از طرفی به صرفه بودن سفر با هواپیما شرکت های زیادی اقدام به فروش بلیط هواپیما به صورت بلیط چارتر و بلیط سیستمی و هم چنین اقدام به پدید آوردن بستری مناسب جهت رزرو آنلاین هتل نموده اند، لذا با توجه به نیاز مردم به رزرو آنلاین بلیط هواپیما و رزرو آنلاین هتل در داخل و خارج جهت آسایش و راحتی مسافران گرامی اقدام به ایجاد یک سیستم رزرواسیون به نام بلیط جا با امکان رزرو آنلاین بلیط هواپیما و هم چنین خرید بلیط ارزان هواپیما و رزرو آنلاین هتل در تهران، رزرو هتل مشهد و کیش، قشم، شیراز و دیگر شهرهای داخل ایران و امکان رزرو آنلاین هتل تفلیس گرجستان و رزرو هتل استانبول نموده ایم تا قدم کوچکی در راه بهبود ارائه خدمات رزرو آنلاین هتل و خرید آنلاین بلیط هواپیما داشته باشیم.'

const months = [{
    name: 'فروردین', value: 1,
}, {
    name: 'اردیبهشت', value: 2,
}, {
    name: 'خرداد', value: 3,
}, {
    name: 'تیر', value: 4,
}, {
    name: 'مرداد', value: 5,
}, {
    name: 'شهریور', value: 6,
}, {
    name: 'مهر', value: 7,
}, {
    name: 'آبان', value: 8,
}, {
    name: 'آذر', value: 9,
}, {
    name: 'دی', value: 10,
}, {
    name: 'بهمن', value: 11,
}, {
    name: 'اسفند', value: 12,
},]

const tableData2 = [{
    name: 'درخواست', flex: 8, mFlex: 17, value: 'reqNo',
}, {
    name: 'رفرنس', flex: 8, mFlex: 17, value: 'reqPnr',
}, {
    name: 'مبدا', flex: 22, mFlex: 17, value: 'airport1',
}, {
    name: 'مقصد', flex: 22, mFlex: 17, value: 'airport2',
}, {
    name: 'ایرلاین', flex: 8, mFlex: 17, value: 'airline',
}, {
    name: 'روز پرواز', flex: 8, mFlex: 17, value: 'flightDay',
}, {
    name: 'تاریخ پرواز', flex: 8, mFlex: 17, value: 'flightDate',
}, {
    name: 'ساعت پرواز', flex: 8, mFlex: 17, value: 'flightTime',
}, {
    name: 'نام', flex: 8, mFlex: 17, value: 'nameEn',
}, {
    name: 'نام خانوادگی', flex: 8, mFlex: 17, value: 'familyEn',
}, {
    name: 'تلفن', flex: 8, mFlex: 17, value: 'mobileNo',
}, {
    name: 'مبلغ', flex: 8, mFlex: 17, value: 'ticketPrice',
}, {
    name: 'ملیت', flex: 8, mFlex: 17, value: 'meliat',
}, {
    name: 'جنسیت', flex: 8, mFlex: 17, value: 'sex',
}, {
    name: 'شماره بلیط', flex: 8, mFlex: 17, value: 'ticketNo',
}, {
    name: 'شماره پرواز', flex: 8, mFlex: 17, value: 'flightNo',
}, {
    name: 'کدملی', flex: 8, mFlex: 17, value: 'meliCode',
}, {
    name: 'تعداد', flex: 8, mFlex: 17, value: 'numADL',
}, {
    name: 'کلاس', flex: 8, mFlex: 17, value: 'flightClass',
}, {
    name: 'مسیر', flex: 8, mFlex: 17, value: 'pathKind',
},

]


const FAQ = [{
    id: 1,
    title: 'برای رزرو تورهای مسافرتی به چه طریقی اقدام کنیم ؟',
    description: 'برای رزرو و خریداری تور های مسافرتی سه راهکار وجود دارد، نخست آنکه به سایت بلیطجا رفته و تور مدنظرتان را به صورت آنلاین رزرو نمایید. راهکار دیگر این است که از طریق تماس با شماره 02184278 تور مسافرتی خود را توسط کارشناسان بلیطجا اسمان ابی رزرو کنید. راهکار آخر نیز جهت خرید تورهای مسافرتی، مراجعه حضوری به دفتر بلیطجا اسمان ابی است.'
}, {
    id: 2,
    title: 'چگونه یک تور ترکیبی خریداری کنیم ؟',
    description: 'در تور ترکیبی بلیطجا امکان رزرو هتل، خرید بلیط هواپیما، انتخاب خدمات و هتل دلخواه مشتری بدون هیچ گونه محدودیت زمانی، صدور آنی مدارک و همچنین پشتیبانی 24 ساعته در هفت روز هفته برای مسافر وجود دارد.'
}, {
    id: 3,
    title: 'راه های رزرو تور با قیمت مناسب کدام ها هستند؟',
    description: 'برای رزرو تور با قیمت مناسب پیشنهاد می دهیم لیست تور های سایت رو چک کنین تا مناسب ترین قیمت رو انتخاب کرده در کانال تلگرام و صفحه اینستاگرام بلیطجا از تور های لحظه آخری که عمدتا از قیمت های پایین تری برخوردار هستند مطلع شده و سپس تور مدنظرتان را رزرو کنید.'
}, {
    id: 4,
    title: 'در سفر با تور، مسافران به چه طریقی می توانند از خدمات پشتیبانی بهره مند شوند؟',
    description: 'راهنمایان سفر فارسی زبان و مجرب درتمامی تور های بلیطجا اسمان ابی حضور داشته و مسافران را در مواجه با هرگونه پیشآمدی راهنمایی می کنند.'
}, {
    id: 5,
    title: 'سفر به کدام کشورهای خارجی ویزا نمی‌خواهد؟',
    description: 'به منظور سفر به کشورهایی نظیر ترکیه، ارمنستان، گرجستان برای مدت زمان محدود نیازی به دریافت ویزای توریستی نیست. به عنوان مثال برای داشتن سفرهای توریستی به کشور ترکیه به مدت کمتر از 90 روز نیازی به اخذ ویزای کشور ترکیه نخواهد بود.'
}, {
    id: 6,
    title: 'هزینه اضافه بار چقدر است؟',
    description: 'بستگی به ایرلاین شما دارد که چه هزینه ای برای اضافه بار می بایست پرداخت شود.'
}, {
    id: 7,
    title: 'برای سوار شدن به هواپیما چه زمانی باید در فرودگاه باشم و چه مدارکی مورد نیاز است؟',
    description: 'برای اینکه بدون دغدغه سفر خود را آغاز کنید باید حداقل دو ساعت قبل از پرواز در فرودگاه حضور داشته باشید. برای پرواز نیازی به داشتن پرینت بلیط ندارید و تصویر و شماره بلیط کفایت می کند. مدارک شناسایی برای پرواز های داخلی کارت ملی یا شناسنامه و در پرواز های خارجی همراه داشتن پاسپورت و عوارض خروج از کشور الزامی میباشد.'
},

]


const contactusData = [{
    data: 'سهروردی جنوبی ، خیابان ابرار شرقی ، خیابان اقلیمی ، پلاک 12 ، واحد سوم',
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="19.162" height="19.121" viewBox="0 0 21.162 21.121">
        <path id="_008-maps" data-name="008-maps"
              d="M12.21,21.621H4.95A4.956,4.956,0,0,1,0,16.671V5.45A4.956,4.956,0,0,1,4.95.5h11.22a4.956,4.956,0,0,1,4.95,4.95V9.617a.825.825,0,0,1-1.65,0V5.45a3.3,3.3,0,0,0-3.3-3.3H4.95a3.3,3.3,0,0,0-3.3,3.3v11.22a3.3,3.3,0,0,0,3.3,3.3h7.26A.825.825,0,0,1,12.21,21.621ZM11.187,7.764l2.556-2.556a.825.825,0,0,0-1.167-1.167L10.02,6.6a.825.825,0,0,1-1.169,0L6.32,4.044A.825.825,0,0,0,5.148,5.206L7.68,7.757a2.458,2.458,0,0,0,1.752.732h0A2.459,2.459,0,0,0,11.187,7.764ZM4.754,14.2l1.772-1.8A2.483,2.483,0,0,0,6.52,8.918L4.752,7.138A.825.825,0,0,0,3.581,8.3l1.768,1.781a.828.828,0,0,1,0,1.161l-1.772,1.8A.825.825,0,1,0,4.754,14.2Zm13.717,6.587c1.785-2.266,2.691-4,2.691-5.139a4.414,4.414,0,1,0-8.828,0c0,1.143.905,2.872,2.691,5.139a2.194,2.194,0,0,0,3.446,0Zm-.648-.511h0Zm1.689-4.628c0,.557-.614,1.93-2.337,4.118a.541.541,0,0,1-.854,0c-1.723-2.187-2.337-3.561-2.337-4.118a2.764,2.764,0,1,1,5.528,0ZM4.991,18.321a.827.827,0,0,1-.583-1.408l12-12a.825.825,0,0,1,1.167,1.167l-12,12A.823.823,0,0,1,4.991,18.321Zm10.725-2.764a1.031,1.031,0,1,0,1.031-1.031A1.031,1.031,0,0,0,15.717,15.557Z"
              transform="translate(0 -0.5)" fill="#fff"/>
    </svg>

}, {
    data: '021-84278 - 021-84279000',
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="19.457" height="19.474" viewBox="0 0 20.457 20.474">
        <path id="_003-telephone" data-name="003-telephone"
              d="M13.437,20.475C5.234,20.413-4.377,8.46,2.646,1.432c.25-.254.514-.5.785-.725A2.981,2.981,0,0,1,7.46.878l.01.01L8.823,2.294A2.933,2.933,0,0,1,7.86,7.057a6.457,6.457,0,0,0-1.068.527c-.745.759-1.219,1.992,1.567,4.783.9.906,2.243,2.11,3.429,2.11a1.893,1.893,0,0,0,1.349-.622,6.213,6.213,0,0,0,.494-1.023A2.927,2.927,0,0,1,18.4,11.85l1.389,1.345.01.01a2.987,2.987,0,0,1,.179,4.023c-.212.254-.439.5-.674.738A8.113,8.113,0,0,1,13.437,20.475ZM5.356,1.6a1.392,1.392,0,0,0-.9.33c-.232.2-.459.4-.673.622C.042,6.356,2.1,11.55,5.7,15.106c3.564,3.547,8.732,5.486,12.471,1.73.2-.2.4-.415.577-.632a1.381,1.381,0,0,0-.078-1.864l-1.389-1.344-.01-.01a1.317,1.317,0,0,0-2.155.443,6.163,6.163,0,0,1-.823,1.534,3.472,3.472,0,0,1-2.5,1.115c-1.76,0-3.362-1.378-4.561-2.579-1.819-1.745-3.921-4.72-1.547-7.063a6.35,6.35,0,0,1,1.576-.858,1.323,1.323,0,0,0,.43-2.158l-.01-.01L6.324,2a1.37,1.37,0,0,0-.968-.4ZM19.87,9.56a.8.8,0,0,1-.8-.728A7.98,7.98,0,0,0,11.84,1.6.8.8,0,0,1,11.983,0a9.649,9.649,0,0,1,8.684,8.684.8.8,0,0,1-.725.868C19.919,9.559,19.894,9.56,19.87,9.56Zm-6.229,0a.8.8,0,0,0,.505-1.012,3.235,3.235,0,0,0-1.968-2.02.8.8,0,0,0-.533,1.508,1.625,1.625,0,0,1,.984,1.018.8.8,0,0,0,1.011.505Zm3.141-.007a.8.8,0,0,0,.678-.9,6.441,6.441,0,0,0-5.436-5.436A.8.8,0,0,0,11.8,4.794a4.834,4.834,0,0,1,4.079,4.079.8.8,0,0,0,.9.678Z"
              transform="translate(-0.214 -0.001)" fill="#fff"/>
    </svg>
}, {
    data: 'واتساپ : 09102500025',
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="19.162" height="19.16" viewBox="0 0 21.162 21.16">
        <path id="_002-speech_bubble" data-name="002-speech bubble"
              d="M.826,21.183A.827.827,0,0,1,0,20.357V10.7a10.585,10.585,0,1,1,10.53,10.48,10.452,10.452,0,0,1-4.726-1.11,3.662,3.662,0,0,0-4.232.707l-.162.162a.826.826,0,0,1-.585.242Zm3.359-3.147a5.26,5.26,0,0,1,2.361.559,8.816,8.816,0,0,0,3.994.935,8.932,8.932,0,1,0-8.887-8.839s0,.005,0,.008v7.979a5.326,5.326,0,0,1,2.532-.642ZM8.1,10.6A1.033,1.033,0,1,1,7.067,9.57,1.033,1.033,0,0,1,8.1,10.6ZM10.621,9.57A1.033,1.033,0,1,0,11.654,10.6,1.033,1.033,0,0,0,10.621,9.57Zm3.554,0A1.033,1.033,0,1,0,15.209,10.6,1.033,1.033,0,0,0,14.175,9.57Z"
              transform="translate(0 -0.023)" fill="#fff"/>
    </svg>
}, {data: 'info[at]hamnavaz.com', svg: <svg xmlns="http://www.w3.org/2000/svg" width="19.162" height="19.698" viewBox="0 0 21.162 16.698">
        <path id="_001-mail_inbox_app" data-name="001-mail inbox app" d="M16.2,70.7H4.96A4.965,4.965,0,0,1,0,65.738V58.96A4.965,4.965,0,0,1,4.96,54H16.2a4.965,4.965,0,0,1,4.96,4.96v6.778A4.965,4.965,0,0,1,16.2,70.7ZM4.96,55.653A3.31,3.31,0,0,0,1.653,58.96v6.778A3.31,3.31,0,0,0,4.96,69.045H16.2a3.31,3.31,0,0,0,3.307-3.307V58.96A3.31,3.31,0,0,0,16.2,55.653Zm8.65,8.159L17.7,60.691a.827.827,0,0,0-1-1.314L12.607,62.5a3.315,3.315,0,0,1-4.008,0L4.641,59.423a.827.827,0,0,0-1.015,1.305l3.962,3.08.006,0a4.972,4.972,0,0,0,6.016,0Z" transform="translate(0 -54)" fill="#fff"/>
    </svg>
},]

export {
    footerLinks,
    footerLinksOut,
    tableData,
    flightsData,
    homeText,
    months,
    flightsDataHotel,
    tableData2,
    FAQ,
    tourName,
    contactusData
}
