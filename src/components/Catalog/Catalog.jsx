import styles from './Catalog.module.scss';
import { Link } from "react-router-dom";
import img from '../../assets/img.png';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchByDistr, fetchByProducer } from "../../store/slices/getProducts.js";

const Catalog = () => {
    const dispatch = useDispatch();
    const topProducts = useSelector((state) => state.products.filteredProducts);
    const bottomProducts = useSelector((state) => state.products.distr);

    useEffect(() => {
        dispatch(fetchByDistr());
        dispatch(fetchByProducer());
    }, []);

    const topProductsToShow = topProducts.slice(0, 4);
    const bottomProductsToShow = bottomProducts.slice(0, 4);


    return (
        <div className={styles.catalog}>
            <section className={styles.title}>
                <h3>Catalog</h3>
                <Link to={"/catalog"}>View more</Link>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionContent}>
                    <h2>Собственное производство &#34;ISKENDER&#34;</h2>
                    <p>
                        Мы создаём уникальную мебель, чтобы предложить нашим клиентам уникальную мебель,
                        полностью изготовленную нами в Кыргызстане, со страстью и вниманием...
                    </p>
                    <Link to={"/catalog"} className={styles.link}>Перейти</Link>
                </div>
                <div className={styles.productGrid}>
                    {topProductsToShow.map(product => (
                        <Link  to={`/catalog/${product.collection_id ? "product" : "collection"}/${product.id}`}key={product.id} className={styles.productCard}>
                            <div className={styles.brandLabel}>Iskender</div>
                            <img src={img} alt={product.name} className={styles.productImage} />
                            <aside className={styles.productAside}>
                                <h3 className={styles.productName}>{product.name}</h3>
                                <p className={styles.productPrice}>{product.price}</p>
                            </aside>
                        </Link>
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionContent_black}>
                    <h2>Мебель от проверенных партнеров</h2>
                    <p>
                        Мы предлагаем не только мебель собственного производства, но и тщательно отобранную мебель от
                        проверенных партнеров. Каждый предмет проходит контроль качества, чтобы соответствовать нашим
                        стандартам и гармонично дополнять коллекции под брендом “Iskender”
                    </p>
                    <Link to={"/catalog"} className={styles.link}>Перейти</Link>
                </div>
                <div className={styles.productGrid}>
                    {bottomProductsToShow.map(product => (
                        <Link  to={`/catalog/${product.collection_id ? "product" : "collection"}/${product.id}`} key={product.id} className={styles.productCard}>
                            <img src={img} alt={product.name} className={styles.productImage} />
                            <aside className={styles.productAside}>
                                <h3 className={styles.productName}>{product.name}</h3>
                                <p className={styles.productPrice}>{product.price}</p>
                            </aside>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Catalog;
