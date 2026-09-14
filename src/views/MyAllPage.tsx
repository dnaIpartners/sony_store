import Link from "next/link";
import {
  IconDeposit,
  IconPaid,
  IconPacking,
  IconShipping,
  IconDelivered,
} from "@/src/components/OrderStepIcons";

// 통합 마이페이지 — 제안.
//
// 세 페이지를 한 화면으로 합친다:
//   · store.sony.co.kr/my-page ........................ 쇼핑 (주문·쿠폰·마일리지·찜)
//   · sony.co.kr/scs/handler/Mypage-Go ................ My Sony 서비스 (A/S·픽업·문의·아카데미)
//   · sony.co.kr/scs/handler/SCSWarranty-Start ........ 정품등록·보증
//
// 탭은 와이어프레임의 회원 메뉴 6개 그대로: 주문/배송 조회 · 정품등록/관리 ·
// 연장서비스 플랜 EPS · 픽업서비스 신청/내역 · 이벤트관리 · 내가 찜한 소니.
// 쿠폰·마일리지는 요약 띠에서 스토어 마이페이지로 보낸다.
// 상단 요약 띠 → 고정 탭 → 섹션. 스타일은 src/styles/my-all.css.
//
// sony.co.kr 두 페이지는 로그인 뒤에만 보이므로 구성은 공개된 메뉴 이름을
// 근거로 잡았다. 데이터는 전부 더미.

const USER = {
  name: "윤근식",
  grade: "GOLD",
  nextGrade: "VIP",
  nextGradeAmount: 480_000,
  joined: "2023.04.12",
  unified: true, // 소니 통합회원 전환 여부
};

const SUMMARY = [
  { key: "mileage", label: "마일리지", value: "12,500", unit: "M", href: "/my-page#mileage-tit" },
  { key: "coupon", label: "쿠폰", value: "2", unit: "장", href: "/my-page#coupon-tit" },
  { key: "wish", label: "찜", value: "3", unit: "개", href: "#wish" },
  { key: "order", label: "진행 중 주문", value: "2", unit: "건", href: "#order" },
  { key: "product", label: "정품등록 제품", value: "2", unit: "대", href: "#warranty" },
  { key: "service", label: "진행 중 A/S", value: "1", unit: "건", href: "#pickup" },
  { key: "warranty", label: "보증 만료 임박", value: "1", unit: "대", href: "#warranty", alert: true },
];

// 와이어프레임 "My Sony에서 할 수 있는 일" 회원 메뉴 6개 = 탭 = 섹션
const TABS = [
  { id: "order", label: "주문/배송 조회" },
  { id: "warranty", label: "정품등록/관리" },
  { id: "eps", label: "연장서비스 플랜 EPS" },
  { id: "pickup", label: "픽업서비스 신청/내역" },
  { id: "event", label: "이벤트관리" },
  { id: "wish", label: "내가 찜한 소니" },
];

// 입금대기 → 결제완료 → 배송준비 → 배송중 → 배송완료
const ORDER_STEPS = [
  { label: "입금대기", count: 0, Icon: IconDeposit },
  { label: "결제완료", count: 1, Icon: IconPaid },
  { label: "배송준비", count: 0, Icon: IconPacking },
  { label: "배송중", count: 1, Icon: IconShipping },
  { label: "배송완료", count: 3, Icon: IconDelivered },
];

const ORDERS = [
  { date: "2026.09.11", no: "20260911-0004821", model: "WH-1000XM6", name: "무선 노이즈캔슬링 헤드폰", price: 549_000, status: "배송중", on: true },
  { date: "2026.09.02", no: "20260902-0002114", model: "ILCE-7CM2L", name: "α7C II 렌즈 키트", price: 2_990_000, status: "결제완료", on: true },
];



// 사진이 있는 제품만 img 를 채운다. 없으면 모델명을 적은 회색 판
const WISH = [
  { model: "ILCE-7RM6", name: "α7R VI 풀프레임 미러리스", price: 4_990_000, img: "/asset/sony/ILCE-7RM6.png" },
  { model: "ILCE-7CM2L", name: "α7C II 렌즈 키트", price: 2_990_000, img: "/asset/sony/ILCE-7CM2L.png" },
  { model: "SEL70200GM2", name: "FE 70-200mm F2.8 GM OSS II", price: 3_690_000, img: "/asset/sony/102265974_1.png" },
];

// 정품등록 제품 (SCSWarranty + My Sony 나의 제품)
const PRODUCTS = [
  { model: "ILCE-7RM6", name: "α7R VI 풀프레임 미러리스", img: "/asset/sony/ILCE-7RM6.png", serial: "S01-4A7C-****", bought: "2026.03.02", registered: "2026.03.05", warrantyEnd: "2027.03.01", care: "My Sony Care 3년", status: "보증중" },
  { model: "ILCE-7CM2L", name: "α7C II 렌즈 키트", img: "/asset/sony/ILCE-7CM2L.png", serial: "S02-8B1D-****", bought: "2026.09.02", registered: "-", warrantyEnd: "-", care: "-", status: "미등록" },
  { model: "WH-1000XM5", name: "무선 노이즈캔슬링 헤드폰", img: "", serial: "H11-3C9F-****", bought: "2024.10.14", registered: "2024.10.15", warrantyEnd: "2026.10.13", care: "-", status: "만료 임박" },
];

// A/S 접수 진행: 접수 → 입고 → 점검/수리 → 수리완료 → 출고/수령
const SERVICE_STEPS = ["접수", "입고", "점검·수리", "수리완료", "출고·수령"];
const SERVICES = [
  { no: "SC-2026-091102", model: "WH-1000XM5", symptom: "왼쪽 유닛 소리 끊김", date: "2026.09.11", how: "픽업 서비스", step: 2 },
  { no: "SC-2026-052014", model: "ILCE-7RM6", symptom: "센서 클리닝", date: "2026.05.20", how: "강남 서비스센터 방문", step: 4 },
];
const PICKUPS = [
  { no: "PK-2026-091101", model: "WH-1000XM5", pickupDate: "2026.09.12", carrier: "CJ대한통운", status: "센터 입고 완료" },
];
const PLANS = [
  { plan: "My Sony Care 3년", model: "ILCE-7RM6", until: "2029.03.01", status: "가입중" },
  { plan: "EPS 연장서비스", model: "-", until: "-", status: "가입 가능 제품 1대" },
];

const ACADEMY = [
  { title: "[건축 사진] 도시의 선과 면을 담다 - 1강", img: encodeURI("/asset/sony/건물.png"), date: "2026.09.18", status: "결제완료" },
  { title: "[인물 사진] 자연광 포트레이트 - 2강", img: encodeURI("/asset/sony/인물.png"), date: "2026.09.25", status: "결제완료" },
  { title: "[풍경 사진] 골든아워 장노출 - 1강", img: encodeURI("/asset/sony/풍경.png"), date: "2026.10.02", status: "접수 대기" },
];
const EVENTS = [
  { title: "α7R VI 런칭 체험단", date: "2026.09.05", status: "응모 완료" },
  { title: "정품등록 감사 이벤트 9월", date: "2026.09.10", status: "당첨" },
];

const won = (n: number) => n.toLocaleString("ko-KR");

export default function MyAllPage() {
  return (
    <main className="ma">
      {/* ── 머리 ─────────────────────────────────────────────── */}
      <header className="ma-head">
        <div className="ma-inner">
          <h1 className="ma-title">My Sony</h1>
        </div>
      </header>

      {/* ── 요약 띠 ─────────────────────────────────────────── */}
      <section className="ma-summary" aria-labelledby="ma-summary-title">
        <div className="ma-inner ma-summary__inner">
          <div className="ma-me">
            <span className="ma-me__avatar" aria-hidden="true">
              <img src="/asset/sony/ic_mypage.svg" alt="" />
            </span>
            <div>
              <p className="ma-me__hello" id="ma-summary-title">
                <strong>{USER.name}</strong>님
                <span className="ma-badge">{USER.grade}</span>
                {USER.unified ? <span className="ma-badge ma-badge--line">통합회원</span> : null}
              </p>
              <p className="ma-me__sub">
                {USER.nextGrade}까지 <strong>{won(USER.nextGradeAmount)}원</strong> · 가입 {USER.joined}
              </p>
            </div>
          </div>
          <ul className="ma-stats">
            {SUMMARY.map((s) => (
              <li key={s.key} className={s.alert ? "alert" : undefined}>
                <a href={s.href}>
                  <span className="ma-stat__label">{s.label}</span>
                  <span className="ma-stat__value">
                    {s.value}<em>{s.unit}</em>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <Link href="/my-page/member" className="ma-btn ma-btn--line ma-btn--sm ma-me__edit">
            회원정보 수정
          </Link>
        </div>
      </section>

      {/* ── 고정 탭 ─────────────────────────────────────────── */}
      <nav className="ma-tabs" aria-label="통합 마이페이지 구역">
        <div className="ma-inner">
          <ul>
            {TABS.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`}>{t.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="ma-inner">
        {/* ══ 1. 주문/배송 조회 ═══════════════════════════════ */}
        <section className="ma-group" id="order" aria-labelledby="ma-order">
          <div className="ma-group__head">
            <h2 id="ma-order">주문/배송 조회</h2>
            <div className="ma-sec__actions">
              <Link href="/my-page/order-list" className="ma-btn ma-btn--line">전체 구매 내역</Link>
              <button type="button" className="ma-btn ma-btn--line">배송지 관리</button>
            </div>
          </div>
          <ol className="ma-steps">
            {ORDER_STEPS.map((s) => (
              <li key={s.label} className={s.count ? "on" : undefined}>
                <s.Icon className="ma-steps__icon" />
                <span className="ma-steps__text">
                  <span className="ma-steps__label">{s.label}</span>
                  <span className="ma-steps__count">{s.count}<em>건</em></span>
                </span>
              </li>
            ))}
          </ol>
          <table className="ma-table">
            <thead>
              <tr><th>주문일 / 번호</th><th>상품</th><th>금액</th><th>상태</th><th aria-label="액션" /></tr>
            </thead>
            <tbody>
              {ORDERS.map((o) => (
                <tr key={o.no}>
                  <td><span>{o.date}</span><small>{o.no}</small></td>
                  <td><strong>{o.model}</strong><small>{o.name}</small></td>
                  <td className="num">{won(o.price)}원</td>
                  <td><b className={o.on ? "on" : undefined}>{o.status}</b></td>
                  <td className="act">
                    <Link href="/my-page/order-list" className="ma-btn ma-btn--xs">
                      {o.status === "배송중" ? "배송조회" : "주문상세"}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="ma-notes">
            <li>구매확정이 완료된 주문은 진행 중인 주문에 포함되지 않으며, 진행 상태에 따라 배송지 변경, 취소, 교환 반품 신청이 가능합니다.</li>
          </ul>
        </section>

        {/* ══ 2. 정품등록/관리 ═══════════════════════════════ */}
        <section className="ma-group" id="warranty" aria-labelledby="ma-warranty">
          <div className="ma-group__head">
            <h2 id="ma-warranty">정품등록/관리 <span className="ma-count">{PRODUCTS.filter((p) => p.status !== "미등록").length}</span></h2>
            <div className="ma-sec__actions">
              <a
                href="https://www.sony.co.kr/scs/handler/SCSWarranty-Start?asa=Sa"
                target="_blank"
                rel="noopener noreferrer"
                className="ma-btn ma-btn--dark"
              >
                정품등록하기
              </a>
            </div>
          </div>
          <ul className="ma-products">
            {PRODUCTS.map((p) => (
              <li key={p.model} className={`ma-product ma-product--${p.status === "보증중" ? "ok" : p.status === "만료 임박" ? "soon" : "none"}`}>
                <div className="ma-product__img">
                  {p.img ? <img src={p.img} alt="" /> : <span aria-hidden="true">{p.model}</span>}
                </div>
                <div className="ma-product__body">
                  <p className="ma-product__status">{p.status}</p>
                  <p className="ma-product__model">{p.model}</p>
                  <p className="ma-product__name">{p.name}</p>
                  <dl className="ma-product__meta">
                    <div><dt>시리얼</dt><dd>{p.serial}</dd></div>
                    <div><dt>구매일</dt><dd>{p.bought}</dd></div>
                    <div><dt>등록일</dt><dd>{p.registered}</dd></div>
                    <div><dt>보증 만료</dt><dd>{p.warrantyEnd}</dd></div>
                    <div><dt>연장 보증</dt><dd>{p.care}</dd></div>
                  </dl>
                </div>
                <div className="ma-product__actions">
                  {p.status === "미등록" ? (
                    <a
                      href="https://www.sony.co.kr/scs/handler/SCSWarranty-Start?asa=Sa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ma-btn ma-btn--primary ma-btn--sm"
                    >
                      지금 등록하고 10% 쿠폰
                    </a>
                  ) : (
                    <>
                      <a href="#pickup" className="ma-btn ma-btn--line ma-btn--sm">A/S 신청</a>
                      {p.care === "-" ? (
                        <a href="#eps" className="ma-btn ma-btn--line ma-btn--sm">보증 연장</a>
                      ) : null}
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <ul className="ma-notes">
            <li>정품등록 후 발급되는 10% 할인쿠폰은 <Link href="/my-page#coupon-tit">쿠폰</Link>에 바로 표시됩니다.</li>
            <li>보증 만료 30일 전부터 ‘만료 임박’으로 표시되며, 만료 전에 <a href="#eps">연장서비스 플랜</a>으로 연장할 수 있습니다.</li>
            <li>구매일·보증기간이 실제와 다르면 보증기간 수정요청을 남겨주세요.</li>
          </ul>
        </section>

        {/* ══ 3. 연장서비스 플랜 EPS ═════════════════════════ */}
        <section className="ma-group" id="eps" aria-labelledby="ma-eps">
          <div className="ma-group__head">
            <h2 id="ma-eps">연장서비스 플랜 EPS</h2>
            <div className="ma-sec__actions">
              <Link href="/mysonycare" className="ma-btn ma-btn--dark">플랜 가입하기</Link>
              <Link href="/mysonycare" className="ma-more">My Sony Care 안내</Link>
            </div>
          </div>
          <table className="ma-table">
            <thead><tr><th>플랜</th><th>대상 제품</th><th>만료</th><th>상태</th><th aria-label="액션" /></tr></thead>
            <tbody>
              {PLANS.map((p) => (
                <tr key={p.plan}>
                  <td><strong>{p.plan}</strong></td>
                  <td>{p.model}</td>
                  <td>{p.until}</td>
                  <td><b className={p.status === "가입중" ? "on" : undefined}>{p.status}</b></td>
                  <td className="act">
                    {p.status === "가입중" ? (
                      <Link href="/mysonycare" className="ma-btn ma-btn--xs">보증서 보기</Link>
                    ) : (
                      <Link href="/mysonycare" className="ma-btn ma-btn--xs">가입하기</Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="ma-notes">
            <li>EPS(Extended Protection Service)는 제조사 보증이 끝난 뒤에도 무상수리를 연장하는 소니 공식 플랜입니다.</li>
            <li>정품등록된 제품만 가입할 수 있으며, 보증 만료 전에 가입해야 합니다.</li>
          </ul>
        </section>

        {/* ══ 4. 픽업서비스 신청/내역 ═════════════════════════ */}
        <section className="ma-group" id="pickup" aria-labelledby="ma-pickup">
          <div className="ma-group__head">
            <h2 id="ma-pickup">픽업서비스 신청/내역</h2>
            <div className="ma-sec__actions">
              <Link href="/my-sony/pickup" className="ma-btn ma-btn--dark">픽업 서비스 신청</Link>
              <a
                href="https://www.sony.co.kr/scs/handler/SCSReservation-Start"
                target="_blank"
                rel="noopener noreferrer"
                className="ma-btn ma-btn--line"
              >
                센터 방문 예약
              </a>
            </div>
          </div>

          <div className="ma-sec">
            <div className="ma-sec__head"><h3>픽업 내역</h3></div>
            <table className="ma-table ma-table--compact">
              <thead><tr><th>접수번호</th><th>제품</th><th>수거일</th><th>택배사</th><th>상태</th></tr></thead>
              <tbody>
                {PICKUPS.map((p) => (
                  <tr key={p.no}>
                    <td><span>{p.no}</span></td>
                    <td><strong>{p.model}</strong></td>
                    <td>{p.pickupDate}</td>
                    <td>{p.carrier}</td>
                    <td><b className="on">{p.status}</b></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ma-sec">
            <div className="ma-sec__head"><h3>A/S 진행 현황</h3></div>
            <ul className="ma-services">
              {SERVICES.map((s) => (
                <li key={s.no} className="ma-service">
                  <div className="ma-service__head">
                    <div>
                      <p className="ma-service__no">{s.no} · {s.date} · {s.how}</p>
                      <p className="ma-service__title"><strong>{s.model}</strong> {s.symptom}</p>
                    </div>
                    <b className={`ma-service__state${s.step === SERVICE_STEPS.length - 1 ? " done" : ""}`}>
                      {SERVICE_STEPS[s.step]}
                    </b>
                  </div>
                  <ol className="ma-progress" aria-label="진행 단계">
                    {SERVICE_STEPS.map((st, i) => (
                      <li key={st} className={i < s.step ? "done" : i === s.step ? "now" : undefined}>
                        <span>{st}</span>
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ══ 5. 이벤트관리 ═════════════════════════════════ */}
        <section className="ma-group" id="event" aria-labelledby="ma-event">
          <div className="ma-group__head">
            <h2 id="ma-event">이벤트관리</h2>
            <Link href="/event/list?tab=all" className="ma-more">진행 중인 이벤트</Link>
          </div>

          <div className="ma-sec">
            <div className="ma-sec__head"><h3>응모 내역</h3></div>
            <ul className="ma-list">
              {EVENTS.map((e) => (
                <li key={e.title}>
                  <span className="ma-list__title">{e.title}</span>
                  <span className="ma-list__date">{e.date}</span>
                  <b className={e.status === "당첨" ? "on" : undefined}>{e.status}</b>
                </li>
              ))}
            </ul>
          </div>

          <div className="ma-sec">
            <div className="ma-sec__head">
              <h3>나의 아카데미</h3>
              <a
                href="https://www.sony.co.kr/alpha/handler/NAlphaAcademy-OfflineList"
                target="_blank"
                rel="noopener noreferrer"
                className="ma-more"
              >
                아카데미 바로가기
              </a>
            </div>
            <ul className="ma-academy">
              {ACADEMY.map((a) => (
                <li key={a.title}>
                  <div className="ma-academy__thumb">
                    <img src={a.img} alt="" />
                    <p>{a.title}</p>
                  </div>
                  <div className="ma-academy__meta">
                    <span>강좌일 {a.date}</span>
                    <b className={a.status === "결제완료" ? "on" : undefined}>{a.status}</b>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ══ 6. 내가 찜한 소니 ═════════════════════════════ */}
        <section className="ma-group" id="wish" aria-labelledby="ma-wish">
          <div className="ma-group__head">
            <h2 id="ma-wish">내가 찜한 소니 <span className="ma-count">{WISH.length}</span></h2>
            <div className="ma-sec__actions">
              <button type="button" className="ma-btn ma-btn--line">선택 삭제</button>
              <button type="button" className="ma-btn ma-btn--dark">선택 제품 장바구니 담기</button>
            </div>
          </div>
          <ul className="ma-wish">
            {WISH.map((w) => (
              <li key={w.model}>
                <a href="#wish">
                  <span className="ma-wish__thumb" aria-hidden="true">
                    {w.img ? <img src={w.img} alt="" /> : w.model}
                  </span>
                  <span className="ma-wish__model">{w.model}</span>
                  <span className="ma-wish__name">{w.name}</span>
                  <span className="ma-wish__price">{won(w.price)}<em>원</em></span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
