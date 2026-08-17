import { useEffect, useRef } from "react";
import "./Contact.css";

const codeLines = [
  "const developer = 'MUSTAFO';",
  "import React from 'react';",
  "function Portfolio() {",
  "return <Creative />;",
  "const project = await build();",
  "npm run build",
  "git push origin main",
  "</Contact>",
  "01001001 01000100",
  "const future = true;",
  "while (coding) {",
  "createSomething();",
  "}",
  "import { motion } from 'framer-motion';",
  "export default App;",
  "const skills = ['React', 'JS', 'CSS'];",
  "fetch('/api/projects');",
  "async function sendMessage() {",
  "await fetch('/contact');",
  "console.log('Hello World');",
  "useEffect(() => {});",
  "const UI = () => <App />;",
  "npm install",
  "git commit -m 'update'",
  "git status",
  "if (isDeveloper) {}",
  "return true;",
  "const design = 'premium';",
  "let creativity = 100;",
  "const web = new Website();",
  "document.querySelector('#root');",
  "export { Portfolio };",
  "const experience = '3+ years';",
  "const passion = 'coding';",
  "const idea = 'build';",
  "new Project();",
  "class Developer {}",
  "const website = document.body;",
  "window.addEventListener('load');",
  "localStorage.setItem('theme', 'dark');",
  "console.log('Building future...');",
  "return <Portfolio />;",
  "const contact = true;",
  "const available = true;",
  "let projects = [];",
  "projects.push(newProject);",
  "const creative = true;",
  "export default Developer;",
  "01010101 01010100",
  "01100001 01101100",
];

export default function Contact() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrame;
    let drops = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Ko'proq ustunlar
      const columns = Math.floor(canvas.width / 14);

      drops = Array.from({ length: columns }, () => ({
        y: Math.random() * canvas.height,

        // Tezlik
        speed: 1.5 + Math.random() * 3.5,

        text:
          codeLines[
            Math.floor(Math.random() * codeLines.length)
          ],

        // Yorqinlik
        opacity: 0.18 + Math.random() * 0.35,

        // Har bir kodning o'z uzunligi
        length: 4 + Math.floor(Math.random() * 12),

        // Random delay
        delay: Math.random() * 2,
      }));
    };

    resizeCanvas();

    const draw = () => {
      // Trail effekt
      ctx.fillStyle = "rgba(3, 6, 5, 0.075)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "12px monospace";

      drops.forEach((drop, index) => {
        const x = index * 14;

        // Juda yorqin ba'zi kodlar
        const isBright = Math.random() > 0.94;

        const brightness = isBright
          ? 0.85
          : drop.opacity;

        // Kodning o'zi
        ctx.fillStyle = `rgba(0, 255, 136, ${brightness})`;

        ctx.fillText(drop.text, x, drop.y);

        // Neon glow
        if (isBright) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = "#00ff88";
        } else {
          ctx.shadowBlur = 3;
          ctx.shadowColor = "#00ff88";
        }

        // Tezroq harakat
        drop.y += drop.speed;

        // Ekrandan chiqib ketganda
        if (drop.y > canvas.height + 150) {
          drop.y = -Math.random() * 600;

          drop.speed =
            1.5 + Math.random() * 3.5;

          drop.text =
            codeLines[
              Math.floor(
                Math.random() * codeLines.length
              )
            ];

          drop.opacity =
            0.18 + Math.random() * 0.35;

          drop.length =
            4 + Math.floor(Math.random() * 12);
        }
      });

      // Shadow reset
      ctx.shadowBlur = 0;

      animationFrame =
        requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener(
      "resize",
      resizeCanvas
    );

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        "resize",
        resizeCanvas
      );
    };
  }, []);

  return (
    <section className="contact-section" id="contact">

      {/* CODE BACKGROUND */}
      <canvas
        ref={canvasRef}
        className="code-rain"
      />

      {/* DARK OVERLAY */}
      <div className="contact-overlay" />

      {/* GRID */}
      <div className="contact-grid" />

      {/* MAIN CONTENT */}
      <div className="contact-container">

        {/* ================= LEFT ================= */}

        <div className="contact-info">

          <div className="contact-label">
            <span className="status-dot" />
            AVAILABLE FOR WORK
          </div>

          <h2>
            LET'S BUILD
            <span>SOMETHING</span>
            <strong>GREAT.</strong>
          </h2>

          <p className="contact-description">
            Have an idea, project or opportunity?
            <br />
            Let's turn it into something exceptional.
          </p>

          <a
            href=" mmuminovmustafo@gmail.com"
            className="email-link"
          >
           mmuminovmustafo@gmail.com
            <span>↗</span>
          </a>

          <div className="social-links">

            <a
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>

            <a
              href="https://www.instagram.com/muminov.__m/"
              target="_blank"
              rel="noreferrer"
            >
             Instagram
            </a>

            <a
              href="https://t.me/muminow"
              target="_blank"
              rel="noreferrer"
            >
              Telegram
            </a>

          </div>
        </div>

        {/* ================= RIGHT ================= */}

        <div className="contact-card">

          {/* TERMINAL HEADER */}

          <div className="card-top">

            <div className="terminal-controls">

              <span className="terminal-dot red" />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green" />

            </div>

            <span className="terminal-title">
              contact
            </span>

            <span className="terminal-status">
              ● ONLINE
            </span>

          </div>

          {/* FORM */}

          <form
            className="contact-form"
            onSubmit={(e) => e.preventDefault()}
          >

            <div className="input-group">

              <label>
                01 / NAME
              </label>

              <input
                type="text"
                placeholder="Your name..."
              />

            </div>

            <div className="input-group">

              <label>
                02 / EMAIL
              </label>

              <input
                type="email"
                placeholder="your@email.com"
              />

            </div>

            <div className="input-group message-group">

              <label>
                03 / MESSAGE
              </label>

              <textarea
                placeholder="Tell me about your project..."
                rows="5"
              />

            </div>

            <button
              type="submit"
              className="send-button"
            >

              <span>
                SEND MESSAGE
              </span>

              <span className="arrow">
                →
              </span>

            </button>

          </form>
        </div>
      </div>

      {/* WATERMARK */}

      <div className="contact-watermark">
        &lt;CONTACT /&gt;
      </div>

      {/* BOTTOM LINE */}

      <div className="scroll-line" />

    </section>
  );
}