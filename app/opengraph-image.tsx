import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from '@/src/lib/og-card';

// 공유 카드. 이 세그먼트와 그 아래 라우트가 함께 쓴다.
// 페이지 metadata 에 openGraph.images 를 적으면 이 파일이 무시되므로,
// 그쪽에서는 images 를 두지 않는다.

export const alt = 'AI Agent 워크플로우로 기획·디자인·개발을 잇다';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: 'Next experience',
    title: ['AI Agent 워크플로우로', '기획·디자인·개발을 잇다'],
    note: 'AI Agent 기반의 지능형 워크플로우로 기업의 역량을 증폭시킵니다.',
  });
}
