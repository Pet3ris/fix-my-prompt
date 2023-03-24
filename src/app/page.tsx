import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <div className={styles.topnav}>
        <div className={styles.logoContainer}>
          <img src="./logo.small.white.svg" alt="Logo" className={styles.logo} />
        </div>
      </div>
      <p className={`${styles.paragraph} ${inter}`}>
        Effective prompt engineering plays a vital role in achieving optimal outcomes from AI.
        FixMyPrompt is an experimental project to help improve your AI prompts.
        Simply provide your ChatGPT prompt and we will directly try to improve it or recommend
        other improvements that you can make. Built by <a href="https://twitter.com/p_e">@p_e</a>.
      </p>
      <div className={styles.buttonContainer}>
        <Link href="/app" className={styles.button}>
          Open App
        </Link>
      </div>
    </main>
  )
}
