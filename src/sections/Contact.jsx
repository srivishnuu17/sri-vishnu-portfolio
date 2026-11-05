import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, LoaderCircle, Mail, MapPin, Phone, Send } from 'lucide-react'
import { profile } from '../data/content'

const contactLinks = [
  {
    label: 'PHONE',
    value: profile.phone,
    href: `tel:${profile.phone}`,
    icon: Phone,
  },
  {
    label: 'EMAIL',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: 'GITHUB',
    value: profile.github,
    href: profile.github,
    icon: Github,
    external: true,
  },
  {
    label: 'LINKEDIN',
    value: profile.linkedin,
    href: profile.linkedin,
    icon: Linkedin,
    external: true,
  },
]

export default function Contact() {
  const [formState, setFormState] = useState('idle')
  const [formMessage, setFormMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    if (formState === 'sending') return

    const form = event.currentTarget
    const formData = new FormData(form)
    setFormState('sending')
    setFormMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok) throw new Error(result.error || 'Your message could not be sent. Please try again.')

      form.reset()
      setFormState('success')
      setFormMessage('Thanks for reaching out. Your message has been sent.')
    } catch (error) {
      setFormState('error')
      setFormMessage(error.message || 'Your message could not be sent. Please try again.')
    }
  }

  return (
    <section id="contact" className="relative bg-void py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_100%,rgba(76,124,255,0.09),transparent_62%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7 }}
          className="mb-8 font-mono text-xs tracking-[0.3em] text-mist uppercase"
        >
          05 / 06
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-7xl tracking-tightest text-bone uppercase"
        >
          SRI VISHNU PARUCHURU
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 flex items-center gap-3 text-mist"
        >
          <MapPin size={16} className="text-signal" />
          <span className="font-mono text-xs tracking-[0.22em] uppercase">{profile.location}</span>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {contactLinks.map(({ label, value, href, icon: Icon, external }, index) => (
            <motion.a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              data-cursor-hover
              data-cursor-label="OPEN →"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="contact-card group"
            >
              <div className="contact-card__icon">
                <Icon size={18} />
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.24em] text-mist uppercase">{label}</p>
                <p className="mt-3 text-lg md:text-xl text-bone transition-colors group-hover:text-signal">
                  {value}
                </p>
              </div>
              <ArrowUpRight size={18} className="ml-auto text-mist transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" />
            </motion.a>
          ))}
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="contact-form mt-10"
        >
          <div className="mb-7">
            <p className="font-mono text-[10px] tracking-[0.24em] text-signal uppercase">SEND A MESSAGE</p>
            <h3 className="mt-3 text-2xl text-bone">Have a project in mind?</h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="contact-field">
              <span>Your name</span>
              <input name="name" type="text" autoComplete="name" maxLength={100} required placeholder="Jane Smith" />
            </label>
            <label className="contact-field">
              <span>Email address</span>
              <input name="email" type="email" autoComplete="email" maxLength={254} required placeholder="jane@example.com" />
            </label>
          </div>
          <label className="contact-field mt-5">
            <span>Message</span>
            <textarea name="message" rows={5} maxLength={5000} required placeholder="Tell me a little about what you’re working on…" />
          </label>
          <label className="contact-honeypot" aria-hidden="true" tabIndex={-1}>
            Leave this field empty
            <input name="website" type="text" autoComplete="off" tabIndex={-1} />
          </label>
          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <button type="submit" disabled={formState === 'sending'} className="contact-submit" data-cursor-hover>
              {formState === 'sending' ? <LoaderCircle size={16} className="animate-spin" /> : <Send size={15} />}
              {formState === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            <p role="status" aria-live="polite" className={`contact-status contact-status--${formState}`}>
              {formMessage}
            </p>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 md:mt-18 flex justify-center"
        >
          <a
            data-cursor-hover
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-6 py-3.5 text-sm font-medium text-bone transition-all hover:-translate-y-0.5 hover:border-signal hover:bg-signal/10"
          >
            Start a conversation
            <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>

      <footer className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 mt-20 pt-8 border-t border-line flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-mist font-mono">
        <span>© {new Date().getFullYear()} {profile.firstName} {profile.lastName}</span>
        <span>Designed &amp; built with intention</span>
      </footer>
    </section>
  )
}
