# 간결형 보기 방식 QA

## 비교 기준

- Source visual truth: `/workspace/scratch/c9ff4797639b/upload/02-1000012648.png`
- Source pixels: 709 × 1536 px, 모바일 캡처(상태 표시줄 포함)
- Implementation: `https://bobaekimboae.github.io/comment-depth-comparison/naver-cafe-list.html?v=48423da`
- Implementation capture: Cloud Browser 렌더링 화면, CSS 콘텐츠 폭 393 px, 브라우저 외곽은 비교에서 제외. 최종 간결형 목록 화면을 원본 캡처와 함께 시각 비교함. 최종 캡처에서 제목 바로 뒤 댓글, 50 px 썸네일, 69 px 행 리듬을 확인함.
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

## Required fidelity surfaces

### Fonts and typography

- Pretendard is used throughout.
- Compact titles are one line at 15.5 px/21 px, weight 400, and Bobaedream list color `#111`; metadata is visually subordinate at 12.5 px with 10.5 px icons and `#96989D`.
- Parenthesized reply counts are blue and attached to the title, following the board's existing comment-color convention while remaining fully visible after title truncation.

### Spacing and layout rhythm

- The existing Bobaedream header, category tabs, notice row, and compose action remain outside this view-mode change.
- List rows use a compact 68 px rhythm plus a 1 px divider, thin dividers, left new dots, and 50 px intermittent thumbnails.

### Colors and visual tokens

- Compact list rows use Bobaedream neutral-gray metadata, red new dots, blue reply counts, and the existing Bobaedream shell.

### Image quality and asset fidelity

- The reference contains game artwork; this automotive board intentionally retains automotive post imagery while preserving equivalent thumbnail size, corner radius, intermittent placement, and count overlay.

### Copy and content

- Product naming is adapted from the game-lounge title to `자동차토론`.
- Original source labels are removed from compact titles, preserving the reference's clean single-title scan pattern.

## Findings

- [P3] Source-specific game art and title copy differ by intent.
  - Evidence: the reference is Dragon Village 3; this prototype is an automotive Bobaedream board.
  - Decision: preserve vehicle imagery and automotive titles while matching the view pattern.

## Implementation checklist

- [x] Add `간결형` to the view selector.
- [x] Rename the expanded list option to `상세 목록형`.
- [x] Apply Chzzk-inspired title truncation, 12 px icon metadata, 50 px thumbnail rhythm, and 68 px compact row density to the list area only.
- [x] Keep the reply count immediately after the visible title while preserving it on long titles.
- [x] Verify the deployed compact view in the browser.

## Follow-up polish

- If a production game-board variant is needed later, supply game-specific thumbnail assets while keeping this layout token set.

final result: passed
