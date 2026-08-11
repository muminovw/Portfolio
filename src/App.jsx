import { useEffect, useRef, useState } from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import About from './components/About/About.jsx';
import Process from './components/Process/Process.jsx';
import Works from './components/Works/Works.jsx';
import Contacts from './components/Contacts/Contact.jsx';

export default function App() {
  const [loaderPct, setLoaderPct] = useState(0);
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [introStarted, setIntroStarted] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const coordsRef = useRef(null);

  /* ================= LOADER — 0 dan 100 gacha sanaydi, keyin saytni ochadi ================= */
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += Math.ceil(Math.random() * 9) + 2;
      if (count >= 100) {
        count = 100;
        clearInterval(interval);
        setTimeout(() => {
          setLoaderHidden(true);
          setIntroStarted(true);
        }, 400);
      }
      setLoaderPct(count);
    }, 65);
    return () => clearInterval(interval);
  }, []);

  /* ================= CUSTOM CURSOR + COORD READOUT ================= */
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf;

    function onMouseMove(e) {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px';
        dotRef.current.style.top = my + 'px';
      }
      if (coordsRef.current) {
        coordsRef.current.innerHTML =
          `X <span>${String(e.clientX).padStart(3, '0')}</span> · Y <span>${String(e.clientY).padStart(3, '0')}</span>`;
      }
    }
    function ringLoop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top = ry + 'px';
      }
      raf = requestAnimationFrame(ringLoop);
    }
    document.addEventListener('mousemove', onMouseMove);
    ringLoop();

    function onOver(e) {
      if (e.target.closest && e.target.closest('[data-hover]')) {
        ringRef.current?.classList.add('hover');
      }
    }
    function onOut(e) {
      if (e.target.closest && e.target.closest('[data-hover]')) {
        ringRef.current?.classList.remove('hover');
      }
    }
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>

      <div id="loader" className={loaderHidden ? 'hide' : ''}>
        <div className="loader-num">{loaderPct}</div>
        <div className="loader-label">Your Name</div>
        <div className="loader-bar-track">
          <div className="loader-bar-fill" style={{ width: loaderPct + '%' }}></div>
        </div>
      </div>

      <div className="grid-bg"></div>
      <div className="coord-readout" ref={coordsRef}>X <span>000</span> · Y <span>000</span></div>

      <Navbar started={introStarted} />
      <Hero started={introStarted} />
      <About />
      <Process />
      <Works />
      <Contacts />

      <footer>
        <div className="footer-inner">
          <div>© 2026 DEV_FOLIO</div>
          <div>Built with precision.</div>
        </div>
      </footer>
    </>
  );
}