"use client";
import { useState } from "react";
import Link from "next/link";

// Sony Store KR 마이페이지.
//
// 마크업과 클래스 이름은 store.sony.co.kr/my-page 의 <div class="my_wrap"> 를
// 그대로 옮겼다. 스타일은 src/styles/my-page.css 에 있다.
//
// 원본이 라이브러리로 하던 것은 직접 만든다:
//   · tui-datepicker → 읽기전용 인풋. 3개월/6개월/1년 탭이 기간을 채운다
//   · 쿠폰 상세 펼침(.coupon_info) → li 에 .on 을 붙였다 뗐다 한다
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
const ORDER_STEPS = ["입금대기", "결제완료", "배송준비", "배송중", "배송완료"].map(
  (label, i) => ({ step: i + 1, label, count: 0 }),
);

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

export default function MyPage() {
  return (
    <div className="my_wrap">
      {/* ── 머리: 제목 + 회원 요약 ─────────────────────────── */}
      <div className="my_head">
        <h2 className="title">마이페이지</h2>
        <div className="my_user">
          <div className="user_profile">
            <p className="user_name">
              <span className="name">{USER.name}</span>님 안녕하세요 :)
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
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

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

        {/* ── 마일리지 ─────────────────────────────────────── */}
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
              <div className="no_data on">
                <span>내역이 없습니다.</span>
              </div>
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

/** 쿠폰 목록. 아이콘을 누르면 .coupon_info 가 펼쳐진다 */
function CouponList() {
  const [open, setOpen] = useState<number | null>(null);
  if (!COUPONS.length) return null;

  return (
    <div className="coupon_inner on">
      <ul className="coupon_list">
        {COUPONS.map((c, i) => {
          const isOpen = open === i;
          return (
            <li key={c.name} className={isOpen ? "on" : undefined}>
              <div className="coupon_item_wrap">
                <div className="coupon_item">
                  <p className="coupon_price">
                    <strong>{c.price}</strong>
                    {c.unit}
                  </p>
                  <p className="coupon_name">{c.name}</p>
                  <p className="coupon_date">유효기간 : {c.until} 까지</p>
                </div>
                <button
                  type="button"
                  className={`coupon_icon ${isOpen ? "icon_up" : "icon_down"}`}
                  aria-expanded={isOpen}
                  aria-label={isOpen ? "쿠폰 상세 접기" : "쿠폰 상세 보기"}
                  onClick={() => setOpen(isOpen ? null : i)}
                />
              </div>
              <div className="coupon_info" hidden={!isOpen}>
                {c.info}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
