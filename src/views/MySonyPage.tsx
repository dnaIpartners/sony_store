"use client";
import Link from "next/link";
import MallSlider from "@/src/components/MallSlider";
import { SONY_EVENTS } from "@/src/lib/sony-events";
import {
  IconDeposit,
  IconPaid,
  IconPacking,
  IconShipping,
  IconDelivered,
} from "@/src/components/OrderStepIcons";

// My Sony — new 마이페이지.
//
// 와이어프레임(2026-09-14 스크린샷 3장)의 항목을 그대로 옮겼다:
//   머리(할 수 있는 일 메뉴) → 회원 요약 패널 + 전용몰 카드 → 주문/배송 5칸
//   → 나의 아카데미 → 나의 소니(정품등록 · 내 제품) → 쿠폰
//   → My Sony Care + 보증/AS 안내
// 와이어프레임은 둥근 카드·알약 버튼을 쓴다. 가이드의 각진 규칙과 다르지만
// 시안을 따른다. 스타일은 src/styles/my-sony.css.
//
// 데이터는 전부 이 파일 안의 더미다. 슬라이드는 Swiper 대신 scroll-snap.

const QUICK_MENU = [
  { href: "/my-page/order-list", label: "주문/배송 조회" },
  { href: "/my-sony/products", label: "정품등록/관리" },
  { href: "/my-sony/eps", label: "연장서비스 플랜 EPS" },
  { href: "/my-sony/pickup", label: "픽업서비스 신청/내역" },
  { href: "/my-sony/events", label: "이벤트관리" },
  { href: "/my-page#wish-tit", label: "내가 찜한 소니" },
];

const USER = {
  name: "가나다",
  grade: "MEMBERSHIP",
  mileage: 10_000,
  coupons: 2,
};

const STATS = [
  { key: "grade", value: USER.grade, unit: "", link: "등급&혜택 안내", href: "/membership/benefit" },
  { key: "mileage", value: USER.mileage.toLocaleString("ko-KR"), unit: "M", link: "마일리지 안내", href: "/my-page#mileage-tit" },
  { key: "coupon", value: String(USER.coupons), unit: "장", link: "쿠폰 안내", href: "/my-page#coupon-tit" },
];


// 입금대기 → 결제완료 → 배송준비 → 배송중 → 배송완료
const ORDER_STEPS = [
  { label: "입금대기", count: 1, Icon: IconDeposit },
  { label: "결제완료", count: 0, Icon: IconPaid },
  { label: "배송준비", count: 0, Icon: IconPacking },
  { label: "배송중", count: 0, Icon: IconShipping },
  { label: "배송완료", count: 7, Icon: IconDelivered },
];

// 썸네일 파일명이 한글이라 URL 로는 인코딩해 쓴다
const ACADEMY = [
  {
    title: "[건축 사진] 도시의 선과 면을 담다 - 1강",
    img: encodeURI("/asset/sony/건물.png"),
    classDate: "2026.09.18",
    applyDate: "2026.09.11",
    status: "접수 후 결제완료",
  },
  {
    title: "[인물 사진] 자연광 포트레이트 - 2강",
    img: encodeURI("/asset/sony/인물.png"),
    classDate: "2026.09.25",
    applyDate: "2026.09.12",
    status: "접수 후 결제완료",
  },
  {
    title: "[풍경 사진] 골든아워 장노출 - 1강",
    img: encodeURI("/asset/sony/풍경.png"),
    classDate: "2026.10.02",
    applyDate: "2026.09.14",
    status: "접수 대기",
  },
];

const MY_PRODUCTS = [
  { model: "ILCE-7RM6", copy: "초고해상도의 독주", img: "/asset/sony/ILCE-7RM6.png" },
  { model: "ILCE-7CM2L", copy: "작고 가벼운 풀프레임, 렌즈 키트", img: "/asset/sony/ILCE-7CM2L.png" },
];

// 나의 소니 아래 혜택 배너 자리에 쿠폰 카드를 놓는다 (참고 시안 디자인)
const COUPONS = [
  {
    price: "5,000", unit: "원", name: "마케팅 수신 동의 5,000원 할인", until: "2026-09-21 23:59:59",
    info: "*발급대상 : 마케팅 수신 동의 고객\n*적용제품 : 3만원 이상의 소니스토어 전 제품 (단, My Sony Care 제외)\n*발급일로부터 7일간 자유롭게 사용 가능",
  },
  {
    price: "5", unit: "%", name: "회원가입 감사 5% 할인", until: "2026-09-28 23:59:59",
    info: "*발급대상 : 신규 회원 가입 고객\n*적용제품 : 3만원 이상의 소니스토어 전 제품 (단, My Sony Care 제외)\n*최대할인 : 100,000원\n*발급일로부터 14일간 자유롭게 사용 가능",
  },
];

const CARE = {
  expired: 2,
};

export default function MySonyPage() {
  return (
    <main className="ms">
      <div className="ms-inner">
        {/* ── 머리 ─────────────────────────────────────────── */}
        <header className="ms-head">
          <h1 className="ms-head__title">My Sony</h1>
          <p className="ms-head__lead">My Sony에서 할 수 있는 일!</p>
          <nav className="ms-quick" aria-label="My Sony 메뉴">
            <ul>
              {QUICK_MENU.map((m) => (
                <li key={m.label}>
                  <Link href={m.href}>{m.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {/* ── 회원 요약 패널 ────────────────────────────────── */}
        <section className="ms-panel" aria-labelledby="ms-panel-title">
          <div className="ms-panel__profile">
            <span className="ms-panel__avatar" aria-hidden="true">
              <img src="/asset/sony/ic_mypage.svg" alt="" />
            </span>
            <div>
              <p className="ms-panel__hello" id="ms-panel-title">
                <strong>{USER.name}님</strong> 환영합니다.
                <Link href="/my-page/member" className="ms-btn ms-btn--dark ms-btn--xs">
                  회원정보수정
                </Link>
              </p>
              <Link href="/membership/convert" className="ms-link">
                통합회원전환 안내
              </Link>
            </div>
          </div>

          <ul className="ms-stats">
            {STATS.map((s) => (
              <li key={s.key} className={`ms-stat ms-stat--${s.key}`}>
                <span className="ms-stat__icon" aria-hidden="true">M</span>
                <div>
                  <p className="ms-stat__value">
                    {s.value}
                    {s.unit ? <em>{s.unit}</em> : null}
                  </p>
                  <Link href={s.href} className="ms-link">
                    {s.link}
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          <div className="ms-malls">
            <MallSlider items={SONY_EVENTS} tone="panel" />
          </div>
        </section>

        {/* ── 주문/배송 ────────────────────────────────────── */}
        <section className="ms-sec" aria-labelledby="ms-order-title">
          <div className="ms-sec__head">
            <h2 className="ms-sec__title" id="ms-order-title">주문/배송</h2>
            <Link href="/my-page/order-list" className="ms-link ms-sec__more">
              구매 내역 조회
            </Link>
          </div>
          <ol className="ms-steps">
            {ORDER_STEPS.map((s) => (
              <li key={s.label} className={`ms-step${s.count ? " on" : ""}`}>
                <span className="ms-step__label">
                  <s.Icon className="ms-step__icon" />
                  {s.label}
                </span>
                {s.count ? (
                  <Link href="/my-page/order-list" className="ms-step__count">
                    {s.count}
                  </Link>
                ) : (
                  <span className="ms-step__count">{s.count}</span>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* ── 나의 아카데미 ─────────────────────────────────── */}
        <section className="ms-sec" aria-labelledby="ms-academy-title">
          <div className="ms-sec__head">
            <h2 className="ms-sec__title" id="ms-academy-title">나의 아카데미</h2>
            <a
              href="https://www.sony.co.kr/alpha/handler/NAlphaAcademy-OfflineList"
              target="_blank"
              rel="noopener noreferrer"
              className="ms-link ms-sec__more"
            >
              아카데미 바로가기
            </a>
          </div>
          <ul className="ms-cards ms-cards--academy">
            {ACADEMY.map((a) => (
              <li key={a.title} className="ms-card ms-card--academy">
                <div className="ms-card__thumb ms-card__thumb--img">
                  <img src={a.img} alt="" />
                  <p className="ms-card__thumb-title">{a.title}</p>
                </div>
                <dl className="ms-academy__meta">
                  <div>
                    <dt>강좌일</dt>
                    <dd>{a.classDate}</dd>
                  </div>
                  <div>
                    <dt>신청일</dt>
                    <dd>{a.applyDate}</dd>
                    <span className={`ms-academy__status${a.status.includes("대기") ? " wait" : ""}`}>
                      {a.status}
                    </span>
                  </div>
                </dl>
              </li>
            ))}
            {Array.from({ length: Math.max(0, 3 - ACADEMY.length) }, (_, i) => (
              <li key={i} className="ms-card ms-card--empty" aria-hidden="true"><div className="ms-card__thumb" /></li>
            ))}
          </ul>
        </section>

        {/* ── 나의 소니 ────────────────────────────────────── */}
        <section className="ms-sec" aria-labelledby="ms-mine-title">
          <div className="ms-sec__head">
            <h2 className="ms-sec__title" id="ms-mine-title">나의 소니</h2>
            <Link href="/my-sony/products" className="ms-link ms-sec__more">
              제품 정보/관리
            </Link>
          </div>
          <ul className="ms-cards ms-cards--mine">
            <li className="ms-card ms-card--cta">
              <p className="ms-card__cta-copy">
                소니 정품등록하고
                <br />
                10% 할인쿠폰 받으세요.
              </p>
              <a
                href="https://www.sony.co.kr/scs/handler/SCSWarranty-Start"
                target="_blank"
                rel="noopener noreferrer"
                className="ms-btn ms-btn--dark ms-btn--pill"
              >
                정품등록하기
              </a>
            </li>
            {MY_PRODUCTS.map((p) => (
              <li key={p.model} className="ms-card ms-card--product">
                <Link href="/my-sony/products">
                  <div className="ms-product__img">
                    <img src={p.img} alt={p.model} />
                  </div>
                  <p className="ms-product__model">{p.model}</p>
                  <p className="ms-product__copy">{p.copy}</p>
                </Link>
              </li>
            ))}
            {MY_PRODUCTS.length < 2 ? <li className="ms-card ms-card--empty" aria-hidden="true" /> : null}
          </ul>

          <div className="ms-coupons">
            <div className="ms-coupons__head">
              <h3>쿠폰 <span className="ms-coupons__count">{COUPONS.length}</span></h3>
              <Link href="/my-page#coupon-tit" className="ms-link">쿠폰 전체보기</Link>
            </div>
            <ul className="ms-coupons__list">
              {COUPONS.map((c) => (
                <li key={c.name}>
                  <div className="ms-coupon">
                    <div className="ms-coupon__body">
                      <p className="ms-coupon__price"><strong>{c.price}</strong>{c.unit}</p>
                      <p className="ms-coupon__name">{c.name}</p>
                      <p className="ms-coupon__date">유효기간 : {c.until} 까지</p>
                    </div>
                    <span className="ms-coupon__stub" aria-hidden="true"><span>COUPON</span></span>
                  </div>
                  <p className="ms-coupon__info">{c.info}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="ms-care">
            <div className="ms-card ms-card--cta">
              <p className="ms-card__cta-copy">
                소니의 공식
                <br />
                무상수리 연장 서비스
              </p>
              <Link href="/mysonycare" className="ms-btn ms-btn--dark ms-btn--pill">
                My Sony Care
              </Link>
            </div>
            <ul className="ms-care__list">
              <li>
                <p>보증기간이 만료된 제품이 {CARE.expired}건 있습니다.</p>
                <div className="ms-care__actions">
                  <Link href="/my-sony/products" className="ms-btn ms-btn--slate">
                    보증기간 수정요청
                  </Link>
                </div>
              </li>
              <li>
                <p>A/S가 필요하신가요?</p>
                <div className="ms-care__actions">
                  <Link href="/my-sony/pickup" className="ms-btn ms-btn--slate">
                    픽업 서비스 신청
                  </Link>
                  <a
                    href="https://www.sony.co.kr/scs/handler/SCSReservation-Start"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ms-btn ms-btn--slate"
                  >
                    A/S센터 방문 예약신청
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
