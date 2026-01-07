import { useEffect } from 'react'

const SEOHead = ({ 
  title, 
  description, 
  image, 
  url,
  type = 'website'
}) => {
  useEffect(() => {
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
    if (image) updateMetaTag('og:image', image)
    if (url) updateMetaTag('og:url', url)
    updateMetaTag('og:type', type)

    // Update Twitter tags
    if (title) updateMetaTag('twitter:title', title)
    if (description) updateMetaTag('twitter:description', description)
    if (image) updateMetaTag('twitter:image', image)

    // Update standard meta tags
    if (description) updateMetaTag('description', description)

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (url) {
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
      }
      canonical.setAttribute('href', url)
    }
  }, [title, description, image, url, type])

  return null
}

export default SEOHead

