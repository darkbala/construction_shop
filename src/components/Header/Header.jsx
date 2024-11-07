import {Fade} from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import {Link} from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
    const backgrounds = [
        'https://images.unsplash.com/photo-1719937051176-9b98352a6cf4?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1730142098065-c8e1a9361b6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1726094232383-2fe17106bf19?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];

    const settings = {
        duration: 10000,
        transitionDuration: 3000,
        infinite: true,
        indicators: false,
        arrows: false,
    };

    return (
        <div className={styles.sliderContainer}>
            <Fade {...settings}>
                {backgrounds.map((bg, index) => (
                    <div key={index} className={styles.bgSlide} style={{backgroundImage: `url("${bg}")`}}/>
                ))}
            </Fade>

            <div className={styles.content}>
                <div className={styles.container}>
                    <span>
                        <h1>Iskender</h1>
                        <h4>Company</h4>
                    </span>
                    <section className={styles.b2b}>
                        <p>B2B Оптовые продажи</p>
                    </section>
                    <p className={styles.desk}>Имея более чем 10-летний опыт проектирования и производства
                        высококачественной мебели для ванной
                        комнаты, мы с гордостью представляем наши коллекции для ванной комнаты.</p>
                    <Link to={"/catalog"} className={styles.btn_to_category}>К каталогу</Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
