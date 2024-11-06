import {useState} from "react";
import {useParams} from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import styles from "./ProductDetailPage.module.scss";


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
        'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp', 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
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
                    <aside className={styles.box}>
                        <img src={mainImage} alt="Тумба Омега" className={styles.mainImage}/>
                        <span>
                            <button className={styles.arrowButton} onClick={handlePrevImage}><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                      <path
                                          d="M8.07005 12.5427L16.4296 20.5077C16.569 20.6407 16.7543 20.7148 16.9471 20.7148C17.1398 20.7148 17.3251 20.6407 17.4646 20.5077L17.4736 20.4987C17.5414 20.4342 17.5954 20.3567 17.6324 20.2707C17.6693 20.1847 17.6883 20.092 17.6883 19.9985C17.6883 19.9049 17.6693 19.8122 17.6324 19.7262C17.5954 19.6403 17.5414 19.5627 17.4736 19.4982L9.60155 11.9982L17.4736 4.5012C17.5414 4.43674 17.5954 4.35915 17.6324 4.27315C17.6693 4.18715 17.6883 4.09454 17.6883 4.00095C17.6883 3.90736 17.6693 3.81475 17.6324 3.72875C17.5954 3.64275 17.5414 3.56516 17.4736 3.5007L17.4646 3.4917C17.3251 3.35873 17.1398 3.28456 16.9471 3.28456C16.7543 3.28456 16.569 3.35873 16.4296 3.4917L8.07005 11.4567C7.99653 11.5267 7.93801 11.611 7.89801 11.7043C7.85802 11.7977 7.8374 11.8982 7.8374 11.9997C7.8374 12.1012 7.85802 12.2017 7.89801 12.2951C7.93801 12.3884 7.99653 12.4727 8.07005 12.5427Z"
                                          fill="#212529"/>
                                    </svg>
                            </button>
                            <button className={styles.arrowButton} onClick={handleNextImage}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none">
                                    <path
                                        d="M15.9299 11.4573L7.57045 3.4923C7.43096 3.35933 7.24565 3.28516 7.05295 3.28516C6.86024 3.28516 6.67493 3.35933 6.53545 3.4923L6.52645 3.5013C6.45859 3.56576 6.40456 3.64335 6.36764 3.72935C6.33072 3.81535 6.31168 3.90796 6.31168 4.00155C6.31168 4.09514 6.33072 4.18775 6.36764 4.27375C6.40456 4.35975 6.45859 4.43734 6.52645 4.5018L14.3984 12.0018L6.52645 19.4988C6.45859 19.5633 6.40456 19.6409 6.36764 19.7269C6.33072 19.8128 6.31168 19.9055 6.31168 19.9991C6.31168 20.0926 6.33072 20.1853 6.36764 20.2713C6.40456 20.3573 6.45859 20.4348 6.52645 20.4993L6.53545 20.5083C6.67493 20.6413 6.86024 20.7154 7.05295 20.7154C7.24565 20.7154 7.43096 20.6413 7.57045 20.5083L15.9299 12.5433C16.0035 12.4733 16.062 12.389 16.102 12.2957C16.142 12.2023 16.1626 12.1018 16.1626 12.0003C16.1626 11.8988 16.142 11.7983 16.102 11.7049C16.062 11.6116 16.0035 11.5273 15.9299 11.4573Z"
                                        fill="#212529"/>
                                    </svg>
                            </button>
                       </span>
                    </aside>

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


