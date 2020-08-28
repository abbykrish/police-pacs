import React from "react"
import Card from './card'
import styles from './cards.module.css'

const HEADERS = [
  "policeDeptPac",
  "electedOfficialName",
  "officeRanForOrDescription",
  "districtOrJurisdiction",
  "totalContribution",
  "contactLink"
]

const HEADER_TITLES = [
  "Police Dept/PAC",
  "Name",
  "Office",
  "District/Jurisdiction",
  "Total Contribution",
  "Contact"
]

export default function Cards({cards}) {
  return (
        <div className={styles.cards}>
          {cards.map( (person, index) => (<Card key={index} person={person}/>))}
        </div>
  )
}
