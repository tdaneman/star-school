import signs from '../data/signs.json'
import planets from '../data/planets.json'
import UnitRow from '../components/UnitRow'
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.wordmark}>Star School</span>
      </header>
      <UnitRow title="Signs" items={signs} basePath="/learn/signs" />
      <UnitRow title="Planets" items={planets} basePath="/learn/planets" />
    </div>
  )
}
