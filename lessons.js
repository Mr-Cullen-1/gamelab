/* ---------------------------------------------------------------------------
   LESSON CONTENT (demo)
   Every game plays a 15-step lesson. Structure is the same for all courses:
     1        intro   — "Dars savoli" + self-assessment (no right answer)
     2–4      choice  — "Eslaymiz" (review)
     5–14     "Mashq 1/6 … 6/6" (exercise groups: 3+2+2+1+1+1 steps)
     15       summary — result, key rules, "Tayanadi / Keyingi"
   Step types: intro | choice | build | input | match | sort | summary.
   Replace this file with an LMS response of the same shape.
--------------------------------------------------------------------------- */
const LESSON_STEPS=15;
// Exercise group of every step (index 4…13 → 1…6). Steps 0–3 and 14 are outside the exercise groups.
const MASHQ_OF_STEP=[null,null,null,null,1,1,1,2,2,3,3,4,5,6,null];
const ASSESS=[['smile','Bemalol bilaman'],['meh','Hozircha qiyin'],['spark','O‘rganmoqchiman']];
const ch=(q,opts,a,hint,ok,x={})=>({t:'choice',q,opts,a,hint,ok,...x});
const rev=(note,q,opts,a,hint,ok,x={})=>ch(q,opts,a,hint,ok,{tag:'Eslaymiz',note,...x});
const inp=(q,sub,icon,answer,hint,ok,x={})=>({t:'input',q,sub,icon,answer,hint,ok,...x});
const mtc=(q,sub,left,right,pairs,hint,ok)=>({t:'match',q,sub,left,right,pairs,hint,ok}); // pairs[i] = index in `right` for left[i]
const srt=(q,sub,baskets,items,hint,ok)=>({t:'sort',q,sub,baskets,items,hint,ok});

const lessons={
 math:{title:'Katta sonlarni o‘qish',steps:[
  {t:'intro',q:'Atrofimizdagi katta sonlarni qanday o‘qiymiz?',art:'sunearth',big:'149 600 000',unit:'km',ask:'Bu sonni o‘qiy olasizmi?'},
  rev('Avval boshlang‘ich sinfdagi xonalarni eslaymiz.','2 658 sonida 6 raqami qaysi xonada turibdi…',['minglar','birlar','yuzlar','o‘nlar'],2,'Birlar — eng o‘ngdagi xona, u yerda sakkiz turibdi. Xonalarni o‘ngdan chapga sanang.','To‘g‘ri. 2 658 — bu 2 mingta, 6 yuzta, 5 o‘nta, 8 birta. Xona raqamning qiymatini ko‘rsatadi.',{digits:'2658',hi:1,hints:{1:'Birlar — eng o‘ngdagi xona, u yerda sakkiz turibdi. Xonalarni o‘ngdan chapga sanang.'}}),
  rev('Beshta raqam bor. Eng chapdagisi eng katta xonada turadi.','45 307 sonida 4 raqami qaysi xonada turibdi?',['minglar','yuzlar','o‘n minglar','o‘nlar'],2,'Raqamlarni o‘ngdan sanang: birlar, o‘nlar, yuzlar, minglar, o‘n minglar.','To‘g‘ri. 4 — o‘n minglar xonasida, ya’ni 40 000.',{digits:'45307',hi:0}),
  rev('Xonalar tugagach, yangi guruh boshlanadi.','999 dan keyin qaysi son keladi?',['990','1 009','9 999','1 000'],3,'999 ga bir qo‘shing. Uchta xona to‘ldi, endi minglar xonasi ochiladi.','To‘g‘ri. 999 + 1 = 1 000. Shu yerdan minglar sinfi boshlanadi.'),
  {t:'build',q:'Bo‘shliqlarni qo‘ying',sub:'Yerdan Oygacha masofa, km.',icon:'moon',n:'384400',cuts:[3],hint:'Raqamlarni o‘ngdan chapga uchtadan guruhlang: 384 | 400.',ok:'Barakalla! 384 400 — uchtadan guruhlangan: 384 ming 400.'},
  {t:'build',q:'Bo‘shliqlarni qo‘ying',sub:'Quyosh diametri, km.',icon:'sun',n:'1392000',cuts:[1,4],hint:'O‘ngdan uchtadan ajrating: 000, 392, qolgani — 1.',ok:'Barakalla! 1 392 000 — bir million uch yuz to‘qson ikki ming.'},
  {t:'build',q:'Bo‘shliqlarni qo‘ying',sub:'Yer diametri, km.',icon:'globe',n:'12742',cuts:[2],hint:'O‘ngdan uchta raqamni ajrating: 742 | qolgani 12.',ok:'To‘g‘ri! 12 742 — o‘n ikki ming yetti yuz qirq ikki.'},
  ch('1 392 000 sonida eng chapdagi guruh qanday nomlanadi?',['Millionlar','Minglar','Birlar','Milliardlar'],0,'Eng chapdagi guruh — 1. U mingta mingliklarga teng, ya’ni million.','To‘g‘ri. 1 | 392 | 000 — chapda millionlar, keyin minglar, so‘ng birlar.',{tag:'Mashq',sub:'Sinflarni bilib oling.'}),
  ch('384 400 dagi “400” qismi qaysi sinfga kiradi?',['Birlar sinfi','Minglar sinfi','Millionlar sinfi','Milliardlar sinfi'],0,'O‘ngdagi uchta raqam doim birlar sinfini tashkil qiladi.','To‘g‘ri. 400 — birlar sinfi: 4 yuzlik, 0 o‘nlik, 0 birlik.',{tag:'Mashq',sub:'Sinflarni bilib oling.'}),
  inp('Raqamlar bilan yozing: bir million uch yuz to‘qson ikki ming.','Quyosh diametri, km.','sun','1392000','Million — 1, “uch yuz to‘qson ikki ming” — 392, birlar sinfi bo‘sh: 000.','Barakalla! 1 392 000.',{groups:[['millionlar',1],['minglar',3],['birlar',3]]}),
  inp('Raqamlar bilan yozing: uch yuz sakson to‘rt ming to‘rt yuz.','Yerdan Oygacha masofa, km.','moon','384400','“Uch yuz sakson to‘rt ming” — 384, “to‘rt yuz” — 400.','Barakalla! 384 400.',{groups:[['minglar',3],['birlar',3]]}),
  mtc('Sonni o‘qilishi bilan mosla','Songa bosing, keyin o‘qilishini tanlang.',[['384 400','Oy, km','moon'],['1 392 000','Quyosh diametri','sun'],['299 792 458','yorug‘lik tezligi','bolt']],['uch yuz sakson to‘rt ming to‘rt yuz','ikki yuz to‘qson to‘qqiz million yetti yuz to‘qson ikki ming to‘rt yuz ellik sakkiz','bir million uch yuz to‘qson ikki ming'],[0,2,1],'Sonni sinflarga ajrating va har bir sinfni ayting. Millionlar bor-yo‘qligiga qarang.','Barakalla! Har bir sonni sinflar bo‘yicha o‘qidingiz.'),
  srt('Son qaysi sinfgacha yetadi?','Son bittalab chiqadi. U tushadigan savatni bosing.',['Minglar sinfigacha','Millionlar sinfigacha'],[['1 392 000',1],['384 400',0],['299 792 458',1],['12 742',0],['5 000 000',1]],'Sinflarga ajrating va chapda millionlar guruhi bor-yo‘qligini qarang.','To‘g‘ri! Million guruhi bo‘lsa, son millionlar sinfigacha yetadi.'),
  ch('149 600 000 qanday o‘qiladi?',['bir yuz qirq to‘qqiz million olti yuz ming','bir million to‘rt yuz to‘qson olti ming','bir yuz qirq to‘qqiz ming olti yuz','to‘qqiz yuz qirq million'],0,'Uchtadan ajrating: 149 | 600 | 000 — million, ming, birlar.','To‘g‘ri. 149 million 600 ming.',{tag:'Mashq',sub:'Yerdan Quyoshgacha masofa, km.'}),
  {t:'summary',title:'Endi istalgan katta sonni o‘qiysiz',icon:'trophy',key:['Sonni o‘ngdan uch xonadan sinflarga ajrating.','Har bir sinfda uchta xona; chapdan o‘ngga sinflar bo‘yicha o‘qing.','Nol bo‘sh xonani ushlaydi — usiz son necha barobar kichik.'],factIcon:'sun',fact:'Quyoshgacha masofa 149 600 000 — bu bir yuz qirq to‘qqiz million olti yuz ming kilometr. Dars boshida uni o‘qish qiyin edi, endi — yo‘q.',from:'boshlang‘ich sinfdagi xona va sinflar',next:'ko‘p xonali sonlarni taqqoslash va yaxlitlash'}
 ]},
 english:{title:'Ingliz tilida birinchi gaplar',steps:[
  {t:'intro',q:'Atrofimizdagi narsalarni inglizcha qanday aytamiz?',art:'words',big:'Apple',unit:'olma',ask:'Bu so‘zlarni bilasizmi?'},
  rev('Avval tanish so‘zlarni eslaymiz.','“Cat” so‘zining ma’nosi qaysi?',['Kuchuk','Qush','Mushuk','Baliq'],2,'Cat — uy hayvoni, “miyov” deb ovoz chiqaradi.','To‘g‘ri. Cat — mushuk.'),
  rev('Ranglarni ham eslaymiz.','“Blue” qaysi rang?',['Qizil','Ko‘k','Yashil','Sariq'],1,'Osmon va dengiz rangini eslang.','To‘g‘ri. Blue — ko‘k.'),
  rev('Salomlashish so‘zlari.','“Good morning” qachon aytiladi?',['Kechqurun','Tunda','Tushda','Ertalab'],3,'“Morning” — tong, ertalab.','To‘g‘ri. Good morning — xayrli tong.'),
  ch('“I ___ a student.” gapini to‘ldiring.',['am','is','are','be'],0,'I (men) bilan faqat “am” ishlatiladi: I am.','To‘g‘ri. I am a student — men o‘quvchiman.',{tag:'Mashq',sub:'To be fe’lini tanlang.'}),
  ch('“She ___ a teacher.” gapini to‘ldiring.',['am','are','is','be'],2,'She, he, it bilan “is” ishlatiladi.','To‘g‘ri. She is a teacher — u o‘qituvchi.',{tag:'Mashq',sub:'To be fe’lini tanlang.'}),
  ch('“They ___ friends.” gapini to‘ldiring.',['is','am','be','are'],3,'They, we, you bilan “are” ishlatiladi.','To‘g‘ri. They are friends — ular do‘st.',{tag:'Mashq',sub:'To be fe’lini tanlang.'}),
  inp('Inglizcha yozing: “kitob”','Maktab sumkasidagi narsa.','book',['book'],'Bu so‘z to‘rt harfdan iborat va “b” harfidan boshlanadi.','Barakalla! Book — kitob.',{text:true,ph:'So‘zni yozing'}),
  inp('Inglizcha yozing: “uch”','Sanash vaqti: one, two, …','spark',['three'],'One, two, … — keyingi so‘z “t” harfidan boshlanadi.','Barakalla! Three — uch.',{text:true,ph:'So‘zni yozing'}),
  ch('Qaysi so‘z rangni bildiradi?',['Table','Green','Run','Happy'],1,'Rang — bu qizil, ko‘k, yashil kabi so‘zlar.','To‘g‘ri. Green — yashil rang.',{tag:'Mashq',sub:'So‘z turini aniqlang.'}),
  ch('Qaysi so‘z hayvonni bildiradi?',['Pen','Door','Dog','Red'],2,'Hayvonlar jonli, ular yuguradi va ovoz chiqaradi.','To‘g‘ri. Dog — kuchuk.',{tag:'Mashq',sub:'So‘z turini aniqlang.'}),
  mtc('So‘zni tarjimasi bilan mosla','So‘zga bosing, keyin tarjimasini tanlang.',[['Apple','inglizcha','words'],['Book','inglizcha','words'],['House','inglizcha','words']],['Kitob','Uy','Olma'],[2,0,1],'So‘zni ovoz chiqarib o‘qing va tanish narsani eslang.','Barakalla! Hamma so‘zni topdingiz.'),
  srt('So‘z qaysi guruhga kiradi?','So‘z bittalab chiqadi. Mos savatni bosing.',['Rang','Hayvon'],[['Red',0],['Dog',1],['Blue',0],['Cat',1],['Yellow',0]],'Rang so‘zlari — red, blue, yellow. Hayvonlar — dog, cat.','To‘g‘ri! Yangi so‘zlarni guruhlab eslab qolish osonroq.'),
  ch('“I have a red book.” gapini tarjima qiling.',['Menda qizil kitob bor.','Men qizil kitob o‘qiyman.','Bu qizil kitob emas.','Menda ko‘k kitob bor.'],0,'“Have” — bor, “red” — qizil, “book” — kitob.','To‘g‘ri. Menda qizil kitob bor.',{tag:'Mashq',sub:'Gapni tarjima qiling.'}),
  {t:'summary',title:'Endi oddiy gaplar tuza olasiz',icon:'trophy',key:['I bilan am, he/she bilan is, we/they bilan are ishlatiladi.','Rang va hayvon nomlarini guruhlab eslang.','Yangi so‘zni gap ichida ishlatsangiz, tezroq yodda qoladi.'],factIcon:'book',fact:'“I have a red book.” — dars boshida bu gapni tushunish qiyin edi, endi uni o‘zingiz tuza olasiz.',from:'asosiy so‘zlar va “to be” fe’li',next:'o‘tgan zamon va savol gaplar'}
 ]},
 code:{title:'Algoritm va o‘zgaruvchilar',steps:[
  {t:'intro',q:'Kompyuter buyruqlarni qanday bajaradi?',art:'code',big:'2 + 3 * 2',unit:'natija?',ask:'Bu ifoda natijasini topa olasizmi?'},
  rev('Avval asosiy tushunchalarni eslaymiz.','Algoritm nima?',['Rasm turi','Qadamlar ketma-ketligi','Internet manzili','Kompyuter turi'],1,'Algoritm — maqsadga yetish uchun tartib bilan bajariladigan qadamlar.','To‘g‘ri. Algoritm — tartibli qadamlar.'),
  rev('O‘zgaruvchi — qiymat uchun quti.','O‘zgaruvchi nima uchun kerak?',['Qiymatni saqlash uchun','Rasm chizish uchun','Internetni yoqish uchun','Ovozni o‘chirish uchun'],0,'Quti ichiga narsa solib qo‘yganingizdek, o‘zgaruvchiga qiymat solinadi.','To‘g‘ri. Masalan, x = 5 — x ichida 5 saqlanadi.'),
  rev('Kod qatorlari bir-biridan keyin bajariladi.','Kod odatda qaysi tartibda bajariladi?',['Pastdan yuqoriga','Tasodifiy','Yuqoridan pastga','Faqat oxirgi qator'],2,'Kitob o‘qiganingiz kabi: birinchi qator, keyin ikkinchi.','To‘g‘ri. Qatorlar yuqoridan pastga qarab bajariladi.'),
  ch('2 + 3 * 2 natijasi nechaga teng?',['10','8','12','7'],1,'Avval ko‘paytirish: 3 * 2 = 6, keyin 2 + 6.','To‘g‘ri. 2 + 6 = 8.',{tag:'Mashq',sub:'Ifodani hisoblang.'}),
  ch('x = 5, keyin x = x + 1. Endi x nechaga teng?',['5','1','6','51'],2,'Eski qiymatga bir qo‘shiladi: 5 + 1.','To‘g‘ri. x endi 6.',{tag:'Mashq',sub:'O‘zgaruvchini kuzating.'}),
  ch('7 % 4 ifodasining natijasi qanday? (% — bo‘lishdagi qoldiq)',['1','2','3','4'],2,'7 ichida 4 bir marta bor, qolgani 3.','To‘g‘ri. 7 ni 4 ga bo‘lsak, qoldiq 3.',{tag:'Mashq',sub:'Qoldiqni toping.'}),
  inp('print("Salom") buyrug‘i ekranga nima chiqaradi?','Qo‘shtirnoq ichidagi matnni yozing.','code',['Salom'],'print — “chiqar” degani. Qo‘shtirnoq ichidagi matn ekranga chiqadi.','Barakalla! Ekranda: Salom.',{text:true,ph:'Natijani yozing'}),
  inp('3 * 4 ni hisoblang.','Natijani son bilan yozing.','code',['12'],'3 ni 4 marta qo‘shing: 3 + 3 + 3 + 3.','Barakalla! 3 * 4 = 12.',{text:true,ph:'Natijani yozing'}),
  ch('for i in range(3): — bu sikl necha marta takrorlanadi?',['2','3','4','1'],1,'range(3) uch marta takrorlashni bildiradi: 0, 1, 2.','To‘g‘ri. Sikl 3 marta bajariladi.',{tag:'Mashq',sub:'Siklni tushuning.'}),
  ch('Shartni tekshirish uchun qaysi so‘z ishlatiladi?',['loop','color','if','print'],2,'“If” inglizchada “agar” degani.','To‘g‘ri. if — agar shart bajarilsa.',{tag:'Mashq',sub:'Shartni tushuning.'}),
  mtc('Buyruqni vazifasi bilan mosla','Buyruqqa bosing, keyin vazifasini tanlang.',[['if','shart','code'],['for','sikl','code'],['print','chiqarish','code']],['Ekranga chiqaradi','Shartni tekshiradi','Amalni takrorlaydi'],[1,2,0],'If — agar, for — har bir uchun, print — chiqar.','Barakalla! Uchala buyruqni mosladingiz.'),
  srt('Bu qiymat qaysi turga kiradi?','Qiymat bittalab chiqadi. Mos savatni bosing.',['Son','Matn'],[['42',0],['"Salom"',1],['3.14',0],['"kod"',1],['100',0]],'Qo‘shtirnoq ichidagi qiymat — matn, qolganlari — son.','To‘g‘ri! Qo‘shtirnoq matnni bildiradi.'),
  ch('Qaysi kod “Salom” so‘zini 3 marta chiqaradi?',['for i in range(3): print("Salom")','for i in range(1): print("Salom")','if 3: print("Salom")','print("Salom" * 0)'],0,'Uch marta takrorlash uchun range(3) kerak.','To‘g‘ri. Sikl print buyrug‘ini 3 marta takrorlaydi.',{tag:'Mashq',sub:'To‘g‘ri kodni tanlang.'}),
  {t:'summary',title:'Endi oddiy dastur qadamlarini o‘qiysiz',icon:'trophy',key:['Algoritm — tartib bilan bajariladigan qadamlar.','O‘zgaruvchi qiymatni saqlaydi, uni keyin o‘zgartirish mumkin.','if shartni tekshiradi, for amalni takrorlaydi.'],factIcon:'bolt',fact:'Dars boshidagi 2 + 3 * 2 ifodasini endi qadam-baqadam yecha olasiz: avval ko‘paytirish, keyin qo‘shish — natija 8.',from:'sonlar, matn va oddiy buyruqlar',next:'funksiyalar va murakkabroq sikllar'}
 ]},
 robotics:{title:'Robot qanday ishlaydi?',steps:[
  {t:'intro',q:'Robot atrofini qanday sezadi va qanday harakatlanadi?',art:'robot',big:'Sensor',unit:'robotning ko‘zi',ask:'Robot qismlarini bilasizmi?'},
  rev('Avval robot qismlarini eslaymiz.','Robotning “miyasi” qaysi qism?',['G‘ildirak','Korpus','Kontroller','Chiroq'],2,'Qaror qabul qiladigan va buyruq beradigan qism — kontroller.','To‘g‘ri. Kontroller — robotning miyasi.'),
  rev('Sensorlar atrofni sezadi.','Masofani nima o‘lchaydi?',['Motor','Masofa sensori','Batareya','Sim'],1,'O‘lchaydigan, sezadigan qismni qidiring.','To‘g‘ri. Masofa sensori to‘siqgacha masofani o‘lchaydi.'),
  rev('Harakat uchun kuch kerak.','Robotni nima harakatlantiradi?',['Kamera','Chiroq','Motor','Tugma'],2,'G‘ildirakni aylantiradigan qism qaysi?','To‘g‘ri. Motor g‘ildirakni aylantiradi.'),
  ch('Robot oldida to‘siq bor. U nima qilishi kerak?',['Tezlashadi','To‘xtab, buriladi','Ko‘zini yumadi','Uxlaydi'],1,'To‘siqqa urilmaslik uchun to‘xtash va yo‘nalishni o‘zgartirish kerak.','To‘g‘ri. Sensor to‘siqni sezadi, robot to‘xtab buriladi.',{tag:'Mashq',sub:'Robot qarorini tanlang.'}),
  ch('Batareya robotga nima beradi?',['Buyruq','Rasm','Elektr energiyasi','Ma’lumot'],2,'Batareyasiz robot ishlamaydi. U nimani saqlaydi?','To‘g‘ri. Batareya elektr energiyasi beradi.',{tag:'Mashq',sub:'Qismning vazifasini tanlang.'}),
  ch('Robot 90° ni o‘ngga ikki marta burilsa, jami necha gradusga buriladi?',['90°','270°','180°','360°'],2,'Ikkita 90° ni qo‘shing.','To‘g‘ri. 90° + 90° = 180°, robot orqaga qaraydi.',{tag:'Mashq',sub:'Burilishni hisoblang.'}),
  inp('4 ta g‘ildirak necha juft?','Natijani son bilan yozing.','robot',['2'],'Juft — ikkita. 4 ni 2 ga bo‘ling.','Barakalla! 4 ta g‘ildirak — 2 juft.',{text:true,ph:'Sonni yozing'}),
  inp('Robot 3 metr yurdi, keyin yana 4 metr. Jami necha metr?','Natijani son bilan yozing.','robot',['7'],'3 va 4 ni qo‘shing.','Barakalla! 3 + 4 = 7 metr.',{text:true,ph:'Sonni yozing'}),
  ch('Qaysi qism yorug‘lik chiqaradi?',['Motor','Sensor','G‘ildirak','LED'],3,'LED — kichik chiroq.','To‘g‘ri. LED yorug‘lik chiqaradi.',{tag:'Mashq',sub:'Qismni toping.'}),
  ch('Robot dasturi nimadan iborat?',['Suvdan','Buyruqlardan','Havodan','Ovqatdan'],1,'Robot faqat unga berilgan ko‘rsatmalarni bajaradi.','To‘g‘ri. Dastur — buyruqlar ketma-ketligi.',{tag:'Mashq',sub:'Dastur nima?'}),
  mtc('Qismni vazifasi bilan mosla','Qismga bosing, keyin vazifasini tanlang.',[['Sensor','qism','robot'],['Motor','qism','robot'],['Kontroller','qism','robot']],['Harakatlantiradi','Qaror qabul qiladi','Atrofni sezadi'],[2,0,1],'Sensor — sezadi, motor — harakatlantiradi, kontroller — qaror qiladi.','Barakalla! Qismlarning vazifasini to‘g‘ri topdingiz.'),
  srt('Qism qaysi guruhga kiradi?','Qism bittalab chiqadi. Mos savatni bosing.',['Sezadi (kirish)','Bajaradi (chiqish)'],[['Masofa sensori',0],['Motor',1],['Tugma',0],['LED',1],['Tovush sensori',0]],'Atrofdan ma’lumot oladigan qismlar — kirish, harakat qiladigan yoki yonadigan — chiqish.','To‘g‘ri! Sensorlar sezadi, motor va LED bajaradi.'),
  ch('Robot qora chiziq bo‘ylab yurishi kerak. Qaysi sensor kerak?',['Chiziq sensori','Masofa sensori','Tovush sensori','Harorat sensori'],0,'Yo‘ldagi chiziqni “ko‘radigan” sensor kerak.','To‘g‘ri. Chiziq sensori yo‘ldagi qora chiziqni sezadi.',{tag:'Mashq',sub:'To‘g‘ri sensorni tanlang.'}),
  {t:'summary',title:'Endi robot qismlarini farqlay olasiz',icon:'trophy',key:['Sensor sezadi, kontroller qaror qiladi, motor harakatlantiradi.','Robot faqat dasturdagi buyruqlarni bajaradi.','To‘siq sezilsa, robot to‘xtab burilishi kerak.'],factIcon:'bolt',fact:'Dars boshida “sensor” so‘zi notanish edi. Endi robot oldidagi to‘siqni qanday sezishini tushuntira olasiz.',from:'robot qismlari va oddiy buyruqlar',next:'sensor bilan harakatni boshqarish'}
 ]},
 digital:{title:'Xavfsiz internet',steps:[
  {t:'intro',q:'Internetda o‘zimizni qanday himoya qilamiz?',art:'shield',big:'K7!mQ2#v',unit:'kuchli parol?',ask:'Bu parolni kuchli deb o‘ylaysizmi?'},
  rev('Avval parol qoidalarini eslaymiz.','Qaysi parol eng kuchli?',['123456','password','K7!mQ2#v','alisher'],2,'Kuchli parol harf, raqam va belgidan iborat bo‘ladi.','To‘g‘ri. K7!mQ2#v taxmin qilish qiyin.'),
  rev('Begona havolalar xavfli bo‘lishi mumkin.','Begona havola keldi. Nima qilasiz?',['Darrov ochaman','Do‘stlarimga yuboraman','Parolimni kiritaman','Kattalarga ko‘rsataman'],3,'Noma’lum havolani ochishdan oldin kattalar bilan maslahatlashing.','To‘g‘ri. Avval kattalarga ko‘rsatish xavfsiz.'),
  rev('Parol — faqat sizniki.','Shaxsiy parolni kimga aytish mumkin?',['Hech kimga','Yaqin do‘stimga','Chatdagi begonaga','Hammaga'],0,'Parolni hatto do‘stingizga ham aytmaslik kerak.','To‘g‘ri. Parol sir saqlanadi.'),
  ch('Ctrl + C tugmalari nima qiladi?',['O‘chiradi','Nusxa oladi','Saqlaydi','Chop etadi'],1,'C — inglizcha “copy”, ya’ni nusxa.','To‘g‘ri. Ctrl + C — nusxa olish.',{tag:'Mashq',sub:'Klaviatura buyruqlari.'}),
  ch('Ctrl + V tugmalari nima qiladi?',['Joylaydi','O‘chiradi','Yopadi','Saqlaydi'],0,'V harfi Ctrl + C dan keyin ishlatiladi.','To‘g‘ri. Ctrl + V — nusxani joylash.',{tag:'Mashq',sub:'Klaviatura buyruqlari.'}),
  ch('Ctrl + S tugmalari nima qiladi?',['Yopadi','O‘chiradi','Saqlaydi','Nusxalaydi'],2,'S — inglizcha “save”, ya’ni saqlash.','To‘g‘ri. Ctrl + S — faylni saqlash.',{tag:'Mashq',sub:'Klaviatura buyruqlari.'}),
  inp('Rasm fayli nomining oxirini yozing: foto.___','Eng ko‘p ishlatiladigan: png yoki jpg.','computer',['png','jpg','jpeg','.png','.jpg','.jpeg'],'Rasm fayllari .png yoki .jpg bilan tugaydi.','Barakalla! Rasm fayli, masalan, foto.png.',{text:true,ph:'Kengaytmani yozing'}),
  inp('Fayllar kompyuterda nimaga joylanadi? (bir so‘z)','Tartib uchun ishlatiladi.','computer',['papka','papkaga','papkada','papkalar','papkalarga','papkalarda'],'Hujjatlarni javonda papkaga solgandek, kompyuterda ham.','Barakalla! Fayllar papkalarda tartiblanadi.',{text:true,ph:'So‘zni yozing'}),
  ch('Internetda odobli muloqot qanday bo‘ladi?',['Baqirib yozish','Hurmat bilan yozish','Haqorat qilish','Yolg‘on tarqatish'],1,'Do‘stingiz bilan yuzma-yuz gaplashgandek yozing.','To‘g‘ri. Hurmat bilan yozish — odob qoidasi.',{tag:'Mashq',sub:'Muloqot odobi.'}),
  ch('Shubhali xabar kelsa, nima qilasiz?',['Yuklab olaman','Parol yuboraman','Javob yozaman','Kattalarga bildiraman'],3,'Noma’lum xabarga javob bermang.','To‘g‘ri. Shubhali xabarni kattalarga bildiring.',{tag:'Mashq',sub:'Shubhali xabarlar.'}),
  mtc('Tushunchani qoidasi bilan mosla','Tushunchaga bosing, keyin qoidasini tanlang.',[['Parol','tushuncha','computer'],['Havola','tushuncha','computer'],['Antivirus','tushuncha','computer']],['Ochishdan oldin tekshiriladi','Zararli dasturdan himoya qiladi','Hech kimga aytilmaydi'],[2,0,1],'Parol — sir, havola — ehtiyotkorlik, antivirus — himoya.','Barakalla! Qoidalarni to‘g‘ri mosladingiz.'),
  srt('Bu harakat qaysi guruhga kiradi?','Harakat bittalab chiqadi. Mos savatni bosing.',['Xavfsiz','Xavfli'],[['Kuchli parol qo‘yish',0],['Parolni do‘stga aytish',1],['Shubhali havolani ochish',1],['Dasturni yangilash',0],['Kattalarga xabar berish',0]],'Xavfsiz harakat seni himoya qiladi, xavfli harakat ma’lumotingni oshkor qiladi.','To‘g‘ri! Xavfsiz odatlar seni himoya qiladi.'),
  ch('“Sovg‘a yutdingiz!” degan xabarda parol so‘ralmoqda. Eng to‘g‘ri qaror?',['Parolni kiritaman','Havolani o‘chirib, kattalarga aytaman','Hammaga yuboraman','Javob yozaman'],1,'Parol so‘ragan xabar — firibgarlik belgisi.','To‘g‘ri. Bunday xabarni o‘chirib, kattalarga aytish kerak.',{tag:'Mashq',sub:'To‘g‘ri qarorni tanlang.'}),
  {t:'summary',title:'Endi internetda xavfsiz yura olasiz',icon:'trophy',key:['Kuchli parol — harf, raqam va belgidan iborat; uni hech kimga aytmang.','Begona havolani ochishdan oldin kattalarga ko‘rsating.','Shubhali xabarni o‘chiring va kattalarga bildiring.'],factIcon:'shield',fact:'Dars boshida K7!mQ2#v parolini kuchli deb tanladingiz. Endi nega kuchli ekanini tushuntira olasiz.',from:'parol va fayllar bilan ishlash',next:'shaxsiy ma’lumotlarni himoya qilish'}
 ]},
 logic:{title:'Qonuniyatlarni topamiz',steps:[
  {t:'intro',q:'Sonlar orasidagi yashirin qonuniyatni qanday topamiz?',art:'puzzle',big:'2, 4, 6, ?',unit:'keyingi son',ask:'Keyingi sonni topa olasizmi?'},
  rev('Avval oddiy ketma-ketliklarni eslaymiz.','Davom ettiring: 2, 4, 6, …',['7','8','9','10'],1,'Har bir son oldingisidan 2 ta ko‘p.','To‘g‘ri. Har safar 2 qo‘shiladi: 6 + 2 = 8.'),
  rev('Ortiqchasini topish — guruhni aniqlash.','Qaysi biri ortiqcha: olma, nok, stol, olxo‘ri?',['olma','nok','stol','olxo‘ri'],2,'Olma, nok, olxo‘ri — mevalar.','To‘g‘ri. Stol meva emas.'),
  rev('Ba’zan sonlar ikki barobar ortadi.','1, 2, 4, 8, … keyingi son qaysi?',['10','12','16','18'],2,'Har bir son oldingisidan 2 marta katta.','To‘g‘ri. 8 * 2 = 16.'),
  ch('Qizil, ko‘k, qizil, ko‘k, … keyingi rang qaysi?',['Qizil','Ko‘k','Sariq','Yashil'],0,'Ranglar juft-juft takrorlanadi.','To‘g‘ri. Qizil, ko‘k navbat bilan keladi.',{tag:'Mashq',sub:'Takrorlanishni toping.'}),
  ch('3, 6, 9, … keyingi son qaysi?',['10','11','12','15'],2,'Har safar 3 qo‘shiladi.','To‘g‘ri. 9 + 3 = 12.',{tag:'Mashq',sub:'Takrorlanishni toping.'}),
  ch('10, 8, 6, … keyingi son qaysi?',['5','4','3','2'],1,'Sonlar kamayib boradi: har safar 2 ta kam.','To‘g‘ri. 6 − 2 = 4.',{tag:'Mashq',sub:'Takrorlanishni toping.'}),
  inp('5, 10, 15, … keyingi sonni yozing.','Har bir son oldingisidan nechta ko‘p?','spark',['20'],'Har safar 5 qo‘shiladi.','Barakalla! 15 + 5 = 20.',{text:true,ph:'Sonni yozing'}),
  inp('1, 3, 5, 7, … keyingi sonni yozing.','Bu toq sonlar ketma-ketligi.','spark',['9'],'Har safar 2 qo‘shiladi.','Barakalla! 7 + 2 = 9.',{text:true,ph:'Sonni yozing'}),
  ch('Qaysi son juft?',['7','9','11','12'],3,'Juft sonlar 2 ga qoldiqsiz bo‘linadi.','To‘g‘ri. 12 ni 2 ga qoldiqsiz bo‘lish mumkin.',{tag:'Mashq',sub:'Juft va toq.'}),
  ch('Bir haftada necha kun bor?',['5','6','7','8'],2,'Dushanbadan yakshanbagacha sanang.','To‘g‘ri. Haftada 7 kun bor.',{tag:'Mashq',sub:'Kundalik hayotdan.'}),
  mtc('Ketma-ketlikni qoidasi bilan mosla','Ketma-ketlikka bosing, keyin qoidasini tanlang.',[['2, 4, 6, 8','ketma-ketlik','puzzle'],['10, 20, 30','ketma-ketlik','puzzle'],['1, 2, 4, 8','ketma-ketlik','puzzle']],['Har safar 10 qo‘shiladi','Har safar 2 ga ko‘paytiriladi','Har safar 2 qo‘shiladi'],[2,0,1],'Sonlar orasidagi farqqa yoki necha marta ortishiga qarang.','Barakalla! Uchala qoidani topdingiz.'),
  srt('Son qaysi guruhga kiradi?','Son bittalab chiqadi. Mos savatni bosing.',['Juft','Toq'],[['14',0],['7',1],['22',0],['9',1],['30',0]],'Juft son 0, 2, 4, 6, 8 bilan tugaydi, toq son — 1, 3, 5, 7, 9 bilan.','To‘g‘ri! Oxirgi raqam juft yoki toqligini aytib turadi.'),
  ch('2, 3, 5, 8, 12, … keyingi son qaysi?',['15','16','17','18'],2,'Farqlarga qarang: +1, +2, +3, +4 … keyingisi +5.','To‘g‘ri. 12 + 5 = 17.',{tag:'Mashq',sub:'Murakkabroq qonuniyat.'}),
  {t:'summary',title:'Endi qonuniyatlarni topa olasiz',icon:'trophy',key:['Sonlar orasidagi farqqa yoki necha marta ortishiga qarang.','Ortiqchasini topish uchun guruhning umumiy belgisini toping.','Juft sonlar 0, 2, 4, 6, 8 bilan tugaydi.'],factIcon:'spark',fact:'2, 3, 5, 8, 12 kabi murakkab qatorda ham farqlar qonuniyatini topdingiz. Oldin bunday qatorni yechish qiyin edi.',from:'oddiy ketma-ketliklar va juft-toq sonlar',next:'shakllar va jadvallar bo‘yicha mantiq'}
 ]}
};
