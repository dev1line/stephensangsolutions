import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useScrollToSection = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      const elementId = location.hash.substring(1) // Remove the #
      const element = document.getElementById(elementId)
      
      if (element) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          const headerOffset = 80 // Header height
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }, 100)
      }
    } else if (location.pathname === '/') {
      // If on home page with no hash, scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }, [location])
}

export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerOffset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

