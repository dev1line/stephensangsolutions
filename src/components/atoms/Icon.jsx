const Icon = ({ icon: IconComponent, className = '', size = 'md', ...props }) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }

  return (
    <IconComponent 
      className={`${sizeClasses[size]} ${className}`} 
      {...props}
    />
  )
}

export default Icon

