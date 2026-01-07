import { motion } from 'framer-motion'
import { FaBriefcase } from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../locales'
import SectionTitle from './molecules/SectionTitle'

const Experience = () => {
  const { language } = useLanguage()
  const t = translations[language]
  
  const experiences = t.experience.items

  return (
    <section id="experience" className="section-container bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm relative">
      <SectionTitle
        mascotPosition="right"
        variant="experience"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {t.experience.title}
      </SectionTitle>

      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative pl-20 pb-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-6 top-2 w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full border-4 border-white dark:border-slate-800 shadow-lg"></div>

              <div className="card">
                <div className="flex items-start gap-4 mb-4">
                  <FaBriefcase className="text-primary-600 text-2xl mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {exp.title}
                    </h3>
                    <p className="text-primary-600 font-semibold text-lg">
                      {exp.company}
                    </p>
                    <p className="text-gray-500 dark:text-slate-300 text-sm">{exp.period}</p>
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-slate-200 ml-10">
                  {exp.description.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience

