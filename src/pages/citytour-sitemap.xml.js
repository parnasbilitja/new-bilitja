// import React from "react";
// import fs from "fs";
import axios from "axios";

const HotelSitemap = () => {};

export const getServerSideProps = async ({ res }) => {
    const baseUrl = {
        development: "http://localhost:3008",
        production: "https://hamnavaz.com",
    }[process.env.NODE_ENV];

    const response = await axios.post('https://api.hamnavaz.com/api/v1/city/getCities',{hasTour:true});
    const cities = await response.data.data;

    const citiesUrl=cities?.map(h=>{
        return `${baseUrl}/${h.slug}`;
    })


    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
              <loc>${`${baseUrl}/`}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>1.0</priority>
            </url>
      ${citiesUrl
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