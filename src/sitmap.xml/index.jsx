const buildSitemapXml = (fields) => {
  const content = fields
    .map((fieldData) => {
      const field = Object.entries(fieldData).map(([key, value]) => {
        if (!value) return "";
        return `<${key}>${value}</${key}>`;
      });

      return `<url>${field.join("")}</url>\n`;
    })
    .join("");

  return this.withXMLTemplate(content);
};

// const withXMLTemplate = (content) => {
//   return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n${content}</urlset>`;
// };

export const getServerSideprops = async ({ res }) => {
  const data = await getAllData();

  const transformedData = data.reduce((filtred, page) => {
    const isExcluded = excludeDocument(page);
    if (isExcluded) return filtred;

    filtred.push({
      loc: page.url,
      lastmod: page.last_publication_date || undefined,
      priority: 0.7,
      changefreq: "daily",
    });

    return filtred;
  }, []);
  const sitemapContent = buildSitemapXml(transformedData);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemapContent);

  res.end();

  // Empty since we don't render anything
  return {
    props: {},
  };
};

const SitemapXML = () => {
  return null;
};
export default SitemapXML;
