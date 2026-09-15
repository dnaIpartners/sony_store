"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Sony Store KR 헤더(GNB).
//
// 마크업과 클래스 이름은 store.sony.co.kr 의 <nav class="header__inner"> 를
// 그대로 옮겼다. 스타일은 src/styles/sony-layout.css 에 있다.
//
// 원본이 Swiper 로 하던 두 가지는 직접 만든다:
//   · 검색창 키워드 세로 롤링 — 22px 씩 위로 밀고, 마지막 뒤에 첫 항목을 한 번
//     더 붙여 되감김 없이 이어지게 한다
//   · 탭 가로 스크롤 — overflow-x: auto
//
// 스크롤을 내리면 숨고(header--invisible) 올리면 다시 나온다.
// 마이페이지 계열(/my*)에서는 숨기지 않고 늘 고정한다 — 고정 탭·메뉴가 헤더
// 바로 아래 붙어 있어서 헤더가 움직이면 화면이 어색해진다.

const SEARCH_KEYWORDS = [
  "헤드폰",
  "이어폰",
  "ILCE-7CM2",
  "SEL70200GM2",
  "WH-1000XM5",
  "ILCE-6400",
  "셀프수리키트",
];

const ACTION_LINKS = [
  { key: "myPage", href: "/my-page", icon: "ic_mypage", label: "마이페이지" },
  {
    key: "myPage",
    href: "/my-sony",
    icon: "ic_mypage",
    label: "new 마이페이지",
  },
  { key: "myPageB", href: "/my-page-b", icon: "ic_mypage", label: "마이페이지 B" },
  {
    key: "myAll",
    href: "/my",
    icon: "ic_myall",
    label: "통합 마이페이지",
  },
  {
    key: "myPersonal",
    href: "/my-personal",
    icon: "ic_mypersonal",
    label: "개인화 마이페이지",
  },
  {
    key: "order",
    href: "/my-page/order-list",
    icon: "ic_order",
    label: "주문/배송",
  },
  {
    key: "coupon",
    href: "/my-page#coupon",
    icon: "ic_coupon",
    label: "쿠폰",
    count: 2,
  },
  { key: "cart", href: "/cart", icon: "ic_cart", label: "장바구니", count: 0 },
  { key: "logout", href: "/logout", icon: "ic_logout", label: "로그아웃" },
] as const;

const TABS: {
  href: string;
  label: string;
  active?: boolean;
  external?: boolean;
}[] = [
  {
    href: "https://store.sony.co.kr/event/detail/79103",
    label: "NEW! 공식 굿즈 ",
    active: true,
  },
  {
    href: "https://store.sony.co.kr/event/list?tab=all",
    label: "기획전",
    active: true,
  },
  {
    href: "https://store.sony.co.kr/event/detail/37763",
    label: "교육할인",
    active: true,
  },
  { href: "https://store.sony.co.kr/mysonycare", label: "My Sony Care" },
  {
    href: "https://www.sony.co.kr/alpha/handler/NAlphaPros-SIPSMain",
    label: "SIPS",
    external: true,
  },
  {
    href: "https://www.sony.co.kr/scs/handler/SCSWarranty-Start?asa=Sa",
    label: "정품등록 안내",
    external: true,
  },
  { href: "/store-info", label: "직영점 안내", active: true },
  { href: "/agreement", label: "기업구매" },
  {
    href: "https://www.sony.co.kr/alpha/handler/NAlphaAcademy-OfflineList?classMonth=202609",
    label: "알파아카데미",
    active: true,
    external: true,
  },
];

const SLIDE_HEIGHT = 22;
const ROLL_INTERVAL = 3000;
const ROLL_DURATION = 300;

export default function SonyHeader() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();
  const pinned = pathname === "/my" || pathname.startsWith("/my-") || pathname.startsWith("/my/");

  // 내리면 숨기고 올리면 보인다. 맨 위 근처에서는 늘 보인다. 마이페이지는 고정
  useEffect(() => {
    if (pinned) {
      setHidden(false);
      return;
    }
    let raf = 0;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setHidden(y > 150 && y > lastY.current);
        lastY.current = y;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pinned]);

  return (
    <div
      id="header"
      className={`header${hidden ? " header--invisible" : ""}${menuOpen ? " active" : ""}`}
    >
      <nav className="header__inner">
        <ul className="header__util">
          <li className="util__link">
            <Link href="/store-info">매장안내</Link>
          </li>
        </ul>

        <div className="header__main">
          <h1 className="header__main-logo">
            <Link href="/">
              <img src="/asset/sony/logo.svg" alt="SONY" />
            </Link>
          </h1>

          <div className="header__main-bar">
            <div className="menu__list">
              <button
                type="button"
                className="menu__list-menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <img src="/asset/sony/ic_menu.svg" alt="메뉴 토글" />
                <span>제품</span>
              </button>
              <button type="button" className="menu__list-support">
                고객지원
              </button>
            </div>

            <div className="header__action">
              <div className="action__search">
                <button type="button" className="search_btn">
                  <div className="search_wrap">
                    <KeywordRoller items={SEARCH_KEYWORDS} />
                  </div>
                  {/* 원본 JS: isPc ? ic_search_bk : ic_search — PC 는 흰 알약 안의
                      검정 아이콘, 1280 이하는 검은 바 위의 흰 아이콘 */}
                  <img
                    className="search_icon search_icon--pc"
                    src="/asset/sony/ic_search_bk.svg"
                    alt="검색"
                  />
                  <img
                    className="search_icon search_icon--mo"
                    src="/asset/sony/ic_search.svg"
                    alt=""
                    aria-hidden="true"
                  />
                </button>
              </div>

              <ul className="action__links">
                {ACTION_LINKS.map((l) => (
                  <li key={l.label} className={`action__link ${l.key}`}>
                    <Link className="link" href={l.href}>
                      <img src={`/asset/sony/${l.icon}.svg`} alt={l.label} />
                      <span>{l.label}</span>
                    </Link>
                    {"count" in l ? (
                      <span className="cart-count">{l.count}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="header__tab">
          <div className="swiper-container">
            <ul className="swiper-wrapper">
              {TABS.map((t) => (
                <li key={t.href} className="swiper-slide">
                  <div className={`tab__link${t.active ? " active" : ""}`}>
                    {t.external ? (
                      <a
                        href={t.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.label}
                      </a>
                    ) : (
                      <Link href={t.href}>{t.label}</Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

/** 검색창 안의 키워드 롤러. 원본의 세로 Swiper(loop) 를 대신한다 */
function KeywordRoller({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setAnimate(true);
      setIndex((i) => i + 1);
    }, ROLL_INTERVAL);
    return () => clearInterval(id);
  }, []);

  // 복제한 마지막 칸(= 첫 항목)에 닿으면 전환 없이 0 으로 되돌린다
  useEffect(() => {
    if (index !== items.length) return;
    const id = setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, ROLL_DURATION);
    return () => clearTimeout(id);
  }, [index, items.length]);

  return (
    <div className="swiper-container" aria-hidden="true">
      <div
        className="swiper-wrapper"
        style={{
          transform: `translate3d(0, -${index * SLIDE_HEIGHT}px, 0)`,
          transitionDuration: animate ? `${ROLL_DURATION}ms` : "0ms",
          transitionProperty: "transform",
        }}
      >
        {[...items, items[0]].map((kw, i) => (
          <div key={i} className="swiper-slide slider_box">
            <span> {kw}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
