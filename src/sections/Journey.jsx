import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { education, journeySteps } from '../data/content'

function Counter({ to, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(to * eased)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to])

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export default function Journey() {
  return (
    <section id="journey" className="relative bg-void py-32 md:py-44">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex items-baseline justify-between mb-16 md:mb-24">
          <h2 className="font-display text-3xl md:text-5xl tracking-tightest text-bone">
            Journey so far
          </h2>
          <span className="hidden md:block font-mono text-xs text-mist">04 / 06</span>
        </div>

        <div className="mb-16 md:mb-20">
          <div className="timeline-track">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="timeline-node"
              >
                <span className="timeline-year">{index === 0 ? '2025' : step}</span>
                {index < journeySteps.length - 1 && <span className="timeline-arrow">↓</span>}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="relative pl-8">
              <span className="absolute left-0 top-1 w-2 h-2 rounded-full bg-signal" />
              <span className="absolute left-[3px] top-4 bottom-0 w-px bg-line" />
              <span className="font-mono text-xs text-signal">{education.period}</span>
              <h3 className="font-display text-2xl md:text-3xl text-bone mt-2 tracking-tight">
                {education.university}
              </h3>
              <p className="text-mist mt-2">{education.degree}</p>
            </div>

            <div className="pl-8 mt-10">
              <span className="font-mono text-xs text-mist tracking-wider">COURSEWORK</span>
              <ul className="mt-4 grid grid-cols-1 gap-2">
                {education.coursework.map((c) => (
                  <li key={c} className="text-sm text-mist border-b border-line pb-2">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-3 gap-4 md:gap-6 content-start">
            <Stat value={<Counter to={education.cgpa} decimals={1} />} suffix="/ 10" label="CGPA" />
            <Stat value={<Counter to={education.classXII} decimals={1} suffix="%" />} label="CLASS XII" />
            <Stat value={<Counter to={education.classX} decimals={1} suffix="%" />} label="CLASS X" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ value, suffix, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6 }}
      className="border border-line bg-panel/20 p-5 md:p-6 flex flex-col gap-2"
    >
      <span className="font-display text-3xl md:text-4xl text-bone tracking-tight">
        {value}
        {suffix && <span className="text-mist text-lg ml-1">{suffix}</span>}
      </span>
      <span className="font-mono text-[10px] text-mist tracking-wider">{label}</span>
    </motion.div>
  )
}
