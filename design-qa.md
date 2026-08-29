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
- Primary interactions tested: list title link opens detail page, `목록` link returns to list, vote buttons increment their count, bookmark button toggles state.
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

- Background `#f8f9fd`, cards `#fff`, source purple `#4e41db`, article title `#222`, body text `#333`, muted metadata `#858894`, and hairline dividers are preserved.
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

final result: passed
