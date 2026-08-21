# 게시판 보기 방식 QA

## 비교 기준

- Source visual truth: `/workspace/scratch/c9ff4797639b/upload/02-1000012648.png`
- Source pixels: 709 × 1536 px, 모바일 캡처(상태 표시줄 포함)
- Implementation: `https://bobaekimboae.github.io/comment-depth-comparison/naver-cafe-list.html?v=5a68782c`
- Implementation capture: Cloud Browser 렌더링 화면, CSS 콘텐츠 폭 393 px, 브라우저 외곽은 비교에서 제외. 최종 상태에서 네이버 카페 인기글형의 낮은 흰색 `커뮤니티` 헤더, 좌측 안전 여백에 맞춘 셰브론, 첨부 검색·전체 메뉴 자산, 치지직형 회색 밴드로 분리한 `자유게시판` 도구줄과 36 px 자동차 커뮤니티 프사, 탭 굵기와 언더라인으로만 선택 상태를 구분한 상단 4탭, 차콜 글쓰기 버튼을 확인함.
- State: 보기 방식 편집에서 `간결형` 선택, 바텀시트 닫힘
- Primary interactions tested: 보기 방식 열기 → 간결형 라디오 선택 → 화면 전환 → 바텀시트 닫기
- Console: document-originated errors 없음. Cloud Browser 확장 프로그램의 메타데이터 전송 오류만 관찰됐으며 페이지 코드와 무관함.

## Comparison history

1. Initial compact view showed automotive category labels such as `[전기차]` in titles.
   - Fix: compact view renders the title without the category prefix.
2. Post-fix browser capture confirms one-line titles, green parenthesized reply counts, icon metadata, intermittent right thumbnails, and dark circular compose FAB.
3. Scope refinement: compact mode is now limited to board-list rows; the Bobaedream header, category tabs, notice row, and compose action remain unchanged.
4. Density calibration: the initial 60 px thumbnails and 100 px rows were visibly larger than the Chzzk source.
   - Fix: thumbnail set to 48 px; list row to 64 px plus divider (browser-measured 65 px); recommendation/view icons set to 12 px.
   - Post-fix evidence: final deployed browser state reports `compact: true`, thumbnail `48 × 48 px`, row `65 px`, and meta icon `12 × 12 px`.
5. Typography calibration: title, reply count, and meta text in the Bobaedream capture remained heavier and larger than the Chzzk source.
   - Fix: title `17 px/420/22 px`, parenthesized reply count `16 px/500`, metadata `13 px`; meta icon `11 px` with a `3 px` gap before its number and `6 px` between metadata groups.
   - Post-fix evidence: deployed browser computed styles match those values with `compact: true`.
6. Reply-count preservation: inline reply counts could be cut off when a one-line title reached its clamp boundary.
   - Fix: split the compact title into a truncating `compactTitleText` region and a non-shrinking reply-count region.
   - Post-fix evidence: a long-title row truncates only its title while the `(28)` reply count remains fully visible.
7. Bobaedream token alignment and prefix repair: the source-prefix removal rule left a leading `]` on compact titles, and the compact color token drifted toward the Chzzk reference.
   - Fix: correct the prefix matcher to consume the closing bracket; use the Bobaedream list tokens `#111` for titles and `#96989D` for metadata. Chzzk remains the reference for compact density, one-line truncation, and thumbnail scale only.
   - Post-fix evidence: deployed browser state reports `strayPrefix: false`, title `rgb(17, 17, 17)`, metadata `rgb(150, 152, 157)`, and blue reply counts `rgb(35, 143, 227)`.
8. Reply alignment and compact rhythm: reply counts were locked to the far end of the title lane instead of following the visible title, while rows and thumbnails were slightly undersized against the source capture.
   - Fix: make only the title text shrinkable (`flex: 0 1 auto`) and keep the reply count adjacent; set the compact row rhythm to 68 px content + divider and thumbnails to 50 px.
   - Post-fix evidence: deployed browser measures a 69 px row step, 50 × 50 px thumbnail, 4 px title–reply gap, and a fully visible reply count.
9. Metadata icon and image-count optical scale: the compact icons and thumbnail count read smaller than the Chzzk reference at the same screen scale.
   - Fix: increase compact metadata icons from 10.5 px to 12 px; increase the thumbnail count to 9 px in a 16 px capsule.
   - Post-fix evidence: deployed browser measures 12 × 12 px metadata icons and a 9 px image-count label in a 16 px-high capsule.
10. Board-control simplification: the prior red news chip, separate notice chip, and subscription action made the list header materially heavier than the Chzzk board-control pattern.
   - Fix: replace that group with a plain `자유 ▾` board selector; place `보기 방식` and `목록형 ▾` as equal-height right controls. The Bobaedream app header, category row, and notice post remain unchanged.
   - Post-fix evidence: deployed browser confirms the news/notice top controls are absent, board-control height is 56 px, and both right controls have 44 px touch height with matching vertical centers.
11. Compact reply and board-selection calibration: reply counts needed to remain subordinate to the title while retaining the board's blue token; the top board name needed the source's selectable-board behavior.
   - Fix: set compact replies to `15 px / 500` with a 4 px title gap; retain the `15.5 px / 400` Bobaedream title and `#96989D` metadata. Rename the selector to `자유게시판` and add a Chzzk-pattern `게시판 선택` bottom sheet. Reduce the compose FAB to `60 px` with a `28 px` pencil icon.
   - Post-fix evidence: deployed browser reports reply `15 px / 500 / rgb(35, 143, 227)`, title `15.5 px / 400 / rgb(17, 17, 17)`, 4 px title–reply gap, 50 × 50 px thumbnail, and 60 × 60 px FAB. The sheet opens with `자유게시판` selected; selecting `테슬라` closes it, changes the toolbar label, activates the Tesla tab, and renders four matching posts.
12. Lounge shell and recommendation-icon replacement: the Bobaedream red title header retained too much product chrome for the selected Chzzk lounge reference, and the former up-vote icon read as voting rather than a general recommendation.
   - Fix: replace it with a 64 px white `커뮤니티` header using the supplied back, search, and hamburger SVGs; place a 1 px divider between the two right actions. Add the four-way fixed GNB `홈 / 게시판 / 제보 / 결함`. Replace recommendation/up-vote rendering with the supplied outline-heart SVG.
   - Post-fix evidence: deployed browser reports a white 64 px header, supplied header assets at 23 px / 27 px / 27 px, 62 px GNB, and a 60 px FAB with 14 px clearance above the GNB. Selecting `제보` updates its active state and toast; compact metadata uses `assets/heart.svg` at 12 × 12 px.
13. Bottom anchoring and left-chevron calibration: the GNB read slightly tall/high in the browser capture, while the left chevron's visible mark needed to sit closer to the Chzzk reference's screen edge.
   - Fix: reduce the GNB to 56 px, keep it fixed at viewport bottom, move the FAB down to a 10 px clearance above it, and set the header's left padding to 8 px (visible chevron mark lands at approximately 16 px after SVG internal spacing). Change the FAB fill to Airbnb-style charcoal `#252525`.
   - Post-fix evidence: deployed browser reports GNB `56 px` at `bottom: 0`, FAB bottom offset `66 px`, 10 px FAB–GNB clearance, header height `64 px`, and charcoal FAB `rgb(37, 37, 37)`.
14. Primary-navigation hierarchy: a fixed bottom GNB obscured the reference's header-to-board-tab hierarchy, which presents its primary sections directly below the app header.
   - Fix: move `홈 / 게시판 / 제보 / 결함` to a non-fixed, four-column top navigation immediately after the app bar. Set the navigation to 64 px; use 20 px labels and a 58 × 4 px charcoal underline for the active tab. Return the charcoal compose FAB to the bottom-safe area.
   - Post-fix evidence: deployed browser reports the navigation directly after `.appbar`, `64 px` height, `position: relative`, active `게시판`, and FAB `rgb(37, 37, 37)` at 22 px from the viewport bottom. Selecting `제보` changes the active tab and displays the selection toast with no document-originated console errors.
15. Top-navigation optical weight: the initial four-way top navigation was heavier and taller than the Chzzk reference hierarchy, competing with the app title and board toolbar.
   - Fix: reduce the tab strip from 64 px to 56 px; reduce labels from `20 px / 720` to `17 px / 650`, active weight from 820 to 760, and active underline from `58 × 4 px` to `48 × 3 px`.
   - Post-fix evidence: deployed browser reports `56 px` navigation height, `17 px / 650` inactive labels, `17 px / 760` active label, and `48 × 3 px` underline. Selecting `제보` still changes the active state and shows `제보 메뉴 선택`; document-originated console errors are absent.
16. Karrot-scale top navigation and divider: the Chzzk-scale strip still occupied too much vertical space for the automotive board, and its shadow was stronger than the supplied Karrot community reference.
   - Fix: set the strip to 52 px with `15 px / 600` inactive labels and `15 px / 700` active label; retain a `48 × 2 px` active underline and use only a `#e5e6e9` 1 px lower divider, without elevation.
   - Post-fix evidence: deployed browser reports `52 px` navigation height, `15 px / 600` labels, `15 px / 700` active label, `48 × 2 px` underline, `1 px solid rgb(229, 230, 233)` lower divider, and `box-shadow: none`. Document-originated console errors are absent.
17. Final Naver-community header and top-navigation hierarchy: the supplied Naver Cafe popular-post reference has a quiet title bar and dark, readable tabs that differ through emphasis rather than through a large color or size jump.
   - Fix: use a 60 px, shadow-free header with `커뮤니티` at `19 px / 700`; use a 50 px top navigation with `16 px / 520` inactive labels in `#4B4D52`, an active `16 px / 720` label in `#111214`, a `44 × 3 px` underline, and a single 1 px lower divider.
   - Post-fix evidence: deployed browser reports header `60 px`, title `19 px / 700`, no header shadow; navigation `50 px`, inactive `16 px / 520 / rgb(75, 77, 82)`, active `16 px / 720 / rgb(17, 18, 20)`, underline `44 × 3 px`, and no document-originated console errors.
18. Board-toolbar separation: the line above the top navigation created unnecessary header chrome, while the `자유게시판` row lacked the visual bands that separate the Chzzk board-control layer from navigation and categories.
   - Fix: remove the app-header lower border. Surround the 56 px board toolbar with 8 px `#f6f7f8` bands and 1 px `#e7e8eb` upper and lower dividers; preserve the top-navigation lower divider.
   - Post-fix evidence: deployed browser reports no app-header border, top-navigation `1 px solid rgb(229, 230, 233)` divider, and board-toolbar 8 px upper/lower bands with matching `1 px solid rgb(231, 232, 235)` dividers. No document-originated console errors were observed.
19. Board identity and quiet notice treatment: the board selector needed a compact identity anchor, and the red notice treatment was visually louder than the surrounding list.
   - Fix: calibrate the inner board-control row to 48 px while retaining 8 px `#f6f7f8` bands and its hairline dividers; add a 28 px circular automobile-community avatar before `자유게시판`. Change the notice chip to `#f4f5f6` / `#74777d`, lower the notice title to weight 520, and use a regular-weight immediate blue reply count `(39)` after the title.
   - Post-fix evidence: deployed browser reports a complete 28 × 28 px avatar (96 px natural image), 48 px toolbar with 8 px top/bottom margins, notice chip `rgb(244, 245, 246)` / `rgb(116, 119, 125)`, notice title weight 520, and `(39)` at weight 400. No document-originated console errors were observed.
20. Compact metadata icon optical alignment: the 24 px heart source and 20 px eye source occupied different amounts of their SVG viewboxes even when their CSS boxes were equal.
   - Fix: place recommendation and view metrics in dedicated 16 px flex rows; retain a 12 px heart box and set the eye box to 14 px so both visible glyphs share the same vertical center.
   - Post-fix evidence: deployed compact view reports heart `12 × 12 px`, eye `14 × 14 px`, and a `0 px` center-line delta.
21. Naver Cafe feed view: a generic `피드형` name would collide with the planned Reddit and Threads variants, and the existing list renderer could not express the Cafe feed's author-to-media rhythm.
   - Fix: add an independent `피드 네이버 카페` radio option. It renders author avatar and time, fresh-title dot, two-line excerpt, rounded `4:3` photo/video media, image count, heart/comment actions, and right-aligned views as consecutive feed cards. Rebound the public view button after the enhanced editor override so it opens the new option.
   - Post-fix evidence: browser-selected feed state reports `mode: true`, `typeLabel: 피드 네이버 카페`, `30` cards, a `31 px` author avatar, and first media `359 × 269.25 px` with computed `4 / 3` aspect ratio. The public control visibly lists `피드 네이버 카페`; no document-originated console errors were observed.

## Required fidelity surfaces

### Fonts and typography

- Pretendard is used throughout.
- Compact titles are one line at 15.5 px/21 px, weight 400, and Bobaedream list color `#111`; metadata is visually subordinate at 12.5 px with 12 px icons and `#96989D`.
- Parenthesized reply counts are blue and attached to the title, following the board's existing comment-color convention while remaining fully visible after title truncation.

### Spacing and layout rhythm

- The existing Bobaedream header, category tabs, notice row, and compose action remain outside this view-mode change.
- List rows use a compact 68 px rhythm plus a 1 px divider, thin dividers, left new dots, and 50 px intermittent thumbnails. The compose FAB is 60 px with a 28 px pencil icon.

### Colors and visual tokens

- Compact list rows use Bobaedream neutral-gray metadata, red new dots, blue reply counts, and the existing Bobaedream shell.

### Image quality and asset fidelity

- The reference contains game artwork; this automotive board intentionally retains automotive post imagery while preserving equivalent thumbnail size, corner radius, intermittent placement, and count overlay.

### Copy and content

- Product naming is adapted from the game-lounge title to `자동차토론`.
- Original source labels are removed from compact titles, preserving the reference's clean single-title scan pattern.

### Naver Cafe feed comparison

- Source visual truth: `/workspace/scratch/c9ff4797639b/upload/01-1000012739.png`
- Source pixels: `709 × 1536 px`; normalized to `393 × 851 px` for comparison.
- Implementation screenshot: `/workspace/scratch/feed-cafe-mobile-5a68782c.jpg`
- Combined full-view comparison: `/workspace/scratch/feed-cafe-comparison-5a68782c.jpg`
- Implementation pixels / CSS content size / density: `393 × 852 px` crop from a Cloud Browser render; `393 px` content width; density normalized to the source width before comparison.
- State: `보기 방식 → 피드 네이버 카페 → 게시판에 적용`.
- Primary interaction tested: the visible `피드 네이버 카페` radio selected successfully and `게시판에 적용` returned to the feed list with the type label updated.
- Full-view evidence: the normalized comparison shows the same author → fresh title → excerpt → dominant rounded media → reaction/view order and a matching thin card-divider rhythm. The product shell remains intentionally the existing community header and top menu rather than the source Cafe's dark header.
- Focused-region evidence: author block (31 px circular avatar, name and time), 4:3 media, lower-right count badge, and action row were checked from the captured top card; a separate region image was not needed because these details remain legible in the combined capture.
- Console: Cloud Browser extension metadata messages were present only from `chrome-extension://…`; document-originated errors were absent.

## Findings

- [P3] Source-specific game art and title copy differ by intent.
  - Evidence: the reference is Dragon Village 3; this prototype is an automotive Bobaedream board.
  - Decision: preserve vehicle imagery and automotive titles while matching the view pattern.
- [P3] Feed shell differs intentionally.
  - Evidence: the source uses Naver Cafe's dark top header and Cafe-specific chips, while this screen retains the shared automotive community shell.
  - Decision: the requested scope is the new feed view type; use the shared shell so future `피드 레딧` and `피드 스레드` variants can sit beside it consistently.

## Implementation checklist

- [x] Add `간결형` to the view selector.
- [x] Rename the expanded list option to `상세 목록형`.
- [x] Apply Chzzk-inspired title truncation, 12 px icon metadata, 50 px thumbnail rhythm, and 68 px compact row density to the list area only.
- [x] Keep the reply count immediately after the visible title while preserving it on long titles.
- [x] Verify the deployed compact view in the browser.
- [x] Add and verify the `자유게시판` bottom-sheet selector and Chzzk-scale compose FAB.
- [x] Replace the red title header with the supplied lounge icons, add the four-way GNB, and verify the heart recommendation icon.
- [x] Lower and reduce the fixed GNB, move the visible left chevron toward the reference edge, and switch the compose FAB to charcoal black.
- [x] Move `홈 / 게시판 / 제보 / 결함` from the bottom GNB to the app-bar-adjacent Chzzk-style top tab strip.
- [x] Reduce the upper four-tab GNB visual weight to the Chzzk-style hierarchy.
- [x] Recalibrate the top GNB to the supplied Karrot community reference and replace its shadow with a hairline divider.
- [x] Finalize the header and top navigation with the supplied Naver Cafe popular-post hierarchy.
- [x] Remove the line above the top menu and add Chzzk-style bands and dividers around the board toolbar.
- [x] Match the board-toolbar inner rhythm to Chzzk, add the circular automotive board avatar, and soften the notice row with FM Korea-style blue bracket replies.
- [x] Add and deploy the independently named `피드 네이버 카페` view type, then select it in the public editor and verify its feed-card layout.

## Follow-up polish

- If a production game-board variant is needed later, supply game-specific thumbnail assets while keeping this layout token set.
- Add `피드 레딧` and `피드 스레드` as separate view IDs rather than changing the `피드 네이버 카페` renderer.

final result: passed
