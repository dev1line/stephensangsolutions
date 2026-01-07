import { FaHeart } from 'react-icons/fa'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../locales'
import Logo from '../atoms/Logo'

const Footer = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-slate-950 dark:to-indigo-950 text-gray-300 dark:text-slate-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-auto flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg px-2 shadow-lg">
                <span className="font-black text-white text-lg">S²</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-lg">S2 Solutions</span>
                <span className="text-xs text-gray-400 dark:text-slate-400 -mt-1">
                  StephenSangSolutions
                </span>
              </div>
            </div>
          </div>
          <p className="flex items-center justify-center gap-2 mb-2">
            {t.footer.madeWith} <FaHeart className="text-primary-500 animate-pulse" /> {t.footer.by}
          </p>
          <p className="text-sm mb-2">
            © {currentYear} S2 Solutions (StephenSangSolutions). {t.footer.rights}
          </p>
          <p className="text-xs text-gray-500">
            {t.footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

