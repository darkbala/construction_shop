import styles from './Brands.module.scss';
import logo1 from "../../assets/logo1.png"
import logo2 from "../../assets/logo2.png"
import logo3 from "../../assets/logo3.png"
import logo4 from "../../assets/logo4.png"
import logo5 from "../../assets/logo5.png"
import logo6 from "../../assets/logo6.png"

const logos = [
    `${logo1}`,
    `${logo2}`,
    `${logo3}`,
    `${logo4}`,
    `${logo5}`,
    `${logo6}`,
];

const Brands = () => {
    return (
        <>
            <section className={styles.title}>
                <h3>Нас выбирают</h3>
            </section>
            <div className={styles.Brands}>
                <div className={styles.marquee}>
                    <div className={styles.marqueeContent}>
                        {logos.concat(logos).map((logo, index) => (
                            <img key={index} src={logo} alt={`Logo ${index + 1}`} className={styles.logo}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Brands;
