import { motion } from 'framer-motion'
import { useState } from 'react'
import MascotIcon from './MascotIcon'

const AnimatedMascotWrapper = ({ size = 200, variant = 'default' }) => {
  const [isHovered, setIsHovered] = useState(false)

  const idleAnimation = {
    y: [0, -6, 0],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
  }

  const hoverAnimation = {
    scale: 1.1,
    y: -8,
    transition: { duration: 0.3, ease: 'easeOut' },
  }

  return (
    <motion.div
      className="cursor-pointer inline-block"
      animate={!isHovered ? idleAnimation : {}}
      whileHover={hoverAnimation}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ width: size, height: size }}
    >
      <MascotIcon size={size} variant={variant} />
    </motion.div>
  )
}

export default AnimatedMascotWrapper
