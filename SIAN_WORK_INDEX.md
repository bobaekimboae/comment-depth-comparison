# 시안 작업 순번표

앞으로 이 저장소의 시안 작업은 아래 순번과 명칭으로 고정한다.

## 호출 규칙

- `S01`, `S02`, `S03`은 사이트/제품 영역 번호다.
- `L`은 리스트, `D`는 상세, `W`는 글쓰기, `C`는 댓글/상호작용, `M`은 모바일, `P`는 PC다.
- 예시: `S02-L`은 보배드림 커뮤니티 PC 리스트, `S03-M-필터`는 중고차 모바일 필터 시트다.
- 배포 링크는 GitHub Pages URL 뒤에 `?v=커밋해시`를 붙여 캐시를 우회한다.
- 새 시안은 활성 파일명에는 버전 번호를 붙이지 않고, 검증 캡처와 QA 기록은 `design-qa.md`에 남긴다.

## 확정 순번

| 순번 | 확정 명칭 | 짧은 호출명 | 화면 코드 | 대표 파일 | 현재 상태 |
| --- | --- | --- | --- | --- | --- |
| S00 | 댓글/보기 방식 연구소 | 연구소 | LAB | `comment-ui-lab.html`, `depth-viewer.html`, `board-view-sheet-prototype.html` | 참고/실험 |
| S01 | 보배드림 커뮤니티 모바일 | 커뮤모바일 | `S01-M-L`, `S01-M-D`, `S01-M-시트` | `naver-cafe-list.html`, `naver-cafe-detail.html`, `board-view-sheet-prototype.html` | 모바일 기준 시안 |
| S02 | 보배드림 커뮤니티 PC | 커뮤PC | `S02-P-L`, `S02-P-D`, `S02-P-W`, `S02-P-C` | `bobaedream-pc-board-list.html`, `bobaedream-pc-board-detail.html` | 리스트/상세/글쓰기/댓글 동작 완료 |
| S03 | 보배드림 중고차 매물 | 중고차 | `S03-P-L`, `S03-P-D`, `S03-M-L`, `S03-M-필터` | `bobaedream-used-car-list.html`, `bobaedream-used-car-detail.html` | PC 리스트/상세, 모바일 리스트/필터 시트 완료 |

## 활성 배포 URL

| 코드 | 화면 | URL |
| --- | --- | --- |
| S01-M-L | 커뮤니티 모바일 리스트 | https://bobaekimboae.github.io/comment-depth-comparison/naver-cafe-list.html |
| S01-M-D | 커뮤니티 모바일 상세 | https://bobaekimboae.github.io/comment-depth-comparison/naver-cafe-detail.html |
| S02-P-L | 커뮤니티 PC 리스트 | https://bobaekimboae.github.io/comment-depth-comparison/bobaedream-pc-board-list.html |
| S02-P-D | 커뮤니티 PC 상세 | https://bobaekimboae.github.io/comment-depth-comparison/bobaedream-pc-board-detail.html |
| S03-P/M-L | 중고차 매물 리스트 | https://bobaekimboae.github.io/comment-depth-comparison/bobaedream-used-car-list.html |
| S03-P-D | 중고차 매물 상세 | https://bobaekimboae.github.io/comment-depth-comparison/bobaedream-used-car-detail.html?id=d8yrckju0e |

## 작업 우선순위 원칙

1. S01은 모바일 커뮤니티 기준 시안으로 유지한다.
2. S02는 PC 커뮤니티 게시판 기준 시안으로 확장한다.
3. S03은 중고차 매물/상세/필터 기준 시안으로 확장한다.
4. 새 기능이 기존 사이트에 붙으면 같은 S 번호 안에서 화면 코드만 추가한다.
5. 전혀 다른 제품 영역이 생길 때만 S04부터 새 번호를 배정한다.

## 다음 예약 순번

| 예약 순번 | 후보 명칭 | 배정 조건 |
| --- | --- | --- |
| S04 | 보배드림 매물등록/판매자 센터 | 중고차 등록, 딜러 등록, 판매자 관리가 독립 화면으로 커질 때 |
| S05 | 보배드림 마이/찜/알림 | 회원 개인화 화면을 본격 시안화할 때 |
| S06 | 보배드림 딜러/상사 페이지 | 딜러 프로필, 상사 매물, 상담 흐름을 별도 제품 영역으로 만들 때 |

final rule: 사용자가 번호만 말하면 위 순번을 기준으로 해석한다.
