'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Sony Store KR 푸터 + 플로팅 사이드바.
//
// 마크업과 클래스 이름은 store.sony.co.kr 의 <div class="footer"> 를 그대로
// 옮겼다. 스타일은 src/styles/sony-layout.css.
//
// 원본 동작 셋:
//   · ≤640 에서 카테고리 제목을 누르면 목록이 접히고 펴진다
//   · Sony Family 버튼을 누르면 위로 팝오버가 뜬다
//   · 사이드바(카톡 상담 · 맨 위로)는 스크롤하면 나타나고(sidebar--visible),
//     푸터가 화면에 들어오면 푸터 안에 absolute 로 앉는다(sidebar--reachend)

type FooterLink = { href: string; label: string; external?: boolean };

const CATEGORIES: { title: string; links: FooterLink[] }[] = [
  {
    title: '카메라&렌즈',
    links: [
      { href: '/products/camera/ilc', label: '렌즈교환식 카메라' },
      { href: '/products/camera/compact', label: '컴팩트 카메라' },
      { href: '/products/videocamera', label: '비디오 카메라' },
      { href: '/products/lens/felens', label: '풀프레임 렌즈' },
      { href: '/products/lens/apsc', label: 'APS-C 렌즈' },
    ],
  },
  {
    title: '오디오',
    links: [
      { href: '/products/audio/headphone', label: '헤드폰' },
      { href: '/products/audio/wireless_earphones', label: '무선 이어폰' },
      { href: '/products/audio/wired_earphone', label: '유선 이어폰' },
      { href: '/products/audio/speaker', label: '블루투스 스피커' },
      { href: '/products/audio/walkman', label: '워크맨' },
      { href: '/products/audio/recorder', label: '녹음기' },
    ],
  },
  {
    title: '기기 및 액세서리',
    links: [
      { href: '/products/gaming', label: '게이밍' },
      { href: '/products/reon', label: '레온 포켓' },
      { href: '/products/accessory/camera', label: '카메라 액세서리' },
      { href: '/products/accessory/lens', label: '렌즈 액세서리' },
      { href: '/products/accessory/audio', label: '오디오 액세서리' },
      { href: '/products/accessory/self_repair', label: '셀프수리키트' },
    ],
  },
  {
    title: '고객지원',
    links: [
      { href: '/membership/benefit', label: '소니스토어 멤버십' },
      { href: 'https://www.sony.co.kr/scs/handler/SCSWarranty-Start?asa=Sa', label: '정품등록 안내 ', external: true },
      { href: 'https://www.sony.co.kr/electronics/support', label: '제품지원', external: true },
      { href: '/agreement', label: '기업구매상담' },
      { href: 'https://www.sony.co.kr/electronics/support/manuals', label: '제품 매뉴얼 다운로드', external: true },
      { href: 'https://support.d-imaging.sony.co.jp/www/cscs/accessories/top.php?area=ap&lang=ko', label: '액세서리 호환성 보기', external: true },
      { href: '/store-info', label: '직영점 안내 ' },
      { href: '/faq', label: 'FAQ&공지사항' },
    ],
  },
];

const SOCIAL = [
  { href: 'https://www.instagram.com/sonykorea', icon: 'ic_instagram', alt: 'instagram' },
  { href: 'https://www.youtube.com/user/sonystyleblog', icon: 'ic_youtube', alt: 'youtube' },
  { href: 'https://www.facebook.com/sonykorea', icon: 'ic_facebook', alt: 'facebook' },
  { href: 'https://stylezineblog.com/?intcmp=Main_Blog', icon: 'ic_blog', alt: 'blog' },
];

const FAMILY: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Sony Family',
    links: [
      { href: 'https://www.sony.co.kr/', label: '소니코리아' },
      { href: 'https://www.sony.co.kr/electronics/support', label: '소니코리아 고객지원' },
      { href: 'https://www.sony.co.kr/alpha/handler/NAlpha-Main', label: '소니 알파' },
      { href: 'https://pro.sony/ko_KR/', label: '소니 방송/업무용 솔루션' },
      { href: 'https://pro.sony/ko_KR/support-services', label: '소니 방송 업무용 솔루션 고객지원' },
    ],
  },
  {
    title: 'Family Company',
    links: [
      { href: 'https://www.playstation.com/ko-kr/corporate/about-us/', label: '소니 인터랙티브 엔터테인먼트 코리아' },
      { href: 'https://www.sonymusic.co.kr/', label: '소니 뮤직 엔터테인먼트 코리아' },
      { href: 'https://www.sonymusicpub.com/en', label: '소니 ATV 뮤직 퍼블리싱 코리아' },
      { href: 'https://www.facebook.com/Sonypictureskr', label: '소니 픽쳐스 엔터테인먼트 코리아' },
      { href: 'https://www.sonypicturestelevision.com/', label: '소니 픽쳐스 텔레비전 코리아' },
    ],
  },
];

function A({ link, children }: { link: FooterLink; children?: React.ReactNode }) {
  const label = children ?? link.label;
  return link.external || link.href.startsWith('http') ? (
    <a href={link.href}>{label}</a>
  ) : (
    <Link href={link.href}>{label}</Link>
  );
}

export default function SonyFooter() {
  const [openCat, setOpenCat] = useState<number | null>(null);
  const [familyOpen, setFamilyOpen] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const [sidebar, setSidebar] = useState<'hidden' | 'visible' | 'reachend'>('hidden');

  useEffect(() => {
    let raf = 0;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const top = footerRef.current?.getBoundingClientRect().top ?? Infinity;
        if (top < window.innerHeight - 24) setSidebar('reachend');
        else setSidebar(y > 200 ? 'visible' : 'hidden');
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // 팝오버는 바깥을 누르면 닫힌다
  useEffect(() => {
    if (!familyOpen) return;
    function close(e: MouseEvent) {
      if (!(e.target as Element).closest('.sitemap__family')) setFamilyOpen(false);
    }
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [familyOpen]);

  const sidebarClass =
    sidebar === 'reachend' ? 'sidebar sidebar--active sidebar--reachend'
    : sidebar === 'visible' ? 'sidebar sidebar--active sidebar--visible'
    : 'sidebar';

  return (
    <div ref={footerRef} className="footer">
      <nav className={sidebarClass}>
        <div className="sidebar__inner">
          <a href="#" className="sidebar__btn sidebar__btn__link kakao" onClick={(e) => e.preventDefault()}>
            <em>카톡 상담 - 레이어 팝업</em>
            <span>카톡 상담</span>
          </a>
          <a
            href="#header"
            className="sidebar__btn top"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <span>페이지 상단</span>
          </a>
        </div>
      </nav>

      <div className="footer__inner">
        <div className="footer__logo">
          <img src="/asset/sony/logo_footer.svg" alt="SONY" />
        </div>

        <div className="footer__sitemap">
          <div className="sitemap__category grid">
            {CATEGORIES.map((cat, i) => {
              const open = openCat === i;
              return (
                <div key={cat.title} className="category__item">
                  <div
                    className={`category__title${open ? ' open' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-expanded={open}
                    onClick={() => setOpenCat(open ? null : i)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenCat(open ? null : i); } }}
                  >
                    <span>{cat.title}</span>
                  </div>
                  <div className={`category__item__wrapper${open ? ' open' : ''}`}>
                    <ul className="category__list">
                      {cat.links.map((l) => (
                        <li key={l.href} className="list__item"><A link={l} /></li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sitemap__wrap">
            <ul className="sitemap__social">
              {SOCIAL.map((s) => (
                <li key={s.icon} className="social__item">
                  <a href={s.href}><img src={`/asset/sony/${s.icon}.svg`} alt={s.alt} /></a>
                </li>
              ))}
            </ul>

            <div className="sitemap__family">
              <div className={`sitemap__family__popover${familyOpen ? ' open' : ''}`}>
                {FAMILY.map((g) => (
                  <div key={g.title} className="sitemap__family__popover__item">
                    <h4>{g.title}</h4>
                    <ul>
                      {g.links.map((l) => (
                        <li key={l.href}><a href={l.href}>{l.label}</a></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <button type="button" aria-expanded={familyOpen} onClick={() => setFamilyOpen((v) => !v)}>
                Sony Family
              </button>
            </div>

            <div className="sitemap__global">
              <a href="https://www.sony.com/">Sony Global</a>
            </div>
          </div>
        </div>

        <div className="divider" />

        <div className="footer__bottom">
          <div className="footer__business">
            <ul className="business__policy">
              <li className="policy__item"><Link href="/footer/terms">이용약관</Link></li>
              <li className="policy__item">
                <a href="https://www.sony.co.kr/handler/ProductInfo-Start?PageName=jsp/footer/CF_policy.jsp"><strong>개인정보처리방침</strong></a>
              </li>
              <li className="policy__item"><button type="button">소비자 피해 보상보험</button></li>
              <li className="policy__item"><Link href="/footer/sitemap">사이트맵</Link></li>
            </ul>

            <div className="business__terms">
              <p>본 사이트의 컨텐츠는 저작권법의 보호를 받는 바, 상업적 목적의 무단전재, 복사, 배포 등을 금합니다.</p>
              <p><strong>소비자 피해 보상보험</strong> 고객님은 안전거래를 위해 현금 등으로 결제 시 저희 쇼핑몰에서 가입한 구매안전서비스를 이용하실 수 있습니다.</p>
              <div className="terms__link">
                <a href="https://www.sgic.co.kr/biz/ccp/index.html?p=CCPPRD060501F01">서비스 가입 사실 확인</a>
                <a href="https://www.sgic.co.kr/biz/ccp/index.html?p=CCPPRD060501F01">구매상품 보험가입 확인</a>
              </div>
            </div>

            <div className="business__info">
              <div>
                <span className="info__item">사업장주소 : 서울특별시 영등포구 국제금융로 10 투아이에프씨 28F</span>
                <span className="info__item">사업자 등록번호 : 106-81-23810</span>
                <span className="info__item">통신판매번호 : 2012-서울영등포-1038 소니코리아㈜</span>
              </div>
              <div className="info__ceo">
                <span className="info__item">대표이사 : KITAJIMA YUKIHIRO</span>
                <span className="info__item">개인정보보호책임자 : KITAJIMA YUKIHIRO</span>
                <span className="info__item">TEL : 소니코리아 고객센터 1588-0911</span>
              </div>
            </div>

            <div className="business__copy">
              <p>Copyright © Sony Korea Corporation.<br className="is-mo" /> All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
