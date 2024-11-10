import styles from './Brands.module.scss';
import img from "../../assets/img.png"

const logos = [
    `${img}`,
    `${img}`,
    `${img}`,
    `${img}`,
    `${img}`,
    `${img}`,
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
