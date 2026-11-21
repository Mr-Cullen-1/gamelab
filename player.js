/* ---------------------------------------------------------------------------
   LESSON PLAYER ("B · O‘yin")
   Full-screen student game screen: segmented progress, 3D buttons, result panel
   that slides up from the bottom. One run = one attempt (GameLab contract):
   onAttemptStart / onAttemptEnd go to the MOCK HOST at the bottom of this file,
   which simulates saveState (saving / queued / saved / error). Nothing is
   restored mid-run (no checkpoint in contract v1).
--------------------------------------------------------------------------- */
Object.assign(iconPaths,{
 book:'<path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v15H5.5C4.7 19 4 18.3 4 17.5Zm16 0c0-.8-.7-1.5-1.5-1.5H13v15h5.5c.8 0 1.5-.7 1.5-1.5Z"/>',
 pencil:'<path d="m4 20 1-4L16.500 4.500a2.100 2.100 0 0 1 3 3L8 19Zm9-13 3 3"/>',
 bulb:'<path d="M9 18h6m-5 3h4M12 3a6 6 0 0 0-3.500 10.900c.6.500 1 1.200 1 2.100h5c0-.9.400-1.600 1-2.100A6 6 0 0 0 12 3Z"/>',
 volume:'<path d="M4 9.500v5h3.500L12 18.500v-13L7.500 9.500Zm10 0a4 4 0 0 1 0 5m2.500-7.500a7.500 7.500 0 0 1 0 10"/>',
 'volume-off':'<path d="M4 9.500v5h3.500L12 18.500v-13L7.500 9.500Zm10.500 1 5 5m0-5-5 5"/>',
 back:'<path d="M20 12H4m6-6-6 6 6 6"/>',
 smile:'<circle cx="12" cy="12" r="9"/><path d="M8.500 14.500a4.500 4.500 0 0 0 7 0M9 9.500h.01M15 9.500h.01"/>',
 meh:'<circle cx="12" cy="12" r="9"/><path d="M8.500 15.500h7M9 9.500h.01M15 9.500h.01"/>',
 spark:'<path d="m12 3 2.200 6.300L21 12l-6.800 2.700L12 21l-2.200-6.300L3 12l6.800-2.700Z"/>',
 tray:'<path d="M4 13.500 6.500 5h11L20 13.500M4 13.500V19h16v-5.500M4 13.500h4.500a3.500 3.500 0 0 0 7 0H20"/>',
 moon:'<path d="M20 14.500A8 8 0 0 1 9.500 4 8 8 0 1 0 20 14.500Z"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2.500v2.500m0 14v2.500M2.500 12H5m14 0h2.500M5.300 5.300l1.800 1.800m9.800 9.800 1.800 1.800m0-13.400-1.800 1.800M7.100 16.900l-1.800 1.800"/>',
 bolt:'<path d="M13 3 5 13.500h6L10 21l9-11h-6Z"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
 shield:'<path d="M12 3 5 6v6c0 4.500 3 7.500 7 9 4-1.500 7-4.500 7-9V6Z"/><path d="m9 12 2.200 2.200L15.500 10"/>',
 words:'<path d="M4 18 9 6l5 12M5.800 14h6.400M16 18l2.500-6 2.500 6m-4.200-2h3.400"/>',
 robot:'<rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 8V4.500M9 13h.01M15 13h.01M9.500 16.500h5M3 13v3m18-3v3"/>',
 code:'<path d="m8 8-4 4 4 4m8-8 4 4-4 4m-2.500-10-3 12"/>',
 computer:'<rect x="3" y="4" width="18" height="12" rx="2.500"/><path d="M8 20h8m-4-4v4"/>',
 puzzle:'<path d="M10 4h4v3a1.500 1.500 0 1 0 3 0V4h3v6h-3a1.500 1.500 0 1 0 0 3h3v7H4v-6h3a1.500 1.500 0 1 0 0-3H4V4Z"/>'
});
const PL_DONE=LESSON_STEPS-1;
let play=null,audioCtx=null;
const plEl=()=>$('#player');
function plTone(kind){
 if(saved.muted)return;
 try{
  audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();
  const seq={ok:[[523,0],[659,.09]],bad:[[220,0],[196,.1]],done:[[523,0],[659,.1],[784,.2],[1047,.3]],tap:[[440,0]]}[kind]||[];
  const t0=audioCtx.currentTime;
  for(const [f,d] of seq){const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(.0001,t0+d);g.gain.exponentialRampToValueAtTime(kind==='tap'?.04:.09,t0+d+.02);g.gain.exponentialRampToValueAtTime(.0001,t0+d+.18);o.connect(g).connect(audioCtx.destination);o.start(t0+d);o.stop(t0+d+.2)}
 }catch{}
}
const LESSON_ART={
 sunearth:`<svg viewBox="0 0 190 100" aria-hidden="true"><g stroke="#FA4F28" stroke-width="5" stroke-linecap="round"><path d="M40 6v8M40 70v8M4 42h8M68 42h8M14 16l6 6M60 62l6 6M66 16l-6 6M20 62l-6 6"/></g><circle cx="40" cy="42" r="21" fill="#FA4F28"/><path d="M70 36C102 6 130 8 158 40" fill="none" stroke="#A9A6D3" stroke-width="2" stroke-dasharray="3 5" stroke-linecap="round"/><circle cx="160" cy="44" r="10" fill="#2F7CF6"/><path d="M155 40c4-4 9-3 11 1-3 4-8 4-11-1Zm1 8c3-1 6 0 7 3-3 1-6 0-7-3Z" fill="#2FA84F"/></svg>`,
 words:`<svg viewBox="0 0 190 100" aria-hidden="true"><g transform="rotate(-10 55 50)"><rect x="18" y="14" width="64" height="70" rx="14" fill="#fff" stroke="#E4E3EE" stroke-width="3"/><text x="50" y="66" text-anchor="middle" font-size="50" font-weight="800" fill="#FA4F28" font-family="Nunito,Arial">A</text></g><g transform="rotate(9 130 52)"><rect x="98" y="22" width="58" height="62" rx="13" fill="#6C47FF"/><text x="127" y="68" text-anchor="middle" font-size="46" font-weight="800" fill="#fff" font-family="Nunito,Arial">a</text></g></svg>`,
 code:`<svg viewBox="0 0 190 100" aria-hidden="true"><rect x="22" y="12" width="146" height="76" rx="12" fill="#1E1B39"/><circle cx="38" cy="26" r="4" fill="#FA4F28"/><circle cx="52" cy="26" r="4" fill="#FFB020"/><circle cx="66" cy="26" r="4" fill="#2FA84F"/><path d="m60 52-14 12 14 12m70-24 14 12-14 12m-26-32-14 40" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" transform="translate(-0 -2) scale(.9) translate(10 8)"/></svg>`,
 shield:`<svg viewBox="0 0 190 100" aria-hidden="true"><path d="m95 8 40 15v30c-2 26-18 38-40 45-22-7-38-19-40-45V23Z" fill="#6C47FF"/><path d="m95 20 29 11v22c-2 18-12 26-29 32-17-6-27-14-29-32V31Z" fill="#8466FF"/><path d="m80 53 11 11 22-25" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};
function plArt(name){
 if(LESSON_ART[name])return LESSON_ART[name];
 const asset={robot:'robotWave',puzzle:'puzzle'}[name];
 return asset?`<img src="${ASSETS[asset]}" alt="" style="height:96px;width:auto">`:'';
}
const fmtN=s=>String(s).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
function plTag(i,s){
 if(s.t==='intro')return ['book','Dars savoli','learn'];
 if(s.tag==='Eslaymiz')return ['book','Eslaymiz','learn'];
 const m=MASHQ_OF_STEP[i];return m?['pencil',`Mashq ${m} / 6`,'drill']:['book','Dars','learn'];
}
const uuid=()=>typeof crypto!=='undefined'&&crypto.randomUUID?crypto.randomUUID():'a'+Date.now().toString(16)+Math.random().toString(16).slice(2);
function plNewAttempt(){
 play.attemptId=uuid();play.startedAt=new Date().toISOString();play.activeMs=0;play.runningSince=document.hidden?null:performance.now();play.ended=false;
 hostStart({attemptId:play.attemptId,gameId:play.g.id,modeId:'default',levelId:play.levelId,startedAt:play.startedAt});
}
function startGame(id,levelId){
 const g=games.find(x=>x.id===id);if(!g||isLocked(g))return;
 const lvl=g.kind==='level'?(g.levelIds.includes(levelId)?levelId:(g.levelIds.find(l=>!sc(g).completed.includes(l))||g.levelIds[0])):null;
 play={g,lesson:lessons[g.course],levelId:lvl,step:0,miss:Array(LESSON_STEPS).fill(false),phase:'answer',st:{},returnTo:document.activeElement};
 plNewAttempt();
 const d=plEl();if(!d.open)d.showModal();plRender();
}
function plScore(){const groups=[...new Set(MASHQ_OF_STEP.filter(Boolean))];return groups.filter(m=>!MASHQ_OF_STEP.some((x,i)=>x===m&&play.miss[i])).length}
function plEnd(outcome){
 if(!play||play.ended)return;play.ended=true;
 if(play.runningSince!==null){play.activeMs+=performance.now()-play.runningSince;play.runningSince=null}
 const done=outcome!=='aborted',misses=play.miss.filter(Boolean).length;
 hostEnd({attemptId:play.attemptId,outcome,reason:done?null:'player_exit',endedAt:new Date().toISOString(),durationSeconds:Number((play.activeMs/1000).toFixed(3)),metrics:done?{steps:LESSON_STEPS,firstTryGroups:plScore(),mistakes:misses}:{steps:play.step,mistakes:misses},data:null});
}
function plStepInit(s){
 return ({intro:{sel:null},choice:{sel:null,wrong:[]},build:{cuts:[]},input:{val:''},match:{sel:null,done:[],flash:null},sort:{i:0,sel:null,placed:[null,null],wrong:false},summary:{}})[s.t];
}
function plRender(){
 const {g,lesson,step}=play,s=lesson.steps[step];
 play.phase='answer';play.st=plStepInit(s);
 const segs=Array.from({length:LESSON_STEPS},(_,i)=>`<span class="${i<step?'done':i===step?'cur':''}"></span>`).join('');
 plEl().innerHTML=`<div class="pl-shell" data-type="${s.t}"><header class="pl-top"><button class="pl-icon" data-pl="close" aria-label="Darsni yopish">${icon('x')}</button><div class="pl-seg" role="progressbar" aria-label="Dars bosqichlari" aria-valuemin="1" aria-valuemax="${LESSON_STEPS}" aria-valuenow="${step+1}">${segs}</div><span class="pl-count"><span class="pl-lv">${play.levelId?play.g.levelIds.indexOf(play.levelId)+1+'-daraja · ':''}</span>${step+1}/${LESSON_STEPS}</span><button class="pl-icon" data-pl="sound" aria-label="${saved.muted?'Ovozni yoqish':'Ovozni o‘chirish'}" aria-pressed="${!!saved.muted}">${icon(saved.muted?'volume-off':'volume')}</button></header><div class="pl-save" id="pl-save" role="status" aria-live="polite" hidden></div><main class="pl-main" id="pl-main"><div class="pl-content" id="pl-content">${plBody(s)}</div></main><footer class="pl-foot" id="pl-foot"></footer></div>`;
 plFoot();plAfterRender(s);plSaveBar();
 $('#pl-main').scrollTop=0;
}
function plHead(s){
 const [ic,label,kind]=plTag(play.step,s);
 return `<span class="pl-tag ${kind}">${icon(ic)}${label}</span>`;
}
function plBody(s){
 const t=s.t,st=play.st;
 if(t==='intro')return `${plHead(s)}<h2 class="pl-title">${esc(s.q)}</h2><div class="pl-stage"><div class="pl-art">${plArt(s.art)}</div><div class="pl-big"><strong>${esc(s.big)}</strong><span class="pl-unit">${esc(s.unit)}</span></div></div><p class="pl-ask">${esc(s.ask)}</p><div class="pl-assess" role="group" aria-label="${esc(s.ask)}">${ASSESS.map(([ic,label],i)=>`<button class="pl-card assess a${i}" data-pl="assess" data-i="${i}" aria-pressed="false"><span class="pl-face">${icon(ic)}</span><b>${label}</b></button>`).join('')}</div>`;
 if(t==='choice')return `${plHead(s)}${s.note?`<p class="pl-note">${esc(s.note)}</p>`:''}<h2 class="pl-title">${esc(s.q)}</h2>${s.sub?`<p class="pl-sub">${esc(s.sub)}</p>`:''}${s.digits?`<div class="pl-digits" aria-label="${esc(fmtN(s.digits))}">${[...s.digits].map((d,i)=>`<span class="${i===s.hi?'hi':''}">${d}</span>`).join('')}</div>`:''}<div class="pl-opts" role="group" aria-label="Javob variantlari">${s.opts.map((o,i)=>`<button class="pl-opt" data-pl="opt" data-i="${i}" aria-pressed="false"><span class="pl-letter">${'ABCD'[i]}</span><span class="pl-opt-text">${esc(o)}</span></button>`).join('')}</div>`;
 if(t==='build')return `${plHead(s)}<h2 class="pl-title">${esc(s.q)}</h2><p class="pl-sub">${icon(s.icon)}${esc(s.sub)}</p><div class="pl-panel-card"><div class="pl-build" id="pl-build">${buildHTML(s)}</div><p class="pl-help">+ tugmasini bosib, bo‘shliq qo‘ying</p></div>`;
 if(t==='input')return `${plHead(s)}<h2 class="pl-title">${esc(s.q)}</h2><p class="pl-sub">${icon(s.icon)}${esc(s.sub)}</p><div class="pl-panel-card">${s.text?`<label class="pl-textwrap"><span class="sr-only">${esc(s.q)}</span><input class="pl-text" id="pl-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${esc(s.ph||'')}"></label>`:`<label class="pl-slots-wrap"><span class="sr-only">${esc(s.q)}</span><input class="pl-hidden" id="pl-input" inputmode="numeric" autocomplete="off" maxlength="${s.answer.length}"><div class="pl-slots" id="pl-slots">${slotsHTML(s)}</div></label>`}</div>`;
 if(t==='match'){
  return `${plHead(s)}<h2 class="pl-title">${esc(s.q)}</h2><p class="pl-sub">${esc(s.sub)}</p><div class="pl-match"><div class="pl-col" id="pl-mleft"><p class="pl-colhead">Sonlar</p>${s.left.map((l,i)=>`<button class="pl-mitem" data-pl="mleft" data-i="${i}"><b>${esc(l[0])}</b><small>${icon(l[2])}${esc(l[1])}</small><i class="pl-badge" hidden></i></button>`).join('')}</div><div class="pl-col" id="pl-mright"><p class="pl-colhead" id="pl-rhead">Tanlang</p>${s.right.map((r,j)=>`<button class="pl-mopt" data-pl="mright" data-j="${j}"><span>${esc(r)}</span><i class="pl-badge" hidden></i></button>`).join('')}</div></div>`;
 }
 if(t==='sort')return `${plHead(s)}<h2 class="pl-title">${esc(s.q)}</h2><p class="pl-sub">${esc(s.sub)}</p><div id="pl-sort">${sortHTML(s)}</div>`;
 if(t==='summary'){
  const groups=[...new Set(MASHQ_OF_STEP.filter(Boolean))];
  const score=plScore();
  play.score=score;
  return `<div class="pl-win"><span class="pl-trophy">${icon(s.icon)}</span><h2 class="pl-title">${esc(s.title)}</h2></div><div class="pl-score"><div><b>${score}</b><span> / ${groups.length}</span><div class="pl-checks">${groups.map((m,i)=>`<i class="${i<score?'on':''}">${i<score?icon('check'):''}</i>`).join('')}</div></div><p>savolga birinchi urinishda to‘g‘ri javob</p></div><p class="pl-colhead" style="margin-top:18px">Asosiysi</p><div class="pl-keys">${s.key.map((k,i)=>`<div class="pl-key"><b>${i+1}</b><p>${esc(k)}</p></div>`).join('')}</div><div class="pl-bottomrow"><div class="pl-fact">${icon(s.factIcon)}<p>${esc(s.fact)}</p></div><div class="pl-next"><p><small>Tayanadi:</small> ${esc(s.from)}</p><span>${icon('arrow')}</span><p><small>Keyingi:</small> ${esc(s.next)}</p></div></div>`;
 }
 return '';
}
function buildHTML(s){
 const d=[...s.n],cuts=play.st.cuts;
 return d.map((ch,i)=>`<span class="pl-tile">${ch}</span>${i<d.length-1?`<button class="pl-cut ${cuts.includes(i+1)?'on':''}" data-pl="cut" data-i="${i+1}" aria-pressed="${cuts.includes(i+1)}" aria-label="${i+1}-raqamdan keyin bo‘shliq"><span>${cuts.includes(i+1)?'':'+'}</span></button>`:''}`).join('');
}
function slotGroups(s){return s.groups||[['',s.answer.length]]}
function slotsHTML(s){
 const val=play.st.val;let k=0;
 return slotGroups(s).map(([label,n])=>`<div class="pl-sg"><div class="pl-sg-row">${Array.from({length:n},()=>{const i=k++,filled=i<val.length;return `<span class="pl-slot ${filled?'full':''} ${i===val.length?'cur':''}">${filled?val[i]:''}</span>`}).join('')}</div>${label?`<span class="pl-chip">${label}</span>`:''}</div>`).join('');
}
function sortHTML(s){
 const st=play.st,done=st.i>=s.items.length,item=s.items[Math.min(st.i,s.items.length-1)];
 const dots=s.items.map((_,i)=>`<i class="${i<st.i?'ok':i===st.i?(st.wrong?'bad':'cur'):''}"></i>`).join('');
 return `<div class="pl-sortcard"><div class="pl-dots">${dots}</div><strong>${esc(item[0])}</strong></div><div class="pl-baskets">${s.baskets.map((b,k)=>`<button class="pl-basket ${st.sel===k?'sel':''} ${st.wrong&&st.sel===k?'bad':''}" data-pl="basket" data-k="${k}" aria-pressed="${st.sel===k}"><span class="pl-basket-title">${icon('tray')}${esc(b)}</span>${st.placed[k]?`<span class="pl-chip ok">${esc(st.placed[k])}</span>`:''}</button>`).join('')}</div>`;
}
function plAfterRender(s){
 const inp=$('#pl-input');
 if(inp){
  inp.addEventListener('input',()=>{
   if(s.text){play.st.val=inp.value}
   else{inp.value=inp.value.replace(/\D/g,'').slice(0,s.answer.length);play.st.val=inp.value;$('#pl-slots').innerHTML=slotsHTML(s)}
   plFoot();
  });
  setTimeout(()=>inp.focus({preventScroll:true}),30);
 }
}
/* ---------- footer: Orqaga | primary, or the result panel ---------- */
function plReady(s){
 const st=play.st;
 if(s.t==='intro')return st.sel!==null;
 if(s.t==='choice')return st.sel!==null;
 if(s.t==='build')return st.cuts.length>0;
 if(s.t==='input')return s.text?st.val.trim().length>0:st.val.length===s.answer.length;
 if(s.t==='match')return st.done.length===s.left.length;
 if(s.t==='sort')return st.sel!==null;
 return true;
}
function plFoot(msg){
 const {lesson,step}=play,s=lesson.steps[step],foot=$('#pl-foot');
 if(play.phase==='bad'||play.phase==='ok'){
  const bad=play.phase==='bad';
  foot.className='pl-foot panel '+(bad?'bad':'ok');
  foot.innerHTML=`<div class="pl-panel-inner"><span class="pl-panel-icon">${icon(bad?'bulb':'check')}</span><div class="pl-panel-text" role="status"><h3>${bad?'Maslahat':'Barakalla!'}</h3><p>${esc(String(play.msg).replace(/^Barakalla!\s*/,''))}</p></div><button class="pl-btn ${bad?'coral':'good'}" data-pl="${bad?'retry':'next'}" id="pl-primary">${bad?'Qayta urinish':'Davom etish'}</button></div>`;
  $('#pl-primary').focus({preventScroll:true});return;
 }
 foot.className='pl-foot';
 if(s.t==='summary'){
  foot.className='pl-foot summary';
  foot.innerHTML=`<button class="pl-btn ghost" data-pl="back">${icon('back')}Orqaga</button><span class="pl-spacer"></span><button class="pl-btn ghost" data-pl="again">${icon('replay')}Qaytadan o‘tish</button><button class="pl-btn primary" data-pl="finish" id="pl-primary">Darsni tugatish</button>`;return;
 }
 const label=s.t==='intro'?'Davom etish':'Tekshirish',act=s.t==='intro'?'next':'check';
 foot.innerHTML=`${step>0?`<button class="pl-btn ghost" data-pl="back">${icon('back')}Orqaga</button>`:'<span></span>'}<button class="pl-btn primary" data-pl="${act}" id="pl-primary" ${plReady(s)?'':'disabled'}>${label}</button>`;
}
/* ---------- evaluation ---------- */
function plShow(ok,msg){play.phase=ok?'ok':'bad';play.msg=msg;if(!ok)play.miss[play.step]=true;plTone(ok?'ok':'bad');plFoot()}
function plCheck(){
 const {lesson,step}=play,s=lesson.steps[step],st=play.st;
 if(!plReady(s))return;
 if(s.t==='choice'){
  const ok=st.sel===s.a;const opts=$$('.pl-opt');
  if(ok){opts.forEach((b,i)=>{b.disabled=true;b.classList.toggle('right',i===s.a);b.classList.toggle('dim',i!==s.a)});opts[s.a].querySelector('.pl-letter').outerHTML=`<span class="pl-mark">${icon('check')}</span>`;plShow(true,s.ok)}
  else{st.wrong.push(st.sel);const b=opts[st.sel];b.classList.add('wrongopt');b.disabled=true;b.querySelector('.pl-letter').outerHTML=`<span class="pl-mark bad">${icon('x')}</span>`;plShow(false,(s.hints&&s.hints[st.sel])||s.hint)}
 }else if(s.t==='build'){
  const ok=JSON.stringify([...st.cuts].sort((a,b)=>a-b))===JSON.stringify(s.cuts);
  $('#pl-build').classList.add(ok?'right':'wrongrow');plShow(ok,ok?s.ok:s.hint);
 }else if(s.t==='input'){
  const v=st.val.trim().toLocaleLowerCase();const ok=s.text?s.answer.some(a=>a.toLocaleLowerCase()===v):v===s.answer;
  const box=$('#pl-slots')||$('.pl-textwrap');box.classList.add(ok?'right':'wrongrow');$('#pl-input').readOnly=true;plShow(ok,ok?s.ok:s.hint);
 }else if(s.t==='match'){plShow(true,s.ok)}
 else if(s.t==='sort'){
  const item=s.items[st.i],ok=st.sel===item[1];
  if(ok){st.placed[item[1]]=item[0];st.wrong=false;plShow(true,st.i===s.items.length-1?s.ok:'To‘g‘ri! Keyingi sonni ko‘ramiz.')}
  else{st.wrong=true;$('#pl-sort').innerHTML=sortHTML(s);plShow(false,s.hint)}
 }
}
function plRetry(){
 const s=play.lesson.steps[play.step],st=play.st;play.phase='answer';
 if(s.t==='choice'){st.sel=null}
 if(s.t==='build'){$('#pl-build').classList.remove('wrongrow')}
 if(s.t==='input'){const b=$('#pl-slots')||$('.pl-textwrap');b.classList.remove('wrongrow');const i=$('#pl-input');i.readOnly=false;i.value='';st.val='';if(!s.text)$('#pl-slots').innerHTML=slotsHTML(s);i.focus({preventScroll:true})}
 if(s.t==='sort'){st.wrong=false;st.sel=null;$('#pl-sort').innerHTML=sortHTML(s)}
 plFoot();
}
function plNext(){
 const {lesson,step}=play,s=lesson.steps[step];
 if(s.t==='sort'&&play.phase==='ok'&&play.st.i<s.items.length-1){const st=play.st;st.i++;st.sel=null;st.wrong=false;play.phase='answer';$('#pl-sort').innerHTML=sortHTML(s);plFoot();return}
 if(s.t==='summary')return;
 play.step=Math.min(step+1,PL_DONE);
 if(play.step===PL_DONE&&!play.ended)plEnd(play.g.kind==='level'?'success':'finished');
 plRender();
}
function plBack(){if(play.step>0){play.step--;plRender()}}
function plClose(){
 if(!play)return;
 const back=play.returnTo,wasEnded=play.ended,title=play.g.title;
 if(!wasEnded)plEnd('aborted');
 const end=hostRec(play.attemptId).end.status;
 play=null;plEl().close();plEl().innerHTML='';renderSections();
 toast(!wasEnded?'Urinish to‘xtatildi va qayd etildi. Keyingi safar o‘yin boshidan boshlanadi.':end==='saved'?`“${title}” natijasi saqlandi.`:'Natija hali saqlanmadi. Uni o‘yin tafsilotlaridan qayta yuborish mumkin.');
 (back?.isConnected?back:$('#catalog'))?.focus?.({preventScroll:true});
}
/* ---------- events ---------- */
document.addEventListener('click',e=>{
 const b=e.target.closest('#player [data-pl]');if(!b||!play||b.disabled)return;
 const a=b.dataset.pl,s=play.lesson.steps[play.step],st=play.st;
 if(a==='close')return plClose();
 if(a==='sound'){saved.muted=!saved.muted;save();b.innerHTML=icon(saved.muted?'volume-off':'volume');b.setAttribute('aria-pressed',String(!!saved.muted));b.setAttribute('aria-label',saved.muted?'Ovozni yoqish':'Ovozni o‘chirish');plTone('tap');return}
 if(a==='back')return plBack();
 if(a==='next')return plNext();
 if(a==='check')return plCheck();
 if(a==='retry')return plRetry();
 if(a==='again'){play.step=0;play.miss.fill(false);plNewAttempt();return plRender()}
 if(a==='finish')return plClose();
 if(a==='retry-save'){if(b.dataset.id==='all'){for(const [id,x] of Object.entries(host.attempts))if(id!==play.attemptId&&unsaved(x))hostRetry(id)}else hostRetry(b.dataset.id);return}
 if(play.phase!=='answer')return;
 if(a==='assess'){st.sel=Number(b.dataset.i);$$('.pl-card.assess').forEach((x,i)=>{x.classList.toggle('sel',i===st.sel);x.setAttribute('aria-pressed',String(i===st.sel))});plTone('tap');plFoot();return}
 if(a==='opt'){st.sel=Number(b.dataset.i);$$('.pl-opt').forEach((x,i)=>{x.classList.toggle('sel',i===st.sel);x.setAttribute('aria-pressed',String(i===st.sel))});plTone('tap');plFoot();return}
 if(a==='cut'){const i=Number(b.dataset.i);st.cuts=st.cuts.includes(i)?st.cuts.filter(x=>x!==i):[...st.cuts,i];$('#pl-build').innerHTML=buildHTML(s);plTone('tap');plFoot();$(`.pl-cut[data-i="${i}"]`)?.focus({preventScroll:true});return}
 if(a==='basket'){st.sel=Number(b.dataset.k);$('#pl-sort').innerHTML=sortHTML(s);plTone('tap');plFoot();$(`.pl-basket[data-k="${st.sel}"]`)?.focus({preventScroll:true});return}
 if(a==='mleft'){const i=Number(b.dataset.i);if(st.done.some(d=>d[0]===i))return;st.sel=i;$$('.pl-mitem').forEach(x=>x.classList.toggle('sel',Number(x.dataset.i)===i));$('#pl-rhead').innerHTML=`O‘qilishi · <b>${esc(s.left[i][0])} uchun tanlang</b>`;plTone('tap');return}
 if(a==='mright'){
  const j=Number(b.dataset.j);if(st.done.some(d=>d[1]===j))return;
  if(st.sel===null){const h=$('#pl-rhead');h.textContent='Avval chapdagi sonni tanlang';return}
  if(s.pairs[st.sel]===j){
   st.done.push([st.sel,j]);const n=st.done.length;const L=$(`.pl-mitem[data-i="${st.sel}"]`);[L,b].forEach(x=>{x.classList.add('right');x.classList.remove('sel');const bd=x.querySelector('.pl-badge');bd.hidden=false;bd.textContent=n;x.disabled=true});
   st.sel=null;$('#pl-rhead').textContent=st.done.length===s.left.length?'Hammasi moslandi':'Tanlang';plTone('ok');plFoot();
  }else{play.miss[play.step]=true;b.classList.add('wrongopt');plTone('bad');setTimeout(()=>b.classList.remove('wrongopt'),600)}
 }
});
document.addEventListener('keydown',e=>{
 if(!play)return;
 if(e.key==='Enter'&&!e.isComposing){const p=$('#pl-primary');const f=document.activeElement;if(p&&!p.disabled&&(f?.tagName!=='BUTTON'||f.matches('[aria-pressed="true"]'))){e.preventDefault();p.click()}}
});
plEl().addEventListener('cancel',e=>{e.preventDefault();plClose()});

/* ---------------------------------------------------------------------------
   MOCK HOST (preview only) — simulates what the platform does with the two
   callbacks. Real GameLab runtime owns this; the JSX only reads `saveState`.
   Modes (prototype menu): ok | offline (→ queued) | fail (→ error).
--------------------------------------------------------------------------- */
const host={attempts:{},mode:'ok',n:0};
const SAVE_MODES={ok:'normal',offline:'internet yo‘q (navbat)',fail:'server xatosi'};
const SAVE_UZ={idle:'hali saqlanmagan',saving:'saqlanmoqda…',queued:'yuborish kutilmoqda',saved:'saqlandi',error:'saqlanmadi'};
function hostRec(id){return host.attempts[id]||(host.attempts[id]={gameId:null,start:{status:'idle',errorCode:null},end:{status:'idle',errorCode:null},startPayload:null,result:null,counted:false,applied:false,order:++host.n})}
function hostSet(id,op,status,errorCode=null){hostRec(id)[op]={status,errorCode};hostChanged()}
function hostStart(p){const r=hostRec(p.attemptId);r.gameId=p.gameId;r.startPayload=p;hostSend(p.attemptId,'start')}
function hostEnd(res){const r=hostRec(res.attemptId);r.result=res;hostSend(res.attemptId,'end')}
function unsaved(r){return ['error','queued'].includes(r.start.status)||(!!r.result&&['error','queued'].includes(r.end.status))}
function hostSend(id,op){
 const r=hostRec(id);
 if(op==='end'){
  if(r.start.status==='error'){hostSet(id,'end','error','START_NOT_SAVED');return}
  if(r.start.status!=='saved'){hostSet(id,'end','queued','WAITING_START');return}
 }
 hostSet(id,op,'saving');
 setTimeout(()=>{
  if(host.mode==='ok'){
   hostSet(id,op,'saved');hostApply(id,op);
   if(op==='start'&&r.result&&['queued','error','idle'].includes(r.end.status))hostSend(id,'end');
  }else if(host.mode==='offline')hostSet(id,op,'queued','OFFLINE');
  else{hostSet(id,op,'error','SERVER');if(op==='start'&&r.result)hostSet(id,'end','error','START_NOT_SAVED')}
 },420);
}
function hostApply(id,op){
 const r=host.attempts[id],g=games.find(x=>x.id===r.gameId);if(!g)return;
 const s=saved.g[g.id]=saved.g[g.id]||{attempts:0,completed:[]};
 if(op==='start'&&!r.counted){r.counted=true;s.attempts+=1;s.lastAt=Date.now()}
 if(op==='end'&&r.result&&!r.applied){
  r.applied=true;const res={...r.result,startedAt:r.startPayload.startedAt};s.last=res;
  if(res.outcome==='success'&&r.startPayload.levelId&&!s.completed.includes(r.startPayload.levelId))s.completed.push(r.startPayload.levelId);
  if(['success','finished'].includes(res.outcome)&&(!s.best||betterResult(res,s.best)))s.best=res;
 }
 save();renderSections();
}
function betterResult(a,b){const x=a.metrics.firstTryGroups,y=b.metrics.firstTryGroups;return x!==y?x>y:a.durationSeconds<b.durationSeconds}
function hostRetry(id){
 const r=host.attempts[id];if(!r)return;
 if(['error','queued'].includes(r.start.status))hostSend(id,'start');
 else if(r.result&&['error','queued','idle'].includes(r.end.status))hostSend(id,'end');
}
function setSaveMode(m){
 host.mode=m;toast('Saqlash rejimi: '+SAVE_MODES[m]+'.');
 if(m==='ok')for(const [id,r] of Object.entries(host.attempts)){if(r.start.status==='queued')hostSend(id,'start');else if(r.start.status==='saved'&&r.result&&r.end.status==='queued')hostSend(id,'end')}
}
function hostReset(){host.attempts={};host.n=0}
function hostChanged(){
 if(typeof play!=='undefined'&&play)plSaveBar();
 const pl=$('#pending-list');if(pl)pl.innerHTML=pendingHTML(pl.dataset.game);
}
function pendingHTML(gameId){
 const items=Object.entries(host.attempts).filter(([,r])=>r.gameId===gameId&&unsaved(r));
 if(!items.length)return '';
 return '<p class="pl-colhead">Saqlanmagan natijalar</p>'+items.map(([id,r])=>{
  const t=new Date(r.startPayload.startedAt).toLocaleTimeString('uz',{hour:'2-digit',minute:'2-digit'});
  const part=r.start.status!=='saved'?'boshlanish':'natija',st=r.start.status!=='saved'?r.start.status:r.end.status;
  return `<div class="pending-item"><span>Urinish ${t} — ${part} ${SAVE_UZ[st]}</span><button class="secondary" data-retry="${id}">Qayta yuborish</button></div>`}).join('');
}
function plSaveBar(){
 const el=$('#pl-save');if(!el||!play)return;
 const r=hostRec(play.attemptId),chips=[];
 const chip=(cls,ic,text,id)=>`<span class="pl-sv ${cls}">${icon(ic)}${text}${id?`<button data-pl="retry-save" data-id="${id}">Qayta yuborish</button>`:''}</span>`;
 const st=play.ended?r.end.status:r.start.status,lab=play.ended?'Natija':'Boshlanish';
 if(play.ended||st!=='saved'){
  if(st==='saving'||st==='idle')chips.push(chip('saving','clock',lab+' saqlanmoqda…'));
  else if(st==='queued')chips.push(chip('queued','clock',lab+': yuborish kutilmoqda'));
  else if(st==='saved')chips.push(chip('saved','check','Natija saqlandi'));
  else chips.push(chip('error','alert',lab+' saqlanmadi',play.attemptId));
 }
 const others=Object.entries(host.attempts).filter(([id,x])=>id!==play.attemptId&&x.gameId&&unsaved(x));
 if(others.length)chips.push(chip('error','alert','Oldingi urinishlar: '+others.length+' ta natija saqlanmagan','all'));
 el.innerHTML=chips.join('');el.hidden=!chips.length;
}
document.addEventListener('visibilitychange',()=>{
 if(!play||play.ended)return;const now=performance.now();
 if(document.hidden){if(play.runningSince!==null){play.activeMs+=now-play.runningSince;play.runningSince=null}}
 else if(play.runningSince===null)play.runningSince=now;
});
