# BlockPuzzle bannerlari

2026-11-22. O‘yin manbasi: `blockpuzzle/src/block-puzzle.css`, `blockpuzzle/README.md` va `blockpuzzle/output/playwright/production-desktop.png`.

| Fayl | O‘lcham | Joylashuv |
| --- | --- | --- |
| `BlockPuzzle-banner.png` | 1600 × 870 px | GameLab tavsiya kartasi; 16:8.7 asosiy nisbat, responsive kenglikka moslanadi |
| `BlockPuzzle-compact.png` | 800 × 800 px | “Davom ettirish” kartasi; `object-fit: contain` yordamida tor mobil o‘lchamda ham maydon to‘liq ko‘rinadi |

Keng kartaning mavjud CSS nisbatlari desktopda 16:8.7 yoki 16:8.5, planshetda 16:8. Kichik rasm konteyneri ekran kengligiga qarab 139×82, 110×82, 95×80, 91×75, 75×75 yoki 60×75 px. Kvadrat variant shu konteynerlarga cho‘zilmasdan moslashadi.

Yangi vizual faqat `showcaseGames` ichidagi haqiqiy `blockpuzzle` kartasiga ulandi. `blocks` va `memory` kartalaridagi avvalgi umumiy SVG saqlandi. Hozirgi loyiha BlockPuzzle’ni faqat tavsiya va davom ettirish bloklarida ko‘rsatadi; unga alohida tafsilotlar banneri mavjud emas.

`build.mjs` ikkala PNG’ni HTML ichiga joylaydi. `GameLab.html` va unga oldindan aynan mos bo‘lgan `handoff/GameLab.html` yangilandi. PNG fayllar mustaqil dizayn assetlari sifatida asosiy papkada qoldi. Lokal server ishga tushirilmadi.

## Generatsiya

Built-in `image_gen` ishlatildi; o‘yin skrinshoti uslub referensi sifatida berildi. Natijalar talab qilingan aniq piksel o‘lchamlariga yuqori sifatli bicubic usulida kichraytirildi.

Keng variant prompt mazmuni: pastel havorang–lavanda–shaftoli fonida markaziy to‘q ko‘k, aniq 8×8 yumaloq katakli maydon; o‘yindagi binafsha, ko‘k, yalpiz, sariq va pushti yaltiragan bloklar; chapda binafsha L-shakl, o‘ngda yalpiz uch katakli blok; maydon to‘liq ko‘rinadi. Yumshoq hajm va soya, thumbnail’da o‘qiladigan siluet. Matn, raqam, logo, robot, coin va interfeys tugmalari yo‘q.

Kvadrat variant prompti: “Create the compact square thumbnail adaptation of this exact Block Puzzle banner. Output one square image 800x800. Preserve the SAME exact navy rounded 8x8 board, the same 8 rows and 8 columns, same tile layout and glossy violet, blue, mint, amber and coral colors. Remove the separate floating violet piece and mint bar on the sides. Center the ENTIRE board, filling about 84 percent of width and height with breathing space on ALL four sides. Maintain the very light icy blue/lavender/peach background and soft shadow. No text, no lettering, no logo, no buttons, no characters. This will be rendered in narrow mobile and small continue-playing thumbnails: prioritize the complete readable board silhouette, never crop its corners.”

Tekshiruv hisoboti: `output/playwright/BlockPuzzle-verification.json`. Karta skrinshotlari ham shu papkada `BlockPuzzle-` nomi bilan saqlangan.
