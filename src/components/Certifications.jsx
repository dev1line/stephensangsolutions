import { motion } from 'framer-motion'
import { FaAward, FaExternalLinkAlt } from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../locales'
import SectionTitle from './molecules/SectionTitle'

const DEFAULT_CREDLY_URL = 'https://www.credly.com/badges/dcc73283-ffe7-47ec-b204-1c87c23a8711/public_url'

const CERTIFICATIONS = [
  {
    id: 'saa',
    nameKey: 'solutionsArchitectAssociate',
    image: '/certifications/aws-solutions-architect-associate.png',
    credlyUrl: import.meta.env.VITE_CREDLY_SAA_URL || DEFAULT_CREDLY_URL,
  },
  {
    id: 'security',
    nameKey: 'securitySpecialty',
    image: '/certifications/aws-security-specialty.png',
    credlyUrl: import.meta.env.VITE_CREDLY_SECURITY_URL || DEFAULT_CREDLY_URL,
  },
]

const Certifications = () => {
  const { language } = useLanguage()
  const t = translations[language].certifications

  return (
    <section
      id="certifications"
      className="section-container bg-gradient-to-br from-orange-50/50 to-white dark:from-slate-900/50 dark:to-indigo-950/50 relative"
    >
      <SectionTitle
        mascotPosition="left"
        variant="certifications"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {t.title}
      </SectionTitle>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-stretch">
          {CERTIFICATIONS.map((cert, index) => (
            <motion.a
              key={cert.id}
              href={cert.credlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="certification-card group flex flex-col items-center text-center rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800/80 p-5 md:p-6 lg:p-8 shadow-md hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-primary-200/20 dark:hover:shadow-primary-900/20 transition-all duration-300 ease-out h-full min-h-[360px] sm:min-h-[380px] md:min-h-[420px]"
            >
              <div className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] min-w-[140px] min-h-[140px] sm:min-w-[160px] sm:min-h-[160px] md:min-w-[180px] md:min-h-[180px] mb-4 md:mb-5 flex-shrink-0 rounded-lg overflow-hidden bg-white dark:bg-slate-700/80 p-2 shadow-inner flex items-center justify-center ring-1 ring-gray-100 dark:ring-slate-600">
                <img
                  src={cert.image}
                  alt={t[cert.nameKey]}
                  className="w-full h-full object-contain object-center"
                />
              </div>
              <div className="flex items-center justify-center gap-3 mb-2 min-h-[4rem] text-center">
                <span className="inline-flex items-center justify-center flex-shrink-0 group-hover:animate-twinkle">
                  <FaAward className="text-primary-600 dark:text-primary-400 text-lg drop-shadow-sm" aria-hidden />
                </span>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-slate-100 leading-tight flex-1 min-w-0">
                  {t[cert.nameKey]}
                </h3>
              </div>
              <p className="text-primary-600 dark:text-primary-400 font-semibold mb-1">
                {t.issuer}
              </p>
              <p className="text-gray-500 dark:text-slate-400 text-sm mb-5">
                {t.validityLabel}: {t.validity}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium group-hover:gap-3 transition-all duration-300">
                {t.viewOnCredly}
                <FaExternalLinkAlt className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
