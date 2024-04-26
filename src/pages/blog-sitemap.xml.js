// import React from "react";
// import fs from "fs";
import axios from "axios";

const HotelSitemap = () => {};

export const getServerSideProps = async ({ res }) => {
    const baseUrl = {
        development: "http://localhost:3008",
        production: "https://hamnavaz.com",
    }[process.env.NODE_ENV];

    const response = await axios.post('https://api.hamnavaz.com/api/v1/post/getPosts',{isAdmin:0,paginate:1});
    const posts = await response.data.data;

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
    //         ].includes(staticPage);
    //     })
    //     .map((staticPagePath) => {
    //         return `${baseUrl}/${staticPagePath}`;
    //     });
    const hotelsUrl=posts?.map(h=>{
        return `${baseUrl}/blogs/${h.slug}`;
    })


    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
              <loc>${`${baseUrl}/blog`}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>1.0</priority>
            </url>
      ${hotelsUrl
        .map((url) => {
            return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default HotelSitemap;