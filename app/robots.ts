import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/src/lib/seo';

// 생성엔진(GEO) 크롤러를 명시적으로 허용한다.
// `User-agent: *` 만으로도 허용되지만, 이름을 적어두면 정책이 의도적임을
// 드러내고 일부 봇이 자기 이름의 규칙을 우선 적용하는 동작에도 대응된다.
const AI_CRAWLERS = [
  'GPTBot',            // OpenAI — ChatGPT 학습·검색
  'OAI-SearchBot',     // OpenAI — ChatGPT 검색 색인
  'ChatGPT-User',      // OpenAI — 사용자 요청 기반 실시간 조회
  'ClaudeBot',         // Anthropic — Claude 학습·검색
  'Claude-User',       // Anthropic — 사용자 요청 기반 실시간 조회
  'Claude-SearchBot',  // Anthropic — Claude 검색 색인
  'anthropic-ai',      // Anthropic — 구버전 UA
  'PerplexityBot',     // Perplexity — 검색 색인
  'Perplexity-User',   // Perplexity — 사용자 요청 기반 실시간 조회
  'Google-Extended',   // Google — Gemini / AI 개요
  'Applebot',          // Apple — Siri / Spotlight
  'Applebot-Extended', // Apple — Apple Intelligence
  'Bingbot',           // Microsoft — Bing 검색
  'CCBot',             // Common Crawl — 다수 모델의 학습 소스
  'Amazonbot',         // Amazon — Alexa
  'meta-externalagent',// Meta — Meta AI
  'cohere-ai',         // Cohere
  'YandexBot',         // Yandex
  'NaverBot',          // 네이버 — 검색
  'Yeti',              // 네이버 — 검색 (주 크롤러)
  'Daumoa',            // 다음 — 검색
];

// 마이페이지 제안 5종은 검색에 걸리지 않게 한다. 각 page.tsx 의
// robots: noindex 와 이중으로 — 메타는 방문한 뒤 색인만 막고, 여기는 방문 자체를 막는다.
const NOINDEX_PATHS = ['/my-page', '/my-page-b', '/my-sony', '/my', '/my-personal'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: NOINDEX_PATHS },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: NOINDEX_PATHS,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
