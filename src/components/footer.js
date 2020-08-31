import React from "react"
import styles from './footer.module.css'

export default function Footer() {
  const about = "Pac It Up was created by University of Texas seniors Ritvik Annam and Abby Krishnan."
  const statement = "The murder of George Floyd and shooting of Jacob Blake, among countless others, has demonstrated how far the mission of the police is removed from public safety. We have lost nearly 200k Americans to COVID-19, a pandemic that has disproportionately taken black and brown lives. Local governments failed to invest in public health, while inflating broken institutions like law enforcement. We want to empower citizens to put pressure on elected officials to serve them, not chase police money"
  const closing = "All data was found via TransparencyUSA"
  return (
    <div className={styles.footer}>
      <div className={styles.footer_section}>
        <div className={styles.footer_titles}>
          About
        </div>
        <div className={styles.footer_descriptions}>
            {about}
        </div>
      </div>
      <div className={styles.footer_section}>
        <div className={styles.footer_titles}>
          Motivation
        </div>
        <div className={styles.footer_descriptions}>
          {statement}
        </div>
      </div>
      <div className={styles.footer_section}> 
        <div className={styles.footer_titles}>
          Credit
        </div>
        <div className={`${styles.footer_descriptions} ${styles.italicize}`}>
          {closing}
        </div>
      </div>
    </div>
  )
}