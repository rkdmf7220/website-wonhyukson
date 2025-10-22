import {writeFileSync, readFileSync} from 'fs';
import {resolve} from 'path';

// file path
const projectRoot = process.cwd();
const xmlFilePath = resolve(projectRoot, 'dist', 'sitemap.xml');
const jsonFilePath = (lang) => resolve(projectRoot, 'public/sample', lang, 'data-result.json');



// test
const jsonData = readFileSync(jsonFilePath('ko', 'cv'), 'utf8');
// const koJsonData = readFileSync(jsonFilePath('ko'), 'utf8');
// const enJsonData = readFileSync(jsonFilePath('en'), 'utf8');

// todo: static - intro, main, sculpture, painting, typography, texts, archives, cv, news
// todo: dynamic - sculpture, sculpture, painting, typography, archives, news

const data = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <>${jsonData}</>
</urlset>`;





// write file
writeFileSync(xmlFilePath, data, 'utf8');
