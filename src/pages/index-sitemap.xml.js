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
        <loc>${baseUrl + '/blog-sitemap.xml'}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
        </url>
        <url>
        <loc>${baseUrl + '/hotel-sitemap.xml'}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
        </url>
        <url>
        <loc>${baseUrl + '/pages-sitemap.xml'}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
        </url>
        <url>
        <loc>${baseUrl + '/tours-sitemap.xml'}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
        </url>   
        <url>
        <loc>${baseUrl + '/local-sitemap.xml'}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
        </url>    <url>
        <loc>${baseUrl + '/citytour-sitemap.xml'}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
        </url>
        <url>
        <loc>${baseUrl + '/landing-sitemap.xml'}</loc>
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