import {useParams} from "react-router-dom";
import {useState} from "react";
import styles from "./ProductDetailPage.module.scss";

const ProductDetailPage = () => {
    const {id} = useParams();
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (amount) => {
        setQuantity((prev) => Math.max(1, prev + amount));
    };
    return (
        <div className={styles.productCard}>
            {/* Изображение товара */}
            <div className={styles.imageContainer}>
                <img
                    src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" // Замените на URL миниатюр
                    alt="Тумба Омега"
                    className={styles.mainImage}
                />
                <div className={styles.thumbnailContainer}>
                    {/* Миниатюры изображений */}
                    {[...Array(5)].map((_, index) => (
                        <img
                            key={index}
                            src="https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649" // Замените на URL миниатюр
                            alt={`Миниатюра ${index + 1}`}
                            className={styles.thumbnail}
                        />
                    ))}
                </div>
                {/* Стрелки переключения */}
                <div className={styles.arrowContainer}>
                    <button className={styles.arrowButton}>←</button>
                    <button className={styles.arrowButton}>→</button>
                </div>
            </div>

            {/* Информация о товаре */}
            <div className={styles.infoContainer}>
                <span className={styles.brand}>Iskender</span>
                <h2 className={styles.title}>Тумба "Омега" 100 * 50</h2>
                <div className={styles.colorOptions}>
                    {/* Кнопки выбора цвета */}
                    <button className={styles.colorOption} style={{ backgroundColor: "#000" }}></button>
                    <button className={styles.colorOption} style={{ backgroundColor: "#f0f0f0" }}></button>
                    <button className={styles.colorOption} style={{ backgroundColor: "#607d8b" }}></button>
                </div>
                <p className={styles.price}>123.000 сом</p>
                <div className={styles.quantityContainer}>
                    {/* Уменьшение количества */}
                    <button
                        className={styles.quantityButton}
                        onClick={() => handleQuantityChange(-1)}
                    >
                        −
                    </button>
                    <span className={styles.quantity}>{quantity}</span>
                    {/* Увеличение количества */}
                    <button
                        className={styles.quantityButton}
                        onClick={() => handleQuantityChange(1)}
                    >
                        +
                    </button>
                </div>
                <button className={styles.addToCartButton}>В корзину</button>
            </div>
        </div>
    );
};

export default ProductDetailPage