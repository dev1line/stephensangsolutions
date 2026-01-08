import { useEffect } from 'react'
import { normalizeUrl } from '../../utils/urlUtils'

const SEOHead = ({ 
  title, 
  description, 
  image, 
  url,
  type = 'website'
}) => {
  useEffect(() => {
    // Normalize URLs to avoid protocol mismatch
    const normalizedImage = image ? normalizeUrl(image) : null
    const normalizedUrl = url ? normalizeUrl(url) : null

    // Update document title
    if (title) {
      document.title = title
    }

    // Update or create meta tags
    const updateMetaTag = (property, content) => {
      if (!content) return
      
      let element = document.querySelector(`meta[property="${property}"]`) || 
                   document.querySelector(`meta[name="${property}"]`)
      
      if (!element) {
        element = document.createElement('meta')
        if (property.startsWith('og:')) {
          element.setAttribute('property', property)
        } else {
          element.setAttribute('name', property)
        }
        document.head.appendChild(element)
      }
      
      element.setAttribute('content', content)
    }

    // Update Open Graph tags
    if (title) updateMetaTag('og:title', title)
    if (description) updateMetaTag('og:description', description)
    if (normalizedImage) updateMetaTag('og:image', normalizedImage)
    if (normalizedUrl) updateMetaTag('og:url', normalizedUrl)
    updateMetaTag('og:type', type)

    // Update Twitter tags
    if (title) updateMetaTag('twitter:title', title)
    if (description) updateMetaTag('twitter:description', description)
    if (normalizedImage) updateMetaTag('twitter:image', normalizedImage)

    // Update standard meta tags
    if (description) updateMetaTag('description', description)

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (normalizedUrl) {
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
      }
      canonical.setAttribute('href', normalizedUrl)
    }
  }, [title, description, image, url, type])

  return null
}

export default SEOHead

