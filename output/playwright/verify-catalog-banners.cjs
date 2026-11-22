const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const {chromium}=require('../../blockpuzzle/node_modules/playwright');
const root=path.resolve(__dirname,'../..');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'chrome'});
 const context=await browser.newContext({offline:true,viewport:{width:1440,height:1000}});
 const page=await context.newPage();
 const report={errors:[],network:[],assets:[],layouts:[],details:[],checks:{}};
 page.on('pageerror',e=>report.errors.push(e.message));
 page.on('request',r=>{if(/^https?:/.test(r.url()))report.network.push(r.url());});
 const loaded=()=>page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()));});
 try{
  await page.goto(pathToFileURL(path.join(root,'GameLab.html')).href);await loaded();
  report.assets=await page.evaluate(async()=>Promise.all(Object.entries(ASSETS.catalogCovers).flatMap(([id,cover])=>Object.entries(cover).map(async([variant,src])=>{const i=new Image();i.src=src;await i.decode();return{id,variant,width:i.naturalWidth,height:i.naturalHeight};}))));
  assert.equal(report.assets.length,48);
  for(const a of report.assets){assert.equal(a.width,a.variant==='wide'?1600:800);assert.equal(a.height,a.variant==='wide'?870:800);}
  report.checks.uniqueWideCovers=await page.evaluate(()=>new Set(Object.values(ASSETS.catalogCovers).map(x=>x.wide)).size);
  assert.equal(report.checks.uniqueWideCovers,24);
  await page.screenshot({path:path.join(__dirname,'catalog-banners-desktop.png'),fullPage:true});
  while(await page.locator('[data-action="more"]').count())await page.locator('[data-action="more"]').click();
  await loaded();assert.equal(await page.locator('#catalog-grid .catalog-banner').count(),24);
  report.checks.pagination=24;
  report.checks.locked=await page.locator('#catalog-grid [data-status="locked"]').count();assert.equal(report.checks.locked,3);
  await page.locator('#search').fill('Robot');assert.equal(await page.locator('#catalog-grid .game-card').count(),3);
  await page.locator('#clear-search').click();
  await page.locator('[data-course="english"]').click();assert.equal(await page.locator('#catalog-grid .game-card').count(),4);
  await page.locator('[data-course="all"]').click();report.checks.searchAndCourseFilter=true;
  for(const width of [320,390,820,1440,1920]){
   await page.setViewportSize({width,height:1000});
   for(const mode of ['grid','list']){
    await page.locator(`[data-view="${mode}"]`).click();
    await page.evaluate(()=>{limit=games.length;renderCatalog();});await loaded();
    const layout=await page.evaluate(({width,mode})=>({width,mode,overflow:document.documentElement.scrollWidth>innerWidth,cards:[...document.querySelectorAll('#catalog-grid .game-card')].map(c=>{const i=c.querySelector('.catalog-banner'),r=i.getBoundingClientRect();return{id:c.dataset.game,naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight,width:r.width,height:r.height,fit:getComputedStyle(i).objectFit};})}),{width,mode});
    assert.equal(layout.overflow,false);assert.equal(layout.cards.length,24);
    for(const c of layout.cards){assert.equal(c.naturalWidth,mode==='grid'?1600:800);assert.ok(Math.abs(c.width/c.height-(mode==='grid'?1600/870:1))<.02);}
    report.layouts.push(layout);
    if(width===390||width===1440)await page.locator('#catalog-grid').screenshot({path:path.join(__dirname,`catalog-banners-${mode}-${width}.png`)});
   }
  }
  // Unlock prerequisites only in this isolated browser context to inspect every detail cover.
  const ids=await page.evaluate(()=>{for(const g of games)saved.g[g.id]={attempts:1,completed:[...g.levelIds]};return games.map(g=>g.id);});
  for(const width of [320,1440]){
   await page.setViewportSize({width,height:1000});
   for(const id of ids){
    await page.evaluate(id=>detail(id),id);await loaded();
    const d=await page.locator('.dialog-cover .catalog-banner').evaluate(i=>{const r=i.getBoundingClientRect();return{width:r.width,height:r.height,naturalWidth:i.naturalWidth};});
    assert.equal(d.naturalWidth,1600);assert.ok(Math.abs(d.width/d.height-1600/870)<.02);
    report.details.push({id,viewport:width,...d});
    if(id==='fractions'&&width===320)await page.locator('#dialog').screenshot({path:path.join(__dirname,'catalog-banners-detail-mobile.png')});
    await page.evaluate(()=>closeDialog());
   }
  }
  await page.goto(pathToFileURL(path.join(root,'GameLab-all-banners.html')).href);await page.setViewportSize({width:1650,height:1000});await loaded();
  assert.equal(await page.locator('article').count(),27);
  await page.screenshot({path:path.join(root,'GameLab-all-banners-preview.png'),fullPage:true});
  assert.deepEqual(report.errors,[]);assert.deepEqual(report.network,[]);
  report.passed=true;
 }finally{
  fs.writeFileSync(path.join(__dirname,'catalog-banners-verification.json'),JSON.stringify(report,null,2));
  await browser.close();
 }
 console.log(JSON.stringify({passed:report.passed,assets:report.assets.length,layouts:report.layouts.length,detailChecks:report.details.length,errors:report.errors,network:report.network}));
})().catch(e=>{console.error(e);process.exitCode=1;});
