import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  href,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center'
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'bg-transparent text-primary-600 border-2 border-primary-600 hover:bg-primary-50',
    ghost: 'bg-transparent text-primary-600 hover:bg-primary-50',
  }

  const classes = `${baseClasses} ${variants[variant]} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={classes}
        {...props}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={classes}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button

