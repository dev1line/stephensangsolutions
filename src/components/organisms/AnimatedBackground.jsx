import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Logo from '../atoms/Logo'

const AnimatedBackground = ({ showLogo = true }) => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll()

  // Parallax transforms for logo with zoom in effect (going deeper)
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -150])
  const logoOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [1, 0.9, 0.5, 0.2, 0])
  // Zoom in effect - scale increases as you scroll (going deeper into logo)
  const logoScale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 1.8, 3, 5])

  // Background gradient position
  const gradientX = useTransform(scrollYProgress, [0, 1], [0, 50])
  const gradientY = useTransform(scrollYProgress, [0, 1], [0, 30])

  // Decorative circles
  const circle1X = useTransform(scrollYProgress, [0, 1], [0, 100])
  const circle1Y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const circle2X = useTransform(scrollYProgress, [0, 1], [0, -150])
  const circle2Y = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-50/40 via-orange-100/30 to-orange-50/40 dark:from-indigo-950/30 dark:via-slate-900/20 dark:to-indigo-950/30"
        style={{
          backgroundSize: '200% 200%',
        }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 12 }).map((_, i) => {
        const baseX = (i * 8.33) % 100
        const baseY = (i * 12.5) % 100
        const particleX = useTransform(scrollYProgress, [0, 1], [baseX, baseX + 25])
        const particleY = useTransform(scrollYProgress, [0, 1], [baseY, baseY - 15])
        const particleOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.5, 0.1])
        
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary-400/20 blur-sm"
            style={{
              left: useTransform(particleX, (x) => `${x}%`),
              top: useTransform(particleY, (y) => `${y}%`),
              opacity: particleOpacity,
            }}
          />
        )
      })}

      {/* Central Logo with zoom in depth effect - only on home page */}
      {showLogo && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center"
          style={{
            y: logoY,
            opacity: logoOpacity,
            scale: logoScale,
          }}
        >
          <div className="pointer-events-none">
            <Logo size="xl" showText={true} className="drop-shadow-2xl" />
          </div>
        </motion.div>
      )}


      {/* Decorative circles */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 rounded-full border-2 border-primary-300/15 blur-2xl"
        style={{
          x: circle1X,
          y: circle1Y,
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 rounded-full border-2 border-primary-400/15 blur-2xl"
        style={{
          x: circle2X,
          y: circle2Y,
        }}
      />
    </div>
  )
}

export default AnimatedBackground
