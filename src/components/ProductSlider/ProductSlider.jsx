import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import img from "../../assets/img.png"
import Product from "../Products/Product/Product.jsx";
import styles from "./ProductSlider.module.scss";

const ProductSlider = () => {
    const products = [
        {
            id: 1,
            title: "Product 1",
            description: "Product 1",
            price: "100",
            image: img,
        }, {
            id: 2,
            title: "Product 1",
            description: "Product 1",
            price: "100",
            image: img,
        }, {
            id: 3,
            title: "Product 1",
            description: "Product 1",
            price: "100",
            image: img,
        }, {
            id: 3,
            title: "Product 1",
            description: "Product 1",
            price: "100",
            image: img,
        }, {
            id: 1,
            title: "Product 1",
            description: "Product 1",
            price: "100",
            image: img,
        }, {
            id: 2,
            title: "Product 1",
            description: "Product 1",
            price: "100",
            image: img,
        }, {
            id: 3,
            title: "Product 1",
            description: "Product 1",
            price: "100",
            image: img,
        }, {
            id: 3,
            title: "Product 1",
            description: "Product 1",
            price: "100",
            image: img,
        },
    ]
    return (
        <section className={styles.ProductSlider}>
            <div className={styles.title}>
                <h3>title</h3>
            </div>
            <Swiper
                className={styles.slider}
                spaceBetween={30}
                slidesPerView={3}
                navigation={false}
                infinite={true}
                breakpoints={{
                    1440: {
                        slidesPerView: 3,
                    },
                    1280: {
                        slidesPerView: 2,
                    }, 1024: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    480: {
                        slidesPerView: 1,
                    },
                }}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id} className={styles.productSlide}>
                        <Product
                            name={product.title}
                            key={product.id}
                            price={product.price}
                            image={product.image}
                            id={product.id}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default ProductSlider;
