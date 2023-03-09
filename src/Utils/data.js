const footerLinks = [
    {
        name:'اصفهان',
        href:'/flights/tehran-to-isfahan/airfares-thr,ika-ifn#'
    },
    {
        name:'کیش',
        href:'/flights/tehran-to-kish/airfares-thr,ika-kih#'
    },
    {
        name:'یزد',
        href:'/flights/tehran-to-yazd/airfares-thr,ika-azd#'
    },
    {
        name:'کرمانشاه',
        href:'/flights/tehran-to-kermanshah/airfares-thr,ika-ksh#'
    },
    {
        name:'مشهد',
        href:'/flights/tehran-to-mashhad/airfares-thr,ika-mhd#'
    },
    
]

const footerLinksOut = [
    {
        name:'ترکیه',
        href:'/flights/tehran-to-istanbul-all/airfares-thr,ika-ist,saw,teq#'
    },
    {
        name:'گرجستان',
        href:'/flights/tehran-to-tbilisi/airfares-thr,ika-tbs#'
    },
    {
        name:'دبی',
        href:'/flights/tehran-to-dubi-all/airfares-thr,ika-dxb,dwc,shj#'
    },
    {
        name:'آنتالیا',
        href:'/flights/tehran-to-antalya-all/airfares-thr,ika-ayt,dnz,ise#'
    },
    
]

const tableData = [
    {
        name: 'شماره درخواست',
        flex:15,
        mFlex:30,
        value:'reqNo',
    },
    {
        name: 'نام خانوادگی',
        flex:20,
        mFlex:30,
        value:'nameFamily',
    },
    {
        name: 'موبایل',
        flex:10,
        mFlex:30,
        value:'mobileNo',
    },
    {
        name: 'تاریخ',
        flex:10,
        mFlex:25,
        value:'dateTimeSabt',
    },
    {
        name: 'قیمت خرید',
        flex:20,
        mFlex:35,
        value:'amount',
    },
    {
        name: 'وضعیت',
        flex:9,
        mFlex:30,
        value:'stat',
    },
    {
        name: 'بانک',
        flex:8,
        mFlex:20,
        value:'bankName',
    },
    {
        name: 'رفرنس',
        flex:8,
        mFlex:17,
        value:'reqPnr',
    },
    
];
const flightsData = [
    [
      {
        name: "مشهد",
        url: "tehran-to-mashhad/airfares-thr,ika-mhd",
      },
      {
        name: "کیش",
        url: "tehran-to-kish/airfares-thr,ika-kih",
      },
      {
        name: "قشم",
        url: "tehran-to-qeshm/airfares-thr,ika-gsm",
      },
      {
        name: "اهواز",
        url: "tehran-to-ahwaz/airfares-thr,ika-awz",
      },
      {
        name: "تبریز",
        url: "tehran-to-tabriz/airfares-thr,ika-tbz",
      },
      {
        name: "شیراز",
        url: "tehran-to-shiraz/airfares-thr,ika-syz",
      }, 
    ]
    ,[
    {
      name: "استانبول",
      url: "tehran-to-istanbul/airfares-thr,ika-ist",
    },
    {
      name: "دبی",
      url: "tehran-to-dubi/airfares-thr,ika-dxb",
    },
    {
      name: "تفلیس",
      url: "tehran-to-teflis/airfares-thr,ika-tbs",
    },
    {
      name: "آنتالیا",
      url: "tehran-to-antalya-all/airfares-thr,ika-ayt,dnz,ise",
    },
    {
      name: "باکو",
      url: "tehran-to-baku/airfares-thr,ika-gyd",
    },
    {
      name: "نجف",
      url: "tehran-to-najaf/airfares-thr,ika-njf",
    }, 
  ]]
  const flightsDataHotel = [
    [
      {
        name: "مشهد",
        url: "#",
      },
      {
        name: "کیش",
        url: "#",
      },
      {
        name: "اصفهان",
        url: "#",
      },
      {
        name: "اهواز",
        url: "#",
      },
      {
        name: "تبریز",
        url: "#",
      },
      {
        name: "شیراز",
        url: "#",
      }, 
    ]
    ,[
    {
      name: "استانبول",
      url: "#",
    },
    {
      name: "دبی",
      url: "#",
    },
    {
      name: "تفلیس",
      url: "#",
    },
    {
      name: "آنتالیا",
      url: "#",
    },
    {
      name: "آنکارا",
      url: "#",
    },
    {
      name: "آلانیا",
      url: "#",
    }, 
  ]]

const homeText =' در دنیای امروزی با توجه به گسترش خرید بلیط هواپیما به صورت آنلاین و جستجوی کاربران برای بلیط چارتری و بلیط ارزان هواپیما و افزایش تمایل مردم برای سفر با هواپیما و از طرفی به صرفه بودن سفر با هواپیما شرکت های زیادی اقدام به فروش بلیط هواپیما به صورت بلیط چارتر و بلیط سیستمی و هم چنین اقدام به پدید آوردن بستری مناسب جهت رزرو آنلاین هتل نموده اند، لذا با توجه به نیاز مردم به رزرو آنلاین بلیط هواپیما و رزرو آنلاین هتل در داخل و خارج جهت آسایش و راحتی مسافران گرامی اقدام به ایجاد یک سیستم رزرواسیون به نام بلیط جا با امکان رزرو آنلاین بلیط هواپیما و هم چنین خرید بلیط ارزان هواپیما و رزرو آنلاین هتل در تهران، رزرو هتل مشهد و کیش، قشم، شیراز و دیگر شهرهای داخل ایران و امکان رزرو آنلاین هتل تفلیس گرجستان و رزرو هتل استانبول نموده ایم تا قدم کوچکی در راه بهبود ارائه خدمات رزرو آنلاین هتل و خرید آنلاین بلیط هواپیما داشته باشیم.'

const months =[
  {
    name:'فروردین',
    value:1,
  },
  {
    name:'اردیبهشت',
    value:2,
  },
  {
    name:'خرداد',
    value:3,
  },
  {
    name:'تیر',
    value:4,
  },
  {
    name:'مرداد',
    value:5,
  },
  {
    name:'شهریور',
    value:6,
  },
  {
    name:'مهر',
    value:7,
  },
  {
    name:'آبان',
    value:8,
  },
  {
    name:'آذر',
    value:9,
  },
  {
    name:'دی',
    value:10,
  },
  {
    name:'بهمن',
    value:11,
  },
  {
    name:'اسفند',
    value:12,
  },
]

export { footerLinks, footerLinksOut, tableData, flightsData, homeText, months, flightsDataHotel }