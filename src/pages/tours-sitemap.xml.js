// import React from "react";
// import fs from "fs";
import axios from "axios";

const HotelSitemap = () => {};

export const getServerSideProps = async ({ res }) => {
    const baseUrl = {
        development: "http://localhost:3008",
        production: "https://bilitja.com",
    }[process.env.NODE_ENV];

    const response = await axios.post("https://api.hotelobilit.com/api/v2/tours",{
        req_type:'package'
    },{
        headers: {
            "x-app-key": '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05' //the token is a variable which holds the token
        }
    });
    const Tours = await response.data.data;

    const toursUrl=Tours?.map(h=>{
        return `${baseUrl}/tours/${h.id}`;
    })


    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    
          <url>
              <loc>${`${baseUrl}/tours/`}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>1.0</priority>
            </url>
      ${toursUrl
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
