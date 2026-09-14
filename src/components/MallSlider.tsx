"use client";
import { useRef } from "react";
import Link from "next/link";

// 전용몰·이벤트 카드 슬라이더. new 마이페이지(/my-sony)와 My Sony(/my)가 같이 쓴다.
// 원본의 Swiper 대신 scroll-snap. 화살표는 카드 한 장 폭만큼 민다.
// 스타일은 src/styles/mall-slider.css

export type Mall = { title: string; desc: string; href: string };

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
          <li key={m.title} className="msl__card">
            <Link href={m.href}>
              <p className="msl__title">{m.title}</p>
              <p className="msl__desc">{m.desc}</p>
            </Link>
          </li>
        ))}
      </ul>
      <button type="button" className="msl__nav msl__nav--prev" aria-label="이전" onClick={() => slide(-1)} />
      <button type="button" className="msl__nav msl__nav--next" aria-label="다음" onClick={() => slide(1)} />
    </div>
  );
}
