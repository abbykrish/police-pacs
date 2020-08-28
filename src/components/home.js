import React from "react"
import styles from './home.module.css'
import Cards from './cards'
import Contributions from '../../data/police-contributions.json'
import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from "constants"

function searchInContributions(toFind){
  toFind = toFind.toLowerCase();
  const toRet = Contributions.filter(
    (contribution) =>
        contribution.policeDeptPac.toLowerCase().includes(toFind) || 
        contribution.electedOfficialName.toLowerCase().includes(toFind) || 
        contribution.officeRanForOrDescription.toLowerCase().includes(toFind)
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
          In 2019 alone, nearly half a million dollars were donated to campaigns for elected office across the Senate. Most of these are local, city-wide positions. How can we expect our local Representatives, DAs and more to commit to police reform when they rely on their contribution?
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
