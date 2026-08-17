import { motion } from "framer-motion";
import WORKS from "./workData";
import "./Works.css";

function WorkCard({ project, index }) {
  return (
    <motion.article
      className="work-card"
      style={{
        "--project-color": project.color,
        "--project-bg": project.background,
        "--project-text": project.textColor,
      }}
      initial={{
        opacity: 0,
        y: 100,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -8,
      }}
    >
      <div className="work-card-border" />

      {/* CARD HEADER */}
      <div className="work-card-header">
        <div className="work-project-number">
          {project.id}
        </div>

        <div className="work-project-category">
          {project.category}
        </div>
      </div>

      {/* REAL WEBSITE PREVIEW */}
      <div
        className="work-preview"
        style={{
          background: project.background,
        }}
      >
        <div className="preview-topbar">
          <div className="preview-dots">
            <span />
            <span />
            <span />
          </div>

          <div className="preview-url">
            {project.url !== "#"
              ? project.url.replace("https://", "")
              : "PRIVATE PROJECT"}
          </div>
        </div>

        <div className="preview-screen">
          {project.url !== "#" ? (
            <iframe
              src={project.url}
              title={project.title}
              loading="lazy"
            />
          ) : (
            <div className="private-project">
              <span>PRIVATE</span>
              <strong>CARBON CASE</strong>
              <small>PROJECT PREVIEW</small>
            </div>
          )}
        </div>

        <div
          className="preview-glow"
          style={{
            background: `radial-gradient(circle, ${project.color}22, transparent 65%)`,
          }}
        />
      </div>

      {/* INFORMATION */}
      <div className="work-card-content">

        <div className="work-card-title">
          <h3>
            {project.title}
          </h3>

          <span>
            {project.subtitle}
          </span>
        </div>

        <p>
          {project.description}
        </p>

        <div className="work-card-bottom">

          <div
            className="project-status"
            style={{
              color: project.color,
            }}
          >
            <span />
            LIVE PROJECT
          </div>

          {project.url !== "#" && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-view"
              style={{
                borderColor: `${project.color}55`,
                color: project.color,
              }}
            >
              VIEW PROJECT
              <span>↗</span>
            </a>
          )}

        </div>
      </div>
    </motion.article>
  );
}

export default function Work() {
  return (
    <section className="work-section" id="work">

      {/* BACKGROUND */}
      <div className="work-grid" />
      <div className="work-glow work-glow-one" />
      <div className="work-glow work-glow-two" />

      <div className="work-container">

        {/* HEADER */}
        <motion.div
          className="work-header"
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
        >
          <div className="work-label">
            <span />
            SELECTED WORK
            <i />
            2024 — 2026
          </div>

          <h2>
            MY
            <span>WORKS.</span>
          </h2>

          <p>
            Digital products, platforms and experiences
            designed and developed with attention to
            interaction, performance and visual identity.
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="work-list">
          {WORKS.map((project, index) => (
            <WorkCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}