import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaChevronLeft, FaChevronRight, FaSyncAlt } from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../locales'
import { n8nService } from '../services/n8nService'
import BlogCard from '../components/molecules/BlogCard'
import SEOHead from '../components/molecules/SEOHead'

/** Loại bài: cheatsheet nếu tags có "Cheatsheet" hoặc title chứa "Cheatsheet", còn lại là project */
const getPostType = (post) =>
  post.tags?.includes('Cheatsheet') || (post.title && post.title.includes('Cheatsheet'))
    ? 'cheatsheet'
    : 'project'

/** Lấy tools của post (ưu tiên post.tools, fallback tags) */
const getPostTools = (post) =>
  Array.isArray(post.tools) && post.tools.length
    ? post.tools
    : post.tags?.filter((tag) =>
        ['Terraform', 'Ansible', 'Jenkins', 'Docker', 'Kubernetes'].includes(tag)
      ) || []

/** Lấy skills của post (ưu tiên post.skills, fallback tags) */
const getPostSkills = (post) =>
  Array.isArray(post.skills) && post.skills.length
    ? post.skills
    : post.tags || []

const POSTS_PER_PAGE = 6

const BlogPage = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('') // '' | 'cheatsheet' | 'project'
  const [selectedTool, setSelectedTool] = useState('')
  const [selectedSkill, setSelectedSkill] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchBlogPosts()
  }, [language])

  const fetchBlogPosts = async () => {
    setLoading(true)
    setError(null)
    setSearchQuery('')
    setSelectedType('')
    setSelectedTool('')
    setSelectedSkill('')
    try {
      const fetchedPosts = await n8nService.getPosts(language)
      setPosts(fetchedPosts)
    } catch (err) {
      setError(t.blog.error)
      console.error('Error fetching posts:', err)
    } finally {
      setLoading(false)
    }
  }

  const uniqueTools = useMemo(() => {
    const set = new Set()
    posts.forEach((post) => getPostTools(post).forEach((tool) => set.add(tool)))
    return Array.from(set).sort()
  }, [posts])

  const uniqueSkills = useMemo(() => {
    const set = new Set()
    posts.forEach((post) => getPostSkills(post).forEach((skill) => set.add(skill)))
    return Array.from(set).sort()
  }, [posts])

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return posts.filter((post) => {
      const matchSearch =
        !q ||
        (post.title && post.title.toLowerCase().includes(q)) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(q)) ||
        (post.tags?.some((tag) => tag.toLowerCase().includes(q)))
      const postType = getPostType(post)
      const postTools = getPostTools(post)
      const postSkills = getPostSkills(post)
      const matchType = !selectedType || postType === selectedType
      const matchTool = !selectedTool || postTools.includes(selectedTool)
      const matchSkill = !selectedSkill || postSkills.includes(selectedSkill)
      return matchSearch && matchType && matchTool && matchSkill
    })
  }, [posts, searchQuery, selectedType, selectedTool, selectedSkill])

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE)),
    [filteredPosts.length]
  )

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE
    return filteredPosts.slice(start, start + POSTS_PER_PAGE)
  }, [filteredPosts, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedType, selectedTool, selectedSkill])

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const blogUrl = `${baseUrl}/blog`
  const ogImage = `${baseUrl}/og-image.png?v=2`

  return (
    <section className="section-container min-h-screen">
      <SEOHead
        title="Blog | S2 Solutions - StephenSangSolutions"
        description="Khám phá những bài viết về DevOps, Cloud, và các công nghệ mới nhất từ S2 Solutions"
        image={ogImage}
        url={blogUrl}
        type="website"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 md:mb-6 bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
          {t.blog.title}
        </h1>
        <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto">
          {t.blog.subtitle}
        </p>
      </motion.div>

      <div className="flex justify-center mb-8 w-full surface:overflow-x-auto">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 items-stretch sm:items-center w-full max-w-4xl md:max-w-5xl surface:flex-nowrap surface:items-center">
          <div className="relative w-full sm:min-w-[200px] sm:flex-[1_1_200px] surface:flex-1 surface:min-w-0 surface:max-w-[380px]">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.blog.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 transition"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:min-w-[140px] surface:flex-shrink-0"
            aria-label={t.blog.filterByType}
          >
            <option value="">{t.blog.allTypes}</option>
            <option value="cheatsheet">{t.blog.cheatsheet}</option>
            <option value="project">{t.blog.project}</option>
          </select>
          <select
            value={selectedTool}
            onChange={(e) => setSelectedTool(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:min-w-[160px] surface:flex-shrink-0"
          >
            <option value="">{t.blog.allTools}</option>
            {uniqueTools.map((tool) => (
              <option key={tool} value={tool}>
                {tool}
              </option>
            ))}
          </select>
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:min-w-[160px] surface:flex-shrink-0"
          >
            <option value="">{t.blog.allSkills}</option>
            {uniqueSkills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={fetchBlogPosts}
            className="btn-secondary whitespace-nowrap w-full sm:w-auto surface:flex-shrink-0 inline-flex items-center justify-center gap-2 md:px-3 md:min-w-0"
            title={t.blog.refresh}
            aria-label={t.blog.refresh}
          >
            <FaSyncAlt className="hidden md:block shrink-0" aria-hidden />
            <span className="md:hidden">{t.blog.refresh}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {loading && posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">{t.blog.loading}</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-slate-300 text-lg">
            {t.blog.noPosts}
          </p>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-2">
            {t.blog.noPostsHint}
          </p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-slate-300 text-lg">
            {t.blog.noResults}
          </p>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-2">
            {t.blog.noResultsHint}
          </p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {paginatedPosts.map((post, index) => (
              <BlogCard
                key={post.id || index}
                post={post}
                index={(currentPage - 1) * POSTS_PER_PAGE + index}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <FaChevronLeft className="text-sm" />
                {t.blog.prevPage}
              </button>
              <span className="px-4 py-2 text-gray-600 dark:text-slate-300 text-sm font-medium">
                {t.blog.pageOf} {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {t.blog.nextPage}
                <FaChevronRight className="text-sm" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default BlogPage

