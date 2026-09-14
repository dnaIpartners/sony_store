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
// 원칙: 사용자가 "어느 사이트의 메뉴였는지" 를 몰라도 되게 한다. 그래서 출처가
// 아니라 사용자의 일 — 쇼핑 / 내 제품 / 서비스 / 활동 / 회원정보 — 으로 묶고,
// 세 곳에 흩어져 있던 같은 정보(회원, 정품등록, 쿠폰)는 한 번만 보여준다.
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
  { key: "mileage", label: "마일리지", value: "12,500", unit: "M", href: "#shop-mileage" },
  { key: "coupon", label: "쿠폰", value: "2", unit: "장", href: "#shop-coupon" },
  { key: "wish", label: "찜", value: "5", unit: "개", href: "#shop-wish" },
  { key: "order", label: "진행 중 주문", value: "2", unit: "건", href: "#shop-order" },
  { key: "product", label: "정품등록 제품", value: "3", unit: "대", href: "#product" },
  { key: "service", label: "진행 중 A/S", value: "1", unit: "건", href: "#service" },
  { key: "warranty", label: "보증 만료 임박", value: "1", unit: "대", href: "#product", alert: true },
];

const TABS = [
  { id: "shop", label: "쇼핑", from: "스토어" },
  { id: "product", label: "내 제품", from: "정품등록" },
  { id: "service", label: "서비스", from: "My Sony" },
  { id: "activity", label: "활동", from: "스토어 · My Sony" },
  { id: "account", label: "회원정보", from: "통합" },
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

const COUPONS = [
  { price: "5,000", unit: "원", name: "마케팅 수신 동의 5,000원 할인", until: "2026-09-21 23:59:59" },
  { price: "5", unit: "%", name: "회원가입 감사 5% 할인", until: "2026-09-28 23:59:59" },
];

const MILEAGE = { available: 12_500, expiring: 2_000, expiringDate: "2026.09.30" };

const WISH = [
  { model: "ILCE-6700", name: "APS-C 미러리스 카메라 α6700", price: 1_890_000 },
  { model: "SEL70200GM2", name: "FE 70-200mm F2.8 GM OSS II", price: 3_690_000 },
  { model: "SRS-XB100", name: "휴대용 블루투스 스피커", price: 79_000 },
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
const INQUIRIES = [
  { kind: "1:1 문의", title: "정품등록 시리얼 인식 오류", date: "2026.09.09", status: "답변 완료" },
  { kind: "상품 Q&A", title: "SEL70200GM2 후드 호환 문의", date: "2026.08.28", status: "답변 완료" },
];

const won = (n: number) => n.toLocaleString("ko-KR");

export default function MyAllPage() {
  return (
    <main className="ma">
      {/* ── 머리 ─────────────────────────────────────────────── */}
      <header className="ma-head">
        <div className="ma-inner">
          <h1 className="ma-title">통합 마이페이지</h1>
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
        </div>
      </section>

      {/* ── 고정 탭 ─────────────────────────────────────────── */}
      <nav className="ma-tabs" aria-label="통합 마이페이지 구역">
        <div className="ma-inner">
          <ul>
            {TABS.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`}>
                  {t.label}
                  <small>{t.from}</small>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="ma-inner">
        {/* ══ 쇼핑 ═══════════════════════════════════════════ */}
        <section className="ma-group" id="shop" aria-labelledby="ma-shop">
          <div className="ma-group__head">
            <h2 id="ma-shop">쇼핑</h2>
            <p>스토어 마이페이지에서 가져왔습니다 — 주문·배송, 쿠폰, 마일리지, 찜.</p>
          </div>

          {/* 주문/배송 */}
          <div className="ma-sec" id="shop-order">
            <div className="ma-sec__head">
              <h3>주문/배송</h3>
              <div className="ma-sec__actions">
                <Link href="/my-page/order-list" className="ma-btn ma-btn--line">구매 내역 조회</Link>
                <button type="button" className="ma-btn ma-btn--line">배송지 관리</button>
              </div>
            </div>
            <ol className="ma-steps">
              {ORDER_STEPS.map((s) => (
                <li key={s.label} className={s.count ? "on" : undefined}>
                  <s.Icon className="ma-steps__icon" />
                  <span className="ma-steps__label">{s.label}</span>
                  <span className="ma-steps__count">{s.count}<em>건</em></span>
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
          </div>

          {/* 쿠폰 + 마일리지 */}
          <div className="ma-cols">
            <div className="ma-sec" id="shop-coupon">
              <div className="ma-sec__head">
                <h3>쿠폰 <span className="ma-count">{COUPONS.length}</span></h3>
                <Link href="/my-page#coupon-tit" className="ma-more">전체보기</Link>
              </div>
              <ul className="ma-coupons">
                {COUPONS.map((c) => (
                  <li key={c.name} className="ma-coupon">
                    <div className="ma-coupon__body">
                      <p className="ma-coupon__price"><strong>{c.price}</strong>{c.unit}</p>
                      <p className="ma-coupon__name">{c.name}</p>
                      <p className="ma-coupon__date">유효기간 : {c.until} 까지</p>
                    </div>
                    <span className="ma-coupon__stub" aria-hidden="true"><span>COUPON</span></span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ma-sec" id="shop-mileage">
              <div className="ma-sec__head">
                <h3>마일리지</h3>
                <Link href="/my-page#mileage-tit" className="ma-more">내역 조회</Link>
              </div>
              <div className="ma-mileage">
                <p className="ma-mileage__main">
                  사용 가능 <strong>{won(MILEAGE.available)}</strong>M
                </p>
                <p className="ma-mileage__sub">
                  <b>{won(MILEAGE.expiring)}M</b> 이 {MILEAGE.expiringDate} 소멸 예정
                </p>
                <ul className="ma-mileage__tips">
                  <li>구매 시 결제금액의 2% 적립 (VIP 4%)</li>
                  <li>5,000M 이상이면 현금처럼 사용</li>
                  <li>서비스센터 수리비 결제에도 사용 가능</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 찜 */}
          <div className="ma-sec" id="shop-wish">
            <div className="ma-sec__head">
              <h3>찜 <span className="ma-count">{WISH.length}</span></h3>
              <Link href="/my-page#wish-tit" className="ma-more">전체보기</Link>
            </div>
            <ul className="ma-wish">
              {WISH.map((w) => (
                <li key={w.model}>
                  <a href="#shop-wish">
                    <span className="ma-wish__thumb" aria-hidden="true">{w.model}</span>
                    <span className="ma-wish__model">{w.model}</span>
                    <span className="ma-wish__name">{w.name}</span>
                    <span className="ma-wish__price">{won(w.price)}<em>원</em></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ══ 내 제품 ═════════════════════════════════════════ */}
        <section className="ma-group" id="product" aria-labelledby="ma-product">
          <div className="ma-group__head">
            <h2 id="ma-product">내 제품</h2>
            <p>정품등록(SCSWarranty)과 My Sony 나의 제품을 합쳤습니다. 구매한 제품은 등록 전이라도 여기에 먼저 보입니다.</p>
          </div>

          <div className="ma-sec">
            <div className="ma-sec__head">
              <h3>정품등록 제품 <span className="ma-count">{PRODUCTS.filter((p) => p.status !== "미등록").length}</span></h3>
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
                        <a href="#service" className="ma-btn ma-btn--line ma-btn--sm">A/S 신청</a>
                        {p.care === "-" ? (
                          <Link href="/mysonycare" className="ma-btn ma-btn--line ma-btn--sm">보증 연장</Link>
                        ) : null}
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <ul className="ma-notes">
              <li>정품등록 후 발급되는 10% 할인쿠폰은 <a href="#shop-coupon">쿠폰</a>에 바로 표시됩니다.</li>
              <li>보증 만료 30일 전부터 ‘만료 임박’으로 표시되며, 만료 전에 My Sony Care 로 연장할 수 있습니다.</li>
              <li>구매일·보증기간이 실제와 다르면 <a href="#activity-inquiry">보증기간 수정요청</a>을 남겨주세요.</li>
            </ul>
          </div>
        </section>

        {/* ══ 서비스 ═════════════════════════════════════════ */}
        <section className="ma-group" id="service" aria-labelledby="ma-service">
          <div className="ma-group__head">
            <h2 id="ma-service">서비스</h2>
            <p>My Sony 서비스 마이페이지 — A/S 접수, 픽업, 연장 보증 플랜.</p>
          </div>

          <div className="ma-sec">
            <div className="ma-sec__head">
              <h3>A/S 접수 내역</h3>
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

          <div className="ma-cols">
            <div className="ma-sec">
              <div className="ma-sec__head"><h3>픽업 서비스</h3></div>
              <table className="ma-table ma-table--compact">
                <thead><tr><th>접수번호</th><th>제품</th><th>수거일</th><th>상태</th></tr></thead>
                <tbody>
                  {PICKUPS.map((p) => (
                    <tr key={p.no}>
                      <td><span>{p.no}</span><small>{p.carrier}</small></td>
                      <td><strong>{p.model}</strong></td>
                      <td>{p.pickupDate}</td>
                      <td><b className="on">{p.status}</b></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="ma-sec">
              <div className="ma-sec__head">
                <h3>연장 보증 플랜</h3>
                <Link href="/mysonycare" className="ma-more">My Sony Care 안내</Link>
              </div>
              <table className="ma-table ma-table--compact">
                <thead><tr><th>플랜</th><th>대상 제품</th><th>만료</th><th>상태</th></tr></thead>
                <tbody>
                  {PLANS.map((p) => (
                    <tr key={p.plan}>
                      <td><strong>{p.plan}</strong></td>
                      <td>{p.model}</td>
                      <td>{p.until}</td>
                      <td><b className={p.status === "가입중" ? "on" : undefined}>{p.status}</b></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ══ 활동 ═══════════════════════════════════════════ */}
        <section className="ma-group" id="activity" aria-labelledby="ma-activity">
          <div className="ma-group__head">
            <h2 id="ma-activity">활동</h2>
            <p>아카데미 수강, 이벤트 응모, 문의 — 스토어와 My Sony 양쪽에 있던 것.</p>
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

          <div className="ma-cols">
            <div className="ma-sec">
              <div className="ma-sec__head"><h3>이벤트 응모</h3></div>
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
            <div className="ma-sec" id="activity-inquiry">
              <div className="ma-sec__head">
                <h3>문의 내역</h3>
                <button type="button" className="ma-btn ma-btn--line ma-btn--sm">1:1 문의하기</button>
              </div>
              <ul className="ma-list">
                {INQUIRIES.map((q) => (
                  <li key={q.title}>
                    <span className="ma-list__kind">{q.kind}</span>
                    <span className="ma-list__title">{q.title}</span>
                    <span className="ma-list__date">{q.date}</span>
                    <b>{q.status}</b>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ══ 회원정보 ═══════════════════════════════════════ */}
        <section className="ma-group" id="account" aria-labelledby="ma-account">
          <div className="ma-group__head">
            <h2 id="ma-account">회원정보</h2>
            <p>스토어 회원과 소니 통합회원을 하나로. 한 번 수정하면 세 곳에 모두 반영됩니다.</p>
          </div>
          <div className="ma-sec">
            <dl className="ma-account">
              <div><dt>이름</dt><dd>{USER.name}</dd></div>
              <div><dt>아이디</dt><dd>sony****@example.com</dd></div>
              <div><dt>휴대폰</dt><dd>010-****-1234</dd></div>
              <div><dt>통합회원</dt><dd>{USER.unified ? "전환 완료 — 스토어 · My Sony · 알파아카데미 공용" : "미전환"}</dd></div>
              <div><dt>기본 배송지</dt><dd>서울특별시 강남구 테헤란로 ***, 12층</dd></div>
              <div><dt>마케팅 수신</dt><dd>이메일 동의 · SMS 동의 · 앱 푸시 미동의</dd></div>
            </dl>
            <div className="ma-sec__actions ma-sec__actions--end">
              <Link href="/my-page/member" className="ma-btn ma-btn--dark">회원정보 수정</Link>
              <button type="button" className="ma-btn ma-btn--line">배송지 관리</button>
              <button type="button" className="ma-btn ma-btn--line">비밀번호 변경</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
