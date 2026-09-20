import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { nav } from '../data/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = nav.map((n) => document.querySelector(n.href)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const goTo = (href) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ${
        scrolled ? 'bg-void/80 backdrop-blur-md border-b border-line' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <button
          data-cursor-hover
          onClick={() => goTo('#top')}
          className="font-display text-lg tracking-tight text-bone"
        >
          SV
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <button
              key={item.href}
              data-cursor-hover
              onClick={() => goTo(item.href)}
              className={`relative text-sm font-medium transition-colors ${
                active === item.href ? 'text-bone' : 'text-mist hover:text-bone'
              }`}
            >
              {item.label}
              {active === item.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1.5 left-0 right-0 h-px bg-signal"
                />
              )}
            </button>
          ))}
        </nav>

        <button
          data-cursor-hover
          onClick={() => setOpen((o) => !o)}
          className="md:hidden flex flex-col gap-1.5 w-7"
          aria-label="Toggle menu"
        >
          <span className={`h-px bg-bone transition-transform ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
          <span className={`h-px bg-bone transition-transform ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-void border-b border-line px-6 pb-6 flex flex-col gap-4"
        >
          {nav.map((item) => (
            <button
              key={item.href}
              onClick={() => goTo(item.href)}
              className="text-left text-mist py-2 text-base"
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.header>
  )
}
