import {useDispatch, useSelector} from 'react-redux';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import CategorySlider from '../../components/CategorySlider/CategorySlider.jsx';
import {useEffect, useState} from 'react';
import styles from './CatalogPage.module.scss';
import {fetchCategories} from "../../store/slices/getCategories.js";

import ModalFilter from "../../components/Catalog/ModalFilter/ModalFilter.jsx"

const CatalogPage = () => {
    const dispatch = useDispatch();
    const results = useSelector((state) => state.search.results);
    const categories = useSelector((state) => state.categories.categories);
    const categoriesLoading = useSelector((state) => state.categories.loading);
    const categoriesError = useSelector((state) => state.categories.error);
    const selectedCategory = useSelector((state) => state.search.filters.category);
    const [isModalOpen, setModalOpen] = useState(false);
    const language = useSelector((state) => state.language.currentLanguage);
    const inputValue = useSelector((state) => state.search.filters.inputValue);
    const {error, loading} = useSelector((state) => state.search)

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch, language]);

    const isNoResults =
        !results ||
        (Array.isArray(results) && results.length === 0 && (selectedCategory || (inputValue?.length || 0) > 0));

    return (
        <div className={styles.CatalogPage}>
            <section className={styles.searchbar}>
                <div className={styles.top}>
                    <SearchBar/>
                    <button className={styles.filter} onClick={() => setModalOpen(true)}>Фильтры</button>
                </div>
                <div>
                    {categoriesLoading ? (
                        <p>Loading categories...</p>
                    ) : categoriesError ? (
                        <p>Error loading categories: {categoriesError}</p>
                    ) : (
                        <CategorySlider categories={categories}/>
                    )}
                </div>
            </section>

            <section>
                {error ? (
                    <div className={styles.noResults}>Продукты не найдены</div>
                ) : (
                    Array.isArray(results) && results.length > 0 && (
                        <ul>
                            {results.map((item) => (
                                <li key={item.id}>{item.name}</li>
                            ))}
                        </ul>
                    )
                )}
            </section>

            {isModalOpen && <ModalFilter onClose={() => setModalOpen(false)}/>}
        </div>
    );
};

export default CatalogPage;
