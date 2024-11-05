import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import styles from "./ProductDetailPage.module.scss";
import {fetchProductById} from "../../store/slices/getProducts";
import img from "../../assets/img.png"


const ProductDetailPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    const product = useSelector((state) => state.products.product);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [id, dispatch]);


    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;
    if (!product) return <p>Продукт не найден.</p>;

    return (
        <div className={styles.card}>
            <section className={styles.cont}>
                <div className={styles.imageSection}>
                    <img src={img} alt="Тумба Омега" className={styles.mainImage}/>
                    <div className={styles.thumbnailContainer}>
                        {[1, 2, 3, 4, 5].map((item) => (
                            <img key={item} src={img} alt="Миниатюра"
                                 className={styles.thumbnail}/>
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
                        <p>Наша постоянная цель — удовлетворять потребности клиентов...</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetailPage;
