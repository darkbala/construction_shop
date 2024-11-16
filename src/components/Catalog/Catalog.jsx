import styles from './Catalog.module.scss';
import {Link} from "react-router-dom";
import img from '../../assets/img.png';

const Catalog = () => {
    const topProducts = [
        {id: 1, name: 'Тумба Омега (105) 100 (3 ящ)', price: '123.000 сом', brand: 'Iskender'},
        {id: 2, name: 'Тумба Омега (105) 100 (3 ящ)', price: '123.000 сом', brand: 'Iskender'},
        {id: 3, name: 'Тумба Омега (105) 100 (3 ящ)', price: '123.000 сом', brand: 'Iskender'},
        {id: 4, name: 'Тумба Омега (105) 100 (3 ящ)', price: '123.000 сом', brand: 'Iskender'},
    ];

    const bottomProducts = [
        {id: 3, name: 'Тумба Омега (100)', price: '123.000 сом', brand: ''},
        {id: 4, name: 'Тумба Омега (100)', price: '123.000 сом', brand: ''},
        {id: 5, name: 'Тумба Омега (100)', price: '123.000 сом', brand: ''},
        {id: 6, name: 'Тумба Омега (100)', price: '123.000 сом', brand: ''},
    ];
    

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
                    {topProducts.map(product => (
                        <div key={product.id} className={styles.productCard}>
                            <div className={styles.brandLabel}>{product.brand}</div>
                            <img src={img} alt={product.name}
                                 className={styles.productImage}/>
                            <aside className={styles.productAside}>
                                <h3 className={styles.productName}>{product.name}</h3>
                                <p className={styles.productPrice}>{product.price}</p>
                            </aside>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionContent_black}>
                    <h2>Мебель от проверенных партнеров</h2>
                    <p>
                        Мы предлагаем не только мебель собственного производства, но и тщательно отобранную мебель от
                        проверенных партнеров. Каждый предмет прозодит конроль качества, чтобы соответствовать нашим
                        стандартам и гармонично дополнять коллекции под брендом “Iskender”
                    </p>
                    <Link to={"/catalog"} className={styles.link}>Перейти</Link>
                </div>
                <div className={styles.productGrid}>
                    {bottomProducts.map(product => (
                        <div key={product.id} className={styles.productCard}>
                            {product.brand.toUpperCase() === "ISKENDER" ? (
                                <div className={styles.brandLabel}>{product.brand}</div>) : ""}
                            <img src={img} alt={product.name}
                                 className={styles.productImage}/>
                            <aside className={styles.productAside}>
                                <h3 className={styles.productName}>{product.name}</h3>
                                <p className={styles.productPrice}>{product.price}</p>
                            </aside>
                        </div>
                    ))}
                </div>
            </section>


        </div>
    );
};

export default Catalog;
