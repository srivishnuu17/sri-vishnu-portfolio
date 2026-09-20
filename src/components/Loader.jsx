import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onDone }) {
  const [exit, setExit] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setExit(true), 1850)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (exit) {
      const timeout = setTimeout(onDone, 500)
      return () => clearTimeout(timeout)
    }
  }, [exit, onDone])

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          className="fixed inset-0 z-[90] bg-[#05070a] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(76,124,255,0.08),transparent_48%)]" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.p
              initial={{ opacity: 0, filter: 'blur(18px)', y: 16 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-[10px] md:text-xs tracking-[0.42em] text-mist uppercase"
            >
              INITIALIZING EXPERIENCE...
            </motion.p>

            <div className="mt-8 flex flex-col items-center gap-3">
              <motion.span
                initial={{ opacity: 0, filter: 'blur(14px)', y: 40, clipPath: 'inset(0 0 100% 0)' }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0, clipPath: 'inset(0 0 0% 0)' }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl md:text-7xl tracking-tightest text-bone uppercase"
              >
                SRI VISHNU
              </motion.span>

              <motion.span
                initial={{ opacity: 0, filter: 'blur(14px)', y: 38, clipPath: 'inset(0 0 100% 0)' }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0, clipPath: 'inset(0 0 0% 0)' }}
                transition={{ duration: 0.95, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl md:text-7xl tracking-tightest text-mist uppercase"
              >
                PARUCHURU
              </motion.span>
            </div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0.2 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 h-px w-32 md:w-40 bg-gradient-to-r from-transparent via-signal to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
