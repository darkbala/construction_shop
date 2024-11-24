import styles from './Footer.module.scss'
import GoogleMap from './GoogleMap/GoogleMap'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className={styles.wrap}>
        <div className={styles.content}>
            <div className={styles.map}><GoogleMap/></div>
            <div className={styles.info}>
                <div className={styles.adresses}>
                    <h6>Адресы</h6>
                    <ul>
                        <Link to="#">
                            <p> <b>ЭлитСтрой: </b><br />
                            ул. Ден-Сяопина 18/1</p>
                        </Link>
                        <Link to="#">
                            <p> <b>Баткен:</b> <br />
                            ул. Льва-Толстого 19</p>
                        </Link>
                    </ul>
                </div>
                <div className={styles.contacts}>
                    <h6>Контакты</h6>
                    <ul>
                        <Link to="#">+996 999 96 05 11</Link>
                        <Link to="#">+996 999 96 05 11</Link>
                        <Link to="#">+996 999 96 05 11</Link>
                    </ul>
                </div>
                <div className={styles.vacancies}>
                    <h6>Вакансии</h6>
                    <ul>
                        <Link to="#">Manager for sale</Link>
                        <Link to="#">SEO specialist</Link>
                        <Link to="#">Administation</Link>
                        <Link to="#">See more...</Link>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}
