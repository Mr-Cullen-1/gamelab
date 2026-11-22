import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const dir=path.dirname(fileURLToPath(import.meta.url));
const source=path.join(dir,'source/GameLab_Final_Design_Package/05_Assets');
const assetMap={robot:'3D/robot_gamer.png',robotWave:'3D/robot_wave.png',trophy:'3D/trophy.png',math:'2D/math.png',english:'2D/english.png',code:'2D/code.png',robotIcon:'2D/computer.png',computer:'2D/computer.png',puzzle:'2D/puzzle.png'};
const assets=Object.fromEntries(Object.entries(assetMap).map(([name,file])=>[name,'data:image/png;base64,'+fs.readFileSync(path.join(source,file)).toString('base64')]));
// A small robot course symbol uses the supplied robot art rather than duplicating the digital icon.
assets.robotIcon=assets.robotWave;
// Embed game-specific covers so the standalone HTML still works offline.
const gameCovers={
 blockPuzzleBanner:'BlockPuzzle-banner-v2.webp',blockPuzzleCompact:'BlockPuzzle-compact-v2.webp',
 bridgeConstructorBanner:'BridgeConstructor-banner-v2.webp',bridgeConstructorCompact:'BridgeConstructor-compact-v2.webp',
 mathFishingBanner:'MathFishing-banner.webp',mathFishingCompact:'MathFishing-compact.webp'
};
for(const [key,file] of Object.entries(gameCovers))assets[key]='data:image/webp;base64,'+fs.readFileSync(path.join(dir,file)).toString('base64');
const font=fs.readFileSync(path.join(dir,'nunito.woff2'));
const fontIsTrueType=font.subarray(0,4).equals(Buffer.from([0,1,0,0]));
const read=name=>fs.readFileSync(path.join(dir,name),'utf8');
// Sources: style.css (page) + player.css (lesson player); app.js (catalog) + lessons.js (content) + player.js (lesson engine).
let css=[read('style.css'),read('player.css')].join('\n').replace('__FONT__',`data:font/${fontIsTrueType?'ttf':'woff2'};base64,`+font.toString('base64'));
if(fontIsTrueType)css=css.replace("format('woff2')","format('truetype')");
const js=[read('app.js'),read('lessons.js'),read('player.js'),'mountIcons();renderCourses();renderSections();'].join('\n');
let html=read('prototype.html').replace('/* STYLES */',()=>css).replace('/* ASSETS */',()=>`const ASSETS=${JSON.stringify(assets)};`).replace('/* APP */',()=>js);
html=html.replace('<head>',()=>'<head>\n<!-- Embedded Nunito font license:\n'+read('Nunito-OFL.txt').replaceAll('--','—')+'\n-->');
fs.writeFileSync(path.join(dir,'GameLab.html'),html);
console.log(`GameLab.html created: ${(Buffer.byteLength(html)/1024/1024).toFixed(2)} MB. All assets and scripts embedded.`);
