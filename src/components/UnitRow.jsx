import { Link, useLocation } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import styles from './UnitRow.module.css'

function StatusDot({ status }) {
  if (!status) return null
  return <span className={`${styles.dot} ${styles[status]}`} aria-label={status} />
}

function UnitCard({ item, basePath }) {
  const { isDone } = useProgress()
  const { pathname } = useLocation()
  const type = basePath.split('/').pop()

  let status = ''
  if (isDone(type, item.id)) status = 'done'
  else if (pathname === `${basePath}/${item.id}`) status = 'active'

  return (
    <Link to={`${basePath}/${item.id}`} className={styles.card}>
      <div className={styles.top}>
        <span className={styles.symbol}>{item.symbol}</span>
        <StatusDot status={status} />
      </div>
      <span className={styles.name}>{item.name}</span>
      <span className={styles.meta}>{item.element || item.cycle}</span>
    </Link>
  )
}

export default function UnitRow({ title, items, basePath }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.row}>
        {items.map(item => (
          <UnitCard key={item.id} item={item} basePath={basePath} />
        ))}
      </div>
    </section>
  )
}
