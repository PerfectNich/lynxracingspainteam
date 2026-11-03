import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const routes={'':'home',agenda:'calendar',roster:'roster',palmares:'palmares',multimedia:'media',sponsors:'sponsors',tienda:'shop',contacto:'contact'};
for(const lang of ['es','en','ca']){
 const data=JSON.parse(await fs.readFile(`src/i18n/locales/${lang}.json`));
 for(const [route,key] of Object.entries(routes)){
  const suffix=[lang==='es'?'':lang,route].filter(Boolean).join('/');
  const html=await fs.readFile(`dist/${suffix ? suffix+'/' : ''}index.html`,'utf8');
  assert.ok(html.includes(`<title>${data.seo[key].title}</title>`),suffix);
  assert.ok(html.includes(`property="og:url" content="https://lynxracingspainteam.com/${suffix}"`),suffix);
  assert.ok(html.includes(`<html lang="${lang}">`),suffix);
 }
}
console.log('24 rutas: títulos, idioma y URL social correctos.');
