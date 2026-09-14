# Sony Store KR 디자인 토큰 가이드

**출처** `https://store.sony.co.kr/` — 번들 스타일시트 `main.5bf2c4fe.css` (829 KB, 2026-09-14 수집)
**토큰 파일** `src/styles/tokens.css` · **화면** 메인 랜딩 `/` (`src/views/DesignGuidePage.tsx`, 데이터 `src/lib/sony-guide-data.ts`)

사이트의 CSS를 통째로 받아 실제 선언 빈도를 세고, 그 수치를 근거로 토큰을 정리했다. 추정값은 없다. 아래 표의 "사용 횟수"는 원본 CSS에서 해당 값이 선언된 횟수다.

---

## 1. 폰트

### 패밀리

| 역할 | 폰트 | 웨이트 | 비고 |
|---|---|---|---|
| 기본 (영문·숫자 우선) | **SST Pro** | 300 / 400 / 700 / 900 | Sony 전용 서체. `alphauniverseglobal.media.zestyio.com`에서 woff2 로드 |
| 한글 | **Noto Sans KR** | 400 / 500 / 700 | 셀프호스팅 woff2. SST Pro에 한글 글리프가 없어 폴백으로 잡힌다 |
| 시스템 폴백 | -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial | — | |

```css
/* body 정본 */
font-family: "SSTPro", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
```

**두 가지 스택이 공존한다.** 기본은 SST Pro가 앞이지만, 배송 시각처럼 한글이 주가 되는 강조 텍스트에서는 `"Noto Sans KR", "SSTPro", …` 순으로 뒤집는다. 영문·숫자가 SST Pro로 렌더되면 Noto Sans KR 한글과 굵기·x-height가 어긋나기 때문이다.

> SST Pro는 Sony 라이선스 서체다. 외부 프로젝트에서 그대로 쓸 수 없으므로 **Noto Sans KR 단독**(`@fontsource/noto-sans-kr` 400/500/700)으로 대체한다. 이 저장소의 `--font-sans`가 그렇게 잡혀 있다.

### 본문 기본값

```css
body {
  font-size: 14px;
  line-height: 1.4;
  letter-spacing: -0.025em;
  word-break: keep-all;
  color: #666;
}
```

### 타입 스케일

| 토큰 | 크기 | 사용 횟수 | 대표 용도 |
|---|---|---|---|
| `--sony-text-2xs` | 10px | 27 | 배지 라벨 |
| `--sony-text-xs` | 12px | 228 | 캡션, 배지, 링크, 에러 |
| `--sony-text-sm` | 13px | 33 | 밑줄 링크 |
| `--sony-text-base` | **14px** | **436** | 본문, 버튼(sm) |
| `--sony-text-md` | 16px | 304 | 본문 강조, 버튼(md), 상품가 단위 |
| `--sony-text-lg` | 18px | 139 | 인풋, 버튼(lg), 상품가 |
| `--sony-text-xl` | 20px | 90 | 컴포넌트 소제목, 상품가(num), 페이지 설명 |
| `--sony-text-2xl` | 24px | 86 | h3, 할인율, 쿠폰가 |
| `--sony-text-3xl` | 32px | 26 | h2, 컴포넌트 제목 (`.cmpnt__title`) |
| `--sony-text-4xl` | 40px | 14 | h1, 배너 제목 |
| `--sony-text-5xl` | 48px | 13 | 페이지 제목 (`.page__title`) |

70 / 72 / 80 / 104px는 히어로 배너 한두 곳에서만 쓰인다. 토큰화하지 않는다.

**반응형 축소 규칙** — 640px 이하에서 제목 3단이 통째로 한 단씩 내려간다.

| 요소 | 데스크톱 | 모바일 (≤640) |
|---|---|---|
| h1 / `.page__title` | 40 / 48px | 24px |
| h2 / `.cmpnt__title` | 32px | 20 ~ 24px |
| h3 | 24px | 18px |
| `.page__desc` | 20px | 14px |

### 웨이트

| 웨이트 | 사용 횟수 | 용도 |
|---|---|---|
| **700** | **307** | 제목, 가격, 버튼, 배지, 탭 — 강조는 전부 Bold |
| 400 | 75 | 본문 |
| 500 | 74 | 링크, 보조 텍스트, 취소선 원가 |
| 300 | 11 | 큰 숫자·히어로 카피 |

굵기가 곧 위계다. 색으로 위계를 만드는 대신 700과 400 두 단으로 대부분을 해결한다. 600은 4회뿐이라 쓰지 않는다.

### 행간 / 자간

| 속성 | 값 | 비고 |
|---|---|---|
| 본문 행간 | 1.4 (14px → 20~22px) | px 고정값(22px 73회, 18px 62회, 24px 53회)이 더 많다 |
| 제목 행간 | 1.1 ~ 1.375 | 32px → 44px, 48px → 48px |
| 본문 자간 | **-0.025em** (71회) | 한글 기본. px로는 -0.35 ~ -0.45px |
| 제목 자간 | -1px | 32px 이상 |
| 가격 자간 | 0 | 숫자는 자간을 풀어 읽힌다 |

---

## 2. 색상

### 뉴트럴 (사이트 정본 CSS 변수)

사이트가 `:root`에 직접 선언한 유일한 색 팔레트다. 채도가 살짝 있는 쿨 그레이.

| 토큰 | HEX | 미리보기 |
|---|---|---|
| `--sony-color-neutral-90` | `#15181f` | ■ 가장 어두움 — 배지 텍스트, 다크 서피스 |
| `--sony-color-neutral-80` | `#2b303c` | ■ |
| `--sony-color-neutral-70` | `#434853` | ■ |
| `--sony-color-neutral-60` | `#5b6069` | ■ |
| `--sony-color-neutral-50` | `#747780` | ■ 링크, GNB 탭 비활성 |
| `--sony-color-neutral-40` | `#a4a7ad` | ■ 푸터 사업자 정보 |
| `--sony-color-neutral-30` | `#bdbfc3` | ■ |
| `--sony-color-neutral-20` | `#d5d7d9` | ■ 구분선 |
| `--sony-color-neutral-10` | `#eeeef0` | ■ GNB 탭 하단선 |

### 그레이 (실사용 하드코딩값)

정본 변수와 별개로 코드베이스 전반에는 무채색 그레이가 하드코딩되어 있다. 빈도가 압도적이라 이쪽이 실질 정본이다.

| 토큰 | HEX | 텍스트 | 배경 | 테두리 | 용도 |
|---|---|---|---|---|---|
| `--sony-color-black` | `#000000` | 20 | 20 | 11 | 헤더 배경, 컴포넌트 제목 |
| `--sony-color-gray-900` | **`#222222`** | **259** | 22 | 53 | **제목·강조 본문·다크 버튼·선택 상태** |
| `--sony-color-gray-800` | `#444444` | 109 | 5 | 7 | 보조 본문 |
| `--sony-color-gray-700` | `#666666` | 65 | 4 | 4 | **body 기본 글자색**, 페이지 설명 |
| `--sony-color-gray-600` | `#888888` | 101 | 7 | — | 캡션, 비활성 텍스트 |
| `--sony-color-gray-500` | `#909090` | 11 | 5 | 3 | |
| `--sony-color-gray-400` | `#bbbbbb` | 35 | 9 | 4 | 취소선 원가, 비활성 버튼 배경 |
| `--sony-color-gray-300` | `#cccccc` | — | 2 | 11 | |
| `--sony-color-gray-200` | **`#dddddd`** | 3 | 14 | **91** | **기본 테두리** |
| `--sony-color-gray-150` | `#e1e1e1` | — | — | 26 | 인풋 밑줄 |
| `--sony-color-gray-100` | `#f4f4f4` | — | 6 | — | |
| `--sony-color-gray-50` | `#f8f8f8` | — | 15 | — | |
| `--sony-color-gray-25` | `#fbfbfb` | — | **45** | — | 섹션 바탕 |
| `--sony-color-white` | `#ffffff` | 105 | 84 | 17 | |

### 브랜드 / 액센트

| 토큰 | HEX | 사용 횟수 | 용도 |
|---|---|---|---|
| `--sony-color-primary` | **`#5865f5`** | 85 (text) + 44 (bg) + 15 (border) | **Sony 블루.** 활성 탭·카테고리 배경, 프라이머리 버튼, 인풋 포커스 밑줄, 포인트 텍스트, 쿠폰가, BEST 배지, 타이머 |
| `--sony-color-primary-dark` | `#434ebf` | 3 | pressed |
| `--sony-color-primary-tint` | `#f2f2fe` | 2 | 프라이머리 틴트 배경 |

프라이머리는 **한 색**이다. 블루 계열 변형이 거의 없고, 강조가 필요한 자리는 전부 `#5865f5` 하나로 통일되어 있다.

### 시맨틱

| 토큰 | HEX | 용도 |
|---|---|---|
| `--sony-color-sale` | `#e70000` | SALE 배지, 할인율(26px), 에러 메시지, HOT |
| `--sony-color-sale-price` | `#ff5619` | 할인가 숫자 (메인 추천 그리드) |
| `--sony-color-coupon` | `#ff4e00` | COUPON 배지, NEW 텍스트(구 컴포넌트) |
| `--sony-color-new` | `#20b537` | NEW 배지 (신 컴포넌트) |
| `--sony-color-reserve` | `#39bfc9` | 예약판매 라벨 배경 |
| `--sony-color-link` | `#4b96e6` | 외부 링크 |

배지 색 대응표:

| 배지 | 색 |
|---|---|
| BEST | `#5865f5` primary |
| SALE | `#e70000` |
| COUPON | `#ff4e00` |
| NEW | `#20b537` |
| 예약 | `#39bfc9` (배경) |

### 서피스

| 토큰 | HEX | 용도 |
|---|---|---|
| `--sony-surface-page` | `#ffffff` | 페이지 |
| `--sony-surface-section` | `#fbfbfb` | 섹션 바탕 (45회) |
| `--sony-surface-soft` | `#f4f7fa` | 카드·패널 (26회) |
| `--sony-surface-footer` | `#f1f5f9` | 푸터, GNB 카테고리 메뉴 |
| `--sony-surface-info` | `#edf4fc` | 안내 박스 |
| `--sony-surface-header` | `#000000` | 고정 헤더 (흰 글자) |
| `--sony-surface-dim` | `rgba(0,0,0,.5)` | 모달 딤 (10회) |

바탕이 세 겹이다: 흰 페이지 → `#fbfbfb` 섹션 → `#f4f7fa` 카드. 차이가 작아서 테두리(`#ddd`) 없이는 경계가 안 보이고, 실제로도 대부분 테두리와 함께 쓴다.

---

## 3. 스타일 규칙

### 테두리

- 기본 `1px solid #ddd` (91회). 굵기는 1px 하나.
- 강조·선택 `1px solid #222` — 체크박스, 선택된 색상 칩, 아웃라인 버튼.
- 인풋은 4면이 아니라 **밑줄만** `1px solid #e1e1e1`, 포커스 시 `#5865f5` 2px가 가운데서 양쪽으로 펼쳐진다 (`.focus_bg:before/:after`, 0.4s).

### 라운드

| 토큰 | 값 | 사용 횟수 | 용도 |
|---|---|---|---|
| `--sony-radius-none` | 0 | (기본) | **버튼, 인풋, 카드 — 각지다** |
| `--sony-radius-sm` | 4px | 7 | |
| `--sony-radius-md` | 8px | 6 | |
| `--sony-radius-lg` | 16px | 3 | |
| `--sony-radius-pill` | 20px | 7 | 칩·태그 |
| `--sony-radius-full` | 50% / 100% | 31 | 아바타, 라디오, 아이콘 버튼 |

`border-radius` 선언이 829KB CSS 전체에서 70회 남짓이다. **기본은 각진 사각형**이고, 둥근 것은 원형(라디오·아이콘)과 칩뿐이다.

### 그림자

거의 쓰지 않는다. 전체 4종:

- `0 1px 3px 1px rgba(0,0,0,.4)` — 드롭다운 1곳
- `0 -2px 4px rgba(0,0,0,.05)` — 하단 고정바
- 나머지는 `none`

깊이는 그림자가 아니라 **바탕색 단차와 1px 테두리**로 만든다.

### 모션

| 값 | 사용 횟수 | 용도 |
|---|---|---|
| `all .2s` / `all .2s ease` / `all .2s ease-in-out` | 24 | 호버, 헤더 show/hide |
| `all .15s ease` | 6 | 인풋 |
| `.4s` / `all .4s ease` | 11 | 포커스 밑줄, 페이드 |
| `opacity .4s cubic-bezier(.65,0,.35,1), transform .2s cubic-bezier(.33,1,.68,1) .2s` | 2 | 슬라이드 진입 |

0.2s가 기본, 0.4s가 강조. 이징은 대부분 기본 `ease`.

### 레이아웃

| 토큰 | 데스크톱 | ≤1280 | ≤640 |
|---|---|---|---|
| `--sony-layout-width` | 1440px | | |
| `--sony-layout-total-width` | 1560px | | |
| `--sony-layout-padding-x` | 60px | | 16px |
| `--sony-layout-cmpnt-gap` (섹션 간격) | 120px | | 80px |
| `--sony-header-height` | 143px | 98.59px | 95px |
| `--sony-header-padding-x` | 40px | 16px | |

**브레이크포인트** — 미디어쿼리 총 700여 개 중:

| 구간 | 쿼리 | 사용 횟수 |
|---|---|---|
| 모바일 | `max-width: 640px` | **409** |
| 태블릿 이하 | `max-width: 1280px` | 157 |
| 데스크톱 | `min-width: 1281px` | 33 |
| 태블릿 | `641px – 1280px` | 27 |
| 소형 | `max-width: 360px` | 13 |

세 구간(≤640 / 641–1280 / ≥1281)이 정본. 767/768은 잔재 수준이라 쓰지 않는다.

---

## 4. 컴포넌트 레시피

### 버튼

```css
/* 기본 규격 */
.btn { min-width: 170px; min-height: 56px; padding: 15px; font-size: 16px; font-weight: 700; }
.btn--sm { min-height: 48px; padding: 12px; font-size: 14px; }
.btn--cta { min-height: 64px; line-height: 64px; width: 100%; }

/* 변형 */
.btn--dark    { background: #222; color: #fff; border: 0; }             /* 기본 강조 */
.btn--primary { background: #5865f5; color: #fff; border: 0; }          /* 구매·확인 */
.btn--outline { background: #fff; color: #222; border: 1px solid #222; }
.btn--disabled{ background: #bbb; color: #fff; }                        /* .on 이 붙으면 primary */
```

높이 단계: 46 / 48 / 54 / 56 / 64px. 라운드 없음.

### 인풋

```css
.inp { border: 0; border-bottom: 1px solid #e1e1e1; padding: 28px 0 20px;
       font-size: 18px; font-weight: 700; color: #222; }
.inp:focus + .focus_bg::after { width: 50%; background: #5865f5; height: 2px; } /* 가운데서 펼침 */
.error_txt { font-size: 12px; color: #e70000; margin-top: 5px; }
```

### 제목

```css
.page__title  { font-size: 48px; line-height: 48px; font-weight: 700; color: #222; }
.page__desc   { font-size: 20px; color: #666; margin-top: 40px; }
.cmpnt__title { font-size: 32px; line-height: 44px; font-weight: 700; color: #000; }
.cmpnt        { padding-top: 120px; }   /* 섹션 간격 */
```

### 상품 가격

```css
.product__price      { font-weight: 700; letter-spacing: 0; color: #222; line-height: 1.5; }
.product__price__num { font-size: 20px; }   /* 모바일 18 → 16 */
.product__price__unit{ font-size: 16px; }
.product__price .original { font-size: 14px; font-weight: 500; color: #bbb;
                            text-decoration: line-through; text-decoration-thickness: 1px; }
.discount_txt        { font-size: 26px; color: #e70000; }
```

### 배지

```css
.badge { font-size: 12px; font-weight: 700; color: #15181f; }
.badge__label { font-size: 10px; margin-left: 4px; }
.badge.best   { color: #5865f5; }
.badge.sale   { color: #e70000; }
.badge.coupon { color: #ff4e00; }
.badge.new    { color: #20b537; }
```

배지는 배경 없이 **글자색만** 바꾼다. 배경을 채우는 것은 예약(`#39bfc9`)과 주소 검색 배지(`#888`) 두 곳뿐.

### 헤더 / 푸터

```css
.header { position: fixed; background: #000; color: #fff; z-index: 120;
          transition: all .2s ease-in-out .1s; }
.header--invisible { transform: translateY(-100%); }  /* 스크롤 다운 시 숨김 */

.footer { background: #f1f5f9; }
.footer__inner { padding: 64px 52px 64px 80px; }
.footer__business { color: #a4a7ad; }

.gnb__tab-button { font-size: 16px; font-weight: 700; color: #747780; padding: 10px 0; }
.gnb__tab { gap: 32px; border-bottom: 1px solid #eeeef0; }
```

---

## 5. 요약 — 이 사이트의 시각 문법

1. **검정 + 흰색 + 소니 블루 하나.** 액센트는 `#5865f5` 단일. 시맨틱 색은 배지·가격 등 정보 전달에만 쓴다.
2. **굵기로 위계, 색으로는 안 한다.** 강조는 700, 나머지는 400. 색은 `#222` → `#444` → `#666` → `#888` 네 단으로 내려간다.
3. **각지다.** 라운드는 원형(라디오·아바타)과 칩에만. 버튼·카드·인풋은 0.
4. **그림자 없음.** 깊이는 `#fff` / `#fbfbfb` / `#f4f7fa` 바탕 단차 + `1px #ddd` 테두리.
5. **인풋은 밑줄형.** 포커스 시 파란 2px 밑줄이 가운데서 펼쳐진다.
6. **14px / 1.4 / -0.025em / keep-all.** 한글 본문 정본.
7. **섹션 간격 120px, 콘텐츠 폭 1440px, 브레이크포인트 640 / 1280.**

---

## 6. 이 저장소에 적용하기

모든 토큰은 `--sony-` 접두어를 달았다. Tailwind v4 가 `--color-gray-900`, `--font-sans` 같은 이름을 `:root` 에 이미 내보내므로, 접두어 없이 두면 기존 유틸리티(`text-gray-500` 등)의 색이 조용히 바뀐다.

`app/globals.css` 에서 이미 import 하고 있다:

```css
@import "tailwindcss";
@import "../src/styles/tokens.css";       /* 토큰 */
@import "../src/styles/sony-layout.css";  /* 헤더 · 푸터 · 사이드바 */
```

Tailwind 유틸리티로 쓰려면 `@theme` 에서 이름을 골라 매핑한다:

```css
@theme {
  --color-sony: var(--sony-color-primary);      /* → bg-sony, text-sony */
  --color-sony-ink: var(--sony-color-gray-900); /* → text-sony-ink */
}
```

SST Pro 는 라이선스 서체이므로 싣지 않는다. body 의 `--font-sans` 가 Noto Sans KR 이고 헤더·푸터·가이드 전부 그것을 상속한다.

### 옮겨 온 컴포넌트

| 파일 | 원본 | 비고 |
|---|---|---|
| `src/components/SonyHeader.tsx` | `<nav class="header__inner">` | 검색 키워드 롤링 · 탭 가로 스크롤은 Swiper 대신 React/CSS. 스크롤 내리면 숨고 올리면 보인다 |
| `src/components/SonyFooter.tsx` | `<div class="footer">` | ≤640 카테고리 아코디언, Sony Family 팝오버, 플로팅 사이드바(카톡·맨 위로) 포함 |
| `src/styles/sony-layout.css` | `.header` `.footer` `.sidebar` 규칙 | 클래스 이름 원본 그대로. 브레이크포인트 1280 / 640 / 360 |
| `public/asset/sony/*.svg` | `/static/media/*.svg` | 로고 2종, 헤더 아이콘 7종, SNS 4종, 사이드바 3종 |

아직 없는 것: `제품` 버튼을 눌렀을 때 열리는 카테고리 메가메뉴(`.gnb`), 검색 버튼의 검색 레이어(`.header .search`), 카톡 상담 레이어. 버튼은 있지만 눌러도 열리는 것이 없다.
