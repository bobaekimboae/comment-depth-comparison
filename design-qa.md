# 간결형 보기 방식 QA

## 비교 기준

- Source visual truth: `/workspace/scratch/c9ff4797639b/upload/02-1000012648.png`
- Source pixels: 709 × 1536 px, 모바일 캡처(상태 표시줄 포함)
- Implementation: `https://bobaekimboae.github.io/comment-depth-comparison/naver-cafe-list.html?v=dbaf4fe23`
- Implementation capture: Cloud Browser 렌더링 화면, CSS 콘텐츠 폭 393 px, 브라우저 외곽은 비교에서 제외. 최종 간결형 목록 화면을 원본 캡처와 함께 시각 비교함.
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

## Required fidelity surfaces

### Fonts and typography

- Pretendard is used throughout.
- Compact titles are one line at 17 px/22 px with truncation; metadata is visually subordinate at 13 px with 11 px icons.
- Parenthesized reply counts are green and attached to the title, matching the reference hierarchy.

### Spacing and layout rhythm

- The existing Bobaedream header, category tabs, notice row, and compose action remain outside this view-mode change.
- List rows use a compact 64 px rhythm plus a 1 px divider, thin dividers, left new dots, and 48 px intermittent thumbnails.

### Colors and visual tokens

- Compact list rows use neutral-gray metadata, red new dots, and green reply counts inside the existing Bobaedream shell.

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
- [x] Apply Chzzk-inspired title truncation, 12 px icon metadata, 48 px thumbnail rhythm, and 64 px compact row density to the list area only.
- [x] Verify the deployed compact view in the browser.

## Follow-up polish

- If a production game-board variant is needed later, supply game-specific thumbnail assets while keeping this layout token set.

final result: passed
