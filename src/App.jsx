import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext'
import BottomNav from './components/BottomNav'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Lesson from './pages/Lesson'
import Quiz from './pages/Quiz'
import Profile from './pages/Profile'
import styles from './App.module.css'

function Stub({ name }) {
  return (
    <div className={styles.stub}>
      <span>{name}</span>
    </div>
  )
}

export default function App() {
  return (
    <ProgressProvider>
    <BrowserRouter>
      <ScrollToTop />
      <div className={styles.layout}>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn/:type/:id" element={<Lesson />} />
            <Route path="/quiz/:type/:id" element={<Quiz />} />
            <Route path="/chart" element={<Stub name="Chart" />} />
            <Route path="/saved" element={<Stub name="Saved" />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
    </ProgressProvider>
  )
}
