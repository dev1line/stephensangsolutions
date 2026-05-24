import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaBookOpen, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../locales'
import Badge from './atoms/Badge'
import SectionTitle from './molecules/SectionTitle'

const DESKTOP_ITEMS = 3
const TABLET_ITEMS = 2
const MOBILE_ITEMS = 1

const getItemsPerView = (width) => {
  if (width < 768) return MOBILE_ITEMS
  if (width < 1024) return TABLET_ITEMS
  return DESKTOP_ITEMS
}

const chunkProjects = (items, size) => {
  const pages = []
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size))
  }
  return pages
}

const ProjectCard = ({ project, readCaseStudy }) => (
  <article className="card flex flex-col h-full min-h-0">
    <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-slate-100 mb-2 md:mb-3 line-clamp-2">
      {project.title}
    </h3>
    <p className="text-gray-600 dark:text-slate-200 mb-4 flex-grow line-clamp-6">
      {project.description}
    </p>
    <div className="flex flex-wrap gap-2 mb-4 min-h-[4.5rem] content-start">
      {project.technologies.map((tech, techIndex) => (
        <Badge key={techIndex} variant="default">
          {tech}
        </Badge>
      ))}
    </div>
    {project.blogId && (
      <Link
        to={`/blog-detail/${project.blogId}`}
        className="mt-auto inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:gap-3 transition-all duration-300"
      >
        <FaBookOpen />
        <span>{readCaseStudy}</span>
      </Link>
    )}
  </article>
)

const ProjectPage = ({ pageItems, readCaseStudy, className = '' }) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch ${className}`}
  >
    {pageItems.map((project) => (
      <ProjectCard
        key={project.blogId || project.title}
        project={project}
        readCaseStudy={readCaseStudy}
      />
    ))}
  </div>
)

const Projects = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const items = t.projects.items

  const [itemsPerView, setItemsPerView] = useState(DESKTOP_ITEMS)
  const [currentPage, setCurrentPage] = useState(0)
  const [slideHeight, setSlideHeight] = useState(undefined)

  const pageMeasureRefs = useRef([])

  useEffect(() => {
    const handleResize = () => setItemsPerView(getItemsPerView(window.innerWidth))
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const pages = useMemo(() => chunkProjects(items, itemsPerView), [items, itemsPerView])
  const totalPages = pages.length

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, Math.max(totalPages - 1, 0)))
  }, [totalPages])

  const measureSlideHeights = useCallback(() => {
    const heights = pageMeasureRefs.current
      .filter(Boolean)
      .map((el) => el.getBoundingClientRect().height)

    if (heights.length > 0) {
      setSlideHeight(Math.max(...heights))
    }
  }, [])

  useEffect(() => {
    pageMeasureRefs.current = pageMeasureRefs.current.slice(0, pages.length)
    const raf = requestAnimationFrame(measureSlideHeights)
    return () => cancelAnimationFrame(raf)
  }, [pages, itemsPerView, language, measureSlideHeights])

  useEffect(() => {
    window.addEventListener('resize', measureSlideHeights)
    return () => window.removeEventListener('resize', measureSlideHeights)
  }, [measureSlideHeights])

  const goToPage = useCallback(
    (nextPage) => {
      if (totalPages <= 1) return
      setCurrentPage((nextPage + totalPages) % totalPages)
    },
    [totalPages]
  )

  const handlePrev = () => goToPage(currentPage - 1)
  const handleNext = () => goToPage(currentPage + 1)

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

      <div className="relative max-w-7xl mx-auto">
        {totalPages > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label={t.projects.prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 md:-translate-x-6 z-10 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-gray-200 dark:border-slate-600 bg-white/90 dark:bg-slate-800/90 text-gray-700 dark:text-slate-200 shadow-md hover:bg-primary-50 dark:hover:bg-slate-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label={t.projects.nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 md:translate-x-6 z-10 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-gray-200 dark:border-slate-600 bg-white/90 dark:bg-slate-800/90 text-gray-700 dark:text-slate-200 shadow-md hover:bg-primary-50 dark:hover:bg-slate-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <FaChevronRight />
            </button>
          </>
        )}

        {/* Hidden measurer — same grid width as visible viewport for consistent height */}
        <div
          className="absolute -left-[9999px] top-0 w-full opacity-0 pointer-events-none"
          aria-hidden="true"
        >
          {pages.map((pageItems, pageIndex) => (
            <div
              key={`measure-${pageIndex}`}
              ref={(el) => {
                pageMeasureRefs.current[pageIndex] = el
              }}
              className="px-2 sm:px-8 md:px-10"
            >
              <ProjectPage pageItems={pageItems} readCaseStudy={t.projects.readCaseStudy} />
            </div>
          ))}
        </div>

        <motion.div
          className="overflow-hidden px-2 sm:px-8 md:px-10"
          animate={{ height: slideHeight ?? 'auto' }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${currentPage}-${itemsPerView}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="h-full"
            >
              <ProjectPage
                pageItems={pages[currentPage] ?? []}
                readCaseStudy={t.projects.readCaseStudy}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {pages.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`${t.projects.title} ${index + 1}`}
                aria-current={index === currentPage ? 'true' : undefined}
                onClick={() => setCurrentPage(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? 'w-8 bg-primary-600 dark:bg-primary-400'
                    : 'w-2.5 bg-gray-300 dark:bg-slate-600 hover:bg-primary-300 dark:hover:bg-primary-500'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
