import { writeFileSync } from "fs";
import { globby } from "globby";
import prettier from "prettier";

async function generate() {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  const pages = await globby(["src/api", "src/pages"]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const path = page
              .replace("pages", "")
              .replace("data", "")
              .replace("src", "")
              .replace(".js", "")
              .replace(".jsx", "")
              .replace(".mdx", "");
            const routes = path;
            const n_route = routes.slice(1);
            const new_routes = n_route == "/index" ? "" : n_route;
            return `
              <url>
                  <loc>${`https://bilitjassrnew.vercel.app${new_routes}`}</loc>
                  <lastmod>${new Date().toISOString()}</lastmod>
                  <priority>0.80</priority>
              </url>
            `;
          })
          .join("")}
    </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  // eslint-disable-next-line no-sync
  writeFileSync("public/sitemap.xml", formatted);
}

generate();
