import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Card from './card'
import Contributions from './police-contributions'

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

export default function Home() {
  return (
    <>
      <div class={styles.container}>
        <div class={styles.cards}>
          {Contributions.map(contribution => (<Card contribution={contribution}/>))}
        </div>
      </div>
    </>
  )
}
