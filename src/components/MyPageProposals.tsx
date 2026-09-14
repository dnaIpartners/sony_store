import Link from "next/link";

// 메인 상단 — 마이페이지 4종 제안 요약.
// 각 안이 무엇에 초점을 뒀는지 한 줄씩. 자세한 건 카드를 눌러 직접 본다.
// 소요 시간은 2026-09-14 세션의 커밋 시각에서 낸 대략값. 경과는 첫 작업(약 16:40,
// 추정)부터 19:55 까지. 17:41→18:51 의 70분은 커밋도 요청도 없어 자리 비움으로
// 보고 실작업에서 뺐다. 푸시·모바일 보정 같은 공통 작업은 합계에만 들어 있다.
// 스타일은 src/styles/proposals.css

const SESSION = { date: "2026-09-14", active: "약 2시간 10분", elapsed: "3시간 15분", commits: 31, with: "Claude Code" };

const PROPOSALS = [
  {
    no: "01",
    href: "/my-page",
    name: "마이페이지",
    tag: "현행 재현",
    focus: "지금 스토어 마이페이지를 그대로",
    desc: "store.sony.co.kr/my-page 의 마크업·구성을 그대로 옮긴 기준선. 다른 세 안을 견줄 출발점.",
    points: ["원본 클래스·구조 그대로", "회원 바 · 주문 5단계 · 마일리지 · 쿠폰 · 찜"],
    time: "약 45분",
  },
  {
    no: "02",
    href: "/my-sony",
    name: "new 마이페이지",
    tag: "와이어프레임",
    focus: "My Sony 와이어프레임을 화면으로",
    desc: "기획 시안의 항목을 그대로 구현. 회원 패널 + 이벤트 슬라이더, 주문/배송, 아카데미, 나의 소니, My Sony Care.",
    points: ["시안 항목 100% 반영", "아카데미 아코디언 · 실제 기획전 배너"],
    time: "약 45분",
  },
  {
    no: "03",
    href: "/my",
    name: "통합 마이페이지",
    tag: "세 페이지 통합",
    focus: "스토어 · My Sony 서비스 · 정품등록을 한 장에",
    desc: "사이트 경계로 나뉜 세 마이페이지를 사용자의 일 기준으로 합침. 요약 띠 → 고정 탭 6개 → 섹션.",
    points: ["구매 제품 → 정품등록 → 보증 연장 흐름 연결", "회원 메뉴 6개 = 탭 = 섹션"],
    time: "약 50분",
  },
  {
    no: "04",
    href: "/my-personal",
    name: "개인화 마이페이지",
    tag: "한 화면 · 할 일 중심",
    focus: "내 상태와 지금 할 일을 첫 화면에",
    desc: "같은 내용을 위젯 격자로. 보증 만료·쿠폰 만료·정품등록 유도·강좌 D-day 를 '지금 할 일'로 모아 바로 행동.",
    points: ["왼쪽 메뉴 + 위젯 요약, 더보기 → 통합 페이지", "다음 행동을 먼저 보여주는 유일한 안"],
    time: "약 15분",
  },
];

export default function MyPageProposals() {
  return (
    <section className="pp" aria-labelledby="pp-title">
      <div className="pp-inner">
        <div className="pp-head">
          <p className="pp-eyebrow">Proposal · My Page</p>
          <h2 className="pp-title" id="pp-title">마이페이지 4안</h2>
          <p className="pp-lead">
            현행 재현에서 출발해, 시안 구현 → 세 페이지 통합 → 개인화까지 단계적으로 확장한 제안입니다.
            헤더의 마이페이지 아이콘 4개가 각 안으로 연결됩니다.
          </p>
          <dl className="pp-meta">
            <div><dt>실작업</dt><dd>{SESSION.active}<small>경과 {SESSION.elapsed}</small></dd></div>
            <div><dt>커밋</dt><dd>{SESSION.commits}개</dd></div>
            <div><dt>작업일</dt><dd>{SESSION.date}</dd></div>
            <div><dt>함께</dt><dd>{SESSION.with}</dd></div>
          </dl>
        </div>
        <ol className="pp-list">
          {PROPOSALS.map((p) => (
            <li key={p.no}>
              <Link href={p.href} className="pp-card">
                <span className="pp-card__no">{p.no}</span>
                <span className="pp-card__tag">{p.tag}</span>
                <strong className="pp-card__name">{p.name}</strong>
                <span className="pp-card__focus">{p.focus}</span>
                <span className="pp-card__desc">{p.desc}</span>
                <ul className="pp-card__points">
                  {p.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
                <span className="pp-card__foot">
                  <span className="pp-card__time">소요 {p.time}</span>
                  <span className="pp-card__go">
                    보러 가기 <small>{p.href}</small>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
