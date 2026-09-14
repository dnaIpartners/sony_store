import {
  SOURCE, FONT_FAMILIES, BODY_DEFAULTS, TYPE_SCALE, WEIGHTS, SPACING_RULES,
  NEUTRALS, GRAYS, BRAND, SEMANTIC, SURFACES,
  RADII, SHADOWS, MOTION, LAYOUT, BREAKPOINTS, PRINCIPLES,
  type Swatch,
} from '@/src/lib/sony-guide-data';

// Sony Store KR 디자인 가이드 — 메인 랜딩.
//
// 가이드가 말하는 규칙을 가이드 자신이 지킨다: 흰 바탕, #222 제목, 14px 본문,
// 섹션 간격 120px, 1440px 폭, 각진 모서리, 그림자 없음, 1px #ddd 테두리.
// 스타일은 src/styles/design-guide.css.

const NAV = [
  ['principles', '원칙'],
  ['type', '폰트'],
  ['color', '색상'],
  ['style', '스타일'],
  ['layout', '레이아웃'],
  ['components', '컴포넌트'],
] as const;

export default function DesignGuidePage() {
  return (
    <main className="dg">
      {/* ── 머리 ─────────────────────────────────────────────── */}
      <section className="dg-hero">
        <div className="dg-inner">
          <p className="dg-eyebrow">Design Tokens</p>
          <h1 className="dg-title">Sony Store KR<br />디자인 가이드</h1>
          <p className="dg-lead">
            {SOURCE.url} 의 번들 스타일시트를 통째로 받아 선언 빈도를 세고, 그 수치로 폰트·색상·스타일 토큰을 정리했다.
            추정값은 없다. 표의 <em>사용 횟수</em>는 원본 CSS 에서 그 값이 선언된 횟수다.
          </p>
          <dl className="dg-meta">
            <div><dt>출처</dt><dd>{SOURCE.file}</dd></div>
            <div><dt>크기</dt><dd>{SOURCE.size}</dd></div>
            <div><dt>수집</dt><dd>{SOURCE.date}</dd></div>
            <div><dt>토큰</dt><dd><code>src/styles/tokens.css</code></dd></div>
          </dl>
          <nav className="dg-nav" aria-label="가이드 목차">
            {NAV.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
        </div>
      </section>

      {/* ── 원칙 ─────────────────────────────────────────────── */}
      <Section id="principles" no="01" title="시각 문법" desc="이 사이트를 이 사이트답게 만드는 일곱 가지.">
        <ol className="dg-principles">
          {PRINCIPLES.map((p, i) => (
            <li key={p.head}>
              <span className="dg-principles__no">{String(i + 1).padStart(2, '0')}</span>
              <strong>{p.head}</strong>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── 폰트 ─────────────────────────────────────────────── */}
      <Section id="type" no="02" title="폰트" desc="SST Pro 가 앞, Noto Sans KR 이 한글을 받는다. 굵기가 곧 위계다.">
        <h3 className="dg-h3">패밀리</h3>
        <table className="dg-table">
          <thead><tr><th>역할</th><th>폰트</th><th>웨이트</th><th>비고</th></tr></thead>
          <tbody>
            {FONT_FAMILIES.map((f) => (
              <tr key={f.role}><td>{f.role}</td><td><strong>{f.name}</strong></td><td>{f.weights}</td><td>{f.note}</td></tr>
            ))}
          </tbody>
        </table>

        <h3 className="dg-h3">본문 기본값</h3>
        <div className="dg-split">
          <pre className="dg-code">{`body {\n${BODY_DEFAULTS.map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}`}</pre>
          <p className="dg-sample-body">
            소니스토어는 소니코리아가 직접 운영하는 공식 온라인 스토어입니다. 카메라, 렌즈, 헤드폰, 이어폰 등
            소니의 모든 제품을 정품 보증과 함께 만나보실 수 있습니다. 14px, 행간 1.4, 자간 -0.025em, keep-all.
          </p>
        </div>

        <h3 className="dg-h3">타입 스케일</h3>
        <ul className="dg-scale">
          {TYPE_SCALE.map((t) => (
            <li key={t.token}>
              <div className="dg-scale__meta">
                <code>{t.token}</code>
                <span>{t.px}px{t.mobile ? ` → ${t.mobile}px` : ''}</span>
                <span className="dg-count">{t.count}회</span>
              </div>
              <div className="dg-scale__sample" style={{ fontSize: t.px, lineHeight: t.px >= 32 ? 1.2 : 1.4 }}>
                {t.px >= 24 ? '소니 알파 A7C II' : t.use}
              </div>
              {t.px >= 24 ? <div className="dg-scale__use">{t.use}</div> : null}
            </li>
          ))}
        </ul>

        <div className="dg-split">
          <div>
            <h3 className="dg-h3">웨이트</h3>
            <ul className="dg-weights">
              {WEIGHTS.map((w) => (
                <li key={w.weight}>
                  <span style={{ fontWeight: w.weight }}>소니스토어 {w.weight}</span>
                  <span className="dg-count">{w.count}회</span>
                  <span className="dg-muted">{w.use}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="dg-h3">행간 · 자간</h3>
            <table className="dg-table dg-table--tight">
              <tbody>
                {SPACING_RULES.map((r) => (
                  <tr key={r.prop}><td>{r.prop}</td><td><code>{r.value}</code></td><td className="dg-muted">{r.note}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ── 색상 ─────────────────────────────────────────────── */}
      <Section id="color" no="03" title="색상" desc="검정, 흰색, 그리고 소니 블루 하나. 나머지는 정보를 나르는 색이다.">
        <h3 className="dg-h3">브랜드</h3>
        <Swatches items={BRAND} large />

        <h3 className="dg-h3">그레이 <span className="dg-muted">— 실사용 하드코딩값. 빈도가 압도적이라 이쪽이 실질 정본</span></h3>
        <Swatches items={GRAYS} />

        <h3 className="dg-h3">뉴트럴 <span className="dg-muted">— 사이트가 :root 에 직접 선언한 유일한 팔레트</span></h3>
        <Swatches items={NEUTRALS} ramp />

        <h3 className="dg-h3">시맨틱</h3>
        <Swatches items={SEMANTIC} />
        <div className="dg-badges">
          <span className="dg-badge" style={{ color: '#5865f5' }}>BEST</span>
          <span className="dg-badge" style={{ color: '#e70000' }}>SALE</span>
          <span className="dg-badge" style={{ color: '#ff4e00' }}>COUPON</span>
          <span className="dg-badge" style={{ color: '#20b537' }}>NEW</span>
          <span className="dg-badge dg-badge--fill" style={{ background: '#39bfc9' }}>예약판매</span>
          <span className="dg-muted">배지는 배경 없이 글자색만 바꾼다. 채우는 것은 예약 하나.</span>
        </div>

        <h3 className="dg-h3">서피스</h3>
        <Swatches items={SURFACES} />
        <p className="dg-note">
          바탕이 세 겹이다: 흰 페이지 → #fbfbfb 섹션 → #f4f7fa 카드. 차이가 작아 테두리 없이는 경계가 안 보이고, 실제로도 대부분 1px #ddd 와 함께 쓴다.
        </p>
        <div className="dg-layers">
          <div className="dg-layers__page">page #fff
            <div className="dg-layers__section">section #fbfbfb
              <div className="dg-layers__card">card #f4f7fa + 1px #ddd</div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 스타일 ───────────────────────────────────────────── */}
      <Section id="style" no="04" title="스타일 규칙" desc="테두리 1px, 라운드 0, 그림자 없음, 0.2s.">
        <div className="dg-grid-3">
          <div>
            <h3 className="dg-h3">테두리</h3>
            <div className="dg-border-samples">
              <div style={{ border: '1px solid #ddd' }}>1px #ddd <span className="dg-count">91회</span></div>
              <div style={{ border: '1px solid #222' }}>1px #222 <span className="dg-count">53회</span></div>
              <div style={{ borderBottom: '1px solid #e1e1e1' }}>밑줄 #e1e1e1 <span className="dg-count">26회</span></div>
            </div>
          </div>
          <div>
            <h3 className="dg-h3">라운드</h3>
            <ul className="dg-radii">
              {RADII.map((r) => (
                <li key={r.token}>
                  <span className="dg-radii__box" style={{ borderRadius: r.value }} />
                  <code>{r.value}</code>
                  <span className="dg-muted">{r.use}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="dg-h3">그림자</h3>
            <ul className="dg-shadows">
              {SHADOWS.map((s) => (
                <li key={s.token}>
                  <span className="dg-shadows__box" style={{ boxShadow: s.value }} />
                  <code>{s.value}</code>
                  <span className="dg-muted">{s.use}</span>
                </li>
              ))}
            </ul>
            <h3 className="dg-h3">모션</h3>
            <ul className="dg-motion">
              {MOTION.map((m) => (
                <li key={m.token}>
                  <button type="button" className="dg-motion__box" style={{ transitionDuration: m.value }} aria-label={`${m.value} 전환 미리보기`} />
                  <code>{m.value}</code>
                  <span className="dg-muted">{m.use}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── 레이아웃 ─────────────────────────────────────────── */}
      <Section id="layout" no="05" title="레이아웃" desc="1440px 콘텐츠, 섹션 간격 120px, 세 구간.">
        <div className="dg-split">
          <table className="dg-table">
            <thead><tr><th>토큰</th><th>데스크톱</th><th>≤1280</th><th>≤640</th></tr></thead>
            <tbody>
              {LAYOUT.map((l) => (
                <tr key={l.token}>
                  <td><code>{l.token}</code>{l.note ? <span className="dg-muted"> {l.note}</span> : null}</td>
                  <td>{l.desktop}</td><td>{l.tablet || '·'}</td><td>{l.mobile || '·'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="dg-table">
            <thead><tr><th>구간</th><th>미디어쿼리</th><th>사용</th></tr></thead>
            <tbody>
              {BREAKPOINTS.map((b) => (
                <tr key={b.query}><td><strong>{b.name}</strong></td><td><code>{b.query}</code></td><td>{b.count}회</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="dg-bp">
          <div className="dg-bp__bar">
            <span style={{ flex: 640 }}>mobile ≤640</span>
            <span style={{ flex: 640 }}>tablet 641–1280</span>
            <span style={{ flex: 400 }}>desktop ≥1281</span>
          </div>
        </div>
      </Section>

      {/* ── 컴포넌트 ─────────────────────────────────────────── */}
      <Section id="components" no="06" title="컴포넌트" desc="위 토큰만으로 조립한 기본 부품.">
        <h3 className="dg-h3">버튼 <span className="dg-muted">— 높이 46 / 48 / 54 / 56 / 64, 라운드 0</span></h3>
        <div className="dg-row">
          <button type="button" className="sbtn sbtn--dark">다크 · 기본 강조</button>
          <button type="button" className="sbtn sbtn--primary">프라이머리 · 구매</button>
          <button type="button" className="sbtn sbtn--outline">아웃라인</button>
          <button type="button" className="sbtn sbtn--disabled" disabled>비활성</button>
        </div>
        <div className="dg-row">
          <button type="button" className="sbtn sbtn--dark sbtn--sm">sm 48</button>
          <button type="button" className="sbtn sbtn--dark">md 56</button>
          <button type="button" className="sbtn sbtn--primary sbtn--cta">CTA 64 · 전폭</button>
        </div>

        <h3 className="dg-h3">인풋 <span className="dg-muted">— 밑줄형. 눌러 보면 파란 밑줄이 가운데서 펼쳐진다</span></h3>
        <div className="dg-split">
          <label className="sinp">
            <input className="sinp__field" type="text" placeholder="이메일 주소" />
            <span className="sinp__focus" aria-hidden="true" />
          </label>
          <label className="sinp sinp--error">
            <input className="sinp__field" type="text" defaultValue="sony@" />
            <span className="sinp__focus" aria-hidden="true" />
            <span className="sinp__error">올바른 이메일 형식이 아닙니다.</span>
          </label>
        </div>

        <h3 className="dg-h3">제목</h3>
        <div className="dg-headings">
          <p className="s-page-title">페이지 제목 48</p>
          <p className="s-page-desc">페이지 설명 20 · #666 · margin-top 40</p>
          <p className="s-cmpnt-title">컴포넌트 제목 32 / 44</p>
        </div>

        <h3 className="dg-h3">상품 가격</h3>
        <div className="dg-price-card">
          <div className="dg-price-card__pic" />
          <div>
            <p className="dg-price-card__badges">
              <span style={{ color: '#5865f5' }}>BEST</span>
              <span style={{ color: '#e70000' }}>SALE</span>
            </p>
            <p className="dg-price-card__name">WH-1000XM5 무선 노이즈 캔슬링 헤드폰</p>
            <p className="s-price">
              <span className="s-price__original">499,000원</span>
              <span className="s-price__discount">10%</span>
              <span className="s-price__num">449,000</span><span className="s-price__unit">원</span>
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}

function Section({ id, no, title, desc, children }: { id: string; no: string; title: string; desc: string; children: React.ReactNode }) {
  return (
    <section id={id} className="dg-section">
      <div className="dg-inner">
        <header className="dg-section__head">
          <span className="dg-eyebrow">{no}</span>
          <h2 className="dg-h2">{title}</h2>
          <p className="dg-desc">{desc}</p>
        </header>
        {children}
      </div>
    </section>
  );
}

function Swatches({ items, large, ramp }: { items: Swatch[]; large?: boolean; ramp?: boolean }) {
  return (
    <ul className={`dg-swatches${large ? ' dg-swatches--large' : ''}${ramp ? ' dg-swatches--ramp' : ''}`}>
      {items.map((s) => (
        <li key={s.token}>
          <div className={`dg-swatch${s.dark ? ' dg-swatch--dark' : ''}`} style={{ background: s.hex }}>
            <span>{s.hex}</span>
          </div>
          <code>{s.token}</code>
          {s.use ? <p>{s.use}</p> : null}
          {s.count ? <span className="dg-count">{s.count}</span> : null}
        </li>
      ))}
    </ul>
  );
}
