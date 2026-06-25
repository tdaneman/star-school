import { Link } from 'react-router-dom'
import styles from './UnitRow.module.css'

function StatusDot({ status }) {
  return <span className={`${styles.dot} ${styles[status]}`} aria-label={status} />
}

function UnitCard({ item, basePath }) {
  return (
    <Link to={`${basePath}/${item.id}`} className={styles.card}>
      <div className={styles.top}>
        <span className={styles.symbol}>{item.symbol}</span>
        <StatusDot status={item.status} />
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
