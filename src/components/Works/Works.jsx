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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="work-card-border" />

      {/* CARD HEADER */}
      <div className="work-card-header">
        <span className="work-project-number">{project.id}</span>
        <span className="work-project-category">{project.category}</span>
      </div>

      {/* REAL WEBSITE PREVIEW */}
      <div className="work-preview">
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
            <div className="iframe-wrapper">
              <iframe
                src={project.url}
                title={project.title}
                loading="lazy"
              />
            </div>
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
            background: `radial-gradient(circle, ${project.color}33, transparent 70%)`,
          }}
        />
      </div>

      {/* INFORMATION */}
      <div className="work-card-content">
        <div className="work-card-title">
          <h3>{project.title}</h3>
          <span>{project.subtitle}</span>
        </div>

        <p>{project.description}</p>

        <div className="work-card-bottom">
          <div className="project-status" style={{ color: project.color }}>
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
      <div className="work-grid" />
      <div className="work-glow work-glow-one" />
      <div className="work-glow work-glow-two" />

      <div className="work-container">
        <motion.div
          className="work-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="work-label">
            <span />
            SELECTED WORK
            <i />
            2024 — 2026
          </div>

          <h2>
            MY <span>WORKS.</span>
          </h2>

          <p>
            Digital products, platforms and experiences designed and developed
            with attention to interaction, performance and visual identity.
          </p>
        </motion.div>

        <div className="work-list">
          {WORKS.map((project, index) => (
            <WorkCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}