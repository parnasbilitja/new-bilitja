import React from "react";
// import fs from "fs";

const Sitemap = () => {
};

export const getServerSideProps = ({res}) => {
    const baseUrl = {
        development: "http://localhost:3008", production: "https://hamnavaz.com",
    }[process.env.NODE_ENV];


    //
    // const staticPages = fs?.readdirSync("src/pages")
    //     .filter((staticPage) => {
    //         return staticPage.includes('sitemap');
    //     })
    //     .map((staticPagePath) => {
    //         return `${baseUrl}/${staticPagePath.replace(/.js/g, '')}`;
    //     });

    const sitemap = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                <url>
                <loc>${baseUrl + '/turkey'}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>daily</changefreq>
                <priority>1.0</priority>
                </url><url>
                <loc>${baseUrl + '/turkey-automn'}</loc>
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