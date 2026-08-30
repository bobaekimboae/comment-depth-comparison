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
