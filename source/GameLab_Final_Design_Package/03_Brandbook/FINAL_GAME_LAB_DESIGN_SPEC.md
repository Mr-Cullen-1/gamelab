# GameLab — Yakuniy UX/UI dizayn va implementatsiya qo‘llanmasi

**Loyiha:** Junior Academy LMS ichidagi kurslarga bog‘langan o‘yinlar markazi  
**Hujjat holati:** FINAL — ushbu hujjat va `01_Final_References/`, `02_Device_Mockups/`, `04_Game_Card/` ichidagi final referencelar asosiy manba hisoblanadi.  
**Maqsad:** agent yoki frontend jamoa qo‘shimcha taxminlarsiz GameLab interfeysini ushbu vizual va UX qoidalarga muvofiq qurishi.

---

## 0. Muhim qarorlar (must-follow)

1. **Chap vertikal sidebar bo‘lmaydi.** Junior platformasining yuqori navbar’i saqlanadi. GameLab kontenti navbar ostida to‘liq kenglikda joylashadi.
2. **Dashboard statistikasi qo‘shilmaydi.** Streak, kunlik topshiriqlar, reyting paneli, mentor paneli va boshqa LMS dashboard bloklari GameLab bosh sahifasiga ko‘chirilmaydi.
3. **Bitta valyuta ko‘rsatiladi: Coin.** Header’da lightning/energy hisoblagichi bo‘lmaydi. Coin yonida `i` belgisi orqali tooltip ochiladi: coin o‘yin va topshiriqlar uchun beriladigan mukofot ekani tushuntiriladi.
4. **Interfeys tili — o‘zbek lotin.** Header, tugmalar, filterlar, empty state va xabarlarning barchasi bir tilda. Ruscha aralash label ishlatilmaydi.
5. **Kurs chiplari butun GameLab sahifasiga ta’sir qiladi.** Kurs tanlanganda “Davom ettirish”, “Siz uchun tavsiya etiladi” va “Barcha o‘yinlar” bo‘limlari shu kurs bo‘yicha yangilanadi.
6. **Katalog ichidagi qidiruv va qo‘shimcha filterlar faqat “Barcha o‘yinlar” katalogiga ta’sir qiladi.** Ular yuqoridagi tavsiya va davom ettirish bloklarini o‘zgartirmaydi.
7. **Tavsiyalarda faqat hali boshlanmagan o‘yinlar bo‘ladi.** `started_at` mavjud yoki progressi 0 dan yuqori o‘yin “Siz uchun tavsiya etiladi” ro‘yxatiga kirmaydi.
8. **Mukofot qiymati har bir o‘yin kartasida ko‘rinadi.** Coin miqdori backend/config’dan olinadi; mockup’dagi `+50`, `+100`, `+150` qiymatlar faqat vizual namuna.
9. **Mobile’da kurs nomlari qisqartirilmaydi.** Chiplar gorizontal scroll qilinadi; “Matem.” yoki “Dastur.” kabi truncation ishlatilmaydi.
10. **Holatlar majburiy:** Yangi, Davom etmoqda, Bajarilgan, Bloklangan; shuningdek loading/skeleton va qidiruv natijasi topilmagan holatlari.

---

## 1. Brend va vizual yo‘nalish

GameLab alohida mahsulotdek emas, Junior Academy platformasining tabiiy bo‘limidek ko‘rinishi kerak. Junior’ning mavjud oq fonli, yumaloq, yengil soyali UI tili saqlanadi. O‘yinlarning coverlari esa rang-barang 2D/3D illustratsiyalar bilan ajralib turadi.

### Vizual xarakter
- Do‘stona, bolalar uchun tushunarli, lekin haddan tashqari chaqaloqona emas.
- Yumaloq kartalar, yumshoq shadow, nozik border.
- Katta sarlavhalar va aniq CTA.
- Orange — brend va asosiy harakat rangi; purple/blue/green ko‘proq o‘yin coverlari, kurs ikonlari va holatlarda.
- Robot-mascot — hero va ayrim onboarding/empty state’larda; har bir kartaga majburan qo‘yilmaydi.

### Tavsiya etilgan radius va spacing
| Token | Qiymat | Qo‘llanishi |
|---|---:|---|
| radius-sm | 10 px | chip, input, kichik badge |
| radius-md | 16 px | o‘yin kartalari, tugmalar |
| radius-lg | 22–24 px | hero, katta panel |
| radius-pill | 999 px | status, course chip, coin badge |
| spacing-1 | 4 px | icon/text oralig‘i |
| spacing-2 | 8 px | kichik elementlar |
| spacing-3 | 12 px | card ichki elementlari |
| spacing-4 | 16 px | card padding |
| spacing-6 | 24 px | section oralig‘i |
| spacing-8 | 32 px | katta section oralig‘i |

---

## 2. Ranglar (final tokens)

| Token | HEX | Qo‘llanishi |
|---|---|---|
| `brand.orange` | `#E65100` | logotip aksenti, icon, active underline, dekor |
| `action.primary` | `#C2410C` | oq matnli asosiy CTA va Play tugmasi — kontrast uchun quyuqroq orange |
| `brand.orangeLight` | `#FFF1E6` | hero fon, yengil orange chip |
| `text.primary` | `#0F172A` | sarlavha va asosiy matn |
| `text.secondary` | `#475569` | tavsif va ikkilamchi matn |
| `text.muted` | `#64748B` | yordamchi label |
| `background` | `#F7F8FC` | sahifa foni |
| `surface` | `#FFFFFF` | card va panel |
| `border` | `#E5E7EB` | card/input chegarasi |
| `accent.purple` | `#7C3AED` | o‘yin illustratsiyasi, ayrim kurs ikonlari |
| `accent.blue` | `#2563EB` | info va kurs ikonlari |
| `state.success` | `#16A34A` | bajarilgan holat |
| `state.info` | `#2563EB` | davom etmoqda holati |
| `state.locked` | `#94A3B8` | bloklangan holat |
| `state.error` | `#DC2626` | xato holati |
| `state.warning.bg` | `#FEF3C7` | ogohlantirish foni |
| `state.warning.text` | `#92400E` | ogohlantirish matni |

**Accessibility:** `#E65100` ustida oq matnni kichik o‘lchamda ishlatmang. Asosiy oq matnli tugmalarda `#C2410C` ishlating. Agar `#E65100` ishlatilsa, matn `#0F172A` bo‘lsin. Warning rangi primary orange’dan aniq farq qilishi kerak; sariq fon + to‘q jigarrang matn kombinatsiyasini ishlating.

---

## 3. Tipografiya

**Asosiy shrift:** Nunito. Agar loyiha ichida Nunito mavjud bo‘lmasa, Inter fallback. Harflar bolalar uchun oson o‘qiladigan, yumaloq va aniq bo‘lishi kerak.

| Uslub | Desktop | Mobile | Weight |
|---|---:|---:|---|
| H1 / GameLab | 36–44 px | 28–32 px | 800/Bold |
| Section title | 24–28 px | 20–22 px | 700/Bold |
| Game title | 18–20 px | 17–18 px | 700/Bold |
| Body | 16 px | 16 px | 400/500 |
| Card description | 14–16 px | 14–15 px | 400/500 |
| Caption | 12–13 px | 12–13 px | 500 |

9–13 yoshdagi o‘quvchilar uchun card description 13 px’dan kichik bo‘lmasin. Mobile’da muhim ma’lumotlar 14 px’dan kichik bo‘lmasin.

---

## 4. Sahifa arxitekturasi

Tartib quyidagicha bo‘lsin:

1. Junior yuqori navbar’i.
2. GameLab hero banner.
3. Kurs bo‘yicha global chip filter.
4. “Davom ettirish” (faqat boshlangan o‘yinlar mavjud bo‘lsa).
5. “Siz uchun tavsiya etiladi” (faqat boshlanmagan o‘yinlar).
6. “Barcha o‘yinlar” katalogi: qidiruv, qo‘shimcha filter, saralash va grid/list.

### 4.1 Junior navbar

- Chapda Junior Academy logo.
- Asosiy navigatsiya: `Dars jadvali`, `Mening yutuqlarim`, `GameLab` (active).
- O‘ngda faqat Coin balansi, coin haqida info tooltip, bildirishnoma, profil/avatar va dropdown.
- Energy/lightning counter ko‘rsatilmaydi.
- Navbar desktop’da bir qatorda. Tablet/mobile’da logo, Coin, notification va avatar saqlanadi; qolgan navigatsiya mavjud Junior patterniga muvofiq menu ichiga o‘tishi mumkin.
- GameLab sahifasida chap sidebar umuman bo‘lmaydi.

### 4.2 Hero banner

Matn:
- Sarlavha: `GameLab`
- Tavsif: `Kurslaring bo‘yicha qiziqarli o‘yinlar o‘yna, bilimlaringni mustahkamla va mukofotlar yut!`
- O‘ng tomonda Junior robot-mascot, gamepad va coin/star dekorlari.
- Hero ichida coin izohi uchun kichik panel yoki navbar’dagi tooltip bo‘lishi mumkin. Bir xil izohni ikki marta takrorlamang.

### 4.3 Kurslar — global filter

Default: `Barcha yo‘nalishlar`.

Final yo‘nalishlar:
1. Matematika
2. Ingliz tili
3. Dasturlash
4. Robototexnika
5. Raqamli ko‘nikmalar
6. Mantiq

`IT` alohida kategoriya sifatida ishlatilmaydi, chunki u Dasturlash/Raqamli ko‘nikmalar bilan chalkashishi mumkin. Kurslar ro‘yxati backend’da boshqariladigan bo‘lsin; yangi yo‘nalish qo‘shilganda layout buzilmasin.

Filter qoidasi:
- `Barcha yo‘nalishlar` tanlansa barcha bo‘limlar umumiy holatga qaytadi.
- Kurs tanlanganda sahifadagi barcha o‘yin bo‘limlari shu kursga mos ravishda filtrlanadi.
- Tanlangan chip orange border/fill bilan ajraladi; qolganlari neutral.
- Desktop: bitta qatorda.
- Tablet: joy yetmasa gorizontal scroll yoki 2 qator.
- Mobile: bir qatorda gorizontal scroll; chip label hech qachon qisqartirilmaydi.

### 4.4 Davom ettirish

- Faqat o‘quvchi boshlagan, lekin yakunlamagan o‘yinlar.
- Yangi o‘yin yoki 0 progressli o‘yin bu bo‘limga kirmaydi.
- Bitta yoki ikkita eng oxirgi aktiv o‘yin ko‘rsatiladi; `Barchasini ko‘rish` orqali katalogdagi davom etayotganlar filteriga o‘tish mumkin.
- Card: thumbnail, nom, kurs chip, progress, mukofot coin, Continue tugmasi.
- Progress misoli `3/10`; bu bosqich/level formatidir, foiz deb talqin qilinmasin.
- Agar boshlanmagan o‘yinlar bo‘lsa-yu, davom ettirish bo‘lmasa, bo‘limni butunlay yashiring. Bo‘sh panel qoldirmang.

### 4.5 Siz uchun tavsiya etiladi

- Bu bo‘limda faqat hali boshlanmagan o‘yinlar bo‘ladi: progress = 0 va `started_at` null.
- “Davom ettirish”dagi o‘yin bilan takrorlanish taqiqlanadi.
- Tavsiyalar kurs filteriga mos bo‘lishi shart.
- Badge: `Yangi` yoki `Mashhur` faqat real flag bo‘lsa ko‘rsatiladi.
- Har bir tavsiya card’ida mukofot miqdori aniq ko‘rsatiladi.
- Desktop: 4 ustun; tablet: 2 ustun yoki gorizontal carousel; mobile: 1.1–1.2 card ko‘rinadigan gorizontal carousel.
- `Barchasini ko‘rish` katalogda `未 boshlanmagan` yoki `Tavsiya etilgan` filtri bilan ochilishi mumkin.

### 4.6 Barcha o‘yinlar katalogi

- Sarlavha: `Barcha o‘yinlar` va jami son (`24 ta o‘yin` kabi dinamik).
- Qidiruv: placeholder `O‘yin qidirish...`; o‘yin nomi bo‘yicha qidiradi.
- Qo‘shimcha filter tugmasi: `Filtrlar`.
- Saralash: `Tavsiya bo‘yicha`, `Yangi`, `Mukofot bo‘yicha`, `Nomi bo‘yicha`.
- Filterlar: Kurs, Holat, Qiyinchilik darajasi (agar backend’da mavjud bo‘lsa), O‘yin turi (agar real metadata bo‘lsa).
- Katalog filterlari global kurs chipidan mustaqil; lekin global kurs tanlovi katalogga ham qo‘llanadi.
- Filter drawer/modal ichida `Tozalash` va `Natijalarni ko‘rish` tugmalari bo‘lsin.

---

## 5. Game Card — kartochka spetsifikatsiyasi

Asosiy vizual: `04_Game_Card/Game_Card_Standalone.png` va `04_Game_Card/Game_Card_States_Annotated.png`.

### Card tarkibi
1. Cover/illustration (2D yoki 3D), card yuqori qismida.
2. Holat badge’i: Yangi / Davom etmoqda / Bajarilgan / Bloklangan.
3. Mukofot badge’i: coin belgisi + `+N`.
4. O‘yin nomi.
5. Kurs yo‘nalishi chipi.
6. Bir qator yoki ikki qatorli qisqa tavsif.
7. Progress (`3/10`) — faqat boshlangan o‘yinlarda.
8. Play/Continue/Replay tugmasi.

### Card holatlari

| Holat | Vizual | CTA | Progress |
|---|---|---|---|
| Yangi | normal cover, yashil `Yangi` badge | `O‘ynash` | ko‘rsatilmaydi yoki `0/10` |
| Davom etmoqda | normal cover, ko‘k badge | `Davom etish` | ko‘rsatiladi |
| Bajarilgan | green tint/check icon | `Qayta o‘ynash` (agar ruxsat bo‘lsa) | `10/10` yoki 100% |
| Bloklangan | desaturated/grey cover, lock overlay | disabled; sababini ko‘rsatish | ko‘rsatilmaydi |

### Mukofot
- Har bir o‘yin uchun beriladigan coin miqdori card’da ko‘rinadi.
- Miqdor o‘yin yakunlanganda beriladigan mukofotmi yoki maksimal mukofotmi — product/backend tomonidan aniqlanib label qilinsin. Noaniq bo‘lsa, faqat `+N coin` ko‘rsating va bu o‘yin mukofoti ekanini tooltip bilan tushuntiring.
- Coin miqdori mockup’dan hardcode qilinmasin.

### O‘lchamlar
- Desktop grid card: 260–320 px kenglik; cover 16:9; card padding 12–16 px.
- Desktop “Davom ettirish” compact row: 1 qatorda cover + metadata + progress + CTA.
- Tablet: 2 ustun, card min-width 250 px.
- Mobile catalog: full-width row card yoki 1 ustun card; cover 88–112 px (row format) yoki 16:9 top image (stacked format).
- Touch target minimum 44×44 px.

---

## 6. Qidiruv, filter va holatlar

### Search
- Input clearable bo‘lsin.
- Debounce 200–300 ms (agar server qidiruvi bo‘lsa) yoki client filter.
- Query o‘yin nomi va kerak bo‘lsa qisqa tavsifga ta’sir qiladi.

### Empty search state
- Icon: search.
- Sarlavha: `O‘yin topilmadi`.
- Matn: `Boshqa so‘z bilan qidirib ko‘ring yoki filtrlarni tozalang.`
- CTA: `Filtrlarni tozalash`.

### Loading state
- Game card skeleton: cover skeleton, title line, metadata chip, progress/CTA placeholder.
- Layout o‘lchami yuklanishdan oldin ham saqlansin; content jump bo‘lmasin.
- Spinner-only sahifa ishlatmang; skeleton cards afzal.

### Network/error state
- `O‘yinlarni yuklab bo‘lmadi. Internetni tekshirib, qayta urinib ko‘ring.`
- CTA: `Qayta urinish`.

### Empty sections
- “Davom ettirish” bo‘limi bo‘sh bo‘lsa yashiriladi.
- Tavsiya bo‘limida mos yangi o‘yin bo‘lmasa, bo‘lim yashiriladi yoki product qaroriga ko‘ra umumiy katalog CTA ko‘rsatiladi.

---

## 7. Responsive qoidalar

### Desktop ≥ 1280 px
- Yuqori navbar to‘liq.
- Hero gorizontal, 160–190 px balandlik atrofida.
- Global course chips bitta qatorda.
- Davom ettirish: 2 compact card yonma-yon.
- Tavsiyalar: 4 card grid.
- Katalog: 3–4 ustun grid.
- Content max-width 1600 px; viewport bo‘yicha markazlash.

### Tablet 768–1279 px
- Navbar Junior responsive patterniga mos.
- Hero matn + mascot; elementlar ustma-ust tushmasin.
- Course chips 2 qator yoki gorizontal scroll.
- Davom ettirish 1–2 card.
- Tavsiyalar 2 card grid/carousel.
- Katalog 2 ustun.

### Mobile ≤ 767 px
- Mobile header: menu, Junior logo, coin, notification, avatar.
- Sidebar yo‘q.
- Hero ixcham; matn va mascot bir-birini yopmasin.
- Course chips horizontal scroll; full labels.
- Davom ettirish vertical compact cards.
- Tavsiyalar horizontal carousel (1.1 card preview) yoki stacked; 1.1 card tavsiya etiladi.
- Katalog search va filter bir qatorda yoki search full width + filter icon.
- Katalog cards 1 ustun.
- Tugmalar va interaktiv elementlar kamida 44 px touch target.
- Body horizontal overflow bo‘lmasin; faqat chip strip/carousel o‘z ichida scroll qiladi.

---

## 8. UX copy — standart Uzbek labels

| Joy | Matn |
|---|---|
| Page title | GameLab |
| Hero subtitle | Kurslaring bo‘yicha qiziqarli o‘yinlar o‘yna, bilimlaringni mustahkamla va mukofotlar yut! |
| Global all | Barcha yo‘nalishlar |
| Continue | Davom ettirish |
| Recommendations | Siz uchun tavsiya etiladi |
| Catalog | Barcha o‘yinlar |
| Search | O‘yin qidirish... |
| Filters | Filtrlar |
| Sort | Saralash |
| Play | O‘ynash |
| Continue CTA | Davom etish |
| Completed | Bajarilgan |
| Locked | Bloklangan |
| New | Yangi |
| No results | O‘yin topilmadi |
| Clear filters | Filtrlarni tozalash |
| Retry | Qayta urinish |

Ruscha `Расписание занятий` / `История монет` label’lari ishlatilmasin. Ularning o‘zbekcha ekvivalentlari `Dars jadvali` va `Mening yutuqlarim` (yoki LMS’da tasdiqlangan rasmiy label) bo‘lsin.

---

## 9. Ma’lumot modeli (frontend uchun tavsiya)

```ts
type GameStatus = 'new' | 'in_progress' | 'completed' | 'locked';

type Game = {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  coverUrl: string;
  rewardCoins: number;
  status: GameStatus;
  progressCurrent?: number;
  progressTotal?: number;
  startedAt?: string | null;
  completedAt?: string | null;
  isRecommended?: boolean;
  isPopular?: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
  isLocked: boolean;
  lockReason?: string;
};
```

### Section selection pseudologic

```ts
const continueGames = games.filter(
  game => game.status === 'in_progress' && (game.progressCurrent ?? 0) > 0
);

const recommendedGames = games.filter(
  game => game.status === 'new'
    && game.startedAt == null
    && (game.progressCurrent ?? 0) === 0
    && game.isRecommended === true
);

// Global course chip filters every section.
const applyGlobalCourse = (items, selectedCourseId) =>
  selectedCourseId === 'all'
    ? items
    : items.filter(game => game.courseId === selectedCourseId);

// Catalog search/filter is applied only to the catalog list.
```

`recommendedGames` va `continueGames` ID’lari kesishmasligi kerak. Agar backend recommendation list ichida boshlangan o‘yin qaytarsa, frontend uni chiqarib tashlashi shart.

---

## 10. Accessibility va quality checklist

- [ ] Oq matnli primary CTA faqat `#C2410C` yoki undan quyuq fonda.
- [ ] Warning sariq fon va to‘q matn bilan; primary orange’dan farq qiladi.
- [ ] Kurs chiplari keyboard focus va selected state’ga ega.
- [ ] Icon-only button’larda accessible label bor.
- [ ] Har bir o‘yin cover’i mazmunli alt text oladi; dekorativ mascot alt bo‘sh bo‘lishi mumkin.
- [ ] Mobile touch target kamida 44×44 px.
- [ ] Card description mobile’da kamida 14 px.
- [ ] Kurs chip label’lari mobile’da qisqartirilmaydi.
- [ ] Qidiruv natijasi topilmagan va loading holatlari mavjud.
- [ ] Locked state sababi foydalanuvchiga tushuntiriladi.
- [ ] Coin mukofoti har bir tegishli card’da ko‘rinadi.
- [ ] Tavsiya qilingan o‘yinlar boshlanmagan o‘yinlardan iborat.
- [ ] Davom ettirish va tavsiya bo‘limlarida duplicate game ID yo‘q.
- [ ] Sidebar yo‘q; Junior top navbar saqlangan.
- [ ] Barcha ko‘rinadigan UI matnlari o‘zbek lotinida.

---

## 11. Assetlardan foydalanish va naming

Assetlar `05_Assets/` ichida guruhlangan:
- `3D/` — Junior robot, coin, trophy, gift, gem va sprite sheet.
- `2D/` — play, gamepad, math, English, code, puzzle, search/filter va boshqa UI iconlar.
- `Course_Icons/` — kursga oid iconlar (yangi iconlar shu yerga qo‘shilsin).
- `Backgrounds/` — hero/card backgroundlar.

Naming standard:
- `mascot_wave.png`, `mascot_gamer.png`, `coin_star.png`, `trophy_gold.png`.
- `course_math.png`, `course_english.png`, `course_robotics.png`, `course_digital_skills.png`, `course_logic.png`.
- `game_<slug>_cover.webp` (production coverlar uchun).

PNG assetlar transparent background bilan eksport qilinsin. Sprite sheet faqat reference sifatida; production UI’da kerakli individual asset ishlatilsin. Raster coverlar uchun WebP hamda 2x density variantlarini tayyorlash mumkin.

---

## 12. Paketdagi asosiy fayllar

- `02_Device_Mockups/Desktop_Final.png` — final desktop reference.
- `02_Device_Mockups/Mobile_Final.png` — final mobile reference.
- `02_Device_Mockups/Tablet_Final.png` — tablet reference (final board crop).
- `01_Final_References/Responsive_Design_System_Board.png` — responsive va design-system overview.
- `01_Final_References/UX_UI_Review_Board.png` — feedback asosida ko‘rib chiqilgan board.
- `04_Game_Card/Game_Card_Standalone.png` — alohida game card.
- `04_Game_Card/Game_Card_States_Annotated.png` — card anatomy va state’lar.
- `05_Assets/` — 3D/2D assetlar va catalog.
- `00_START_HERE/IMPLEMENTATION_CHECKLIST.md` — agent uchun bajarish tartibi.

**Prioritet:** agar eski exploratory board yoki eski guide ushbu FINAL hujjatga zid bo‘lsa, ushbu `FINAL_GAME_LAB_DESIGN_SPEC.md` ustun hisoblanadi.
