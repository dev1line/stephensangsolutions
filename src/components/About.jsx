import { motion } from "framer-motion";
import { FaCode, FaCloud, FaServer, FaRocket } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../locales";
import SectionTitle from "./molecules/SectionTitle";

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const highlights = [
    {
      icon: FaCode,
      title: t.about.highlights.iac.title,
      description: t.about.highlights.iac.description,
    },
    {
      icon: FaCloud,
      title: t.about.highlights.cloud.title,
      description: t.about.highlights.cloud.description,
    },
    {
      icon: FaServer,
      title: t.about.highlights.container.title,
      description: t.about.highlights.container.description,
    },
    {
      icon: FaRocket,
      title: t.about.highlights.cicd.title,
      description: t.about.highlights.cicd.description,
    },
  ];

  return (
    <section
      id="about"
      className="section-container bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm relative">
      <SectionTitle
        mascotPosition="right"
        variant="about"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}>
        {t.about.title}
      </SectionTitle>

      <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-slate-100 mb-4 md:mb-6">
            {t.about.heading}
          </h3>
          <p className="text-gray-600 dark:text-slate-200 mb-4 leading-relaxed">
            {t.about.paragraph1}
          </p>
          <p className="text-gray-600 dark:text-slate-200 mb-4 leading-relaxed">
            {t.about.paragraph2}
          </p>
          <p className="text-gray-600 leading-relaxed">{t.about.paragraph3}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-4 md:gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="card text-center">
              <item.icon className="text-4xl text-primary-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-slate-200">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
