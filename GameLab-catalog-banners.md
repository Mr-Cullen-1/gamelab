# GameLab — barcha o‘yin bannerlari

24 ta katalog o‘yini uchun 48 ta yangi tasvir chizildi. Oldingi uchta o‘yin bilan jami 27 ta o‘yin bitta vizual uslubda.

- Keng banner: **1600 × 870**, o‘yin nomi bilan.
- Kichik karta: **800 × 800**, alohida kvadrat kompozitsiya.
- Asosiy papkada har bir tasvirning PNG va WebP nusxasi bor.
- [Barcha bannerlar galereyasi](GameLab-all-banners.html) · [Umumiy ko‘rinish](GameLab-all-banners-preview.png) · [GameLab](GameLab.html)

| O‘yin | Keng PNG | Kichik PNG |
|---|---|---|
| Block Puzzle | [BlockPuzzle-banner-v2.png](BlockPuzzle-banner-v2.png) | [BlockPuzzle-compact-v2.png](BlockPuzzle-compact-v2.png) |
| Math Fishing | [MathFishing-banner.png](MathFishing-banner.png) | [MathFishing-compact.png](MathFishing-compact.png) |
| Ko‘prik ustasi | [BridgeConstructor-banner-v2.png](BridgeConstructor-banner-v2.png) | [BridgeConstructor-compact-v2.png](BridgeConstructor-compact-v2.png) |
| Blok pazl | [BlokPazl-banner.png](BlokPazl-banner.png) | [BlokPazl-compact.png](BlokPazl-compact.png) |
| Sonlar poygasi | [SonlarPoygasi-banner.png](SonlarPoygasi-banner.png) | [SonlarPoygasi-compact.png](SonlarPoygasi-compact.png) |
| Geometriya Siti | [GeometriyaSiti-banner.png](GeometriyaSiti-banner.png) | [GeometriyaSiti-compact.png](GeometriyaSiti-compact.png) |
| Matematik yo‘l | [MatematikYol-banner.png](MatematikYol-banner.png) | [MatematikYol-compact.png](MatematikYol-compact.png) |
| Kodlab ko‘r | [KodlabKor-banner.png](KodlabKor-banner.png) | [KodlabKor-compact.png](KodlabKor-compact.png) |
| Robotni boshqar | [RobotniBoshqar-banner.png](RobotniBoshqar-banner.png) | [RobotniBoshqar-compact.png](RobotniBoshqar-compact.png) |
| So‘zlar sayyorasi | [SozlarSayyorasi-banner.png](SozlarSayyorasi-banner.png) | [SozlarSayyorasi-compact.png](SozlarSayyorasi-compact.png) |
| Mantiq labirinti | [MantiqLabirinti-banner.png](MantiqLabirinti-banner.png) | [MantiqLabirinti-compact.png](MantiqLabirinti-compact.png) |
| Internet qahramoni | [InternetQahramoni-banner.png](InternetQahramoni-banner.png) | [InternetQahramoni-compact.png](InternetQahramoni-compact.png) |
| Kasrlar oshxonasi | [KasrlarOshxonasi-banner.png](KasrlarOshxonasi-banner.png) | [KasrlarOshxonasi-compact.png](KasrlarOshxonasi-compact.png) |
| So‘z ovchisi | [SozOvchisi-banner.png](SozOvchisi-banner.png) | [SozOvchisi-compact.png](SozOvchisi-compact.png) |
| Algoritm ustasi | [AlgoritmUstasi-banner.png](AlgoritmUstasi-banner.png) | [AlgoritmUstasi-compact.png](AlgoritmUstasi-compact.png) |
| Xotira kartalari | [XotiraKartalari-banner.png](XotiraKartalari-banner.png) | [XotiraKartalari-compact.png](XotiraKartalari-compact.png) |
| Sensorlar olami | [SensorlarOlami-banner.png](SensorlarOlami-banner.png) | [SensorlarOlami-compact.png](SensorlarOlami-compact.png) |
| Klaviatura ustasi | [KlaviaturaUstasi-banner.png](KlaviaturaUstasi-banner.png) | [KlaviaturaUstasi-compact.png](KlaviaturaUstasi-compact.png) |
| Ranglar olami | [RanglarOlami-banner.png](RanglarOlami-banner.png) | [RanglarOlami-compact.png](RanglarOlami-compact.png) |
| Kosmik hisob | [KosmikHisob-banner.png](KosmikHisob-banner.png) | [KosmikHisob-compact.png](KosmikHisob-compact.png) |
| Aql ko‘prigi | [AqlKoprigi-banner.png](AqlKoprigi-banner.png) | [AqlKoprigi-compact.png](AqlKoprigi-compact.png) |
| Takrorlash sehri | [TakrorlashSehri-banner.png](TakrorlashSehri-banner.png) | [TakrorlashSehri-compact.png](TakrorlashSehri-compact.png) |
| Robot konstruktor | [RobotKonstruktor-banner.png](RobotKonstruktor-banner.png) | [RobotKonstruktor-compact.png](RobotKonstruktor-compact.png) |
| Fayllar shahri | [FayllarShahri-banner.png](FayllarShahri-banner.png) | [FayllarShahri-compact.png](FayllarShahri-compact.png) |
| Gap tuzuvchi | [GapTuzuvchi-banner.png](GapTuzuvchi-banner.png) | [GapTuzuvchi-compact.png](GapTuzuvchi-compact.png) |
| Naqshlar siri | [NaqshlarSiri-banner.png](NaqshlarSiri-banner.png) | [NaqshlarSiri-compact.png](NaqshlarSiri-compact.png) |
| Robot sayohati | [RobotSayohati-banner.png](RobotSayohati-banner.png) | [RobotSayohati-compact.png](RobotSayohati-compact.png) |

## Integratsiya

Katalog rasmlari `catalog-banner-manifest.json` orqali o‘yin ID siga bog‘langan. `build.mjs` WebP fayllarni HTML ichiga joylaydi; bannerlar internet talab qilmaydi. Katak kartalar va tafsilot oynasi keng banner, ro‘yxat ko‘rinishi kichik tasvirdan foydalanadi. Bloklangan o‘yinlarning mavjud xiralashtirish holati saqlanadi.

Generatsiya promptlari va asl fayl manzillari: `output/imagegen/catalog-generation-progress.json`. O‘lchamlar: `output/imagegen/catalog-asset-dimensions.json`. Brauzer tekshiruvi: `output/playwright/catalog-banners-verification.json`.

