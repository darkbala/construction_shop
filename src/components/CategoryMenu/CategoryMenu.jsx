// import {useRef, useState} from 'react';
import styles from './CategoryMenu.module.scss';
import {SwiperSlide, Swiper} from "swiper/react";
import {useState} from "react";
import 'swiper/css';


const categories = ["Коллекции Искендер", "Раковины", "Унитазы", "Ванна", "Душевые кабины", "Кухонные мойки", "Водонагреватели", "Сушитель", "Сушитель", "Сушитель", "Сушитель", "Сушитель", "Сушитель", "Сушитель", "Сушитель"];

const CategoryMenu = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleCategoryClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className={styles.categoryMenuWrapper}>
            <Swiper
                spaceBetween={20}
                slidesPerView="auto"
                freeMode={true}
                grabCursor={true}
            >
                {categories.map((category, index) => (
                    <SwiperSlide key={index} className={styles.categorySlide} style={{flexShrink:"1"}}>
            <span
                className={`${styles.category} ${index === activeIndex ? styles.active : ''}`}
                onClick={() => handleCategoryClick(index)}
            >
              {category}
            </span>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CategoryMenu;