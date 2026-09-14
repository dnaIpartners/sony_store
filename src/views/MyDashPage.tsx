import Link from "next/link";
import MallSlider from "@/src/components/MallSlider";
import { SONY_EVENTS } from "@/src/lib/sony-events";
import {
  USER,
  ORDER_STEPS,
  ORDERS,
  COUPONS,
  WISH,
  PRODUCTS,
  SERVICE_STEPS,
  SERVICES,
  PLANS,
  ACADEMY,
  EVENTS,
  won,
} from "@/src/lib/my-data";

// My Sony 대시보드 — 두 번째 제안.
//
// /my(통합 마이페이지)와 내용은 같다. 다른 것은 구조다:
//   /my      긴 한 장. 요약 띠 → 고정 탭 → 섹션을 아래로 읽어 내려간다
//   /my-dash 한 화면. 왼쪽 메뉴 + 오른쪽 위젯 격자. 각 위젯은 요약만 보여 주고
//            "더보기"로 /my 의 해당 섹션으로 보낸다
// 차별점은 "해야 할 일" 위젯 — 보증 만료·쿠폰 만료·강좌 D-day·A/S 진행처럼
// 지금 손댈 일을 한곳에 모은다. 데이터는 src/lib/my-data.ts 의 더미.
// 스타일은 src/styles/my-dash.css.

const MENU = [
  { href: "#w-order", label: "주문/배송", count: 2 },
  { href: "#w-product", label: "정품등록/관리", count: 2 },
  { href: "#w-service", label: "픽업 · A/S", count: 1 },
  { href: "#w-plan", label: "연장서비스 EPS" },
  { href: "#w-coupon", label: "쿠폰 · 마일리지", count: 2 },
  { href: "#w-event", label: "이벤트" },
  { href: "#w-wish", label: "찜", count: 3 },
  { href: "/my-page/member", label: "회원정보" },
];

// 지금 손댈 일 — 각 데이터에서 뽑아낸다
const TODOS = [
  { kind: "warn", text: "WH-1000XM5 보증이 2026.10.13 만료됩니다", action: "보증 연장", href: "#w-plan" },
  { kind: "warn", text: "마케팅 수신 동의 5,000원 쿠폰이 7일 뒤 만료", action: "쿠폰 쓰기", href: "/my-page#coupon-tit" },
  { kind: "info", text: "ILCE-7CM2L 정품등록하면 10% 쿠폰", action: "정품등록", href: "https://www.sony.co.kr/scs/handler/SCSWarranty-Start?asa=Sa" },
  { kind: "info", text: "[건축 사진] 도시의 선과 면을 담다 강좌 D-4", action: "강좌 보기", href: "#w-academy" },
  { kind: "info", text: "WH-1000XM5 A/S 점검·수리 중", action: "진행 보기", href: "#w-service" },
];

export default function MyDashPage() {
  const orderTotal = ORDER_STEPS.reduce((n, s) => n + s.count, 0);
  const nextClass = ACADEMY[0];
  const active = SERVICES.find((s) => s.step < SERVICE_STEPS.length - 1) ?? SERVICES[0];

  return (
    <main className="md">
      {/* ── 머리: 프로필 + 빠른 실행 ─────────────────────────── */}
      <header className="md-head">
        <div className="md-inner md-head__inner">
          <div className="md-me">
            <span className="md-me__avatar" aria-hidden="true">
              <img src="/asset/sony/ic_mypage.svg" alt="" />
            </span>
            <div>
              <h1 className="md-me__name">
                {USER.name}님
                <span className="md-badge">{USER.grade}</span>
                {USER.unified ? <span className="md-badge md-badge--line">통합회원</span> : null}
              </h1>
              <p className="md-me__sub">
                {USER.nextGrade}까지 <strong>{won(USER.nextGradeAmount)}원</strong> · 가입 {USER.joined}
              </p>
            </div>
          </div>
          <div className="md-quick">
            <a
              href="https://www.sony.co.kr/scs/handler/SCSWarranty-Start?asa=Sa"
              target="_blank"
              rel="noopener noreferrer"
              className="md-btn md-btn--dark"
            >
              정품등록하기
            </a>
            <Link href="/my-sony/pickup" className="md-btn md-btn--line">픽업 서비스 신청</Link>
            <Link href="/my-page/member" className="md-btn md-btn--line">회원정보 수정</Link>
          </div>
        </div>
      </header>

      <div className="md-inner md-body">
        {/* ── 왼쪽 메뉴 ───────────────────────────────────────── */}
        <nav className="md-menu" aria-label="마이페이지 메뉴">
          <ul>
            {MENU.map((m) => (
              <li key={m.label}>
                <a href={m.href}>
                  {m.label}
                  {m.count ? <span className="md-menu__count">{m.count}</span> : null}
                </a>
              </li>
            ))}
          </ul>
          <Link href="/my" className="md-menu__alt">
            한 장으로 보기 <small>/my</small>
          </Link>
        </nav>

        {/* ── 위젯 격자 ───────────────────────────────────────── */}
        <div className="md-grid">
          {/* 해야 할 일 */}
          <section className="md-w md-w--todo md-span-4" aria-labelledby="w-todo-t">
            <div className="md-w__head">
              <h2 id="w-todo-t">지금 할 일 <span className="md-count">{TODOS.length}</span></h2>
            </div>
            <ul className="md-todo">
              {TODOS.map((t) => (
                <li key={t.text} className={`md-todo__item md-todo__item--${t.kind}`}>
                  <span className="md-todo__text">{t.text}</span>
                  {t.href.startsWith("http") ? (
                    <a href={t.href} target="_blank" rel="noopener noreferrer" className="md-todo__action">{t.action}</a>
                  ) : (
                    <Link href={t.href} className="md-todo__action">{t.action}</Link>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* 주문/배송 */}
          <section className="md-w md-span-8" id="w-order" aria-labelledby="w-order-t">
            <div className="md-w__head">
              <h2 id="w-order-t">주문/배송 <span className="md-count">{orderTotal}</span></h2>
              <Link href="/my#order" className="md-more">더보기</Link>
            </div>
            <ol className="md-steps">
              {ORDER_STEPS.map((s) => (
                <li key={s.label} className={s.count ? "on" : undefined}>
                  <s.Icon className="md-steps__icon" />
                  <span className="md-steps__label">{s.label}</span>
                  <b className="md-steps__count">{s.count}</b>
                </li>
              ))}
            </ol>
            <ul className="md-rows">
              {ORDERS.map((o) => (
                <li key={o.no}>
                  <span className="md-rows__date">{o.date}</span>
                  <span className="md-rows__main"><strong>{o.model}</strong> {o.name}</span>
                  <span className="md-rows__num">{won(o.price)}원</span>
                  <b className={`md-rows__state${o.on ? " on" : ""}`}>{o.status}</b>
                </li>
              ))}
            </ul>
          </section>

          {/* 내 제품 */}
          <section className="md-w md-span-6" id="w-product" aria-labelledby="w-product-t">
            <div className="md-w__head">
              <h2 id="w-product-t">내 제품 <span className="md-count">{PRODUCTS.length}</span></h2>
              <Link href="/my#warranty" className="md-more">더보기</Link>
            </div>
            <ul className="md-products">
              {PRODUCTS.map((p) => (
                <li key={p.model} className={`md-product md-product--${p.status === "보증중" ? "ok" : p.status === "만료 임박" ? "soon" : "none"}`}>
                  <span className="md-product__img" aria-hidden="true">
                    {p.img ? <img src={p.img} alt="" /> : <i>{p.model}</i>}
                  </span>
                  <span className="md-product__body">
                    <strong>{p.model}</strong>
                    <small>{p.status === "미등록" ? "정품등록 전" : `보증 ${p.warrantyEnd} 까지`}{p.care !== "-" ? ` · ${p.care}` : ""}</small>
                  </span>
                  <b className="md-product__status">{p.status}</b>
                </li>
              ))}
            </ul>
          </section>

          {/* 픽업 · A/S */}
          <section className="md-w md-span-6" id="w-service" aria-labelledby="w-service-t">
            <div className="md-w__head">
              <h2 id="w-service-t">픽업 · A/S <span className="md-count">{SERVICES.length}</span></h2>
              <Link href="/my#pickup" className="md-more">더보기</Link>
            </div>
            <div className="md-service">
              <p className="md-service__no">{active.no} · {active.date} · {active.how}</p>
              <p className="md-service__title"><strong>{active.model}</strong> {active.symptom}</p>
              <ol className="md-progress" aria-label="진행 단계">
                {SERVICE_STEPS.map((st, i) => (
                  <li key={st} className={i < active.step ? "done" : i === active.step ? "now" : undefined}>
                    <span>{st}</span>
                  </li>
                ))}
              </ol>
            </div>
            <ul className="md-rows md-rows--tight">
              {SERVICES.filter((s) => s !== active).map((s) => (
                <li key={s.no}>
                  <span className="md-rows__date">{s.date}</span>
                  <span className="md-rows__main"><strong>{s.model}</strong> {s.symptom}</span>
                  <b className="md-rows__state">{SERVICE_STEPS[s.step]}</b>
                </li>
              ))}
            </ul>
          </section>

          {/* 쿠폰 */}
          <section className="md-w md-span-4" id="w-coupon" aria-labelledby="w-coupon-t">
            <div className="md-w__head">
              <h2 id="w-coupon-t">쿠폰 <span className="md-count">{COUPONS.length}</span></h2>
              <Link href="/my-page#coupon-tit" className="md-more">더보기</Link>
            </div>
            <ul className="md-coupons">
              {COUPONS.map((c) => (
                <li key={c.name} className="md-coupon">
                  <span className="md-coupon__body">
                    <b className="md-coupon__price"><strong>{c.price}</strong>{c.unit}</b>
                    <span className="md-coupon__name">{c.name}</span>
                    <small>{c.until.slice(0, 10)} 까지</small>
                  </span>
                  <span className="md-coupon__stub" aria-hidden="true"><span>COUPON</span></span>
                </li>
              ))}
            </ul>
          </section>

          {/* 마일리지 + 플랜 */}
          <section className="md-w md-span-4" id="w-plan" aria-labelledby="w-plan-t">
            <div className="md-w__head">
              <h2 id="w-plan-t">마일리지 · 연장서비스</h2>
              <Link href="/my#eps" className="md-more">더보기</Link>
            </div>
            <div className="md-mileage">
              <span className="md-mileage__label">사용 가능 마일리지</span>
              <b className="md-mileage__value">12,500<em>M</em></b>
              <small><i>2,000M</i> 이 2026.09.30 소멸 예정</small>
            </div>
            <ul className="md-rows md-rows--tight">
              {PLANS.map((p) => (
                <li key={p.plan}>
                  <span className="md-rows__main"><strong>{p.plan}</strong> {p.model !== "-" ? p.model : ""}</span>
                  <b className={`md-rows__state${p.status === "가입중" ? " on" : ""}`}>{p.status}</b>
                </li>
              ))}
            </ul>
          </section>

          {/* 찜 */}
          <section className="md-w md-span-4" id="w-wish" aria-labelledby="w-wish-t">
            <div className="md-w__head">
              <h2 id="w-wish-t">찜 <span className="md-count">{WISH.length}</span></h2>
              <Link href="/my#wish" className="md-more">더보기</Link>
            </div>
            <ul className="md-wish">
              {WISH.map((w) => (
                <li key={w.model}>
                  <Link href="/my#wish">
                    <span className="md-wish__thumb" aria-hidden="true">
                      {w.img ? <img src={w.img} alt="" /> : w.model}
                    </span>
                    <span className="md-wish__model">{w.model}</span>
                    <b className="md-wish__price">{won(w.price)}원</b>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* 이벤트 */}
          <section className="md-w md-w--flat md-span-8" id="w-event" aria-labelledby="w-event-t">
            <div className="md-w__head">
              <h2 id="w-event-t">진행 중인 이벤트</h2>
              <Link href="/my#event" className="md-more">더보기</Link>
            </div>
            <MallSlider items={SONY_EVENTS} tone="band" />
            <ul className="md-rows md-rows--tight md-rows--pad">
              {EVENTS.map((e) => (
                <li key={e.title}>
                  <span className="md-rows__date">{e.date}</span>
                  <span className="md-rows__main">{e.title}</span>
                  <b className={`md-rows__state${e.status === "당첨" ? " on" : ""}`}>{e.status}</b>
                </li>
              ))}
            </ul>
          </section>

          {/* 아카데미 */}
          <section className="md-w md-span-4" id="w-academy" aria-labelledby="w-academy-t">
            <div className="md-w__head">
              <h2 id="w-academy-t">다음 강좌</h2>
              <Link href="/my#event" className="md-more">더보기</Link>
            </div>
            <Link href="/my#event" className="md-academy">
              <span className="md-academy__thumb" aria-hidden="true">
                <img src={nextClass.img} alt="" />
              </span>
              <span className="md-academy__body">
                <strong>{nextClass.title}</strong>
                <small>강좌일 {nextClass.date} · {nextClass.status}</small>
              </span>
            </Link>
            <ul className="md-rows md-rows--tight">
              {ACADEMY.slice(1).map((a) => (
                <li key={a.title}>
                  <span className="md-rows__date">{a.date}</span>
                  <span className="md-rows__main">{a.title}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
