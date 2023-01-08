import React from 'react';
import Head from "next/head";

const HeadSeo = (props) => {
    console.log(props);
    const setTitleMeta = (pathName) => {
        // var src = "";
        // var dest = "";
        pathName = decodeURI(pathName);
        switch (props.mainRoute) {
          case "index": {
            return (
              "خرید اینترنتی بلیط ارزان هواپیما |بلیط استانبول|بلیط جا|02184279999" +
              "/" +
              "ارزانترین قیمت بلیط های هواپیما به استانبول آنتالیا  دنیزلی اسپارتا دبی از1میلیون و 500 هزارتومان و کیش مشهد قشم شیراز را از 300هزار تومان در بین بلیت های ماجستجو و آنلاین خرید کنید|بلیط جا" +
              "/" +
              "بلیط ارزان هواپیما|خرید اینترنتی بلیط هواپیما|بلیط هواپیما تهران به استانبول|بلیط هواپیما کیش|بلیط هواپیما دبی|بلیط هواپیما مشهد|رزرو اینترنتی بلیط هواپیما مشهد"
            );
          }
    
          default:
            return (
              "خرید اینترنتی بلیط ارزان هواپیما |بلیط استانبول|بلیط جا|02184279999" +
              "/" +
              "ارزانترین قیمت بلیط های هواپیما به استانبول آنتالیا دنیزلی اسپارتااز1میلیون تومان و کیش مشهد قشم شیراز را از 300هزار تومان را در بین بلیت های ما آنلاین خرید کنید|بلیط جا" +
              "/" +
              "بلیط ارزان هواپیما|خرید اینترنتی بلیط هواپیما|بلیط هواپیما تهران به استانبول|بلیط هواپیما کیش|بلیط هواپیما دبی|بلیط هواپیما مشهد|رزرو اینترنتی بلیط هواپیما مشهد"
            );
        }
      }
    return (
        <div>
            <Head>
            <title>
              {setTitleMeta(props?.router?.asPath).split("/")[0]}{" "}
            </title>
            <meta
              name="title"
              property="og:title"
              content={
                setTitleMeta(props?.router?.asPath).split("/")[0]
              }
            />

            <meta
              name="description"
              property="og:description"
              content={
                setTitleMeta(props?.router?.asPath).split("/")[1]
              }
            />
            <meta
              name="keywords"
              property="og:keywords"
              content={
                setTitleMeta(props?.router?.asPath).split("/")[2]
              }
            />
          </Head>
        </div>
    );
};

export default HeadSeo;