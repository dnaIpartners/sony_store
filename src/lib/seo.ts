// 공유 카드(og:image)는 파일이 아니라 app/**/opengraph-image.tsx 가 굽는다.
// 예전에는 여기 DEFAULT_OG_IMAGE 로 /asset/og-default.png 를 가리켰는데
// 그 파일이 없었다.
// .env.* 가 정의하는 이름은 NEXT_PUBLIC_BASE_URL 이다. 전에는 NEXT_PUBLIC_SITE_URL
// 을 읽어 어느 환경에서도 값이 없었고, dev 배포본의 canonical · OG · sitemap 이
// 전부 운영 도메인을 가리켰다. 끝의 슬래시는 뗀다 — `${SITE_URL}/blog` 꼴로 잇는다.
export const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://ai.ipartners.co.kr').replace(/\/+$/, '');
export const SITE_NAME = 'IPARTNERS NX';
export const SITE_DESCRIPTION = 'AI Agent 기반의 지능형 워크플로우로 기업의 역량을 증폭시키는 IPARTNERS NX';
export const TWITTER_HANDLE = '@ipartners_nx';

// 구조화 데이터의 노드 id. 홈이 Organization · WebSite 를 이 id 로 선언하고
// 다른 페이지는 참조만 한다. 전에는 `${SITE_URL}#organization`(슬래시 없음)과
// `${SITE_URL}/#organization` 이 섞여 같은 회사가 두 노드로 갈라졌다.
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// 조직 로고. 파일은 1920x251 SVG 다 — 전에는 여섯 파일이 각자 적으면서
// 1200x630 이라는 없는 치수를 붙이거나 치수를 빼먹었다. Google 이미지는 SVG
// 를 받으므로 파일은 그대로 두고 실제 치수를 적는다.
export const ORG_LOGO = {
  '@type': 'ImageObject',
  url: `${SITE_URL}/asset/ipartners-ci.svg`,
  width: 1920,
  height: 251,
} as const;

// 문의 창구. 회사 사이트의 폼 하나로 모은다 — NX 사이트는 폼을 따로 두지
// 않는다. 전에는 이 주소가 HomeContact · NextExperience · HowItWorks 세
// 곳에 손으로 적혀 있었다.
export const CONTACT_URL = 'https://www.ipartners.co.kr/contact';
