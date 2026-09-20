import { useState } from 'react'
import Loader from './components/Loader'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Journey from './sections/Journey'
import Contact from './sections/Contact'
import useLenis from './hooks/useLenis'

export default function App() {
  const [loading, setLoading] = useState(true)
  useLenis()

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <div className="noise-layer" />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main className="bg-void">
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Journey />
        <Contact />
      </main>
    </>
  )
}
