import React from "react"
import Card from './card'
import Contributions from '../../data/police-contributions.json'
import styles from './cards.module.css'
console.log(styles)

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

export default function Cards() {
  return (
      <div className={styles.container}>
        <div className={styles.cards}>
          {Contributions.map( (person, index) => (<Card key={index} person={person}/>))}
        </div>
      </div>
  )
}
