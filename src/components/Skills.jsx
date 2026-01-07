import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../locales'
import SectionTitle from './molecules/SectionTitle'
import {
  FaDocker,
  FaAws,
  FaGitAlt,
  FaJenkins,
  FaPython,
  FaLinux,
} from 'react-icons/fa'
import {
  SiTerraform,
  SiAnsible,
  SiKubernetes,
  SiPrometheus,
  SiGrafana,
  SiGitlab,
  SiGithubactions,
  SiAzuredevops,
} from 'react-icons/si'

const Skills = () => {
  const { language } = useLanguage()
  const t = translations[language]
  
  const skillCategories = [
    {
      title: t.skills.categories.cloudPlatforms,
      skills: [
        { name: 'AWS', icon: FaAws, level: 90 },
        { name: 'Azure', icon: SiAzuredevops, level: 85 },
        { name: 'GCP', icon: FaAws, level: 80 },
      ],
    },
    {
      title: t.skills.categories.containerOrchestration,
      skills: [
        { name: 'Docker', icon: FaDocker, level: 95 },
        { name: 'Kubernetes', icon: SiKubernetes, level: 90 },
      ],
    },
    {
      title: t.skills.categories.cicdTools,
      skills: [
        { name: 'Jenkins', icon: FaJenkins, level: 90 },
        { name: 'GitLab CI', icon: SiGitlab, level: 85 },
        { name: 'GitHub Actions', icon: SiGithubactions, level: 88 },
      ],
    },
    {
      title: t.skills.categories.infrastructureAsCode,
      skills: [
        { name: 'Terraform', icon: SiTerraform, level: 92 },
        { name: 'Ansible', icon: SiAnsible, level: 85 },
      ],
    },
    {
      title: t.skills.categories.monitoringObservability,
      skills: [
        { name: 'Prometheus', icon: SiPrometheus, level: 85 },
        { name: 'Grafana', icon: SiGrafana, level: 88 },
      ],
    },
    {
      title: t.skills.categories.otherTools,
      skills: [
        { name: 'Git', icon: FaGitAlt, level: 95 },
        { name: 'Linux', icon: FaLinux, level: 90 },
        { name: 'Python', icon: FaPython, level: 85 },
      ],
    },
  ]

  return (
    <section id="skills" className="section-container bg-gradient-to-br from-orange-50/50 to-white dark:from-slate-900/50 dark:to-indigo-950/50 relative">
      <SectionTitle
        mascotPosition="left"
        variant="skills"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {t.skills.title}
      </SectionTitle>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="card"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              {category.title}
            </h3>
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <skill.icon className="text-primary-600 text-xl" />
                      <span className="font-medium text-gray-700 dark:text-slate-200">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-slate-300">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700/50 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                      className="bg-primary-600 h-2 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Skills

