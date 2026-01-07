import { motion } from 'framer-motion'

const MascotIcon = ({ size = 100, variant = 'default', smileAnimation = false }) => {
  // Các variant khác nhau
  const variants = {
    // Hero: Vui vẻ, chào hỏi - nụ cười lớn, mắt sáng
    hero: {
      smile: "M 38 75 Q 60 90 82 75",
      eyeSize: 8,
      pupilOffset: 0,
      sparkles: true,
      sparkleColor: "#fbbf24",
    },
    // About: Thân thiện - nụ cười ấm áp
    about: {
      smile: "M 40 73 Q 60 88 80 73",
      eyeSize: 7,
      pupilOffset: 0,
      sparkles: true,
      sparkleColor: "#fbbf24",
    },
    // Skills: Tự tin, chuyên nghiệp - mắt sáng, nụ cười tự tin
    skills: {
      smile: "M 42 72 Q 60 85 78 72",
      eyeSize: 7.5,
      pupilOffset: 1,
      sparkles: true,
      sparkleColor: "#3b82f6",
      hasGlasses: true,
    },
    // Experience: Nghiêm túc, chuyên nghiệp - nụ cười nhẹ
    experience: {
      smile: "M 44 74 Q 60 82 76 74",
      eyeSize: 7,
      pupilOffset: 0,
      sparkles: false,
      sparkleColor: "#64748b",
    },
    // Projects: Sáng tạo, hào hứng - mắt to, nụ cười rộng
    projects: {
      smile: "M 38 70 Q 60 88 82 70",
      eyeSize: 8.5,
      pupilOffset: -1,
      sparkles: true,
      sparkleColor: "#f59e0b",
    },
    // Contact: Thân thiện, chào tạm biệt - nụ cười ấm áp
    contact: {
      smile: "M 40 73 Q 60 88 80 73",
      eyeSize: 7,
      pupilOffset: 0,
      sparkles: true,
      sparkleColor: "#10b981",
    },
    // Default
    default: {
      smile: "M 42 72 Q 60 85 78 72",
      eyeSize: 7,
      pupilOffset: 0,
      sparkles: true,
      sparkleColor: "#fbbf24",
    },
  }

  const config = variants[variant] || variants.default
  const uniqueId = `mascot-${variant}-${Math.random().toString(36).substr(2, 9)}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-2xl">
      <defs>
        <linearGradient id={`mascotGradient-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <filter id={`glow-${uniqueId}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Main body */}
      <circle cx="60" cy="60" r="45" fill={`url(#mascotGradient-${uniqueId})`} filter={`url(#glow-${uniqueId})`} />
      
      {/* Eyes */}
      <circle cx="50" cy="55" r={config.eyeSize} fill="white" />
      <circle cx="70" cy="55" r={config.eyeSize} fill="white" />
      
      {/* Pupils */}
      <circle cx={50 + config.pupilOffset} cy="55" r="3.5" fill="#1f2937" />
      <circle cx={70 + config.pupilOffset} cy="55" r="3.5" fill="#1f2937" />
      
      {/* Glasses for skills variant */}
      {config.hasGlasses && (
        <>
          <circle cx="50" cy="55" r="12" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.3" />
          <circle cx="70" cy="55" r="12" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.3" />
          <line x1="62" y1="55" x2="58" y2="55" stroke="#3b82f6" strokeWidth="2" opacity="0.3" />
        </>
      )}
      
      {/* Smile - animated */}
      {smileAnimation ? (
        <motion.path
          stroke="white"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          animate={{
            d: [
              config.smile,
              config.smile.replace(/Q (\d+) (\d+)/, (match, x, y) => `Q ${x} ${parseFloat(y) + 8}`),
              config.smile
            ]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ) : (
        <path d={config.smile} stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      )}
      
      {/* S2 Symbol */}
      <text x="60" y="78" fontSize="22" fontWeight="900" fill="white" textAnchor="middle" dominantBaseline="middle">S²</text>
      
      {/* Sparkles */}
      {config.sparkles && [0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI) / 2
        const radius = 55
        return <circle key={i} cx={60 + Math.cos(angle) * radius} cy={60 + Math.sin(angle) * radius} r="5" fill={config.sparkleColor} />
      })}
    </svg>
  )
}

export default MascotIcon

