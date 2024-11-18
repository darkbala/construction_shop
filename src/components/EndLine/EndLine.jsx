import React from 'react'
import styles from './EndLine.module.scss'
import logo from '../../assets/endlogo.png'
import insta from '../../assets/insta.png'
import whats from '../../assets/whats.png'

export default function EndLine() {
  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <div className={styles.left}>
          <img src={logo} alt="logo" className={styles.logo} />
          <div className={styles.down}>
            <p className={styles.big}>Первый отечественный бренд на рынке сантехники от компании ОсОО “Стройдом.кг”</p>
            <p className={styles.small}>© 2023 Iskender.kg - Отечественный бренд сантехники</p>
          </div>
        </div>
        <div className={styles.right}>
          <img src={insta} alt="instagram" />
          <img src={whats} alt="whatsapp" />
        </div>
      </div>
    </div>
  )
}
