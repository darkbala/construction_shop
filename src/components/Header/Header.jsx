import Slider from "react-slick";
import styles from "./Header.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Header = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
    };

    return (
        <div className={styles.container}>
            <Slider {...settings}>
                <div className={`${styles.slide} ${styles.slide1}`} />
                <div className={`${styles.slide} ${styles.slide2}`} />
                <div className={`${styles.slide} ${styles.slide3}`} />
            </Slider>
            <div className={styles.content}>
                <h1>Ваш контент здесь</h1>
                <p>Это пример статического контента, который не движется.</p>
            </div>
        </div>
    );
};

export default Header;
