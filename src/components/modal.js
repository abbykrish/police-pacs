import React from "react"
import styles from './modal.module.css'

export default function Modal({visible, onClose, children}){
    if(!visible) return null;
    
    return (
        <div className={styles.modal_background}>
            <div className={styles.modal}> 
                {children}
            </div>
        </div>
    )
}