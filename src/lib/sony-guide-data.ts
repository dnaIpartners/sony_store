// Sony Store KR 디자인 가이드 — 화면이 읽는 정본.
//
// 값은 design-tokens.md 와 같다. 거기 적힌 "사용 횟수"는 원본 CSS
// (main.5bf2c4fe.css, 2026-09-14 수집)에서 그 값이 선언된 횟수다.

export const SOURCE = {
  url: 'https://store.sony.co.kr/',
  file: 'main.5bf2c4fe.css',
  size: '829 KB',
  date: '2026-09-14',
};

/* ── 폰트 ─────────────────────────────────────────────────────── */

export const FONT_FAMILIES = [
  { role: '기본 (영문·숫자)', name: 'SST Pro', weights: '300 / 400 / 700 / 900', note: 'Sony 전용 서체. 외부 CDN woff2' },
  { role: '한글', name: 'Noto Sans KR', weights: '400 / 500 / 700', note: 'SST Pro 에 한글이 없어 폴백으로 잡힌다' },
  { role: '이 저장소', name: 'Noto Sans KR', weights: '400 / 500 / 700', note: 'SST Pro 는 라이선스 서체라 싣지 않는다. 영문·숫자도 Noto Sans KR' },
];

export const BODY_DEFAULTS = [
  ['font-size', '14px'],
  ['line-height', '1.4'],
  ['letter-spacing', '-0.025em'],
  ['word-break', 'keep-all'],
  ['color', '#666'],
] as const;

export type TypeStep = { token: string; px: number; count: number; use: string; mobile?: number };

export const TYPE_SCALE: TypeStep[] = [
  { token: 'text-5xl', px: 48, count: 13, use: '페이지 제목 .page__title', mobile: 24 },
  { token: 'text-4xl', px: 40, count: 14, use: 'h1, 배너 제목', mobile: 24 },
  { token: 'text-3xl', px: 32, count: 26, use: 'h2, 컴포넌트 제목 .cmpnt__title', mobile: 20 },
  { token: 'text-2xl', px: 24, count: 86, use: 'h3, 할인율, 쿠폰가', mobile: 18 },
  { token: 'text-xl', px: 20, count: 90, use: '소제목, 상품가(num), 페이지 설명' },
  { token: 'text-lg', px: 18, count: 139, use: '인풋, 버튼(lg), 상품가' },
  { token: 'text-md', px: 16, count: 304, use: '본문 강조, 버튼(md), 가격 단위' },
  { token: 'text-base', px: 14, count: 436, use: '본문, 버튼(sm) — 정본' },
  { token: 'text-sm', px: 13, count: 33, use: '밑줄 링크' },
  { token: 'text-xs', px: 12, count: 228, use: '캡션, 배지, 링크, 에러' },
  { token: 'text-2xs', px: 10, count: 27, use: '배지 라벨' },
];

export const WEIGHTS = [
  { weight: 700, count: 307, use: '제목, 가격, 버튼, 배지, 탭 — 강조는 전부 Bold' },
  { weight: 500, count: 74, use: '링크, 보조 텍스트, 취소선 원가' },
  { weight: 400, count: 75, use: '본문' },
  { weight: 300, count: 11, use: '큰 숫자, 히어로 카피' },
];

export const SPACING_RULES = [
  { prop: '본문 행간', value: '1.4', note: 'px 고정값(22 · 18 · 24px)이 더 많다' },
  { prop: '제목 행간', value: '1.1 – 1.375', note: '32px → 44px, 48px → 48px' },
  { prop: '본문 자간', value: '-0.025em', note: '71회. 한글 기본' },
  { prop: '제목 자간', value: '-1px', note: '32px 이상' },
  { prop: '가격 자간', value: '0', note: '숫자는 자간을 풀어 읽힌다' },
];

/* ── 색상 ─────────────────────────────────────────────────────── */

export type Swatch = { token: string; hex: string; use?: string; count?: string; dark?: boolean };

export const NEUTRALS: Swatch[] = [
  { token: 'neutral-90', hex: '#15181f', use: '배지 텍스트, 다크 서피스', dark: true },
  { token: 'neutral-80', hex: '#2b303c', dark: true },
  { token: 'neutral-70', hex: '#434853', dark: true },
  { token: 'neutral-60', hex: '#5b6069', dark: true },
  { token: 'neutral-50', hex: '#747780', use: '링크, GNB 탭 비활성', dark: true },
  { token: 'neutral-40', hex: '#a4a7ad', use: '푸터 사업자 정보' },
  { token: 'neutral-30', hex: '#bdbfc3' },
  { token: 'neutral-20', hex: '#d5d7d9', use: '구분선' },
  { token: 'neutral-10', hex: '#eeeef0', use: 'GNB 탭 하단선' },
];

export const GRAYS: Swatch[] = [
  { token: 'black', hex: '#000000', use: '헤더 배경', count: 'text 20 · bg 20', dark: true },
  { token: 'gray-900', hex: '#222222', use: '제목 · 강조 본문 · 다크 버튼', count: 'text 259 · border 53', dark: true },
  { token: 'gray-800', hex: '#444444', use: '보조 본문', count: 'text 109', dark: true },
  { token: 'gray-700', hex: '#666666', use: 'body 기본 글자색', count: 'text 65', dark: true },
  { token: 'gray-600', hex: '#888888', use: '캡션, 비활성', count: 'text 101', dark: true },
  { token: 'gray-500', hex: '#909090', count: 'text 11' },
  { token: 'gray-400', hex: '#bbbbbb', use: '취소선 원가, 비활성 버튼', count: 'text 35' },
  { token: 'gray-300', hex: '#cccccc', count: 'border 11' },
  { token: 'gray-200', hex: '#dddddd', use: '기본 테두리', count: 'border 91' },
  { token: 'gray-150', hex: '#e1e1e1', use: '인풋 밑줄', count: 'border 26' },
  { token: 'gray-100', hex: '#f4f4f4', count: 'bg 6' },
  { token: 'gray-50', hex: '#f8f8f8', count: 'bg 15' },
  { token: 'gray-25', hex: '#fbfbfb', use: '섹션 바탕', count: 'bg 45' },
  { token: 'white', hex: '#ffffff', count: 'bg 84' },
];

export const BRAND: Swatch[] = [
  { token: 'primary', hex: '#5865f5', use: '활성 탭, CTA, 포커스 밑줄, 포인트 텍스트, BEST 배지', count: 'text 85 · bg 44 · border 15', dark: true },
  { token: 'primary-dark', hex: '#434ebf', use: 'pressed', dark: true },
  { token: 'primary-tint', hex: '#f2f2fe', use: '프라이머리 틴트 배경' },
];

export const SEMANTIC: Swatch[] = [
  { token: 'sale', hex: '#e70000', use: 'SALE 배지, 할인율, 에러', dark: true },
  { token: 'sale-price', hex: '#ff5619', use: '할인가 숫자, 카운트 배지', dark: true },
  { token: 'coupon', hex: '#ff4e00', use: 'COUPON 배지', dark: true },
  { token: 'new', hex: '#20b537', use: 'NEW 배지', dark: true },
  { token: 'reserve', hex: '#39bfc9', use: '예약판매 라벨 배경', dark: true },
  { token: 'link', hex: '#4b96e6', use: '외부 링크', dark: true },
];

export const SURFACES: Swatch[] = [
  { token: 'surface-page', hex: '#ffffff', use: '페이지' },
  { token: 'surface-section', hex: '#fbfbfb', use: '섹션 바탕' },
  { token: 'surface-soft', hex: '#f4f7fa', use: '카드 · 패널' },
  { token: 'surface-footer', hex: '#f1f5f9', use: '푸터, GNB 카테고리 메뉴' },
  { token: 'surface-info', hex: '#edf4fc', use: '안내 박스' },
  { token: 'surface-header', hex: '#000000', use: '고정 헤더', dark: true },
];

/* ── 스타일 규칙 ──────────────────────────────────────────────── */

export const RADII = [
  { token: 'radius-none', value: '0', use: '버튼 · 인풋 · 카드 — 기본' },
  { token: 'radius-sm', value: '4px', use: '푸터 Sony Family 박스' },
  { token: 'radius-md', value: '8px', use: '레이어 팝업' },
  { token: 'radius-lg', value: '16px', use: '' },
  { token: 'radius-pill', value: '20px', use: '칩 · 태그 · 검색 알약' },
  { token: 'radius-full', value: '50%', use: '아바타 · 라디오 · 아이콘 버튼' },
];

export const SHADOWS = [
  { token: 'shadow-md', value: '0 1px 3px 1px rgba(0,0,0,.4)', use: '드롭다운 (1곳)' },
  { token: 'shadow-sm', value: '0 -2px 4px rgba(0,0,0,.05)', use: '하단 고정바' },
];

export const MOTION = [
  { token: 'duration-fast', value: '0.15s', use: '인풋' },
  { token: 'duration-base', value: '0.2s', use: '호버, 헤더 show/hide — 기본' },
  { token: 'duration-slow', value: '0.4s', use: '포커스 밑줄, 페이드' },
];

/* ── 레이아웃 ─────────────────────────────────────────────────── */

export const LAYOUT = [
  { token: 'layout-width', desktop: '1440px', tablet: '', mobile: '', note: '콘텐츠 최대 폭' },
  { token: 'layout-total-width', desktop: '1560px', tablet: '', mobile: '', note: '콘텐츠 + 좌우 패딩' },
  { token: 'layout-padding-x', desktop: '60px', tablet: '', mobile: '16px', note: '' },
  { token: 'layout-cmpnt-gap', desktop: '120px', tablet: '', mobile: '80px', note: '섹션 간 세로 간격' },
  { token: 'header-height', desktop: '143px', tablet: '98.59px', mobile: '95px', note: '' },
  { token: 'header-padding-x', desktop: '40px', tablet: '16px', mobile: '', note: '' },
];

export const BREAKPOINTS = [
  { name: 'mobile', query: 'max-width: 640px', count: 409 },
  { name: 'tablet', query: '641px – 1280px', count: 27 },
  { name: 'tablet ↓', query: 'max-width: 1280px', count: 157 },
  { name: 'desktop', query: 'min-width: 1281px', count: 33 },
  { name: 'small', query: 'max-width: 360px', count: 13 },
];

/* ── 요약 ─────────────────────────────────────────────────────── */

export const PRINCIPLES = [
  { head: '검정 + 흰색 + 소니 블루 하나', body: '액센트는 #5865f5 단일. 시맨틱 색은 배지·가격 등 정보 전달에만 쓴다.' },
  { head: '굵기로 위계, 색으로는 안 한다', body: '강조는 700, 나머지는 400. 색은 #222 → #444 → #666 → #888 네 단으로 내려간다.' },
  { head: '각지다', body: '라운드는 원형(라디오·아바타)과 칩에만. 버튼·카드·인풋은 0.' },
  { head: '그림자 없음', body: '깊이는 #fff / #fbfbfb / #f4f7fa 바탕 단차 + 1px #ddd 테두리로 만든다.' },
  { head: '인풋은 밑줄형', body: '포커스 시 파란 2px 밑줄이 가운데서 양쪽으로 펼쳐진다.' },
  { head: '14px / 1.4 / -0.025em / keep-all', body: '한글 본문 정본.' },
  { head: '120 · 1440 · 640 / 1280', body: '섹션 간격, 콘텐츠 폭, 브레이크포인트.' },
];
