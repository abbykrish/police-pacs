import React from "react"
import styles from './card.module.css'

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

export default function Card({person}){
    const contribution = parseInt(person.totalContribution.replace("$", "").replace(",",""))
    const color = hslToRgb(0, Math.min(Math.max(contribution, 2500), 10000.0)/15000.0, .42)
    return (
            <div className={styles.card}>
                <div className={styles.card_element}>
                    <h4 className={styles.card_title}>{person.electedOfficialName}</h4>
                    <h5 className={styles.card_text}> {person.officeRanForOrDescription} </h5> 
                    <p className={`${styles.card_text} ${styles.text_muted}`}> {person.districtOrJurisdiction} </p>
                </div>
                <div className={styles.amount_due} style={{backgroundColor: color}}>
                    <p className={styles.card_text}>{person.totalContribution}</p>
                </div>
            </div>
    )
}