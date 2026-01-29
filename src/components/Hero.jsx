import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { HiDownload } from 'react-icons/hi'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../locales'
import Button from './atoms/Button'
import Icon from './atoms/Icon'
import AnimatedMascotWrapper from './atoms/AnimatedMascotWrapper'

const Hero = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const sectionRef = useRef(null)
  const virusLayerRef = useRef(null)
  const [virusVisible, setVirusVisible] = useState(true)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setVirusVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: '-15% 0px -15% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!virusVisible || !virusLayerRef.current) return
    const isMobile = () => window.matchMedia('(max-width: 768px)').matches
    const syncShieldCy = () => {
      if (!isMobile()) {
        virusLayerRef.current.style.removeProperty('--shield-cy')
        return
      }
      const shield = document.getElementById('forcefield')
      if (!shield) return
      const r = shield.getBoundingClientRect()
      const cy = r.top + r.height / 2 - 15
      virusLayerRef.current.style.setProperty('--shield-cy', `${cy}px`)
    }
    const raf = requestAnimationFrame(() => syncShieldCy())
    window.addEventListener('resize', syncShieldCy)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', syncShieldCy)
    }
  }, [virusVisible])

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/dev1line', label: 'GitHub', external: true },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/wuansan', label: 'LinkedIn', external: true },
    { icon: FaEnvelope, href: '#contact', label: 'Email', external: false },
  ]

  return (
    <section ref={sectionRef} id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 pt-16 relative overflow-hidden">
      {/* Virus chỉ hiện trong home section; ẩn khi scroll sang section khác */}
      <div ref={virusLayerRef} className={`virus-layer absolute inset-0 pointer-events-none ${virusVisible ? '' : 'virus-layer--hidden'}`} aria-hidden="true">
        <div className="virus virus-from-tl" style={{ animationDelay: '0s' }} />
        <div className="virus virus-from-tr" style={{ animationDelay: '0.4s' }} />
        <div className="virus virus-from-bl" style={{ animationDelay: '0.8s' }} />
        <div className="virus virus-from-br" style={{ animationDelay: '0.2s' }} />
        <div className="virus virus-from-left" style={{ animationDelay: '0.6s' }} />
        <div className="virus virus-from-right" style={{ animationDelay: '1s' }} />
        <div className="virus virus-from-top" style={{ animationDelay: '0.3s' }} />
        <div className="virus virus-from-bottom" style={{ animationDelay: '0.7s' }} />
        <div className="virus virus-from-a1" style={{ animationDelay: '0.1s' }} />
        <div className="virus virus-from-a2" style={{ animationDelay: '0.5s' }} />
        <div className="virus virus-from-a3" style={{ animationDelay: '0.9s' }} />
        <div className="virus virus-from-a4" style={{ animationDelay: '0.25s' }} />
        <div className="virus virus-from-a5" style={{ animationDelay: '0.55s' }} />
        <div className="virus virus-from-a6" style={{ animationDelay: '1.15s' }} />
        <div className="virus virus-from-a7" style={{ animationDelay: '0.35s' }} />
        <div className="virus virus-from-a8" style={{ animationDelay: '0.75s' }} />
      </div>
      <div className="section-container text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center mb-4"
          >
            {/* Mascot area với shield forcefield background */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="mascot-area mb-4 relative inline-block scale-90 sm:scale-95 md:scale-100"
            >
              <div className="shield-forcefield" id="forcefield" aria-hidden="true" />
              <div className="relative z-10">
                <AnimatedMascotWrapper size={200} variant="hero" />
              </div>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-slate-100">
              {t.hero.greeting}{' '}
              <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                {t.hero.name}
              </span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-slate-200 mb-6 md:mb-8"
          >
            {t.hero.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-500 dark:text-slate-300 max-w-2xl mx-auto mb-12"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button href="#contact">
              {t.hero.contactMe}
            </Button>
            <Button
              variant="secondary"
              href="/Stephen-Sang-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <HiDownload className="inline mr-2" />
              {t.hero.downloadCV}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center gap-6"
          >
            {socialLinks.map(({ icon, href, label, external }) => (
              <a
                key={label}
                href={href}
                {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                className="text-gray-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                aria-label={label}
              >
                <Icon icon={icon} size="xl" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
