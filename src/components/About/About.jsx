import { useEffect, useRef } from 'react';
import './About.css';

const facts = [
  {
    number: '01',
    label: 'Age',
    value: '15',
    suffix: 'Years old',
  },
  {
    number: '02',
    label: 'Location',
    value: 'Tashkent',
    suffix: 'Uzbekistan',
  },
  {
    number: '03',
    label: 'Experience',
    value: '58+',
    suffix: 'Years',
  },
  {
    number: '04',
    label: 'Status',
    value: 'Available',
    suffix: 'For work',
  },
];

const services = [
  {
    number: '01',
    title: 'Web Development',
    text: 'Building fast, scalable and modern web applications.',
    symbol: '</>',
  },
  {
    number: '02',
    title: 'UI / UX Design',
    text: 'Designing beautiful and user-friendly interfaces.',
    symbol: '◈',
  },
  {
    number: '03',
    title: 'System Architecture',
    text: 'Creating robust, secure and maintainable systems.',
    symbol: '◇',
  },
  {
    number: '04',
    title: 'Performance',
    text: 'Improving performance, speed and best practices.',
    symbol: '↗',
  },
];

function AnimatedNumber({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const target = element.dataset.value;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        element.classList.add('count-visible');

        if (!/^\d+$/.test(target)) {
          element.textContent = target;
          observer.disconnect();
          return;
        }

        const finalValue = Number(target);
        const duration = 1000;
        const startTime = performance.now();

        const animate = (currentTime) => {
          const progress = Math.min(
            (currentTime - startTime) / duration,
            1
          );

          const eased = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.floor(finalValue * eased);

          element.textContent = currentValue;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            element.textContent = target;
          }
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className="about-fact-value"
      data-value={children}
    >
      0
    </span>
  );
}

function FactCard({ number, label, value, suffix }) {
  return (
    <article className="about-fact-card">
      <div className="fact-card-top">
        <span className="fact-number">{number}</span>

        <span className="fact-dot">
          <span />
        </span>
      </div>

      <div className="fact-label">{label}</div>

      <div className="fact-value-row">
        {value === 'Tashkent' || value === 'Available' ? (
          <span
            className={`about-fact-value ${
              value === 'Available' ? 'available-value' : ''
            }`}
          >
            {value}
          </span>
        ) : (
          <AnimatedNumber>
            {value.replace('+', '')}
          </AnimatedNumber>
        )}

        {value === '4+' && (
          <span className="value-plus">+</span>
        )}
      </div>

      <span className="fact-suffix">{suffix}</span>

      <div className="fact-line">
        <span />
      </div>
    </article>
  );
}

function ServiceCard({ number, title, text, symbol }) {
  return (
    <article className="about-service-card">
      <div className="service-card-head">
        <span className="service-number">{number}</span>

        <span className="service-symbol">
          {symbol}
        </span>
      </div>

      <div className="service-content">
        <h3>{title}</h3>

        <p>{text}</p>
      </div>

      <div className="service-arrow">↗</div>

      <div className="service-progress">
        <span />
      </div>
    </article>
  );
}

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const revealElements =
      section.querySelectorAll('[data-reveal]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const handlePointerMove = (event) => {
      const rect = section.getBoundingClientRect();

      const x =
        ((event.clientX - rect.left) / rect.width) * 100;

      const y =
        ((event.clientY - rect.top) / rect.height) * 100;

      section.style.setProperty('--mouse-x', `${x}%`);
      section.style.setProperty('--mouse-y', `${y}%`);
    };

    section.addEventListener(
      'pointermove',
      handlePointerMove
    );

    return () => {
      section.removeEventListener(
        'pointermove',
        handlePointerMove
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-section"
      id="about"
    >
      {/* Background */}
      <div className="about-background">
        <div className="about-noise" />
        <div className="about-grid-lines" />
        <div className="about-glow about-glow-one" />
        <div className="about-glow about-glow-two" />

        <div className="about-orbit orbit-one" />
        <div className="about-orbit orbit-two" />

        <div className="about-particles">
          {Array.from({ length: 26 }).map((_, index) => (
            <span
              key={index}
              style={{
                '--i': index,
              }}
            />
          ))}
        </div>
      </div>

      <div className="about-container">

        {/* Top navigation line */}
        <div
          className="about-topbar"
          data-reveal
        >
          <div className="about-section-id">
            <span className="id-mark">//</span>
            <span>About me</span>
          </div>

          <div className="about-top-line">
            <span />
          </div>

          <div className="about-scroll-indicator">
            <span className="scroll-circle">
              ↓
            </span>

            <span>SCROLL TO EXPLORE</span>
          </div>
        </div>

        {/* Main */}
        <div className="about-main">

          {/* LEFT SIDE */}
          <div
            className="about-visual"
            data-reveal
          >
            <div className="visual-orbit orbit-left">
              <span />
            </div>

            <div className="visual-number">
              <span>01</span>
              <i />
              <span>04</span>
            </div>

            <div className="visual-content">

              <div className="visual-kicker">
                <span className="live-dot" />
                SYSTEM / ONLINE
              </div>

              <div className="visual-title">
                <span>BUILD</span>
                <span>CREATE</span>
                <span>DEPLOY</span>
              </div>

              <div className="visual-description">
                Digital products built with precision,
                creativity and modern technology.
              </div>

              <div className="visual-bottom">
                <div>
                  <span>CODE</span>
                  <strong>01</strong>
                </div>

                <div>
                  <span>DESIGN</span>
                  <strong>02</strong>
                </div>

                <div>
                  <span>SYSTEM</span>
                  <strong>03</strong>
                </div>
              </div>
            </div>

            <div className="visual-frame frame-one" />
            <div className="visual-frame frame-two" />
          </div>

          {/* RIGHT SIDE */}
          <div className="about-content">

            <div
              className="about-heading"
              data-reveal
            >
              <div className="about-eyebrow">
                <span>//</span>
                MEN HAQIMDA
              </div>

              <h2>
                About
                <span> Me.</span>
              </h2>

              <div className="heading-line">
                <span />
              </div>

              <p>
                I'm a developer who loves designing systems
                and shipping them. On every project I try to
                bring together precision and speed. Beyond
                writing code, I also care deeply about design
                and user experience.
              </p>
            </div>

            {/* Experience circle */}
            <div
              className="experience-orb"
              data-reveal
            >
              <div className="orb-ring ring-one" />
              <div className="orb-ring ring-two" />
              <div className="orb-ring ring-three" />

              <div className="orb-content">
                <strong>4+</strong>
                <span>YEARS</span>
                <small>EXPERIENCE</small>
              </div>
            </div>

            {/* Facts */}
            <div
              className="about-facts"
              data-reveal
            >
              {facts.map((fact) => (
                <FactCard
                  key={fact.number}
                  {...fact}
                />
              ))}
            </div>

          </div>
        </div>

        {/* What I do */}
        <div
          className="about-services"
          data-reveal
        >
          <div className="services-heading">
            <div className="services-title">
              <span>//</span>
              WHAT I DO
            </div>

            <div className="services-line">
              <span />
            </div>

            <div className="services-counter">
              <span>04</span>
              SERVICES
            </div>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard
                key={service.number}
                {...service}
              />
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div
          className="about-bottom"
          data-reveal
        >
          <div className="about-bottom-left">
            <span className="bottom-status">
              <i />
              AVAILABLE FOR WORK
            </span>

            <span className="bottom-divider" />

            <span>2026</span>
          </div>

          <div className="about-bottom-center">
            <span>CRAFTED WITH</span>
            <b>PRECISION</b>
          </div>

          <div className="about-bottom-right">
            <span>SCROLL</span>

            <div className="scroll-arrow">
              ↓
            </div>
          </div>
        </div>

      </div>

      {/* Mouse glow */}
      <div className="about-cursor-glow" />
    </section>
  );
}