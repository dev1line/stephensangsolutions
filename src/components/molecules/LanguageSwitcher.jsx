import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../locales'
import { motion } from 'framer-motion'

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage()
  const t = translations[language]

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors text-gray-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-500/20 border border-gray-200 dark:border-slate-700/50 hover:border-primary-300 dark:hover:border-primary-400"
      aria-label="Toggle language"
    >
      {language === 'vi' ? '🇻🇳 VI' : '🇺🇸 EN'}
    </motion.button>
  )
}

export default LanguageSwitcher

