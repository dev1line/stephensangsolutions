import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../locales'
import { n8nService } from '../services/n8nService'
import BlogCard from '../components/molecules/BlogCard'
import SEOHead from '../components/molecules/SEOHead'

const BlogPage = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      const fetchedPosts = await n8nService.getPosts()
      setPosts(fetchedPosts)
    } catch (err) {
      setError(t.blog.error)
      console.error('Error fetching posts:', err)
    } finally {
      setLoading(false)
    }
  }

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const blogUrl = `${baseUrl}/blog`
  const ogImage = `${baseUrl}/og-image.svg`

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
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
          {t.blog.title}
        </h1>
        <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto">
          {t.blog.subtitle}
        </p>
      </motion.div>

      <div className="flex justify-end mb-8">
        <button
          onClick={fetchBlogPosts}
          className="btn-secondary"
        >
          {t.blog.refresh}
        </button>
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
          <p className="text-gray-600 text-lg">
            {t.blog.noPosts}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            {t.blog.noPostsHint}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard key={post.id || index} post={post} index={index} />
          ))}
        </div>
      )}
    </section>
  )
}

export default BlogPage

