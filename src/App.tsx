import { ThemeProvider } from '@/contexts/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HomePage } from '@/pages/HomePage'
import { ConceptMapPage } from '@/pages/ConceptMapPage'
import { ConceptPage } from '@/pages/ConceptPage'
import { LabPage } from '@/pages/LabPage'

function AppContent() {
  const location = useLocation()
  const isLabPage = location.pathname === '/lab'

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/concepts" element={<ConceptMapPage />} />
            <Route path="/concepts/:slug" element={<ConceptPage />} />
            <Route path="/lab" element={<LabPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
