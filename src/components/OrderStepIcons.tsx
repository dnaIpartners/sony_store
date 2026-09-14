// 주문/배송 단계 픽토그램 5종. 24px 그리드, 1.5px 선, currentColor.
//   입금대기: 지폐 + 시계 / 결제완료: 카드 + 체크 / 배송준비: 상자
//   배송중: 트럭 / 배송완료: 집 + 체크

const base = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function IconDeposit(props: { className?: string }) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="13" width="30" height="20" rx="2" />
      <circle cx="20" cy="23" r="5" />
      <path d="M9 17h2M29 29h2" />
      <circle cx="36" cy="33" r="8" fill="var(--ms-panel-bg, #fff)" />
      <path d="M36 28.5V33l3 2" />
    </svg>
  );
}

export function IconPaid(props: { className?: string }) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="12" width="34" height="22" rx="2" />
      <path d="M5 19h34" />
      <path d="M10 27h8" />
      <circle cx="36" cy="33" r="8" fill="var(--ms-panel-bg, #fff)" />
      <path d="m32.5 33 2.5 2.5 4.5-5" />
    </svg>
  );
}

export function IconPacking(props: { className?: string }) {
  return (
    <svg {...base} {...props}>
      <path d="M24 8 8 15v18l16 7 16-7V15L24 8Z" />
      <path d="M8 15l16 7 16-7M24 22v18" />
      <path d="M16 11.5 32 18.5" />
    </svg>
  );
}

export function IconShipping(props: { className?: string }) {
  return (
    <svg {...base} {...props}>
      <path d="M4 13h24v19H4z" />
      <path d="M28 19h8l6 6v7h-14" />
      <circle cx="12" cy="34" r="3.5" fill="var(--ms-panel-bg, #fff)" />
      <circle cx="34" cy="34" r="3.5" fill="var(--ms-panel-bg, #fff)" />
      <path d="M31 25h8" />
    </svg>
  );
}

export function IconDelivered(props: { className?: string }) {
  return (
    <svg {...base} {...props}>
      <path d="M8 22 24 9l16 13" />
      <path d="M12 19v18h24V19" />
      <path d="M20 37V27h8v10" />
      <circle cx="37" cy="33" r="8" fill="var(--ms-panel-bg, #fff)" />
      <path d="m33.5 33 2.5 2.5 4.5-5" />
    </svg>
  );
}
