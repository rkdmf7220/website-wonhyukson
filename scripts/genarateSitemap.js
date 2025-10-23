import {readFileSync, writeFileSync} from 'fs';
import {resolve} from 'path';

// file path
const projectRoot = process.cwd();
const xmlFilePath = resolve(projectRoot, 'dist', 'sitemap.xml');
const jsonFilePath = resolve(projectRoot, 'public/sample/ko/data-result.json');
const baseUrl = process.env.CUSTOM_DOMAIN ? `https://${process.env.CUSTOM_DOMAIN}` : `https://${process.env.VERCEL_URL}`;

const sitemapUrlTemplate = (link) => `<url>
    <loc>${link}</loc>
  </url>`;

let staticUrlList = ['main', 'sculpture', 'painting', 'typography', 'texts', 'archives', 'cv', 'news'];
let dynamicUrlList = [];
let urlList = [];

try {
  // read and parse
  const jsonData = readFileSync(jsonFilePath, 'utf8');
  const parsedData = JSON.parse(jsonData);

  parsedData.forEach(item => {
    dynamicUrlList.push(`${item.type}/${item.id}`)
  })

  // root url은 하드 코딩
  urlList.push(sitemapUrlTemplate(`${baseUrl}/`));

  // 정적 + 동적 url push
  staticUrlList.forEach(item => {
    urlList.push(sitemapUrlTemplate(`${baseUrl}/ko/${item}`))
    urlList.push(sitemapUrlTemplate(`${baseUrl}/en/${item}`))
  })
  dynamicUrlList.forEach(item => {
    urlList.push(sitemapUrlTemplate(`${baseUrl}/ko/${item}`))
    urlList.push(sitemapUrlTemplate(`${baseUrl}/en/${item}`))
  })

  // 줄바꿈 + 들여쓰기 고려해서 join 사용
  const sitemapList = urlList.join("\n  ");

  // 줄바꿈 고려해서 들여쓰기 조정
  const data = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapList}
</urlset>`;

  writeFileSync(xmlFilePath, data, 'utf8');
} catch (err) {
  console.log(err)
}