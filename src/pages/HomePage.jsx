import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Certifications from '../components/Certifications'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import SEOHead from '../components/molecules/SEOHead'

const HomePage = () => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const ogImage = `${baseUrl}/og-image.png`

  return (
    <>
      <SEOHead
        title="S2 Solutions - StephenSangSolutions | DevOps Engineer Portfolio"
        description="DevOps Engineer | Cloud Architect | Automation Specialist. Chuyên về CI/CD, Cloud Infrastructure, Containerization và Infrastructure as Code."
        image={ogImage}
        url={baseUrl}
        type="website"
      />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Certifications />
      <Projects />
      <Contact />
    </>
  )
}

export default HomePage

