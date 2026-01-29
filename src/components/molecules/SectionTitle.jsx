import { motion } from 'framer-motion'
import AnimatedMascotWrapper from '../atoms/AnimatedMascotWrapper'

const SectionTitle = ({ children, mascotPosition = 'right', variant = 'default', ...props }) => {
  const isLeft = mascotPosition === 'left'
  const isRight = mascotPosition === 'right'

  // Tách className và các props khác
  const { className = '', ...motionProps } = props

  return (
    <motion.h2
      {...motionProps}
      className={`section-title flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 ${className}`}
    >
      {isLeft && (
        <div className="flex-shrink-0 relative scale-90 sm:scale-95 md:scale-100 origin-center">
          <AnimatedMascotWrapper size={160} variant={variant} />
        </div>
      )}
      <span className="text-center">{children}</span>
      {isRight && (
        <div className="flex-shrink-0 relative scale-90 sm:scale-95 md:scale-100 origin-center">
          <AnimatedMascotWrapper size={160} variant={variant} />
        </div>
      )}
    </motion.h2>
  )
}

export default SectionTitle

