import { Routes, Route } from 'react-router-dom'
import { useScrollToSection } from './hooks/useScrollToSection'
import MainLayout from './components/templates/MainLayout'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import BlogDetailPage from './pages/BlogDetailPage'

function App() {
  useScrollToSection()

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog-detail/:id" element={<BlogDetailPage />} />
      </Routes>
    </MainLayout>
  )
}

export default App

