# Bobaedream Used Car Option Icon Alignment QA

**Findings**
- No actionable P0/P1/P2 issues remain after normalizing the option icon alignment.
- The original icon image files remain unchanged; sizing and center correction are handled in CSS.
- Follow-up optical correction: `선루프` is lowered by `1.5px` because its upper roof mass made it look visually high despite geometric centering.

**Implementation Checklist**
- [x] Fixed each option cell to a stable 40px icon row plus text row.
- [x] Added per-icon CSS classes from the mapped asset filename.
- [x] Normalized visual icon size around a 35px painted-area target and corrected small center offsets.
- [x] Updated list/detail cache keys so GitHub Pages loads the alignment CSS and interaction script.
- [x] Split `선루프` from the shared 40px rule and applied the optical Y-axis correction.

**Evidence**
- Metrics: `captures/option-icons-alignment-20260831/detail-option-icons-alignment.json`

**Measured Pass**
- `iconCount=12`, `missingCssClasses=[]`.
- `maxVisualDeviationPx=0.2`, `maxCenterDeviationPx=0.2`.

final result: passed

# Bobaedream Used Car HUD Option Icon QA

**Findings**
- No actionable P0/P1/P2 issues remain after adding the supplied HUD icon.
- `헤드업 디스플레이` now uses the supplied `s03-39-option-head-up-display.webp` asset instead of the numeric fallback.

**Implementation Checklist**
- [x] Copied the supplied HUD WebP into `assets/used-car/options/`.
- [x] Mapped `헤드업 디스플레이` and `HUD` to the new icon asset.
- [x] Updated list/detail cache keys so GitHub Pages loads the latest interaction script.

**Evidence**
- Source file: `assets/used-car/options/s03-39-option-head-up-display.webp`
- Metrics: `captures/option-icons-hud-20260831/detail-option-icons-hud-1536.json`

**Measured Pass**
- `totalDetailOptions=12`, `loadedIconCount=12`, `brokenIconLabels=[]`.
- `fallbackLabels=[]`.
- HUD file header verified as WebP (`RIFF...WEBPVP8X`).

final result: passed

# Bobaedream Used Car Original Option Icon QA

**Findings**
- No actionable P0/P1/P2 issues remain after removing the rounded option icon treatment.
- [P3] `s03-39-option-head-up-display` is still missing from the supplied icon set, so `헤드업 디스플레이` remains a plain `39` fallback.

**Implementation Checklist**
- [x] Removed the circular blue option icon background.
- [x] Removed the active-state blue CSS filter and inactive opacity treatment.
- [x] Rendered the supplied PNG option icons at their original color treatment with transparent backgrounds.
- [x] Kept the existing option grid spacing and text alignment stable.

**Evidence**
- Implementation screenshot: `captures/option-icons-original-20260831/detail-option-icons-original-1536.png`
- Implementation metrics: `captures/option-icons-original-20260831/detail-option-icons-original-1536.json`

**Measured Pass**
- `loadedIconCount=11`, `brokenIconLabels=[]`, `hasRoundedIconBackground=false`.
- `fallbackLabels=["39:헤드업 디스플레이"]`.
- Console and page errors checked: no document-originated errors.

final result: passed

# Bobaedream Used Car Option Icon Replacement QA

**Findings**
- No actionable P0/P1/P2 issues remain after the first option icon replacement pass.
- [P3] `s03-39-option-head-up-display` was not included in the supplied local PNG files, so `헤드업 디스플레이` keeps a `39` fallback badge until the source icon is provided.

**Implementation Checklist**
- [x] Read the supplied Google Sheet and confirmed the `아이콘관련` tab maps option icons `S03-30` through `S03-41` to the detail vehicle option area.
- [x] Copied the 11 supplied PNG files into `assets/used-car/options/`.
- [x] Replaced the detail-page numeric option badges with real PNG icon rendering for sunroof, LED headlamp, adaptive cruise, rear camera, around view, smart key, navigation, heated seat, ventilated seat, power trunk, and collision warning.
- [x] Preserved active/inactive state styling with the Bobaedream blue palette and kept the existing 6-column option rhythm.

**Evidence**
- Implementation active-state screenshot: `captures/option-icons-20260831/detail-option-icons-1536.png`
- Implementation inactive-state screenshot: `captures/option-icons-20260831/detail-option-icons-inactive-1536.png`
- Active-state metrics: `captures/option-icons-20260831/detail-option-icons-1536.json`
- Inactive-state metrics: `captures/option-icons-20260831/detail-option-icons-inactive-1536.json`
- Source mapping: Google Sheet `아이콘관련` tab, rows `30` through `41`.

**Measured Pass**
- Active-detail check: `loadedIconCount=11`, `brokenIconLabels=[]`, `fallbackLabels=["39:헤드업 디스플레이"]`.
- Inactive-detail check: `activeCount=4`, `loadedIconCount=11`, `brokenIconLabels=[]`.
- Console and page errors checked: no document-originated errors.

final result: passed

# Bobaedream Used Car Pretendard Typography QA

**Findings**
- No actionable P0/P1/P2 issues remain after the Pretendard typography correction.
- [P3] Vehicle photos and brand logo assets still differ from the live source, which is expected until the planned icon/asset replacement pass.

**Implementation Checklist**
- [x] Confirmed the live Bobaedream mobile source loads Pretendard from `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css`.
- [x] Replaced the prototype-wide used-car font import and `--font-system` with Pretendard.
- [x] Matched measured mobile list typography: region `15px/400/21px`, chip `14px/600/20px`, category `16px/400`, toolbar `15px/600/21px`, title `15px/600/20px`, meta `13px/400/18.2px`, price `17px/700/23.8px`.
- [x] Matched measured mobile filter sheet typography and geometry: header `57px`, title `16px/600/22.4px`, rows `14px/600/19.6px`, scroll body `593px`, footer `77px`, footer buttons `44px`.
- [x] Updated the export mobile wrapper font stack and normalized the export-only `950` font weight to Pretendard's `900`.

**Evidence**
- Source typography metrics: `captures/pretendard-typography/source-bobae-typography.json`
- Implementation mobile metrics: `captures/pretendard-typography/implementation-pretendard-typography.json`
- Implementation PC smoke metrics: `captures/pretendard-typography/implementation-pretendard-pc-smoke.json`
- Implementation export mobile smoke metrics: `captures/pretendard-typography/implementation-pretendard-export-smoke.json`
- Combined comparison image: `captures/pretendard-typography/comparison-source-vs-implementation-pretendard-typography.png`
- Viewports: mobile `390px x 844px`, PC `1536px x 695px`, device scale factor `1`.

**Measured Pass**
- Korean mobile list: Pretendard loaded, `documentElement.scrollWidth=390`, `body.scrollWidth=390`, no horizontal overflow.
- Korean mobile filter sheet: active sheet `x=0 y=0 w=390 h=844`; header `57px`, body `593px`, footer `77px`.
- Korean mobile toolbar sheets: sort sheet `y=207 h=637`, view sheet `y=477 h=367`, within `3px` of the live source measurements after the header correction.
- PC list/detail: Pretendard applied with `documentElement.scrollWidth=1536` at a `1536px` viewport.
- Export mobile list: Pretendard applied, `scrollWidth=390`, no document-originated console errors.

final result: passed

# Bobaedream Used Car Original Filter Chip Bottom Sheet QA

**Findings**
- No actionable P0/P1/P2 issues remain after the filter chip bottom-sheet pass.
- [P3] The maker selector still uses temporary letter marks and counts instead of the original brand logo assets. This should be replaced in the planned icon pass when the supplied SVG files are available.

**Implementation Checklist**
- [x] Captured the live Bobaedream source mobile list from `https://dev.bbmuseum.co.kr/car/list`.
- [x] Measured original filter-condition sheets: filter, maker, year, and region open as full-height bottom sheets at `390px x 844px` with `z-index: 260`.
- [x] Measured original toolbar sheets: sort opens at `y=204 h=640`, and list-view opens at `y=474 h=370` with `z-index: 240`.
- [x] Updated the mobile sheet layer to distinguish filter-condition sheets from toolbar action sheets.
- [x] Locked body scroll with fixed positioning while a sheet is open, matching the original modal scroll behavior.
- [x] Adjusted mobile action sheet padding so sort and view sheets match the source heights.
- [x] Added the missing `한줄 광고로 보기` option to the list-view sheet.

**Evidence**
- Source filter screenshot: `captures/bobae-original-filter-bottom-sheet/source-mobile-필터.png`
- Source maker screenshot: `captures/bobae-original-filter-bottom-sheet/source-mobile-제조사.png`
- Source sort screenshot: `captures/bobae-original-filter-bottom-sheet/source-mobile-업데이트순.png`
- Source view screenshot: `captures/bobae-original-filter-bottom-sheet/source-mobile-목록형.png`
- Implementation metrics: `captures/bobae-original-filter-bottom-sheet/implementation-filter-chip-sheet-metrics.json`
- Final local smoke metrics: `captures/bobae-original-filter-bottom-sheet/final-local-smoke.json`
- Combined comparison image: `captures/bobae-original-filter-bottom-sheet/comparison-source-vs-implementation-filter-chip-sheets.png`
- Viewport: Chrome mobile CSS viewport `390px x 844px`, device scale factor `1`.

**Measured Pass**
- `필터`, `제조사`, `연식`, `가격`, `연료`, `판매자`, and `지역: 전국` all open the filter-condition sheet path with layer `z-index: 260`, `aria-hidden=false`, body `position: fixed`, and active sheet rect `x=0 y=0 w=390 h=844`.
- `업데이트순` opens the toolbar sheet path with layer `z-index: 240`, active sheet rect `x=0 y=204 w=390 h=640`, and action list rect `x=0 y=264 w=390 h=580`.
- `보기` opens the toolbar sheet path with layer `z-index: 240`, active sheet rect `x=0 y=474 w=390 h=370`, and action list rect `x=0 y=534 w=390 h=310`.
- Console and page errors checked: no document-originated errors.

final result: passed

# Bobaedream Used Car Chotot Sticky Summary QA

**Findings**
- No actionable P0/P1/P2 issues remain after the sticky summary correction.
- [P3] The fixed CTA phone button keeps Bobaedream blue instead of Chotot yellow, consistent with the current Bobaedream brand adaptation used in prior detail-page passes.

**Implementation Checklist**
- [x] Captured the live Chotot detail page from `https://xe.chotot.com/mua-ban-oto-huyen-chau-thanh-kien-giang/134278607.htm`.
- [x] Measured the source sticky state at scroll `358px`: full-width fixed layer `1536px x 124px`, inner row `960px x 68px`, tab row `960px x 52px`, and `z-index: 200`.
- [x] Moved the Bobaedream detail section tabs inside `.detailStickySummary` so the summary row and tabs behave as one fixed layer.
- [x] Matched the source sticky summary geometry: centered inner lane `x=288 w=960`, thumbnail `48px`, title/price lane `506px`, save `106px`, chat `68px`, phone `200px`.
- [x] Matched the source timing by showing the sticky summary after early detail scroll, around `320px`.
- [x] Updated tab clicks to scroll sections below the `124px` fixed summary instead of hiding headings underneath it.

**Evidence**
- Source visual truth path: `captures/chotot-sticky-summary/source-scroll360.png`
- Source metrics path: `captures/chotot-sticky-summary/source-sticky-measurements.json`
- Implementation screenshot path: `captures/chotot-sticky-summary/implementation-scroll360.png`
- Implementation tab-click screenshot path: `captures/chotot-sticky-summary/implementation-after-tab-click.png`
- Implementation metrics path: `captures/chotot-sticky-summary/implementation-sticky-measurements.json`
- Combined comparison image: `captures/chotot-sticky-summary/comparison-source-vs-implementation-sticky-summary.png`
- Viewport: Chrome CSS viewport `1536px x 695px`, device scale factor `1`
- State: PC used-car detail page after scroll, sticky vehicle summary visible.

**Measured Pass**
- Source sticky layer: `position: fixed`, `top: 0`, `z-index: 200`, rect `x=0 y=0 w=1536 h=124`.
- Source summary content: inner lane `x=288 y=0 w=960 h=68`, title `x=344 y=10`, save `x=858 y=14 w=105.5 h=40`, chat `x=971.5 y=14 w=68.2 h=40`, phone `x=1047.7 y=14 w=200.3 h=40`, tab row `x=288 y=71 w=960 h=52`.
- Implementation hidden state: at scroll `300px`, sticky summary is `display: none` and `aria-hidden=true`.
- Implementation visible state: at scroll `360px`, sticky layer rect `x=0 y=0 w=1536 h=124`, inner lane `x=288 y=0 w=960 h=68`, thumbnail `48px`, title `x=344 y=10 w=506 h=24`, save `x=858 y=14 w=106 h=40`, chat `x=972 y=14 w=68 h=40`, phone `x=1048 y=14 w=200 h=40`, tab row `x=288 y=71 w=960 h=52`.
- Tab interaction pass: clicking `상세 정보` scrolls to the detail section with the heading visible below the fixed summary and sets the active tab to `상세 정보`.
- Console and page errors checked: no document-originated errors.

final result: passed

# Bobaedream Used Car Chotot Thumbnail Gesture QA

**Findings**
- No actionable P0/P1/P2 issues remain after the thumbnail gesture correction.
- [P3] The thumbnail prev/next controls currently use CSS chevrons. Swap these to the supplied SVG icons in the later icon replacement pass without changing the measured rail geometry.

**Implementation Checklist**
- [x] Captured the live Chotot detail thumbnail rail from the user-supplied source detail URL.
- [x] Matched the Chotot thumbnail rail sizing: outer strip `736px`, viewport `734px`, slide pitch `100px`, thumbnail image about `84px`, and next arrow `44px`.
- [x] Changed the Bobaedream detail thumbnail rail from a stretched static row to a clipped, draggable track.
- [x] Matched Chotot-style arrow paging: next/previous buttons move the track by `5` slides, or `500px`.
- [x] Added direct pointer dragging with `100px` snapping and kept thumbnail click/tap behavior working after a drag.
- [x] Added the gallery counter state so the main image shows `1 / 18`, `9 / 18`, etc.

**Evidence**
- Source visual truth path: `captures/chotot-thumb-gesture/source-thumb-before.png`
- Source metrics path: `captures/chotot-thumb-gesture/source-thumb-before.json`
- Implementation before/after screenshots: `captures/chotot-thumb-gesture/implementation-playwright-before.png`, `captures/chotot-thumb-gesture/implementation-playwright-after-drag-click.png`
- Implementation metrics path: `captures/chotot-thumb-gesture/implementation-playwright-final.json`
- Combined comparison image: `captures/chotot-thumb-gesture/comparison-source-vs-implementation-thumb.png`
- Viewport: Chrome CSS viewport `1536px x 695px`, device scale factor `1`
- State: PC used-car detail top gallery and thumbnail rail.

**Measured Pass**
- Source rail: outer thumbnail wrapper `736px`, slick list `734px`, slide pitch `100px`, image `84.8px x 84.8px`, next arrow `44px`, disabled previous arrow hidden, counter `1 / 18`.
- Implementation initial rail: document `scrollWidth=1536`, strip `736px`, viewport `734px`, first image `84px x 84px`, previous arrow hidden, next arrow `44px`, counter `1 / 18`.
- Implementation next click: track transform `translate3d(-500px, 0px, 0px)` and visible thumbnail indices `5` through `12`.
- Implementation drag gesture: dragging left by about `240px` snaps to `translate3d(-200px, 0px, 0px)` and visible thumbnail indices `2` through `9`.
- Implementation thumbnail click after drag: clicking visible index `8` updates the active state and counter to `9 / 18`.
- Console and page errors checked: no document-originated errors.

final result: passed

# Bobaedream Used Car Chotot Detail Image Fit QA

**Findings**
- No actionable P0/P1/P2 issues remain after the image-fit correction.
- [P3] The Chotot source vehicle photo is portrait-like, so its painted photo area is narrower than the Bobaedream sample's landscape image. The UI behavior now matches because both use a contained image inside the same media frame.

**Open Questions**
- None for this pass. The user's concern was whether the Bobaedream detail media appeared larger than the specific Chotot source detail.

**Implementation Checklist**
- [x] Captured the specific Chotot source detail URL supplied by the user.
- [x] Re-measured source and implementation at the same actual Chrome viewport.
- [x] Kept the outer gallery frame at `736px x 412px`, matching Chotot.
- [x] Changed the gallery image from `object-fit: cover` to `object-fit: contain`.
- [x] Updated static asset cache keys to `chotot-detail-fit-20260830`.

**Follow-up Polish**
- If the visual sample must look identical to the supplied Chotot screenshot, use a portrait-ratio first vehicle photo. With the current landscape sample, the correct Chotot behavior still produces a wider painted image.

## Evidence

- Source visual truth path: `captures/chotot-detail-size-check/source-specific-top-1600.png`
- Implementation screenshot path: `captures/chotot-detail-size-check/implementation-local-fit-1600.png`
- Combined comparison image: `captures/chotot-detail-size-check/comparison-source-vs-local-fit.png`
- Source metrics path: `captures/chotot-detail-size-check/source-specific-measurements-1600.json`
- Implementation metrics path: `captures/chotot-detail-size-check/implementation-local-fit-measurements.json`
- Viewport: actual Chrome viewport `1536px x 639px`, device scale factor `1`
- State: top of PC used-car detail page
- Full-view comparison evidence: Chotot and Bobaedream both use a `1200px` shell, `736px` left media column, `464px` right info column, main gallery frame `736px x 412px`, and first thumbnail about `85px x 85px`.
- Focused region comparison evidence: source main image CSS frame `736px x 412px`, source painted photo area `309px x 412px`; implementation before fix painted as `736px x 490.5px` because of cover scaling; implementation after fix paints as `618.2px x 412px` with `object-fit: contain`.
- Primary interactions tested: page loads locally, gallery frame renders, CSS cache key resolves, and browser console errors checked.

## Required Fidelity Surfaces

### Fonts and Typography

- No typography changes in this pass. The title, meta, price, and CTA typography remain from the previous Chotot detail QA pass.

### Spacing and Layout Rhythm

- Outer detail layout remains matched: shell `1200px`, media `736px x 412px`, right card `464px`, thumbnail slot `85px`.

### Colors and Visual Tokens

- The gallery keeps Chotot's dark media backdrop using `#202020` behind contained photos.

### Image Quality and Asset Fidelity

- Fixed the image scaling behavior so photos are no longer enlarged and cropped beyond the source-style media frame.
- Remaining perceived difference comes from asset ratio, not the component sizing.

### Copy and Content

- No content changes in this pass.

## Comparison History

1. Captured the specific Chotot detail page from `https://xe.chotot.com/mua-ban-oto-huyen-chau-thanh-kien-giang/134278675.htm`.
2. Re-measured source and deployed implementation in Chrome. Both used the same gallery frame size, but implementation used cover-like photo scaling and looked visually larger.
3. Changed `.galleryStage img` to `object-fit: contain` and recaptured the local implementation.
4. Post-fix capture confirms the image remains inside the same `736px x 412px` frame and now leaves dark side gutters like Chotot's media treatment.

final result: passed

# Bobaedream Used Car Chotot Spacing QA

**Findings**
- No actionable P0/P1/P2 issues in the final captured state.
- The used-car list now follows the user-marked Chotot vertical rhythm around the top filter card.

**Implementation Checklist**
- [x] Measured the user-marked Chotot screenshot for the GNB-to-filter and filter-to-list-tab vertical gaps.
- [x] Updated `.listShell` top margin from `24px` to `21px`.
- [x] Updated `.toolbar` top margin from `24px` to `16px`.
- [x] Updated the list/detail stylesheet version query to force the new spacing CSS on GitHub Pages.

**Evidence**
- Source visual truth path: `captures/chotot-reference/marked-spacing-source.png`
- Source metrics path: `captures/chotot-reference/marked-spacing-source-metrics.json`
- Implementation screenshot path: `captures/used-car-implementation/list-chotot-spacing-1440.jpg`
- Implementation metrics path: `captures/used-car-implementation/list-chotot-spacing-metrics.json`
- Combined comparison image: `captures/used-car-implementation/comparison-chotot-spacing.jpg`
- Viewport: `1440 x 900`
- Source screenshot pixels: `1836 x 582`
- Implementation capture pixels: browser viewport screenshot, CSS viewport `1440 x 900`, device scale factor `1`
- State: desktop used-car list top screen.
- Full-view comparison evidence: the reference card begins at the first visible rounded edge `21px` below the GNB/background break, and the list tabs begin `16px` below the filter card edge. The implementation measures `topGap=21` and `bottomGap=16`.
- Focused region comparison evidence: spacing was checked against the annotated source area and confirmed with DOM measurements from the rendered implementation.

**Measured Pass**
- Source target: GNB to filter card top `21px`, filter card bottom to list tabs `16px`.
- Implementation: header bottom `117`, list shell y `138`, top gap `21`.
- Implementation: summary card bottom `360`, toolbar y `376`, bottom gap `16`.
- No document-originated console errors.

final result: passed

# Bobaedream Used Car Chotot Detail QA

**Findings**
- No actionable P0/P1/P2 issues remain in the final captured state.
- [P3] Source media is a portrait video-like car image with black side gutters; the implementation keeps the available Bobaedream landscape vehicle asset while matching the source image frame, thumbnail sizing, and surrounding spacing.
- [P3] The primary phone CTA uses Bobaedream blue instead of Chotot yellow so the prototype stays aligned with the Bobaedream brand palette.

**Open Questions**
- None for this pass. The requested scope was PC used-car detail UI/UX typography, spacing, and sizing based on Chotot.

**Implementation Checklist**
- [x] Captured Chotot detail source from `https://xe.chotot.com/mua-ban-oto-dien-sdfu4` via the first visible listing detail.
- [x] Rebuilt the detail top layout to `1200px` shell, `736px / 464px` columns, and `12px` gap.
- [x] Matched the media area: main frame `736 x 412`, thumbnail rail `85px` tall, thumbnails `85 x 85`, `15px` gaps, and `20px` gap below the main image.
- [x] Moved title, meta, price, contact buttons, location, and posted time into the right `464 x 357` overview card.
- [x] Added the Chotot-style sticky summary bar and tab row: summary `65px`, tabs `960 x 52`, tab top `71px`.
- [x] Restyled detail cards to `736px` width, `16px 20px` padding, `12px` radius, `18/27/700` h2, `16/24/500` h3, and `156px` 4-column spec grid.

**Evidence**
- Source visual truth paths: `captures/chotot-detail-info/source-chotot-detail-top.png`, `captures/chotot-detail-info/source-chotot-detail-mid.png`
- Implementation screenshot paths: `captures/chotot-detail-info/implementation-final2-top.png`, `captures/chotot-detail-info/implementation-final2-mid.png`
- Combined comparison images: `captures/chotot-detail-info/comparison-top.png`, `captures/chotot-detail-info/comparison-mid.png`
- Source measurement paths: `captures/chotot-detail-info/source-chotot-detail-top-precise.json`, `captures/chotot-detail-info/source-chotot-detail-mid-measurements.json`
- Implementation measurement paths: `captures/chotot-detail-info/implementation-final-top-measurements.json`, `captures/chotot-detail-info/implementation-final2-mid-measurements.json`
- Viewport: browser CSS viewport `1536 x 639`
- Source pixels: top `1526 x 635`, mid `1526 x 635`; implementation pixels: top `1521 x 633`, mid `1521 x 633`; same browser density, screenshot width differs only by visible scrollbar/chrome capture behavior.
- State: PC used-car detail top and PC used-car detail at scrollY `650.4`.
- Full-view comparison evidence: source and implementation now share the same above-the-fold content positions: source image `x=162.8 y=111.4 w=736 h=412`; implementation image `x=160.4 y=112 w=736 h=412`; source right card `x=910.8 y=111.4 w=464 h=357`; implementation right card `x=908.4 y=112 w=464 h=357`; source thumbnail rail begins at `y=543`, implementation at `y=544`.
- Focused region comparison evidence: source and implementation spec cards both render at `736px` width with inner content `696px`, h2 `18/27/700`, h3 `16/24/500`, and spec grid `156px 156px 156px 156px`.
- Primary interactions tested: gallery thumbnail click swaps the main image, sticky summary appears after scroll, tab clicks scroll to matching sections, favorite buttons toggle, contact buttons show toast feedback.
- Console errors checked: no document-originated browser console errors in the final implementation capture.

**Required Fidelity Surfaces**

### Fonts and Typography

- Source uses `Reddit Sans`; implementation uses the existing `Reddit Sans` stack.
- Top title matches `24px / 36px / 700`; metadata matches `16px / 24px / 400`; price matches `24px / 36px / 700`; CTA labels match `16px / 24px / 700`.
- Detail card h2/h3/spec text matches the measured Chotot scale.

### Spacing and Layout Rhythm

- Main detail shell, columns, major cards, thumbnail rail, sticky summary, sticky tabs, and spec grid match source-measured dimensions within normal browser scrollbar variance.
- Detail-only header was compacted so the content starts at `y=112`, matching the Chotot source `y=111.4`.

### Colors and Visual Tokens

- Background, white card surfaces, black active tab underline, gray metadata, and red price token match the Chotot detail rhythm.
- Bobaedream blue is intentionally retained for primary phone/send CTAs.

### Image Quality and Asset Fidelity

- Main image and thumbnails use real local vehicle assets. Frame size and rail sizing match source; the actual source media subject/aspect ratio is intentionally not copied.

### Copy and Content

- Source Vietnamese listing content is replaced with the Bobaedream used-car virtual scenario content while preserving equivalent roles: title, year, mileage, fuel, transmission, price, seller, location, posted time, description, and spec tables.

**Comparison History**
1. Captured Chotot top and mid detail screenshots and DOM measurements.
2. First implementation pass matched the main shell, right overview card, thumbnail rail, and detail spec typography.
3. QA found the fixed tab row lacked Chotot's sticky summary bar and overlapped content at scroll.
4. Added a `65px` sticky summary bar, moved the tab row to `top=71px`, recaptured top/mid states, and verified no console errors.

final result: passed

# Bobaedream Used Car Chotot Listing Info QA

**Findings**
- No actionable P0/P1/P2 issues in the final captured state.
- The first PC used-car listing row now follows Chotot's measured typography and row rhythm before the icon replacement pass.

**Implementation Checklist**
- [x] Captured the live Chotot used-car listing and first listing row.
- [x] Measured Chotot's list item typography, thumbnail slot, row height, column width, and vertical gaps.
- [x] Updated the Bobaedream list row to `160px` thumbnail, `660px` info column, `193px` row height, and `16px` row padding.
- [x] Matched the listing information typography: title `16px / 24px / 600`, meta `14px / 20px / 400`, price `16px / 24px / 700`, location `14px / 20px / 400`, dealer line `12px / 18px / 400`.
- [x] Changed the PC list meta scenario to Chotot's order: year, mileage, fuel, transmission.
- [x] Hid PC-list-only badge and view count rows so the visible info density matches the Chotot list row.
- [x] Measured Chotot's top maker tile slot for the next icon pass: tile `84px x 102px`, label `14px / 21px / 400`, label color `#595959`, tile gap `8px`.
- [x] Updated the Bobaedream top category/maker rail to use the same `84px x 102px` slot, `8px` gap, and `14px / 21px / 400` label rhythm.

**Evidence**
- Source first-row screenshot: `captures/chotot-list-info/source-chotot-first-row-crop.png`
- Source first-row metrics: `captures/chotot-list-info/source-chotot-measurements.json`
- Source maker-area screenshot: `captures/chotot-list-info/source-chotot-brand-area-crop.png`
- Source maker-area metrics: `captures/chotot-list-info/source-chotot-brand-area-measurements.json`
- Implementation screenshot: `captures/chotot-list-info/impl-after-first-row-crop.png`
- Implementation metrics: `captures/chotot-list-info/impl-after-measurements.json`
- Combined comparison image: `captures/chotot-list-info/comparison-chotot-vs-bobae-list-info.png`
- Viewport: `1280 x 720`
- State: first desktop used-car listing row.

**Measured Pass**
- Source row: content lane `836px`, grid `176px / 660px`, thumbnail `160px`, title `16px / 24px / 600`, meta `14px / 21px / 400`, price `16px / 24px / 700`, location `14px / 21px / 400`, seller line `12px / 18px / 400`.
- Implementation row: content lane `836px`, grid `160px / 660px` with `16px` gap, thumbnail `160px`, title `16px / 24px / 600`, meta `14px / 20px / 400`, price `16px / 24px / 700`, location `14px / 20px / 400`, dealer line `12px / 18px / 400`.
- Implementation first-row visible text order: title, year/mileage/fuel/transmission, price, location, seller.
- Implementation top category/maker tile: `84px x 102px`, `8px` row gap, icon slot `52px`, label `14px / 21px / 400`, label color `#595959`.
- PC list badge row and view line both measure `display: none`.

final result: passed

# Bobaedream Used Car Chotot Thumbnail QA

**Findings**
- No actionable P0/P1/P2 issues in the final captured state.
- The list thumbnail slot now matches Chotot's square photo treatment before the final SVG icon replacement pass.

**Implementation Checklist**
- [x] Captured and measured the live Chotot listing thumbnail.
- [x] Updated list thumbnails to prefer the original car photo from `images[0]` and use `thumbnail` only as fallback.
- [x] Added real photo media to the first G80 scenario so the first row can be compared against the Chotot photo state instead of a no-photo placeholder.
- [x] Matched the image slot to `160px x 160px`, `8px` radius, clipped overflow, absolute full-fill image, and `object-fit: cover`.
- [x] Matched bottom overlay placement with a subtle gradient, left time label, right photo count, photo marker, and video marker.
- [x] Preserved the same behavior for mobile thumbnails by sharing the image-fit rule.

**Evidence**
- Source thumbnail screenshot: `captures/chotot-thumbnail/source-chotot-thumbnail-crop.png`
- Source thumbnail metrics: `captures/chotot-thumbnail/source-chotot-thumbnail-measurements.json`
- Implementation thumbnail screenshot: `captures/chotot-thumbnail/impl-bobae-thumbnail-crop.png`
- Implementation thumbnail metrics: `captures/chotot-thumbnail/impl-bobae-thumbnail-measurements.json`
- Implementation full-list screenshot: `captures/chotot-thumbnail/impl-bobae-list-thumb-1280.png`
- Combined comparison image: `captures/chotot-thumbnail/comparison-chotot-vs-bobae-thumbnail.png`
- Viewport: `1280 x 720`
- State: first desktop used-car listing row, photo/video thumbnail state.

**Measured Pass**
- Source thumbnail: `160px x 160px`, `8px` radius, clipped overflow, inner image `160px x 160px`, `object-fit: cover`.
- Implementation thumbnail: `160px x 160px`, `8px` radius, clipped overflow, inner image `160px x 160px`, `object-fit: cover`.
- Implementation overlay: left time label `11px / 14px / 700`, left `6px`, bottom `7px`; right media group `10px / 12px / 700`, right `6px`, bottom `7px`.
- Full row remained stable after image swap: first listing row height stays `193px`.

final result: passed

# Bobaedream Used Car Chotot Filter Width QA

**Findings**
- No actionable P0/P1/P2 issues in the final captured state.
- The Bobaedream left filter width already matches Chotot's right filter/card body width.

**Implementation Checklist**
- [x] Measured Chotot's right rail and actual right filter/card body width.
- [x] Measured the deployed Bobaedream left filter and main list layout.
- [x] Confirmed no CSS width change is needed.

**Evidence**
- Source screenshot: `captures/chotot-filter-width/source-chotot-right-filter-width.png`
- Source metrics: `captures/chotot-filter-width/source-chotot-right-filter-width.json`
- Implementation screenshot: `captures/chotot-filter-width/impl-bobae-left-filter-width.png`
- Implementation metrics: `captures/chotot-filter-width/impl-bobae-left-filter-width.json`
- Viewport: `1280 x 720`
- State: desktop used-car listing page.

**Measured Pass**
- Chotot right rail wrapper: `324px` total, made of `300px` side body plus `24px` left margin/gap.
- Chotot right filter/card body: `300px`.
- Bobaedream left filter body: `300px`.
- Bobaedream left filter to main list gap: `24px`.
- Bobaedream main list body: `876px`.
- Layout ratio matches directionally: Chotot `876 + 24 + 300`, Bobaedream `300 + 24 + 876`.

final result: passed

# Bobaedream Used Car Chotot List Width Divider QA

**Findings**
- No actionable P0/P1/P2 issues in the final captured state.
- The Bobaedream list column width and repeated listing-row separator rhythm match Chotot.

**Implementation Checklist**
- [x] Measured Chotot's list container, first four listing rows, inner content lane, and top-to-top row intervals.
- [x] Measured the deployed Bobaedream list container, first four listing rows, inner content lane, and top-to-top row intervals.
- [x] Confirmed no CSS width or row-height change is needed.

**Evidence**
- Source screenshot: `captures/chotot-list-width-divider/source-chotot-list-width-divider.png`
- Source metrics: `captures/chotot-list-width-divider/source-chotot-list-width-divider.json`
- Implementation screenshot: `captures/chotot-list-width-divider/impl-bobae-list-width-divider.png`
- Implementation metrics: `captures/chotot-list-width-divider/impl-bobae-list-width-divider.json`
- Combined comparison image: `captures/chotot-list-width-divider/comparison-chotot-vs-bobae-list-width-divider.png`
- Viewport: `1280 x 720`
- State: desktop used-car listing rows, list view.

**Measured Pass**
- Chotot list column: `876px`.
- Chotot inner content lane: `836px`.
- Chotot listing row repeat: `192.8px` top-to-top and bottom-to-bottom, `0px` gap between one row bottom and the next row top.
- Bobaedream list column: `876px`.
- Bobaedream inner row/content lane: `836px`.
- Bobaedream listing row repeat: `193px` top-to-top and bottom-to-bottom, `0px` gap between one row bottom and the next row top.
- Difference: `0.2px`, from Chotot's fractional browser layout; visually equivalent at `1x` density.

final result: passed

# Bobaedream Export Mobile List QA

**Findings**
- No actionable P0/P1/P2 issues in the final captured state.
- The export page intentionally ships as a mobile-list-only preview with no detail route; title/thumb clicks show a scoped toast.

**Implementation Checklist**
- [x] Added `bobaedream-export-mobile-list.html` as the public PC-friendly mobile preview wrapper.
- [x] Added `bobaedream-export-mobile-list-content.html` for the actual mobile list surface.
- [x] Reused the existing S03 mobile list structure and visual rhythm while replacing copy with English export-market terminology.
- [x] Added realistic export inventory scenarios: FOB price, ship-from port, LHD, inspection, export documents, seller type, video unit state, and export-ready badges.
- [x] Added mobile interactions for seller tabs, video-only filtering, maker selection, category filtering, sorting, favorites, reset, and export filter sheets.
- [x] Registered `S03-M-EX-L` in the work index.

**Evidence**
- Final wrapper capture: `captures/export-mobile-list/export-mobile-wrapper-top.png`
- Filtered state capture: `captures/export-mobile-list/export-mobile-wrapper-dealer-video.png`
- Source/target comparison capture: `captures/export-mobile-list/comparison-source-vs-export-frames.png`

**Measured Pass**
- Wrapper frame computed size: `390px x 844px`; iframe computed size: `390px x 844px`.
- iframe viewport width: `390px`; rendered content scroll width: `375px`, with no horizontal overflow.
- Base list renders 8 featured export-ready units from a virtual total of 286.
- Visible text Korean check: passed, no Korean characters in the export mobile surface.
- Interaction counts: base 8 rows, `Dealer` tab 7 rows, `Video Units` toggle 4 rows, `Dealer + Video + Kia` maker selection 1 row.
- `node --check bobaedream-export-mobile-list.js`: passed.
- `git diff --check` on touched files: passed.

final result: passed

# Bobaedream Used Car Active GNB QA

**Findings**
- No actionable P0/P1/P2 issues in the final captured state.
- The active PC GNB underline now uses black instead of Bobaedream blue.

**Implementation Checklist**
- [x] Changed `.bbNavLink.is-active::after` from `var(--blue)` to `#101114`.
- [x] Verified the active menu remains `홈` and the underline keeps the existing `3px` height.
- [x] Added a stylesheet version query to the list/detail pages so GitHub Pages and browser caches load the updated CSS immediately.

**Evidence**
- Implementation screenshot path: `captures/used-car-implementation/list-active-gnb-black-1440.png`
- Metrics path: `captures/used-car-implementation/list-active-gnb-black-metrics.json`
- Viewport: `1440 x 520`
- State: desktop used-car list top header.
- Focused region comparison evidence: active GNB underline computed as `rgb(16, 17, 20)` with `3px` height.
- Cache pass: list/detail pages load `bobaedream-used-car.css?v=gnb-black-20260830`.

final result: passed

# Bobaedream Used Car Header GNB QA

**Findings**
- No actionable P0/P1/P2 issues in the final captured state.
- Header and GNB now align to the used-car list shell width while preserving the existing desktop navigation density.

**Implementation Checklist**
- [x] Updated the shared header inner width from `1280px` to `1200px`.
- [x] Added `홈` as the first PC GNB link on both list and detail pages.
- [x] Kept `숏폼카` immediately after `홈`, ahead of the vehicle category links.
- [x] Updated the header active state so `홈` is highlighted instead of forcing `숏폼카` active.

**Evidence**
- Source visual truth path: `captures/used-car-implementation/list-chotot-width-1440.png`
- Implementation list screenshot path: `captures/used-car-implementation/list-header-gnb-1200-1440.png`
- Implementation detail screenshot path: `captures/used-car-implementation/detail-header-gnb-1200-1440.png`
- List metrics path: `captures/used-car-implementation/list-header-gnb-1200-metrics.json`
- Detail metrics path: `captures/used-car-implementation/detail-header-gnb-1200-metrics.json`
- Viewport: `1440 x 900`
- State: desktop used-car list and detail top screens.
- Full-view comparison evidence: the header inner rows and the list shell all render at `w=1200`, with matching left alignment at the same viewport.
- Focused region comparison evidence: GNB labels render in order `홈`, `숏폼카`, `국산차`, `수입차`, `매물등록`, `딜러`, `부품·용품`, `커뮤니티`, `더보기`; `홈` is the only active link.

**Measured Pass**
- List header inner rows: each `w=1200`.
- List shell: `w=1200`.
- List GNB: first link `홈`, second link `숏폼카`.
- Detail header inner rows: each `w=1200`.
- Header action group remains inside the 1200px lane; no document-originated console errors.

final result: passed

# Bobaedream Used Car Chotot Width QA

**Findings**
- No actionable P0/P1/P2 issues in the final captured state.
- The Chotot reference keeps the filter rail on the right; the implementation intentionally keeps Bobaedream's existing left filter placement while matching the measured Chotot sizing rhythm.

**Implementation Checklist**
- [x] Captured the Chotot desktop reference from `https://xe.chotot.com/mua-ban-oto-dien-sdfu4`.
- [x] Measured the reference desktop layout at `1440px`: outer content `1200px`, listing column `876px`, right-side filter card `300px`, and effective column gap `24px`.
- [x] Updated the S03 used-car PC list grid to `300px / 24px / 876px`, with a total shell width of `1200px`.
- [x] Verified mobile list still switches to the existing mobile UI and renders mock listing rows.

**Evidence**
- Source visual truth path: `captures/chotot-reference/desktop-1440-top.png`
- Source metrics path: `captures/chotot-reference/desktop-metrics.json`
- Implementation screenshot path: `captures/used-car-implementation/list-chotot-width-1440.png`
- Mobile regression screenshot path: `captures/used-car-implementation/list-chotot-width-mobile-390.png`
- Combined comparison image: `captures/used-car-implementation/comparison-chotot-width.png`
- Viewport: desktop `1440 x 1200`, mobile `390 x 844`
- Source pixels: `1440 x 1200`, CSS size `1440 x 1200`, device scale factor `1`
- Implementation capture pixels: `1425 x 1054`, CSS viewport `1440 x 1200`, device scale factor `1`; the in-app browser captured the viewport minus the visible scrollbar.
- State: top of S03 used-car list page, base mock listing state.
- Full-view comparison evidence: Chotot shows `876px` listing content plus `24px` gap plus `300px` right rail inside a `1200px` content shell. The Bobaedream implementation mirrors that as `300px` left filter plus `24px` gap plus `876px` listing content.
- Focused region comparison evidence: focused numeric measurement was sufficient for this change because the request was specifically about the listing/filter sizing, not typography, colors, or row content.

**Measured Pass**
- Implementation shell: `w=1200`, `grid-template-columns=300px 876px`, `gap=24px`.
- Filter panel: `w=300`.
- Main list column: `w=876`.
- Summary card and toolbar: both `w=876`.
- First row inner lane: `w=836`, `grid-template-columns=160px 660px`, matching the Chotot-style dense listing lane after row margins.
- Mobile regression: desktop list hidden, mobile list visible, 11 mock rows rendered, no document-originated console errors.

final result: passed

# Bobaedream Used Car Mobile Interaction QA

**Findings**
- No actionable P0/P1/P2 issues in the final captured state.
- Mobile list interactions now follow the source-style modern sheet pattern: full-screen filter/maker/region/generic sheets and rounded sort/view bottom sheets.

**Implementation Checklist**
- [x] Captured source mobile list and sheet references from `https://dev.bbmuseum.co.kr/car/list`.
- [x] Added the mobile used-car list surface to `bobaedream-used-car-list.html`.
- [x] Added responsive mobile CSS for the top search bar, filter chips, category rail, toolbar, list rows, bottom navigation, full sheets, and bottom sheets.
- [x] Added mobile interaction state in `bobaedream-used-car-interactions.js` for filter open/close, nested sheet switching, apply/close, reset, maker selection, region selection, sorting, seller tabs, video-only filtering, generic conditions, and favorite buttons.
- [x] Kept the PC list/detail surface intact by scoping the mobile app to `max-width: 767px`.

**Evidence**
- Source mobile list screenshot: `captures/used-car-source/source-mobile-list-top.png`
- Source mobile filter screenshot: `captures/used-car-source/source-mobile-filter-sheet.png`
- Source mobile maker screenshot: `captures/used-car-source/source-mobile-manufacturer-sheet-coordinate.png`
- Source mobile sort screenshot: `captures/used-car-source/source-mobile-sort-sheet-coordinate.png`
- Source mobile region screenshot: `captures/used-car-source/source-mobile-region-sheet-coordinate.png`
- Final mobile implementation screenshots: `captures/used-car-implementation/mobile-list-390.png`, `captures/used-car-implementation/mobile-filter-sheet-390.png`, `captures/used-car-implementation/mobile-maker-sheet-390.png`, `captures/used-car-implementation/mobile-sort-sheet-390.png`, `captures/used-car-implementation/mobile-region-sheet-390.png`
- Viewport: `390 x 844`

**Measured Pass**
- Mobile list is displayed and desktop list is hidden at `390px`; no horizontal overflow detected.
- Base mobile list renders 11 mock rows.
- Filter sheet opens with header `필터`, source-like filter rows, and `14,896대 보기` footer.
- Nested filter-to-maker transition opens `제조사 선택`; selecting `제네시스` updates the chip and filters to 3 rows.
- Sort bottom sheet opens; selecting `가격 높은순` updates the toolbar label and row ordering.
- Region sheet opens; selecting `경기` updates the region label and filters to 1 row.
- Video toggle turns on and filters to 6 video rows.
- Generic `연식` sheet opens with 6 selectable options.
- PC regression at `1440px`: mobile surface is hidden, desktop list remains visible, summary card stays at `x=272`, `y=141`, `w=1152`, `h=222`.
- Console and page errors checked with Playwright: passed.

final result: passed

# Bobaedream Used Car PC QA

**Findings**
- No actionable P0/P1/P2 issues in the final captured state.
- The implementation intentionally uses local mock data for the listing/detail content and local image assets for GitHub Pages stability.

**Implementation Checklist**
- [x] Captured the source PC list and detail surfaces from `https://dev.bbmuseum.co.kr/car/list`.
- [x] Added `bobaedream-used-car-list.html` with the source PC header, 240px left filter panel, 1152px list column, summary filter chips, category icons, seller tabs, video toggle, sort control, rows, and pagination.
- [x] Added `bobaedream-used-car-detail.html` with the 736px gallery/info column and 412px price/dealer right rail.
- [x] Added shared scenario data in `bobaedream-used-car-data.js`, including board-like virtual used-car inventory, detail specifications, options, insurance history, seller info, and related listings.
- [x] Added shared interactions in `bobaedream-used-car-interactions.js`: list filtering, seller tabs, video-only toggle, sort cycling, detail hydration by `id`, gallery thumbnails, sticky section tabs, favorite buttons, and toast feedback.
- [x] Saved source-derived logo/category/thumb assets and local high-resolution hero images under `assets/used-car/`.

**Evidence**
- Source list screenshot: `captures/used-car-source/source-list-desktop-top.png`
- Source detail screenshot: `captures/used-car-source/source-detail-desktop-top.png`
- Final implementation screenshots: `captures/used-car-implementation/list-final-1440.png`, `captures/used-car-implementation/detail-final-1440.png`
- Image-detail screenshot: `captures/used-car-implementation/detail-escalade-1440-v2.png`
- Sticky detail navigation screenshot: `captures/used-car-implementation/detail-sticky-nav-1440-v2.png`
- Viewport: `1440 x 1200`

**Measured Pass**
- List summary card: `x=272`, `y=141`, `w=1152`, `h=222`.
- List toolbar starts at `y=387`, matching the source rhythm.
- Initial list count renders as `14,896대`; 11 mock rows render on the base screen.
- Seller filter test: `개인` tab renders 2 rows.
- Video filter test: `영상 매물` toggle renders 6 rows.
- First list title links to `bobaedream-used-car-detail.html?id=d8yrckju0e`.
- Detail gallery: `x=140`, `y=141`, `w=736`, `h=412`.
- Detail price card: `x=888`, `y=141`, `w=412`, `h=302`; dealer card starts at `y=455`.
- Detail vehicle info card starts at `y=753`.
- Sticky section navigation appears at scrollY `700` with `x=140`, `top=0`, `w=736`.
- Console and page errors checked with Playwright: passed.

# Bobaedream PC Detail QA

**Findings**
- No actionable P0/P1/P2 issues in the final captured state.
- [P3] Source page uses League of Legends artwork and exact LCK copy, while the implementation intentionally adapts content to a Bobaedream automotive board.

**Open Questions**
- None for this pass. The requested scope is a PC detail-view mockup that follows the Chzzk Lounge board-detail typography and layout rhythm while using virtual Bobaedream scenarios.

**Implementation Checklist**
- [x] Capture source Chzzk detail page at `1440 x 1100`.
- [x] Recreate the shared PC shell: `60px` global bar, `250px` hero, `50px` dark tab navigation, `1280px` page wrapper, `190 / 742 / 300` grid.
- [x] Match the detail article card: `742px` center width, white `12px` card radius, `22px/30px` article title, `15px/22px` body text, author metadata and bookmark/menu controls.
- [x] Match the comment area rhythm: comment count, notice bar, disabled composer, cleanbot row, list comments, reaction pills, and bottom pager.
- [x] Replace right rail with virtual Bobaedream popular/latest scenarios.
- [x] Connect the PC list titles to the new detail page.
- [x] Add board-specific virtual scenarios: 15 PC board filters x 3 posts, with shared list/detail data and hydrated detail bodies.
- [x] Reorder the left menu sections so `커뮤니티` appears first and `차량 이야기` appears second.

**Follow-up Polish**
- Add a second detail state with photo attachments or accident-report media when the board scenario needs image-heavy posts.

## Evidence

- Source visual truth path: `artifacts/detail-source/desktop-fresh-top.png`
- Source URL: `https://game.naver.com/lounge/League_of_Legends/board/detail/8122112`
- Implementation screenshot path: `artifacts/detail-implementation/desktop.png`
- Combined comparison image: `artifacts/detail-implementation/comparison.png`
- Viewport: `1440 x 1100`
- Source pixels: `1440 x 1100`, CSS size `1440 x 1100`, device scale factor `1`
- Implementation pixels: `1440 x 1100`, CSS size `1440 x 1100`, device scale factor `1`
- State: top of PC board-detail page, logged-out comment composer
- Full-view comparison evidence: source and implementation use the same top-level composition and measured layout rhythm: page wrapper starts at `x=80`, center column at `x=294`, detail card at `x=294`, right rail at `x=1060`, and center card width `742px`. Implementation title starts at `x=318 y=586`, matching the captured source title top. Implementation comment count starts at `y=991`, about `18px` below the captured source because the Bobaedream scenario body wraps to two lines.
- Focused region comparison evidence: the title/header/body/comment regions were checked separately with browser metrics; focused screenshots were not necessary because the measured desktop top capture keeps these details legible.
- Primary interactions tested: list title link opens detail page, `목록` link returns to list, vote buttons increment their count, bookmark button toggles state, left board filters move to the selected board, write button opens the Chzzk-style write screen with login-required modal, demo login enables posting, submitted posts open in the detail page, comment composer and reply buttons show the login-required modal when logged out, logged-in comments and replies register in place, comment order toggles between `등록순` and `최신순`, refresh shows feedback.
- Board scenario pass: `bobaedream-pc-scenarios.js` provides 45 virtual posts across 15 boards, and every left board filter renders exactly 3 matching rows with detail links that hydrate the title, author, meta, and body from the same data source.
- Left menu order pass: list and detail pages both render the left sections as `커뮤니티 > 차량 이야기 > 구매/정비`; clicking `공지` filters the list and detail-side navigation still opens the selected board list.
- Console errors checked: no document-originated browser console errors in the final implementation capture.

## Required Fidelity Surfaces

### Fonts and Typography

- Uses the same system font stack as the PC list mockup.
- Source-measured detail title is `22px / 30px / 600`; implementation matches that value.
- Source-measured body copy is `15px / 22px / 400`; implementation matches that value.
- Comment count uses `15px / 19px / 700`; right rail titles use `17px / 20px / 400`.

### Spacing and Layout Rhythm

- The implementation keeps the source PC shell dimensions: `60px` global header, `250px` hero, `50px` tab bar, `82px` banner, and `190px / 742px / 300px` board columns with `24px` gaps.
- Article card starts after the `39px` navigation buttons with the same `15px` vertical gap as the source.
- Inner article and comment content use `24px` left/right padding with a `694px` content lane.

### Colors and Visual Tokens

- Background `#f8f9fd`, cards `#fff`, Bobaedream blue `#1264c4`, article title `#222`, body text `#333`, muted metadata `#858894`, and hairline dividers are preserved.
- The automotive hero and banner colors are adapted from the existing Bobaedream PC list mockup so list and detail pages feel like one product surface.

### Image Quality and Asset Fidelity

- Source game artwork is intentionally replaced with automotive imagery already used by the Bobaedream PC list direction.
- Images are cropped into the same roles as the existing mockup: hero, ad banner, left image grid, avatar, and right ad.

### Copy and Content

- Source LCK article/comment content is replaced with realistic Bobaedream automotive scenarios.
- Right rail content is virtual, as requested, with automotive popular/latest posts and a point quest module.

## Comparison History

1. Source captured from Chzzk detail page with desktop and mobile screenshots.
2. Implementation created as `bobaedream-pc-board-detail.html` using the previously deployed PC list shell.
3. Final browser capture confirms center width, comment count, right rail count, inter-page links, vote interaction, bookmark toggle, and absence of document-originated console errors.
4. Interaction pass added shared prototype behavior in `bobaedream-pc-interactions.js`. Browser verification confirms `전기차 충전소` filter activates and renders only matching rows, write flow creates a saved post and opens its detail page, comment registration increments `댓글 10` to `댓글 11`, reply registration increments to `댓글 12`, and detail-page left navigation opens the selected board list.
5. Board scenario pass adds 3 realistic automotive post scenarios per board: 국산차, 수입차, 전기차, SUV, 화물·특장, 중고차, 정비, 튜닝, 보험·사고, 블랙박스, 공지, 자유, 질문, 시승기, 출석체크.
6. Left area pass moves `커뮤니티` to the first board section and `차량 이야기` to the second board section.

final result: passed
