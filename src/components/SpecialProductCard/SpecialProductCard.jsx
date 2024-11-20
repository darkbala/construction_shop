import styles from "./SpecialProductCard.module.scss";
import CardItem from "./CardItem/CardItem.jsx";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";

const SpecialProductCard = () => {
    const productData = [
        {id: 1, name: 'Product 1', price: '$10', description: 'Description 1'},
        {id: 2, name: 'Product 2', price: '$20', description: 'Description 2'},
        {id: 1, name: 'Product 1', price: '$10', description: 'Description 1'},
        {id: 2, name: 'Product 2', price: '$20', description: 'Description 2'},
    ];

    return (
        <section className={styles.SpecialProductCard}>
            <div className={styles.title}>
                <h2>Специальное предложение</h2>
            </div>

            <div className={styles.slider_container}>
                <span className={styles.btn_cont}>
                    <button className={styles.arrow_left}>left</button>
                    <button className={styles.arrow_right}>right</button>
                </span>

                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={{
                        nextEl: `.${styles.arrow_right}`,
                        prevEl: `.${styles.arrow_left}`
                    }}
                    spaceBetween={30}
                    slidesPerView={"auto"}
                    className={styles.slides}
                    breakpoints={{
                        1440: {
                            slidesPerView: 2,
                        },
                        1280: {
                            slidesPerView: 1,
                        },
                        1024: {
                            slidesPerView: 1,
                        },
                        800: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 1,
                        },
                        600: {
                            slidesPerView: 1,
                        }
                    }}>
                    {productData.map((product, index) => (
                        <SwiperSlide key={index} className={styles.slide}>
                            <CardItem {...product} />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </section>
    )
}

export default SpecialProductCard