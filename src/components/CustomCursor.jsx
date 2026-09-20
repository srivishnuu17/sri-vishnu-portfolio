import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) return

    const dot = dotRef.current
    const ring = ringRef.current
    const labelEl = labelRef.current
    let ringX = 0
    let ringY = 0
    let target = { clientX: 0, clientY: 0 }
    let raf

    const onMove = (e) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      target = e
    }

    const animateRing = () => {
      ringX += (target.clientX - ringX) * 0.18
      ringY += (target.clientY - ringY) * 0.18
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      labelEl.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(animateRing)
    }

    const onOver = (e) => {
      const targetEl = e.target.closest('[data-cursor-hover]')
      if (targetEl) {
        ring.classList.add('is-active')
        const customLabel = targetEl.dataset.cursorLabel || ''
        setLabel(customLabel)
      }
    }

    const onOut = (e) => {
      const targetEl = e.target.closest('[data-cursor-hover]')
      if (targetEl) {
        ring.classList.remove('is-active')
        setLabel('')
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)
    raf = requestAnimationFrame(animateRing)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={labelRef} className={`cursor-label ${label ? 'is-visible' : ''}`}>
        {label}
      </div>
    </>
  )
}
