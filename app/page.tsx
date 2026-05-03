// @ts-nocheck
'use client';
import { useEffect, useState } from 'react';
import { siteData } from '@/lib/site-data';

const css = `
  :root {
    --co-bg: #FAFAF8;
    --co-surface: #F3F2EF;
    --co-card: #FFFFFF;
    --co-primary: #607D8B;
    --co-dark: #37474F;
    --co-accent: #B0BEC5;
    --co-text: #2C3338;
    --co-muted: #90A4AE;
    --co-border: rgba(96,125,139,0.18);
    --font-display: var(--font-libre), 'Libre Baskerville', serif;
    --font-body: var(--font-source), 'Source Sans 3', sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); background: var(--co-bg); color: var(--co-text); overflow-x: hidden; }

  /* NAV */
  .co-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2.5rem; height: 68px;
    transition: background 0.3s, box-shadow 0.3s;
  }
  .co-nav.scrolled { background: rgba(250,250,248,0.97); backdrop-filter: blur(12px); box-shadow: 0 1px 0 var(--co-border); }
  .co-logo { font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; color: var(--co-text); text-decoration: none; letter-spacing: 0.02em; }
  .co-logo em { color: var(--co-primary); font-style: italic; }
  .co-nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .co-nav-links a { font-size: 0.78rem; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; color: var(--co-muted); text-decoration: none; transition: color 0.2s; }
  .co-nav-links a:hover { color: var(--co-primary); }
  .co-nav-cta { background: var(--co-primary); color: #fff; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em; border: none; padding: 0.65rem 1.5rem; cursor: pointer; transition: background 0.2s; }
  .co-nav-cta:hover { background: var(--co-dark); }

  /* HERO */
  .co-hero { position: relative; min-height: 100vh; display: flex; align-items: center; overflow: hidden; }
  .co-hero-bg {
    position: absolute; inset: 0;
    background: url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80') center/cover no-repeat;
  }
  .co-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(250,250,248,0.95) 0%, rgba(250,250,248,0.75) 55%, rgba(250,250,248,0.3) 100%); }
  .co-hero-content { position: relative; z-index: 2; padding: 6rem 2.5rem 4rem; max-width: 620px; }
  .co-hero-eyebrow { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--co-primary); margin-bottom: 1.25rem; }
  .co-hero-title { font-family: var(--font-display); font-size: clamp(2.8rem, 7.5vw, 6rem); font-weight: 700; font-style: italic; line-height: 1.05; color: var(--co-text); margin-bottom: 1.5rem; }
  .co-hero-title span { color: var(--co-primary); font-style: normal; }
  .co-hero-sub { font-size: 1.05rem; font-weight: 300; color: rgba(44,51,56,0.6); line-height: 1.75; max-width: 420px; margin-bottom: 2.5rem; }
  .co-hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
  .co-btn-primary { background: var(--co-primary); color: #fff; font-size: 0.82rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; border: none; padding: 1rem 2.5rem; cursor: pointer; transition: background 0.2s; }
  .co-btn-primary:hover { background: var(--co-dark); }
  .co-btn-ghost { background: transparent; color: var(--co-text); font-size: 0.82rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; border: 1px solid rgba(44,51,56,0.2); padding: 1rem 2rem; cursor: pointer; transition: border-color 0.2s; }
  .co-btn-ghost:hover { border-color: var(--co-primary); color: var(--co-primary); }

  /* STATS */
  .co-stats { display: grid; grid-template-columns: repeat(4,1fr); background: var(--co-dark); }
  .co-stat { padding: 1.75rem 1.5rem; text-align: center; border-right: 1px solid rgba(255,255,255,0.08); }
  .co-stat:last-child { border-right: none; }
  .co-stat-value { font-family: var(--font-display); font-size: clamp(1.6rem, 3.5vw, 2.2rem); font-weight: 700; color: var(--co-accent); }
  .co-stat-label { font-size: 0.62rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(176,190,197,0.5); margin-top: 0.25rem; }

  /* SECTION */
  .co-section { padding: 5.5rem 2.5rem; max-width: 1200px; margin: 0 auto; }
  .co-section-tinted { background: var(--co-surface); padding: 5.5rem 0; }
  .co-section-tinted-inner { max-width: 1200px; margin: 0 auto; padding: 0 2.5rem; }
  .co-eyebrow { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--co-primary); margin-bottom: 0.6rem; }
  .co-heading { font-family: var(--font-display); font-size: clamp(2.2rem, 5.5vw, 4.5rem); font-weight: 700; font-style: italic; color: var(--co-text); line-height: 1.05; margin-bottom: 1rem; }
  .co-heading span { color: var(--co-primary); font-style: normal; }
  .co-body { font-size: 0.95rem; font-weight: 300; color: rgba(44,51,56,0.55); line-height: 1.75; max-width: 500px; }

  /* CLASSES */
  .co-classes { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 3.5rem; }
  .co-class { background: var(--co-card); border: 1px solid var(--co-border); padding: 2rem 1.75rem; transition: box-shadow 0.25s, border-color 0.25s; }
  .co-class:hover { box-shadow: 0 6px 24px rgba(96,125,139,0.1); border-color: var(--co-primary); }
  .co-class-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.75rem; }
  .co-class-name { font-family: var(--font-display); font-size: 1.05rem; font-weight: 700; color: var(--co-text); }
  .co-class-badges { display: flex; flex-direction: column; align-items: flex-end; gap: 0.3rem; flex-shrink: 0; }
  .co-badge { font-size: 0.6rem; font-weight: 600; letter-spacing: 0.06em; background: rgba(96,125,139,0.1); color: var(--co-primary); padding: 0.18rem 0.6rem; }
  .co-class-desc { font-size: 0.82rem; font-weight: 300; color: rgba(44,51,56,0.5); line-height: 1.7; }

  /* PRINCIPLES */
  .co-principles { display: grid; grid-template-columns: repeat(2,1fr); gap: 2rem; margin-top: 3.5rem; }
  .co-principle { border-left: 2px solid var(--co-primary); padding-left: 1.5rem; }
  .co-principle-name { font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; font-style: italic; color: var(--co-text); margin-bottom: 0.4rem; }
  .co-principle-desc { font-size: 0.85rem; font-weight: 300; color: rgba(44,51,56,0.5); line-height: 1.7; }

  /* PRICING */
  .co-pricing { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 3.5rem; }
  .co-plan { border: 1px solid var(--co-border); padding: 2.5rem 2rem; position: relative; background: var(--co-card); transition: border-color 0.3s; }
  .co-plan:hover { border-color: var(--co-primary); }
  .co-plan.featured { border-color: var(--co-primary); border-width: 2px; }
  .co-plan-badge { position: absolute; top: 0; right: 0; background: var(--co-primary); color: #fff; font-size: 0.6rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.28rem 0.8rem; }
  .co-plan-name { font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; font-style: italic; color: var(--co-text); margin-bottom: 0.75rem; margin-top: 0.5rem; }
  .co-plan-price { font-family: var(--font-display); font-size: 3.2rem; font-weight: 700; color: var(--co-primary); line-height: 1; }
  .co-plan-period { font-size: 0.72rem; color: var(--co-muted); margin-bottom: 1.5rem; }
  .co-plan-features { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 2rem; }
  .co-plan-features li { font-size: 0.85rem; font-weight: 300; color: rgba(44,51,56,0.6); display: flex; gap: 0.6rem; }
  .co-plan-features li::before { content: '—'; color: var(--co-primary); }
  .co-btn-plan { width: 100%; background: var(--co-primary); color: #fff; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; border: none; padding: 0.9rem; cursor: pointer; transition: background 0.2s; }
  .co-btn-plan:hover { background: var(--co-dark); }
  .co-btn-plan.outline { background: transparent; color: var(--co-primary); border: 1px solid var(--co-primary); }
  .co-btn-plan.outline:hover { background: var(--co-primary); color: #fff; }

  /* CTA */
  .co-cta { background: var(--co-dark); padding: 6rem 2.5rem; text-align: center; }
  .co-cta-title { font-family: var(--font-display); font-size: clamp(2.5rem, 6.5vw, 5.5rem); font-weight: 700; font-style: italic; color: #fff; line-height: 1.05; margin-bottom: 1.25rem; }
  .co-cta-title em { color: var(--co-accent); font-style: normal; }
  .co-cta-sub { font-size: 1rem; font-weight: 300; color: rgba(255,255,255,0.5); margin-bottom: 2.75rem; }
  .co-btn-white { background: #fff; color: var(--co-dark); font-size: 0.82rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; border: none; padding: 1.1rem 3rem; cursor: pointer; transition: opacity 0.2s; }
  .co-btn-white:hover { opacity: 0.9; }

  /* FOOTER */
  .co-footer { background: var(--co-surface); padding: 3rem 2.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem; border-top: 1px solid var(--co-border); }
  .co-footer-logo { font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; font-style: italic; color: var(--co-text); }
  .co-footer-logo em { color: var(--co-primary); font-style: italic; }
  .co-footer-info { font-size: 0.75rem; font-weight: 300; color: var(--co-muted); line-height: 1.65; margin-top: 0.35rem; }
  .co-footer-copy { font-size: 0.7rem; color: rgba(144,164,174,0.45); }

  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: none; }

  @media (max-width: 768px) {
    .co-nav-links { display: none; }
    .co-stats { grid-template-columns: repeat(2,1fr); }
    .co-principles { grid-template-columns: 1fr; }
    .co-footer { flex-direction: column; text-align: center; }
  }
`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((e) => {
      e.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('visible'); io.unobserve(x.target); } });
    }, { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function CorePage() {
  const [scrolled, setScrolled] = useState(false);
  useReveal();
  const d = siteData;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <style>{css}</style>

      <nav className={`co-nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="co-logo">Core<em> Method</em></a>
        <ul className="co-nav-links">
          <li><a href="#classes">Classes</a></li>
          <li><a href="#method">The Method</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
        <button className="co-nav-cta">Book Intro Class</button>
      </nav>

      {/* HERO — photo */}
      <section className="co-hero">
        <div className="co-hero-bg" />
        <div className="co-hero-overlay" />
        <div className="co-hero-content">
          <p data-cg-el="hero_eyebrow" className="co-hero-eyebrow">{d.gym.location} · Precision Pilates</p>
          <h1 data-cg-el="hero_headline_1" className="co-hero-title">
            Movement,<br /><em>with</em><br /><span>intention.</span>
          </h1>
          <p data-cg-el="hero_subtitle" className="co-hero-sub">San Francisco's premier Pilates studio. Reformer, mat, and tower classes taught with clinical precision and genuine care for your body.</p>
          <div className="co-hero-actions">
            <button data-cg-el="hero_cta_primary" className="co-btn-primary">Book Intro Class</button>
            <button data-cg-el="hero_cta_secondary" className="co-btn-ghost">View Classes</button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="co-stats">
        {d.stats.map((s) => (
          <div key={s.label} className="co-stat">
            <div className="co-stat-value">{s.value}</div>
            <div className="co-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* CLASSES */}
      <section className="co-section" id="classes">
        <p className="co-eyebrow reveal">Our Classes</p>
        <h2 className="co-heading reveal" style={{ transitionDelay: '0.1s' }}>Find your<br /><span>practice.</span></h2>
        <p className="co-body reveal" style={{ transitionDelay: '0.2s' }}>Every class is taught by a certified instructor, capped for individual attention, and designed for real progression.</p>
        <div className="co-classes">
          {d.classes.map((c, i) => (
            <div key={c.name} className="co-class reveal" style={{ transitionDelay: `${0.08 * i}s` }}>
              <div className="co-class-header">
                <span className="co-class-name">{c.name}</span>
                <div className="co-class-badges">
                  <span className="co-badge">{c.duration}</span>
                  <span className="co-badge">{c.level}</span>
                </div>
              </div>
              <p className="co-class-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRINCIPLES */}
      <div className="co-section-tinted" id="method">
        <div className="co-section-tinted-inner">
          <p className="co-eyebrow reveal">The Pilates Principles</p>
          <h2 className="co-heading reveal" style={{ transitionDelay: '0.1s' }}>Why Pilates<br /><span>works.</span></h2>
          <p className="co-body reveal" style={{ transitionDelay: '0.2s' }}>Joseph Pilates developed these principles in the early 20th century. We teach them with the same rigour today.</p>
          <div className="co-principles">
            {d.principles.map((p, i) => (
              <div key={p.name} className="co-principle reveal" style={{ transitionDelay: `${0.1 * i}s` }}>
                <div className="co-principle-name">{p.name}</div>
                <p className="co-principle-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRICING */}
      <section className="co-section" id="pricing">
        <p className="co-eyebrow reveal">Membership</p>
        <h2 className="co-heading reveal" style={{ transitionDelay: '0.1s' }}>Simple,<br /><span>clear pricing.</span></h2>
        <div className="co-pricing">
          {d.pricing.map((p, i) => (
            <div key={p.name} className={`co-plan reveal ${p.highlight ? 'featured' : ''}`} style={{ transitionDelay: `${0.1 * i}s` }}>
              {p.highlight && <div className="co-plan-badge">Best Value</div>}
              <div className="co-plan-name">{p.name}</div>
              <div className="co-plan-price">{p.price}</div>
              <div className="co-plan-period">{p.period}</div>
              <ul className="co-plan-features">
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <button className={`co-btn-plan ${p.highlight ? '' : 'outline'}`}>Get Started</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="co-cta">
        <h2 className="co-cta-title">Begin your<br /><em>practice.</em></h2>
        <p className="co-cta-sub">Intro class is complimentary. No experience required — just come as you are.</p>
        <button className="co-btn-white">Reserve Free Intro Class</button>
      </div>

      {/* FOOTER */}
      <footer className="co-footer">
        <div>
          <div className="co-footer-logo">Core<em> Method</em></div>
          <div className="co-footer-info">{d.gym.address}<br />{d.gym.phone} · {d.gym.email}</div>
        </div>
        <div className="co-footer-copy">© {new Date().getFullYear()} {d.gym.name}. Powered by Koriva.</div>
      </footer>
    </>
  );
}
