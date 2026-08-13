import { useEffect, useRef, useState } from 'react';
import './Process.css';

const EXPERIENCE = [
  {
    year: '2024 — PRESENT',
    number: '01',
    title: 'Full-Stack Developer',
    company: 'Company Name',
    text: 'Building premium web applications for clients worldwide — interactive frontends, scalable backend architecture and high-performance digital experiences.',
    tags: ['React', 'Node.js', 'Next.js'],
  },
  {
    year: '2022 — 2024',
    number: '02',
    title: 'Frontend Developer',
    company: 'Company Name',
    text: 'Developed sophisticated user interfaces, optimized performance and created reusable design systems across multiple products.',
    tags: ['React', 'TypeScript', 'UI/UX'],
  },
  {
    year: '2021 — PRESENT',
    number: '03',
    title: 'Open Source Contributor',
    company: 'Global Community',
    text: 'Contributing to open-source projects through documentation, code review and development while helping other developers grow.',
    tags: ['GitHub', 'Open Source', 'Community'],
  },
];

const SKILLS = [
  { label: 'React / Next.js', pct: 92 },
  { label: 'Node.js / Backend', pct: 88 },
  { label: 'Databases', pct: 80 },
  { label: 'DevOps / Cloud', pct: 75 },
  { label: 'UI / UX Engineering', pct: 90 },
];

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function ease(t) {
  return t * t * (3 - 2 * t);
}

export default function Process() {
  const pinRef = useRef(null);
  const visualRef = useRef(null);
  const titleRef = useRef(null);
  const detailRef = useRef(null);
  const tickRef = useRef(null);
  const skillsRef = useRef(null);
  const skillRowsRef = useRef([]);
  const sectionHeadRef = useRef(null);
  const timelineRef = useRef(null);
  const cursorRef = useRef(null);

  const [activeSkill, setActiveSkill] = useState(null);

  /* =========================
     CUSTOM CURSOR
  ========================= */

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) return;

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  /* =========================
     PHILOSOPHY SCROLL ENGINE
  ========================= */

  useEffect(() => {
    const pin = pinRef.current;
    const visual = visualRef.current;
    const title = titleRef.current;
    const detail = detailRef.current;
    const tick = tickRef.current;

    if (!pin || !visual || !title || !detail || !tick) return;

    const maxScale = 9;
    let ticking = false;

    function update() {
      const rect = pin.getBoundingClientRect();

      const scrollable = rect.height - window.innerHeight;

      let raw = -rect.top / scrollable;

      raw = clamp(raw, 0, 1);

      const p1 = ease(clamp(raw / 0.55, 0, 1));
      const p2 = ease(clamp((raw - 0.42) / 0.58, 0, 1));

      const scale = lerp(1, maxScale, p1);

      visual.style.transform = `
        translate3d(0,0,0)
        scale(${scale})
      `;

      visual.style.opacity = lerp(0.9, 0.18, p2);

      title.style.opacity = 1 - p1;

      title.style.transform = `
        scale(${lerp(1, 0.7, p1)})
        translateY(${lerp(0, -30, p1)}px)
      `;

      detail.style.opacity = p2;

      detail.style.transform = `
        translateY(${lerp(50, 0, p2)}px)
        scale(${lerp(.96, 1, p2)})
      `;

      tick.style.opacity =
        raw <= 0.02 || raw >= 0.98
          ? 0
          : 1 - Math.abs(raw - 0.5) * 1.4;

      const progress = Math.round(raw * 100);

      tick.innerHTML = `
        01 / SCROLLING
        <span>${progress}%</span>
      `;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });

        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);

    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  /* =========================
     REVEAL ANIMATIONS
  ========================= */

  useEffect(() => {
    const targets = [
      sectionHeadRef.current,
      timelineRef.current,
      skillsRef.current,
    ].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  /* =========================
     SKILLS
  ========================= */

  useEffect(() => {
    const block = skillsRef.current;

    if (!block) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          skillRowsRef.current.forEach((row, i) => {
            setTimeout(() => {
              const fill = row?.querySelector('.skill-fill');

              if (fill) {
                fill.style.width = `${row.dataset.pct}%`;
              }
            }, i * 160);
          });

          observer.unobserve(block);
        });
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(block);

    return () => observer.disconnect();
  }, []);

  /* =========================
     MOUSE PARALLAX
  ========================= */

  useEffect(() => {
    const section = pinRef.current;
    const visual = visualRef.current;

    if (!section || !visual) return;

    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      visual.style.setProperty('--mx', `${x * 18}px`);
      visual.style.setProperty('--my', `${y * 18}px`);
    };

    section.addEventListener('mousemove', handleMove);

    return () => {
      section.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <>
      {/* ================= CURSOR ================= */}

      <div className="process-cursor" ref={cursorRef}>
        <span />
      </div>

      {/* ================= PHILOSOPHY ================= */}

      <section
        className="zoom-pin"
        id="philZoom"
        ref={pinRef}
      >
        <div className="zoom-noise" />

        <div className="floating-orb orb-one" />
        <div className="floating-orb orb-two" />
        <div className="floating-orb orb-three" />

        <div className="zoom-sticky">

          <div
            className="zoom-visual zv-phil"
            ref={visualRef}
          >
            <div className="visual-ring ring-one" />
            <div className="visual-ring ring-two" />
            <div className="visual-core" />
          </div>

          <div className="philosophy-counter">
            <span>SCROLL TO EXPLORE</span>
            <b>01</b>
          </div>

          <h2
            className="zoom-title"
            id="philosophy"
            ref={titleRef}
          >
            THE
            <br />
            <span>PHILOSOPHY</span>
          </h2>

          <div
            className="zoom-detail"
            ref={detailRef}
          >
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              HOW I WORK
            </div>

            <h3>
              Build things people
              <span> remember.</span>
            </h3>

            <p>
              I believe <strong>good code</strong> is invisible code.
              The user shouldn't notice it — only feel the result.
              Every function should solve a real problem, and every
              interface should be understood without explanation.
            </p>

            <div className="philosophy-meta">
              <span>01 — INTENTION</span>
              <span>02 — PRECISION</span>
              <span>03 — EXPERIENCE</span>
            </div>
          </div>

          <div
            className="progress-tick"
            ref={tickRef}
          >
            01 / SCROLLING
            <span>0%</span>
          </div>

        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}

      <section
        className="process-section"
        id="experience"
      >

        <div
          className="section-head reveal"
          ref={sectionHeadRef}
        >
          <div>
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              WHERE I'VE BEEN
            </div>

            <h2>
              Experience
              <span>.</span>
            </h2>
          </div>

          <div className="section-number">
            02
          </div>
        </div>

        <div
          className="timeline reveal"
          ref={timelineRef}
        >

          <div className="timeline-line">
            <span />
          </div>

          {EXPERIENCE.map((item, index) => (
            <div
              className="t-item"
              key={item.title}
              style={{
                '--delay': `${index * 120}ms`,
              }}
            >

              <div className="timeline-dot">
                <span />
              </div>

              <div className="t-content">

                <div className="t-top">
                  <span className="t-number">
                    {item.number}
                  </span>

                  <span className="t-year">
                    {item.year}
                  </span>
                </div>

                <h4>
                  {item.title}
                </h4>

                <div className="company">
                  {item.company}
                </div>

                <p>
                  {item.text}
                </p>

                <div className="experience-tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

              <div className="t-arrow">
                ↗
              </div>

            </div>
          ))}

        </div>

        {/* ================= SKILLS ================= */}

        <div
          className="skills-block reveal"
          ref={skillsRef}
        >

          <div className="skills-heading">

            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                TECHNICAL SKILLS
              </div>

              <h3>
                Tools I use to
                <span> create.</span>
              </h3>
            </div>

            <div className="skills-index">
              03
            </div>

          </div>

          <div className="skills-list">

            {SKILLS.map((skill, i) => (
              <div
                className={`skill-row ${activeSkill === i ? 'active' : ''
                  }`}
                key={skill.label}
                data-pct={skill.pct}
                ref={(el) => {
                  skillRowsRef.current[i] = el;
                }}
                onMouseEnter={() => setActiveSkill(i)}
                onMouseLeave={() => setActiveSkill(null)}
              >

                <div className="skill-row-top">

                  <div className="skill-name">
                    <span className="skill-index">
                      0{i + 1}
                    </span>

                    <span>
                      {skill.label}
                    </span>
                  </div>

                  <div className="skill-percent">
                    {skill.pct}%
                  </div>

                </div>

                <div className="skill-track">

                  <div className="skill-fill">
                    <span />
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* ================= BOTTOM CTA ================= */}

        <div className="process-footer">

          <div className="footer-line" />

          <div className="footer-content">

            <span>
              ALWAYS LEARNING
            </span>

            <div className="footer-pulse">
              <i />
              <i />
              <i />
            </div>

            <span>
              ALWAYS BUILDING
            </span>

          </div>

        </div>

      </section>
    </>
  );
}