import fs from 'node:fs/promises';
import path from 'node:path';
const template = await fs.readFile('dist/index.html', 'utf8');
const routes = { '': 'home', agenda: 'calendar', roster: 'roster', palmares: 'palmares', multimedia: 'media', sponsors: 'sponsors', tienda: 'shop', contacto: 'contact' };
const origin = 'https://lynxracingspainteam.com';
const escape = s => s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
for (const lang of ['es','en','ca']) {
  const texts = JSON.parse(await fs.readFile(`src/i18n/locales/${lang}.json`, 'utf8'));
  for (const [route,key] of Object.entries(routes)) {
    const parts = [lang === 'es' ? '' : lang, route].filter(Boolean);
    const url = origin + '/' + parts.join('/');
    const {title,description} = texts.seo[key];
    let html = template.replace('<html lang="es">', `<html lang="${lang}">`).replace(/<title>.*?<\/title>/s, `<title>${escape(title)}</title>`);
    for (const [attr,name,value] of [['name','description',description],['property','og:title',title],['property','og:description',description],['property','og:url',url],['name','twitter:title',title],['name','twitter:description',description]]) {
      html = html.replace(new RegExp(`<meta\\s+${attr}="${name}"\\s+content="[^"]*"\\s*\\/? >`.replace('\\/? >','\\/?>'),'g'), `<meta ${attr}="${name}" content="${escape(value)}" />`);
    }
    html=html.replace('</head>', `<link rel="canonical" href="${url}" />\n${['es','en','ca'].map(l=>`<link rel="alternate" hreflang="${l}" href="${origin}/${[l==='es'?'':l,route].filter(Boolean).join('/')}" />`).join('\n')}\n</head>`);
    const dir=path.join('dist',...parts); await fs.mkdir(dir,{recursive:true}); await fs.writeFile(path.join(dir,'index.html'),html);
  }
}
console.log('SEO estático generado para 24 rutas.');
