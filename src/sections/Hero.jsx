import { lazy, Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { profile } from '../data/content'

const ParticleField = lazy(() => import('../components/ParticleField'))

const lineUp = {
  hidden: { y: '115%', opacity: 0, filter: 'blur(18px)' },
  show: (i) => ({
    y: '0%',
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1, delay: 1.8 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero() {
  const [pointer, setPointer] = useState({ x: 50, y: 50 })

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    setPointer({ x, y })
  }

  return (
    <section
      id="top"
      onMouseMove={handleMove}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-void"
    >
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-90"
        style={{
          background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(76,124,255,0.16), transparent 25%)`,
        }}
      />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,#07080a_72%)]" />

      <motion.img
        src="/sri-vishnu-cutout.png"
        alt="Portrait of Sri Vishnu"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute z-[2] hidden -translate-x-1/2 -translate-y-1/2 select-none object-contain md:block"
        style={{ left: '63.1%', top: '54.2%', width: 'clamp(190px, 18vw, 320px)' }}
        draggable="false"
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="hero-meta mb-6"
          aria-label="Portfolio location header"
        >
          <motion.span
            initial={{ opacity: 0, x: -12, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="hero-meta__initials"
          >
            SV
          </motion.span>

          <motion.span
            initial={{ opacity: 0, scaleY: 0.5 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.5, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
            className="hero-meta__divider"
            aria-hidden="true"
          />

          <motion.span
            initial={{ opacity: 0, x: 18, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="hero-meta__location"
          >
            {profile.location.toUpperCase()} — PORTFOLIO
          </motion.span>
        </motion.div>

        <h1 className="font-display font-medium leading-[0.86] tracking-tightest text-bone uppercase">
          <span className="block overflow-hidden text-[14vw] md:text-[6.4vw]">
            <motion.span variants={lineUp} custom={1} initial="hidden" animate="show" className="block">
              SRI VISHNU
            </motion.span>
          </span>
          <span className="block overflow-hidden text-[14vw] md:text-[6.4vw]">
            <motion.span variants={lineUp} custom={2} initial="hidden" animate="show" className="block text-mist">
              PARUCHURU
            </motion.span>
          </span>
        </h1>

        <div className="mt-7 md:mt-10 grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div className="overflow-hidden max-w-xl">
            <motion.p
              variants={lineUp}
              custom={3}
              initial="hidden"
              animate="show"
              className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-signal uppercase"
            >
              Computer Science / Developer / Builder
            </motion.p>

            <motion.p
              variants={lineUp}
              custom={4}
              initial="hidden"
              animate="show"
              className="mt-4 text-mist text-base md:text-lg max-w-lg leading-relaxed"
            >
              {profile.tagline}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex md:justify-end"
          >
            <div className="flex flex-wrap gap-3 md:flex-col md:items-end">
              {['COMPUTER SCIENCE', 'DEVELOPER', 'BUILDER'].map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 2.1 + index * 0.12 }}
                  className="inline-flex items-center rounded-full border border-line bg-panel/40 px-3 py-1.5 font-mono text-[10px] tracking-[0.24em] text-bone uppercase backdrop-blur-sm"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="mt-10 md:mt-14 flex flex-wrap items-center gap-4"
        >
          <a
            data-cursor-hover
            data-cursor-label="VIEW PROJECT →"
            href="#work"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-5 py-3 text-sm font-medium text-bone transition-all duration-300 hover:-translate-y-0.5 hover:border-signal hover:bg-signal/10"
          >
            Explore my work
            <ArrowDown size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
          <a
            data-cursor-hover
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-mist transition-colors hover:text-bone"
          >
            Start a conversation
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="w-px h-10 bg-gradient-to-b from-transparent via-line to-transparent" />
      </motion.div>
    </section>
  )
}
