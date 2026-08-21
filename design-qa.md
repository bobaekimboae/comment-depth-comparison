# 간결형 보기 방식 QA

## 비교 기준

- Source visual truth: `/workspace/scratch/c9ff4797639b/upload/01-1000012644.png`
- Source pixels: 709 × 1536 px, 모바일 캡처(상태 표시줄 포함)
- Implementation: `https://bobaekimboae.github.io/comment-depth-comparison/naver-cafe-list.html?v=eb7ebe2d2`
- Implementation capture: Cloud Browser 렌더링 화면, CSS 콘텐츠 폭 393 px, 브라우저 외곽은 비교에서 제외
- State: 보기 방식 편집에서 `간결형` 선택, 바텀시트 닫힘
- Primary interactions tested: 보기 방식 열기 → 간결형 라디오 선택 → 화면 전환 → 바텀시트 닫기
- Console: document-originated errors 없음. Cloud Browser 확장 프로그램의 메타데이터 전송 오류만 관찰됐으며 페이지 코드와 무관함.

## Comparison history

1. Initial compact view showed automotive category labels such as `[전기차]` in titles.
   - Fix: compact view renders the title without the category prefix.
2. Post-fix browser capture confirms one-line titles, green parenthesized reply counts, icon metadata, intermittent 60 px right thumbnails, and dark circular compose FAB.

## Required fidelity surfaces

### Fonts and typography

- Pretendard is used throughout.
- Compact titles are one line at 18 px/25 px with truncation; metadata is visually subordinate at 14 px.
- Parenthesized reply counts are green and attached to the title, matching the reference hierarchy.

### Spacing and layout rhythm

- White 76 px header and 58 px Home/Board tab row establish the same two-tier hierarchy.
- List rows use a compact 100 px rhythm, thin dividers, left new dots, and 60 px intermittent thumbnails.
- The fixed compose action is a dark circular button in the lower-right corner.

### Colors and visual tokens

- Compact mode uses a white background, charcoal text and tab underline, neutral-gray metadata, red new dots, and green reply counts.
- The red Bobaedream shell is suppressed only while compact mode is active.

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
- [x] Apply the Chzzk-inspired compact header, tabs, title truncation, icon metadata, thumbnail rhythm, and compose action.
- [x] Verify the deployed compact view in the browser.

## Follow-up polish

- If a production game-board variant is needed later, supply game-specific thumbnail assets while keeping this layout token set.

final result: passed
