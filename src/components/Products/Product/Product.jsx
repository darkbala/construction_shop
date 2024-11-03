import styles from "./Product.module.scss";
const Product = ({ product }) => {
    return(
        <div className={styles.Product}>
            {product.title}
        </div>
    )
}

export default Product;