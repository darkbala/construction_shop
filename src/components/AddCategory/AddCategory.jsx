import styles from "./AddCategory.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../../store/slices/paginationSlice.js";

const AddCategory = () => {
    const categories = Array(22).fill("Коллекции Искендер");
    const dispatch = useDispatch();
    const { currentPage, itemsPerPage } = useSelector((state) => state.pagination);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = categories.slice(startIndex, endIndex);

    const totalPages = Math.ceil(categories.length / itemsPerPage);

    const handlePageChange = (page) => {
        dispatch(setPage(page));
    };
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Клиенты</h1>
                <button className={styles.addButton}>+ Добавить новую категорию</button>
            </header>

            <div className={styles.grid}>
                {currentItems.map((category, index) => (
                    <div key={index} className={styles.card}>
                        <p>{category}</p>
                        <div className={styles.actions}>
                            <button className={styles.editButton}>
                                <span>✏️</span>
                            </button>
                            <button className={styles.deleteButton}>
                                <span>🗑️</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

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
    )
}

export default AddCategory;