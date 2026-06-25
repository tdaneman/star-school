import { useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import signs from '../data/signs.json'
import planets from '../data/planets.json'
import { useProgress } from '../context/ProgressContext'
import styles from './Quiz.module.css'

const DATA = { signs, planets }

export default function Quiz() {
  const { type, id } = useParams()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const { markDone } = useProgress()

  const collection = DATA[type]
  const item = collection?.find(entry => entry.id === id)

  const [choices] = useState(() => {
    if (!item) return []
    const arr = [...item.quizChoices]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  })

  if (!item) return <Navigate to="/" replace />

  const answered = selected !== null
  const isCorrect = answered && selected.correct

  function handleChoice(choice) {
    if (answered) return
    setSelected(choice)
    if (choice.correct) markDone(type, id)
  }

  function handleNext() {
    if (item.next) {
      navigate(`/learn/${type}/${item.next}`)
    } else {
      navigate('/')
    }
  }

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate(`/learn/${type}/${id}`)} aria-label="Back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
      </button>

      <div className={styles.header}>
        <span className={styles.symbol}>{item.symbol}</span>
        <h1 className={styles.name}>{item.name}</h1>
        <p className={styles.prompt}>Which word cluster fits?</p>
      </div>

      <div className={styles.choices}>
        {choices.map((choice, i) => {
          let state = 'idle'
          if (answered) {
            if (choice === selected) state = isCorrect ? 'correct' : 'wrong'
            else if (choice.correct) state = 'correct'
            else state = 'dim'
          }
          return (
            <button
              key={i}
              className={`${styles.choice} ${styles[state]}`}
              onClick={() => handleChoice(choice)}
              disabled={answered}
            >
              {choice.text}
            </button>
          )
        })}
      </div>

      {answered && (
        <div className={`${styles.feedback} ${isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}`}>
          <p>{isCorrect ? item.quizFeedback.correct : item.quizFeedback.wrong}</p>
        </div>
      )}

      {answered && (
        <button className={styles.nextButton} onClick={handleNext}>
          {item.next ? 'Next Lesson' : 'Back to Home'}
        </button>
      )}
    </div>
  )
}
