import React from "react"
import styles from './card.module.css'
import Modal from "./modal"
import { FaEnvelopeOpenText } from 'react-icons/fa'

/**
 * Credits to Garry Tan and this
 * https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
 * post
 *
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return "#" + Math.round(r * 255).toString(16) + Math.round(g * 255).toString(16) + Math.round(b * 255).toString(16);
}

const formatMoney = (amount) =>  "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

function breakdown([pac, amount]){
    return (
            <li key={pac}> <b>{pac}</b>: {formatMoney(amount)} </li>
    )
}

export default function Card({person}){
    const [modalVisible, setModalVisible] = React.useState(false)
    const toggleModal = () => setModalVisible(!modalVisible)

    const contribution = person.totalContribution
    const moneyFormatted = formatMoney(contribution)
    const color = hslToRgb(0, Math.min(Math.max(contribution, 2500), 10000.0)/15000.0, .42)

    const pacs = Object.keys(person.contributionSummary).join(", ");

    let [name, setName] = React.useState("");

    const mailToUri = `mailto:${person.contactLink}?subject=${email_subject}&body=${email_body(person.electedOfficialName, moneyFormatted, pacs, name)}`;

    return (
        <>
            <div className={styles.card} onClick={toggleModal}>
                <div className={styles.card_element}>
                    <p className={styles.card_title}>{person.electedOfficialName}</p>
                    <p className={`${styles.card_text} ${styles.text_muted}`}> {person.fullPosition} </p>
                </div>
                <div className={styles.amount_due} style={{backgroundColor: color}}>
                    <p className={styles.card_text}>{moneyFormatted}</p>
                </div>
            </div>
            <Modal visible={modalVisible} onClose={toggleModal}>
                <div className={styles.modal}>
                    <div className={styles.info_section}>
                        <h2>{person.electedOfficialName}</h2>
                        <h4>{person.fullPosition}</h4>
                        <p className={styles.cardText}> Total Contribution: {moneyFormatted} </p>
                        <h3> Contribution breakdown: </h3>
                        <ul>
                            {Object.entries(person.contributionSummary).map(breakdown)}
                        </ul>
                        {
                                (person.alternateContact.startsWith("http")) ?
                                    (<><h4> Additional Contact: </h4> <a href={person.alternateContact}>{person.alternateContact} </a></>)
                                : null
                        }
                        <div>
                            <a href={mailToUri}>
                                <div className={`${styles.email_button} ${styles.button}`}>
                                    Send email <FaEnvelopeOpenText className="email"/>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className={styles.email_section}>
                        <h3> Email Preview </h3>
                        <h4> Subject: Call to Policing Fairness in your Community</h4>
                        <p className={styles.cardText}>Dear {person.electedOfficialName}, </p>
                        <p className={styles.cardText}> My name is <input placeholder="Your name" value={name} onChange={(event) => setName(event.target.value) }></input>, and I am your constituent. </p>
                        <p className={styles.cardText}> Using a campaign finance transparency initiative called Transparency USA, I recently discovered that you were given {moneyFormatted} by the following police department based political action committees: {pacs}. </p>

                        <p className={styles.cardText}> In light of mass protests inspired by the tragic death of George Floyd across the country, I ask that you commit to the issue of police accountability and condone examples of systemic racism that are present in our policing system. </p>

                        <p className={styles.cardText}> I ask that you match the donation given to you by these police PACs to organizations working for racial justice nationwide. </p>

                        <p className={styles.cardText}> Can I count on you to donate {moneyFormatted} to the Equal Justice Initiative (https://eji.org/), to work towards meaningful criminal justice reform today? </p>
                        <p className={styles.cardText}>Thanks, </p>
                        <p className={styles.cardText}>{name}</p>
                    </div>
                </div>
            </Modal>
        </>
    )
}

const email_body = (electedOfficialName, totalContribution, pacs, name) => encodeURIComponent(
`Dear ${electedOfficialName},

My name is ${name}, and I am your constituent.
Using a campaign finance transparency initiative called Transparency USA, I recently discovered that you were given ${totalContribution} by the following police department based political action committees: ${pacs}

In light of mass protests inspired by the tragic death of George Floyd across the country, I ask that you commit to the issue of police accountability and condone examples of systemic racism that are present in our policing system.

I ask that you match the donation given to you by these police PACs to organizations working for racial justice nationwide.

Can I count on you to donate ${totalContribution} to the Equal Justice Initiative(https://eji.org/), to work towards meaningful criminal justice reform today?

Thanks,
${name}
`
)

const email_subject = encodeURIComponent("Call to Policing Fairness in your Community")