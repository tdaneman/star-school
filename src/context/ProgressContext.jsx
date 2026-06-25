import { createContext, useContext, useState } from 'react'

const ProgressContext = createContext(null)

function load() {
  try {
    return new Set(JSON.parse(localStorage.getItem('completed') || '[]'))
  } catch {
    return new Set()
  }
}

export function ProgressProvider({ children }) {
  const [completed, setCompleted] = useState(load)

  function markDone(type, id) {
    setCompleted(prev => {
      const next = new Set(prev)
      next.add(`${type}:${id}`)
      localStorage.setItem('completed', JSON.stringify([...next]))
      return next
    })
  }

  function isDone(type, id) {
    return completed.has(`${type}:${id}`)
  }

  return (
    <ProgressContext.Provider value={{ isDone, markDone, completed }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  return useContext(ProgressContext)
}
