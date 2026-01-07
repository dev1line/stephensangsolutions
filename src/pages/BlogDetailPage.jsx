import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCalendarAlt, FaClock, FaArrowLeft } from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../locales'
import { n8nService } from '../services/n8nService'
import Badge from '../components/atoms/Badge'
import Button from '../components/atoms/Button'
import SEOHead from '../components/molecules/SEOHead'

const BlogDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { language } = useLanguage()
  const t = translations[language]
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBlogPost()
  }, [id])

  const fetchBlogPost = async () => {
    setLoading(true)
    setError(null)
    try {
      const posts = await n8nService.getPosts()
      const foundPost = posts.find(p => (p.id || p._id)?.toString() === id)
      
      if (foundPost) {
        setPost(foundPost)
      } else {
        setError(t.blog.notFound)
      }
    } catch (err) {
      setError(t.blog.error)
      console.error('Error fetching post:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const locale = language === 'vi' ? 'vi-VN' : 'en-US'
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <section className="section-container min-h-screen">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">{t.blog.loading}</p>
        </div>
      </section>
    )
  }

  if (error || !post) {
    return (
      <section className="section-container min-h-screen">
        <div className="text-center py-12">
          <p className="text-red-600 text-lg mb-4">{error || t.blog.notFound}</p>
          <Button onClick={() => navigate('/blog')}>
            {t.blog.backToBlog}
          </Button>
        </div>
      </section>
    )
  }

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const blogUrl = `${baseUrl}/blog-detail/${id}`
  const ogImage = post.image || `${baseUrl}/og-image.svg`

  return (
    <article className="section-container min-h-screen max-w-4xl mx-auto">
      <SEOHead
        title={`${post.title} | S2 Solutions`}
        description={post.excerpt || post.description || post.content?.substring(0, 160) || 'Bài viết từ S2 Solutions'}
        image={ogImage}
        url={blogUrl}
        type="article"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button
          variant="ghost"
          onClick={() => navigate('/blog')}
          className="mb-8"
        >
          <FaArrowLeft className="inline mr-2" />
          {t.blog.backToBlog}
        </Button>

        {post.image && (
          <div className="w-full h-96 overflow-hidden rounded-xl mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
            {post.publishedAt && (
              <div className="flex items-center gap-2">
                <FaCalendarAlt />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            )}
            {post.readTime && (
              <div className="flex items-center gap-2">
                <FaClock />
                <span>{post.readTime} {t.blog.minutesRead}</span>
              </div>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="default">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          <div 
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: post.content || post.description || post.excerpt || 'Nội dung bài viết...' 
            }}
          />
        </div>

        {post.url && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              {t.blog.readOriginal}
            </a>
          </div>
        )}
      </motion.div>
    </article>
  )
}

export default BlogDetailPage

