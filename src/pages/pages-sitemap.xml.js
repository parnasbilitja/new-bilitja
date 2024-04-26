import React from "react";
// import fs from "fs";

const Sitemap = () => {
};

export const getServerSideProps = ({res}) => {
    const baseUrl = {
        development: "http://localhost:3008",
        production: "https://hamnavaz.com",
    }[process.env.NODE_ENV];


    //
    // const staticPages = fs?.readdirSync("src/pages")
    //     .filter((staticPage) => {
    //         return ![
    //             "_app.js",
    //             "_document.js",
    //             "_error.js",
    //             "sitemap.xml.js",
    //             "404.js",
    //             "api",
    //             "callbackbank.js",
    //             "villa.js",
    //             "NotFound.js",
    //             "test2.jsx",
    //             "test.jsx",
    //             "panel.js",
    //             "blog.js","blogs",
    //             "cityTour",
    //             "dashboard.js",
    //             "error.js",
    //             "flights.js",
    //             "ticket.js",
    //             "hotel.js",
    //             "hotels",
    //             "payment-receipt.js",
    //             "tours",
    //
    //         ].includes(staticPage) && !staticPage.includes('sitemap');
    //     })
    //     .map((staticPagePath) => {
    //         return `${baseUrl}/${staticPagePath}`;
    //     });

    const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>${baseUrl + '/about-us'}</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<changefreq>daily</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>${baseUrl + '/charter'}</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<changefreq>daily</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>${baseUrl + '/contact-us'}</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<changefreq>daily</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>${baseUrl + '/index'}</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<changefreq>daily</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>${baseUrl + '/tour'}</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<changefreq>daily</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>${baseUrl + '/TrackOrder'}</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<changefreq>daily</changefreq>
<priority>1.0</priority>
</url>

</urlset>
  `;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;