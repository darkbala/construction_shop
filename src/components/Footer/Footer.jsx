import styles from "./Footer.module.scss";
import GoogleMAP from "./GoogleMap/GoogleMAP.jsx";
import {Link} from "react-router-dom";
import {FaPhone} from 'react-icons/fa';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchVacancies} from "../../store/slices/getVacancy.js";

export default function Footer() {

    const dispatch = useDispatch();
    const {vacancies} = useSelector((state) => state.vacancies);

    useEffect(() => {
        dispatch(fetchVacancies())
    }, [])


    const data3 = vacancies.slice(0, 3);

    return (
        <div className={styles.wrap}>
            <div className={styles.content}>
                <div className={styles.map}>
                    <GoogleMAP/>
                </div>
                <div className={styles.info}>
                    <div className={styles.adresses}>
                        <h6>Адресы</h6>
                        <ul>
                            <Link to="https://maps.app.goo.gl/JdbygE2Ehi4WX5VA9">
                                <p>
                                    <b>ЭлитСтрой: </b>
                                    <br/>
                                    ул. Ден-Сяопина 18/1
                                </p>
                            </Link>
                            <Link to="https://maps.app.goo.gl/cJjc97mkECiUzkVJ8">
                                <p>
                                    <b>Баткен:</b> <br/>
                                    ул. Льва-Толстого 19
                                </p>
                            </Link>
                        </ul>
                    </div>
                    <div className={styles.contacts}>
                        <h6>Контакты</h6>
                        <ul>
                            <li>
                                <a href="tel:+996500000104">
                                    <FaPhone className={styles.icon}/> +996 500 000 104
                                </a>
                            </li>
                            <li>
                                <a href="tel:+996997000104">
                                    {" "}
                                    <FaPhone className={styles.icon}/> +996 997 000 104
                                </a>
                            </li>
                            <li>
                                <a href="tel:+996222000104">
                                    {" "}
                                    <FaPhone className={styles.icon}/> +996 222 000 104
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.vacancies}>
                        <h6>Вакансии</h6>
                        <ul>

                            {data3.map((vacancies) => (
                                <li key={vacancies.id}>
                                    <Link to={`/vacancy`}>{vacancies.title}</Link>
                                </li>
                            ))}
                            <Link to="/vacancy">See more...</Link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
