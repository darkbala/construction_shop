import styles from "./Products.module.scss";
import Product from "./Product/Product.jsx";

const Products = () => {
    const products = [
        {
            id: 1,
            title: "axa"
        }
    ];
    return (
        <div className={styles.Products}>
            {products.map((item) => (
                <Product product={item} key={item.id}/>
            ))}
        </div>
    );
}

export default Products;
