import { useDispatch, useSelector } from 'react-redux';
import styles from "./AllProducts.module.scss";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import {setPage} from "../../store/slices/paginationSlice.js";

const AllProducts = () => {
    const items = new Array(30).fill({
        name: 'Тумба Омега (100) Тумба Омега (100)Тумба  Тумба Омега (100) Тумба Омега (100)Тумба Тумба Омега (100) Тумба Омега (100)Тумба ',
        category: 'Коллекция Искендер',
        price: '123.000 сом'
    });

    const dispatch = useDispatch();
    const { currentPage, itemsPerPage } = useSelector((state) => state.pagination);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handlePageChange = (page) => {
        dispatch(setPage(page));
    };

    return (
        <div className={styles.AllProducts}>
            <section className={styles.search}>
                <SearchBar/>
                <button className={styles.filter}>Фильтры</button>
                <button className={styles.add_btn}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <path
                            d="M21.6797 12.5C21.6797 12.6554 21.618 12.8044 21.5081 12.9143C21.3982 13.0242 21.2492 13.0859 21.0938 13.0859H13.0859V21.0938C13.0859 21.2492 13.0242 21.3982 12.9143 21.5081C12.8044 21.618 12.6554 21.6797 12.5 21.6797C12.3446 21.6797 12.1956 21.618 12.0857 21.5081C11.9758 21.3982 11.9141 21.2492 11.9141 21.0938V13.0859H3.90625C3.75085 13.0859 3.60181 13.0242 3.49193 12.9143C3.38204 12.8044 3.32031 12.6554 3.32031 12.5C3.32031 12.3446 3.38204 12.1956 3.49193 12.0857C3.60181 11.9758 3.75085 11.9141 3.90625 11.9141H11.9141V3.90625C11.9141 3.75085 11.9758 3.60181 12.0857 3.49193C12.1956 3.38204 12.3446 3.32031 12.5 3.32031C12.6554 3.32031 12.8044 3.38204 12.9143 3.49193C13.0242 3.60181 13.0859 3.75085 13.0859 3.90625V11.9141H21.0938C21.2492 11.9141 21.3982 11.9758 21.5081 12.0857C21.618 12.1956 21.6797 12.3446 21.6797 12.5Z"
                            fill="white"/>
                    </svg>
                    <p>Добавить новую вакансию</p>
                </button>
            </section>

            <div className={styles.tableContainer}>
                <table className={styles.customTable}>
                    <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Категория</th>
                        <th>Цена</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index}>
                            <td className={styles.title}>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.price}</td>
                            <td className={styles.actions}>
                                <button className={styles.actionButton}>
                                    <FaEdit/>
                                </button>
                                <button className={styles.actionButton}>
                                    <FaTrash/>
                                </button>
                                <button className={styles.actionButton}>
                                    <FaEye/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
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
    );
};

export default AllProducts;
