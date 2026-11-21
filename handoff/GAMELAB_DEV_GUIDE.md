# GameLab — katalog va o‘yin ekranlari bo‘yicha qo‘llanma (B variant)

**Uch fayl birga beriladi:**

| Fayl | Nima |
|---|---|
| `GameLab.html` | Katalog va o‘yin ekranlarining ishlaydigan reference'i (namuna, internet kerak emas) |
| `GAMELAB_DEV_GUIDE.md` | Shu hujjat: dizayn tizimi, katalog qoidalari, ekranlarning shartnomaga bog‘lanishi |
| `GameLab-JSX-AUTHOR-CONTRACT.md` | JSX o‘yinlar shartnomasi (tahrir 1.2, ruscha) — o‘yin mualliflari va runtime uchun |

**Qaysi hujjat nimani belgilaydi.**
- **O‘yin ma’lumotlari, urinish hayot sikli, saqlash holatlari, progress** — faqat **shartnoma** belgilaydi. Bu hujjat va HTML uni o‘zgartirmaydi.
- **Vizual uslub, katalog tuzilmasi, karta holatlari** — shu hujjat va HTML.
- Ikkalasi zid bo‘lib qolsa, ma’lumot va hayot sikli bo‘yicha shartnoma ustun.

**GameLab = GameCenter.** Mahsulotning yangi nomi GameLab. Shartnomadagi texnik identifikatorlar (`@junior-gamecenter v1`, `gameCenterManifest`) o‘zgarmagan.

**HTML — JSX o‘yin emas.** U katalog va o‘yin ichi ekranlarining namunasi; hosti (saqlash) ham soxta (mock). Uni ishlab chiqarishga to‘g‘ridan-to‘g‘ri qo‘ymang: asosiy saytning komponent va tokenlariga ko‘chiring.

Dizayn manbasi: Figma "B · O‘yin" (3D tugmalar, segmentli progress, natija pastdan chiquvchi rangli panelda) va GameLab sahifa spetsifikatsiyasi.

---

## 1. HTML'ni ochish va o‘qish

- `GameLab.html` ni Chrome/Edge/Safari'da oching. Server va internet kerak emas.
- Hamma ma’lumot namunaviy: ism (Alisher), o‘quvchining kurslari (Matematika, Dasturlash), o‘yinlar va savollar.
- **GameLab'da coin, balans va mukofot yo‘q.** Kartalarda, navbarda va yakun ekranida ular ko‘rsatilmaydi.
- Natijalar brauzer `localStorage`'ida (`junior-gamelab-prototype-b-v3`). Tiklash: sahifa pastidagi "Interaktiv prototip · B variant" → "Demo natijalarini tiklash".
- Shu menyuda **saqlash rejimi** almashtiriladi: "Saqlash: normal", "internet yo‘q (navbat)", "server xatosi". Shu bilan o‘yin ichidagi `saving / queued / saved / error` holatlari va "Qayta yuborish" ko‘rinadi.
- Kodda qidirish uchun belgilar:

| Qidiring | Nima bor |
|---|---|
| `:root{--brand` | Barcha dizayn tokenlari |
| `const GRADES`, `gradeText()` | Har bir o‘yin uchun tavsiya etilgan sinflar `[dan, gacha]` (namunaviy qiymatlar) va kartadagi yorliq matni |
| `const gameData`, `const games` | 24 ta o‘yin metadatasi (kurs, qiyinlik, tavsiya bayrog‘i, `requires`, `kind`, `levelIds`) |
| `function status(` | Karta holatini hisoblash (5 ta holat) |
| `function recommendedGame` | Kurslar bo‘yicha tavsiya qoidasi |
| `LESSON CONTENT (demo)` | Namunaviy o‘yin ekranlarining mazmuni (6 kurs × 15 ekran) |
| `LESSON PLAYER` | O‘yin ekrani dvigateli |
| `MOCK HOST` | `onAttemptStart/End` va `saveState` ning soxta hosti |
| `FIGMA "B · O‘yin" LAYER` | Sahifa darajasidagi 3D uslub qatlami |

---

## 2. Dizayn tokenlari

### 2.1 Ranglar

| Token | HEX | Qayerda | Eslatma |
|---|---|---|---|
| `--brand` | `#FA4F28` | Progress segmenti, dekor, ikonka foni, tanlangan chip chegarasi | Oq matn bilan **3.38:1** — kichik matn va oq matn uchun ishlatmang |
| `--brand-strong` | `#DC3A12` | Oq matnli asosiy tugma | Oq matn bilan **4.51:1**. Figma'dagi `#FA4F28` ning kontrastli varianti |
| `--brand-edge` | `#AE2C0B` | Asosiy tugmaning pastki 3D qirrasi | |
| `--action` | `#C9300B` | Havola ko‘rinishidagi matn ("Barchasini ko‘rish") | Och fonda 4.85:1 |
| `--brand-tint` | `#FFEDE8` | Tanlangan chip foni, "Mashq" yorlig‘i, xato foni | Ustida `#B3290A` matn (5.72:1) |
| `--brand-soft` | `#FF8B71` | "Qayta urinish" tugmasi | Ustida **to‘q** matn `#1E1B39` (7.23:1) |
| `--purple` / `--purple-edge` | `#6C47FF` / `#5233D6` | Tanlangan javob, fokus, raqam kartasi | Oq matn bilan 5.27:1 |
| `--purple-tint` | `#EFEBFF` | "Eslaymiz" yorlig‘i, "O‘ynalgan" belgisi | Ustida `#4A2FD1` (6.87:1) |
| `--green` | `#2FA84F` | To‘g‘ri javob chegarasi, check foni | Oq matn uchun **ishlatmang** (3.07:1) |
| `--green-strong` | `#1C7F38` | "Davom etish" (to‘g‘ri panel) tugmasi | Oq matn bilan 5.07:1 |
| `--green-tint` | `#E6F6EB` | To‘g‘ri javob foni | Ustida `#1F7A3A` |
| `--ink` | `#1E1B39` | Sarlavha va asosiy matn | |
| `--muted` | `#6B6985` | Yordamchi matn | Oq fonda 5.27:1 |
| `--line` / `--line-3d` | `#E4E3EE` / `#D3D2E3` | Chegara / 3D pastki qirra | |
| `--lilac`, `--stage`, `--bg` | `#F5F4FC`, `#ECEDF3`, `#F3F3F8` | Panel foni, o‘yin oynasi foni, sahifa foni | |
| `--logo` | `#FF6A1A` | Logotip rangi | |

**Kontrast qarori.** Figma'da asosiy tugma `#FA4F28` + oq matn. Bu 3.38:1 beradi. Shu sabab oq matnli tugmalarda `--brand-strong` (`#DC3A12`, 4.51:1) ishlatilgan. `#FA4F28` faqat matnsiz joylarda qoldi. Dizayn jamoasi aniq Figma rangini talab qilsa, tugma matnini katta va qalin (≥ 18.66 px bold) qiling.

### 2.2 Tipografiya

- Shrift: **Aeonik** (Bold, Regular); zaxira `Aeonik, Nunito, Inter, "Segoe UI", sans-serif`.
- **Aeonik HTML ichida yo‘q** (pullik shrift). HTML'da zaxira Nunito ko‘rinadi. Asosiy saytda Aeonik ulangan bo‘lsa, `--font` tokeni uni o‘zi oladi.
- O‘yin ekrani (desktop → mobil): savol 26 → 22 px / 800; yorliq 12.5 px / 800; izoh 15 px; javob varianti 17 px; katta raqam 38 → 30 px; tugma 16 → 15 px.
- Katalog: H1 43 px, bo‘lim sarlavhasi 23 → 20 px, karta sarlavhasi 18–20 px, tavsif 13–14 px (mobil ≥ 14 px).

### 2.3 Radius va 3D qoidasi

- Radius: tugma/javob 13–14 px, karta 16–18 px, o‘yin oynasi 22 px, pill 999 px.
- **3D qoida** (butun GameLab uchun): `border: 2px solid var(--line); border-bottom: 4px solid var(--line-3d)`. Bosilganda element 2–3 px pastga tushadi. Asosiy tugmada qirra `--brand-edge`.
- Holatlar: tanlangan — `--purple`; to‘g‘ri — `--green`; xato — `--brand`; o‘chirilgan tugma — `#ECEBF5` fon, `#7D7A99` matn.

---

## 3. Katalog (sahifa)

Tartib: Junior navbar → hero → global kurs chiplari → "Davom ettirish" → "Siz uchun tavsiya etiladi" → "Barcha o‘yinlar".

- **Chap sidebar yo‘q.** Dashboard statistikasi yo‘q.
- **Navbar:** logo; `Dars jadvali`, `Mening yutuqlarim`, `GameLab` (faol); o‘ngda bildirishnoma va profil. **Coin hisoblagichi, energy hisoblagichi yo‘q.**
- **Interfeys tili:** katalog faqat o‘zbek lotin tilida (3.4-bandga qarang).

### 3.1 O‘yinlar va kurslar

O‘yinlar **kurslarga bog‘langan**, lekin faqat katalog darajasida (shartnoma 1-bo‘lim):
- Kurslar: Matematika, Ingliz tili, Dasturlash, Robototexnika, Raqamli ko‘nikmalar, Mantiq.
- O‘yinning kurslari (`courseIds`) — platforma metadatasi. Ular manifest'da emas va JSX'ga berilmaydi.
- **Tavsiya** o‘quvchi yozilgan kurslardan olinadi (HTML'da namuna: Matematika va Dasturlash; bo‘lim tagida "Sening kurslaring bo‘yicha tanlandi: …").
- O‘yin dars emas: kurs progressiga ta’sir qilmaydi, baho va mukofot bermaydi.

### 3.2 Bo‘limlar va filtr qoidalari

| Qoida | Tavsif |
|---|---|
| Global kurs chipi | Tanlansa "Davom ettirish", "Tavsiya" va "Barcha o‘yinlar" shu kurs bo‘yicha filtrlanadi. Default — "Barcha yo‘nalishlar". Chiplar gorizontal scroll, nomlar qisqartirilmaydi. |
| Katalog qidiruvi va filtrlari | **Faqat** "Barcha o‘yinlar" ga ta’sir qiladi. Global kurs tanlovi katalogga ham qo‘llanadi. |
| "Davom ettirish" | `in_progress` va `played` holatidagi o‘yinlar, oxirgi o‘ynalgani birinchi (ko‘pi bilan 2 ta). Bo‘sh bo‘lsa bo‘lim yashiriladi. Tugma o‘yinni **ochadi**, o‘yin ichidagi joyni **tiklamaydi** (checkpoint asosiy shartnomada yo‘q). |
| "Siz uchun tavsiya etiladi" | Holati `new`, o‘quvchining kurslaridan, bloklanmagan o‘yinlar. "Davom ettirish" bilan ID kesishmaydi. Muharrir bayrog‘i (`recommended`) tartibda yuqoriga chiqaradi. Bo‘sh bo‘lsa bo‘lim yashiriladi. |
| Saralash | Tavsiya bo‘yicha (o‘quvchining kurslari avval), Yangi, Nomi bo‘yicha. |
| Filtr oynasi | Kurs, Holat, Qiyinchilik, **Sinf** (1–11; o‘yin tanlangan sinfni qamrab olsa chiqadi: `gradeFrom ≤ n ≤ gradeTo`), "Faqat tavsiya etilganlar"; `Tozalash` va `Natijalarni ko‘rish`. |

### 3.3 O‘yin kartasi va holatlar

Tarkib: cover (16:9), holat belgisi, nom, kurs yorlig‘i va **sinf yorlig‘i** (`3–5-sinf` yoki `2-sinf`; kurs yorlig‘i yonida, bir qatorda, kerak bo‘lsa pastga o‘tadi), 1–2 qatorli tavsif, progress (o‘ynalgan bo‘lsa), qiyinlik belgisi (Oson / O‘rtacha / Qiyin) va **bitta 3D tugma** (matn + ikonka birga: `O‘ynash ▶`, `Davom etish ▶`, `Yana o‘ynash ▶`, `Qayta o‘ynash ↻`, bloklangan holatda kulrang `Bloklangan 🔒`). Alohida yumaloq ikonka tugma yo‘q. Ixcham "Davom ettirish" kartasida ham xuddi shu tugma ishlatiladi; mobilda (≤ 640 px) u kartaning pastida butun kenglikda turadi. Tugma balandligi ≥ 44 px. Karta tugmasi rangi Figma'dagi `#F2541B` (qirra `#C23E11`); oq matn bilan kontrast ~3.5:1 — qalin 14 px matn uchun katta matn chegarasidan biroz past, shuning uchun IT bu rangni alohida tasdiqlashi kerak.

Holat **platforma tomonidan** `progress` va manifest'dan hisoblanadi (shartnoma 8.1-bo‘lim):

| Holat | Belgi | Qachon | Progress | Tugma |
|---|---|---|---|---|
| `new` | "Yangi" | Hech qanday urinish yo‘q | yashirin | `O‘ynash` |
| `in_progress` | "Davom etmoqda" | Darajali o‘yin, urinish bor, hamma daraja o‘tilmagan | **Darajalar soni** (`2/3 daraja`), segmentlar daraja bo‘yicha | `Davom etish` |
| `played` | "O‘ynalgan" | Darajasiz o‘yin (`endless`/`free`), urinish bor | **Rekord** (`Rekord: 5/6`) va urinishlar soni | `Yana o‘ynash` |
| `completed` | "Bajarilgan" | Darajali o‘yin, hamma daraja o‘tilgan | `3/3 daraja` | `Qayta o‘ynash` |
| `locked` | "Bloklangan" | Platforma qarori (oldingi o‘yin, yosh, maintenance); sabab yoziladi ("Avval «…»ni yakunla.") | yashirin | o‘chirilgan |

- Progress foiz emas, **daraja soni**. O‘yin ichidagi qadamlar kartada ko‘rsatilmaydi.
- `locked` va tavsiya ma’lumotlari JSX'dan so‘ralmaydi.

### 3.4 Til

Shartnoma bo‘yicha **o‘yinlar matni UZ/RU/EN** bo‘lishi va `lang` bo‘yicha ko‘rsatilishi shart. HTML'dagi katalog va namunaviy o‘yin mazmuni faqat o‘zbek tilida — bu reference cheklovi. Haqiqiy katalog til tanlovini LMS'dan oladi.

### 3.5 Yuklanish, bo‘sh holat va xato

- **Yuklanish:** skeleton kartalar (o‘lcham saqlanadi). Spinner-only ishlatmang.
- **Qidiruv natijasi yo‘q:** "O‘yin topilmadi" + "Filtrlarni tozalash".
- **Tarmoq xatosi:** "O‘yinlarni yuklab bo‘lmadi. Internetni tekshirib, qayta urinib ko‘ring." + "Qayta urinish".
- Prototipda ularni ko‘rish: sahifa pastidagi "Interaktiv prototip · B variant".

---

## 4. O‘yin ekrani (B uslubi) va shartnomaga bog‘lanishi

Kartadagi `O‘ynash / Davom etish` → o‘yin tafsilotlari → `Boshlash` → **to‘liq ekranli o‘yin oynasi**. HTML'dagi namunaviy o‘yin — 15 ekranli savol-mashq ketma-ketligi. Bu **namunaviy mazmun**: haqiqiy o‘yinlarning mexanikasi muallifga bog‘liq (shartnoma 1 va 10-bo‘limlar). Quyida **shartnoma talablari** va **uslub tavsiyalari** ajratilgan.

### 4.1 Shartnoma talablari (o‘yin ekranida HTML nimani ko‘rsatadi)

| Talab | HTML'da |
|---|---|
| Urinish chegarasi: boshlash tugmasi bosilganda `onAttemptStart` | O‘yinni ochish (`Boshlash`) — yangi `attemptId` (UUID) va `levelId` |
| Yangi partiya/qayta o‘ynash — yangi `attemptId` | "Qaytadan o‘tish" yangi urinishni boshlaydi |
| Bitta urinish — bitta yakun `onAttemptEnd` | Yakun ekraniga yetganda `success` (darajali) yoki `finished` (darajasiz); chiqishda `aborted` |
| Chiqish: faol urinishda bir marta `aborted` + ma’lum ko‘rsatkichlar, so‘ng `onExit` | `X` va `Esc`: `aborted` (`steps`, `mistakes`), keyin yopiladi |
| Yakunlangan natija chiqishda `aborted` ga almashmaydi | Yakun ekranidan chiqish yangi natija yaratmaydi |
| Faol vaqt: pauza va yashirin tab kirmaydi | `visibilitychange` bilan `durationSeconds` hisoblanadi |
| **Saqlash holati** `saveState` (`idle/saving/queued/saved/error`) o‘yin ichida ko‘rinadi; `queued` ≠ `saved` | Ekran tepasida holat belgisi: "Boshlanish saqlanmoqda…", "yuborish kutilmoqda", "Natija saqlandi", "saqlanmadi" |
| `start` xatosi o‘yin davomida ko‘rinadi; qayta yuborish `onRetrySave(attemptId)` | "Boshlanish saqlanmadi · Qayta yuborish"; start xatosida `end` ham `START_NOT_SAVED` xatosi |
| Yangi partiya eski saqlanmagan natijalarni yashirmaydi | "Oldingi urinishlar: N ta natija saqlanmagan · Qayta yuborish" va o‘yin tafsilotlarida "Saqlanmagan natijalar" ro‘yxati |
| Checkpoint yo‘q: yarim yo‘lda to‘xtatilgan o‘yin tiklanmaydi | To‘xtatilgan urinish "To‘xtatildi" bo‘lib yoziladi, keyingi safar boshidan boshlanadi |
| `progress`: `attemptsCount`, `lastResult`, `bestResult`, `completedLevelIds` | O‘yin tafsilotlari: urinishlar, eng yaxshi natija, oxirgi natija, daraja belgilari |
| Coin, mukofot, dars progressi yo‘q | Hech qaerda ko‘rsatilmaydi |
| Mobil, touch, ovozsiz ishlash, chiqish tugmasi, boshlashdan oldin ko‘rsatma | Bor (ovoz tugmasi ixtiyoriy, signal Web Audio bilan) |

**Namunaviy ko‘rsatkichlar (demo):** `steps` (0–15), `firstTryGroups` (0–6, birinchi urinishda to‘g‘ri mashq guruhlari), `mistakes`. Rekord qoidasi: `outcomes: ['success','finished']`, `orderBy: firstTryGroups desc, durationSeconds asc`. Darajali o‘yinlar HTML'da 3 darajali; hamma daraja bir xil namunaviy mazmunni ochadi.

**Saqlash hosti (mock).** Haqiqiy platforma o‘rnini HTML'dagi `MOCK HOST` bosadi: u `onAttemptStart/End` ni qabul qiladi, `saveState` holatlarini almashtiradi va natijani `progress`'ga qo‘shadi (faqat `saved` bo‘lgandan keyin). Reload'da `queued` operatsiyalar yo‘qoladi; haqiqiy platformada navbat barqaror bo‘lishi shart.

### 4.2 Uslub tavsiyalari (shartnoma Ilova A)

Mualliflar o‘yinni erkin bezashi mumkin (shartnoma 10-bo‘lim). GameLab'ga bir xil ko‘rinish berish uchun HTML'dagi uslub tavsiya etiladi:

- Oq kartochka (max 980 × 760), atrofi `--stage` fon; mobilda (≤ 640 px) to‘liq ekran. Yuqori panel: `X`, segmentli progress, `n/15`, ovoz tugmasi.
- **Segmentli progress:** o‘tilganlari va joriysi `--brand`, kelgusilari `#E8E7F3`.
- **Javob paneli** (pastdan chiqadi, 0.28 s): to‘g‘ri — yashil "Barakalla!" + `Davom etish`; xato — marjon "Maslahat" + `Qayta urinish`. Xato tanlangan variant o‘chiriladi, javob ochilmaydi.
- `Orqaga` tugmasi, `Enter` bilan davom etish.
- Yorliqlar: "Dars savoli", "Eslaymiz", "Mashq n / 6".
- Namunaviy ekran turlari (mazmun, talab emas): tanlash (A/B/C/D), bo‘shliq qo‘yish, raqam yozish, moslash, savatlarga ajratish, yakun (natija, asosiy qoidalar, keyingi mavzu). HTML'da ular `intro / choice / build / input / match / sort / summary` deb ataladi.

---

## 5. Karta ma’lumotlari qayerdan olinadi

Alohida "o‘yin API'si" o‘ylab topilmagan: ma’lumot shartnomadagi manbalardan yig‘iladi.

| Karta/dialog maydoni | Manba |
|---|---|
| Nom (UZ/RU/EN), yosh, `kind`, ko‘rinish yo‘nalishi, qurilmalar | **Manifest** (`title`, `ageRange`, `kind`, `orientation`, `devices`) |
| Darajalar ro‘yxati | Manifest `levelIds` |
| Cover, kurslar (`courseIds`), **tavsiya etilgan sinflar (`gradeFrom`/`gradeTo`)**, tavsiya/mashhur bayroqlari, bloklash sharti va sababi, qiyinlik, tavsif | **Platforma metadatasi** (nashr paytida; manifest'da emas) |
| `attemptsCount`, `lastResult`, `bestResult`, `completedLevelIds` | **`progress`** (shartnoma 8-bo‘lim) |
| Karta holati (`new`…`locked`) | Platforma `progress` + manifest + metadata'dan hisoblaydi |
| Tavsiya, "Davom ettirish" | Platforma: o‘quvchining kurslari ∩ `courseIds`; holatlar bo‘yicha |

```ts
// Platforma metadatasi (nashr paytida to‘ldiriladi; JSX'ga berilmaydi)
type CatalogMeta = {
  gameId: string;
  courseIds: string[];            // [] bo‘lsa — faqat umumiy katalogda, tavsiyada yo‘q
  gradeFrom: number;              // 1–11; kartada "3–4-sinf" (gradeFrom === gradeTo bo‘lsa "2-sinf")
  gradeTo: number;
  coverUrl: string;
  description: { uz: string; ru: string; en: string };
  difficulty?: 'easy' | 'medium' | 'hard';
  isRecommended?: boolean;        // muharrir bayrog‘i
  isPopular?: boolean;
  requiresGameId?: string | null; // bloklash sharti
  lockReason?: string;
};
```

Boshqa ma’lumot turlari (`Manifest`, `StoredResult`, `progress`, `saveState`, callback'lar) — shartnomaning 4–8-bo‘limlarida; bu yerda takrorlanmaydi.

Hozirgi HTML'dagi `saved` ob’ekti (`g[gameId].attempts/completed/last/best/lastAt`, `muted`) — faqat `progress` o‘rnini bosuvchi vaqtinchalik saqlash.

---

## 6. Responsive

| Kenglik | Katalog | O‘yin oynasi |
|---|---|---|
| ≥ 1280 px | To‘liq navbar; chiplar bir qatorda; "Davom ettirish" 2 karta; tavsiya 4 ustun; katalog 4 ustun; max 1440 px | Kartochka 980 px gacha, markazda |
| 768–1279 px | Navbar ixchamlashadi (≤ 1000 px da menyu tugmasi); tavsiya va katalog 2 ustun | Kartochka |
| ≤ 767 px | Menyu, logo, bildirishnoma, avatar; chiplar gorizontal scroll (**nomlar qisqartirilmaydi**); tavsiya — gorizontal carousel (~1.1 karta); katalog 1 ustun | ≤ 640 px: to‘liq ekran, javoblar 1 ustun, javob paneli tugmasi to‘liq kenglikda |

Tekshirilgan kengliklar: 320, 360, 390, 768, 820, 1024, 1280, 1440 px — gorizontal overflow yo‘q.

---

## 7. Accessibility

Bajarilgan:
- Barcha interaktiv elementlar ≥ 44 × 44 px (shu jumladan `+` bo‘shliq tugmalari va "Qayta yuborish").
- Icon-only tugmalarda `aria-label`; ovoz tugmasida `aria-pressed`.
- Progress `role="progressbar"`; javob va savat tugmalarida `aria-pressed`.
- Javob paneli va saqlash holati `role="status"` — ekran o‘qish dasturi e’lon qiladi.
- Fokus halqasi 3 px `--purple`; dialog fokusni ushlaydi (`<dialog>`), `Esc` yopadi.
- Rang yagona signal emas: to‘g‘ri/xato holatida ikonka ham o‘zgaradi.
- Matn kontrasti ≥ 4.5:1 (2.1-bandga qarang). `prefers-reduced-motion`: animatsiyalar o‘chadi.

Ishlab chiqarishda qo‘shish kerak:
- Cover rasmlari uchun mazmunli `alt` (hozir SVG `aria-label`).
- Raqam kiritish maydoni uchun haqiqiy `<label>` (hozir ko‘rinmas `sr-only` yozuv).
- Moslash/savat turlari uchun klaviatura bo‘yicha to‘liq tekshiruv.

---

## 8. Brend va asset'lar

| Asset | Holat |
|---|---|
| **Junior logotipi** (ikonka + "Junior" yozuvi) | Foydalanuvchi bergan rasm asosida **vektor SVG qilib qayta chizildi** (ikonka `<symbol id="junior-icon">`, yozuv — matn). Asl SVG fayli bilan almashtirish tavsiya etiladi — nuqta-nuqta aniq bo‘ladi. |
| Logo **ikonkasi** (alohida) | Favicon va footer'da ishlatilgan; to‘liq logo (ikonka + yozuv) — navbarda. |
| Mascot (robot) | **Vaqtinchalik** (dizayn paketidagi PNG). Platformadagi rasmiy mascot bilan almashtiring. |
| Kurs ikonkalari | Dizayn paketidan (PNG). Platformadagi rasmiy ikonkalar bilan almashtiring. |
| Kubok | Dizayn paketidan (PNG). |
| O‘yin cover'lari | HTML ichidagi SVG (`artwork()`); ishlab chiqarishda `game_<slug>_cover.webp` (2x). |
| O‘yin oynasi ikonkalari | Inline SVG, `stroke` uslubi (`iconPaths`). Platformaning ikonka to‘plami bo‘lsa, shuni ishlating. |
| Dars sahnalari (Quyosh–Yer, harflar, qalqon, kod) | Inline SVG (`LESSON_ART`). |
| Shrift | Aeonik (HTML'da yo‘q). Zaxira Nunito (SIL OFL) HTML ichida. |

---

## 9. Ishlab chiqarishga ko‘chirishda diqqat

1. **Reference va namuna.** UI, holatlar, qoidalar, matnlar — reference. O‘yin ro‘yxati, ism, kurslar, savollar, natijalar — namuna.
2. **Namunaviy o‘yin mazmuni** 6 ta kurs uchun yozilgan; faqat Matematika Figma'dagi ekranlarga mos. Qolgan 5 kurs mazmuni pedagogik tekshiruvdan o‘tmagan. Haqiqiy o‘yinlar JSX bo‘lib, shartnoma bo‘yicha yoziladi.
3. **Tillar:** HTML — faqat o‘zbekcha; haqiqiy o‘yinlar UZ/RU/EN bo‘lishi shart.
4. **Saqlash va progress** serverda; HTML'dagi `localStorage` va mock host'ni ko‘chirmang.
5. **Tovush:** Web Audio bilan generatsiya; haqiqiy ovoz fayllari yo‘q.
6. **Kontrast qarori** (2.1-band): tugma rangi Figma'dan biroz to‘qroq. Dizayn jamoasi bilan kelishib oling.
7. **Eski dizaynlar** qaytarilmaydi: sidebar, dashboard, energy hisoblagichi, coin, ruscha yorliqlar.
8. **Kelishilishi kerak:** `locked` va tavsiya qoidalari platforma tomonida; "Davom ettirish" tiklamaydi — ish joyini tiklash kerak bo‘lsa, shartnomadagi alohida kengaytma kerak.

---

## 10. Tekshiruv natijalari (Chrome, offline)

- 6 kurs namunasi boshidan oxirigacha o‘tkazildi, konsol xatosi yo‘q.
- Oqimlar: daraja bo‘yicha boshlash va yakunlash; chiqishda `aborted`; internet yo‘q → `queued`, tarmoq qaytganda yuborish; server xatosi → "Boshlanish saqlanmadi", `end` da `START_NOT_SAVED`, "Qayta yuborish"; saqlanmagan natijalar o‘yin tafsilotlarida.
- Holatlar: `new`, `in_progress`, `played`, `completed`, `locked`; tavsiya faqat o‘quvchining kurslaridan va bloklanmagan o‘yinlardan.
- 320–1440 px kengliklarda gorizontal overflow yo‘q, barcha tugmalar ≥ 44 px.
- Tashqi tarmoq so‘rovlari yo‘q.
