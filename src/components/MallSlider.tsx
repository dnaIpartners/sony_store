"use client";
import { useRef } from "react";
import Link from "next/link";

// 전용몰·이벤트 카드 슬라이더. new 마이페이지(/my-sony)와 My Sony(/my)가 같이 쓴다.
// 원본의 Swiper 대신 scroll-snap. 화살표는 카드 한 장 폭만큼 민다.
// img 가 있으면 카드 위에 배너를 깐다(store.sony.co.kr/event/list 의 1920×600 배너,
// 카피가 오른쪽에 있어 오른쪽 기준으로 자른다). 스타일은 src/styles/mall-slider.css

export type Mall = { title: string; desc: string; href: string; img?: string; date?: string };

export default function MallSlider({ items, tone = "panel" }: { items: Mall[]; tone?: "panel" | "band" }) {
  const ref = useRef<HTMLUListElement>(null);
  function slide(dir: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }
  return (
    <div className={`msl msl--${tone}`}>
      <ul className="msl__track" ref={ref}>
        {items.map((m) => (
          <li key={m.href + m.title} className={`msl__card${m.img ? " msl__card--img" : ""}`}>
            <Link href={m.href}>
              {m.img ? (
                <span className="msl__img" aria-hidden="true">
                  <img src={m.img} alt="" />
                </span>
              ) : null}
              <span className="msl__body">
                <p className="msl__title">{m.title}</p>
                <p className="msl__desc">{m.desc}</p>
                {m.date ? <p className="msl__date">{m.date}</p> : null}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <button type="button" className="msl__nav msl__nav--prev" aria-label="이전" onClick={() => slide(-1)} />
      <button type="button" className="msl__nav msl__nav--next" aria-label="다음" onClick={() => slide(1)} />
    </div>
  );
}
