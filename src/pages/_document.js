import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
            {/* <link rel="manifest" href="../../manifest.json">
          <script type="text/javascript">
               (function(){
                var now = new Date();
                var version = now.getFullYear().toString() + "0" + now.getMonth() + "0" + now.getDate() +
                    "0" + now.getHours();
                var head = document.getElementsByTagName("head")[0];
                var link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = "https://app.najva.com/static/css/local-messaging.css" + "?v=" + version;
                head.appendChild(link);
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.async = true;
                script.src = "https://app.najva.com/static/js/scripts/bilitja913-website-36999-7578e7a6-73fd-48a8-abca-7518c2b588a5.js" + "?v=" + version;
                head.appendChild(script);
            {'}'}));
          </script>
          </link> */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <meta httpEquiv="content-language" content="fa"></meta>
         
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
