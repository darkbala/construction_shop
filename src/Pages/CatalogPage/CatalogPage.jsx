import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import CategorySlider from '../../components/CategorySlider/CategorySlider.jsx';
import Products from '../../components/Products/Products.jsx';
import ModalFilter from '../../components/Catalog/ModalFilter/ModalFilter.jsx';
import { fetchCategories } from '../../store/slices/getCategories.js';
import { fetchAllCollections } from '../../store/slices/getCollcetions.js';
import {
    fetchProducts,
    resetFiltered,
    resetNewProducts,
    resetProducts,
    searchByInputValue,
    setInputValue
} from '../../store/slices/getProducts.js';
import styles from './CatalogPage.module.scss';

const CatalogPage = () => {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.language.currentLanguage);
    const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state) => state.categories);
    const products = useSelector((state) => state.products.data);
    const searchResults = useSelector((state) => state.products.filteredProducts);
    const newProducts = useSelector((state) => state.products.newProducts);
    const searchLoading = useSelector((state) => state.products.loading);
    const searchError = useSelector((state) => state.products.error);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchAllCollections());
    }, [dispatch, language]);

    const handleSearch = () => {
        const trimmedInputValue = inputValue.trim();

        if (trimmedInputValue) {
            dispatch(resetProducts());
            dispatch(resetFiltered());
            dispatch(setSelectedCategory(null));
            dispatch(searchByInputValue(trimmedInputValue));
        }
    };

    const handleCategoryClick = (category) => {
        dispatch(resetFiltered());
        dispatch(resetNewProducts());

        if (selectedCategory && selectedCategory.id === category.id && products.length > 0) {
            return;
        }
        setSelectedCategory(category);
        dispatch(fetchProducts(category.id));
    };

    useEffect(() => {
        if (selectedCategory && products.length === 0) {
            setSelectedCategory(null);
        }
    }, [products, selectedCategory]);

    const renderProductsSection = () => {
        if (searchLoading) return <p>Идет загрузка результатов поиска...</p>;
        if (searchError) return <p>Ошибка загрузки результатов поиска: {searchError}</p>;

        if (searchResults.length > 0) {
            return (
                <>
                    <p className={styles.show}>Найдено {searchResults.length} результатов</p>
                    <Products products={searchResults} />
                </>
            );
        }

        if (selectedCategory) {
            if (products.length === 0) {
                return <p>Идет загрузка товаров для категории "{selectedCategory.name}"...</p>;
            }

            return products.length > 0 ? (
                <>
                    <p>Показаны товары для категории "{selectedCategory.name}"</p>
                    <Products products={products} />
                </>
            ) : (
                <p>Товары для категории "{selectedCategory.name}" не найдены</p>
            );
        }

        if (newProducts.length > 0) {
            return (
                <>
                    <p>Показаны новые товары</p>
                    <Products products={newProducts} />
                </>
            );
        }

        return <p>Нет товаров для отображения</p>;
    };

    return (
        <div className={styles.CatalogPage}>
            <section className={styles.searchbar}>
                <div className={styles.top}>
                    <SearchBar handleSearch={handleSearch} />
                    <button className={styles.filter} onClick={() => setModalOpen(true)}>Фильтры</button>
                </div>
                <div>
                    {!categoriesLoading && !categoriesError && (
                        <CategorySlider
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={handleCategoryClick}
                        />
                    )}
                    {categoriesLoading && <p>Loading categories...</p>}
                    {categoriesError && <p>Error loading categories: {categoriesError}</p>}
                </div>
            </section>

            <section className={styles.results_container}>
                {renderProductsSection()}
            </section>
            {isModalOpen && <ModalFilter onClose={() => setModalOpen(false)} />}
        </div>
    );
};

export default CatalogPage;
