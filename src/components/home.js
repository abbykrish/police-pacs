import React from "react"
import styles from './home.module.css'
import Cards from './cards'
import Contributions from '../../data/police-contributions.json'
import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from "constants"

function searchInContributions(toFind){
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
        <input 
          className={styles.search}
          value={searchTerm} 
          onChange={(event) => {setSearchTerm(event.target.value); setCardsToDisplay(searchInContributions(event.target.value))}} 
        />
        <Cards cards={cardsToDisplay}/>
    </div>
  )
}
