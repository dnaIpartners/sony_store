"use client";
import { useState } from "react";
import Link from "next/link";
import {
  IconDeposit,
  IconPaid,
  IconPacking,
  IconShipping,
  IconDelivered,
} from "@/src/components/OrderStepIcons";
import MallSlider from "@/src/components/MallSlider";
import { SONY_EVENTS } from "@/src/lib/sony-events";
import { ACADEMY, EVENTS, WISH, PRODUCTS, won } from "@/src/lib/my-data";

// Sony Store KR 마이페이지.
//
// 마크업과 클래스 이름은 store.sony.co.kr/my-page 의 <div class="my_wrap"> 를
// 그대로 옮겼다. 스타일은 src/styles/my-page.css 에 있다.
//
// 원본이 라이브러리로 하던 것은 직접 만든다:
//   · tui-datepicker → 읽기전용 인풋. 3개월/6개월/1년 탭이 기간을 채운다
//   · 쿠폰 상세(.coupon_info) 는 접지 않고 카드 아래 항상 보인다
//   · 배송지 관리 / 장바구니 팝업 → 버튼만 있고 열리는 것은 없다
//
// 데이터는 전부 이 파일 안의 더미다.

const USER = {
  name: "윤근식",
  grade: "MEMBERSHIP",
  mileage: 0,
  mileageExpiring: 0,
  coupons: 2,
  likes: 0,
};

// 입금대기 → 결제완료 → 배송준비 → 배송중 → 배송완료
const ORDER_STEPS = [
  { step: 1, label: "입금대기", count: 0, Icon: IconDeposit },
  { step: 2, label: "결제완료", count: 0, Icon: IconPaid },
  { step: 3, label: "배송준비", count: 0, Icon: IconPacking },
  { step: 4, label: "배송중", count: 0, Icon: IconShipping },
  { step: 5, label: "배송완료", count: 0, Icon: IconDelivered },
];

const DATE_TABS = [
  { label: "3개월", months: 3 },
  { label: "6개월", months: 6 },
  { label: "1년", months: 12 },
];

const COUPONS = [
  {
    price: "5,000",
    unit: "원",
    name: "마케팅 수신 동의 5,000원 할인",
    until: "2026-09-21 23:59:59",
    info:
      "*발급대상 : 마케팅 수신 동의 고객\n*적용제품 : 3만원 이상의 소니스토어 전 제품 (단, My Sony Care 제외)\n*발급일로부터 7일간 자유롭게 사용 가능",
  },
  {
    price: "5",
    unit: "%",
    name: "회원가입 감사 5% 할인",
    until: "2026-09-28 23:59:59",
    info:
      "*발급대상 : 신규 회원 가입 고객\n*적용제품 : 3만원 이상의 소니스토어 전 제품 (단, My Sony Care 제외)\n*최대할인 : 100,000원\n*발급일로부터 14일간 자유롭게 사용 가능",
  },
];

// B 히어로의 빠른 메뉴 — 와이어프레임 "My Sony에서 할 수 있는 일!"
const QUICK_MENU = [
  { href: "/my-page/order-list", label: "주문/배송 조회" },
  { href: "https://www.sony.co.kr/scs/handler/SCSWarranty-Start?asa=Sa", label: "정품등록/관리", external: true },
  { href: "/mysonycare", label: "연장서비스 플랜 EPS" },
  { href: "/my-sony/pickup", label: "픽업서비스 신청/내역" },
  { href: "#event-tit", label: "이벤트관리" },
  { href: "#wish-tit", label: "내가 찜한 소니" },
];

const TODAY = new Date(2026, 8, 14);

function fmt(d: Date) {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}.${mm}.${dd}`;
}
function monthsAgo(months: number) {
  const d = new Date(TODAY);
  d.setMonth(d.getMonth() - months);
  return d;
}

// variant="b" 는 마크업은 그대로 두고 src/styles/my-page-b.css 로 스타일만 바꾼다.
// B 에만 나의 아카데미 · 이벤트 섹션이 더 붙는다(현행 페이지에는 없는 항목).
export default function MyPage({ variant }: { variant?: "b" } = {}) {
  return (
    <div className={`my_wrap${variant ? ` my_wrap--${variant}` : ""}`}>
      {/* ── 머리: 제목 + 회원 요약 ─────────────────────────── */}
      <div className="my_head">
        <h2 className="title">마이페이지</h2>
        <div className="my_user">
          <div className="user_profile">
            <p className="user_name">
              <span className="name">{USER.name}</span>님 안녕하세요 :)
              {variant === "b" ? (
                <Link href="/membership/convert" className="user_convert">
                  통합회원전환 안내
                </Link>
              ) : null}
            </p>
            <p className="user_modify_wrap pc_only">
              회원정보
              <Link className="button button_positive button-s" href="/my-page/member">
                수정
              </Link>
            </p>
            <Link className="user_modify under_line mo_only" href="/my-page/member">
              회원정보 수정
            </Link>
          </div>
          <div className="user_info">
            <ul>
              <li className="user_item grade">
                <Link className="user_tabs" href="/membership/benefit">
                  <span className="ico_txt">
                    <span className="txt_arrow">회원등급</span>
                  </span>
                  <span className="val_txt">
                    <span className="val family">{USER.grade}</span>
                  </span>
                  {variant === "b" ? <span className="guide_txt">등급&혜택 안내</span> : null}
                </Link>
              </li>
              <li className="user_item mileage">
                <a className="user_tabs" href="#mileage-tit">
                  <span className="ico_txt">
                    <span className="txt_arrow">마일리지</span>
                  </span>
                  <span className="val_txt">
                    <span className="val">{USER.mileage}</span>M
                  </span>
                  {variant === "b" ? <span className="guide_txt">마일리지 안내</span> : null}
                </a>
              </li>
              <li className="user_item coupon">
                <a className="user_tabs" href="#coupon-tit">
                  <span className="ico_txt">
                    <span className="txt_arrow">쿠폰</span>
                  </span>
                  <span className="val_txt">
                    <span className="val">{USER.coupons}</span> 장
                  </span>
                  {variant === "b" ? <span className="guide_txt">쿠폰 안내</span> : null}
                </a>
              </li>
              <li className="user_item like">
                <a className="user_tabs" href="#wish-tit">
                  <span className="ico_txt">
                    <span className="txt_arrow">찜</span>
                  </span>
                  <span className="val_txt">
                    <span className="val">{USER.likes}</span>
                  </span>
                  {variant === "b" ? <span className="guide_txt">찜한 상품 보기</span> : null}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {variant === "b" ? (
        <nav className="quick_menu" aria-label="My Sony 메뉴">
          <div className="quick_menu__inner">
              <p className="quick_menu__tit">My Sony에서 할 수 있는 일!</p>
              <ul>
                {QUICK_MENU.map((m) => (
                  <li key={m.label}>
                    {m.external ? (
                      <a href={m.href} target="_blank" rel="noopener noreferrer">{m.label}</a>
                    ) : m.href.startsWith("#") ? (
                      <a href={m.href}>{m.label}</a>
                    ) : (
                      <Link href={m.href}>{m.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
          </div>
        </nav>
      ) : null}

      <div className="cont_inner">
        <div className="b2b_banner" />
      </div>

      <div className="cont_inner">
        {/* ── 진행 중인 주문 ────────────────────────────────── */}
        <div className="cont history_order">
          <div className="tit_head">
            <h3 className="cont_tit">진행 중인 주문</h3>
            <div className="btn_article right">
              <Link className="button button_secondary button-s" href="/my-page/order-list">
                구매 내역 조회
              </Link>
              <button
                className="button button_secondary button-s"
                type="button"
                data-popup-name="my_addr"
              >
                배송지 관리
              </button>
            </div>
          </div>
          <div className="history_inner">
            <div className="my_order">
              <ul className="order_list">
                {ORDER_STEPS.map((s) => (
                  <li key={s.step} className={`step_${s.step}${s.count ? " on" : ""}`}>
                    <div className="ship_box">
                      <i className="ico" aria-hidden="true"><s.Icon /></i>
                      <span className="ico_txt">{s.label}</span>
                      <button className="val_txt" type="button">
                        <span className="val">{s.count}</span>
                        <span>건</span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="guide_list">
            <ul className="list_dot">
              <li>
                구매확정이 완료된 주문은 진행 중인 주문에 포함되지 않으며, 진행 상태에 따라
                배송지 변경, 취소, 교환 반품 신청이 가능합니다.
              </li>
            </ul>
          </div>
        </div>

        {variant === "b" ? (
          <div className="cont history_academy" id="academy-tit">
            <div className="tit_head">
              <h3 className="cont_tit">나의 아카데미</h3>
              <div className="btn_article right">
                <a
                  className="button button_secondary button-s"
                  href="https://www.sony.co.kr/alpha/handler/NAlphaAcademy-OfflineList"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  아카데미 바로가기
                </a>
              </div>
            </div>
            <div className="history_inner">
              <ul className="academy_list">
                {ACADEMY.map((a) => (
                  <li key={a.title}>
                    <div className="academy_thumb">
                      <img src={a.img} alt="" />
                      <p className="academy_title">{a.title}</p>
                    </div>
                    <div className="academy_meta">
                      <span>강좌일 {a.date}</span>
                      <b className={a.status === "결제완료" ? "on" : undefined}>{a.status}</b>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        {variant === "b" ? (
          <div className="cont history_mysony" id="mysony-tit">
            <div className="tit_head">
              <h3 className="cont_tit">나의 소니</h3>
              <div className="btn_article right">
                <a
                  className="button button_secondary button-s"
                  href="https://www.sony.co.kr/scs/handler/SCSWarranty-Start?asa=Sa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  제품 정보/관리
                </a>
              </div>
            </div>
            <div className="history_inner">
              <ul className="mysony_list">
                <li className="mysony_cta">
                  <p className="mysony_cta__copy">
                    소니 정품등록하고
                    <br />
                    10% 할인쿠폰 받으세요.
                  </p>
                  <a
                    className="button button_positive"
                    href="https://www.sony.co.kr/scs/handler/SCSWarranty-Start?asa=Sa"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    정품등록하기
                  </a>
                </li>
                {PRODUCTS.filter((p) => p.img).map((p) => (
                  <li key={p.model} className="mysony_item">
                    <a href="#mysony-tit">
                      <span className="mysony_thumb" aria-hidden="true">
                        <img src={p.img} alt="" />
                      </span>
                      <span className="mysony_model">{p.model}</span>
                      <span className="mysony_copy">{p.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        {variant === "b" ? (
          <div className="cont history_care" id="care-tit">
            <div className="tit_head">
              <h3 className="cont_tit">My Sony Care</h3>
            </div>
            <div className="history_inner">
              <div className="care_wrap">
                <div className="care_cta">
                  <p className="care_cta__copy">
                    소니의 공식
                    <br />
                    무상수리 연장 서비스
                  </p>
                  <Link className="button button_positive" href="/mysonycare">
                    My Sony Care
                  </Link>
                </div>
                <ul className="care_list">
                  <li>
                    <p>보증기간이 만료된 제품이 2건 있습니다.</p>
                    <div className="care_actions">
                      <a
                        className="button button_slate"
                        href="https://www.sony.co.kr/scs/handler/SCSWarranty-Start?asa=Sa"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        보증기간 수정요청
                      </a>
                    </div>
                  </li>
                  <li>
                    <p>A/S가 필요하신가요?</p>
                    <div className="care_actions">
                      <Link className="button button_slate" href="/my-sony/pickup">
                        픽업 서비스 신청
                      </Link>
                      <a
                        className="button button_slate"
                        href="https://www.sony.co.kr/scs/handler/SCSReservation-Start"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        A/S센터 방문 예약신청
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : null}

        {/* ── 마일리지 (B 에서는 뺀다 — 회원 바 숫자로 충분) ── */}
        {variant !== "b" ? (
        <div className="cont history_mileage" id="mileage-tit">
          <h3 className="cont_tit">마일리지</h3>
          <div className="history_inner">
            <div className="my_mileage">
              <p className="txt">
                사용 가능 <span className="mileage_val">{USER.mileage}</span>
                <span className="extinction">
                  (
                  <strong className="val_txt">
                    <span className="val">{USER.mileageExpiring}</span>M
                  </strong>{" "}
                  당월 소멸 예정)
                </span>
              </p>
            </div>
            <MileageInquiry />
            <div className="history_list">
              <div className="no_data on">
                <span>내역이 없습니다.</span>
              </div>
            </div>
          </div>
          <div className="guide_list">
            <p className="tit">[멤버십 마일리지 안내]</p>
            <ul className="list_dot">
              <li>구매 시 결제금액의 2%가 적립됩니다. (일부 품목 마일리지 적립대상 제외)</li>
              <li>
                <strong>VIP회원</strong>(누적 구매 금액 <strong>200만원</strong> 이상부터 적용)은
                구매 시 결제금액의 4%가 적립됩니다. (2년 간 혜택 유지)
              </li>
              <li>
                마일리지 적립은 <strong>제품 구매일 당일</strong>에만 적립 가능합니다. (온라인
                소니스토어 배송 완료 후 7일 이내에 적립)
              </li>
              <li>
                <strong>5,000 마일리지 이상</strong>이면 현금처럼 사용하실 수 있습니다.
              </li>
              <li>
                적립하신 마일리지는 소니스토어 온라인 및 직영점에서 제품 구매 시, 소니 공식 서비스
                센터에서의 제품 수리 및 콘텐츠 이용 시 사용 가능합니다.
              </li>
              <li>
                최근 1년 간의 멤버십 마일리지 내역만 조회 가능합니다. (날짜 직접 검색을 통해서 확인
                가능)
              </li>
            </ul>
          </div>
        </div>
        ) : null}

        {/* ── 쿠폰 ─────────────────────────────────────────── */}
        <div className="cont history_coupon" id="coupon-tit">
          <h3 className="cont_tit">쿠폰</h3>
          <div className="history_inner">
            <div className="history_list">
              <CouponList />
              <div className={`no_data${COUPONS.length ? "" : " on"}`}>
                <span>내역이 없습니다.</span>
              </div>
            </div>
            <div className="guide_list">
              <p className="tit">[쿠폰 사용 안내]</p>
              <ul className="list_dot">
                <li>
                  쿠폰은 <strong>주문당 1매씩 사용 가능하며, 제품 1개에만 적용</strong>됩니다.
                </li>
                <li>
                  쿠폰 할인은 결제 시점에서 자동으로 할인 금액만큼 차감되며 결제 예정금액이
                  표시됩니다.
                </li>
                <li>쿠폰은 주문 후 취소할 경우 재발급되지 않으니 사용에 유의하여 주시기 바랍니다.</li>
                <li>
                  소니스토어에서 발행하는 쿠폰은 행사 내용에 따라 기간 및 해당 제품 등 적용 방법이
                  다를 수 있습니다.
                </li>
              </ul>
            </div>
            <div className="ico_box_link ico_box_link_coupon">
              <Link className="box_link_inner ico_type5" href="/my-page/member">
                <div className="txt_box">
                  <p className="tit">마케팅 수신 동의하면 5,000원 할인!! </p>
                </div>
              </Link>
              <Link className="box_link_inner ico_type6" href="/my-page/member">
                <div className="txt_box">
                  <p className="tit">회원정보 수정하고 내 생일에 쿠폰 받자!</p>
                </div>
              </Link>
            </div>
            <div className="ico_box_link">
              <Link className="box_link_inner ico_type1" href="/membership/benefit">
                <div className="txt_box">
                  <p className="tit">소니스토어의 쿠폰 보기</p>
                  <p className="txt">첫 구매 등 소니스토어의 다양한 쿠폰 혜택을 받으세요!</p>
                </div>
              </Link>
              <a
                href="https://www.sony.co.kr/scs/handler/SCSWarranty-Start"
                target="_blank"
                rel="noopener noreferrer"
                title="새 창 열림"
                className="box_link_inner ico_type2"
              >
                <div className="txt_box">
                  <p className="tit">정품등록 관리</p>
                  <p className="txt">소니 제품 구매 후 정품등록하고 쿠폰을 받으세요!</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {variant === "b" ? (
          <div className="cont history_event" id="event-tit">
            <div className="tit_head">
              <h3 className="cont_tit">이벤트</h3>
              <div className="btn_article right">
                <Link className="button button_secondary button-s" href="/event/list?tab=all">
                  진행 중인 이벤트
                </Link>
              </div>
            </div>
            <div className="history_inner">
              <MallSlider items={SONY_EVENTS} tone="band" />
              <p className="event_sub">응모 내역</p>
              <ul className="event_list">
                {EVENTS.map((e) => (
                  <li key={e.title}>
                    <span className="event_date">{e.date}</span>
                    <span className="event_title">{e.title}</span>
                    <b className={e.status === "당첨" ? "on" : undefined}>{e.status}</b>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        {/* ── 찜 ───────────────────────────────────────────── */}
        <div className="cont history_like" id="wish-tit">
          <div className="cont_head">
            <h3 className="cont_tit">찜</h3>
            <div className="like_select_btn">
              <button className="button button_secondary button-s" type="button">
                선택 삭제
              </button>
              <button
                className="button button_positive button-s popup_comm_btn"
                type="button"
                data-popup-name="cart_pop"
              >
                <span>선택 제품</span> 장바구니 담기
              </button>
            </div>
          </div>
          <div className="history_inner">
            <div className="history_list">
              {variant === "b" ? (
                <ul className="like_list">
                  {WISH.map((w) => (
                    <li key={w.model}>
                      <label className="like_check">
                        <input type="checkbox" name="like" value={w.model} />
                        <span aria-hidden="true" />
                      </label>
                      <a href="#wish-tit" className="like_item">
                        <span className="like_thumb" aria-hidden="true">
                          {w.img ? <img src={w.img} alt="" /> : w.model}
                        </span>
                        <span className="like_model">{w.model}</span>
                        <span className="like_name">{w.name}</span>
                        <span className="like_price">{won(w.price)}<em>원</em></span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no_data on">
                  <span>내역이 없습니다.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 마일리지 조회 기간. 원본의 tui-datepicker 를 읽기전용 인풋으로 대신한다 */
function MileageInquiry() {
  const [tab, setTab] = useState(0);
  const from = fmt(monthsAgo(DATE_TABS[tab].months));
  const to = fmt(TODAY);

  return (
    <div className="mileage_inquiry">
      <div className="date_box">
        <ul className="date3_tab">
          {DATE_TABS.map((t, i) => (
            <li key={t.label} className={`tabs${i === tab ? " on" : ""}`}>
              <button type="button" className="date3_btn" onClick={() => setTab(i)}>
                {t.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="date_rang">
          <div className="date_picker_wrapper">
            <div className="tui-datepicker-input">
              <input
                type="text"
                className="view_date_input"
                readOnly
                value={from}
                aria-label="조회 시작일"
              />
              <span className="tui-ico-date" aria-hidden="true" />
            </div>
          </div>
          <span className="date_tilde">&nbsp;~&nbsp;</span>
          <div className="date_picker_wrapper">
            <div className="tui-datepicker-input">
              <input
                type="text"
                className="view_date_input"
                readOnly
                value={to}
                aria-label="조회 종료일"
              />
              <span className="tui-ico-date" aria-hidden="true" />
            </div>
          </div>
          <button className="button button_positive button-s" type="button">
            조회
          </button>
        </div>
      </div>
    </div>
  );
}

/** 쿠폰 목록. 상세(.coupon_info)는 카드 아래에 항상 보인다 */
function CouponList() {
  if (!COUPONS.length) return null;

  return (
    <div className="coupon_inner on">
      <ul className="coupon_list">
        {COUPONS.map((c) => (
          <li key={c.name}>
            <div className="coupon_item_wrap">
              <div className="coupon_item">
                <p className="coupon_price">
                  <strong>{c.price}</strong>
                  {c.unit}
                </p>
                <p className="coupon_name">{c.name}</p>
                <p className="coupon_date">유효기간 : {c.until} 까지</p>
              </div>
              <span className="coupon_icon" aria-hidden="true">
                <span>COUPON</span>
              </span>
            </div>
            <div className="coupon_info">{c.info}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
