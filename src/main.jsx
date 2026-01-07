import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { DarkModeProvider } from './contexts/DarkModeContext'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <DarkModeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </DarkModeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

