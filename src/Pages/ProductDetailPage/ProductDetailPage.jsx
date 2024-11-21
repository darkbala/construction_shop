import {useCallback, useEffect, useMemo, useState} from "react";
import {Link, useParams} from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import styles from "./ProductDetailPage.module.scss";
import {
    fetchCollectionById,
    fetchProductById,
    fetchProductInCollection,
    fetchRecomendationCollection
} from "../../store/slices/getProducts.js";
import {useDispatch, useSelector} from "react-redux";
import placeholderImage from "../../assets/img.png";
import CardSlider from "../../components/UI/CardSlider/CardSlider.jsx";

const ProductDetailPage = () => {
    const {id, type} = useParams();
    const dispatch = useDispatch();
    const language = useSelector((state) => state.language.currentLanguage);
    const product = useSelector((state) => state.products.selectedProduct);
    const collection = useSelector((state) => state.products.productsInCollection);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);
    const [currentIndex, setCurrentIndex] = useState(0);
    const rec = useSelector((state) => state.products.recommendationCollections);


    useEffect(() => {
        if (type === "product") {
            dispatch(fetchProductById(id));
        } else if (type === "collection") {
            dispatch(fetchCollectionById(id));
        }
    }, [type, id, dispatch, language]);





    useEffect(() => {
        if (product?.collection_id) {
            dispatch(fetchProductInCollection(product.collection_id));
        }
    }, [product?.collection_id, dispatch, language]);

    useEffect(() => {
        dispatch(fetchRecomendationCollection());
    }, [dispatch]);

    const thumbnails = useMemo(() => {
        return product?.photos ? product.photos.map((pic) => pic.url) : [];
    }, [product]);

    const mainImage = thumbnails[currentIndex] || placeholderImage;

    const handleThumbnailClick = useCallback((index) => {
        setCurrentIndex(index);
    }, []);

    const handleNextImage = useCallback(() => {
        setCurrentIndex((currentIndex + 1) % thumbnails.length);
    }, [currentIndex, thumbnails.length]);

    const handlePrevImage = useCallback(() => {
        setCurrentIndex((currentIndex - 1 + thumbnails.length) % thumbnails.length);
    }, [currentIndex, thumbnails.length]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <div className={styles.ProductDetail}>

            <div className={styles.back_link}>
                <Link to={`/catalog`}>category / <p>{product?.name}</p></Link>
            </div>

            <section className={styles.cont}>
                <div className={styles.imageSection}>
                    <aside className={styles.box}>
                        <img src={mainImage} alt={product?.name} className={styles.mainImage}/>
                        <span>
                            <button className={styles.arrowButton} onClick={handlePrevImage}>⬅</button>
                            <button className={styles.arrowButton} onClick={handleNextImage}>➡</button>
                        </span>
                    </aside>

                    <div className={styles.thumbnailContainer}>
                        {thumbnails.map((thumbnail, index) => (
                            <img
                                key={index}
                                src={thumbnail}
                                alt={`Миниатюра ${index + 1}`}
                                className={styles.thumbnail}
                                onClick={() => handleThumbnailClick(index)}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <h2 className={styles.title}>{product?.name}</h2>
                    <p className={styles.price}>{product?.price} сом</p>
                    <div className={styles.description}>
                        <h3>Описание</h3>
                        <p>{product?.description}</p>
                    </div>
                </div>
            </section>

            <div className={styles.description_bottom}>
                <h3>Описание</h3>
                <p>{product?.description}</p>
            </div>


                <section className={styles.cont2}>
                    <h3>Продукты из этой коллекции</h3>
                    <CardSlider cards={collection}/>
                </section>



                <section className={styles.cont2}>
                    <h3>Похожие продукты</h3>
                    <CardSlider cards={rec}/>
                </section>

        </div>
    );
};

export default ProductDetailPage;
