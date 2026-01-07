import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../locales'
import Badge from './atoms/Badge'
import SectionTitle from './molecules/SectionTitle'

const Projects = () => {
  const { language } = useLanguage()
  const t = translations[language]
  
  const projects = t.projects.items.map(project => ({
    ...project,
      github: 'https://github.com',
      demo: 'https://example.com',
  }))

  return (
    <section id="projects" className="section-container bg-gradient-to-br from-orange-50/50 to-white dark:from-slate-900/50 dark:to-indigo-950/50 relative">
      <SectionTitle
        mascotPosition="left"
        variant="projects"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {t.projects.title}
      </SectionTitle>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="card flex flex-col"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-3">
              {project.title}
            </h3>
            <p className="text-gray-600 dark:text-slate-200 mb-4 flex-grow">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, techIndex) => (
                <Badge key={techIndex} variant="default">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex gap-4 mt-auto">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
              >
                <FaGithub />
                <span>{t.projects.code}</span>
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
              >
                <FaExternalLinkAlt />
                <span>{t.projects.demo}</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Projects

