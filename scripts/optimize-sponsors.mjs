import fs from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
const file='src/data/sponsors.json';
const sponsors=JSON.parse(await fs.readFile(file,'utf8'));
for(const sponsor of sponsors){
  if(!sponsor.logo.endsWith('.png'))continue;
  const output=sponsor.logo.replace(/\.png$/,'.webp');
  execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-i','public'+sponsor.logo,'-vf',"scale=w='min(700,iw)':h='min(700,ih)':force_original_aspect_ratio=decrease",'-c:v','libwebp','-q:v','85','public'+output]);
  sponsor.logo=output;
}
await fs.writeFile(file,JSON.stringify(sponsors,null,2)+'\n');
