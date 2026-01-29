import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../locales'
import { n8nService } from '../services/n8nService'
import SectionTitle from './molecules/SectionTitle'

const Contact = () => {
  const { language } = useLanguage()
  const t = translations[language]
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      await n8nService.sendContactForm(formData)
      setStatus({
        type: 'success',
        message: t.contact.form.success,
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: t.contact.form.error,
      })
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'nguyentuanquangsang1999@gmail.com',
      href: 'mailto:nguyentuanquangsang1999@gmail.com',
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '0889354995',
      href: 'tel:+840889354995',
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Ha Noi, Vietnam',
      href: '#',
    },
  ]

  const socialLinks = [
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaGithub, href: 'https://github.com/dev1line', label: 'GitHub' },
  ]

  return (
    <section id="contact" className="section-container bg-gradient-to-br from-orange-50/50 to-white dark:from-slate-900/50 dark:to-indigo-950/50 relative">
      <SectionTitle
        mascotPosition="right"
        variant="contact"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {t.contact.title}
      </SectionTitle>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-6">
              {t.contact.infoTitle}
            </h3>
            <p className="text-gray-600 dark:text-slate-200 mb-8">
              {t.contact.infoDescription}
            </p>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-primary-100 dark:bg-primary-500/20 p-3 rounded-lg">
                    <info.icon className="text-primary-600 dark:text-primary-300 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-slate-100">{info.label}</p>
                    <a
                      href={info.href}
                      className="text-gray-600 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                    >
                      {info.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-slate-800/90 p-4 rounded-lg shadow-md dark:shadow-indigo-950/50 hover:shadow-lg transition-shadow text-gray-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-300"
                  aria-label={label}
                >
                  <Icon className="text-2xl" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="card">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2"
                >
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-400 focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2"
                >
                  {t.contact.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-400 focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2"
                >
                  {t.contact.form.subject}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-400 focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2"
                >
                  {t.contact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-400 focus:border-transparent"
                />
              </div>

              {status.message && (
                <div
                  className={`mb-4 px-4 py-3 rounded-lg ${
                    status.type === 'success'
                      ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700'
                      : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700'
                  }`}
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 dark:bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t.contact.form.submitting : t.contact.form.submit}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

