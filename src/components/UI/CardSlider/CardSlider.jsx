// CardSlider.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useRef, useEffect } from 'react';
import styles from './CardSlider.module.scss';
import { Link } from 'react-router-dom';

import ArrowButton from "../ArrowButton/ArrowButton.jsx"; // Путь к изображению

const CardSlider = ({ cards }) => {
    const swiperRef = useRef(null);
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);

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
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },

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
    );
};

export default CardSlider;