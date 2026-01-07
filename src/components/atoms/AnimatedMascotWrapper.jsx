import { motion } from 'framer-motion'
import { useState } from 'react'
import MascotIcon from './MascotIcon'

const AnimatedMascotWrapper = ({ size = 100, variant = 'default' }) => {
  const [isHovered, setIsHovered] = useState(false)

  // Idle animations - animation tại chỗ với zigzag đầu
  const idleAnimations = {
    hero: {
      y: [0, -8, 0],
      rotate: [0, 8, -8, 8, -8, 0], // Zigzag đầu
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    about: {
      y: [0, -6, 0],
      scale: [1, 1.05, 1],
      rotate: [0, 6, -6, 6, -6, 0], // Zigzag đầu
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    skills: {
      y: [0, -5, 0],
      rotate: [0, 5, -5, 5, -5, 0], // Zigzag đầu
      transition: {
        duration: 2.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    experience: {
      y: [0, -4, 0],
      rotate: [0, 4, -4, 4, -4, 0], // Zigzag đầu
      transition: {
        duration: 3.2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    projects: {
      y: [0, -10, 0],
      rotate: [0, 10, -10, 10, -10, 0], // Zigzag đầu
      transition: {
        duration: 2.2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    contact: {
      y: [0, -7, 0],
      scale: [1, 1.03, 1],
      rotate: [0, 7, -7, 7, -7, 0], // Zigzag đầu
      transition: {
        duration: 2.7,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    default: {
      y: [0, -5, 0],
      rotate: [0, 5, -5, 5, -5, 0], // Zigzag đầu
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  // Hover animations - tương tác khi hover
  const hoverAnimations = {
    hero: {
      rotate: 360,
      scale: 1.2,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    },
    about: {
      // Tung hoa - tạo hiệu ứng hoa rơi
      y: -20,
      scale: 1.15,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    skills: {
      // Lắc đầu
      rotate: [-15, 15, -15, 15, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    },
    experience: {
      // Cười to - scale up với bounce
      scale: [1, 1.3, 1.2],
      y: -10,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    projects: {
      // Xoay vòng tròn
      rotate: 360,
      scale: 1.25,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    },
    contact: {
      // Vẫy tay chào - lắc qua lại
      rotate: [-20, 20, -20, 20, 0],
      y: -15,
      transition: {
        duration: 0.7,
        ease: "easeInOut"
      }
    },
    default: {
      scale: 1.1,
      transition: {
        duration: 0.3
      }
    }
  }

  const idleAnimation = idleAnimations[variant] || idleAnimations.default
  const hoverAnimation = hoverAnimations[variant] || hoverAnimations.default

  // Màu sắc cho các chấm bi
  const dotColors = [
    "#fbbf24", // vàng
    "#f97316", // cam
    "#3b82f6", // xanh dương
    "#10b981", // xanh lá
    "#8b5cf6", // tím
    "#ec4899", // hồng
    "#ef4444", // đỏ
    "#06b6d4", // cyan
  ]

  return (
    <motion.div
      className="cursor-pointer relative"
      animate={!isHovered ? idleAnimation : {}}
      whileHover={hoverAnimation}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ display: 'inline-block', width: size, height: size }}
    >
      {/* Các chấm bi tròn di chuyển xung quanh */}
      {[...Array(6)].map((_, i) => {
        const angle = (i * 360) / 6
        const radius = size * 0.6
        const colorIndex = i % dotColors.length
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: size * 0.08,
              height: size * 0.08,
              left: '50%',
              top: '50%',
              transformOrigin: '0 0'
            }}
            animate={{
              x: [
                Math.cos((angle * Math.PI) / 180) * radius,
                Math.cos(((angle + 360) * Math.PI) / 180) * radius,
              ],
              y: [
                Math.sin((angle * Math.PI) / 180) * radius,
                Math.sin(((angle + 360) * Math.PI) / 180) * radius,
              ],
              backgroundColor: dotColors.map((_, idx) => 
                dotColors[(colorIndex + idx) % dotColors.length]
              ),
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + (i * 0.2),
              repeat: Infinity,
              ease: "linear",
              backgroundColor: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        )
      })}
      {/* Flowers animation cho About variant khi hover */}
      {variant === 'about' && isHovered && (
        <div className="absolute inset-0 pointer-events-none" style={{ width: size, height: size }}>
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8
            const radius = size * 0.4
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: '0 0'
                }}
                initial={{ 
                  opacity: 0, 
                  x: 0, 
                  y: 0,
                  rotate: 0,
                  scale: 0
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  x: Math.cos((angle * Math.PI) / 180) * radius,
                  y: Math.sin((angle * Math.PI) / 180) * radius - 10,
                  rotate: 360 + (i * 45),
                  scale: [0, 1.2, 1, 0]
                }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.05,
                  ease: "easeOut"
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="6" fill="#fbbf24" opacity="0.9" />
                  <circle cx="5.5" cy="5.5" r="2.5" fill="#f97316" opacity="0.7" />
                  <circle cx="10.5" cy="5.5" r="2.5" fill="#f97316" opacity="0.7" />
                  <circle cx="5.5" cy="10.5" r="2.5" fill="#f97316" opacity="0.7" />
                  <circle cx="10.5" cy="10.5" r="2.5" fill="#f97316" opacity="0.7" />
                </svg>
              </motion.div>
            )
          })}
        </div>
      )}
      
      <MascotIcon size={size} variant={variant} smileAnimation={!isHovered} />
    </motion.div>
  )
}

export default AnimatedMascotWrapper

