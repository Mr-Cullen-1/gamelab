const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require('../../blockpuzzle/node_modules/playwright');
const root=path.resolve(__dirname,'../..');
(async()=>{
 const specs=JSON.parse(fs.readFileSync(path.join(root,'catalog-banner-manifest.json'),'utf8')).games;
 const browser=await chromium.launch({headless:true,channel:'chrome'});
 const page=await browser.newPage();
 const results=[];
 try{
  for(const game of specs)for(const suffix of ['banner','compact']){
   const base=game.file+'-'+suffix;
   const input='data:image/png;base64,'+fs.readFileSync(path.join(root,base+'.png')).toString('base64');
   const encoded=await page.evaluate(async src=>{
    const img=new Image();img.src=src;await img.decode();
    const canvas=document.createElement('canvas');canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;
    canvas.getContext('2d').drawImage(img,0,0);
    return {width:canvas.width,height:canvas.height,data:canvas.toDataURL('image/webp',.9).split(',')[1]};
   },input);
   const bytes=Buffer.from(encoded.data,'base64');fs.writeFileSync(path.join(root,base+'.webp'),bytes);
   results.push({id:game.id,file:base,width:encoded.width,height:encoded.height,webpBytes:bytes.length});
  }
  fs.writeFileSync(path.join(__dirname,'catalog-asset-dimensions.json'),JSON.stringify(results,null,2));
  console.log(JSON.stringify({assets:results.length,webpBytes:results.reduce((n,x)=>n+x.webpBytes,0)}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
