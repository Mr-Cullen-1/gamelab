# SUPERSEDED

Bu eski qo‘llanma. Yakuniy qarorlar uchun `../03_Brandbook/FINAL_GAME_LAB_DESIGN_SPEC.md` ni ishlating.

# GameLab — UX/UI Design Guide

**Loyiha:** Junior Academy ichidagi kurslarga bog‘langan o‘yinlar markazi.  
**Maqsad:** o‘quvchi kerakli o‘yinni tez topishi, boshlashi yoki davom ettirishi; interfeys esa Junior platformasining mavjud vizual tiliga mos qolishi.

## 1. Dizayn tamoyillari

- Chap vertikal sidebar ishlatilmaydi.
- Junior platformasining yuqori navbar’i saqlanadi: logo, asosiy navigatsiya, Energy, Coin, bildirishnomalar va profil.
- GameLab asosiy kontent maydonida to‘liq kenglikda ko‘rsatiladi.
- Birinchi navbatda o‘yin boshlashga yordam beradigan kontent; ortiqcha dashboard statistikasi yo‘q.
- Katta, aniq bosiladigan elementlar; matnlar qisqa va bolalar uchun tushunarli.
- Rangli 3D coverlar va 2D ikonlar o‘yinlarni farqlaydi, lekin UI ranglari izchil qoladi.

## 2. Ranglar

| Token | HEX | Qo‘llanishi |
|---|---|---|
| Primary Orange | `#FF6A00` | Asosiy CTA, tanlangan filter, Play tugmasi |
| Primary Light | `#FFE7D6` | Hero fonlari, yumshoq orange yuzalar |
| Text / Dark | `#0B1426` | Sarlavha va asosiy matn |
| Text Secondary | `#687280` | Tavsif va ikkilamchi matn |
| Background | `#F7F8FC` | Sahifa foni |
| Surface | `#FFFFFF` | Kartochka va panellar |
| Border | `#E5E7EB` | Chegaralar va ajratgichlar |
| Purple Accent | `#8B5CF6` | O‘yin illustratsiyalari va ikkilamchi aksent |
| Lavender Light | `#EDE9FF` | Yumshoq fon va teglar |
| Success | `#22C55E` | Muvaffaqiyat holati |
| Warning | `#F59E0B` | Ogohlantirish va mukofot holati |
| Error | `#EF4444` | Xatolik holati |
| Info Blue | `#3B82F6` | Ma’lumot va ayrim kurs ikonlari |

**Rang nisbati:** oq/och fon asosiy; orange faqat muhim harakatlar va faol holatlar uchun; purple/blue ko‘proq o‘yin coverlari va kurs ikonlarida.

## 3. Tipografiya

- Tavsiya etilgan shrift: **Nunito** (Junior vizual tiliga mos yumaloq, o‘qilishi oson shakl).
- H1: 32–40 px, Bold.
- H2: 24–28 px, Bold/Semibold.
- H3: 18–20 px, Semibold.
- Body: 14–16 px, Regular.
- Caption: 12–13 px, Regular.
- Sarlavhalarda qisqa va faol iboralar ishlatilsin: “Davom ettirish”, “Tavsiya etilgan o‘yinlar”, “Barcha o‘yinlar”.

## 4. Sahifa arxitekturasi

### 4.1 Yuqori navbar

Mavjud Junior navbar’i o‘zgarishsiz saqlanadi. GameLab uchun navbar ichida alohida faol navigatsiya elementi bo‘lishi mumkin. Navbar ostida chap sidebar yo‘q.

### 4.2 Hero banner

- GameLab nomi va gamepad belgisi.
- Qisqa matn: “Kurslaring bo‘yicha qiziqarli o‘yinlar o‘yna, bilimlaringni mustahkamla va mukofotlar yut!”
- Junior robot-mascot va dekorativ coin/star elementlari.
- Desktop’da gorizontal banner; tablet/mobile’da ixcham, matn va mascot ustma-ust tushmaydigan adaptiv joylashuv.

### 4.3 Kurs filtrlari

Default holat: **Barcha kurslar**. Kurslar: Matematika, Ingliz tili, Dasturlash, IT, Mantiq.
- Desktop: bitta qatorda chiplar.
- Tablet: sig‘masa keyingi qatorga o‘tadi yoki gorizontal scroll.
- Mobile: ixcham chiplar, gorizontal scroll; nomlar qisqartirilsa ham ma’nosi tushunarli bo‘lsin.

### 4.4 Davom ettirish

Faqat o‘quvchi oldin boshlagan o‘yinlari bo‘lsa ko‘rsatiladi. Har bir item’da cover thumbnail, nom, kurs tegi, progress/daraja va Play/Continue tugmasi bo‘ladi. Bo‘sh holatda bu bo‘lim yashiriladi yoki “Hali boshlanmagan o‘yinlar” kabi yengil CTA bilan almashtiriladi.

### 4.5 Tavsiya etilgan o‘yinlar

O‘quvchiga mos, yangi yoki ommabop o‘yinlar. Desktop’da 4 ta kartochka; tablet’da 2 ta; mobile’da 1 ta yoki swipe carousel. Tavsiya sababi majburiy emas, ammo “Yangi” / “Mashhur” badge ishlatilishi mumkin.

### 4.6 Barcha o‘yinlar katalogi

Katalog — barcha o‘yinlarni topish uchun asosiy joy. Unda qidiruv, filter va saralash bo‘ladi.

**Qidiruv:** o‘yin nomi bo‘yicha real-time yoki submit orqali qidirish; clear (X) tugmasi; natija topilmasa aniq empty state.

**Filterlar:**
- Kurs: Barchasi / Matematika / Ingliz tili / Dasturlash / IT / Mantiq.
- O‘yin turi: Puzzle / Hisoblash / Xotira / Tezkorlik / Simulyator (mavjud o‘yinlarga qarab).
- Daraja: Barchasi / Boshlang‘ich / O‘rta / Yuqori.
- Holat: Yangi / Davom etmoqda / Yakunlangan.

**Saralash:** Tavsiya etilgan, Yangi, Mashhur, A–Z.  
Faol filterlar chip ko‘rinishida chiqadi; “Tozalash” barcha tanlovlarni bekor qiladi.

## 5. O‘yin kartochkasi

Kartochkaning tavsiya etilgan tarkibi:
1. Cover rasm — o‘yinning asosiy vizual identifikatori.
2. Holat badge — “Yangi”, “Mashhur” yoki “Top” (faqat tegishli bo‘lsa).
3. O‘yin nomi.
4. Kurs tegi va ixtiyoriy o‘yin turi tegi.
5. 1–2 qatorli qisqa tavsif.
6. Progress bar va daraja (`3/10 daraja`) — progress mavjud bo‘lsa.
7. Play/Continue tugmasi.

**Interaksiya:** kartaning asosiy yuzasi ham o‘yinni ochishi mumkin; Play tugmasi alohida, aniq CTA bo‘lib qoladi. Hover’da yengil ko‘tarilish/shadow; focus’da ko‘rinadigan outline; bosilganda qisqa pressed state.

## 6. O‘yin sahifasi (detail)

Kartochka bosilganda o‘yin detail sahifasi yoki modal ochiladi. Unda: katta cover, nom, kurs va tur, qisqa tavsif, o‘yin qoidalari (kerak bo‘lsa), davomiylik yoki darajalar soni (ma’lumot mavjud bo‘lsa), joriy progress va katta “O‘ynash” / “Davom ettirish” tugmasi. O‘yin mexanikasining o‘zi LMS ichida ishga tushishi mumkin; GameLab katalogi faqat launch nuqtasi bo‘lib qoladi.

## 7. Qo‘shimcha imkoniyatlar

MVP uchun shart emas, keyingi bosqichlarda qo‘shish mumkin:
- Yutuqlar va badge’lar.
- Mavsumiy yoki haftalik challenge.
- O‘yinlar to‘plami / mavzu bo‘yicha kolleksiyalar.
- Sevimlilar (bookmark).
- “Yaqinda o‘ynalganlar”.
- O‘yin yakunlangandan keyingi natija va qayta o‘ynash CTA.

Reyting va ijtimoiy taqqoslash faqat mahsulot talabi bo‘lsa qo‘shilsin; asosiy GameLab sahifasini dashboardga aylantirmaslik kerak.

## 8. Responsive qoidalar

| Device | Tavsiya etilgan kenglik | Layout |
|---|---:|---|
| Desktop | ≥ 1280 px | Hero to‘liq; kurslar bitta qatorda; davom ettirish 2–3 item; tavsiya/katalog 3–4 ustun |
| Tablet | 768–1279 px | Navbar ixcham; kurslar wrap/scroll; kartalar 2 ustun; tavsiya carousel bo‘lishi mumkin |
| Mobile | ≤ 767 px | Navbar kompakt; hero qisqa; kurslar gorizontal scroll; kartalar 1 ustun; filter bottom sheet/drawer |

- Touch target kamida 44×44 px.
- Mobile’da asosiy CTA ko‘rinadigan va bosish oson bo‘lsin.
- Gorizontal scroll faqat chiplar yoki carousel kabi aniq komponentlarda ishlatilsin.
- Matnlar va kartalar ekran chetiga yopishmasin; 16 px atrofida yon padding.

## 9. UI komponentlari

- Primary button: orange fill, oq matn, radius 12–16 px.
- Secondary button: oq fon, orange border yoki neytral border.
- Course chip: ikon + nom; active holat orange border/fill.
- Game card: radius 16–20 px, border `#E5E7EB`, yengil shadow.
- Progress: 6–8 px balandlik, orange fill, och kulrang track.
- Badge: kichik pill, rang ma’noga mos.
- Search: leading search icon, clear action, 44–48 px balandlik.
- Filter panel: desktop’da popover/side panel; mobile’da bottom sheet.

## 10. Assetlar va nomlash

- 3D personajlar: `robot_wave.png`, `robot_gamer.png`, `robot_celebrate.png`, `robot_reader.png`.
- Mukofotlar: `coin_star.png`, `trophy.png`, `purple_gem.png`, `gift_box.png`.
- 2D ikonlar: `gamepad.png`, `math.png`, `english.png`, `code.png`, `computer.png`, `puzzle.png`, `play.png`, `fire.png`, `trophy.png`, `star.png`, `calendar.png`, `analytics.png`.
- Fayl nomlari lowercase-kebab-case yoki snake_case; bir loyihada yagona standart tanlansin.
- 3D assetlar PNG alpha transparency bilan; UI ikonlar PNG yoki SVG; logotip va oddiy ikonlar uchun SVG afzal.
- Assetlarni UI fonidan alohida saqlash; bir asset ichiga matn yoki UI label joylashtirmaslik.

## 11. Accessibility va UX tekshiruv

- Matn kontrasti yetarli bo‘lsin; rangning o‘zi holatni bildirmasin.
- Barcha tugmalar klaviatura focus holatiga ega bo‘lsin.
- Ikon-only tugmalarda accessible label bo‘lsin.
- Loading, empty, error va offline holatlari loyihalansin.
- Qidiruv natijasi yo‘q bo‘lsa filterlarni tozalash yo‘li ko‘rsatiladi.
- Progress foiz yoki daraja bilan birga matnda ham beriladi.

## 12. Paket tarkibi

- `01_Device_Mockups/` — Desktop, Tablet, Mobile PNG ko‘rinishlari.
- `02_Design_Guide/` — ushbu qo‘llanma va vizual rang/tipografiya reference’i.
- `03_Game_Card/` — to‘liq o‘yin kartochkasi.
- `04_Assets/3D/` — 3D sprite sheet va alohida PNG assetlar.
- `04_Assets/2D/` — 2D ikonlar sheet’i va alohida PNG ikonlar.
- `04_Assets/Catalog/` — umumiy assetlar katalogi preview’i.
- `05_Reference_Boards/` — umumiy dizayn reference boardlari.

> Eslatma: bu paket — vizual konsepsiya va UI yo‘riqnomasi. Yakuniy production assetlari sifatida ishlatishdan oldin ikonlar, matnlar va responsive o‘lchamlarni Figma yoki kodda tekislash tavsiya etiladi.
