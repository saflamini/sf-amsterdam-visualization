import styles from '../styles/Home.module.css'
import ClientSide from './visualize'

export default function Home() {
  return (
    <div className={styles.container}>
      <ClientSide />
    </div>
  )
}
