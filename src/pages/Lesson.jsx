import { useParams, useNavigate, Navigate } from 'react-router-dom'
import signs from '../data/signs.json'
import planets from '../data/planets.json'
import LessonCard from '../components/LessonCard'
import styles from './Lesson.module.css'

const DATA = { signs, planets }

export default function Lesson() {
  const { type, id } = useParams()
  const navigate = useNavigate()

  const collection = DATA[type]
  const item = collection?.find(entry => entry.id === id)

  if (!item) return <Navigate to="/" replace />

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate('/')} aria-label="Back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
      </button>
      <LessonCard item={item} type={type} />
    </div>
  )
}
