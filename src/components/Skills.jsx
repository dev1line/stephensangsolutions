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
  FaShieldAlt,
} from 'react-icons/fa'
import {
  SiTerraform,
  SiKubernetes,
  SiGitlab,
  SiGithubactions,
  SiGo,
  SiNodedotjs,
  SiReact,
  SiPostgresql,
  SiMongodb,
  SiSolidity,
} from 'react-icons/si'

const Skills = () => {
  const { language } = useLanguage()
  const t = translations[language]
  
  const skillCategories = [
    {
      title: t.skills.categories.cloudSecurity,
      skills: [
        { name: 'AWS IAM & KMS', icon: FaAws, level: 92 },
        { name: 'GuardDuty & WAF', icon: FaShieldAlt, level: 88 },
        { name: 'Secrets Manager', icon: FaShieldAlt, level: 90 },
      ],
    },
    {
      title: t.skills.categories.infrastructureOrchestration,
      skills: [
        { name: 'Kubernetes / EKS', icon: SiKubernetes, level: 90 },
        { name: 'Docker', icon: FaDocker, level: 92 },
        { name: 'Terraform', icon: SiTerraform, level: 90 },
        { name: 'Helm', icon: SiKubernetes, level: 85 },
      ],
    },
    {
      title: t.skills.categories.devsecopsCicd,
      skills: [
        { name: 'GitLab CI', icon: SiGitlab, level: 90 },
        { name: 'Jenkins', icon: FaJenkins, level: 88 },
        { name: 'SAST / DAST', icon: FaShieldAlt, level: 85 },
        { name: 'Trivy & Checkov', icon: FaShieldAlt, level: 88 },
      ],
    },
    {
      title: t.skills.categories.blockchainSecurity,
      skills: [
        { name: 'Foundry & Slither', icon: SiSolidity, level: 88 },
        { name: 'EVM / Solidity', icon: SiSolidity, level: 90 },
        { name: 'Hyperledger & ZKP', icon: FaShieldAlt, level: 82 },
      ],
    },
    {
      title: t.skills.categories.development,
      skills: [
        { name: 'Golang', icon: SiGo, level: 88 },
        { name: 'NestJS / Node.js', icon: SiNodedotjs, level: 85 },
        { name: 'Python', icon: FaPython, level: 88 },
        { name: 'React / Next.js', icon: SiReact, level: 82 },
        { name: 'PostgreSQL / MongoDB', icon: SiPostgresql, level: 85 },
      ],
    },
    {
      title: t.skills.categories.securityResearch,
      skills: [
        { name: 'TON (FunC, FIFT)', icon: FaShieldAlt, level: 85 },
        { name: 'Rust / Cosmos', icon: FaShieldAlt, level: 80 },
        { name: 'Git & Linux', icon: FaGitAlt, level: 92 },
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

