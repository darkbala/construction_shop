import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import styles from "./ProductDetailPage.module.scss";
import {fetchProductById} from "../../store/slices/getProducts";


const ProductDetailPage = () => {
    const {id} = useParams();
    const [currentIndex, setCurrentIndex] = useState(0);
    // const dispatch = useDispatch();
    //
    // const product = useSelector((state) => state.products.product);
    // const loading = useSelector((state) => state.products.loading);
    // const error = useSelector((state) => state.products.error);
    //
    // useEffect(() => {
    //     if (id) {
    //         dispatch(fetchProductById(id));
    //     }
    // }, [id, dispatch]);
    //
    //
    // if (loading) return <p>Загрузка...</p>;
    // if (error) return <p>Ошибка: {error}</p>;
    // if (!product) return <p>Продукт не найден.</p>;

    const thumbnails = [
        'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
        'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
        'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',   'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
        'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    ];

    const handleThumbnailClick = (thumbnail, index) => {
        setMainImage(thumbnail);
        setCurrentIndex(index);
    };

    const handleNextImage = () => {
        const nextIndex = (currentIndex + 1) % thumbnails.length; // Переход к следующему изображению
        setMainImage(thumbnails[nextIndex]);
        setCurrentIndex(nextIndex);
    };

    const handlePrevImage = () => {
        const prevIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length; // Переход к предыдущему изображению
        setMainImage(thumbnails[prevIndex]);
        setCurrentIndex(prevIndex);
    };



    const [mainImage, setMainImage] = useState('https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'); // Начальное изображение
    //
    // const handleThumbnailClick = (thumbnail) => {
    //     setMainImage(thumbnail);
    // };
    return (
        <div className={styles.card}>
            <section className={styles.cont}>
                <div className={styles.imageSection}>
                    <button className={styles.arrowButton} onClick={handlePrevImage}>&#10094;</button>
                    {/* Стрелка влево */}

                    <img src={mainImage} alt="Тумба Омега" className={styles.mainImage}/>

                    <button className={styles.arrowButton} onClick={handleNextImage}>&#10095;</button>
                    {/* Стрелка вправо */}

                    <div className={styles.thumbnailContainer}>
                        {thumbnails.map((thumbnail, index) => (
                            <img
                                key={index}
                                src={thumbnail}
                                alt={`Миниатюра ${index + 1}`}
                                className={styles.thumbnail}
                                onClick={() => handleThumbnailClick(thumbnail, index)} // Обработчик клика
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.infoSection}>
                    <div className={styles.tag}>Iskender</div>
                    <h2 className={styles.title}>Тумба “Омега” 100 * 50</h2>
                    <div className={styles.colors}>
                        <span className={styles.color} style={{backgroundColor: 'green'}}/>
                        <span className={styles.color} style={{backgroundColor: 'red'}}/>
                        <span className={styles.color} style={{backgroundColor: 'yellow'}}/>
                    </div>
                    <p className={styles.price}>123,000 сом</p>
                    <div className={styles.description}>
                        <h3>Описание</h3>
                        <p>Наша постоянная цель — удовлетворять потребности клиентов — удовлетворять потребности
                            клиентов</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetailPage;
