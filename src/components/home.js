import React from "react"
import styles from './home.module.css'
import Cards from './cards'
import Contributions from '../../data/police-contributions.json'
import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from "constants"

function searchInContributions(toFind){
  toFind = toFind.toLowerCase();
  console.log(Object.keys(Contributions[0].contributionSummary).map(pac => pac.toLowerCase()))
  console.log(Object.keys(Contributions[0].contributionSummary).map(pac => pac.toLowerCase()).findIndex(i => i.includes(toFind)))

  const toRet = Contributions.filter(
    (contribution) =>
        contribution.electedOfficialName.toLowerCase().includes(toFind) ||
        contribution.fullPosition.toLowerCase().includes(toFind) ||
        Object.keys(contribution.contributionSummary).map(pac => pac.toLowerCase()).findIndex(i => i.includes(toFind)) >= 0
    )
  console.log(toRet)
  return toRet;
}

export default function Home() {
  const [cardsToDisplay, setCardsToDisplay] = React.useState(Contributions)
  const [searchTerm, setSearchTerm] = React.useState("")

  return (
    <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.header_title}>
            PAC-IT-UP!
          </div>
          <div className={styles.header_description}>
            <p>In 2019 alone, nearly half a million dollars were donated to campaigns across all levels in Texas. How can we expect our local officials to serve us when they rely on police contributions?</p>
            <p>Urge your representatives refuse police PAC money today</p>
            <p class={styles.bold}>It is time for representatives funded by police money to pack it up.</p>
          </div>
        </div>
        <div>
          <input
            className={styles.search}
            value={searchTerm}
            placeholder="Search"
            onChange={(event) => {setSearchTerm(event.target.value); setCardsToDisplay(searchInContributions(event.target.value))}}
          />
          <Cards cards={cardsToDisplay}/>
        </div>
    </div>
  )
}
