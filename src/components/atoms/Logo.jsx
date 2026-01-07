import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Logo = ({ className = '', showText = true, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16',
  }

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }

  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className={`${sizeClasses[size]} w-auto flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg px-2 shadow-lg`}
      >
        <span className="font-black text-white" style={{ fontSize: size === 'sm' ? '1rem' : size === 'md' ? '1.25rem' : size === 'lg' ? '1.5rem' : '2rem' }}>
          S²
        </span>
      </motion.div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent ${textSizes[size]}`}>
            S2 Solutions
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-300 -mt-1 hidden sm:block">
            StephenSangSolutions
          </span>
        </div>
      )}
    </Link>
  )
}

export default Logo

