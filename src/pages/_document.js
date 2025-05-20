import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>


            <Script
                dangerouslySetInnerHTML={{
                    __html: `
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
             gtag('config', 'GTM-WN4X4CF7', {
               page_path: window.location.pathname,
             });
           `,
                }}
            />


            {/*{(process.env.NODE_ENV === 'production') &&*/}
            {/*    <Script dangerouslySetInnerHTML={{*/}
            {/*        __html: `(function (w, d, s, l, i) {*/}
            {/*        w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });*/}
            {/*        var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';*/}
            {/*        j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);*/}
            {/*    })(window, document, 'script', 'dataLayer', 'GTM-WN4X4CF7');`*/}
            {/*    }}></Script>*/}
            {/*}*/}


            {/*<Script*/}
            {/*    async*/}
            {/*    src={`https://www.googletagmanager.com/gtag/js?id=GTM-WN4X4CF7`}*/}
            {/*/>*/}


          <link rel="manifest" href="/manifest.json">
            {/* <script type="text/javascript">
              {function async() {
                var now = new Date();
                var version =
                  now.getFullYear().toString() +
                  "0" +
                  now.getMonth() +
                  "0" +
                  now.getDate() +
                  "0" +
                  now.getHours();
                var head = document.getElementsByTagName("head")[0];
                var link = document.createElement("link");
                link.rel = "stylesheet";
                link.href =
                  "https://app.najva.com/static/css/local-messaging.css" +
                  "?v=" +
                  version;
                head.appendChild(link);
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.async = true;
                script.src =
                  "https://app.najva.com/static/js/scripts/bilitja913-website-36999-7578e7a6-73fd-48a8-abca-7518c2b588a5.js" +
                  "?v=" +
                  version;
                head.appendChild(script);
              }}
              ()
            </script>
            <script
              async
              src={`https://app.najva.com/static/js/scripts/bilitja913-website-36999-7578e7a6-73fd-48a8-abca-7518c2b588a5.js" +
                  "?v=" +`}
            ></script>{" "} */}
          </link>
          {/*<script*/}
          {/*  async*/}
          {/*  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}*/}
          {/*/>*/}
          {/*<script*/}
          {/*  dangerouslySetInnerHTML={{*/}
          {/*    __html: `*/}
          {/*  window.dataLayer = window.dataLayer || [];*/}
          {/*  function gtag(){dataLayer.push(arguments);}*/}
          {/*  gtag('js', new Date());*/}
          {/*  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {*/}
          {/*    page_path: window.location.pathname,*/}
          {/*  });*/}
          {/*`,*/}
          {/*  }}*/}
          {/*/>*/}

            <link rel="shortcut icon" href="/logo192.png"/>
          <meta httpEquiv="content-language" content="fa"></meta>

        </Head>
        <body>
        {/*{(process.env.NODE_ENV === 'production') &&*/}
        {/*    <noscript dangerouslySetInnerHTML={{*/}
        {/*        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WN4X4CF7" height="0" width="0" style="display:none;visibility:hidden"></iframe>`*/}
        {/*    }}></noscript>*/}
        {/*}*/}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
