import { useEffect, useRef, useState } from 'react';
import './Process.css';

/* =========================================================
   EXPERIENCE DATA
========================================================= */

const EXPERIENCE = [
  {
    year: '2024 — PRESENT',
    number: '01',
    title: 'Full-Stack Developer',
    company: 'INTELLECT ACADEMY',
    text: 'Building modern digital products with scalable architecture, interactive interfaces and reliable backend systems. Focused on performance, usability and clean engineering.',
    tags: ['React', 'Vue', 'Node.js', 'Supabase'],
  },
  {
    year: '2023 — 2024',
    number: '02',
    title: 'Frontend Developer',
    company: 'DIGITAL PRODUCTS',
    text: 'Created responsive and high-performance interfaces with strong attention to visual details, accessibility, component architecture and user experience.',
    tags: ['React', 'JavaScript', 'CSS', 'UI/UX'],
  },
  {
    year: '2022 — PRESENT',
    number: '03',
    title: 'Independent Developer',
    company: 'PERSONAL PROJECTS',
    text: 'Designing and developing independent products, experiments and developer tools while continuously exploring modern technologies and better development practices.',
    tags: ['GitHub', 'Vite', 'APIs', 'Open Source'],
  },
];

/* =========================================================
   SKILLS DATA
========================================================= */

const SKILLS = [
  {
    label: 'React / Next.js',
    pct: 92,
  },
  {
    label: 'Vue / Vite',
    pct: 90,
  },
  {
    label: 'Node.js / Backend',
    pct: 88,
  },
  {
    label: 'Supabase / Databases',
    pct: 84,
  },
  {
    label: 'UI / UX Engineering',
    pct: 91,
  },
  {
    label: 'DevOps / Cloud',
    pct: 76,
  },
];

/* =========================================================
   PROCESS COMPONENT
========================================================= */

export default function Process() {
  const cursorRef = useRef(null);

  const sectionHeadRef = useRef(null);
  const timelineRef = useRef(null);
  const skillsRef = useRef(null);

  const skillRowsRef = useRef([]);

  const [activeSkill, setActiveSkill] = useState(null);

  /* =======================================================
     CUSTOM CURSOR
  ======================================================= */

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) return;

    const handleMouseMove = (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  /* =======================================================
     CURSOR HOVER EFFECT
  ======================================================= */

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) return;

    const interactiveElements = document.querySelectorAll(
      'a, button, .t-item, .skill-row, .experience-tags span'
    );

    const handleEnter = () => {
      cursor.classList.add('cursor-active');
    };

    const handleLeave = () => {
      cursor.classList.remove('cursor-active');
    };

    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', handleEnter);
      element.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleEnter);
        element.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  /* =======================================================
     REVEAL ANIMATIONS
  ======================================================= */

  useEffect(() => {
    const elements = [
      sectionHeadRef.current,
      timelineRef.current,
      skillsRef.current,
    ].filter(Boolean);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('in');

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =======================================================
     SKILL BAR ANIMATION
  ======================================================= */

  useEffect(() => {
    const block = skillsRef.current;

    if (!block) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          skillRowsRef.current.forEach((row, index) => {
            if (!row) return;

            const fill = row.querySelector('.skill-fill');

            if (!fill) return;

            setTimeout(() => {
              fill.style.width = `${row.dataset.pct}%`;
            }, index * 140);
          });

          observer.unobserve(block);
        });
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(block);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =======================================================
     MOUSE PARALLAX
  ======================================================= */

  useEffect(() => {
    const section = document.querySelector('.process-section');

    if (!section) return;

    const handleMouseMove = (event) => {
      const rect = section.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width - 0.5;

      const y =
        (event.clientY - rect.top) / rect.height - 0.5;

      section.style.setProperty(
        '--mouse-x',
        `${x * 20}px`
      );

      section.style.setProperty(
        '--mouse-y',
        `${y * 20}px`
      );
    };

    section.addEventListener(
      'mousemove',
      handleMouseMove
    );

    return () => {
      section.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
  }, []);

  return (
    <>
      {/* ===================================================
          CUSTOM CURSOR
      =================================================== */}

      <div
        className="process-cursor"
        ref={cursorRef}
        aria-hidden="true"
      >
        <span />
      </div>

      {/* ===================================================
          EXPERIENCE / PROCESS
      =================================================== */}

      <section
        className="process-section"
        id="experience"
      >
        {/* BACKGROUND ELEMENTS */}

        <div
          className="process-grid"
          aria-hidden="true"
        />

        <div
          className="process-glow process-glow-one"
          aria-hidden="true"
        />

        <div
          className="process-glow process-glow-two"
          aria-hidden="true"
        />

        <div
          className="process-noise"
          aria-hidden="true"
        />

        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div
          className="section-head reveal"
          ref={sectionHeadRef}
        >
          <div className="section-head-main">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              WHERE I'VE BEEN
            </div>

            <h2>
              Experience
              <span>.</span>
            </h2>

            <p className="section-description">
              A timeline of projects, technologies and
              experiences that shaped the way I build
              digital products.
            </p>
          </div>

          <div className="section-number">
            01
          </div>
        </div>

        {/* =================================================
            EXPERIENCE TIMELINE
        ================================================= */}

        <div
          className="timeline reveal"
          ref={timelineRef}
        >
          <div
            className="timeline-line"
            aria-hidden="true"
          >
            <span />
          </div>

          {EXPERIENCE.map((item, index) => (
            <article
              className="t-item"
              key={`${item.number}-${item.title}`}
              style={{
                '--delay': `${index * 130}ms`,
              }}
            >
              {/* TIMELINE DOT */}

              <div className="timeline-dot">
                <span />
              </div>

              {/* CONTENT */}

              <div className="t-content">
                <div className="t-top">
                  <span className="t-number">
                    {item.number}
                  </span>

                  <span className="t-year">
                    {item.year}
                  </span>
                </div>

                <h3>{item.title}</h3>

                <div className="company">
                  {item.company}
                </div>

                <p>{item.text}</p>

                <div className="experience-tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* ARROW */}

              <div
                className="t-arrow"
                aria-hidden="true"
              >
                ↗
              </div>
            </article>
          ))}
        </div>

        {/* =================================================
            SKILLS
        ================================================= */}

        <div
          className="skills-block reveal"
          ref={skillsRef}
        >
          <div className="skills-heading">
            <div className="skills-heading-main">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                TECHNICAL SKILLS
              </div>

              <h3>
                Tools I use to
                <span> create.</span>
              </h3>

              <p>
                Technologies and tools I use to transform
                ideas into reliable digital experiences.
              </p>
            </div>

            <div className="skills-index">
              02
            </div>
          </div>

          <div className="skills-list">
            {SKILLS.map((skill, index) => (
              <div
                className={`skill-row ${
                  activeSkill === index
                    ? 'active'
                    : ''
                }`}
                key={skill.label}
                data-pct={skill.pct}
                ref={(element) => {
                  skillRowsRef.current[index] =
                    element;
                }}
                onMouseEnter={() =>
                  setActiveSkill(index)
                }
                onMouseLeave={() =>
                  setActiveSkill(null)
                }
              >
                <div className="skill-row-top">
                  <div className="skill-name">
                    <span className="skill-index">
                      {String(index + 1).padStart(
                        2,
                        '0'
                      )}
                    </span>

                    <span>{skill.label}</span>
                  </div>

                  <span className="skill-percent">
                    {skill.pct}%
                  </span>
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

        {/* =================================================
            BOTTOM FOOTER
        ================================================= */}

        <div className="process-footer">
          <div className="footer-line">
            <span />
          </div>

          <div className="footer-content">
            <span>ALWAYS LEARNING</span>

            <div
              className="footer-pulse"
              aria-hidden="true"
            >
              <i />
              <i />
              <i />
            </div>

            <span>ALWAYS BUILDING</span>
          </div>
        </div>
      </section>
    </>
  );
}