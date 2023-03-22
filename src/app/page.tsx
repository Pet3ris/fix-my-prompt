import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className="center">
          <canvas id="canvas" width="800" height="600"></canvas>
        </div>
        <div className={styles.center}>
          <img src="./logo.small.white.svg" alt="Logo" />
        </div>
      </div>
    </main>
  )
}
