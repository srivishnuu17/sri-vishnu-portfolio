import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/content'

export default function Projects() {
  return (
    <section id="work" className="relative bg-void py-32 md:py-44">
      <div className="max-w-6xl mx-auto px-6 md:px-10 mb-20 md:mb-28">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-3xl md:text-5xl tracking-tightest text-bone">
            Selected work
          </h2>
          <span className="hidden md:block font-mono text-xs text-mist">01 / 06</span>
        </div>
      </div>

      <div className="flex flex-col">
        {projects.map((project, i) => (
          <Chapter key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}

function Chapter({ project, index }) {
  const isEven = index % 2 === 0

  return (
    <div className="relative border-t border-line py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 font-mono text-xs text-signal mb-6"
        >
          <span>PROJECT {project.id}</span>
          <span className="text-line">/</span>
          <span className="text-mist">{project.code}</span>
        </motion.div>

        <div className={`grid md:grid-cols-12 gap-10 md:gap-16 items-start ${isEven ? '' : 'md:[direction:rtl]'}`}>
          <div className={`md:col-span-7 ${isEven ? '' : 'md:[direction:ltr]'}`}>
            <RevealTitle title={project.title} />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-display text-lg md:text-xl text-mist mt-3 mb-6"
            >
              {project.subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-mist max-w-lg leading-relaxed"
            >
              {project.description}
            </motion.p>

            {project.flow && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-wrap items-center gap-2 mt-8"
              >
                {project.flow.map((step, i) => (
                  <span key={step} className="flex items-center gap-2">
                    <span className="font-mono text-xs px-3 py-1.5 border border-line rounded-full text-bone">
                      {step}
                    </span>
                    {i < project.flow.length - 1 && <span className="text-line text-xs">→</span>}
                  </span>
                ))}
              </motion.div>
            )}

            {project.id === '01' && (
              <a
                data-cursor-hover
                data-cursor-label="OPEN →"
                href="https://github.com/srivishnuu17"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-bone mt-10 border-b border-line pb-1 hover:border-signal transition-colors"
              >
                View on GitHub
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>

          <div className={`md:col-span-5 ${isEven ? '' : 'md:[direction:ltr]'}`}>
            {project.id === '01' ? (
              <div className="project-visual project-visual--meal">
                <div className="project-panel uppercase">
                  <span>PROBLEM</span>
                  <p>{project.problem}</p>
                </div>
                <div className="project-panel uppercase">
                  <span>SOLUTION</span>
                  <p>{project.solution}</p>
                </div>
                <div className="project-panel uppercase">
                  <span>TECHNOLOGY</span>
                  <div className="project-tags">
                    {project.technology.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
                <div className="project-panel uppercase">
                  <span>FEATURES</span>
                  <ul>
                    {project.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="project-visual">
                <div className="project-window">
                  <div className="project-window__header">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="project-window__body">
                    <div className="project-window__label">{project.code}</div>
                    <div className="project-window__stack">
                      {project.stack.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                    <ul>
                      {project.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function RevealTitle({ title }) {
  return (
    <div className="overflow-hidden">
      <motion.h3
        initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
        whileInView={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-5xl md:text-7xl tracking-tightest text-bone"
      >
        {title}
      </motion.h3>
    </div>
  )
}
