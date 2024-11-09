import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useRef } from "react";
import styles from "./SwitchSection.module.scss";

import img from "../../assets/img.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ArrowButton from "../UI/ArrowButton/ArrowButton.jsx";
import { Link } from "react-router-dom";

const SwitchSection = () => {
    const swiperRef = useRef(null);
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);

    const cards = [
        { id: 1, name: "Product 1", price: "$10", description: "Description 1", image: img },
        { id: 2, name: "Product 2", price: "$20", description: "Description 2", image: img },
        { id: 3, name: "Product 1", price: "$10", description: "Description 1", image: img },
        { id: 4, name: "Product 2", price: "$20", description: "Description 2", image: img },
        { id: 5, name: "Product 1", price: "$10", description: "Description 1", image: img },
        { id: 6, name: "Product 2", price: "$20", description: "Description 2", image: img },
        { id: 7, name: "Product 1", price: "$10", description: "Description 1", image: img },
        { id: 8, name: "Product 2", price: "$20", description: "Description 2", image: img },
    ];

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            const swiperInstance = swiperRef.current.swiper;
            swiperInstance.params.navigation.prevEl = prevButtonRef.current;
            swiperInstance.params.navigation.nextEl = nextButtonRef.current;
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, []);

    return (
        <section className={styles.SwitchSection}>
            <div className={styles.switch_btn}>
                <button className={styles.active}>Популярное</button>
                <button>Новинки</button>
            </div>

            <div className={styles.slider_container}>
                <div className={styles.cardSlider}>
                    <ArrowButton prevRef={prevButtonRef} nextRef={nextButtonRef} />
                    <Swiper
                        ref={swiperRef}
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                    >
                        {cards.map((card) => (
                            <SwiperSlide key={card.id} className={styles.card}>
                                <Link to={`product/${card.id}`} className={styles.Product}>
                                    <span className={styles.brand}>iskender</span>
                                    <div>
                                        <img src={card.image} alt={card.name} />
                                        <aside>
                                            <h4>{card.name}</h4>
                                            <div className={styles.line} />
                                            <p>{card.price} som</p>
                                        </aside>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default SwitchSection;
