import { useEffect, useState } from 'react';
import './Navbar.css';

const LINKS = [
  { href: '#about', label: 'About', idx: '01' },
  { href: '#work', label: 'Work', idx: '02' },
  { href: '#philosophy', label: 'Approach', idx: '03' },
  { href: '#experience', label: 'Experience', idx: '04' },
  { href: '#contact', label: 'Contact', idx: '05' },
];

export default function Navbar({ started }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${started ? 'show' : ''} ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <div className="nav-mark">Mustafo<span>_</span>Muminov</div>
        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} data-idx={l.idx} data-hover>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}