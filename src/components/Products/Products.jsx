import {useSelector, useDispatch} from "react-redux";
import styles from "./Products.module.scss";
import Product from "./Product/Product.jsx";
import {setPage} from "../../store/slices/paginationSlice.js";

const Products = ({products}) => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.pagination.currentPage);
    const itemsPerPage = useSelector((state) => state.pagination.itemsPerPage);

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        dispatch(setPage(pageNumber));
    };

    return (
        <div className={styles.Products}>
            <section className={styles.container}>
                {currentItems.map((item) => (
                    <Product
                        name={item.name}
                        key={item.id}
                        price={item.price}
                        image={item.picture}
                        id = {item.id}

                    />
                ))}


            </section>

            <div className={styles.pagination}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    ←
                </button>
                {Array.from({length: totalPages}, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? styles.active : ""}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    →
                </button>
            </div>

        </div>
    );
};

export default Products;