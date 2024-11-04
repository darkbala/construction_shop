import styles from "./Products.module.scss";
import Product from "./Product/Product.jsx";

const Products = ({products}) => {
    return (
        <div className={styles.Products}>
            <section className={styles.container}>
                {products.map((item) => (
                    <Product name={item.name} key={item.id} price={item.price} image={item.picture}/>
                ))}
            </section>
        </div>
    );
}

export default Products;
