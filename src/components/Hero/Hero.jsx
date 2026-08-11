import { useEffect, useRef, useState } from 'react';
import './Hero.css';
import heroPhotoBase from '../../assets/mustafo.jpg';
import heroPhotoNeon from '../../assets/mustafoneon.png';

const ROLES = ['Full-Stack Engineer', 'Problem Solver', 'Product Builder', 'Open Source Contributor'];

export default function Hero({ started }) {
  const heroRef = useRef(null);
  const heroInnerRef = useRef(null);
  const canvasRef = useRef(null);
  const photoFrameRef = useRef(null);
  const photoNeonRef = useRef(null);
  const line2Ref = useRef(null);

  const [role, setRole] = useState(ROLES[0]);
  const [roleVisible, setRoleVisible] = useState(true);

  const [anim, setAnim] = useState({
    tag: false, line1: false, line2: false, sub: false, cta: false,
    scrollCue: false, orbit: false, photo: false, dim1: false, dim2: false,
  });

  /* ================= ENTRANCE SEQUENCE ================= */
  useEffect(() => {
    if (!started) return;
    const timers = [
      setTimeout(() => setAnim((a) => ({ ...a, tag: true })), 0),
      setTimeout(() => setAnim((a) => ({ ...a, line1: true })), 200),
      setTimeout(() => setAnim((a) => ({ ...a, line2: true })), 380),
      setTimeout(() => setAnim((a) => ({ ...a, sub: true })), 700),
      setTimeout(() => setAnim((a) => ({ ...a, cta: true })), 850),
      setTimeout(() => setAnim((a) => ({ ...a, scrollCue: true })), 1000),
      setTimeout(() => setAnim((a) => ({ ...a, orbit: true })), 1000),
      setTimeout(() => setAnim((a) => ({ ...a, photo: true })), 550),
      setTimeout(() => setAnim((a) => ({ ...a, dim1: true })), 900),
      setTimeout(() => setAnim((a) => ({ ...a, dim2: true })), 1050),
    ];
    return () => timers.forEach(clearTimeout);
  }, [started]);

  /* ================= ROLE CYCLING TEXT ================= */
  useEffect(() => {
    let idx = 0;
    const iv = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        idx = (idx + 1) % ROLES.length;
        setRole(ROLES[idx]);
        setRoleVisible(true);
      }, 300);
    }, 3200);
    return () => clearInterval(iv);
  }, []);

  /* ================= INTERACTIVE PARTICLE FIELD (canvas) ================= */
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let hmx = -9999, hmy = -9999;
    let raf;

    function resizeCanvas() {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
      const cols = Math.floor(canvas.width / 46);
      const rows = Math.floor(canvas.height / 46);
      particles = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          particles.push({ x: i * 46 + 23, y: j * 46 + 23, ox: i * 46 + 23, oy: j * 46 + 23, vx: 0, vy: 0 });
        }
      }
    }
    function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

    function onMove(e) {
      const r = hero.getBoundingClientRect();
      hmx = e.clientX - r.left;
      hmy = e.clientY - r.top;
    }
    function onLeave() { hmx = -9999; hmy = -9999; }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        const dx = p.x - hmx, dy = p.y - hmy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 130;
        if (dist < radius) {
          const force = (radius - dist) / radius;
          p.vx += (dx / dist || 0) * force * 2.2;
          p.vy += (dy / dist || 0) * force * 2.2;
        }
        p.vx += (p.ox - p.x) * 0.06;
        p.vy += (p.oy - p.y) * 0.06;
        p.vx *= 0.82; p.vy *= 0.82;
        p.x += p.vx; p.y += p.vy;

        const distFromOrigin = Math.hypot(p.x - p.ox, p.y - p.oy);
        const opacity = clamp(0.08 + distFromOrigin * 0.03, 0.08, 0.9);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,138,61,${opacity})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resizeCanvas);
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  /* ================= PHOTO NEON SPOTLIGHT REVEAL ================= */
  useEffect(() => {
    const frame = photoFrameRef.current;
    const neon = photoNeonRef.current;
    if (!frame || !neon) return;
    let neonRadius = 0, targetRadius = 0, px = -999, py = -999;
    let raf;

    function onMove(e) {
      const r = frame.getBoundingClientRect();
      px = e.clientX - r.left; py = e.clientY - r.top;
      targetRadius = 110;
    }
    function onLeave() { targetRadius = 0; }
    function loop() {
      neonRadius += (targetRadius - neonRadius) * 0.18;
      neon.style.clipPath = `circle(${neonRadius}px at ${px}px ${py}px)`;
      raf = requestAnimationFrame(loop);
    }
    frame.addEventListener('mousemove', onMove);
    frame.addEventListener('mouseleave', onLeave);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      frame.removeEventListener('mousemove', onMove);
      frame.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  /* ================= MAGNETIC LETTERS + HERO PARALLAX ================= */
  useEffect(() => {
    const hero = heroRef.current;
    const heroInner = heroInnerRef.current;
    if (!hero || !heroInner) return;

    function onMove(e) {
      const r = hero.getBoundingClientRect();
      if (e.clientY > r.bottom || e.clientY < r.top) return;
      const relX = e.clientX - (r.left + r.width / 2);
      const relY = e.clientY - (r.top + r.height / 2);
      heroInner.style.transform = `translate(${relX * 0.012}px, ${relY * 0.012}px)`;

      const letters = line2Ref.current ? line2Ref.current.querySelectorAll('.letter') : [];
      letters.forEach((letter) => {
        const lr = letter.getBoundingClientRect();
        const lx = lr.left + lr.width / 2, ly = lr.top + lr.height / 2;
        const dx = lx - e.clientX, dy = ly - e.clientY;
        const dist = Math.hypot(dx, dy);
        const radius = 90;
        if (dist < radius) {
          const force = (radius - dist) / radius;
          letter.style.transform = `translate(${dx * force * 0.4}px, ${dy * force * 0.4}px)`;
        } else {
          letter.style.transform = 'translate(0,0)';
        }
      });
    }
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section className="hero" id="heroSection" ref={heroRef}>
      <canvas id="particleCanvas" ref={canvasRef}></canvas>
      <div className="hero-maxw">
        <div className={`orbit-badge ${anim.orbit ? 'in' : ''}`}>
          <svg viewBox="0 0 100 100"><circle cx="50" cy="3" r="4" fill="none" /></svg>
          <div className="dot"></div>
        </div>

        <div className={`photo-frame ${anim.photo ? 'in' : ''}`} ref={photoFrameRef}>
          <img className="photo-img photo-base" src={heroPhotoBase} alt="Portret" />
          <div className="photo-neon" ref={photoNeonRef}>
            <img className="photo-img" src={heroPhotoNeon} alt="" />
          </div>
          <div className="scan-line"></div>
          <div className="corner c-tl"></div>
          <div className="corner c-br"></div>
      
        </div>

        <div className={`dim-tag dim-tag-1 ${anim.dim1 ? 'in' : ''}`}>
          <span className="dim-dot"></span> 4+ YEARS EXPERIENCE
        </div>
        <div className={`dim-tag dim-tag-2 ${anim.dim2 ? 'in' : ''}`}>
          <span className="dim-dot"></span> AVAILABLE FOR WORK
        </div>

        <div className="hero-inner" ref={heroInnerRef}>
          <div className="eyebrow hero-tag" style={{ opacity: anim.tag ? 1 : 0, transition: 'opacity .6s ease' }}>
            <span
              className="role-cycle"
              style={{
                opacity: roleVisible ? 1 : 0,
                transform: roleVisible ? 'translateY(0)' : 'translateY(-8px)',
                transition: 'opacity .3s ease, transform .3s ease',
              }}
            >
              {role}
            </span>
          </div>
          <h1>
            <span className={`line ${anim.line1 ? 'in' : ''}`}><span className="line-content">Mustafo</span></span>
            <span className={`line ${anim.line2 ? 'in' : ''}`} ref={line2Ref}>
              <span className="line-content">
                {'Muminov'.split('').map((ch, i) => (
                  <span className="letter" key={i}>{ch}</span>
                ))}
              </span>
            </span>
          </h1>
          <p className={`hero-sub fade-up ${anim.sub ? 'in' : ''}`}>
            I build <b>systems that work</b> — not just ones that look nice. Reliable, fast, and built to last from day one.
          </p>
          <div className={`hero-cta fade-up ${anim.cta ? 'in' : ''}`}>
            <a href="#work" className="btn btn-primary" data-hover><span>View Projects →</span></a>
            <a href="#contact" className="btn btn-ghost" data-hover><span>Get in Touch</span></a>
          </div>
        </div>
        {/* <div className={`scroll-cue fade-up ${anim.scrollCue ? 'in' : ''}`}><div className="bar"></div>SCROLL TO EXPLORE</div> */}
      </div>
    </section>
  );
}