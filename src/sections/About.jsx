import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profile } from '../data/content'

const sentences = profile.bio
  .split(/(?<=[.])\s+/)
  .filter(Boolean)

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.4'],
  })

  return (
    <section id="about" ref={ref} className="relative bg-void py-32 md:py-44">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex items-baseline justify-between mb-16 md:mb-24">
          <h2 className="font-display text-3xl md:text-5xl tracking-tightest text-bone max-w-xl">
            The person behind the code
          </h2>
          <span className="hidden md:block font-mono text-xs text-mist">02 / 06</span>
        </div>

        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-8">
            <p className="font-display text-2xl md:text-4xl leading-[1.35] tracking-tight">
              {sentences.map((sentence, i) => {
                const start = i / sentences.length
                const end = start + 1 / sentences.length
                return (
                  <Sentence key={i} progress={scrollYProgress} start={start} end={end}>
                    {sentence + ' '}
                  </Sentence>
                )
              })}
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col justify-center gap-1">
            {profile.identities.map((id, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4 py-3 border-b border-line last:border-none"
              >
                <span className="font-mono text-xs text-signal">0{i + 1}</span>
                <span className="font-display text-lg md:text-xl text-mist">{id}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Sentence({ children, progress, start, end }) {
  const opacity = useTransform(progress, [start, end], [0.18, 1])
  const color = useTransform(
    progress,
    [start, end],
    ['rgb(138,144,160)', 'rgb(236,238,242)']
  )
  return (
    <motion.span style={{ opacity, color }}>
      {children}
    </motion.span>
  )
}
