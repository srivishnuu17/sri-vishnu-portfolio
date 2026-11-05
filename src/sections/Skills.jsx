import { useState } from 'react'
import { motion } from 'framer-motion'
import { techNodes } from '../data/content'

export default function Skills() {
  const [active, setActive] = useState(null)
  const radius = 42 // percent of container
  const activeNode = techNodes.find((node) => node.name === active)

  return (
    <section id="skills" className="relative bg-void py-32 md:py-44 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex items-baseline justify-between mb-16 md:mb-20">
          <h2 className="font-display text-3xl md:text-5xl tracking-tightest text-bone">
            Tech universe
          </h2>
          <span className="hidden md:block font-mono text-xs text-mist">03 / 06</span>
        </div>
        <p className="text-mist max-w-md mb-16 md:mb-0">
          Languages, tools, backend frameworks, and deployment technology I use.
        </p>
      </div>

      <div className="relative mx-auto max-w-3xl aspect-square mt-8 md:mt-4">
        {/* connecting lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {techNodes.map((node, i) => {
            const angle = (i / techNodes.length) * Math.PI * 2 - Math.PI / 2
            const x = 50 + radius * Math.cos(angle)
            const y = 50 + radius * Math.sin(angle)
            const isActive = active === node.name
            return (
              <line
                key={node.name}
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke={isActive ? '#4c7cff' : '#20242c'}
                strokeWidth={isActive ? 0.4 : 0.2}
                style={{ transition: 'stroke 0.3s ease' }}
              />
            )
          })}
        </svg>

        {/* center node */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full border border-line bg-panel/60 backdrop-blur-sm">
          <span className="font-display text-sm md:text-base text-bone tracking-tight">SV</span>
          <span className="font-mono text-[9px] text-mist mt-1">core</span>
        </div>

        {/* orbit nodes */}
        {techNodes.map((node, i) => {
          const angle = (i / techNodes.length) * Math.PI * 2 - Math.PI / 2
          const x = 50 + radius * Math.cos(angle)
          const y = 50 + radius * Math.sin(angle)
          const isActive = active === node.name

          return (
            <motion.button
              key={node.name}
              aria-pressed={isActive}
              data-cursor-hover
              onMouseEnter={() => setActive(node.name)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(node.name)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(active === node.name ? null : node.name)}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              animate={{
                y: [0, i % 2 === 0 ? -4 : 4, 0],
              }}
              style={{
                left: `${x}%`,
                top: `${y}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            >
              <motion.span
                animate={{
                  scale: isActive ? 1.35 : 1,
                  backgroundColor: isActive ? 'rgba(76,124,255,0.12)' : 'rgba(18,20,25,0.7)',
                  borderColor: isActive ? '#4c7cff' : '#20242c',
                }}
                transition={{ duration: 0.25 }}
                className="whitespace-nowrap px-3 py-2 md:px-4 md:py-2.5 rounded-full border text-xs md:text-sm font-medium text-bone"
              >
                {node.name}
              </motion.span>
            </motion.button>
          )
        })}
      </div>

      {/* context readout */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 mt-8 h-10 flex items-center justify-center text-center">
        <motion.p
          key={active || 'empty'}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="font-mono text-xs md:text-sm text-mist"
        >
          {activeNode && (
            <>
              <span className="text-signal">{activeNode.category}</span>
              <span className="mx-2 text-line" aria-hidden="true">/</span>
              {activeNode.context}
            </>
          )}
        </motion.p>
      </div>
    </section>
  )
}
