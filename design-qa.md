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
