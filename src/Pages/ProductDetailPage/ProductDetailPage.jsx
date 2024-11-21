import {useCallback, useEffect, useMemo, useState} from "react";
import {Link, useParams} from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import styles from "./ProductDetailPage.module.scss";
import {
    fetchProductById,
    fetchProductInCollection,
    fetchRecomendationCollection
} from "../../store/slices/getProducts.js";
import {useDispatch, useSelector} from "react-redux";
import placeholderImage from "../../assets/img.png";
import CardSlider from "../../components/UI/CardSlider/CardSlider.jsx";

const ProductDetailPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const language = useSelector((state) => state.language.currentLanguage);
    const product = useSelector((state) => state.products.selectedProduct);
    const collection = useSelector((state) => state.products.productsInCollection);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);
    const [currentIndex, setCurrentIndex] = useState(0);
    const rec = useSelector((state) => state.products.recommendationCollections)



    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [id, dispatch, language]);

    useEffect(() => {
        dispatch(fetchRecomendationCollection())
    }, [dispatch]);

    useEffect(() => {
        if (product?.collection_id) {
            dispatch(fetchProductInCollection(product.collection_id));
        }
    }, [product?.collection_id, dispatch, language]);

    useEffect(() => {
        if (product) {
            const mainImageIndex = product.pictures?.findIndex((pic) => pic.is_main) || 0;
            setCurrentIndex(mainImageIndex);
        }
    }, [product]);

    const thumbnails = useMemo(() => {
        return product && product.photos ? product.photos.map((pic) => pic.url) : [];
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
    if (!product) return <p>Продукт не найден.</p>;

    return (
        <div className={styles.ProductDetail}>
            <div className={styles.back_link}>
                <Link to={`/catalog`}>category / <p>{product.name}</p></Link>
            </div>

            <section className={styles.cont}>
                <div className={styles.imageSection}>
                    <aside className={styles.box}>
                        <img src={mainImage} alt={product.name} className={styles.mainImage}/>
                        <span>
                            <button className={styles.arrowButton} onClick={handlePrevImage}>⬅</button>
                            <button className={styles.arrowButton} onClick={handleNextImage}>➡</button>
                        </span>
                    </aside>

                    <div className={styles.thumbnailContainer}>
                        {thumbnails.length > 0 ? (
                            thumbnails.slice(0, 5).map((thumbnail, index) => (
                                <img
                                    key={index}
                                    src={thumbnail}
                                    alt={`Миниатюра ${index + 1}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleThumbnailClick(index)}
                                />
                            ))
                        ) : (
                            ""
                        )}
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <h2 className={styles.title}>{product.name}</h2>
                    <p className={styles.price}>{product.price} сом</p>
                    <div className={styles.description}>
                        <h3>Описание</h3>
                        <p>{product.description}</p>
                    </div>
                </div>
            </section>

            <div className={styles.description_bottom}>
                <h3>Описание</h3>
                <p>{product.description}</p>
            </div>

            {collection && collection.length > 0 && (
                <section className={styles.cont2}>
                    <h3>Продукты из этой коллекции</h3>
                    <CardSlider cards={collection}/>
                </section>
            )}

            {rec && rec.length > 0 && (
                <section className={styles.cont2}>
                    <h3>Похожие продукты</h3>
                    <CardSlider cards={rec} style={{padding: 0}}/>
                </section>
            )}
        </div>
    );
};

export default ProductDetailPage;
